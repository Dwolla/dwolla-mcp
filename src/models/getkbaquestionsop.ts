/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { ForbiddenError, ForbiddenError$zodSchema } from "./forbiddenerror.js";

export type GetKbaQuestionsRequest = { id: string };

export const GetKbaQuestionsRequest$zodSchema: z.ZodType<
  GetKbaQuestionsRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  id: z.string().describe(
    "The ID of the KBA session to retrieve questions for",
  ),
});

/**
 * 404 Error
 */
export type GetKbaQuestionsNotFoundResponseBody = {
  code?: string | undefined;
  message?: string | undefined;
};

export const GetKbaQuestionsNotFoundResponseBody$zodSchema: z.ZodType<
  GetKbaQuestionsNotFoundResponseBody,
  z.ZodTypeDef,
  unknown
> = z.object({
  code: z.string().optional(),
  message: z.string().optional(),
}).describe("404 Error");

export type LinksAnswer = {
  href?: string | undefined;
  type?: string | undefined;
  resourceType?: string | undefined;
};

export const LinksAnswer$zodSchema: z.ZodType<
  LinksAnswer,
  z.ZodTypeDef,
  unknown
> = z.object({
  href: z.string().optional(),
  resourceType: z.string().optional(),
  type: z.string().optional(),
});

export type GetKbaQuestionsLinks = { answer?: LinksAnswer | undefined };

export const GetKbaQuestionsLinks$zodSchema: z.ZodType<
  GetKbaQuestionsLinks,
  z.ZodTypeDef,
  unknown
> = z.object({
  answer: z.lazy(() => LinksAnswer$zodSchema).optional(),
});

export type QuestionAnswer = {
  id?: string | undefined;
  text?: string | undefined;
};

export const QuestionAnswer$zodSchema: z.ZodType<
  QuestionAnswer,
  z.ZodTypeDef,
  unknown
> = z.object({
  id: z.string().optional(),
  text: z.string().optional(),
});

export type Question = {
  id?: string | undefined;
  text?: string | undefined;
  answers?: Array<QuestionAnswer> | undefined;
};

export const Question$zodSchema: z.ZodType<Question, z.ZodTypeDef, unknown> = z
  .object({
    answers: z.array(z.lazy(() => QuestionAnswer$zodSchema)).optional(),
    id: z.string().optional(),
    text: z.string().optional(),
  });

/**
 * successful operation
 */
export type GetKbaQuestionsResponseBody = {
  _links?: GetKbaQuestionsLinks | undefined;
  id?: string | undefined;
  questions?: Array<Question> | undefined;
};

export const GetKbaQuestionsResponseBody$zodSchema: z.ZodType<
  GetKbaQuestionsResponseBody,
  z.ZodTypeDef,
  unknown
> = z.object({
  _links: z.lazy(() => GetKbaQuestionsLinks$zodSchema).optional(),
  id: z.string().optional(),
  questions: z.array(z.lazy(() => Question$zodSchema)).optional(),
}).describe("successful operation");

export type GetKbaQuestionsResponse = {
  ContentType: string;
  StatusCode: number;
  RawResponse: Response;
  twoHundredApplicationVndDwollaV1HalPlusJsonObject?:
    | GetKbaQuestionsResponseBody
    | undefined;
  ForbiddenError?: ForbiddenError | undefined;
  fourHundredAndFourApplicationVndDwollaV1HalPlusJsonObject?:
    | GetKbaQuestionsNotFoundResponseBody
    | undefined;
};

export const GetKbaQuestionsResponse$zodSchema: z.ZodType<
  GetKbaQuestionsResponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  ContentType: z.string(),
  ForbiddenError: ForbiddenError$zodSchema.optional(),
  RawResponse: z.instanceof(Response),
  StatusCode: z.number().int(),
  fourHundredAndFourApplicationVndDwollaV1HalPlusJsonObject: z.lazy(() =>
    GetKbaQuestionsNotFoundResponseBody$zodSchema
  ).optional(),
  twoHundredApplicationVndDwollaV1HalPlusJsonObject: z.lazy(() =>
    GetKbaQuestionsResponseBody$zodSchema
  ).optional(),
});
