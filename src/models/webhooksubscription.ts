/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";

export type WebhookSubscriptionSelf = { href?: string | undefined };

export const WebhookSubscriptionSelf$zodSchema: z.ZodType<
  WebhookSubscriptionSelf,
  z.ZodTypeDef,
  unknown
> = z.object({
  href: z.string().optional(),
});

export type Webhooks = { href?: string | undefined };

export const Webhooks$zodSchema: z.ZodType<Webhooks, z.ZodTypeDef, unknown> = z
  .object({
    href: z.string().optional(),
  });

export type WebhookSubscriptionLinks = {
  self?: WebhookSubscriptionSelf | undefined;
  webhooks?: Webhooks | undefined;
};

export const WebhookSubscriptionLinks$zodSchema: z.ZodType<
  WebhookSubscriptionLinks,
  z.ZodTypeDef,
  unknown
> = z.object({
  self: z.lazy(() => WebhookSubscriptionSelf$zodSchema).optional(),
  webhooks: z.lazy(() => Webhooks$zodSchema).optional(),
});

export type WebhookSubscription = {
  _links?: WebhookSubscriptionLinks | undefined;
  id?: string | undefined;
  url?: string | undefined;
  paused?: boolean | undefined;
  created?: string | undefined;
};

export const WebhookSubscription$zodSchema: z.ZodType<
  WebhookSubscription,
  z.ZodTypeDef,
  unknown
> = z.object({
  _links: z.lazy(() => WebhookSubscriptionLinks$zodSchema).optional(),
  created: z.string().datetime({ offset: true }).optional(),
  id: z.string().optional(),
  paused: z.boolean().optional(),
  url: z.string().optional(),
});
