import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LinkRepositoryPort } from '../interface/link.repository.port';

@Injectable()
export class ResolveLinkUrlUseCase {
  constructor(
    @Inject(LinkRepositoryPort)
    private readonly linkRepository: LinkRepositoryPort,
  ) {}

  async execute(shortCode: string): Promise<string> {
    const existing = await this.linkRepository.increaseClicks(shortCode);
    if (!existing) throw new NotFoundException();

    return existing.originalUrl;
  }
}
