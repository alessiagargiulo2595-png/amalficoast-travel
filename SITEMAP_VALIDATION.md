# Sitemap Validation Rules

This project enforces strict validation rules for the sitemap to ensure **only HTTP 200 URLs** are included (no 301 redirects or 404 pages).

## Rules

✅ **Allowed in sitemap:**
- URLs that correspond to actual `index.html` files in `dist/`
- Any page that returns HTTP 200

❌ **NOT allowed in sitemap:**
- Redirect sources (301) - URLs that have entries in `public/_redirects`
- 404 pages - URLs containing `/404/`
- Non-existent files

## Validation Workflows

### 1. Automatic validation on build
```bash
npm run build
```
- Runs `astro build`
- **Automatically validates** sitemap after build completes
- **Fails the build** if sitemap contains invalid URLs
- Shows detailed error report

### 2. Manual validation
```bash
npm run validate-sitemap
```
- Validates existing `dist/sitemap.xml`
- Does not trigger a rebuild
- Useful for testing without rebuilding

### 3. Build without validation (bypass)
```bash
npm run build:no-validate
```
- Builds without running validation
- Use only for debugging

## Git Hooks

### Pre-push validation
A `pre-push` hook automatically validates the sitemap before allowing `git push`:

```bash
git push  # Runs validation first
```

If validation fails:
```
❌ Push blocked: Sitemap validation failed
   Fix the sitemap errors above and try again.
```

**Platforms:**
- **Linux/Mac:** Uses `.git/hooks/pre-push` (bash)
- **Windows:** Uses `.git/hooks/pre-push.cmd` (batch)

To bypass the hook (not recommended):
```bash
git push --no-verify
```

## How It Works

### Sitemap Generation
1. **Dynamic generation** - Reads all `index.html` files from `dist/`
2. **Redirect filtering** - Reads `public/_redirects` and excludes any source URLs
3. **Automatic updates** - Regenerates on every build

### Validation Process
1. **File existence check** - Verifies each URL has a corresponding `index.html`
2. **Redirect check** - Ensures URL is not a redirect source (301)
3. **404 check** - Filters out error pages
4. **Report generation** - Shows summary of valid/invalid URLs

## Current Status

✅ **443 valid URLs (all return 200)**
- en-us: 84 URLs
- de-de: 90 URLs
- fr-fr: 90 URLs
- es-es: 90 URLs
- it-it: 89 URLs

❌ **0 invalid URLs (301 or 404)**

## Common Issues

### Issue: "REDIRECT SOURCE (301): /en-us/destinations/"
**Cause:** This URL is a source of redirect in `public/_redirects`

**Solution:** Either:
1. Add the URL to destination list to remove from sitemap
2. Remove the redirect rule if no longer needed
3. Create the actual page if it should exist

### Issue: "FILE NOT FOUND (404): /en-us/some-page/"
**Cause:** URL is in sitemap but has no corresponding `index.html` file

**Solution:**
1. Create the page, or
2. Remove the URL source that generates it, or
3. Add redirect rule to point elsewhere

## Best Practices

1. **Always run `npm run build`** - Never use `npm run build:no-validate`
2. **Check pre-push errors** - Fix validation errors before pushing
3. **Test locally** - Run validation locally before `git push`
4. **Monitor redirects** - Keep `public/_redirects` clean to avoid confusion

## Files

- **Validation script:** `scripts/validate-sitemap.js`
- **Git hooks:** `.git/hooks/pre-push` and `.git/hooks/pre-push.cmd`
- **Sitemap generator:** `src/pages/sitemap.xml.ts`
- **Redirects:** `public/_redirects`
- **Build config:** `package.json` (scripts section)
