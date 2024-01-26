import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PriType } from '../../../L1/prismas/type';
import { GameClass } from './class';

@Injectable()
export class SerGame extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', () => {
      app.close();
    });
  }

  async findGame(data: GameClass): Promise<PriType> {
    try {
      const result = await this.game.findUnique({
        where: {
          game_id: data.game_id,
        },
      });
      return {
        check: true,
        result,
      };
    } catch (result) {
      return {
        check: false,
        result,
      };
    }
  }

  async findGroupGame(data: GameClass): Promise<PriType> {
    try {
      const result = await this.game.findMany(
        data !== undefined && {
          where: {
            game_group: data.game_group,
          },
        },
      );
      return {
        check: true,
        result,
      };
    } catch (result) {
      return {
        check: false,
        result,
      };
    }
  }

  async findGroupUserGame(data: GameClass): Promise<PriType> {
    try {
      const result = await this.game.findMany(
        data !== undefined && {
          where: {
            game_group: data.game_group,
            game_user: data.game_user,
          },
        },
      );
      return {
        check: true,
        result,
      };
    } catch (result) {
      return {
        check: false,
        result,
      };
    }
  }

  async createGame(data: GameClass, req?: Request): Promise<PriType> {
    try {
      const result = await this.game.create({
        data,
      });
      return {
        check: true,
        result,
      };
    } catch (result) {
      return {
        check: false,
        result,
      };
    }
  }

  async updateGame(data: GameClass, req?: Request): Promise<PriType> {
    try {
      const result = await this.game.update({
        where: {
          game_id: data.game_id,
        },
        data,
      });
      return {
        check: true,
        result,
      };
    } catch (result) {
      return {
        check: false,
        result,
      };
    }
  }

  async deleteGame(data: GameClass): Promise<PriType> {
    try {
      const result = await this.game.delete({
        where: {
          game_id: data.game_id,
        },
      });
      return {
        check: true,
        result,
      };
    } catch (result) {
      return {
        check: false,
        result,
      };
    }
  }

  async deleteGroupGame(data?: GameClass): Promise<PriType> {
    try {
      const now = new Date();
      const result = await this.game.deleteMany(
        data !== undefined && {
          where: {
            game_group: data.game_group,
          },
        },
      );
      return {
        check: true,
        result,
      };
    } catch (result) {
      return {
        check: true,
        result,
      };
    }
  }

  async deleteGroupUserGame(data?: GameClass): Promise<PriType> {
    try {
      const now = new Date();
      const result = await this.game.deleteMany(
        data !== undefined && {
          where: {
            game_group: data.game_group,
            game_user: data.game_user,
          },
        },
      );
      return {
        check: true,
        result,
      };
    } catch (result) {
      return {
        check: true,
        result,
      };
    }
  }
}
