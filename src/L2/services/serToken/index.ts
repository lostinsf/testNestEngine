import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PriType } from '../../../L1/prismas/type';
import { TokenClass } from './class';

@Injectable()
export class SerToken extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', () => {
      app.close();
    });
  }

  async findToken(data: TokenClass): Promise<PriType> {
    try {
      const result = await this.token.findUnique({
        where: {
          token_id: data.token_id,
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

  async findGroupToken(data: TokenClass): Promise<PriType> {
    try {
      const result = await this.token.findMany(
        data !== undefined && {
          where: {
            token_group: data.token_group,
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

  async findGroupUserToken(data: TokenClass): Promise<PriType> {
    try {
      const result = await this.token.findMany(
        data !== undefined && {
          where: {
            token_group: data.token_group,
            token_user: data.token_user,
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

  async createToken(data: TokenClass, req?: Request): Promise<PriType> {
    try {
      const result = await this.token.create({
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

  async updateToken(data: TokenClass, req?: Request): Promise<PriType> {
    try {
      const result = await this.token.update({
        where: {
          token_id: data.token_id,
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

  async deleteToken(data: TokenClass): Promise<PriType> {
    try {
      const result = await this.token.delete({
        where: {
          token_id: data.token_id,
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

  async deleteGroupToken(data?: TokenClass): Promise<PriType> {
    try {
      const now = new Date();
      const result = await this.token.deleteMany(
        data !== undefined && {
          where: {
            token_group: data.token_group,
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

  async deleteGroupUserToken(data?: TokenClass): Promise<PriType> {
    try {
      const now = new Date();
      const result = await this.token.deleteMany(
        data !== undefined && {
          where: {
            token_group: data.token_group,
            token_user: data.token_user,
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

  async findKeyToken(data: TokenClass): Promise<PriType> {
    try {
      const result = await this.token.findFirst({
        where: {
          token_key: data.token_key,
        },
        orderBy: {
          id: 'desc',
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

  async findKeyUserToken(data: TokenClass): Promise<PriType> {
    try {
      const result = await this.token.findFirst({
        where: {
          token_key: data.token_key,
          token_user: data.token_user,
        },
        orderBy: {
          id: 'desc',
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
}
