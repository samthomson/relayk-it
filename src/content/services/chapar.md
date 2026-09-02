---
title: chapar
description: A Nostr relay that only accepts chat events (NIP-59) — built for private messaging backends.
tagline: Chat-only relay for NIP-59 gift-wrapped events
type: relay
repo: https://github.com/dezh-tech/ddsr/tree/main/chapar
nips: [NIP-17, NIP-59]
media: []
order: 3
---

Chapar (from the dezh-tech DDSR project) is a relay with a narrow job: it **only accepts chat-app events** — NIP-59 gift wrap and friends. Nothing else gets in, which keeps a messaging backend lean and private by construction.

<!-- TODO: expand — pairing with DM clients, why chat-only relays matter. Screenshot. -->

## Deploying

From the dashboard: **Add service → Chapar Relay**.

| Config | Required | Description |
| --- | --- | --- |
| Relay Domain | yes | e.g. `relay.example.com` |
| Owner Pubkey (hex) | no | The relay owner's public key |
| Contact | no | Operator contact info (shown in relay metadata) |
