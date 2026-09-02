---
title: Blossom
description: A media server for Nostr — images, videos and files with pubkey-based upload permissions and a built-in dashboard.
tagline: Media server for images, videos and files
type: media
repo: https://github.com/hzrd149/blossom
nips: [NIP-96, NIP-98]
media: []
order: 5
---

[Blossom](https://github.com/hzrd149/blossom) is hzrd149's media server: the standard way Nostr apps upload and serve images, video and other files. Run your own and your media is yours.

<!-- TODO: why self-hosting media matters, how clients use it. Screenshot of an upload. -->

## Deploying

From the dashboard: **Add service → Blossom Server**.

| Config | Required | Description |
| --- | --- | --- |
| Blossom Domain | yes | e.g. `media.example.com` |
| Dashboard Password | yes | Admin dashboard password |
| Dashboard Username | no | Defaults to `admin` |
| Allowed Pubkeys (hex) | no | Comma-separated pubkeys allowed to upload. Empty = any authenticated user. |
