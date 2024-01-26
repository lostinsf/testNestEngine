import { ApiProperty } from '@nestjs/swagger';

export class TokenClass {
  @ApiProperty({ name: 'token_id', required: true, description: '아이디', example: '' })
  token_id: string;
  @ApiProperty({ name: 'token_group', required: true, description: '그룹', example: '' })
  token_group: string;
  @ApiProperty({ name: 'token_key', required: true, description: '키', example: '' })
  token_key: string;
  @ApiProperty({ name: 'token_value', required: true, description: '값', example: '' })
  token_value: string;
  @ApiProperty({ name: 'token_user', required: false, description: '값', example: '' })
  token_user?: string;
  @ApiProperty({ name: 'token_device', required: false, description: '디바이스', example: '' })
  token_device?: string;
}
