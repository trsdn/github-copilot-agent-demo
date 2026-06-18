# MCP Moments

Use this file during the presentation to show where MCP fits.

The local code change proves Agent Mode can work inside a repo. MCP proves the agent can also reach the systems around the repo.

## Option 1: GitHub MCP

Prompt:

```text
Use GitHub MCP to inspect the current repository context and draft a PR summary for the Agent Mode Command Center change. Do not create the PR unless I confirm.
```

What it shows:

- repo context
- issue/PR workflow
- review handoff

## Option 2: Microsoft Docs MCP

Prompt:

```text
Use Microsoft Docs MCP to find the official guidance for GitHub Copilot custom instructions, prompt files, custom agents, skills, and MCP. Summarize the links I should show in Q&A.
```

What it shows:

- official documentation lookup
- grounding beyond training data
- Q&A support

## Option 3: Playwright MCP

If you later add a visual report, use Playwright MCP to inspect it.

Prompt:

```text
Use Playwright MCP to open the generated report page, verify that the launch decision and blockers are visible, and report any presentation issues.
```

What it shows:

- browser automation
- visual/runtime validation
- end-to-end verification

## Option 4: Work Item MCP

Prompt:

```text
Use the work item MCP to pull acceptance criteria for the launch-readiness change, compare them to the implementation, and produce a traceability summary.
```

What it shows:

- real enterprise workflow
- requirements-to-code traceability
- audit-friendly handoff
