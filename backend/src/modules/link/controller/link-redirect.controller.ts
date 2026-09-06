import {
  Controller,
  Get,
  Header,
  HttpRedirectResponse,
  Inject,
  Param,
  Redirect,
} from '@nestjs/common';
import { ApiTemporaryRedirectResponse } from '@nestjs/swagger';
import { LinkServicePort } from '../interface/link.service.port';
import { ShortCodePipe } from '../pipe/short-code.pipe';

@Controller()
export class LinkRedirectController {
  constructor(
    @Inject(LinkServicePort)
    private readonly linkService: LinkServicePort,
  ) {}

  @Get(':shortCode')
  @Redirect()
  @Header('X-Robots-Tag', 'noindex, nofollow')
  @ApiTemporaryRedirectResponse()
  async redirect(
    @Param('shortCode', ShortCodePipe) shortCode: string,
  ): Promise<HttpRedirectResponse> {
    return {
      url: await this.linkService.resolveOriginalUrl(shortCode),
      statusCode: 302,
    };
  }
}
