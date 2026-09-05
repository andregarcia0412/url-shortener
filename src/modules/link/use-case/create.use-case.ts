import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { randomInt } from 'crypto';
import { CreateLinkDto } from '../dto/create-link.dto';
import { DuplicateKeyError } from '../error/duplicate-key.error';
import { LinkRepositoryPort } from '../interface/link.repository.port';
import { Link } from '../schema/link.schema';

@Injectable()
export class CreateLinkUseCase {
  private readonly ALPHABET =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  constructor(
    @Inject(LinkRepositoryPort)
    private readonly linkRepository: LinkRepositoryPort,
  ) {}

  async execute(
    createLinkDto: CreateLinkDto,
    length = 8,
    attempts = 5,
  ): Promise<Link> {
    for (let i = 0; i < attempts; i++) {
      try {
        return await this.linkRepository.save({
          ...createLinkDto,
          shortCode: this.generateCode(length),
        });
      } catch (e) {
        if (!(e instanceof DuplicateKeyError)) throw e;
      }
    }
    throw new InternalServerErrorException('Unable to generate a unique code');
  }

  private generateCode(length: number): string {
    let code = '';
    for (let i = 0; i < length; i++) {
      code += this.ALPHABET[randomInt(this.ALPHABET.length)];
    }
    return code;
  }
}
