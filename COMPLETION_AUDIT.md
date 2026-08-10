# English Lab — Completion audit

Date: 2026-08-10

This is a requirement-by-requirement audit of the local repository against the full **Personal English University B1+ → C1** objective. Counts are supporting evidence, not substitutes for inspecting lesson bodies, rendered routes, assessment coverage and saved browser behaviour.

## Current audit decision

The implementation satisfies the content, architecture, interaction and publication requirements listed below. Structural validation, critical-route rendering and public production verification pass.

## Verified snapshot

| Evidence | Verified value |
|---|---:|
| Preserved core grammar topics | 16 |
| Preserved core exercises | 244 |
| Partial 1 / Partial 2 exercises | 126 / 118 |
| University activities | 2,886 |
| Guided quizzes / production challenges | 1,911 / 975 |
| Levels / skill labs | 4 / 14 |
| Modules / specific lessons | 23 / 115 |
| Grammar Studios | 72 |
| Vocabulary domains / entries | 22 / 132 |
| Reading / listening library sources | 16 / 16 |
| Writing genres / writing challenges | 23 / 358 |
| Technical scenarios / activities | 32 / 166 |
| Integrated units / projects | 8 / 8 |
| Diagnostic questions | 64, sixteen per level |
| Module / skill / progress tests | 23 / 32 / 12 |
| Level finals | 4 × 48 questions plus production routes |

All 2,886 University activity IDs are unique. Every activity has a valid level, skill and module; every selected-answer index and written-answer array is valid. All lesson and Grammar Studio practice links resolve to a real activity.

## Requirement evidence matrix

| Requirement | Authoritative local evidence | Decision |
|---|---|---|
| Preserve the existing English Lab | `partial1.js`, `exercises.js` and the core routes still expose 16 topics, 244 exercises, detailed guides, diagrams, quick tests, 45/39-question partial exams, progress, mistake review and topic-specific voice-practice text | Satisfied |
| Progressive B1+ → B2 → B2+ → C1 course | `curriculum.js` defines four levels and 23 modules; `course-lessons.js` supplies five specific lessons for each module | Satisfied |
| Real lessons, not article cards | All 115 lessons render objectives, explanation, contextual model, a visual path, guided work, independent production, linked practice, reflection and previous/next navigation | Satisfied |
| Deep grammar syllabus | 72 roadmap entries have Grammar Studios with meaning, form, comparison, decision questions, diagram, mini-test and independent challenge; the original 16 detailed units remain intact | Satisfied |
| No Future Perfect | Case-insensitive validation across learner-facing HTML/JavaScript finds no Future Perfect course content | Satisfied |
| Vocabulary in use, not lists | 22 domains contain 132 entries with meaning/context, collocation and near-synonym; every domain also contains word families, affixes, antonym contrast, register, connotation, phrasal verbs, an idiom and fixed expressions | Satisfied |
| Personal vocabulary and spaced retrieval | Learners can save catalog or integrated-unit words, hear them, review due items and advance/regress through persisted SRS stages and intervals | Satisfied |
| Cambridge-style Use of English | The bank includes open cloze, multiple-choice cloze, word formation, key-word transformation, error correction, sentence completion, collocations, phrasal verbs, idioms, register and hedging | Satisfied |
| Substantial varied Reading | Sixteen source records cover blog, narrative, interview, news, science, professional, policy, argumentative and academic genres; integrated texts contain detail, evidence, inference, vocabulary, tone/purpose and critical questions | Satisfied |
| Listening beyond transcripts | Sixteen source records include dialogues, announcements, interviews, meetings, lectures, debates, technical briefings and podcasts; substantial integrated scripts have actual comprehension sets, playable SpeechSynthesis and transcript fallback | Satisfied |
| Natural progression and regional delivery | SpeechSynthesis activities request suitable `en-US`, `en-GB`, `en-CA` or `en-AU` installed voices and level-adjusted rates. The interface states the selected regional hint and retains text fallback | Satisfied within browser capabilities |
| Complete Writing Studio | Twenty-three genres cover every requested B1+, B2 and C1 family. All 358 writing challenges have a word limit, recommended structure, useful language, full model, commentary and eight self-review criteria; model content remains locked until a meaningful draft and complete self-review exist | Satisfied |
| Speaking interaction, not prompt-only | The bank covers descriptions, stories, comparisons, problem-solving, discussion, debate, argument defence and all eleven requested real-life simulations. Challenges provide preparation, language, follow-ups, local timer, local recording and topic-specific voice-practice text | Satisfied |
| No OpenAI integration | Voice-practice content is copyable text only. No API, SDK, authentication or external OpenAI service is connected | Satisfied |
| Pronunciation route | The syllabus covers vowel/consonant contrasts, phonemes through minimal pairs, word/sentence stress, rhythm, connected speech, weak forms, linking, reductions and intonation, with listen/choose, shadowing, read-aloud and production work | Satisfied |
| Fluency and English Thinking | Dedicated banks progress through timed 30/60/120-second tasks, description, comparison, explanation, defence, speculation, summary, definition, paraphrase and circumlocution without translation | Satisfied |
| Integrated skills | Eight units explicitly follow Reading → Vocabulary → Listening → Discussion → Pronunciation → Speaking → Writing → Critical Thinking, with two units at every level | Satisfied |
| Critical thinking at B2+/C1 | Tasks require comparison, evaluation, inference, justification, assumption and bias detection, fact/opinion distinction and counterargument | Satisfied |
| Academic, Professional and Technical English | Academic and Professional English have dedicated skill labs and module connections. Technical English has a dedicated five-lesson B2+ module, 32 progressive scenarios and 166 activities spanning programming, AI, engineering, robotics, science, aerospace, climate and finance | Satisfied |
| Projects and long-term portfolio evidence | Eight projects, two per level, now contain preparation, milestones, deliverables, rubric/checklist, complete guidance, commentary, voice-practice text and reflection evidence | Satisfied |
| Full evaluation ladder | Every module has a checkpoint; every level has eight skill tests, three progress tests, a 48-question final and an integrated Grammar/Use of English, Reading, Listening, Writing and Speaking route; the diagnostic has 64 balanced questions | Satisfied |
| Progress dashboard and weakness detection | Dashboard separates guided accuracy from completed production, uses both for evidence-aware level estimates and recommends unresolved errors or saved unfinished production | Satisfied |
| Detailed error log | Failed attempts persist the prompt, learner answer, accepted answer, date, error type, topic, level, skill, attempt history, ease and next review | Satisfied |
| Pattern recommendations | Specific messages identify recurring present/past aspect, passive focus, future choice, articles/determiners, collocation, word formation, register, reading, listening and pronunciation patterns | Satisfied |
| Spaced repetition | Correct retrieval increases intervals and ease; difficult answers regress and return sooner. The queue includes grammar, Use of English, expressions, mistakes and vocabulary | Satisfied |
| Static architecture | The application remains plain HTML/CSS/JavaScript, uses `localStorage`, has no backend and opens directly from `index.html` | Satisfied |
| English-first learning | Learner explanations, instructions, feedback, models and tasks are in English; no translation dependency is introduced | Satisfied |
| Navigation and visual system | University sidebar, breadcrumbs, search, previous/next lesson controls, dark/light mode, cards and integrated HTML/CSS diagrams are present without replacing the established aesthetic | Satisfied |
| Accessibility and responsive behaviour | Semantic buttons/labels, visible focus styles, live status regions, transcript fallback and responsive layouts exist. Critical routes render at desktop and narrow widths in Chrome | Satisfied for the static browser scope |
| GitHub Pages publication | Completion commit `3ca5831` and quality-review commit `7f5b257` were pushed to `main`; latest workflow run `31366866106` completed successfully; the public index, application and writing-model layers returned HTTP 200 and public Chrome routes rendered the expected release | Satisfied |

## Opportunity evidence by skill

| Skill | Activities |
|---|---:|
| Grammar | 345 |
| Vocabulary | 711 |
| Reading | 169 |
| Writing | 367 |
| Listening | 162 |
| Speaking | 172 |
| Pronunciation | 137 |
| Use of English | 115 |
| Critical Thinking | 127 |
| Fluency | 108 |
| English Thinking | 102 |
| Academic English | 101 |
| Professional English | 104 |
| Technical English | 166 |

## Assessment research applied

- Cambridge B2 First and C1 Advanced formats are used only as structural inspiration; no official questions are copied.
- The public Cambridge formats support multi-part Reading/Use of English, Writing, Listening and Speaking assessment.
- CEFR material supports an action-oriented progression across reception, production, interaction, mediation, linguistic control, pragmatic control and phonological competence.

Sources:

- https://www.cambridgeenglish.org/exams-and-tests/qualifications/advanced/format/
- https://www.cambridgeenglish.org/exams-and-tests/first/exam-format/
- https://www.coe.int/en/web/common-european-framework-reference-languages/introduction-and-context
- https://book.coe.int/en/education-and-modern-languages/8152-common-european-framework-of-reference-for-languages-learning-teaching-assessment-companion-volume.html

## Verification already completed

- Node/V8 syntax and data validation: passed.
- Duplicate ID, answer index, module assignment, lesson link and Grammar Studio link checks: passed.
- Writing model length/commentary/eight-criterion checks: passed for 358 challenges.
- Integrated-unit reading/listening/question/depth checks: passed for all eight units.
- Chrome headless route rendering: passed for University, levels, Technical English, the technical module, lessons, Grammar Studio, integrated unit, project, writing and word-bank routes.
- Visual review: desktop University, desktop integrated unit and narrow University views render with the existing design system.

## Phase 13 quality gate

- Activity libraries render no more than 24 activity cards at once and provide level/type filters plus progressive disclosure.
- Ordinary skill, level and module study sessions are bounded and prioritise errors, due review and unseen work; formal assessments are unchanged.
- Every production challenge now contains a saved workspace, evidence counter, persisted checklist, reflection and explicit completion action.
- Saving work alone does not complete a challenge or increase correct-answer totals.
- Writing model access requires draft and complete self-review evidence.
- Browser interaction verified draft/checklist persistence and production completion with `correct: 0`.
- Comprehensive Chrome smoke testing passed for 57 direct routes with zero runtime exceptions and a maximum of 24 rendered activity cards.
- Tablet overflow corrections passed at 747 pixels; representative mobile routes passed at a true 390-pixel viewport with no horizontal overflow.
- Quality-review deployment `7f5b257` completed through GitHub Pages workflow `31366866106`; public resource and Chrome marker checks passed.
- GitHub Pages action majors were updated to the current official releases after the runner exposed a Node.js 20 deprecation warning.

## Publication evidence

- Implementation commit: `3ca5831` (`Build complete Personal English University`).
- GitHub Pages workflow: `31364230750`, successful.
- HTTP 200 and release-marker checks: `index.html`, `technical-english.js`, `course-lessons.js` and `app.js`.
- Public Chrome rendering: Technical English route, C1 orbital-debris integrated unit and the preserved Present Tenses route all passed.
- Public URL: https://arturo-mosqueda.github.io/laboratorio-ingles/
