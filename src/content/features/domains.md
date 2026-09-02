---
title: Domains & SSL
description: Give every service its own domain. Let's Encrypt certificates in production, no-SSL mode for local development, and painless domain changes later.
order: 1
---

Every service you deploy gets a domain. RelayKit wires the routing and certificates — you never hand-edit Traefik.

## Setting a domain at deploy time

When you add a service, you choose:

- the **domain** it will answer on (e.g. `relay.example.com`)
- the **certificate type**: **Let's Encrypt** in production, or **No SSL** for local/dev stacks

## Changing a domain later

Edit the domain on any existing service. RelayKit recreates the routing and redeploys the service — no container surgery. Some services (like [pulse](/services/pulse)) manage multiple domains at once (e.g. a separate domain for its bundled ntfy server).

## Under the hood

RelayKit calls Dokploy's domain APIs (`domain.create` / `domain.delete` + redeploy) and labels the Traefik routers. The Let's Encrypt resolver is Dokploy's default (`letsencrypt`); if your setup differs, the cert resolver label in the compose file is the one thing to adjust.

<!-- TODO: screenshots of the domain dialog + a service live on its domain. -->
