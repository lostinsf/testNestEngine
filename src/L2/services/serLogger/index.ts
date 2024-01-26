import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { PriType } from '../../../L1/prismas/type';
import { LoggerClass } from './class';

@Injectable()
export class SerLogger extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', () => {
      app.close();
    });
  }

  async findLogger(data: LoggerClass): Promise<PriType> {
    try {
      const result = await this.logger.findUnique({
        where: {
          logger_id: data.logger_id,
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

  async findGroupLogger(data?: LoggerClass): Promise<PriType> {
    try {
      const result = await this.logger.findMany(
        data !== undefined && {
          where: {
            logger_group: data.logger_group,
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
  async findGroupUserLogger(data?: LoggerClass): Promise<PriType> {
    try {
      const result = await this.logger.findMany(
        data !== undefined && {
          where: {
            logger_group: data.logger_group,
            logger_user: data.logger_user,
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

  async createLogger(data: LoggerClass, req?: Request): Promise<PriType> {
    try {
      const loggerIp: string = req !== undefined ? req.ip : '';
      const dataPlusIp: Prisma.loggerCreateInput = {
        logger_id: data.logger_id,
        logger_group: data.logger_group,
        logger_key: data.logger_key,
        logger_value: data.logger_value,
        logger_device: data.logger_device,
        logger_ip: loggerIp === '::1' ? '127.0.0.1' : loggerIp,
      };
      const result = await this.logger.create({ data: dataPlusIp });
      return {
        check: false,
        result,
      };
    } catch (result) {
      return {
        check: true,
        result,
      };
    }
  }

  async updateLogger(data: LoggerClass, req?: Request): Promise<PriType> {
    try {
      const loggerIp: string = req !== undefined ? req.ip : '';
      const dataTemp = {
        logger_id: data.logger_id,
        logger_group: data.logger_group,
        logger_key: data.logger_key,
        logger_value: data.logger_value,
        logger_device: data.logger_device,
        logger_ip: loggerIp === '::1' ? '127.0.0.1' : loggerIp,
      };
      const result = await this.logger.update({
        where: {
          logger_id: data.logger_id,
        },
        data: dataTemp,
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

  async deleteLogger(data: LoggerClass): Promise<PriType> {
    try {
      const now = new Date();
      const result = await this.logger.delete({
        where: {
          logger_id: data.logger_id,
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

  async deleteGroupLogger(data?: LoggerClass): Promise<PriType> {
    try {
      const now = new Date();
      const result = await this.logger.deleteMany(
        data !== undefined && {
          where: {
            logger_group: data.logger_group,
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
  async deleteGroupUserLogger(data?: LoggerClass): Promise<PriType> {
    try {
      const now = new Date();
      const result = await this.logger.deleteMany(
        data !== undefined && {
          where: {
            logger_group: data.logger_group,
            logger_user: data.logger_user,
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
