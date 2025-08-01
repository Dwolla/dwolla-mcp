/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { customersList } from "../../funcs/customersList.js";
import { ListAndSearchCustomersRequest$zodSchema } from "../../models/listandsearchcustomersop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListAndSearchCustomersRequest$zodSchema.optional(),
};

export const tool$customersList: ToolDefinition<typeof args> = {
  name: "customers-list",
  description: `List and search customers

List and search customers allowing you to filter by email and status, as well as search on key fields such as firstName, lastName, and businessName.`,
  scopes: ["read"],
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await customersList(
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
