/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { fundingSourcesGetBalance } from "../../funcs/fundingSourcesGetBalance.js";
import { GetFundingSourceBalanceRequest$zodSchema } from "../../models/getfundingsourcebalanceop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetFundingSourceBalanceRequest$zodSchema,
};

export const tool$fundingSourcesGetBalance: ToolDefinition<typeof args> = {
  name: "funding-sources-get-balance",
  description: `Retrieve funding source balance

Retrieve funding source balance`,
  scopes: ["read"],
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await fundingSourcesGetBalance(
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
