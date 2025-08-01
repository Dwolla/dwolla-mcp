/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { HalLink, HalLink$zodSchema } from "./hallink.js";
import {
  UnverifiedBusinessCustomer,
  UnverifiedBusinessCustomer$zodSchema,
} from "./unverifiedbusinesscustomer.js";
import {
  UnverifiedCustomer,
  UnverifiedCustomer$zodSchema,
} from "./unverifiedcustomer.js";
import {
  VerifiedBusinessCustomer,
  VerifiedBusinessCustomer$zodSchema,
} from "./verifiedbusinesscustomer.js";
import {
  VerifiedPersonalCustomer,
  VerifiedPersonalCustomer$zodSchema,
} from "./verifiedpersonalcustomer.js";
import {
  VerifiedSolePropCustomer,
  VerifiedSolePropCustomer$zodSchema,
} from "./verifiedsolepropcustomer.js";

export type Customer =
  | UnverifiedCustomer
  | UnverifiedBusinessCustomer
  | VerifiedPersonalCustomer
  | VerifiedSolePropCustomer
  | VerifiedBusinessCustomer;

export const Customer$zodSchema: z.ZodType<Customer, z.ZodTypeDef, unknown> = z
  .union([
    UnverifiedCustomer$zodSchema,
    UnverifiedBusinessCustomer$zodSchema,
    VerifiedPersonalCustomer$zodSchema,
    VerifiedSolePropCustomer$zodSchema,
    VerifiedBusinessCustomer$zodSchema,
  ]);

export type CustomersEmbedded = {
  customers?:
    | Array<
      | UnverifiedCustomer
      | UnverifiedBusinessCustomer
      | VerifiedPersonalCustomer
      | VerifiedSolePropCustomer
      | VerifiedBusinessCustomer
    >
    | undefined;
};

export const CustomersEmbedded$zodSchema: z.ZodType<
  CustomersEmbedded,
  z.ZodTypeDef,
  unknown
> = z.object({
  customers: z.array(z.union([
    UnverifiedCustomer$zodSchema,
    UnverifiedBusinessCustomer$zodSchema,
    VerifiedPersonalCustomer$zodSchema,
    VerifiedSolePropCustomer$zodSchema,
    VerifiedBusinessCustomer$zodSchema,
  ])).optional(),
});

export type Customers = {
  _links?: { [k: string]: HalLink } | undefined;
  _embedded?: CustomersEmbedded | undefined;
};

export const Customers$zodSchema: z.ZodType<Customers, z.ZodTypeDef, unknown> =
  z.object({
    _embedded: z.lazy(() => CustomersEmbedded$zodSchema).optional(),
    _links: z.record(HalLink$zodSchema).optional(),
  });
