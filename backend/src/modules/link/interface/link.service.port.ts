import { CreateLinkDto } from '../dto/create-link.dto';
import { ReturnLinkDto } from '../dto/return-link.dto';

export interface LinkServicePort {
  create(createLinkDto: CreateLinkDto): Promise<ReturnLinkDto>;
  findLinkByCode(shortCode: string): Promise<ReturnLinkDto>;
  resolveOriginalUrl(shortCode: string): Promise<string>;
}

export const LinkServicePort = Symbol('LinkServicePort');
