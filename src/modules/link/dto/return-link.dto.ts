import { ApiProperty } from '@nestjs/swagger';
import { Link } from '../schema/link.schema';

export class ReturnLinkDto {
  @ApiProperty()
  originalUrl: string;

  @ApiProperty()
  shortCode: string;

  @ApiProperty()
  clickAmount: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(
    originalUrl: string,
    shortenedUrl: string,
    clickAmount: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.originalUrl = originalUrl;
    this.shortCode = shortenedUrl;
    this.clickAmount = clickAmount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromEntity(link: Link, baseUrl: string): ReturnLinkDto {
    return new ReturnLinkDto(
      link.originalUrl,
      `${baseUrl}/${link.shortCode}`,
      link.clickAmount,
      link.createdAt,
      link.updatedAt,
    );
  }
}
