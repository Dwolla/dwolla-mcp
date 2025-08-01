/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import {
  ExchangePartners,
  ExchangePartners$zodSchema,
} from "./exchangepartners.js";
import { ForbiddenError, ForbiddenError$zodSchema } from "./forbiddenerror.js";

export type ListExchangePartnersResponse = {
  ContentType: string;
  StatusCode: number;
  RawResponse: Response;
  ExchangePartners?: ExchangePartners | undefined;
  ForbiddenError?: ForbiddenError | undefined;
};

export const ListExchangePartnersResponse$zodSchema: z.ZodType<
  ListExchangePartnersResponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  ContentType: z.string(),
  ExchangePartners: ExchangePartners$zodSchema.optional(),
  ForbiddenError: ForbiddenError$zodSchema.optional(),
  RawResponse: z.instanceof(Response),
  StatusCode: z.number().int(),
});
