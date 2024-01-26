import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PriType } from '../../../L1/prismas/type';
import { NationClass } from './class';

@Injectable()
export class SerNation extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', () => {
      app.close();
    });
  }

  async findNation(data: NationClass): Promise<PriType> {
    try {
      const result = await this.nation.findUnique({
        where: {
          nation_id: data.nation_id,
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

  async findGroupNation(data?: NationClass): Promise<PriType> {
    try {
      const result = await this.nation.findMany(
        data !== undefined && {
          where: {
            nation_group: {
              contains: data.nation_group,
            },
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

  async createNation(data: NationClass, req?: Request): Promise<PriType> {
    try {
      const result = await this.nation.create({
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

  async updateNation(data: NationClass, req?: Request): Promise<PriType> {
    try {
      const result = await this.nation.update({
        where: {
          nation_id: data.nation_id,
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

  async deleteNation(data: NationClass): Promise<PriType> {
    try {
      const result = await this.nation.delete({
        where: {
          nation_id: data.nation_id,
        },
      });
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

  async deleteGroupNation(data?: NationClass): Promise<PriType> {
    try {
      const now = new Date();
      const result = await this.nation.deleteMany(
        data !== undefined && {
          where: {
            nation_group: data.nation_group,
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
