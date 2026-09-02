---
title: nPanel
description: An nsite gateway (NIP-5A) with built-in NIP-05 names on the same domain — host static sites straight from Nostr, republished automatically.
tagline: nsite gateway with same-domain NIP-05 names
type: gateway
repo: https://github.com/hzrd149/nsite-gateway
nips: [NIP-05, NIP-5A]
media: []
order: 6
---

nPanel serves **static sites published to Nostr** (NIP-5A) and answers **NIP-05** names on the same domain. Update your nsite from anywhere — republished sites are picked up automatically within ~10 minutes, or immediately via the service's "refresh nsite content" action.

Under the hood it deploys [nsite-gateway](https://github.com/hzrd149/nsite-gateway), a NIP-05 JSON sidecar, and a Caddy sidecar that serves `/.well-known/nostr.json` while rewriting the host for gateway traffic. Content-hashed assets are cached immutably; HTML is served `no-cache`, so new versions appear without stale-cache issues.

<!-- TODO: walkthrough — publish a site from your client, watch it appear. Screenshot/video. -->

## Deploying

From the dashboard: **Add service → nPanel**.

| Config | Required | Description |
| --- | --- | --- |
| Site domain | yes | The suffix after the long site label — RelayKit builds the full host as `<npub or base36+d>.<this>`. Per deployment. |
| Publishing key | yes | npub or hex of the account that signs the site manifests. |
| Site id (d tag) | no | Named site identifier (1–13 chars `[a-z0-9-]`, not ending in `-`). Leave empty only for a root manifest. |
| Public hostname | no | What visitors type (e.g. `relayk.it`). Empty = use the computed NIP-5A host. Routing + TLS registered on deploy. |
| NIP-05 users | no | `name=npub` mappings, comma or newline separated (e.g. `sam=npub1...`). |
| Event / manifest relays | no | Comma-separated `wss://` URLs for manifest sync. Defaults are fine for most setups. |
