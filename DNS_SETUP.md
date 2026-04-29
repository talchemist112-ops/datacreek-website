# Make `www.data-creek.com` work — single step

GitHub Pages is already configured for `www.data-creek.com`. The only thing left is **one DNS record on Cloudflare**.

## The single record to add

Sign in to Cloudflare → select the `data-creek.com` zone → **DNS → Records → + Add record**:

| Field | Value |
|-------|-------|
| **Type** | `CNAME` |
| **Name** | `www` |
| **Target** | `talchemist112-ops.github.io` |
| **Proxy status** | **DNS only** (grey cloud) |
| **TTL** | Auto |

Click **Save**. Done.

## Verification

Within 1–5 minutes:

```
https://www.data-creek.com  →  loads the DATA CREEK site
```

GitHub will auto-issue an HTTPS certificate within ~10 min. After that you can flip the proxy status to **Proxied** (orange cloud) for Cloudflare's CDN/WAF if you want.

## Optional — also redirect the apex `data-creek.com` → `www`

If you want `data-creek.com` (no www) to also work, add either:

**Option 1 (simplest, free):** A Cloudflare Page Rule
- Pattern: `data-creek.com/*`
- Setting: **Forwarding URL** → 301 → `https://www.data-creek.com/$1`

**Option 2 (4 records):** Add A records for the apex
- `A @ 185.199.108.153` (DNS only)
- `A @ 185.199.109.153` (DNS only)
- `A @ 185.199.110.153` (DNS only)
- `A @ 185.199.111.153` (DNS only)

Either works. Pick one.

## Backup URL

While DNS is propagating (or if anything goes wrong), the site is also reachable at:
**https://talchemist112-ops.github.io/datacreek-website/**
