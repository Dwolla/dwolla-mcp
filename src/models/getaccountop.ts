/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { Account, Account$zodSchema } from "./account.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";

export type GetAccountRequest = { id: string };

export const GetAccountRequest$zodSchema: z.ZodType<
  GetAccountRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  id: z.string().describe("Account's unique identifier"),
});

/**
 * forbidden
 */
export type GetAccountResponseBody = {
  code?: string | undefined;
  message?: string | undefined;
};

export const GetAccountResponseBody$zodSchema: z.ZodType<
  GetAccountResponseBody,
  z.ZodTypeDef,
  unknown
> = z.object({
  code: z.string().optional(),
  message: z.string().optional(),
}).describe("forbidden");

export type GetAccountResponse = {
  ContentType: string;
  StatusCode: number;
  RawResponse: Response;
  Account?: Account | undefined;
  object?: GetAccountResponseBody | undefined;
  NotFoundError?: NotFoundError | undefined;
};

export const GetAccountResponse$zodSchema: z.ZodType<
  GetAccountResponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  Account: Account$zodSchema.optional(),
  ContentType: z.string(),
  NotFoundError: NotFoundError$zodSchema.optional(),
  RawResponse: z.instanceof(Response),
  StatusCode: z.number().int(),
  object: z.lazy(() => GetAccountResponseBody$zodSchema).optional(),
});
