import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { GuaBase } from '../L2/guards/guaBase';
import { SerGame } from '../L2/services/serGame';
import { SerHome } from '../L2/services/serHome';
import { SerLogger } from '../L2/services/serLogger';
import { SerNation } from '../L2/services/serNation';
import { SerToken } from '../L2/services/serToken';
import { SerUser } from '../L2/services/serUser';
import { CntGame } from '../L3/controllers/cntGame';
import { CntHome } from '../L3/controllers/cntHome';
import { CntLogger } from '../L3/controllers/cntLogger';
import { CntNation } from '../L3/controllers/cntNation';
import { CntToken } from '../L3/controllers/cntToken';
import { CntUser } from '../L3/controllers/cntUser';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_ACCESS,
      signOptions: {
        expiresIn: '30m',
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GuaBase,
    },
    SerHome,
    SerNation,
    SerUser,
    SerLogger,
    SerToken,
    SerGame,
  ],
  controllers: [CntHome, CntNation, CntUser, CntLogger, CntToken, CntGame],
})
export class AppModule {}
