import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkController } from './controller/link.controller';
import { LinkService } from './link.service';
import { Link, LinkSchema } from './schema/link.schema';
import { LinkRepositoryPort } from './interface/link.repository.port';
import { LinkRepository } from './repository/link.repository';
import { LinkServicePort } from './interface/link.service.port';
import { CreateLinkUseCase } from './use-case/create.use-case';
import { FindLinkByCodeUseCase } from './use-case/find.use-case';
import { LinkRedirectController } from './controller/link-redirect.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Link.name,
        schema: LinkSchema,
      },
    ]),
  ],
  controllers: [LinkController, LinkRedirectController],
  providers: [
    { provide: LinkRepositoryPort, useClass: LinkRepository },
    { provide: LinkServicePort, useClass: LinkService },
    CreateLinkUseCase,
    FindLinkByCodeUseCase,
  ],
})
export class LinkModule {}
