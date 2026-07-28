# relayk.it

Marketing landing page for **[RelayKit](https://github.com/samthomson/relaykit)** — self-host Nostr services (relays, Blossom, nsite gateways) from one control panel.

Live at **[relayk.it](https://relayk.it)**.

## Development

```bash
npm install
npm run dev
```

## Deploy

Publishing uses **[nsyte](https://github.com/sandwichfarm/nsyte)** (NIP-5A **kind 15128** root manifest + Blossom blobs).

```bash
npm install
npm run nsite:publish
```

**First run** downloads the pinned **nsyte** binary from **GitHub Releases** into **`.tools/`** (gitignored). No Deno and no JSR (JSR often returns **403** to Deno’s fetch on some networks).

You are prompted for **`nsec`**, **hex**, or **`nbunksec`**; it is not written to disk by this script.

- **Relays / Blossom / fallback**: `.nsite/config.json`
- **Never** put private keys in `config.json` or commit them.

## Links

- **RelayKit** (main project): [github.com/samthomson/relaykit](https://github.com/samthomson/relaykit)
- **Site**: [relayk.it](https://relayk.it)

## Todo

- [ ] update copy with 'are we decentralised yet' and 'relaykit increases nostr's decentralisation by making running relays easier'
- [ ] add exmaple of nip5 name to ngateway
- [ ] favicon
