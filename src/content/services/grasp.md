---
title: grasp
description: Self-hosted git-over-nostr backend — a git host with an embedded relay (GRASP) and a built-in ngit repo explorer.
tagline: Git hosting over Nostr with embedded relay
type: tools
repo: https://gitworkshop.dev/danconwaydev.com/ngit-grasp
nips: []
media: []
order: 7
---

grasp is a self-hosted **git-over-nostr** backend: push and clone repositories over Nostr, with an embedded relay (GRASP) and a built-in **ngit repo explorer** to browse what's hosted.

<!-- TODO: the nostrified-git story — why git over nostr, how repos/branches map to events. Screenshot of the explorer. -->

## Deploying

From the dashboard: **Add service → grasp**. One domain serves both git traffic and the embedded relay.

| Config | Required | Description |
| --- | --- | --- |
| grasp domain | yes | e.g. `git.example.com` — serves git clone/push and the relay. |
| relay name | no | Display name in the relay's NIP-11 info. Defaults to your domain. |
| relay description | no | Short description for the NIP-11 info. |
| bootstrap sync relay | no | A `wss://` relay to seed repo discovery; more relays are found automatically. |
| accept contributor prs | no | Enable grasp-06 so anyone can push PR branches without pre-authorisation. |
| repository whitelist | no | Comma-separated npub / npub-identifier / identifier. Empty = any repo that lists this server. |
| blocked authors | no | Comma-separated npubs whose events are always rejected. |
