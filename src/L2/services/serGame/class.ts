import { ApiProperty } from '@nestjs/swagger';

export class GameClass {
  @ApiProperty({ name: 'game_id', required: true, description: '아이디', example: '' })
  game_id: string;
  @ApiProperty({ name: 'game_group', required: true, description: '그룹', example: '' })
  game_group: string;
  @ApiProperty({ name: 'game_key', required: true, description: '키', example: '' })
  game_key: string;
  @ApiProperty({ name: 'game_value', required: true, description: '값', example: '' })
  game_value: string;
  @ApiProperty({ name: 'game_answer', required: true, description: '정답', example: '' })
  game_answer: string;
  @ApiProperty({ name: 'game_user', required: false, description: '유저', example: '' })
  game_user?: string;
}
