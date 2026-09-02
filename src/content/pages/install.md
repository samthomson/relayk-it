---
title: Install
description: Get RelayKit running on a VPS with one command, or set up a local development stack with HTTPS on any domain you want.
section: start
order: 2
---

## Requirements

- A server (or local machine) with **Docker** installed
- A **Nostr pubkey** you control (an npub you can sign with a NIP-07 extension like Alby or nos2x)
- For production: a domain with its A record pointed at your server, ports 80/443 open

## Production install (on your own server)

Point your domain's A record at the server, then from the repo root run:

```bash
./scripts/install.sh
```

The script prompts for your owner npub and instance domain, generates `JWT_SECRET` and an admin password, writes `.env`, starts the stack, and provisions auth. Traefik obtains a Let's Encrypt certificate for your domain automatically.

> Ports 80/443 must be open and DNS must point at the server — not proxied through Cloudflare — during first certificate issuance.

Once it finishes, open your domain and sign in with your Nostr extension.

<!-- TODO: link to a first-run screenshot/video here (drop files in public/media and reference them). -->

## Local development

Everything runs in Docker. From the repo root:

**1. Set a JWT secret**

```bash
cp .env.example .env
```

Edit `.env` and set `JWT_SECRET` to a random string (e.g. the output of `openssl rand -base64 32`).

**2. Create the external Dokploy network (one-time)**

```bash
docker network create dokploy-network
```

If it already exists, Docker tells you and you can continue.

**3. Start the stack**

```bash
docker compose --profile dev up
```

Wait for containers to come up: Dokploy at `http://localhost:3020`, RelayKit frontend at `http://localhost:5173`.

**4. Run the setup script**

Replace `npub1your...` with the pubkey you'll sign in with:

```bash
OWNER_NPUB=npub1your... ADMIN_PASSWORD=your_secure_password ./scripts/setup-relaykit-auth.sh
```

This creates a Dokploy admin account, obtains an API key, and writes it into the RelayKit container. Reload RelayKit in your browser and sign in.

**If step 4 fails** (e.g. "Registration failed" because Dokploy already has an admin): log in to Dokploy → Settings → Profile → API/CLI, create an API key, then:

```bash
docker compose exec relaykit sh -c 'printf "%s" "PASTE_THE_KEY_HERE" > /app/.relaykit/bootstrap-key'
```

## Local HTTPS on any domain

For realistic domains (`https://reallyrelay.io`) in local dev, see the [local HTTPS guide](/docs/local-https).

## Next steps

- [Deploy your first service](/docs/your-first-service)
- Learn about [domains and SSL](/features/domains)
- [Updating RelayKit](/docs/updating)
