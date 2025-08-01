/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { accountsMassPaymentsList } from "../../funcs/accountsMassPaymentsList.js";
import { ListMassPaymentsRequest$zodSchema } from "../../models/listmasspaymentsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListMassPaymentsRequest$zodSchema,
};

export const tool$accountsMassPaymentsList: ToolDefinition<typeof args> = {
  name: "accounts-mass-payments-list",
  description: `List mass payments for an account

List mass payments for an account`,
  scopes: ["read"],
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await accountsMassPaymentsList(
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
