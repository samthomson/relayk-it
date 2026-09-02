---
title: nostr-rs-relay
description: A Rust Nostr relay with built-in policy controls — pubkey whitelists, kind filtering and optional NIP-42 auth.
tagline: Rust relay with whitelist and kind filtering policies
type: relay
repo: https://github.com/scsibug/nostr-rs-relay
nips: [NIP-01, NIP-11, NIP-42]
media: []
order: 2
---

[nostr-rs-relay](https://github.com/scsibug/nostr-rs-relay) is scsibug's mature Rust relay. Its superpower is **policy**: control exactly who can publish and which event kinds are accepted.

<!-- TODO: when to pick this over strfry — communities, private-ish relays. Screenshot. -->

## Deploying

From the dashboard: **Add service → nostr-rs-relay**.

| Config | Required | Description |
| --- | --- | --- |
| Relay Domain | yes | e.g. `relay.example.com` |
| Whitelisted Pubkeys (hex) | no | Comma-separated pubkeys allowed to publish. Empty = no whitelist. |
| Whitelisted Event Kinds | no | Comma-separated kind numbers accepted. Empty = no kind whitelist. |
| Blacklisted Event Kinds | no | Kinds to reject. Used only when the kind whitelist is empty. |
| Require NIP-42 Auth | no | Demand AUTH before writes (default off). |

All of these are editable after deploy — see [configuration](/features/configuration).
