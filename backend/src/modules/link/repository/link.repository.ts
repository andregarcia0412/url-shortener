import { InjectModel } from '@nestjs/mongoose';
import { LinkRepositoryPort } from '../interface/link.repository.port';
import { Link } from '../schema/link.schema';
import { Model } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { DuplicateKeyError } from '../error/duplicate-key.error';

export class LinkRepository implements LinkRepositoryPort {
  constructor(
    @InjectModel(Link.name)
    private readonly linkModel: Model<Link>,
  ) {}

  async save(data: Partial<Link>): Promise<Link> {
    try {
      const newLink = new this.linkModel(data);
      return await newLink.save();
    } catch (e) {
      if (this.isDuplicateKeyError(e)) throw new DuplicateKeyError();
      throw e;
    }
  }
  async findByShortCode(shortCode: string): Promise<Link | null> {
    return await this.linkModel.findOne({ shortCode });
  }

  async increaseClicks(shortCode: string): Promise<Link | null> {
    return await this.linkModel.findOneAndUpdate(
      { shortCode },
      { $inc: { clickAmount: 1 } },
      { new: true },
    );
  }

  private isDuplicateKeyError(error: unknown): error is MongoServerError {
    return error instanceof MongoServerError && error.code === 11000;
  }
}
