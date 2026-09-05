import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @ApiProperty()
  @IsUrl({ require_protocol: true, protocols: ['http', 'https'] })
  @IsNotEmpty()
  originalUrl!: string;
}
