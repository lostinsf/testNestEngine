import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../../L2/guards/guaBase';
import { SerHome } from '../../../L2/services/serHome';

@Controller('')
@ApiTags('메인정보')
export class CntHome {
  constructor(private readonly SerHome: SerHome) {}

  @Public()
  @Get('/')
  getHello(): string {
    return this.SerHome.getHello();
  }
}
