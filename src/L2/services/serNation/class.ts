import { ApiProperty } from '@nestjs/swagger';

export class NationClass {
  @ApiProperty({ name: 'nation_id', required: true, description: '아이디', example: '' })
  nation_id: string;
  @ApiProperty({ name: 'nation_group', required: true, description: '그룹', example: '' })
  nation_group: string;
  @ApiProperty({ name: 'nation_key', required: true, description: '키', example: '' })
  nation_key: string;
  @ApiProperty({ name: 'nation_value', required: true, description: '값', example: '' })
  nation_value: string;
}
