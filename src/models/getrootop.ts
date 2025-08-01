/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { Root, Root$zodSchema } from "./root.js";

/**
 * unauthorized
 */
export type GetRootResponseBody = {
  code?: string | undefined;
  message?: string | undefined;
};

export const GetRootResponseBody$zodSchema: z.ZodType<
  GetRootResponseBody,
  z.ZodTypeDef,
  unknown
> = z.object({
  code: z.string().optional(),
  message: z.string().optional(),
}).describe("unauthorized");

export type GetRootResponse = {
  ContentType: string;
  StatusCode: number;
  RawResponse: Response;
  Root?: Root | undefined;
  object?: GetRootResponseBody | undefined;
};

export const GetRootResponse$zodSchema: z.ZodType<
  GetRootResponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  ContentType: z.string(),
  RawResponse: z.instanceof(Response),
  Root: Root$zodSchema.optional(),
  StatusCode: z.number().int(),
  object: z.lazy(() => GetRootResponseBody$zodSchema).optional(),
});
