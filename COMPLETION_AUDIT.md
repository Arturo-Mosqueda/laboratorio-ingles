# English Lab — Completion audit

Date: 2026-08-10

This is a requirement-by-requirement audit of the local repository against the full **Personal English University B1+ → C1** objective. Counts are supporting evidence, not substitutes for inspecting lesson bodies, rendered routes, assessment coverage and saved browser behaviour.

## Current audit decision

The local implementation satisfies the content, architecture and interaction requirements listed below. Structural validation and critical-route rendering pass. The build is **not yet considered fully delivered** because the expanded files have not yet been committed, pushed and verified on the public GitHub Pages URL.

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
| Complete Writing Studio | Twenty-three genres cover every requested B1+, B2 and C1 family. All 358 writing challenges have a full model, commentary and eight self-review criteria; model content remains hidden until explicitly revealed | Satisfied |
| Speaking interaction, not prompt-only | The bank covers descriptions, stories, comparisons, problem-solving, discussion, debate, argument defence and all eleven requested real-life simulations. Challenges provide preparation, language, follow-ups, local timer, local recording and topic-specific voice-practice text | Satisfied |
| No OpenAI integration | Voice-practice content is copyable text only. No API, SDK, authentication or external OpenAI service is connected | Satisfied |
| Pronunciation route | The syllabus covers vowel/consonant contrasts, phonemes through minimal pairs, word/sentence stress, rhythm, connected speech, weak forms, linking, reductions and intonation, with listen/choose, shadowing, read-aloud and production work | Satisfied |
| Fluency and English Thinking | Dedicated banks progress through timed 30/60/120-second tasks, description, comparison, explanation, defence, speculation, summary, definition, paraphrase and circumlocution without translation | Satisfied |
| Integrated skills | Eight units explicitly follow Reading → Vocabulary → Listening → Discussion → Pronunciation → Speaking → Writing → Critical Thinking, with two units at every level | Satisfied |
| Critical thinking at B2+/C1 | Tasks require comparison, evaluation, inference, justification, assumption and bias detection, fact/opinion distinction and counterargument | Satisfied |
| Academic, Professional and Technical English | Academic and Professional English have dedicated skill labs and module connections. Technical English has a dedicated five-lesson B2+ module, 32 progressive scenarios and 166 activities spanning programming, AI, engineering, robotics, science, aerospace, climate and finance | Satisfied |
| Projects and long-term portfolio evidence | Eight projects, two per level, now contain preparation, milestones, deliverables, rubric/checklist, complete guidance, commentary, voice-practice text and reflection evidence | Satisfied |
| Full evaluation ladder | Every module has a checkpoint; every level has eight skill tests, three progress tests, a 48-question final and an integrated Grammar/Use of English, Reading, Listening, Writing and Speaking route; the diagnostic has 64 balanced questions | Satisfied |
| Progress dashboard and weakness detection | Dashboard records attempted/mastered work, accuracy and evidence-aware estimated level per skill, then recommends a next skill/level action | Satisfied |
| Detailed error log | Failed attempts persist the prompt, learner answer, accepted answer, date, error type, topic, level, skill, attempt history, ease and next review | Satisfied |
| Pattern recommendations | Specific messages identify recurring present/past aspect, passive focus, future choice, articles/determiners, collocation, word formation, register, reading, listening and pronunciation patterns | Satisfied |
| Spaced repetition | Correct retrieval increases intervals and ease; difficult answers regress and return sooner. The queue includes grammar, Use of English, expressions, mistakes and vocabulary | Satisfied |
| Static architecture | The application remains plain HTML/CSS/JavaScript, uses `localStorage`, has no backend and opens directly from `index.html` | Satisfied |
| English-first learning | Learner explanations, instructions, feedback, models and tasks are in English; no translation dependency is introduced | Satisfied |
| Navigation and visual system | University sidebar, breadcrumbs, search, previous/next lesson controls, dark/light mode, cards and integrated HTML/CSS diagrams are present without replacing the established aesthetic | Satisfied |
| Accessibility and responsive behaviour | Semantic buttons/labels, visible focus styles, live status regions, transcript fallback and responsive layouts exist. Critical routes render at desktop and narrow widths in Chrome | Satisfied for the static browser scope |
| GitHub Pages publication | Existing production is live, but the expanded local build is uncommitted and not yet deployed | Pending |

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

## Final publication gate

1. Inspect the final Git diff and rerun the structural validator.
2. Commit and push the expanded build to `main`.
3. Wait for the GitHub Pages workflow to finish successfully.
4. Verify HTTP 200 and new content on the public URL.
5. Only then mark the full goal complete.
