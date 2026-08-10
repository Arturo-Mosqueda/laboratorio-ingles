# English Lab · Personal English University

An English-only learning system built with plain HTML, CSS and JavaScript. It combines the original two-part B2 grammar laboratory with a progressive **B1+ → B2 → B2+ → C1** curriculum designed for long-term study.

Public site: https://arturo-mosqueda.github.io/laboratorio-ingles/

## Verified course snapshot

- 4 levels, 14 skill labs, 23 modules and 115 module-specific lessons
- 2,886 University activities: 1,911 guided quizzes and 975 production challenges
- 16 preserved grammar topics and 244 core exercises: 126 in Partial 1 and 118 in Partial 2
- 72 Grammar Studios with meaning, form, comparison, decision diagram, linked practice, challenge and mini-test
- 22 vocabulary domains, 132 contextual lexical entries and complete word-family, affix, antonym, register, connotation, phrasal-verb, idiom and fixed-expression notes
- 16 reading sources and 16 listening sources across blog, narrative, interview, report, scientific, academic, professional and argumentative genres
- 23 writing genres and 358 writing challenges with complete delayed models, commentary and eight-part self-review
- 32 technical scenarios and 166 Technical English activities across programming, AI, engineering, robotics, data, aerospace, climate and finance
- 8 substantial integrated units following **Reading → Vocabulary → Listening → Discussion → Pronunciation → Speaking → Writing → Critical Thinking**
- 8 portfolio projects with milestones, deliverables, models, rubrics and topic-specific voice-practice text
- 64-question B1+–C1 diagnostic, 23 module tests, 32 skill tests, 12 progress tests and four 48-question level finals

Every University skill has at least 100 guided or production opportunities. Future Perfect is intentionally outside the learner syllabus.

## Skills and learning route

The platform develops:

- Grammar, Vocabulary and Use of English
- Reading, Listening, Writing and Speaking
- Pronunciation, Fluency and English Thinking
- Critical Thinking
- Academic, Professional and Technical English

Lessons follow a reusable learning cycle: explanation, contextual model, visual decision path, guided control, independent production, reflection and linked assessment. The original 16 detailed grammar units, diagrams, quick tests, partial exams and topic-specific voice prompts remain available as the grammar core.

## Interaction and saved learning

The browser stores progress, lesson completion, favorites, notes, result history, study streak, estimated skill levels, vocabulary and spaced-review dates in `localStorage`.

The application includes:

- filtered activity libraries that render 24 cards at a time instead of hundreds at once
- smart 20–24-question skill sessions that prioritise mistakes, due review and unseen material; formal tests remain complete
- per-skill and per-level progress evidence
- separate guided accuracy and completed-production evidence, so an open task is never treated as an automatic correct answer
- specific mistake records with the learner answer, accepted answer, date, topic, level, skill and error category
- pattern-based recommendations and targeted mistake review
- spaced repetition for difficult grammar, expressions, mistakes and the personal word bank
- SpeechSynthesis playback with regional language hints and transcript fallback
- local speaking timers and microphone recording; recordings never leave the browser tab
- production workspaces with saved drafts, word count, persisted self-review, evidence requirements and gated writing models
- topic-adapted text prompts for optional ChatGPT Voice practice, with no OpenAI API or service integration
- course search, University sidebar, breadcrumbs, previous/next lesson navigation and dark/light mode

## Assessment design

Cambridge B2 First and C1 Advanced influenced the multi-skill structure, but every question and source text in this repository is original. Each level exposes Grammar/Use of English, Reading, Listening, Writing and Speaking sections plus portfolio evidence. Selected-response scores are therefore not treated as complete proof of productive ability.

## Local use

Open `index.html` in a modern browser. There are no dependencies, package installation or build step.

The site is deliberately static:

- `index.html` loads the data layers and application
- `styles.css` contains the responsive light/dark visual system
- `app.js` contains routing, sessions, feedback, progress, audio, recording and local persistence
- `curriculum.js` preserves the main University structure
- `course-lessons.js`, `integrated-units.js`, `writing-models.js`, `project-depth.js` and `technical-english.js` add the deep learning layers
- `partial1.js` and `exercises.js` preserve the original grammar laboratory

## Deployment

`.github/workflows/pages.yml` publishes the static files to GitHub Pages after every push to `main`.
