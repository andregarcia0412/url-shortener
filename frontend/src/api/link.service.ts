import type { CreateLinkDto, ReturnLinkDto } from "../dto/link.dto";
import { api } from "./client";

export const LinkService = {
  async generateShortUrl(createLinkDto: CreateLinkDto): Promise<ReturnLinkDto> {
    try {
      const { data } = await api.post<ReturnLinkDto>("/link", createLinkDto);
      return data;
    } catch (e) {
      console.error(
        "Error while generating short url:",
        e instanceof Error ? e.message : "Unknown Error",
      );
      throw e;
    }
  },
};
