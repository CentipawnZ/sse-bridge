# sse-bridge (mcp-sse-bridge)

A universal STDIO-to-HTTP/SSE bridge for [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) servers. 

`sse-bridge` allows local AI desktop clients like **Cursor**, **Claude Desktop**, **Antigravity**, and **LMStudio** (which typically only support STDIO transports) to communicate natively with remote MCP servers hosted over Server-Sent Events (SSE) via HTTP/HTTPS.

## 🚀 Installation

Install globally using `npm` to ensure lightning-fast startup times (bypassing the `npx` download delay which can cause timeouts in clients like LMStudio):

```bash
npm install -g sse-bridge
```

## 🛠️ Configuration & Usage

Configure your AI client to use the `sse-bridge` executable, passing your remote SSE MCP server's URL as the only argument.

### For LMStudio
In the LMStudio MCP configuration UI:
- **Transport Type:** `stdio`
- **Command:** `/usr/local/bin/sse-bridge` *(Use the absolute path to avoid PATH resolution issues)*
- **Arguments:** `https://your-remote-mcp-server.com/sse`

### For Cursor, Claude Desktop, or Antigravity
Update your MCP JSON configuration file (e.g. `mcp_config.json` or `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "my-remote-server": {
      "command": "sse-bridge",
      "args": [
        "https://your-remote-mcp-server.com/sse"
      ]
    }
  }
}
```

## 💡 Why `sse-bridge` instead of `npx`?
While you can technically use `npx -y sse-bridge <url>`, tools like **LMStudio** have very aggressive initialization timeouts (often < 5 seconds). `npx` must check the registry for updates before execution, causing a 2-5 second delay, which leads to `Plugin initialization timed-out` errors. Installing it globally via `npm install -g sse-bridge` guarantees near-instantaneous startup.

## 📄 License
MIT License
