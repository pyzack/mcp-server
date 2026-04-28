# SYD MCP Server

Connect SYD to your AI assistant via the Model Context Protocol.

## Features

- Query batch status, traceability, and compliance through natural language
- Works with Claude Desktop, Cursor, Continue, and any MCP-compatible client
- Read-only, governed, audit-logged in production
- Public sandbox for evaluation -- no SYD account required

## Try it in 5 minutes (sandbox)

Add to your AI client's MCP config and restart:

```json
{
  "mcpServers": {
    "syd-demo": {
      "command": "npx",
      "args": ["-y", "@celerya/mcp-server@latest"],
      "env": {
        "SYD_API_KEY": "sk_test_demo",
        "SYD_API_URL": "https://demo-api.syd.io/v1/mcp"
      }
    }
  }
}
```

Then ask: *"Use SYD to get the status of batch SYD-DEMO-001."*

Demo batches available: `SYD-DEMO-001` through `SYD-DEMO-006`.

## Config file paths per client

- **Claude Desktop -- Mac**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Claude Desktop -- Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Cursor**: `.cursor/mcp.json` in project root, or global settings
- **Continue**: `.continue/config.json`
- **Cline / Zed / Windsurf**: see their respective docs

## Production use

Replace `sk_test_demo` with the personal key issued by SYD, and `SYD_API_URL` with `https://api.syd.io/v1/mcp`. Contact your SYD account team to request a key.

## Available tools

### get_batch_status

Returns the SYD Digital Twin (status, traceability, compliance) for a batch ID.

- **Input**: `batch_id` (string)
- **Output**: SYD.Batch.v1 JSON object

## Configuration

| Variable | Required | Description |
|---|---|---|
| SYD_API_KEY | yes | Your SYD API key |
| SYD_API_URL | no | API endpoint (defaults to https://api.syd.io/v1/mcp) |

## License

MIT
