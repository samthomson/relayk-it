---
title: Updating RelayKit
description: Update your instance in place from the dashboard — release notes, one click, zero SSH.
order: 3
---

RelayKit releases are versioned images on GHCR. Your dashboard updates itself:

1. The navbar shows your **running version** and a green badge when a newer release is published.
2. Click **update** — the dialog shows the release notes.
3. RelayKit pulls the image, stages the bundled `release.yml`, and recreates the stack via a one-shot helper container.
4. Your hosted services **keep running** throughout; only the control plane restarts briefly. The dashboard reconnects automatically.

Prefer the terminal? On the server:

```bash
IMAGE_TAG=<version> ./scripts/deploy-image.sh
```

See [what changed](/changelog) before you jump.
