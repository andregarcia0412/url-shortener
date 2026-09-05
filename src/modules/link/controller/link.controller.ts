import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateLinkDto } from '../dto/create-link.dto';
import { ReturnLinkDto } from '../dto/return-link.dto';
import { LinkServicePort } from '../interface/link.service.port';
import { ShortCodePipe } from '../pipe/short-code.pipe';

@Controller('link')
export class LinkController {
  constructor(
    @Inject(LinkServicePort)
    private readonly linkService: LinkServicePort,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: ReturnLinkDto })
  async create(@Body() createLinkDto: CreateLinkDto): Promise<ReturnLinkDto> {
    return await this.linkService.create(createLinkDto);
  }

  @Get(':shortCode')
  @ApiOkResponse({ type: ReturnLinkDto })
  async findByCode(
    @Param('shortCode', ShortCodePipe) shortCode: string,
  ): Promise<ReturnLinkDto> {
    return await this.linkService.findLinkByCode(shortCode);
  }
}
