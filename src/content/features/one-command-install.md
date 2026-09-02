---
title: One-command install
description: A single script turns any VPS into a Nostr hosting platform — stack, certificates and auth included.
order: 8
---

```bash
./scripts/install.sh
```

That's the whole ceremony. The script:

1. Prompts for your **owner npub** and **instance domain** (current values offered as defaults on re-run)
2. Generates `JWT_SECRET` and an admin password, writes `.env`
3. Brings up the production stack — Traefik on 80/443 with Let's Encrypt, Dokploy, RelayKit
4. Provisions auth so you can sign in with your extension immediately

Re-running it later changes the domain or owner npub: it updates `.env`, redeploys so Traefik re-issues the certificate, and syncs the owner.

Full walkthrough: [Install](/install).
