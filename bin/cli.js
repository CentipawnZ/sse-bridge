#!/usr/bin/env node

import * as ES from 'eventsource';
global.EventSource = ES.default || ES;

import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const url = process.argv[2];
if (!url) {
    console.error("Usage: npx mcp-sse-bridge <sse-url>");
    process.exit(1);
}

const transport = new SSEClientTransport(new URL(url));

transport.onmessage = (message) => {
    process.stdout.write(JSON.stringify(message) + "\n");
};

transport.onerror = (error) => {
    console.error("SSE Error:", error);
};

// Start the transport
await transport.start();

// Forward Stdin to SSE
let buffer = "";
process.stdin.on("data", (chunk) => {
    buffer += chunk.toString();
    
    // Process full lines
    let newlineIndex;
    while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
        const line = buffer.slice(0, newlineIndex).trim();
        buffer = buffer.slice(newlineIndex + 1);
        
        if (line) {
            try {
                const msg = JSON.parse(line);
                transport.send(msg);
            } catch (e) {
                console.error("Failed to parse Stdin JSON:", e);
            }
        }
    }
});

process.stdin.on("end", () => {
    process.exit(0);
});
