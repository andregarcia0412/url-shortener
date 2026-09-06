import { z } from "zod";

export const UrlSchema = z.object({
  url: z
    .url("Enter a full URL starting with http:// or https://")
    .regex(
      /^https?:\/\//,
      "Enter a full URL starting with http:// or https://",
    ),
});
