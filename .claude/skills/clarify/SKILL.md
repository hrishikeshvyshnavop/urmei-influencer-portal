---
name: clarify
description: Ask the user simple clarifying questions before doing a task instead of working from assumptions, then confirm a short plan. Use only when the user invokes /clarify.
disable-model-invocation: true
---

# Clarify before working

The user wants no guesswork. Follow these steps for the task given with this command (the arguments, or the user's latest request).

1. **Investigate first.** Read the relevant code so you can ask sharp questions and skip facts you can check yourself (file locations, existing behavior, what the code already does).

2. **Decide whether you have doubts.** If the task is fully clear, skip the questions and go to step 4.

3. **Ask at least five questions** with `AskUserQuestion`:
   - Each one must be simple, easy, and understandable within five seconds: a short question with short options.
   - Ask about real choices only: which element, which behavior, which variant, when, where.
   - The tool takes at most 4 questions per call, so use a second call to reach five or more.
   - Read the answers carefully. If an answer is vague or free text that doesn't settle the doubt, ask a follow-up instead of guessing.

4. **Confirm a short plan.** Give 2–5 bullets covering what you'll change and where, then ask the user to approve it with `AskUserQuestion` (Approve / Change something). Don't edit anything until they approve.

5. **Do the work, then report** what changed, how you verified it, and anything you didn't verify.

Never fill a gap with an assumption. If a new doubt comes up mid-task, stop and ask.
