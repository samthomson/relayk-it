---
title: strfry
description: A high-performance Nostr relay written in C++ — the default choice for a general-purpose relay.
tagline: High-performance general-purpose relay in C++
type: relay
repo: https://github.com/hoytech/strfry
nips: [NIP-01, NIP-11]
media: []
order: 1
---

[strfry](https://github.com/hoytech/strfry) is hoytech's blazing-fast Nostr relay written in C++. If you want one relay that just works — high throughput, low resource use, no database fuss — this is it.

<!-- TODO: why you run strfry on your own infra, in your voice. Screenshot of it live in a client. -->

## Deploying

From the dashboard: **Add service → Strfry**. The only required setting:

| Config | Required | Description |
| --- | --- | --- |
| Relay Domain | yes | e.g. `relay.example.com` — answers on `wss://…` |

Certificate type is chosen at deploy (**Let's Encrypt** in prod, **No SSL** locally) and can be edited later.

<!-- TODO: notes on strfry.conf options RelayKit exposes (if any), negentropy/sync behavior worth mentioning. -->
