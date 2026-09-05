import {
  ArgumentMetadata,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';

export class ShortCodePipe implements PipeTransform<string, string> {
  private readonly pattern = /^[A-Za-z0-9]{8}$/;

  transform(value: string, metadata: ArgumentMetadata): string {
    if (!this.pattern.test(value)) throw new NotFoundException();
    return value;
  }
}
