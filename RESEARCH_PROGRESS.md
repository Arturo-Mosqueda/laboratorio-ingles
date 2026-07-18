# Research and Progress Log

This file is updated throughout implementation so decisions and completed work remain traceable.

## Research summary

### Grammar coverage

- British Council’s future-forms material distinguishes spontaneous decisions with `will`, prior intentions with `be going to`, and confirmed arrangements with present continuous.
  - Source: https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/future-forms-will-be-going-present-continuous
- British Council’s determiner and quantifier reference supports the countable/uncountable and specificity distinctions used to design the relevant units.
  - Source: https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/determiners-quantifiers

### B2 task design

- Cambridge B2 First Reading and Use of English uses multiple-choice cloze, open cloze, sentence transformation and reading comprehension. The site will use original questions inspired by these task formats, not copied exercise text.
  - Source: https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/format/
  - Source: https://www.cambridgeenglish.org/Images/167889-cambridge-english-b2-first-reading-overview.pdf

### Design-preservation decisions

- The existing visual design, palette, typography, cards and overall character are being preserved at the user’s request.
- One primary entry point per screen.
- Topic progress is shown with both text and a visual bar.
- Correct/incorrect states always include a label or symbol, not color alone.
- Interactive targets remain at least 44 px high.
- The existing restrained green/cream visual system and two-font limit will be preserved.
- Voice practice uses a neutral SVG microphone/speech icon and copied text only.
- No external OpenAI integration, API, SDK, logo or link is included.

## Baseline audit — 2026-07-18

- Current total: 76 exercises.
- Current general practice exposes only 20 per session: 6 reading questions and 14 short questions.
- Current data topics: articles 11, determiners 12, quantifiers 13, future 16, time clauses 9, advanced future 15.
- Current written-answer exercises: 0.
- Existing reading questions: 16.
- Future-perfect content is mixed into `advanced-future` and must be removed without losing future-continuous items.

## Content implementation — 2026-07-18

- Replaced the six technical data categories with seven learner-facing units.
- Removed all future-perfect lessons, correct answers and distractors.
- Expanded the bank from 76 to 98 original English exercises.
- Every unit now contains exactly 14 exercises.
- Added 21 written-answer tasks and 21 reading-based questions.
- Marked eight balanced questions per unit for quick tests: four direct multiple-choice, two written-answer and two reading questions per unit; 56 quick-test items in total.
- Marked five balanced questions per unit for the final test: 35 final-test items.
- Added flexible written-answer normalisation for case, spacing, curly apostrophes and final punctuation.
- Rebuilt learner-facing interface text in English.
- Added topic pages, full topic practice, all-question practice, quick tests, final test, mistake review and per-topic result breakdowns.
- Added a text-only voice-practice prompt card to every topic.

## Progress

- [x] Plan documented before implementation.
- [x] Prior research and baseline audit documented.
- [x] Existing exercises reclassified into seven units.
- [x] Future-perfect content removed.
- [x] English-only content completed.
- [x] New written and reading exercises added.
- [x] Topic dashboard and topic practice implemented.
- [x] Seven quick tests implemented.
- [x] Comprehensive final test implemented.
- [x] Voice-practice prompt cards implemented.
- [x] Responsive/accessibility QA completed.
- [ ] GitHub Pages deployed and verified.

## QA results — 2026-07-18

- JavaScript syntax checks passed for `app.js` and `exercises.js`.
- Data integrity checks passed: unique IDs, valid choice indexes, non-empty accepted written answers, 14 exercises per unit, 8 quick-test questions per unit and 5 final-test questions per unit.
- Content scan found no future-perfect lessons, answers or distractors and no Spanish learner-facing interface text.
- Automated browser flow passed for the dashboard, topic page, quick test, answer feedback, 35-question final test and written-answer correction.
- A 390 px browser test initially detected horizontal overflow from the decorative hero pseudo-element. The pseudo-element is now disabled at narrow widths, and the repeated test passed with no horizontal overflow.
- Desktop visual checks passed for the dashboard, topic lesson and final-test question layout.
- Final repeated browser QA passed after balancing every quick test to four direct multiple-choice, two written-answer and two reading questions.
