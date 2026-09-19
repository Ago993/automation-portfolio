# Security notes

This portfolio is a static client-side site with no application backend, database or authentication layer.

## Current protections

- Content Security Policy restricts scripts to the same origin and blocks plugins/objects.
- No eval, new Function, document.write or HTML injection sinks are used by the application script.
- Demo links use HTTPS.
- External links opened in a new tab use rel="noreferrer".
- The site stores no customer data and contains no analytics or tracking code.
- The 3D effects use CSS/DOM only and do not load third-party rendering libraries.

## Limitations

The CSP is delivered through a meta tag because the site is intended for GitHub Pages. A production deployment should enforce CSP and security headers at HTTP level.

The linked demo applications maintain their own security controls and are tested separately.

This is a portfolio landing page, not an authenticated production application.
