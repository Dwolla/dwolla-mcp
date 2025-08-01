/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { massPaymentsGetItem } from "../../funcs/massPaymentsGetItem.js";
import { GetMassPaymentItemRequest$zodSchema } from "../../models/getmasspaymentitemop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetMassPaymentItemRequest$zodSchema,
};

export const tool$massPaymentsGetItem: ToolDefinition<typeof args> = {
  name: "mass-payments-get-item",
  description: `Retrieve mass payment item

Retrieve mass payment item`,
  scopes: ["read"],
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await massPaymentsGetItem(
      client,
      args.request,
      { fetchOptions: { signal: ctx.signal } },
    ).$inspect();

    if (!result.ok) {
      return {
        content: [{ type: "text", text: result.error.message }],
        isError: true,
      };
    }

    const value = result.value;

    return formatResult(value, apiCall);
  },
};
