/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import { WebhookRetries, WebhookRetries$zodSchema } from "./webhookretries.js";

export type ListWebhookRetriesRequest = { id: string };

export const ListWebhookRetriesRequest$zodSchema: z.ZodType<
  ListWebhookRetriesRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  id: z.string().describe("Webhook unique identifier"),
});

export type ListWebhookRetriesResponse = {
  ContentType: string;
  StatusCode: number;
  RawResponse: Response;
  WebhookRetries?: WebhookRetries | undefined;
  NotFoundError?: NotFoundError | undefined;
};

export const ListWebhookRetriesResponse$zodSchema: z.ZodType<
  ListWebhookRetriesResponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  ContentType: z.string(),
  NotFoundError: NotFoundError$zodSchema.optional(),
  RawResponse: z.instanceof(Response),
  StatusCode: z.number().int(),
  WebhookRetries: WebhookRetries$zodSchema.optional(),
});
