import { Inject, Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { ReturnLinkDto } from './dto/return-link.dto';
import { LinkServicePort } from './interface/link.service.port';
import { CreateLinkUseCase } from './use-case/create.use-case';
import { FindLinkByCodeUseCase } from './use-case/find.use-case';
import { ConfigService } from '@nestjs/config';
import { ResolveLinkUrlUseCase } from './use-case/resolve-url.use-case';

@Injectable()
export class LinkService implements LinkServicePort {
  private readonly baseUrl: string;
  constructor(
    @Inject(CreateLinkUseCase)
    private readonly createLinkUseCase: CreateLinkUseCase,
    @Inject(FindLinkByCodeUseCase)
    private readonly findLinkByCodeUseCase: FindLinkByCodeUseCase,
    @Inject(ResolveLinkUrlUseCase)
    private readonly resolveLinkUrlUseCase: ResolveLinkUrlUseCase,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = configService.getOrThrow<string>('BASE_URL');
  }

  async create(createLinkDto: CreateLinkDto): Promise<ReturnLinkDto> {
    return ReturnLinkDto.fromEntity(
      await this.createLinkUseCase.execute(createLinkDto),
      this.baseUrl,
    );
  }
  async findLinkByCode(shortCode: string): Promise<ReturnLinkDto> {
    return ReturnLinkDto.fromEntity(
      await this.findLinkByCodeUseCase.execute(shortCode),
      this.baseUrl,
    );
  }
  async resolveOriginalUrl(shortCode: string): Promise<string> {
    return await this.resolveLinkUrlUseCase.execute(shortCode);
  }
}
