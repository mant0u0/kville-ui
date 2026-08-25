---
name: code-review
description: 'Review the current Git branch changes for bugs, regressions, risks, and missing tests. Use when asked to review code, inspect the current branch, review recent updates, or check changes since the last review. Records the reviewed branch and commit in docs/code-review-baseline.md.'
argument-hint: 'Optional review scope or target branch, for example: compare with main'
user-invocable: true
disable-model-invocation: false
---

# Incremental Code Review

Review the current branch without repeating commits that were already reviewed on
that branch. Record the latest reviewed commit only after the review has been
completed and its findings have been reported.

## Review Scope

Use `docs/code-review-baseline.md` as the branch-specific review ledger.

1. Read the ledger and run:

   ```powershell
   git status --short
   git branch --show-current
   git rev-parse HEAD
   git remote show origin
   ```

2. Determine the target branch in this order:
   - Use the target branch supplied by the user.
   - Otherwise, use the remote default branch reported by `git remote show origin`.
   - Otherwise, use `main` when it exists.

3. Select the committed review range for the current branch:
   - If the ledger has an entry for the current branch and its commit is an
     ancestor of `HEAD`, review `<recorded-commit>..HEAD`.
   - If this is the branch's first review, review
     `<merge-base-with-target>..HEAD`, where the merge base is calculated with
     `git merge-base HEAD <target-branch>`.
   - If a recorded commit is not an ancestor of `HEAD` (for example, after a
     rebase or force-push), state this in the report and use the target branch's
     merge base as the new range.
   - If the current branch is the target branch and there is no prior entry,
     review the uncommitted changes only; do not infer that historical commits
     were reviewed.

4. Treat uncommitted changes separately from the committed range. Inspect both
   staged and unstaged diffs. Never store an uncommitted revision as a reviewed
   commit.

## Review Procedure

1. Inspect the selected scope before reading unrelated code:

   ```powershell
   git diff --check <range>
   git diff --stat <range>
   git diff --name-status <range>
   git log --oneline <range>
   git diff <range>
   git diff --cached
   git diff
   ```

   Omit `<range>` for an empty committed range. Do not include generated or
   vendored files unless they are the source of the issue.

2. Read only the changed files and the nearest implementations, callers, and
   tests needed to validate a concrete concern. Check behavior, error paths,
   compatibility, security-sensitive handling, accessibility for UI changes,
   and whether tests cover the changed contract.

3. Run the narrowest available validation that exercises the changed code. Use
   project scripts when they are relevant. Clearly distinguish an unavailable
   test from a passing test.

4. Report findings first, ordered by severity. Each finding must include:
   - Severity: `critical`, `high`, `medium`, or `low`.
   - A precise file and line link.
   - The triggering scenario, concrete impact, and a correction direction.

5. Do not report style preferences as defects. Do not invent findings. If there
   are no defects, state that explicitly and list residual test gaps or risks.

## Record Completion

After the report is complete, update only the row for the current branch in
`docs/code-review-baseline.md`:

- Set `已審查提交` to the `HEAD` commit only when all committed changes through
  that commit were included in this review.
- Set `未提交變更` to `有` or `無` based on the worktree at review time.
- Set `最後審查日期` to the current local date in `YYYY-MM-DD` format.
- Keep the branch name, full commit SHA, and any other branch rows intact.
- If only uncommitted changes were reviewed, do not add or advance a commit
  baseline. Add a note that the review covered worktree changes only.

In the final response, state the committed range, whether uncommitted changes
were included, validation performed, and the updated ledger path.
