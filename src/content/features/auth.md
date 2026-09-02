---
title: Nostr auth (NIP-07)
description: Sign in with the key you already have. RelayKit uses NIP-07 browser extensions — one owner, no passwords.
order: 4
---

RelayKit has no username/password login. You sign in with your Nostr identity through a NIP-07 signer extension — [Alby](https://getalby.com), nos2x, and friends all work.

## Owner-only access

An instance has exactly one owner, identified by npub. During install you set your owner npub; the dashboard only accepts that key. Want to hand over or add an owner? Re-run the install script with a new npub, or write it to `/app/.relaykit/owner-npub` in the container.

<!-- TODO: screenshot of the login prompt. Mention plans for multi-user / team logins if that's on the roadmap. -->
