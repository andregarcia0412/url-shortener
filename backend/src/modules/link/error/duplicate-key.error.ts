export class DuplicateKeyError extends Error {
  constructor(message = 'A link with this code is already registered') {
    super(message);
    this.name = 'DuplicateKeyError';
  }
}
