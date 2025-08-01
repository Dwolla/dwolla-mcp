/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { customersListAvailableConnections } from "../../funcs/customersListAvailableConnections.js";
import { ListAvailableExchangeConnectionsRequest$zodSchema } from "../../models/listavailableexchangeconnectionsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListAvailableExchangeConnectionsRequest$zodSchema,
};

export const tool$customersListAvailableConnections: ToolDefinition<
  typeof args
> = {
  name: "customers-list-available-connections",
  description: `List available exchange connections

Retrieve a list of a customer's external bank accounts that have been authorized through MX Connect.
Each account is represented as an "available exchange connection" with details like the account name and associated availableConnectionToken.
This information is essential for creating an exchange and corresponding funding source within Dwolla.
`,
  scopes: ["read"],
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await customersListAvailableConnections(
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
