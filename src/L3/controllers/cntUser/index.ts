import { Body, Controller, Post, Put, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GLOENV_KEY_TOKEN_SAVE_1, GLOENV_KEY_TOKEN_SAVE_2 } from '../../../L1/globals/gloEnv';
import { LibDayjs } from '../../../L1/libs/libDayjs';
import { LibPassword } from '../../../L1/libs/libPassword';
import { PriUserType } from '../../../L1/prismas/priUser/type';
import { PriType } from '../../../L1/prismas/type';
import { Public } from '../../../L2/guards/guaBase';
import { SerToken } from '../../../L2/services/serToken';
import { SerUser } from '../../../L2/services/serUser';
import { UserClass } from '../../../L2/services/serUser/class';

@Controller('')
@ApiTags('유저정보')
export class CntUser {
  constructor(
    private readonly SerUser: SerUser,
    private readonly SerToken: SerToken,
    private readonly jwtService: JwtService,
  ) {}

  @ApiBearerAuth('Authorization')
  @Post('user/load')
  @ApiOperation({ summary: '유저로드', description: '유저정보를 불러온다.' })
  async loadUser(@Body() data: UserClass): Promise<PriType> {
    return await this.SerUser.findUser(data);
  }

  @ApiBearerAuth('Authorization')
  @Post('user/loads')
  @ApiOperation({ summary: '유저단체로드', description: '유저정보를 단체로 불러온다.' })
  async loadsLogger(@Body() data: UserClass): Promise<PriType> {
    return await this.SerUser.findGroupUser(data);
  }

  @ApiBearerAuth('Authorization')
  @Post('user/save')
  @ApiOperation({ summary: '유저저장', description: '유저정보를 저장한다.' })
  async saveUser(@Body() data: UserClass, @Req() req?: Request): Promise<PriType> {
    const userData: UserClass =
      data.user_password !== ''
        ? {
            user_id: data.user_id,
            user_group: data.user_group,
            user_key: data.user_key,
            user_value: data.user_value,
            user_password:
              data.user_password.split(':').length > 1 ? data.user_password : LibPassword('en', data.user_password),
            user_device: '',
          }
        : data;
    const loadUser = (await this.loadUser(userData)).result;
    if (loadUser !== null) {
      const resultUser = {
        user_id: data.user_id,
        user_group: data.user_group,
        user_key: data.user_key,
        user_value: data.user_value,
        user_email: loadUser.user_email,
        user_phone: loadUser.user_phone,
        user_name: loadUser.user_name,
        user_password: data.user_password === '' ? loadUser.user_password : LibPassword('en', data.user_password),
        user_device: loadUser.user_device,
      };
      return await this.SerUser.updateUser(resultUser, req);
    }
    return await this.SerUser.createUser(userData, req);
  }

  @Public()
  @Post('user/login')
  @ApiOperation({ summary: '유저로그인', description: '유저정보를 인증한다.' })
  async loginUser(@Body() data: UserClass, @Req() req?: Request): Promise<PriType> {
    const userTemp = await this.loadUser(data);
    console.log(userTemp);
    console.log(data);

    // 유저를 찾았을 경우
    if (userTemp.check && userTemp.result !== null) {
      // 비밀번호 제거객체 생성
      const user: PriUserType = {
        user_id: userTemp.result.user_id,
        user_group: userTemp.result.user_group,
        user_key: userTemp.result.user_key,
        user_value: userTemp.result.user_value,
        user_email: userTemp.result.user_email,
        user_phone: userTemp.result.user_phone,
        user_name: userTemp.result.user_name,
        user_password: '',
        user_device: data.user_device === undefined ? '' : data.user_device,
      };
      // 비밀번호 확인
      const findUserPassword = LibPassword('', userTemp.result.user_password);
      const passwordData = LibPassword(
        '',
        data.user_password.split(':').length > 1 ? data.user_password : LibPassword('en', data.user_password),
      );
      // 비밀번호 매칭시 토큰 생성
      if (findUserPassword === passwordData) {
        // 토큰 생성 준비
        const payload = userTemp.result;
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(
          { user_id: payload.user_id },
          {
            secret: process.env.JWT_SECRET_REFRESH,
            expiresIn: '7day',
          },
        );
        // 데이터베이스 저장
        const date = LibDayjs('', new Date());
        const accessTokenService = await this.SerToken.createToken({
          token_id: `${payload.user_id}_${date}_access`,
          token_group: `${GLOENV_KEY_TOKEN_SAVE_1}`,
          token_key: `${GLOENV_KEY_TOKEN_SAVE_1}`,
          token_value: accessToken,
          token_user: payload.user_id,
        });
        const refreshTokenService = await this.SerToken.createToken({
          token_id: `${payload.user_id}_${date}_refresh`,
          token_group: `${GLOENV_KEY_TOKEN_SAVE_2}`,
          token_key: `${GLOENV_KEY_TOKEN_SAVE_2}`,
          token_value: refreshToken,
          token_user: payload.user_id,
          token_device: data.user_device,
        });
        if (accessTokenService.check && refreshTokenService.check) {
          return {
            check: true,
            result: user,
            accessToken: accessTokenService.result,
            refreshToken: refreshTokenService.result,
          };
        }
        return { check: false, result: new UnauthorizedException('토큰정보를 저장할 수 없습니다!') };
      }
      return { check: false, result: new UnauthorizedException('패스워드가 일치하지 않습니다!') };
    }
    // 유저를 찾지 못했을 경우
    return { check: false, result: new UnauthorizedException('유저정보를 찾을 수 없습니다!') };
  }

  @ApiBearerAuth('Authorization')
  @Put('user/destroy')
  @ApiOperation({ summary: '유저삭제', description: '유저정보를 삭제한다.' })
  async destoryUser(@Body() data: UserClass): Promise<PriType> {
    return await this.SerUser.deleteUser(data);
  }

  @ApiBearerAuth('Authorization')
  @Put('user/init')
  @ApiOperation({ summary: '유저초기화', description: '유저정보를 초기화한다.' })
  async initLogger(@Body() data?: UserClass): Promise<PriType> {
    return await this.SerUser.deleteGroupUser(data);
  }
}
