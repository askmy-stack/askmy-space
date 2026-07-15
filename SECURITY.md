# Security Policy

## Reporting a Vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

- Preferred: use GitHub private vulnerability reporting for this repository
  (Security tab → **Report a vulnerability**).
- Alternative: email **kamineniabhinaysai@gmail.com** with a description of
  the issue, steps to reproduce, and potential impact.

We aim to acknowledge reports within 7 days.

## Supported Versions

Security fixes land on `main`. There are no long-lived release branches yet.

## Notes for this project

- Do not commit `.env`, API keys, or credentials.
- The public Ask agent (`/api/assistant/chat`) is rate-limited; treat prompts
  as untrusted input.
- Resume and project media under `public/` are intentionally public assets.
