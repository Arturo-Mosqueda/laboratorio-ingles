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

## Deep-course completion research — 2026-08-10

### Research decisions

- Cambridge B2 First and C1 Advanced public formats remain structural references only. The implementation uses multi-part Reading/Use of English, Writing, Listening and Speaking routes, but no official question has been copied.
- CEFR’s action-oriented model informed the decision to require reception, production, interaction, reflection and portfolio evidence rather than treating a selected-response score as complete language ability.
- Browser SpeechSynthesis remains an accessibility and practice mechanism, not a claim of recorded accent authenticity. Regional language hints (`en-GB`, `en-US`, `en-CA`, `en-AU`) request suitable installed voices, while every task retains a transcript fallback.
- Educational diagrams were implemented in HTML and CSS because timelines, decision paths, pronunciation transfer and technical process relationships need responsive labels and direct connection to interactive tasks. No decorative image was added where it would not improve understanding.

Sources retained for the assessment rationale:

- https://www.cambridgeenglish.org/exams-and-tests/qualifications/advanced/format/
- https://www.cambridgeenglish.org/exams-and-tests/first/exam-format/
- https://www.coe.int/en/web/common-european-framework-reference-languages/introduction-and-context
- https://book.coe.int/en/education-and-modern-languages/8152-common-european-framework-of-reference-for-languages-learning-teaching-assessment-companion-volume.html

### Content depth completed

- Converted all 23 modules into openable, module-specific five-lesson routes: 115 lessons in total.
- Built 72 complete Grammar Studios and kept the original 16 topics, 244 exercises, two partial exams, detailed guides, diagrams and text-only topic voice prompts.
- Added eight integrated source-based units and expanded the libraries to 16 readings and 16 playable listening sources.
- Added 23 writing genres and verified 358 writing challenges with complete models, commentary and eight self-review criteria.
- Expanded vocabulary to 132 contextual entries across 22 domains, each with a lexical system and personal spaced-retrieval word-bank support.
- Enriched eight portfolio projects with milestones, deliverables and evidence rubrics.
- Added a dedicated Technical English progression: 32 scenarios and 166 activities, including a five-lesson B2+ module.

### System and assessment progress

- Added browser-local timer and recording support for oral tasks; recordings are never uploaded.
- Persisted richer error evidence: learner answer, accepted answer, date, error type, topic, skill and level.
- Added SRS stage, ease and intervals for regular mistakes and the vocabulary bank.
- Added evidence-aware skill-level estimates and more specific pattern recommendations.
- Rebuilt the evaluation ladder: 64 diagnostic questions, 23 module tests, 32 skill tests, 12 progress tests and four 48-question level finals with writing/speaking/portfolio follow-up.

### QA evidence before publication

- Data/syntax validation passed with 2,886 unique University activities: 1,911 quizzes and 975 production challenges.
- Skill opportunity counts are Grammar 345, Vocabulary 711, Reading 169, Writing 367, Listening 162, Speaking 172, Pronunciation 137, Use of English 115, Critical Thinking 127, Fluency 108, English Thinking 102, Academic English 101, Professional English 104 and Technical English 166.
- Validation confirmed 23 modules, 115 lessons, 72 Grammar Studios, 132 lexical entries, 358 complete writing models, 32 technical scenarios, eight integrated units, eight projects and 64 diagnostic questions.
- Chrome headless route checks passed for Technical English, the B2+ technical module, a technical lesson, a Grammar Studio, an integrated C1 unit, a C1 project, delayed writing feedback and the personal word bank.
- Desktop and 500-pixel narrow renders were visually reviewed. Chrome on Windows enforces a minimum internal headless layout width near 500 pixels; a 390-pixel screenshot crops that larger layout and is therefore not used as evidence of browser overflow.
- Learner-facing HTML and JavaScript contain no Future Perfect course content.
- Deployment commit `3ca5831` reached `main`; GitHub Pages workflow run `31364230750` completed successfully.
- Production HTTP checks returned 200 for the index and all new course layers. Public Chrome renders passed for Technical English, the C1 integrated unit and the preserved Present Tenses route.

## Roadmap follow-up — B1+ perfect continuous — 2026-08-09

- Added `Present Perfect Continuous` and `Past Perfect Continuous` to the B1+ grammar roadmap so the progression explicitly names every required present and past perfect form.
- The generated practice bank now includes the same five contextual variants for these roadmap entries.
- Follow-up commit: `e6379ee`.
- GitHub Pages workflow run `31358855880` completed successfully.
- Final production check returned HTTP 200 at https://arturo-mosqueda.github.io/laboratorio-ingles/.

### Use of English follow-up deployment

- Follow-up commit: `8ef14b6`.
- Added explicit `Sentence completion` and `Multiple-choice cloze` task types.
- GitHub Pages workflow run `31358683819` completed successfully.
- Production returned HTTP 200 and the cache-busted depth script contains both new task variants.

## Personal English University — Phase 5 — 2026-08-09

### Practice and assessment expansion

- Added `activity-expansion.js` so every vocabulary domain, reading text, writing genre, speaking simulation, listening text and pronunciation unit has a linked practice activity.
- Expanded the University bank from 89 to 155 activities: 83 guided quizzes and 72 production challenges.
- Expanded the diagnostic from 6 to 24 questions, with six questions for each of B1+, B2, B2+ and C1.
- Rebuilt level checkpoints after expansion: 21 B1+, 23 B2, 18 B2+ and 21 C1 guided questions, each followed by six open production tasks.
- Added a production route to checkpoint results so selected-answer scores are followed by writing, speaking, academic or professional output.

### Phase 5 QA

- Syntax and data checks passed for `activity-expansion.js` and `app.js`.
- Data validation confirmed 155 activities, 83 quizzes, 72 challenges, 24 balanced diagnostic questions, four checkpoints and the unchanged 16-topic/244-question grammar core.
- Browser QA confirmed the 24-question diagnostic, the 21-question B1+ checkpoint, 35 Vocabulary activities plus 22 vocabulary catalogue cards and no 390 px overflow.
- Browser QA recorded no JavaScript errors.

## Personal English University — Phase 6 — 2026-08-09

### Writing pedagogy

- Added word-limit, recommended-structure and useful-language metadata to catalog-linked writing briefs.
- Changed challenges so model guidance is hidden initially; learners must draft and complete the self-review checklist before revealing it.
- Kept model guidance concise and explanatory rather than presenting an unexplained perfect answer.
- Kept open production tasks attached to level checkpoint results.

### Phase 6 QA

- Syntax checks passed for `activity-expansion.js` and `app.js`.
- Browser QA confirmed a writing brief displays its metadata, hides model guidance initially, reveals it on demand and has no 390 px overflow.
- Browser QA recorded no JavaScript errors.

### Phase 6 deployment

- Implementation commit: `e390510`.
- GitHub Pages workflow run `31356515999` completed successfully.
- Production returned HTTP 200; deployed `app.js` includes the writing metadata and gated model-guidance flow.
- Public URL: https://arturo-mosqueda.github.io/laboratorio-ingles/

### Phase 5 deployment

- Implementation commit: `e59d188`.
- GitHub Pages workflow run `31356299389` completed successfully.
- Production returned HTTP 200 for the page and `activity-expansion.js`; deployed checks confirmed catalog-linked activity generation and balanced diagnostic generation.
- Public URL: https://arturo-mosqueda.github.io/laboratorio-ingles/

## Personal English University — Phase 2 — 2026-08-09

### Content expansion

- Added five lesson stages to every one of the 22 modules: understand, notice, control, independent use and stretch challenge.
- Added four areas named in the long-term objective: Fluency Training, English Thinking, Academic English and Professional English.
- Expanded the starter bank from 23 to 89 activities: 45 guided quizzes and 44 open production challenges.
- Added original activities covering collocations, word families, register, idioms, reading tone and inference, listening attitude and implication, writing genres, speaking simulations, minimal pairs, word stress, weak forms, Use of English transformations, critical evidence, timed fluency, circumlocution, academic source use and workplace negotiation.
- Added level checkpoints with 11 B1+, 13 B2, 9 B2+ and 12 C1 guided questions plus production routes.
- Added a dedicated Grammar skill page that links to the original 16 topics and 244-question core.

### Phase 2 QA

- Syntax and data validation passed with 22 modules, 110 module lessons, 13 skills, 89 activities, 45 quizzes, 44 challenges, four level exams and the unchanged 244-question grammar core.
- Browser QA confirmed the University dashboard, 13 skill cards, level navigation, five-lesson module pages, an 11-question B1+ checkpoint, the 16-topic Grammar route and the 390 px layout without overflow.
- Browser QA recorded no JavaScript errors.

## Personal English University — Phase 4 — 2026-08-09

### Reference libraries

- Added `catalogs.js` as a separate, expandable content layer.
- Added 55 grammar roadmap entries across B1+, B2 and C1, including present/past/future foundations, modality, passives, clauses, inversion, clefts, hedging, nominalisation, discourse grammar, register and complex sentence construction.
- Added 22 vocabulary domains: education, technology, health, relationships, travel, everyday life, science, environment, society, culture, media, work, politics, economics, business, psychology, crime/law, AI, engineering, space, climate and finance.
- Added eight original reading texts, ten writing genre briefs, ten speaking simulations, eight listening texts and eight pronunciation syllabus units.
- Connected grammar and skill labs to the catalogues while preserving the interactive activity banks.

### Phase 4 QA

- Data checks confirmed 55 grammar entries, 22 vocabulary domains, 8 readings, 10 writing briefs, 10 speaking simulations, 8 listening texts, 8 pronunciation units and the unchanged 16-topic/244-question core.
- Browser QA confirmed 55 grammar cards, 22 vocabulary cards, 8 reading cards with expandable text, 10 speaking cards with model-play controls and no 390 px horizontal overflow.
- Browser QA recorded no JavaScript errors.

### Phase 4 deployment

- Implementation commit: `f45bb02`.
- GitHub Pages workflow run `31355944565` completed successfully.
- Production returned HTTP 200 for the site and `catalogs.js`; deployed content checks found the C1 grammar map, AI vocabulary domain and script inclusion.
- Public URL: https://arturo-mosqueda.github.io/laboratorio-ingles/

## Personal English University — Phase 3 — 2026-08-09

### Learner tracking

- Added five-stage lesson completion controls to module pages.
- Added a guided checkpoint session for each level: 11 B1+, 13 B2, 9 B2+ and 12 C1 questions.
- Added local favorites for starter activities and project briefs.
- Added a local study streak, result history and saved diagnostic estimate.
- Added spaced-review dates with expanding intervals for correct answers and immediate return for incorrect answers.
- Added error categories and short answer history to each attempted question.

### Phase 3 QA

- Browser QA confirmed 13 skill cards, the Grammar card showing all 244 core questions, five module lessons, lesson completion, an 11-question level checkpoint, favorites, the 16-topic Grammar route and no 390 px horizontal overflow.
- Browser QA recorded no JavaScript errors.

### Phase 3 deployment

- Implementation commit: `0492a23`.
- GitHub Pages workflow run `31355493399` completed successfully.
- Production returned HTTP 200; the deployed `app.js` includes favorites and level-exam logic, and `curriculum.js` includes the expanded professional/academic activity bank.
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

## Partial 1 research and implementation — 2026-07-26

### Requested organisation

- New material is classified as `Partial 1`.
- The existing seven units are classified as `Partial 2`.
- Partial 1 covers present tenses, past tenses, passive voice, active/passive choice, mixed tenses, narrative tenses, time expressions, tense selection and B2 story/cloze practice.
- The priority is a large number of mixed exercises requiring the learner to choose the tense or voice from context.

### Grammar research

- British Council explains present perfect as a past action or state connected to the present, and present perfect continuous as a focus on activity, duration, temporary repetition or visible recent evidence.
  - https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/present-perfect
  - https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/present-perfect-simple-continuous
- British Council explains past perfect as `had + past participle`, used for time before a past reference point and for the earlier of two past actions.
  - https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/past-perfect
- British Council explains passive voice as the appropriate tense of `be + past participle`, used to change focus when the agent is unknown, obvious, unimportant or deliberately omitted.
  - https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/passives
  - https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/active-passive-voice
- Cambridge B2 First Reading and Use of English uses multiple-choice cloze, open cloze and key-word transformations to test grammar in connected context.
  - https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/format/
  - https://www.cambridgeenglish.org/latinamerica/Images/167791-b2-first-handbook.pdf

### Copyright decision

- New questions and stories will be original. Source rules and task formats inform coverage, but published exercise wording will not be copied verbatim.

### Partial 1 progress

- [x] Research and architecture documented before implementation.
- [x] Nine Partial 1 units added.
- [x] Existing units classified as Partial 2.
- [x] Large mixed-tense exercise bank added.
- [x] Partial 1 and Partial 2 exams separated.
- [x] Topic-specific explanations and prompts added.
- [x] Data, browser and responsive QA completed.
- [x] GitHub Pages deployed and verified.

### Partial 1 implementation

- Added 126 original questions: 12 each for Present Tenses, Past Tenses, Passive Voice, Active vs Passive Voice, Narrative Tenses and Time Expressions; 18 each for Mixed Tenses, Choosing the Correct Tense and B2 Story / Cloze Practice.
- The complete course now contains 244 questions: 182 multiple-choice, 62 written-answer and 52 reading-based tasks.
- Every one of the 16 units has an eight-question topic test and its own text-only speaking prompt.
- Added a 45-question Partial 1 exam with five questions from each new unit.
- Reclassified the existing balanced 39-question assessment as the Partial 2 exam.
- Added two separate course-map sections and two exam entry points without changing the established visual system.
- Added didactic decision diagrams for the present-tense system, past narrative timeline, passive construction and the time–aspect–voice selection method.

### Partial 1 QA

- JavaScript syntax checks passed for all three data/application files.
- Data validation confirmed 16 topics, 244 unique question IDs, valid choice indexes, non-empty written answers and complete topic guides.
- Browser QA confirmed all 16 cards, the Present Tenses lesson, an 8-question topic test, the 45-question Partial 1 exam and the 39-question Partial 2 exam.
- Responsive QA at 390 px found no horizontal overflow.
- No browser JavaScript errors were recorded.

### Partial 1 deployment

- Implementation commit: `4c4cb2d`.
- GitHub Pages workflow run `30223073887` completed successfully.
- The public page and the cache-busted `partial1.js` resource both returned HTTP 200.
- Production content checks found both `Present Tenses` and `Mixed Tenses` in the deployed question bank.
- Public URL: https://arturo-mosqueda.github.io/laboratorio-ingles/

## Personal English University — Phase 1 — 2026-08-09

### Architecture decision

- Preserve `GrammarLabData` as the stable grammar core: 16 topics and 244 exercises remain available unchanged.
- Add `EnglishUniversityData` in a separate `curriculum.js` file so levels, modules, skills, projects, diagnostic questions and new activities can grow independently.
- Keep the static HTML/CSS/JavaScript architecture and browser `localStorage`; no backend was introduced.
- Extend the existing app shell with University, level, skill, project, challenge and diagnostic views while retaining the current visual language and grammar routes.

### Phase 1 deliverables

- Added four progressive levels: B1+, B2, B2+ and C1.
- Added 22 modules across the levels.
- Added nine skill areas: Grammar, Vocabulary, Reading, Writing, Listening, Speaking, Pronunciation, Use of English and Critical Thinking.
- Added 23 starter activities, including guided multiple-choice practice and open production challenges.
- Added eight integrated projects.
- Added a six-question B1+→C1 diagnostic with feedback.
- Added SpeechSynthesis play controls for model texts and a visible transcript fallback for listening-oriented work.
- Added reflection notes and checklist controls for writing, speaking, reading, listening and pronunciation challenges, saved locally.

### Phase 1 QA

- JavaScript syntax checks passed for `curriculum.js`, `app.js` and the existing grammar files.
- Data checks confirmed four levels, 22 modules, nine skills, 23 activities, eight projects, six diagnostic questions, 16 grammar topics and 244 grammar exercises.
- Browser QA confirmed the University dashboard (4 levels, 9 skills), level navigation, Vocabulary guided practice (3 questions), an open challenge, the diagnostic (6 questions), the existing Present Tenses lesson and a 390 px layout without horizontal overflow.
- Browser QA recorded no JavaScript errors.

### Phase 1 deployment

- Implementation commit: `87484fe`.
- GitHub Pages workflow run `31354783263` completed successfully.
- Production returned HTTP 200; the deployed `curriculum.js` and `app.js` resources returned HTTP 200 and contain the C1 route, University dashboard and spaced-review logic.
- Public URL: https://arturo-mosqueda.github.io/laboratorio-ingles/

## Personal English University — Phase 7 — 2026-08-09

### Assessment design decision

The level checkpoint previously measured only guided selected-response questions and linked production tasks after the result. The next route now makes the integrated assessment explicit before practice begins: Grammar + Use of English, Reading, Listening, Writing and Speaking each have a visible entry point, and the level portfolio project is linked as evidence.

### Implementation progress

- Added an integrated assessment view for B1+, B2, B2+ and C1.
- Added level-filtered Reading and Listening sessions, preserving question feedback, progress records, mistake categories and spaced-review dates.
- Added level-matched Writing and Speaking links using the existing production challenge interface.
- Fixed production-route links so writing and speaking activity IDs are passed without malformed attributes.
- Added responsive cards for the five assessment sections without changing the established design system.

### Verification

- Data validation: 155 University activities (83 quizzes and 72 challenges), 24 diagnostic questions (six per level), 21/23/18/21 level quiz questions, six production routes per level, 16 grammar topics and 244 grammar exercises.
- Application syntax validation passed for `app.js` and `activity-expansion.js`.
- Headless render smoke test produced five integrated assessment cards and opened a B1+ Reading section with the expected level-filtered session title.
- Per-level coverage check found Reading 3–5, Listening 3–4, Writing 2–5 and Speaking 2–5 activities, so every level has all five assessment sections.

### Deployment verification

- Implementation commit: `3f809ab`.
- GitHub Pages workflow run `31356943557` completed successfully.
- Public page returned HTTP 200.
- Cache-busted production `app.js` contains `integrated-exam`, `skill-level` and the five-section assessment copy.
- Public URL: https://arturo-mosqueda.github.io/laboratorio-ingles/

## Personal English University — Phase 8 — 2026-08-09

### Depth requirement audit

The objective explicitly requires hundreds of opportunities across the skills, not only a visually complete dashboard. The 155-activity bank was therefore insufficient. I kept the core 244 grammar exercises and added two independent static expansion layers so the existing data and routes remain recoverable.

### Content expansion

- Added a dedicated B2+ grammar catalog so the progression is not B1+ → B2 → C1 with a missing middle grammar layer.
- Added contextual variants for every grammar roadmap entry: form recognition, example matching, purpose, context decision and contrast.
- Added vocabulary practice for collocations, synonyms, word families, register and contextual precision across all 22 domains.
- Added reading and listening variants for gist, detail, evidence, inference, tone, prediction, attitude, note-taking, transcript use and transfer.
- Added progressive writing and speaking variants that preserve self-review, word limits, follow-up questions and level-appropriate interaction.
- Added expanded Use of English, pronunciation, critical-thinking, fluency, English-thinking, academic-English and professional-English banks.

### Coverage evidence

- University activities: 1,963 total (1,247 quizzes and 716 production challenges).
- Skill counts: Grammar 345, Vocabulary 255, Reading 129, Writing 165, Listening 130, Speaking 164, Pronunciation 129, Use of English 115, Critical Thinking 119, Fluency 108, English Thinking 102, Academic English 100 and Professional English 102.
- All 1,963 activities have unique IDs, a level, a skill and a module assignment.
- The course retains 16 core grammar topics and 244 core exercises.

## Personal English University — Phase 9 — 2026-08-09

### Routing and assessment improvements

- Added module-specific practice rows and checkpoint buttons to all 22 module pages.
- Final level exams now use a stratified 48-question sample while retaining the full level question pool for skill practice.
- Added module checkpoints and production routes.
- Expanded the diagnostic to 48 questions, balanced at twelve signals per level.

### Dashboard improvements

- Added per-skill/per-level progress cells and accuracy summaries.
- Added error-pattern grouping with recommended targeted review.
- Added a University search field covering topics, skills, modules and activity prompts.
- Added local dark/light mode support.
- Added listening transcript fallback inside quiz sessions and copyable challenge-specific voice prompts.

### QA evidence before publication

- JavaScript syntax checks passed for `app.js`, `university-practice.js` and `university-depth.js`.
- Data validation passed: 1,963 unique activities, no invalid quiz indexes, no missing challenge checklists, no missing module assignments, 48 diagnostic questions and 22 module tests.
- Headless Chrome smoke rendering confirmed the Personal English University home, search box, progress dashboard, four levels and all skill counts without a runtime rendering failure.
- The no-future-perfect rule remains satisfied in the new expansion layers.

### Phase 9 deployment

- Implementation commit: `ab37f87`.
- GitHub Pages workflow run `31358500647` completed successfully.
- Public page returned HTTP 200.
- Cache-busted production checks confirmed `university-depth.js`, the University search/theme code in `app.js`, and the updated Personal English University title in `index.html`.
- Public URL: https://arturo-mosqueda.github.io/laboratorio-ingles/
