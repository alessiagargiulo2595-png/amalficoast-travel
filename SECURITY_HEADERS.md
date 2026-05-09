# Security Headers Configuration

This document explains the security headers configured for the Amalfi Coast Travel website.

## Overview

Security headers protect against common web vulnerabilities including:
- **XSS (Cross-Site Scripting)** attacks
- **Clickjacking** attacks
- **MIME type sniffing**
- **Insecure data transmission**

## Headers Configuration

All security headers are configured in `public/_headers` for Netlify deployment.

### 1. Content-Security-Policy (CSP)

**Purpose**: Prevents unauthorized scripts from executing and protects against XSS attacks.

**Policy**:
```
default-src 'self'
script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com 'unsafe-inline'
style-src 'self' https://fonts.googleapis.com 'unsafe-inline'
font-src 'self' https://fonts.gstatic.com data:
img-src 'self' data: https:
connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://region1.analytics.google.com
frame-ancestors 'none'
base-uri 'self'
form-action 'self'
```

**Explanation**:

| Directive | Allows | Purpose |
|-----------|--------|---------|
| `default-src 'self'` | Only resources from same origin | Fallback for unspecified directives |
| `script-src 'self' ...` | Local scripts + Google Analytics | Executes only trusted JavaScript |
| `style-src 'self' ...` | Local styles + Google Fonts + inline (Tailwind) | CSS from trusted sources only |
| `font-src 'self' ...` | Local fonts + Google Fonts | Web fonts from trusted sources |
| `img-src 'self' ...` | Local + data URLs + HTTPS images | Prevents malicious image loads |
| `connect-src 'self' ...` | API calls + Google Analytics | Restricts external connections |
| `frame-ancestors 'none'` | No iframe embedding | Prevents clickjacking |
| `base-uri 'self'` | Same-origin base URLs only | Prevents base tag injection |
| `form-action 'self'` | Forms submit only to same origin | Prevents form hijacking |

**Allowed External Domains**:
- `https://www.googletagmanager.com` - Google Analytics tracking
- `https://www.google-analytics.com` - Google Analytics endpoints
- `https://fonts.googleapis.com` - Google Fonts stylesheets
- `https://fonts.gstatic.com` - Google Fonts files
- `https://region1.google-analytics.com` - GA4 regional endpoint
- `https://region1.analytics.google.com` - GA4 analytics endpoint

### 2. X-Content-Type-Options

**Value**: `nosniff`

**Purpose**: Prevents MIME type sniffing attacks.

**Effect**: Forces browser to respect declared Content-Type and not guess MIME types. Prevents execution of non-script files as scripts.

### 3. X-Frame-Options

**Value**: `DENY`

**Purpose**: Prevents clickjacking attacks.

**Effect**: Site cannot be embedded in iframes on any domain (including same-origin). Use `SAMEORIGIN` if embedding in own iframes is needed.

### 4. X-XSS-Protection

**Value**: `1; mode=block`

**Purpose**: Browser-level XSS protection (legacy, but good for defense-in-depth).

**Effect**: Enables browser's built-in XSS filter and blocks page if attack detected.

### 5. Referrer-Policy

**Value**: `strict-origin-when-cross-origin`

**Purpose**: Controls referrer information sent to external sites.

**Effect**:
- Sends full referrer URL only for same-origin requests
- Sends only origin (no path) for cross-origin requests
- Sends nothing for HTTP to HTTPS downgrades

**Benefits**: Protects user privacy while allowing analytics to work

### 6. Permissions-Policy (formerly Feature-Policy)

**Value**: Disables all sensitive features

**Disabled Features**:
- `geolocation=()` - No access to GPS/location
- `microphone=()` - No microphone access
- `camera=()` - No camera access
- `payment=()` - No Payment Request API
- `usb=()` - No USB device access
- `magnetometer=()` - No magnetic field sensor
- `gyroscope=()` - No motion sensor
- `accelerometer=()` - No acceleration sensor

**Purpose**: Prevents third-party scripts from accessing sensitive hardware/features.

### 7. Strict-Transport-Security (HSTS)

**Value**: `max-age=31536000; includeSubDomains; preload`

**Purpose**: Forces HTTPS connections.

**Effect**:
- `max-age=31536000` - Cache for 1 year (31,536,000 seconds)
- `includeSubDomains` - Apply to all subdomains
- `preload` - Include in HSTS preload list (all browsers)

**Benefits**:
- Prevents SSL/TLS stripping attacks
- Automatic HTTPS enforcement
- Prevents accidental HTTP visits

## Testing the Headers

### Using Browser DevTools

1. Open DevTools (F12)
2. Go to **Network** tab
3. Reload the page
4. Click any request
5. Check **Response Headers** tab
6. Look for the security headers listed above

### Using Online Tools

- **Security Headers.io**: https://securityheaders.com
  - Enter your domain: `https://amalficoast-travel.com`
  - See security grade and recommendations

- **Mozilla Observatory**: https://observatory.mozilla.org
  - Comprehensive security scan
  - Detailed recommendations

### Using Command Line

```bash
# Check all headers
curl -I https://amalficoast-travel.com

# Check specific header
curl -I https://amalficoast-travel.com | grep "Content-Security-Policy"
```

## Future Improvements

### Remove 'unsafe-inline' (When Possible)

Current CSP uses `'unsafe-inline'` for scripts and styles. To improve security:

1. **For scripts**: Remove `'unsafe-inline'` by extracting inline scripts to separate files
2. **For styles**: Remove `'unsafe-inline'` by extracting inline styles

**Note**: Tailwind CSS integration and inline GA scripts currently require `'unsafe-inline'`. These can be refactored to use nonces or separate files.

### Nonce Implementation

Instead of `'unsafe-inline'`, use nonces:

```astro
<script nonce="random-unique-value">
  // inline script
</script>
```

**Benefits**:
- Much more secure than `'unsafe-inline'`
- Only allows scripts with matching nonce
- Prevents most XSS attacks

### Subresource Integrity (SRI)

For external scripts, add SRI hashes:

```html
<script
  src="https://example.com/library.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
  crossorigin="anonymous">
</script>
```

**Benefits**: Ensures external scripts haven't been tampered with

## Monitoring & Maintenance

### Check Regularly

1. **Monthly**: Test on securityheaders.com
2. **After updates**: Rebuild and verify CSP isn't breaking features
3. **New features**: Update CSP when adding external resources

### CSP Violation Reports

To receive violation reports (optional):

```
Content-Security-Policy:
  ...;
  report-uri https://example.com/csp-report
```

Would need:
- Endpoint to receive POST requests with violation details
- Analysis of violations to refine policy

## Files

- **Configuration**: `public/_headers` (Netlify format)
- **Documentation**: This file

## References

- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [MDN: HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [OWASP: Content Security Policy](https://owasp.org/www-community/attacks/xss/)
- [Security Headers Best Practices](https://securityheaders.com)

---

**Last Updated**: 2026-05-09
**Status**: ✅ Implemented on all pages via Netlify `_headers` file
