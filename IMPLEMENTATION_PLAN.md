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

## Two-part exam expansion — 2026-07-26

### Partial 1

Add nine units:

1. Present Tenses
2. Past Tenses
3. Passive Voice
4. Active vs Passive Voice
5. Mixed Tenses
6. Narrative Tenses
7. Time Expressions
8. Choosing the Correct Tense
9. B2 Story / Cloze Grammar Practice

Each unit will include a detailed guide, diagnostic comparisons, original mixed-form exercises, written answers, contextual tasks, an eight-question quick test and a topic-specific speaking prompt.

### Partial 2

Keep the existing seven future/determiner units as Partial 2.

### Assessment structure

- A dedicated Partial 1 exam with five balanced questions from every new unit.
- A dedicated Partial 2 exam using the existing balanced assessment set.
- All-question practice remains available across both partials.
- Results and saved mistakes continue to identify the source unit.

### Completed implementation

- Added 126 original Partial 1 questions across nine units.
- Gave the three context-heavy units 18 questions each: Mixed Tenses, Choosing the Correct Tense and B2 Story / Cloze Practice.
- Added 12 questions to each of the other six Partial 1 units.
- Kept all 118 original questions as Partial 2.
- Separated the assessments into a 45-question Partial 1 exam and a 39-question Partial 2 exam.
- Preserved the existing interface design while adding separate course-map sections and navigation controls.
- Kept all explanations, questions, feedback and topic-specific speaking prompts in English.

## Personal English University expansion — Phase 1

The existing grammar course remains the B2 core. A curriculum layer now surrounds it with four progressive levels and nine skill areas:

- B1+: Foundation and control
- B2: Functional and academic English
- B2+: Range, nuance and fluency
- C1: Advanced, natural and flexible English

The new data model lives in `curriculum.js` and keeps levels, modules, skills, activities, projects and diagnostic questions separate from the original `GrammarLabData` bank. This allows new content to grow without changing the 16 current grammar topics or their 244 exercises.

Phase 1 includes 22 curriculum modules, nine skill labs, 23 starter activities, eight integrated projects and a six-question B1+→C1 diagnostic. Vocabulary, reading, Use of English and the receptive/production skills now have their own pages, guided quiz sessions and open-ended challenges. Listening and pronunciation challenges use the browser’s SpeechSynthesis API when available and retain a transcript/model fallback.

## Personal English University expansion — Phase 7

### Integrated level assessment route

Each level now opens an integrated assessment page with five explicit sections:

- Grammar + Use of English: the level quiz checkpoint.
- Reading: level-filtered reading questions.
- Listening: level-filtered listening questions.
- Writing: a level-matched production brief with self-review and delayed model guidance.
- Speaking: a level-matched interaction simulation.

The page also links the level’s portfolio project. Reading and listening sections run through the same progress, feedback, mistake review and spaced-review system as the other guided activities. Exiting a level-filtered skill section returns to its integrated assessment page, while quiz results keep the production route visible.

### Phase 7 verification targets

- Four integrated assessment pages use the existing visual system and remain responsive.
- Every level has at least three reading and listening questions plus two writing and speaking production routes.
- The expanded data model remains at 155 University activities (83 quizzes, 72 challenges), 24 diagnostic questions and 244 grammar exercises.
- The integrated assessment is an additional route; the original grammar topics, partial exams and text-only voice prompts remain intact.

## Personal English University expansion — Phase 8

### Deep practice bank and course routing

- Added `university-practice.js` and `university-depth.js` as separate static data layers so the original grammar files remain stable.
- Expanded the University bank to 1,963 original activities: 1,247 guided quizzes and 716 production challenges.
- Added 72 grammar roadmap entries, including a dedicated B2+ grammar layer and the complete B1+ present/past perfect-continuous coverage, and generated form, example, purpose, contrast and context practice for every roadmap entry.
- Expanded vocabulary through collocation, synonym, word-family, register and contextual-precision tasks.
- Expanded Reading and Listening with gist, detail, inference, tone, evidence, prediction, attitude, note-taking, transcript and transfer tasks.
- Expanded Writing, Speaking, Pronunciation, Use of English, Critical Thinking, Fluency, English Thinking, Academic English and Professional English with levelled production or guided variants.
- Every activity is assigned to a real module; every module now has a connected bank and a checkpoint route.

### Exam structure

- Each level final exam uses a stratified 48-question sample from its larger level pool, so the final is comprehensive without requiring every bank item in one sitting.
- Each of the 22 modules has a 12-question checkpoint where the bank supports it, or an eight-question checkpoint for production-led modules, plus a production route.
- The diagnostic now contains 48 questions: twelve signals for each of B1+, B2, B2+ and C1.

## Personal English University expansion — Phase 9

### Learning dashboard and navigation

- Added per-skill and per-level progress cells showing attempted/mastered activity counts and accuracy.
- Added error-pattern detection and an automatic next-step recommendation based on unresolved error categories.
- Added University search across grammar topics, skills, modules and activity prompts.
- Added a local dark/light mode toggle while preserving the existing visual language.
- Added module-specific practice and checkpoint entry points, level-filtered skill sections and transcript fallback cards for listening quizzes.
- Added copyable challenge-specific voice prompts for speaking, academic and professional activities without connecting to any external service.

### Phase 2 content depth

- All 22 modules now expose five lessons: understand, notice, control, use independently and stretch the choice.
- The curriculum now includes 13 skill labs, adding Fluency Training, English Thinking, Academic English and Professional English to the original nine areas.
- Added 66 additional activities, bringing the University starter bank to 89 items: 45 guided quizzes and 44 production challenges.
- Added level checkpoints with 11 B1+, 13 B2, 9 B2+ and 12 C1 guided questions, plus production routes.
- Added module assessment blueprints covering quiz, reading, listening, writing and speaking for every module.
- Added a dedicated Grammar skill route that exposes all 16 existing topics and their 244 questions without duplicating the grammar bank.

### Phase 3 learner tracking

- Added five-stage lesson completion for every module.
- Added level exam sessions based on each level’s guided quiz bank.
- Added local favorites for activities and projects.
- Added a study streak, result history and diagnostic level estimate to `localStorage`.
- Added interval-based review dates: correct answers return after expanding intervals, while incorrect answers return immediately with an error category.

### Phase 4 reference libraries

- Added a 55-entry B1+–C1 grammar roadmap covering the required core, advanced and C1 structures.
- Added 22 vocabulary domains with collocations, synonyms and register prompts.
- Added eight original reading texts, ten writing genre briefs, ten speaking simulations, eight listening texts and eight pronunciation units.
- Connected the libraries to the skill labs with expandable readings and browser-playable model text.

### Phase 5 assessment and practice expansion

- Added one catalog-linked practice activity for every vocabulary domain, reading, writing brief, speaking simulation, listening text and pronunciation unit.
- Expanded the University bank to 155 activities: 83 guided quizzes and 72 production challenges.
- Expanded the full diagnostic to 24 questions, balanced at six signals per level.
- Rebuilt level checkpoints after expansion: 21 B1+, 23 B2, 18 B2+ and 21 C1 guided questions, with six production tasks each.
- Added a production route to level-exam results so each checkpoint leads into open writing, speaking, academic or professional work.

### Phase 6 writing pedagogy

- Writing briefs now expose word limit, recommended structure and useful language.
- Model guidance remains hidden until the learner has drafted and completed the self-review checklist.
- Level checkpoints now lead to production tasks rather than ending at a multiple-choice score.

## Personal English University expansion — Phase 10

### Real lesson and grammar studios

- Replaced the repeated module lesson shell with 115 module-specific lessons across 23 modules.
- Every lesson now has a concrete explanation, contextual model, three objectives, visual decision path, guided task, independent output, linked activity set, reflection state and previous/next navigation.
- Added a complete Grammar Studio for all 72 roadmap topics: meaning, form, contextual model, nearby contrast, decision questions, linked mini-test and independent production.
- Added breadcrumbs and direct routes for levels, modules, lessons, Grammar Studios, integrated units, skills and challenges.

## Personal English University expansion — Phase 11

### Source-based depth and learner evidence

- Added eight substantial integrated units, two at each level, containing original reading, contextual vocabulary, playable listening, comprehension, discussion, pronunciation transfer, speaking, writing and critical thinking.
- Expanded the reading and listening libraries to 16 sources each and added regional SpeechSynthesis language hints with transcript fallback.
- Expanded Writing to 23 genres and 358 production challenges. Every writing challenge has a complete model, commentary and eight-part self-review; the model remains hidden until the learner chooses to reveal it.
- Expanded all 22 vocabulary domains to six contextual entries and a full lexical system. Added a personal word bank with retrieval intervals, stages, pronunciation playback and due-item review.
- Enriched all eight projects with milestones, deliverables, models, commentary, rubrics and portfolio evidence.
- Added local speaking timers and browser-only microphone recording.
- Upgraded error evidence, SRS stage/ease, estimated skill levels, diagnostic feedback and recommendation logic.
- Rebuilt assessment as 64 diagnostic questions, 23 module tests, 32 skill tests, 12 progress tests and four 48-question finals with productive follow-up routes.

## Personal English University expansion — Phase 12

### Technical English and final QA

- Added Technical English as the fourteenth skill lab.
- Added a dedicated five-lesson B2+ Technical English module and connected Technical English to suitable B1+, B2 and C1 modules.
- Added 32 original technical scenarios and 166 activities across software, data, AI, robotics, engineering, aerospace, climate and finance.
- Technical practice explicitly connects definition, process, evidence, failure mode, safeguard, limitation, audience adaptation and spontaneous defence.
- Added a pronunciation transfer diagram and a five-stage technical-explanation diagram using HTML and CSS.

### Final verification gates

- Structural validation passed for 2,886 unique University activities, 244 preserved core exercises, 115 lessons, 72 Grammar Studios, 132 lexical entries, 358 writing challenges, 64 diagnostic questions and all assessment pools.
- Every quiz answer index, written-answer array, module assignment, lesson link and Grammar Studio practice link is valid.
- Every one of the 14 skills has at least 100 practice opportunities.
- Learner-facing HTML and JavaScript contain no Future Perfect unit.
- Chrome headless route tests passed for levels, modules, lessons, Grammar Studios, Technical English, integrated units, projects, writing and the word bank.
- Desktop and narrow responsive screenshots were reviewed; the established visual system remains unchanged in character.
- Production deployment and live GitHub Pages verification remain the final publication gate.
