import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { SerUser } from '../../services/serUser';
import { UserClass } from '../../services/serUser/class';

export const Public = () => SetMetadata(process.env.JWT_SECRET_PUBLIC, true);

@Injectable()
export class GuaBase implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: SerUser,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(process.env.JWT_SECRET_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<any>();

    //headear에 토큰이 있는지 확인
    const { authorization } = request.headers;

    // 예외법칙
    if (!authorization) {
      throw { check: false, result: new UnauthorizedException('액세스 토큰이 필요한 작업입니다.') };
    }

    //authorization 값을 추출하고 이 값이 bearer로 시작하는지 검사
    const isBearer = authorization.startsWith('Bearer');
    if (!isBearer) {
      throw { check: false, result: new UnauthorizedException('잘못된 토큰입니다!') };
    }

    const accessToken = authorization.split(' ').pop();
    if (!accessToken) {
      throw { check: false, result: new UnauthorizedException('토큰정보를 찾을 수 없습니다!') };
    }

    // 테스트 예외사항
    const testToken = process.env.JWT_SECRET_PUBLIC;
    if (accessToken === testToken) {
      return true;
    }

    //토큰 검증 및 토큰에서 추출된 정보 얻어오기
    try {
      const payload = await this.jwtService.verifyAsync(accessToken);

      //id가 존재하는 id인지 검증
      const userData: UserClass = {
        user_id: payload.user_id,
        user_group: payload.user_group,
        user_key: payload.user_key,
        user_value: payload.user_value,
      };
      const user = await this.userService.findUser(userData);
      if (user.result === null) {
        throw { check: false, result: new UnauthorizedException('잘못된 계정정보입니다!') };
      }
      //존재 한다면 user와 role 변수에 저장
      request.user = user.result;
      request.role = payload.role;

      return true;
    } catch (result) {
      //토큰 검증 및 토큰에서 추출된 정보 얻어오기
      throw { check: false, result: new UnauthorizedException('토큰이 만료되었습니다!') };
    }
  }

  async registActivate(context: ExecutionContext, token: string) {
    //토큰 검증 및 토큰에서 추출된 정보 얻어오기
    try {
      const request = context.switchToHttp().getRequest<any>();
      const payload = await this.jwtService.verifyAsync(token);

      //id가 존재하는 id인지 검증
      const userData: UserClass = {
        user_id: payload.user_id,
        user_group: payload.user_group,
        user_key: payload.user_key,
        user_value: payload.user_value,
      };
      const user = await this.userService.findUser(userData);
      if (user.result === null) {
        throw { check: false, result: new UnauthorizedException('잘못된 계정정보입니다!') };
      }
      //존재 한다면 user와 role 변수에 저장
      request.user = user.result;
      request.role = payload.role;

      return true;
    } catch (result) {
      //토큰 검증 및 토큰에서 추출된 정보 얻어오기
      throw { check: false, result: new UnauthorizedException('토큰이 만료되었습니다!') };
    }
  }
}
