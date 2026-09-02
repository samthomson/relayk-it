---
title: pulse
description: Personal Nostr push notifications — mentions, replies, zaps and DMs to your phone as an installable PWA, over your own ntfy server.
tagline: Push notifications for Nostr events to your phone
type: tools
repo: https://github.com/samthomson/relaykit
nips: []
media: []
order: 8
---

pulse watches Nostr for the events you care about — **mentions, replies, zaps, DMs** — and pushes them to your device. Install it as a PWA on your phone; notifications ride on a bundled **ntfy** server (the Google-free push channel — the ntfy app on Android/GrapheneOS connects directly, no Play Services involved).

Identity, relay list and notification rules are configured inside the app itself.

<!-- TODO: screenshot of a push on a phone home screen + rules config. Note the two domains in DNS. -->

## Deploying

From the dashboard: **Add service → pulse**. This one needs **two domains**:

| Config | Required | Description |
| --- | --- | --- |
| pulse domain | yes | e.g. `notifs.example.com` — open on your phone, add to home screen. |
| ntfy domain | yes | e.g. `ntfy.example.com` — the bundled ntfy push server. |
