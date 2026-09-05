import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LinkRepositoryPort } from '../interface/link.repository.port';
import { Link } from '../schema/link.schema';

@Injectable()
export class FindLinkByCodeUseCase {
  constructor(
    @Inject(LinkRepositoryPort)
    private readonly linkRepository: LinkRepositoryPort,
  ) {}

  async execute(shortCode: string): Promise<Link> {
    const existing = await this.linkRepository.findByShortCode(shortCode);
    if (!existing) throw new NotFoundException('Link not found');

    return existing;
  }
}
