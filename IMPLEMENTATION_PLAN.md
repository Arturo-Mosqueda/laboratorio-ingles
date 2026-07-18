# Laboratorio Inglés — Implementation Plan

## Objective

Transform the current 76-question mixed practice into an English-only B2 grammar course organized by topic, with topic practice, short tests, reading-based exercises, written answers, a comprehensive final test, mistake review, progress tracking, and copyable voice-practice prompts.

## Scope

The course will contain seven units:

1. Future choices: `will`, `be going to`, present continuous and present simple
2. Future continuous
3. Future time clauses
4. Articles
5. Demonstratives, possessives and interrogatives
6. Distributives
7. Quantifiers

Future perfect simple and future perfect continuous will be removed from lessons, exercises, tests and feedback.

## Deliverables

- English-only interface, instructions, theory, feedback and results.
- Topic dashboard with visible progress for every unit.
- Complete practice bank accessible by topic instead of limiting all practice to 20 random questions.
- An eight-question quick test for each topic.
- At least one original reading task for each topic.
- Multiple-choice, written gap-fill, correction and sentence-transformation tasks.
- Flexible written-answer checking for capitalization, spacing and accepted contractions.
- A 35–40 question comprehensive final test covering all seven units.
- Review mode for saved mistakes.
- A final “Practice with ChatGPT Voice” card containing only a neutral icon and copyable text prompt; no API, SDK, external integration or OpenAI asset.
- Responsive and accessible layouts for narrow, medium and wide screens.
- Updated GitHub Pages deployment.

## Implementation sequence

1. Audit and reclassify the existing question bank.
2. Remove all future-perfect material.
3. Define the new data model for topics, written answers, readings and test membership.
4. Add original questions and reading passages informed by authoritative grammar and B2 task formats.
5. Replace the current lesson/practice navigation with topic cards and dedicated topic views.
6. Implement topic practice, quick tests, written-answer checking and the comprehensive test.
7. Add results by topic, mistake review and progress persistence.
8. Add the copyable voice-practice prompt card to every topic.
9. Run syntax, content, interaction, responsive and accessibility checks.
10. Commit, push, wait for GitHub Pages and verify the public URL.

## Acceptance criteria

- No future-perfect teaching or questions remain.
- All learner-facing text is in English.
- Every topic has explanations, practice, an eight-question quick test and a reading task.
- Learners can access all questions by topic.
- Written questions accept documented equivalent answers.
- The comprehensive test covers every topic and contains 35–40 questions.
- Voice practice is a text-only helper with a working copy button.
- Existing local progress does not crash the new version.
- GitHub Pages returns HTTP 200 after deployment.
