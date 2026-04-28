#!/usr/bin/env node
// src/index.ts — SYD MCP server bridge
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

const API_KEY = process.env.SYD_API_KEY
const API_URL = process.env.SYD_API_URL ?? "https://api.syd.io/v1/mcp"

if (!API_KEY) {
  console.error("[SYD] Missing SYD_API_KEY environment variable.")
  console.error("[SYD] For demo, use SYD_API_KEY=sk_test_demo and SYD_API_URL=https://demo-api.syd.io/v1/mcp")
  process.exit(1)
}

const server = new McpServer({
  name: "syd",
  version: "0.1.0",
})

server.tool(
  "get_batch_status",
  "Returns the SYD Digital Twin (status, traceability, compliance) for a batch ID.",
  { batch_id: z.string().min(1).describe("The SYD batch ID, e.g. SYD-DEMO-001") },
  async ({ batch_id }) => {
    try {
      const res = await fetch(`${API_URL}/tools/get_batch_status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ batch_id }),
      })

      if (res.status === 401) {
        return { content: [{ type: "text", text: "SYD: invalid API key. Check SYD_API_KEY in your config." }], isError: true }
      }
      if (res.status === 404) {
        return { content: [{ type: "text", text: `SYD: batch "${batch_id}" not found. Try SYD-DEMO-001 through SYD-DEMO-006 if using the sandbox.` }], isError: true }
      }
      if (!res.ok) {
        return { content: [{ type: "text", text: `SYD: server returned ${res.status}.` }], isError: true }
      }

      const data = await res.json()
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      return { content: [{ type: "text", text: `SYD: cannot reach ${API_URL}. ${msg}` }], isError: true }
    }
  }
)

const transport = new StdioServerTransport()
await server.connect(transport)
console.error("[SYD] MCP bridge ready on stdio.")
