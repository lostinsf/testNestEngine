import { Body, Controller, Post, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PriType } from '../../../L1/prismas/type';
import { Public } from '../../../L2/guards/guaBase';
import { SerNation } from '../../../L2/services/serNation';
import { NationClass } from '../../../L2/services/serNation/class';

@Controller('')
@ApiTags('국가정보')
export class CntNation {
  constructor(private readonly SerNation: SerNation) {}

  @Public()
  @Post('nation/load')
  @ApiOperation({ summary: '국가로드', description: '국가정보를 불러온다.' })
  async loadNation(@Body() data: NationClass): Promise<PriType> {
    return await this.SerNation.findNation(data);
  }

  @Public()
  @Post('nation/loads')
  @ApiOperation({ summary: '국가단체로드', description: '국가정보를 단체로 불러온다.' })
  async loadsLogger(@Body() data: NationClass): Promise<PriType> {
    return await this.SerNation.findGroupNation(data);
  }

  @Public()
  @Post('nation/save')
  @ApiOperation({ summary: '국가저장', description: '국가정보를 저장한다.' })
  async saveNation(@Body() data: NationClass, @Req() req?: Request): Promise<PriType> {
    if ((await this.loadNation(data)).result === null) {
      return await this.SerNation.createNation(data, req);
    }
    return await this.SerNation.updateNation(data, req);
  }

  @Put('nation/init')
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: '국가초기화', description: '국가정보를 초기화한다.' })
  async initLogger(@Body() data?: NationClass): Promise<PriType> {
    return await this.SerNation.deleteGroupNation(data);
  }
}
