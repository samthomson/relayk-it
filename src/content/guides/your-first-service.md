---
title: Your first service
description: From fresh install to a live relay with your domain — the five-minute walkthrough.
order: 1
---

You've [installed RelayKit](/install) and signed in. Here's how to get a relay live.

1. **Add a service** — pick a preset (start with [strfry](/services/strfry)).
2. **Set the domain** — e.g. `relay.example.com`. Make sure DNS points at your server.
3. **Choose a certificate** — Let's Encrypt in production; No SSL for local stacks.
4. **Deploy** — RelayKit creates the project, wires routing and starts the container.
5. **Watch it come up** — the card reflects real status; check [insights](/features/insights) or [logs](/features/logs) if anything looks off.

Then point a client at `wss://relay.example.com` and post.

<!-- TODO: screenshot walkthrough of the add-service dialog + first successful post. -->
