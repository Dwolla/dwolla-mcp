/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { Event, Event$zodSchema } from "./event.js";
import { HalLink, HalLink$zodSchema } from "./hallink.js";

export type EventsLinks = {};

export const EventsLinks$zodSchema: z.ZodType<
  EventsLinks,
  z.ZodTypeDef,
  unknown
> = z.object({});

export type EventsEmbedded = { events?: Array<Event> | undefined };

export const EventsEmbedded$zodSchema: z.ZodType<
  EventsEmbedded,
  z.ZodTypeDef,
  unknown
> = z.object({
  events: z.array(Event$zodSchema).optional(),
});

export type Events = {
  _links?: EventsLinks | undefined;
  additionalProperties?: HalLink | undefined;
  _embedded?: EventsEmbedded | undefined;
  total?: number | undefined;
};

export const Events$zodSchema: z.ZodType<Events, z.ZodTypeDef, unknown> = z
  .object({
    _embedded: z.lazy(() => EventsEmbedded$zodSchema).optional(),
    _links: z.lazy(() => EventsLinks$zodSchema).optional(),
    additionalProperties: HalLink$zodSchema.optional(),
    total: z.number().int().optional(),
  });
