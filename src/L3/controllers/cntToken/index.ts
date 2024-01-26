import { Body, Controller, Post, Put, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GLOENV_KEY_TOKEN_SAVE_1, GLOENV_KEY_TOKEN_SAVE_2 } from '../../../L1/globals/gloEnv';
import { LibDayjs } from '../../../L1/libs/libDayjs';
import { PriUserType } from '../../../L1/prismas/priUser/type';
import { PriType } from '../../../L1/prismas/type';
import { Public } from '../../../L2/guards/guaBase';
import { SerToken } from '../../../L2/services/serToken';
import { TokenClass } from '../../../L2/services/serToken/class';
import { SerUser } from '../../../L2/services/serUser';

@Controller('')
@ApiTags('토큰정보')
export class CntToken {
  constructor(
    private readonly SerUser: SerUser,
    private readonly SerToken: SerToken,
    private readonly jwtService: JwtService,
  ) {}

  @ApiBearerAuth('Authorization')
  @Post('token/load')
  @ApiOperation({ summary: '토큰로드', description: '토큰정보 불러온다.' })
  async loadToken(@Body() data: TokenClass): Promise<PriType> {
    return await this.SerToken.findToken(data);
  }

  @ApiBearerAuth('Authorization')
  @Post('token/loads')
  @ApiOperation({ summary: '토큰단체로드', description: '토큰정보를 단체로 불러온다.' })
  async loadsLogger(@Body() data: TokenClass): Promise<PriType> {
    if (data.token_user !== '') {
      return await this.SerToken.findGroupUserToken(data);
    }
    return await this.SerToken.findGroupToken(data);
  }

  @ApiBearerAuth('Authorization')
  @Post('token/save')
  @ApiOperation({ summary: '토큰저장', description: '토큰정보를 새로 저장한다.' })
  async saveToken(@Body() data: TokenClass, @Req() req?: Request): Promise<PriType> {
    if ((await this.loadToken(data)).result === null) {
      return await this.SerToken.createToken(data, req);
    }
    return await this.SerToken.updateToken(data, req);
  }

  @ApiBearerAuth('Authorization')
  @Put('token/init')
  @ApiOperation({ summary: '토큰초기화', description: '토큰정보를 초기화한다.' })
  async initLogger(@Body() data?: TokenClass): Promise<PriType> {
    if (data.token_user !== '') {
      return await this.SerToken.deleteGroupUserToken(data);
    }
    return await this.SerToken.deleteGroupToken(data);
  }

  @Public()
  @Post('token/refresh')
  @ApiOperation({ summary: '토큰교체', description: '토큰정보를 확인한 후 교체한다.' })
  async changeToken(@Body() data: TokenClass, @Req() req?: Request): Promise<PriType> {
    const userFind = await this.SerUser.findUser({
      user_id: data.token_user,
      user_group: '',
      user_key: '',
      user_value: '',
      user_device: '',
    });
    // 1. 유저를 찾았을 경우
    if (userFind.check && userFind.result !== null) {
      // 2. 디바이스 정보가 일치할 경우
      const tokenFind = await this.SerToken.findToken({
        token_id: data.token_id,
        token_group: '',
        token_key: '',
        token_value: '',
      });
      if (tokenFind.check && tokenFind.result.token_device === data.token_device) {
        // 비밀번호 제거객체 생성
        const user: PriUserType = {
          user_id: userFind.result.user_id,
          user_group: userFind.result.user_group,
          user_key: userFind.result.user_key,
          user_value: userFind.result.user_value,
          user_email: userFind.result.user_email,
          user_phone: userFind.result.user_phone,
          user_name: userFind.result.user_name,
          user_password: '',
          user_device: userFind.result.user_device,
        };
        // 토큰 생성 준비
        const payload = userFind.result;
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
          token_device: payload.user_device,
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
      return {
        check: false,
        result: new UnauthorizedException('인증서버 초기화로 재로그인이 필요하였습니다. 다시 로그인 부탁드립니다!'),
      };
    }
    // 유저를 찾지 못했을 경우
    return { check: false, result: new UnauthorizedException('유저정보를 찾을 수 없습니다!') };
  }

  @ApiBearerAuth('Authorization')
  @Post('token/key')
  @ApiOperation({ summary: '토큰키로드', description: '토큰키를 불러온다.' })
  async valueLogger(@Body() data: TokenClass): Promise<PriType> {
    if (data.token_user !== '') {
      return await this.SerToken.findKeyUserToken(data);
    }
    return await this.SerToken.findKeyToken(data);
  }
}
