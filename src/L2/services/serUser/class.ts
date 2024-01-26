import { ApiProperty } from '@nestjs/swagger';

export class UserClass {
  @ApiProperty({ name: 'user_id', required: true, description: '아이디', example: '' })
  user_id: string;
  @ApiProperty({ name: 'user_group', required: true, description: '그룹', example: '' })
  user_group: string;
  @ApiProperty({ name: 'user_key', required: true, description: '키', example: '' })
  user_key: string;
  @ApiProperty({ name: 'user_value', required: true, description: '값', example: '' })
  user_value: string;
  @ApiProperty({ name: 'user_email', required: false, description: '이메일', example: '' })
  user_email?: string;
  @ApiProperty({ name: 'user_phone', required: false, description: '휴대폰', example: '' })
  user_phone?: string;
  @ApiProperty({ name: 'user_name', required: false, description: '이름', example: '' })
  user_name?: string;
  @ApiProperty({ name: 'user_password', required: false, description: '패스워드', example: '' })
  user_password?: string;
  @ApiProperty({ name: 'user_device', required: false, description: '디바이스', example: '' })
  user_device?: string;
}
