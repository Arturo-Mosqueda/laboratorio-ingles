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
- [x] GitHub Pages deployed and verified.

## QA results — 2026-07-18

- JavaScript syntax checks passed for `app.js` and `exercises.js`.
- Data integrity checks passed: unique IDs, valid choice indexes, non-empty accepted written answers, 14 exercises per unit, 8 quick-test questions per unit and 5 final-test questions per unit.
- Content scan found no future-perfect lessons, answers or distractors and no Spanish learner-facing interface text.
- Automated browser flow passed for the dashboard, topic page, quick test, answer feedback, 35-question final test and written-answer correction.
- A 390 px browser test initially detected horizontal overflow from the decorative hero pseudo-element. The pseudo-element is now disabled at narrow widths, and the repeated test passed with no horizontal overflow.
- Desktop visual checks passed for the dashboard, topic lesson and final-test question layout.
- Final repeated browser QA passed after balancing every quick test to four direct multiple-choice, two written-answer and two reading questions.

## Deployment — 2026-07-18

- Implementation commit: `6847e0693980eff120b0a53556a32d352d9b36aa`.
- GitHub Pages workflow run `29657234785` completed successfully in 14 seconds.
- Production verification returned HTTP 200.
- Production page title verified as `English Lab · B2 Grammar`.
- Public URL: https://arturo-mosqueda.github.io/laboratorio-ingles/

## Expansion research — 2026-07-18

### Requested scope

- Expand `Future choices` and `Future continuous` with more exercises and more varied task types.
- Make the lesson explanations substantially more detailed and didactic.
- Add diagrams where they clarify a decision or timeline.
- Replace the shared voice-practice template with a genuinely topic-specific prompt for every unit.
- Preserve the existing visual design.

### Sources and findings

- British Council distinguishes four core future-choice signals: spontaneous decision or offer (`will`), prior intention or visible evidence (`be going to`), confirmed personal arrangement (present continuous), and timetable or programme (present simple).
  - https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/future-forms-will-be-going-present-continuous
- British Council’s intermediate future reference confirms the present simple for schedules, present continuous for arrangements, `will` for beliefs/offers/promises, and `be going to` for intentions and present evidence.
  - https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/talking-about-future
- British Council describes future continuous as `will be + -ing` for an action in progress at a future point, a temporary future situation, and neutral questions about another person’s plans.
  - https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/future-continuous-future-perfect
- BBC Learning English confirms the core future-continuous structure and its future-time viewpoint.
  - https://downloads.bbc.co.uk/learningenglish/eiam/unit-1/190111_future_continuous.pdf
- Cambridge B2 task design supports varied original formats such as multiple-choice cloze, open cloze, sentence transformation and contextual reading. Existing source note remains applicable:
  - https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/format/

### Copyright decision

- Published exercise banks will not be copied verbatim. The new questions will be original, while their grammatical coverage and task formats are informed by the sources above.

### Expansion progress

- [x] Research recorded.
- [x] Topic-specific voice prompts added for all seven units.
- [x] Future choices explanation and diagram expanded.
- [x] Future continuous explanation and timeline expanded.
- [x] New varied exercises added to both future units.
- [x] Counts, tests and final-test balance recalculated.
- [x] Browser and content QA repeated.
- [x] GitHub Pages redeployed and verified.

### Expansion implementation

- Added detailed guides to all seven units with introductory reasoning, diagnostic questions, meaning contrasts and common mistakes.
- Added a four-branch decision diagram to `Future choices` covering schedules, arrangements, prior intentions/evidence and immediate decisions/opinions.
- Added a future-time timeline to `Future continuous` showing the viewpoint inside an unfinished future activity.
- Replaced the generic speaking prompt with seven different prompts. Each prompt now names its own grammar targets, scenario type, correction method and speaking sequence.
- Added 10 original exercises to `Future choices` and 10 to `Future continuous`.
- Expanded the complete bank from 98 to 118 questions.
- `Future choices`: 24 questions. `Future continuous`: 24 questions. Other units: 14 questions each.
- Added task formats including form identification, dialogue completion, error correction, sentence transformation, schedule reasoning, meaning contrast, evidence-based prediction, structure building, negative formation, question transformation, timeline reasoning, state-verb checks, reading cloze and reading open cloze.
- Updated total written-answer tasks to 30 and reading-based questions to 25.
- Updated the comprehensive final test from 35 to 39 questions while keeping all seven units represented.

### Expansion QA

- JavaScript syntax checks passed.
- Automated browser QA passed for the new totals, both diagrams, different topic-specific prompts, the copy action, varied task types, the 39-question final test and the 390 px layout.
- Visual inspection passed for both detailed future guides and diagrams.
- No future-perfect material was reintroduced.

### Expansion deployment

- Implementation commit: `7b81be71e36299d614ef5a72b29ac42549cb3dd4`.
- GitHub Pages workflow run `29657801110` completed successfully.
- Production returned HTTP 200.
- A cache-busted production check confirmed the expanded exercise bank and topic-specific voice prompts are present in `exercises.js`.
- Public URL: https://arturo-mosqueda.github.io/laboratorio-ingles/
