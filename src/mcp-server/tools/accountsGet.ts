/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { accountsGet } from "../../funcs/accountsGet.js";
import { GetAccountRequest$zodSchema } from "../../models/getaccountop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetAccountRequest$zodSchema,
};

export const tool$accountsGet: ToolDefinition<typeof args> = {
  name: "accounts-get",
  description: `Retrieve Account Details

Retrieve basic account details belonging to the authorized Dwolla account.`,
  scopes: ["read"],
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await accountsGet(
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
