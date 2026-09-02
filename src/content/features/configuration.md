---
title: Configuration & env vars
description: Edit a service's configuration — whitelists, limits, credentials — without redeploying from scratch.
order: 7
---

Each service preset exposes its useful knobs as **configuration fields** (backed by environment variables in the underlying compose file). RelayKit shows you what matters — pubkeys whitelists, kind filters, dashboard passwords — and hides the boilerplate.

## Edit without redeploying

Update env vars on a running service and apply them without starting from scratch. Changing a service's **domain** is the exception — that triggers a redeploy so routing and certificates line up.

<!-- TODO: screenshot of the edit-config dialog for a relay (whitelists etc.). -->
