/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";

export type WebhookRetriesSelf = { href?: string | undefined };

export const WebhookRetriesSelf$zodSchema: z.ZodType<
  WebhookRetriesSelf,
  z.ZodTypeDef,
  unknown
> = z.object({
  href: z.string().optional(),
});

export type WebhookRetriesLinks = { self?: WebhookRetriesSelf | undefined };

export const WebhookRetriesLinks$zodSchema: z.ZodType<
  WebhookRetriesLinks,
  z.ZodTypeDef,
  unknown
> = z.object({
  self: z.lazy(() => WebhookRetriesSelf$zodSchema).optional(),
});

export type RetrySelf = { href?: string | undefined };

export const RetrySelf$zodSchema: z.ZodType<RetrySelf, z.ZodTypeDef, unknown> =
  z.object({
    href: z.string().optional(),
  });

export type WebhookRetriesWebhook = { href?: string | undefined };

export const WebhookRetriesWebhook$zodSchema: z.ZodType<
  WebhookRetriesWebhook,
  z.ZodTypeDef,
  unknown
> = z.object({
  href: z.string().optional(),
});

export type RetryLinks = {
  self?: RetrySelf | undefined;
  webhook?: WebhookRetriesWebhook | undefined;
};

export const RetryLinks$zodSchema: z.ZodType<
  RetryLinks,
  z.ZodTypeDef,
  unknown
> = z.object({
  self: z.lazy(() => RetrySelf$zodSchema).optional(),
  webhook: z.lazy(() => WebhookRetriesWebhook$zodSchema).optional(),
});

export type WebhookRetriesRetry = {
  _links?: RetryLinks | undefined;
  id?: string | undefined;
  timestamp?: string | undefined;
};

export const WebhookRetriesRetry$zodSchema: z.ZodType<
  WebhookRetriesRetry,
  z.ZodTypeDef,
  unknown
> = z.object({
  _links: z.lazy(() => RetryLinks$zodSchema).optional(),
  id: z.string().optional(),
  timestamp: z.string().datetime({ offset: true }).optional(),
});

export type WebhookRetriesEmbedded = {
  retries?: Array<WebhookRetriesRetry> | undefined;
};

export const WebhookRetriesEmbedded$zodSchema: z.ZodType<
  WebhookRetriesEmbedded,
  z.ZodTypeDef,
  unknown
> = z.object({
  retries: z.array(z.lazy(() => WebhookRetriesRetry$zodSchema)).optional(),
});

export type WebhookRetries = {
  _links?: WebhookRetriesLinks | undefined;
  _embedded?: WebhookRetriesEmbedded | undefined;
  total?: number | undefined;
};

export const WebhookRetries$zodSchema: z.ZodType<
  WebhookRetries,
  z.ZodTypeDef,
  unknown
> = z.object({
  _embedded: z.lazy(() => WebhookRetriesEmbedded$zodSchema).optional(),
  _links: z.lazy(() => WebhookRetriesLinks$zodSchema).optional(),
  total: z.number().int().optional(),
});
