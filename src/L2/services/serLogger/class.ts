import { ApiProperty } from '@nestjs/swagger';

export class LoggerClass {
  @ApiProperty({ name: 'logger_id', required: true, description: '아이디', example: '' })
  logger_id: string;
  @ApiProperty({ name: 'logger_group', required: true, description: '그룹', example: '' })
  logger_group: string;
  @ApiProperty({ name: 'logger_key', required: true, description: '키', example: '' })
  logger_key: string;
  @ApiProperty({ name: 'logger_value', required: true, description: '값', example: '' })
  logger_value: string;
  @ApiProperty({ name: 'logger_device', required: false, description: '디바이스', example: '' })
  logger_device?: string;
  @ApiProperty({ name: 'logger_ip', required: false, description: '아이피', example: '' })
  logger_ip?: string;
  @ApiProperty({ name: 'logger_user', required: false, description: '유저', example: '' })
  logger_user?: string;
}
