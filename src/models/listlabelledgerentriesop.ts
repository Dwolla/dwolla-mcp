/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import {
  BadRequestError,
  BadRequestError$zodSchema,
} from "./badrequesterror.js";
import { ForbiddenError, ForbiddenError$zodSchema } from "./forbiddenerror.js";
import {
  LabelLedgerEntries,
  LabelLedgerEntries$zodSchema,
} from "./labelledgerentries.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";

export type ListLabelLedgerEntriesRequest = {
  id: string;
  limit?: number | undefined;
  offset?: number | undefined;
};

export const ListLabelLedgerEntriesRequest$zodSchema: z.ZodType<
  ListLabelLedgerEntriesRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  id: z.string().describe("A label unique identifier"),
  limit: z.number().int().describe("How many results to return").optional(),
  offset: z.number().int().describe("How many results to skip").optional(),
});

export type ListLabelLedgerEntriesResponse = {
  ContentType: string;
  StatusCode: number;
  RawResponse: Response;
  LabelLedgerEntries?: LabelLedgerEntries | undefined;
  BadRequestError?: BadRequestError | undefined;
  ForbiddenError?: ForbiddenError | undefined;
  NotFoundError?: NotFoundError | undefined;
};

export const ListLabelLedgerEntriesResponse$zodSchema: z.ZodType<
  ListLabelLedgerEntriesResponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  BadRequestError: BadRequestError$zodSchema.optional(),
  ContentType: z.string(),
  ForbiddenError: ForbiddenError$zodSchema.optional(),
  LabelLedgerEntries: LabelLedgerEntries$zodSchema.optional(),
  NotFoundError: NotFoundError$zodSchema.optional(),
  RawResponse: z.instanceof(Response),
  StatusCode: z.number().int(),
});
