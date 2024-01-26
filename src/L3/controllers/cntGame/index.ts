import { Body, Controller, Post, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PriType } from '../../../L1/prismas/type';
import { SerGame } from '../../../L2/services/serGame';
import { GameClass } from '../../../L2/services/serGame/class';

@Controller('')
@ApiTags('게임정보')
export class CntGame {
  constructor(private readonly SerGame: SerGame) {}

  @ApiBearerAuth('Authorization')
  @Post('game/load')
  @ApiOperation({ summary: '게임로드', description: '게임정보 불러온다.' })
  async loadGame(@Body() data: GameClass): Promise<PriType> {
    return await this.SerGame.findGame(data);
  }

  @ApiBearerAuth('Authorization')
  @Post('game/loads')
  @ApiOperation({ summary: '게임단체로드', description: '게임정보를 단체로 불러온다.' })
  async loadsGame(@Body() data: GameClass): Promise<PriType> {
    if (data.game_user !== '') {
      return await this.SerGame.findGroupUserGame(data);
    }
    return await this.SerGame.findGroupGame(data);
  }

  @ApiBearerAuth('Authorization')
  @Post('game/save')
  @ApiOperation({ summary: '게임저장', description: '게임정보를 저장한다.' })
  async saveGame(@Body() data: GameClass, @Req() req?: Request): Promise<PriType> {
    if ((await this.loadGame(data)).result === null) {
      return await this.SerGame.createGame(data, req);
    }
    return await this.SerGame.updateGame(data, req);
  }

  @ApiBearerAuth('Authorization')
  @Put('game/init')
  @ApiOperation({ summary: '게임초기화', description: '게임정보를 초기화한다.' })
  async initLogger(@Body() data?: GameClass): Promise<PriType> {
    if (data.game_user !== '') {
      return await this.SerGame.deleteGroupUserGame(data);
    }
    return await this.SerGame.deleteGroupGame(data);
  }
}
