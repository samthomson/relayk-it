# Deploy (NIP-5A nsite)

Publishing uses **[nsyte](https://github.com/sandwichfarm/nsyte)** (NIP-5A **kind 15128** root manifest + Blossom blobs).

## Publish

```bash
npm install
npm run nsite:publish
```

**First run** downloads the pinned **nsyte** binary from **GitHub Releases** into **`.tools/`** (gitignored). No Deno and no JSR (JSR often returns **403** to Deno’s fetch on some networks).

You are prompted for **`nsec`**, **hex**, or **`nbunksec`**; it is not written to disk by this script.

- **Relays / Blossom / fallback**: `.nsite/config.json`
- **Never** put private keys in `config.json` or commit them.
