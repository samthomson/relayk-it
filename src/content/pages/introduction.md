---
title: Introduction
description: RelayKit is a self-hosted control panel for Nostr infrastructure — deploy relays, Blossom servers, nsite gateways and more from one dashboard on your own server.
section: start
order: 1
---

## What is RelayKit?

RelayKit is a simple UI for deploying Nostr services — relays, Blossom servers, nsite gateways, git hosting, notifications — on your own server, using [Dokploy](https://dokploy.com) under the hood.

You install RelayKit once, then use it to spin up and manage as many Nostr services as you like without touching Dokploy, Docker or Traefik directly.

```text
Browser → RelayKit App → Dokploy API
```

<!-- TODO: your pitch — why you built this, the self-sovereign infrastructure story, in your voice. -->

## Who it's for

- **Self-hosters** — run your own relay, Blossom server or nsite gateway without hand-rolling Docker Compose, reverse proxies and certificates.
- **Developers** — spin up disposable Nostr test infrastructure in seconds. Point your test client at `relay.your-local-domain.test` and go.

## What you can deploy

Every service in RelayKit is a curated preset: a Docker Compose template with sensible defaults, exposed configuration, and automatic domain routing. See the [services overview](/services) for the full list — currently relays ([strfry](/services/strfry), [nostr-rs-relay](/services/nostr-rs-relay), [chapar](/services/chapar)), [Blossom](/services/blossom) media servers, [nPanel](/services/npanel) nsite gateways, [grasp](/services/grasp) git hosting, and [pulse](/services/pulse) notifications.

## How it works

1. Run the install script on any VPS — it brings up the stack (Traefik, Dokploy, RelayKit) and provisions auth.
2. Sign in with your Nostr identity via a NIP-07 browser extension (Alby, nos2x, …). One owner key, no passwords.
3. Deploy services from the dashboard: pick a preset, set a domain, press deploy. SSL is handled automatically.

Under the hood RelayKit calls Dokploy's API to create and orchestrate each service; you never have to look at it.

## Where to go next

- [Install RelayKit](/install) on a VPS (or locally for development)
- [Deploy your first service](/docs/your-first-service)
- Browse the [services](/services) and [features](/features/domains)
