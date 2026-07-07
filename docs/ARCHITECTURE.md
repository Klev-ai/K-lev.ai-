# K'lev.ai Production Architecture

## Overview

K'lev.ai is divided into two distinct layers:

1. **Public Platform (K'lev.ai)** - User-facing Android app and backend services
2. **Kode Agent** - Private internal engineering subsystem (never exposed to users)

## Principles

- **Self-healing, not self-willed** - Automated diagnosis and recommendations
- **Adaptive, not chaotic** - Intelligent routing and failover
- **Privately managed** - Engineering internals hidden from users
- **Modular and provider-agnostic** - No vendor lock-in
- **Safety first** - All changes require approval, risk assessment, rollback planning

## Safety Gates

Every change to production passes through:
1. Static Analysis
2. Unit Tests
3. Integration Tests
4. Prompt Evaluation
5. Security Scan
6. Risk Report
7. Human Approval
8. Staged Release

## Data & Compliance

- **POPIA-aware** - Minimal data collection, explicit consent, clear retention
- **Audit trails** - All Kode Agent actions logged immutably
- **No self-modification** - No hidden code changes, no silent updates
- **No secrets exposure** - Credentials never logged, never pushed
