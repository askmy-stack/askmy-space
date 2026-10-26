## Summary
<!-- Why this change exists -->

## Related issues
<!-- Fixes #N -->

## Checklist
- [ ] Copy / metrics match `content/` (and LinkedIn / resume when relevant)
- [ ] No secrets or `.env*` files
- [ ] Docs updated if architecture or routes changed (`README.md`, `CLAUDE.md`)

## Test plan
- [ ] `npm run lint`
- [ ] `npm run test`
- [ ] `npm run build`
- [ ] Manual check (routes / a11y / content) if UI changed
- [ ] `npm run test:e2e` if routes or hero interaction changed
