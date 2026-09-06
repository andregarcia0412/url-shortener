export type CreateLinkDto = {
  originalUrl: string;
};

export type ReturnLinkDto = {
  originalUrl: string;
  shortCode: string;
  clickAmount: number;
  createdAt: Date;
  updatedAt: Date;
};
