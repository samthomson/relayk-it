---
title: Local HTTPS testnet
description: Real domains and real certificates on your machine — a Nostr testnet with any hostname you want.
order: 2
---

Local dev doesn't have to mean `localhost:7777`. With mkcert you can have `https://reallyrelay.io` resolving to your laptop — valid certs, no warnings. This is what makes RelayKit a proper **nostr testnet**.

## One-time setup

```bash
brew install mkcert && mkcert -install
cp scripts/dev-domains.example.txt scripts/dev-domains.txt
```

## Adding a domain

1. Add it to `/etc/hosts` — e.g. `127.0.0.1 reallyrelay.io`
2. Add the same domain to `scripts/dev-domains.txt`
3. Run `./scripts/gen-dev-certs.sh` (restart compose if it's already running, so Caddy picks up the new cert)
4. Create the service in RelayKit with that hostname and choose **No SSL** for local

Now `https://reallyrelay.io` works in the browser and routes to your relay — and any Nostr client can connect to it.

<!-- TODO: diagram of the dev stack (Caddy → Traefik → services). Common gotchas. -->
