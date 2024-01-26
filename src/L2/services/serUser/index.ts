import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PriType } from '../../../L1/prismas/type';
import { UserClass } from './class';

@Injectable()
export class SerUser extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', () => {
      app.close();
    });
  }

  async findUser(data: UserClass): Promise<PriType> {
    try {
      const result = await this.user.findUnique({
        where: {
          user_id: data.user_id,
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

  async findGroupUser(data: UserClass): Promise<PriType> {
    try {
      const result = await this.user.findMany(
        data !== undefined && {
          where: {
            user_group: data.user_group,
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

  async createUser(data: UserClass, req?: Request): Promise<PriType> {
    try {
      const result = await this.user.create({
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

  async updateUser(data: UserClass, req?: Request): Promise<PriType> {
    try {
      const result = await this.user.update({
        where: {
          user_id: data.user_id,
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

  async deleteUser(data: UserClass): Promise<PriType> {
    try {
      const result = await this.user.delete({
        where: {
          user_id: data.user_id,
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

  async deleteGroupUser(data?: UserClass): Promise<PriType> {
    try {
      const now = new Date();
      const result = await this.user.deleteMany(
        data !== undefined && {
          where: {
            user_group: data.user_group,
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
