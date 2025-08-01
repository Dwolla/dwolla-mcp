/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { labelsListLedgerEntries } from "../../funcs/labelsListLedgerEntries.js";
import { ListLabelLedgerEntriesRequest$zodSchema } from "../../models/listlabelledgerentriesop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListLabelLedgerEntriesRequest$zodSchema,
};

export const tool$labelsListLedgerEntries: ToolDefinition<typeof args> = {
  name: "labels-list-ledger-entries",
  description: `List label ledger entries

List label ledger entries`,
  scopes: ["read"],
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await labelsListLedgerEntries(
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
