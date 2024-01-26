import { Body, Controller, Post, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PriType } from '../../../L1/prismas/type';
import { Public } from '../../../L2/guards/guaBase';
import { SerLogger } from '../../../L2/services/serLogger';
import { LoggerClass } from '../../../L2/services/serLogger/class';

@Controller('')
@ApiTags('로그정보')
export class CntLogger {
  constructor(private readonly SerLogger: SerLogger) {}

  @ApiBearerAuth('Authorization')
  @Post('logger/load')
  @ApiOperation({ summary: '로그로드', description: '로그정보를 불러온다.' })
  async loadLogger(@Body() data: LoggerClass): Promise<PriType> {
    return await this.SerLogger.findLogger(data);
  }

  @ApiBearerAuth('Authorization')
  @Post('logger/loads')
  @ApiOperation({ summary: '로그단체로드', description: '로그정보를 단체로 불러온다.' })
  async loadsLogger(@Body() data: LoggerClass): Promise<PriType> {
    if (data.logger_user !== '') {
      return await this.SerLogger.findGroupUserLogger(data);
    }
    return await this.SerLogger.findGroupLogger(data);
  }

  @Public()
  @Post('logger/make')
  @ApiOperation({ summary: '로그생성', description: '로그정보를 생성한다.' })
  async makeLogger(@Body() data: LoggerClass, @Req() req?: Request): Promise<PriType> {
    return await this.SerLogger.createLogger(data, req);
  }

  @ApiBearerAuth('Authorization')
  @Put('logger/init')
  @ApiOperation({ summary: '로그초기화', description: '로그정보를 초기화한다.' })
  async initLogger(@Body() data?: LoggerClass): Promise<PriType> {
    if (data.logger_user !== '') {
      return await this.SerLogger.deleteGroupUserLogger(data);
    }
    return await this.SerLogger.deleteGroupLogger(data);
  }
}
