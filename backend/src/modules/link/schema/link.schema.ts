import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Link {
  @Prop({ required: true })
  originalUrl!: string;

  @Prop({ required: true, unique: true, index: true })
  shortCode!: string;

  @Prop({ required: true, default: 0 })
  clickAmount: number;

  createdAt!: Date;

  updatedAt!: Date;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
