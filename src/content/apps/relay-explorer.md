---
title: Relay explorer
description: A phpMyAdmin-style console for Nostr relays — point it at any relay and inspect live events, filters and all.
order: 1
---

Think **phpMyAdmin for relays**: point it at any Nostr relay and watch what's actually on it — events by kind, author and recency, raw and live.

## Speaks plain Nostr

The explorer is built on raw protocol primitives — `REQ` filters over websocket, nothing proprietary — so it works with **any** conforming relay, not just the ones RelayKit deploys. That includes relays that gate reads or writes behind **NIP-42 auth**: when challenged, it signs `AUTH` with your key and carries on.

Perfect for verifying a fresh relay is accepting events, or digging into what your whitelists and kind filters are letting through.

<!-- TODO: screenshot of the console browsing a relay. -->
