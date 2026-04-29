# Wire up `data-creek.com` to this Pages deploy

The site is **already live** at https://talchemist112-ops.github.io/datacreek-website/. To make `data-creek.com` and `www.data-creek.com` point at it, do the steps below — should take **two minutes**.

## Step 1 — Cloudflare DNS

Sign in to Cloudflare → select the `data-creek.com` zone → **DNS → Records**. Add these records (delete any conflicting existing ones first):

| Type  | Name | Content                       | Proxy status |
|-------|------|-------------------------------|--------------|
| A     | `@`  | `185.199.108.153`             | DNS only (grey cloud) — set to Proxied later if desired |
| A     | `@`  | `185.199.109.153`             | DNS only |
| A     | `@`  | `185.199.110.153`             | DNS only |
| A     | `@`  | `185.199.111.153`             | DNS only |
| CNAME | `www`| `talchemist112-ops.github.io` | DNS only |

> **Why "DNS only" first**: GitHub needs to verify the domain and issue a Let's Encrypt cert before you turn on Cloudflare's orange-cloud proxy. Once HTTPS is working end-to-end, you can flip the records to Proxied for Cloudflare's CDN/WAF benefits.

## Step 2 — Re-enable the custom domain on this repo

Either:

**a) Via the GitHub web UI:** Settings → Pages → Custom domain → enter `data-creek.com` → Save → wait for the green checkmark → tick **Enforce HTTPS** once it's available (usually within 10 min).

**or b) Via CLI:**

```bash
gh api -X PUT repos/talchemist112-ops/datacreek-website/pages -f cname=data-creek.com
# wait ~5–10 min for Let's Encrypt cert, then:
gh api -X PUT repos/talchemist112-ops/datacreek-website/pages -F https_enforced=true
```

A `CNAME` file containing `data-creek.com` will automatically be re-added to the repo by GitHub. Don't manually delete it.

## Verification

After ~5 minutes:

```bash
curl -sIL https://data-creek.com | head -1   # → expect HTTP/2 200
```

If you see `couldn't resolve host` or `404`, the DNS records haven't propagated yet. Give it another 5–10 min.

## Repo architecture context

- **`talchemist112-ops/DATACREEK-System`** (private) — source of truth. Internal stuff (Settings_DCS, docs, memory, etc.) lives there. Required to stay private because of candidate CV PII.
- **`talchemist112-ops/datacreek-website`** (this repo, public) — public website only. Required to be public because GitHub Pages doesn't work on private repos under the free plan.

When updating the public site, edit `website/` in DATACREEK-System and **also** push the same files into the root of this repo. (Or set up a sync workflow — see "Sync workflow" section below if you want auto-deploy from the private repo.)
