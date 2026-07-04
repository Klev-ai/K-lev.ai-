# K'lev.ai Safety Policies

## Kode Agent Restrictions

Kode Agent is prohibited from:

1. **Destructive actions without approval** - Never delete or overwrite without explicit approval
2. **Secret exposure** - Never log keys, credentials, or tokens
3. **Broken dependency changes** - Never upgrade dependencies that break tests
4. **Unverified deletions** - Never delete files without confirming they're unused
5. **Silent behavior changes** - Never modify prompts without evaluation

## Evaluation Gates

All changes require static analysis, testing, security scanning, risk assessment, and human approval.

## Rollback Strategy

Every deployment stores configuration, prompts, policies, artifacts, and migration metadata for instant or fast rollback.

## Incident Response

1. Alert
2. Assess
3. Diagnose
4. Recommend
5. Approve
6. Execute
7. Verify
8. Postmortem
