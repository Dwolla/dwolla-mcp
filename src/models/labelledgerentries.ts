/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { HalLink, HalLink$zodSchema } from "./hallink.js";
import {
  LabelLedgerEntry,
  LabelLedgerEntry$zodSchema,
} from "./labelledgerentry.js";

export type LabelLedgerEntriesEmbedded = {
  ledgerEntries?: Array<LabelLedgerEntry> | undefined;
};

export const LabelLedgerEntriesEmbedded$zodSchema: z.ZodType<
  LabelLedgerEntriesEmbedded,
  z.ZodTypeDef,
  unknown
> = z.object({
  ledgerEntries: z.array(LabelLedgerEntry$zodSchema).optional(),
});

export type LabelLedgerEntries = {
  _links?: { [k: string]: HalLink } | undefined;
  _embedded?: LabelLedgerEntriesEmbedded | undefined;
  total?: number | undefined;
};

export const LabelLedgerEntries$zodSchema: z.ZodType<
  LabelLedgerEntries,
  z.ZodTypeDef,
  unknown
> = z.object({
  _embedded: z.lazy(() => LabelLedgerEntriesEmbedded$zodSchema).optional(),
  _links: z.record(HalLink$zodSchema).optional(),
  total: z.number().int().optional(),
});
