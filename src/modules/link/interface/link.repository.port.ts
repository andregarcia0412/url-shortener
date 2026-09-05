import { Link } from '../schema/link.schema';

export interface LinkRepositoryPort {
  save(data: Partial<Link>): Promise<Link>;
  findByShortCode(shortCode: string): Promise<Link | null>;
}

export const LinkRepositoryPort = Symbol('LinkRepositoryPort');
