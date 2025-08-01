/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { HalLink, HalLink$zodSchema } from "./hallink.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";

export type GetMicroDepositsRequest = { id: string };

export const GetMicroDepositsRequest$zodSchema: z.ZodType<
  GetMicroDepositsRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  id: z.string().describe(
    "The ID of the FS that previously had micro-deposits initiated",
  ),
});

export type Failure = {
  code?: string | undefined;
  description?: string | undefined;
};

export const Failure$zodSchema: z.ZodType<Failure, z.ZodTypeDef, unknown> = z
  .object({
    code: z.string().optional(),
    description: z.string().optional(),
  });

/**
 * successful operation
 */
export type GetMicroDepositsResponseBody = {
  _links?: { [k: string]: HalLink } | undefined;
  created?: string | undefined;
  status?: string | undefined;
  failure?: Failure | undefined;
};

export const GetMicroDepositsResponseBody$zodSchema: z.ZodType<
  GetMicroDepositsResponseBody,
  z.ZodTypeDef,
  unknown
> = z.object({
  _links: z.record(HalLink$zodSchema).optional(),
  created: z.string().datetime({ offset: true }).optional(),
  failure: z.lazy(() => Failure$zodSchema).optional(),
  status: z.string().optional(),
}).describe("successful operation");

export type GetMicroDepositsResponse = {
  ContentType: string;
  StatusCode: number;
  RawResponse: Response;
  object?: GetMicroDepositsResponseBody | undefined;
  NotFoundError?: NotFoundError | undefined;
};

export const GetMicroDepositsResponse$zodSchema: z.ZodType<
  GetMicroDepositsResponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  ContentType: z.string(),
  NotFoundError: NotFoundError$zodSchema.optional(),
  RawResponse: z.instanceof(Response),
  StatusCode: z.number().int(),
  object: z.lazy(() => GetMicroDepositsResponseBody$zodSchema).optional(),
});
