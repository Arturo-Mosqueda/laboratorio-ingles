(() => {
  "use strict";

  const { topics, guides, exercises } = window.GrammarLabData;
  const university = window.EnglishUniversityData || { levels: [], skills: [], activities: [], projects: [], diagnostic: [], levelExams: [] };
  const skillActivities = university.activities || [];
  const catalogs = window.EnglishCatalogs || { grammarCatalog: [], vocabularyCatalog: [], readingLibrary: [], writingCatalog: [], speakingSimulations: [], listeningLibrary: [], pronunciationCatalog: [] };
  const storageKey = "english-lab-progress-v2";
  const metaStorageKey = "english-lab-meta-v1";
  const app = document.querySelector("#app");
  const nav = document.querySelector("#main-nav");
  const menuButton = document.querySelector('[data-action="menu"]');

  let view = "home";
  let activeTopic = null;
  let activeSkill = null;
  let activeChallenge = null;
  let activeModule = null;
  let progress = loadProgress();
  let meta = loadMeta();
  let session = null;
  let current = 0;
  let selected = null;
  let typedAnswer = "";
  let answered = false;
  let sessionCorrect = 0;
  let sessionDone = false;

  const escapeHtml = (value = "") => String(value)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;");

  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(storageKey)) || {}; }
    catch { return {}; }
  }

  function loadMeta() {
    try { return JSON.parse(localStorage.getItem(metaStorageKey)) || { favorites: [], results: [], streak: 0, lastStudyDate: null, levelEstimate: null }; }
    catch { return { favorites: [], results: [], streak: 0, lastStudyDate: null, levelEstimate: null }; }
  }

  function saveProgress() {
    try { localStorage.setItem(storageKey, JSON.stringify(progress)); }
    catch { /* Storage is optional. */ }
  }

  function saveMeta() {
    try { localStorage.setItem(metaStorageKey, JSON.stringify(meta)); }
    catch { /* Storage is optional. */ }
  }

  function recordStudyDay() {
    const today = new Date().toISOString().slice(0, 10);
    if (meta.lastStudyDate === today) return;
    const previous = new Date(`${today}T00:00:00Z`);
    previous.setUTCDate(previous.getUTCDate() - 1);
    const yesterday = previous.toISOString().slice(0, 10);
    meta.streak = meta.lastStudyDate === yesterday ? (meta.streak || 0) + 1 : 1;
    meta.lastStudyDate = today;
    saveMeta();
  }

  function isFavorite(id) { return meta.favorites.includes(id); }

  function toggleFavorite(id) {
    meta.favorites = isFavorite(id) ? meta.favorites.filter((item) => item !== id) : [...meta.favorites, id];
    saveMeta();
  }

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function normalizeAnswer(value) {
    return String(value).toLowerCase().replace(/[’‘]/g, "'").replace(/[.!?]+$/g, "")
      .replace(/\s+/g, " ").trim();
  }

  function isCorrectAnswer(exercise) {
    if (exercise.type === "choice") return selected === exercise.answer;
    const value = normalizeAnswer(typedAnswer);
    return exercise.answers.some((answer) => normalizeAnswer(answer) === value);
  }

  const percent = (correct, total) => total ? Math.round((correct / total) * 100) : 0;
  const skillById = (id) => university.skills.find((skill) => skill.id === id);
  const activityById = (id) => skillActivities.find((activity) => activity.id === id);
  const moduleById = (id) => university.levels.flatMap((level) => level.modules.map((module) => ({ ...module, level }))).find((module) => module.id === id);
  const topicById = (id) => topics.find((topic) => topic.id === id) || skillById(id) || (String(id || "").startsWith("skill-") ? skillById(String(id).slice(6)) : null) || {
    id, title: "Diagnostic", icon: "DI", description: "Level diagnostic", partial: null
  };
  const allPracticeItems = [...exercises, ...skillActivities, ...(university.diagnostic || [])];
  const mistakes = () => allPracticeItems.filter((exercise) => progress[exercise.id] && progress[exercise.id].lastCorrect === false);
  const reviewDue = () => allPracticeItems.filter((exercise) => {
    const saved = progress[exercise.id];
    return saved && (!saved.nextReview || saved.nextReview <= new Date().toISOString());
  });

  function statsFor(items) {
    const attempted = items.filter((item) => progress[item.id]).length;
    const mastered = items.filter((item) => progress[item.id]?.lastCorrect).length;
    const totals = items.reduce((sum, item) => {
      const saved = progress[item.id];
      return { attempts: sum.attempts + (saved?.attempts || 0), correct: sum.correct + (saved?.correct || 0) };
    }, { attempts: 0, correct: 0 });
    return { attempted, mastered, accuracy: percent(totals.correct, totals.attempts) };
  }

  function skillStats(skillId) {
    return statsFor(skillId === "grammar" ? exercises : skillActivities.filter((item) => item.skill === skillId));
  }

  function renderLevelCard(level) {
    const levelModules = level.modules.length;
    const levelActivities = skillActivities.filter((item) => item.level === level.id).length;
    const levelTopics = level.id === "b2" ? topics.length : level.id === "b1-plus" ? 0 : 0;
    return `<article class="level-card"><div class="level-card-top"><span class="level-code">${escapeHtml(level.code)}</span><span>${levelModules} modules</span></div><h3>${escapeHtml(level.title)}</h3><p>${escapeHtml(level.description)}</p><div class="level-card-meta"><span>${levelActivities} starter activities</span><span>${levelTopics ? `${levelTopics} grammar units` : "Curriculum route"}</span></div><button class="card-link" data-action="level" data-level="${level.id}">Explore level →</button></article>`;
  }

  function renderSkillCard(skill) {
    const items = skillActivities.filter((item) => item.skill === skill.id);
    const total = skill.id === "grammar" ? exercises.length : items.length;
    const stats = skillStats(skill.id);
    return `<article class="skill-card"><div class="skill-card-top"><span class="skill-icon skill-${escapeHtml(skill.color)}">${escapeHtml(skill.icon)}</span><span>${total} ${skill.id === "grammar" ? "core questions" : "starter activities"}</span></div><h3>${escapeHtml(skill.title)}</h3><p>${escapeHtml(skill.description)}</p><div class="mini-progress"><span style="width:${total ? stats.mastered / total * 100 : 0}%"></span></div><div class="skill-card-footer"><span>${stats.mastered} mastered</span><button class="card-link" data-action="skill" data-skill="${skill.id}">Open lab →</button></div></article>`;
  }

  function renderUniversityOverview() {
    return `<section class="university-section"><div class="section-heading"><div><span class="eyebrow">Personal English University</span><h2>A route from B1+ to C1</h2></div><p>A long-form curriculum combining grammar, vocabulary, receptive skills, production, pronunciation, Use of English and critical thinking.</p></div><div class="level-roadmap">${university.levels.map(renderLevelCard).join("")}</div><div class="section-heading skill-heading"><div><span class="eyebrow">Skill library</span><h2>Build the whole language system</h2></div><p>Open a skill lab for guided practice, independent challenges and level-specific projects.</p></div><div class="skill-grid">${university.skills.map(renderSkillCard).join("")}</div><div class="project-strip"><div><span class="eyebrow">Integrated projects</span><h3>Learn by making something real</h3><p>Projects connect reading, vocabulary, listening, speaking, writing and reflection.</p></div><button class="secondary" data-action="projects">View project route →</button></div></section>`;
  }

  function renderHome() {
    const overall = statsFor(exercises);
    const partial1Topics = topics.filter((topic) => topic.partial === 1);
    const partial2Topics = topics.filter((topic) => topic.partial === 2);
    const partial1Exam = exercises.filter((item) => item.exam === 1).length;
    const partial2Exam = exercises.filter((item) => item.exam === 2).length;
    app.innerHTML = `<div class="home-page">
      <section class="hero"><div class="hero-copy"><span class="eyebrow">English-only · B2 foundation</span>
        <h1>Grammar you can<br><em>use with confidence</em></h1>
        <p>Prepare for two partial exams through sixteen focused units, complete topic tests and master tense choice in realistic B2 contexts.</p>
        <div class="hero-actions"><button class="primary" data-action="topic" data-topic="present-tenses">Start Partial 1 →</button><button class="secondary" data-action="all-practice">Practise all ${exercises.length} questions</button></div></div>
        <aside class="hero-card"><div class="level-ring" style="--score:${overall.mastered / exercises.length * 360}deg"><div><strong>${overall.mastered}</strong><span>mastered</span></div></div>
          <div class="hero-stats"><div><strong>${exercises.length}</strong><span>questions</span></div><div><strong>${overall.attempted}</strong><span>attempted</span></div><div><strong>${overall.accuracy}%</strong><span>accuracy</span></div></div>
          <p>Your work is saved in this browser. A question is mastered when your latest answer is correct.</p></aside></section>
      ${renderUniversityOverview()}
      <section class="section-wrap"><div class="section-heading"><div><span class="eyebrow">Partial 1 · Tense system</span><h2>Present, past, voice and narrative grammar</h2></div><p>Nine detailed units with extensive mixed-tense decisions, time markers, passive structures and B2 cloze stories.</p></div>
        <div class="topic-grid">${partial1Topics.map((topic, index) => renderTopicCard(topic, index)).join("")}</div></section>
      <section class="final-banner"><div><span class="eyebrow">Partial 1 assessment</span><h2>Test the complete tense system</h2><p>Complete ${partial1Exam} questions drawn from all nine Partial 1 units.</p></div><button class="primary" data-action="partial-1-test">Start Partial 1 test →</button></section>
      <section class="section-wrap"><div class="section-heading"><div><span class="eyebrow">Partial 2 · Determiners and the future</span><h2>Continue with the original seven units</h2></div><p>Your existing future forms, articles, determiners and quantifier lessons remain intact, with their full practice banks.</p></div>
        <div class="topic-grid">${partial2Topics.map((topic, index) => renderTopicCard(topic, index)).join("")}</div></section>
      <section class="final-banner"><div><span class="eyebrow">Partial 2 assessment</span><h2>Review the original course topics</h2><p>Complete ${partial2Exam} questions covering all seven Partial 2 units.</p></div><button class="primary" data-action="partial-2-test">Start Partial 2 test →</button></section>
    </div>`;
  }

  function renderUniversity() {
    const completed = allPracticeItems.filter((item) => progress[item.id]?.lastCorrect).length;
    const due = reviewDue().length;
    app.innerHTML = `<section class="content-page university-page"><div class="page-heading"><span class="eyebrow">Personal English University</span><h1>Build English for real life, study and work.</h1><p>Follow a progressive B1+ → B2 → B2+ → C1 route. Existing grammar remains available below, while the new skill labs turn knowledge into understanding and communication.</p></div><div class="university-summary"><div><strong>${completed}</strong><span>activities mastered</span></div><div><strong>${university.levels.length}</strong><span>levels</span></div><div><strong>${meta.streak || 0}</strong><span>day streak</span></div><div><strong>${escapeHtml(meta.levelEstimate || "Not measured")}</strong><span>starting estimate</span></div><button class="primary" data-action="diagnostic">Take the level diagnostic →</button></div><div class="review-strip"><div><span class="eyebrow">Study queue</span><h3>${due ? `${due} activities ready for review` : "Your review queue is clear"}</h3><p>Correct answers return after a longer interval; difficult answers come back sooner.</p></div><button class="secondary" data-action="review-due" ${due ? "" : "disabled"}>Open review queue →</button></div>${renderUniversityOverview()}<section class="curriculum-principles"><span class="eyebrow">Study method</span><h2>Learn → practise → produce → reflect</h2><div class="principle-grid"><div><strong>Input</strong><p>Read and listen to language in meaningful contexts.</p></div><div><strong>Control</strong><p>Use guided grammar, vocabulary and Use of English practice.</p></div><div><strong>Production</strong><p>Write, speak, pronounce and solve open-ended challenges.</p></div><div><strong>Reflection</strong><p>Review mistakes, record progress and return to difficult skills.</p></div></div></section></section>`;
  }

  function renderLevel(levelId) {
    const level = university.levels.find((item) => item.id === levelId);
    if (!level) return renderUniversity();
    const levelExam = university.levelExams?.find((exam) => exam.level === level.id);
    app.innerHTML = `<section class="content-page level-page"><button class="back-link" data-action="university">← University map</button><div class="page-heading"><span class="eyebrow">Level ${escapeHtml(level.code)}</span><h1>${escapeHtml(level.title)}</h1><p>${escapeHtml(level.description)} ${escapeHtml(level.outcome)}</p></div><div class="module-list">${level.modules.map((module, index) => `<article class="module-card"><span class="module-number">${String(index + 1).padStart(2, "0")}</span><div><span class="eyebrow">${escapeHtml(module.skills.join(" · "))}</span><h2>${escapeHtml(module.title)}</h2><p>${escapeHtml(module.focus)}</p><div class="module-meta"><span>${module.lessons?.length || 0} lessons</span><span>${escapeHtml(module.assessment?.quiz || "Module checkpoint")}</span></div><div class="module-actions"><button class="primary" data-action="module" data-module="${module.id}">Open module →</button>${module.skills.map((skillId) => skillById(skillId) ? `<button class="secondary" data-action="skill" data-skill="${skillId}">${escapeHtml(skillById(skillId).title)} lab →</button>` : "").join("")}</div></div></article>`).join("")}</div><section class="exam-route"><div><span class="eyebrow">Milestone</span><h2>${escapeHtml(level.exam)}</h2><p>${levelExam?.questions.length || 0} guided questions plus a production route. Complete the modules, save evidence in your portfolio and return here when your skill scores are ready.</p></div><div class="exam-actions"><button class="primary" data-action="level-exam" data-level="${level.id}">Start level exam →</button><button class="secondary" data-action="diagnostic">Open diagnostic →</button></div></section></section>`;
  }

  function renderModule(moduleId) {
    const module = moduleById(moduleId);
    if (!module) return renderUniversity();
    const routeItems = skillActivities.filter((item) => module.skills.includes(item.skill) && item.level === module.level.id);
    app.innerHTML = `<section class="content-page module-page"><button class="back-link" data-action="level" data-level="${module.level.id}">← Back to ${escapeHtml(module.level.code)} level</button><div class="page-heading"><span class="eyebrow">${escapeHtml(module.level.code)} module</span><h1>${escapeHtml(module.title)}</h1><p>${escapeHtml(module.focus)} The module route is designed as input, guided control, independent production and a final stretch task.</p></div><div class="lesson-route">${(module.lessons || []).map((lesson, index) => `<article class="lesson-card"><span class="module-number">${String(index + 1).padStart(2, "0")}</span><div><span class="eyebrow">${escapeHtml(lesson.stage)}</span><h2>${escapeHtml(lesson.title)}</h2><p>${escapeHtml(lesson.body)}</p><button class="secondary" data-action="module-lesson" data-lesson="${lesson.id}">Mark lesson complete →</button></div></article>`).join("")}</div><div class="module-assessment"><span class="eyebrow">Module assessment route</span><h2>From recognition to production</h2><div class="assessment-route"><div><strong>Quiz</strong><span>${escapeHtml(module.assessment.quiz)}</span></div><div><strong>Reading</strong><span>${escapeHtml(module.assessment.reading)}</span></div><div><strong>Listening</strong><span>${escapeHtml(module.assessment.listening)}</span></div><div><strong>Writing / speaking</strong><span>${escapeHtml(module.assessment.writing)}</span></div></div>${routeItems.length ? `<button class="primary" data-action="skill-practice" data-skill="${routeItems[0].skill}">Start related ${escapeHtml(skillById(routeItems[0].skill)?.title || "skill")} practice →</button>` : ""}</div></section>`;
  }

  function renderSkillPage(skillId) {
    const skill = skillById(skillId);
    if (!skill) return renderUniversity();
    if (skillId === "grammar") {
      app.innerHTML = `<section class="content-page skill-page"><button class="back-link" data-action="university">← University map</button><div class="skill-page-hero"><div><span class="skill-icon skill-${escapeHtml(skill.color)}">${escapeHtml(skill.icon)}</span><span class="eyebrow">B2 grammar core</span><h1>Grammar</h1><p>${escapeHtml(skill.description)} The original 16-topic course remains the central grammar route, with detailed lessons, diagrams, quick tests and two partial exams.</p></div><button class="primary" data-action="all-practice">Practise all ${exercises.length} grammar questions →</button></div><section class="grammar-core-route"><div class="section-heading"><div><span class="eyebrow">Core route</span><h2>Choose a grammar topic</h2></div><p>Open any unit for its explanation, examples, practice bank, mini-test and voice prompt.</p></div><div class="topic-grid">${topics.map((topic, index) => renderTopicCard(topic, index)).join("")}</div></section>${renderCatalogExtras("grammar")}</section>`;
      return;
    }
    const items = skillActivities.filter((item) => item.skill === skillId);
    const quizItems = items.filter((item) => item.mode === "quiz");
    const challengeItems = items.filter((item) => item.mode === "challenge");
    app.innerHTML = `<section class="content-page skill-page"><button class="back-link" data-action="university">← University map</button><div class="skill-page-hero"><div><span class="skill-icon skill-${escapeHtml(skill.color)}">${escapeHtml(skill.icon)}</span><span class="eyebrow">Skill lab</span><h1>${escapeHtml(skill.title)}</h1><p>${escapeHtml(skill.description)}</p></div>${quizItems.length ? `<button class="primary" data-action="skill-practice" data-skill="${skill.id}">Start ${quizItems.length}-question practice →</button>` : ""}</div><div class="skill-activity-grid">${items.map((item) => `<article class="activity-card"><div class="activity-card-top"><span class="eyebrow">${escapeHtml(item.level || "All levels")}</span><span>${escapeHtml(item.taskType || (item.mode === "challenge" ? "Production challenge" : "Guided practice"))}</span><button class="favorite-button ${isFavorite(item.id) ? "is-favorite" : ""}" data-action="favorite" data-item="${item.id}" aria-label="${isFavorite(item.id) ? "Remove from favorites" : "Add to favorites"}">${isFavorite(item.id) ? "★" : "☆"}</button></div><h2>${escapeHtml(item.title || item.prompt)}</h2><p>${escapeHtml(item.prompt)}</p><div class="activity-card-footer">${item.mode === "challenge" ? `<button class="secondary" data-action="challenge" data-activity="${item.id}">Open challenge →</button>` : `<span>Interactive question</span>`}</div></article>`).join("")}</div>${renderCatalogExtras(skillId)}${challengeItems.length ? `<div class="callout"><strong>Production matters.</strong><p>Complete the open challenges after the guided questions. Save a note or recording idea so the skill becomes usable, not merely recognisable.</p></div>` : ""}</section>`;
  }

  function renderProjects() {
    app.innerHTML = `<section class="content-page projects-page"><button class="back-link" data-action="university">← University map</button><div class="page-heading"><span class="eyebrow">Integrated projects</span><h1>Turn practice into evidence.</h1><p>Each project combines several skills and creates a piece of work you can revisit, improve and compare over time.</p></div><div class="project-grid">${university.projects.map((project) => `<article class="project-card"><span class="eyebrow">${escapeHtml((university.levels.find((level) => level.id === project.level) || {}).code || project.level)}</span><h2>${escapeHtml(project.title)}</h2><p>${escapeHtml(project.description)}</p><div>${project.skills.map((skillId) => `<span>${escapeHtml(skillById(skillId)?.title || skillId)}</span>`).join("")}</div><button class="secondary" data-action="challenge" data-activity="${project.id}">Open project brief →</button></article>`).join("")}</div></section>`;
  }

  function renderCatalogExtras(skillId) {
    if (skillId === "grammar") return `<section class="catalog-section"><div class="section-heading"><div><span class="eyebrow">Extended grammar roadmap</span><h2>B1+ → C1 grammar map</h2></div><p>Each card identifies the communicative purpose, form and a model sentence. Open the core topics above for full interactive practice.</p></div><div class="catalog-grid">${catalogs.grammarCatalog.map((item) => `<article class="catalog-card"><div class="catalog-card-top"><span class="eyebrow">${escapeHtml(item.level)}</span><span>${escapeHtml(item.id)}</span></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.focus)}</p><code>${escapeHtml(item.form)}</code><em>${escapeHtml(item.example)}</em></article>`).join("")}</div></section>`;
    if (skillId === "vocabulary") return `<section class="catalog-section"><div class="section-heading"><div><span class="eyebrow">Vocabulary by domain</span><h2>Learn words in families and combinations</h2></div><p>Use the focus, collocations and synonyms as retrieval prompts and add your own sentence in the linked challenge.</p></div><div class="catalog-grid">${catalogs.vocabularyCatalog.map((item) => `<article class="catalog-card"><div class="catalog-card-top"><span class="eyebrow">${escapeHtml(item.level)}</span><span>${escapeHtml(item.id)}</span></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.focus)}</p><div class="catalog-entries">${item.entries.map(([word, collocation, synonym]) => `<div><strong>${escapeHtml(word)}</strong><span>${escapeHtml(collocation)}</span><small>${escapeHtml(synonym)}</small></div>`).join("")}</div></article>`).join("")}</div></section>`;
    if (skillId === "reading") return `<section class="catalog-section"><div class="section-heading"><div><span class="eyebrow">Reading library</span><h2>Texts with a purpose</h2></div><p>Read once for meaning, again for evidence and a third time for language, tone and inference.</p></div><div class="catalog-grid">${catalogs.readingLibrary.map((item) => `<article class="catalog-card reading-catalog-card"><div class="catalog-card-top"><span class="eyebrow">${escapeHtml(item.level)} · ${escapeHtml(item.genre)}</span><span>${escapeHtml(item.id)}</span></div><h3>${escapeHtml(item.title)}</h3><details><summary>Open text</summary><p>${escapeHtml(item.text)}</p></details><em>${escapeHtml(item.focus)}</em></article>`).join("")}</div></section>`;
    if (skillId === "writing") return `<section class="catalog-section"><div class="section-heading"><div><span class="eyebrow">Writing genre route</span><h2>From message to synthesis</h2></div><p>Use each brief to plan, draft, self-review and only then compare with model guidance.</p></div><div class="catalog-grid">${catalogs.writingCatalog.map((item) => `<article class="catalog-card"><div class="catalog-card-top"><span class="eyebrow">${escapeHtml(item.level)} · ${escapeHtml(item.genre)}</span><span>${escapeHtml(item.wordLimit)}</span></div><h3>${escapeHtml(item.title)}</h3><div class="catalog-list"><strong>Structure</strong><span>${item.structure.map(escapeHtml).join(" · ")}</span><strong>Language</strong><span>${item.language.map(escapeHtml).join(" · ")}</span></div></article>`).join("")}</div></section>`;
    if (skillId === "speaking") return `<section class="catalog-section"><div class="section-heading"><div><span class="eyebrow">Speaking simulations</span><h2>Real-world interaction</h2></div><p>Use the role, goal and follow-up questions to practise interaction rather than a memorised monologue.</p></div><div class="catalog-grid">${catalogs.speakingSimulations.map((item) => `<article class="catalog-card"><div class="catalog-card-top"><span class="eyebrow">${escapeHtml(item.level)}</span><span>${escapeHtml(item.id)}</span></div><h3>${escapeHtml(item.title)}</h3><p><strong>Roles:</strong> ${item.roles.map(escapeHtml).join(" · ")}</p><em>${escapeHtml(item.goal)}</em><button class="secondary" data-action="speak" data-speech="${escapeHtml(`${item.title}. ${item.goal}`)}">▶ Hear a model prompt</button></article>`).join("")}</div></section>`;
    if (skillId === "listening") return `<section class="catalog-section"><div class="section-heading"><div><span class="eyebrow">Listening library</span><h2>From announcements to academic ideas</h2></div><p>Listen once for gist, again for detail and a third time for attitude or implication. Use the transcript after the first attempt.</p></div><div class="catalog-grid">${catalogs.listeningLibrary.map((item) => `<article class="catalog-card"><div class="catalog-card-top"><span class="eyebrow">${escapeHtml(item.level)} · ${escapeHtml(item.genre)}</span><span>${escapeHtml(item.id)}</span></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.focus)}</p><button class="secondary" data-action="speak" data-speech="${escapeHtml(item.transcript)}">▶ Play text</button><details><summary>Show transcript</summary><p>${escapeHtml(item.transcript)}</p></details></article>`).join("")}</div></section>`;
    if (skillId === "pronunciation") return `<section class="catalog-section"><div class="section-heading"><div><span class="eyebrow">Pronunciation syllabus</span><h2>Sounds, stress, rhythm and stance</h2></div><p>Record a first attempt, listen critically and repeat with one specific focus at a time.</p></div><div class="catalog-grid">${catalogs.pronunciationCatalog.map((item) => `<article class="catalog-card"><div class="catalog-card-top"><span class="eyebrow">${escapeHtml(item.level)}</span><span>${escapeHtml(item.id)}</span></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.focus)}</p><em>${escapeHtml(item.task)}</em></article>`).join("")}</div></section>`;
    return "";
  }

  function renderChallenge(activityId) {
    const item = activityById(activityId) || university.projects.find((project) => project.id === activityId);
    if (!item) return renderUniversity();
    const saved = progress[`note:${item.id}`]?.text || "";
    const skill = item.skill ? skillById(item.skill) : null;
    const speechText = item.transcript || item.prompt || item.description || "English Lab practice";
    const briefMeta = item.wordLimit ? `<div class="writing-brief-meta"><div><strong>Word limit</strong><span>${escapeHtml(item.wordLimit)}</span></div><div><strong>Structure</strong><span>${item.recommendedStructure.map(escapeHtml).join(" → ")}</span></div><div><strong>Useful language</strong><span>${item.usefulLanguage.map(escapeHtml).join(" · ")}</span></div></div>` : "";
    const modelGuidance = item.modelAnswer || item.sample || "Finish your own work before comparing it with a model or asking for feedback.";
    app.innerHTML = `<section class="content-page challenge-page"><button class="back-link" data-action="${skill ? "skill" : "projects"}" data-skill="${skill?.id || ""}">← Back to ${skill ? escapeHtml(skill.title) : "projects"}</button><div class="page-heading"><span class="eyebrow">${escapeHtml(item.level || "Integrated project")}</span><h1>${escapeHtml(item.title || "Project brief")}</h1><p>${escapeHtml(item.prompt || item.description)}</p><button class="favorite-button challenge-favorite ${isFavorite(item.id) ? "is-favorite" : ""}" data-action="favorite" data-item="${item.id}">${isFavorite(item.id) ? "★ Saved" : "☆ Save challenge"}</button></div>${briefMeta}<div class="challenge-layout"><article class="challenge-panel"><span class="eyebrow">Preparation</span><ol>${(item.preparation || ["Read the prompt carefully.", "Plan before producing your answer.", "Review your work after completing it."]).map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>${item.transcript ? `<div class="transcript-box"><span class="eyebrow">Listening text</span><p>${escapeHtml(item.transcript)}</p></div>` : ""}<div class="challenge-actions"><button class="secondary" data-action="speak" data-speech="${escapeHtml(speechText)}">▶ Play model text</button>${item.transcript ? `<button class="text-button" data-action="toggle-transcript">Show / hide transcript</button>` : ""}</div></article><aside class="challenge-panel checklist-panel"><span class="eyebrow">Self-review checklist</span><ul>${(item.checklist || ["Content completed", "Meaning is clear", "Grammar checked", "Vocabulary is precise"]).map((check) => `<li><label><input type="checkbox"> ${escapeHtml(check)}</label></li>`).join("")}</ul><label class="eyebrow" for="challenge-note">Reflection note</label><textarea id="challenge-note" placeholder="What did you do well? What will you improve next time?">${escapeHtml(saved)}</textarea><button class="primary" data-action="save-note" data-activity="${item.id}">Save reflection</button><span class="copy-status" aria-live="polite"></span></aside></div><div class="model-note"><button class="text-button" data-action="toggle-model">Show model guidance after self-review</button><div class="model-guidance is-hidden"><span class="eyebrow">Model guidance</span><p>${escapeHtml(modelGuidance)}</p></div></div></section>`;
  }

  function renderDiagnostic() {
    app.innerHTML = `<section class="content-page"><div class="page-heading"><span class="eyebrow">B1+ → C1 diagnostic</span><h1>Find your best starting point.</h1><p>This ${university.diagnostic.length}-question diagnostic samples grammar, vocabulary, reading, Use of English, formal register and multiple levels. It is a starting estimate, not a permanent label.</p></div><button class="primary" data-action="start-diagnostic">Start diagnostic →</button><div class="reference-grid diagnostic-grid"><article class="reference-card"><span>Use it once</span><h2>Answer without notes</h2><p>Your first result is more useful when it reflects your current control and intuition.</p></article><article class="reference-card"><span>Read the feedback</span><h2>Look for patterns</h2><p>Each answer explains the decision and points toward a skill lab.</p></article><article class="reference-card"><span>Revisit later</span><h2>Compare progress</h2><p>Repeat after a study cycle and compare the level signals with your production work.</p></article></div></section>`;
  }

  function renderTopicCard(topic, index) {
    const items = exercises.filter((item) => item.topic === topic.id);
    const stats = statsFor(items);
    return `<article class="topic-card"><div class="topic-top"><span class="topic-icon icon-${(index % 7) + 1}">${topic.icon}</span><span class="question-count">${items.length} questions</span></div>
      <h3>${topic.title}</h3><p>${topic.description}</p><div class="mini-progress"><span style="width:${stats.mastered / items.length * 100}%"></span></div>
      <div class="topic-footer"><span>${stats.mastered} mastered</span><button class="card-link" data-action="topic" data-topic="${topic.id}">Open unit →</button></div></article>`;
  }

  function renderGuideDiagram(guide) {
    if (guide.diagram === "decision") return `<figure class="grammar-diagram decision-diagram"><figcaption>Decision map: choose from the context</figcaption><div class="diagram-start">What controls the future event?</div><div class="diagram-grid"><div><span>1</span><strong>Official time?</strong><p>Use present simple for a timetable or programme.</p><code>The train leaves at six.</code></div><div><span>2</span><strong>Confirmed arrangement?</strong><p>Use present continuous for an organised personal plan.</p><code>We’re meeting at six.</code></div><div><span>3</span><strong>Prior intention or evidence?</strong><p>Use be going to for an earlier decision or evidence now.</p><code>It’s going to rain.</code></div><div><span>4</span><strong>Decision now or opinion?</strong><p>Use will for reactions, offers, promises and beliefs.</p><code>I’ll help you.</code></div></div></figure>`;
    if (guide.diagram === "timeline") return `<figure class="grammar-diagram timeline-diagram"><figcaption>Timeline: enter the middle of a future activity</figcaption><div class="timeline"><span>NOW</span><i></i><div><strong>8:00–10:00</strong><b>will be working</b></div><i></i><span>LATER</span></div><p>At 9:00, the activity has already started and has not finished. The future continuous places the viewpoint inside that activity.</p></figure>`;
    if (guide.diagram === "present-system") return `<figure class="grammar-diagram decision-diagram"><figcaption>Present-tense map: choose the speaker’s viewpoint</figcaption><div class="diagram-start">How does the situation connect to now?</div><div class="diagram-grid"><div><span>1</span><strong>Routine, fact or state</strong><p>Present simple presents a stable or repeated situation.</p><code>I work here.</code></div><div><span>2</span><strong>In progress or temporary</strong><p>Present continuous places us inside a current activity.</p><code>I’m working now.</code></div><div><span>3</span><strong>Result or experience</strong><p>Present perfect connects a completed event to now.</p><code>I’ve finished it.</code></div><div><span>4</span><strong>Activity or duration</strong><p>Present perfect continuous looks back over ongoing activity.</p><code>I’ve been working.</code></div></div></figure>`;
    if (guide.diagram === "past-system") return `<figure class="grammar-diagram decision-diagram"><figcaption>Past-tense map: organise the story timeline</figcaption><div class="diagram-start">Choose a viewpoint around the main past event</div><div class="diagram-grid"><div><span>1</span><strong>Main event</strong><p>Past simple advances the completed sequence.</p><code>The lights went out.</code></div><div><span>2</span><strong>Background</strong><p>Past continuous shows what was in progress.</p><code>We were eating.</code></div><div><span>3</span><strong>Earlier event</strong><p>Past perfect looks back from the past reference.</p><code>A cable had failed.</code></div><div><span>4</span><strong>Earlier duration</strong><p>Past perfect continuous explains a developing cause.</p><code>It had been overheating.</code></div></div></figure>`;
    if (guide.diagram === "passive-system") return `<figure class="grammar-diagram decision-diagram"><figcaption>Passive builder: preserve tense while changing focus</figcaption><div class="diagram-start">Receiver + correct tense of BE + past participle</div><div class="diagram-grid"><div><span>1</span><strong>Simple</strong><p>Use is/are or was/were.</p><code>It is tested.</code></div><div><span>2</span><strong>Continuous</strong><p>Add being after the first form of be.</p><code>It is being tested.</code></div><div><span>3</span><strong>Perfect</strong><p>Add been after has, have or had.</p><code>It has been tested.</code></div><div><span>4</span><strong>Agent</strong><p>Add by only when the doer matters.</p><code>It was designed by Lin.</code></div></div></figure>`;
    if (guide.diagram === "tense-choice") return `<figure class="grammar-diagram decision-diagram"><figcaption>Three-step selection method</figcaption><div class="diagram-start">TIME → ASPECT → VOICE</div><div class="diagram-grid"><div><span>1</span><strong>Set the reference time</strong><p>Now, unfinished time, finished past or earlier past?</p><code>today ≠ yesterday</code></div><div><span>2</span><strong>Choose the viewpoint</strong><p>Fact/result or activity/duration?</p><code>has written ≠ has been writing</code></div><div><span>3</span><strong>Choose the focus</strong><p>Should the agent or receiver be the subject?</p><code>They built it. ≠ It was built.</code></div><div><span>4</span><strong>Check the structure</strong><p>Verify auxiliaries, participles and agreement.</p><code>has been repaired</code></div></div></figure>`;
    return "";
  }

  function renderDeepGuide(topic) {
    const guide = guides[topic.id];
    const diagram = renderGuideDiagram(guide);
    return `<section class="deep-guide" id="detailed-guide"><span class="eyebrow">Detailed guide</span><h2>Understand the choice, not just the form</h2><div class="guide-intro">${guide.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div>${diagram}
      <div class="guide-columns"><section><h3>Questions to ask yourself</h3><ol>${guide.questions.map((question) => `<li>${escapeHtml(question)}</li>`).join("")}</ol></section><section><h3>Common mistakes</h3><ul>${guide.mistakes.map((mistake) => `<li>${escapeHtml(mistake)}</li>`).join("")}</ul></section></div>
      <div class="contrast-board"><h3>Compare the meaning</h3>${guide.contrasts.map(([example, meaning]) => `<article><code>${escapeHtml(example)}</code><p>${escapeHtml(meaning)}</p></article>`).join("")}</div></section>`;
  }

  function renderTopic() {
    const topic = topicById(activeTopic);
    const items = exercises.filter((item) => item.topic === topic.id);
    const stats = statsFor(items);
    const voicePrompt = guides[topic.id].voicePrompt;
    app.innerHTML = `<div class="lesson-page"><section class="lesson-hero topic-hero"><button class="back-link" data-action="home">← All topics</button><span class="eyebrow">Partial ${topic.partial} · Unit ${topic.number} · ${topic.subtitle}</span><h1>${topic.title}</h1><p>${topic.description}</p>
      <div class="topic-actions"><button class="primary" data-action="topic-practice" data-topic="${topic.id}">Practise all ${items.length}</button><button class="secondary" data-action="quick-test" data-topic="${topic.id}">Take the 8-question test</button></div>
      <div class="unit-progress"><span><strong>${stats.mastered}</strong> of ${items.length} mastered</span><span><strong>${stats.accuracy}%</strong> historical accuracy</span></div></section>
      <div class="lesson-layout"><aside class="lesson-toc"><span>In this unit</span>${topic.lesson.map((item, index) => `<a href="#rule-${index + 1}">${index + 1}. ${escapeHtml(item[0])}</a>`).join("")}<button class="primary" data-action="quick-test" data-topic="${topic.id}">Quick test →</button></aside>
      <article class="lesson-content">${renderDeepGuide(topic)}${topic.lesson.map((item, index) => `<section class="lesson-section" id="rule-${index + 1}"><header class="lesson-section-head"><span>${String(index + 1).padStart(2, "0")}</span><div><small>${topic.subtitle}</small><h2>${escapeHtml(item[0])}</h2></div></header><div class="lesson-body"><p>${escapeHtml(item[1])}</p><div class="example-stack"><p><span>✓</span>${escapeHtml(item[2])}</p></div><div class="rule-method"><strong>How to use this rule</strong><p>Read the whole context, identify the speaker’s meaning, build the complete structure and then check subject–verb form and word order.</p></div></div></section>`).join("")}
      <section class="lesson-finish"><span class="eyebrow">Apply the rules</span><h2>Practise this unit</h2><p>Work through every multiple-choice, written and reading question in this topic.</p><button class="primary" data-action="topic-practice" data-topic="${topic.id}">Start all ${items.length} questions →</button></section>
      <section class="voice-card"><div class="voice-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6"/></svg></div><div><span class="eyebrow">Optional speaking practice</span><h2>Practice with ChatGPT Voice</h2><p>Copy this text, open a voice conversation and use it as your starting prompt. This is a text-only helper and does not connect to any external service.</p><pre>${escapeHtml(voicePrompt)}</pre><button class="secondary" data-action="copy-prompt" data-prompt="${escapeHtml(voicePrompt)}">Copy prompt</button><span class="copy-status" aria-live="polite"></span></div></section>
      </article></div></div>`;
  }

  function startSession(kind, topicId = null) {
    let items = [];
    let title = "Practice";
    let production = [];
    if (kind === "topic") { items = exercises.filter((item) => item.topic === topicId); title = `${topicById(topicId).title} practice`; }
    if (kind === "quick") { items = exercises.filter((item) => item.topic === topicId && item.quickTest); title = `${topicById(topicId).title} quick test`; }
    if (kind === "all") { items = exercises; title = "All-topic practice"; }
    if (kind === "partial1") { items = exercises.filter((item) => item.exam === 1); title = "Partial 1 exam"; }
    if (kind === "partial2") { items = exercises.filter((item) => item.exam === 2); title = "Partial 2 exam"; }
    if (kind === "skill") { items = skillActivities.filter((item) => item.skill === topicId && item.mode === "quiz"); title = `${skillById(topicId)?.title || "Skill"} practice`; }
    if (kind === "diagnostic") { items = university.diagnostic || []; title = "B1+ → C1 diagnostic"; }
    if (kind === "review") { items = reviewDue(); title = "Spaced review queue"; }
    if (kind === "level-exam") { const exam = university.levelExams?.find((item) => item.level === topicId); items = exam?.questions || []; production = exam?.production || []; title = exam?.title || "Level exam"; }
    if (kind === "mistakes") { items = mistakes(); title = "Mistake review"; }
    session = { kind, topicId, title, production, items: kind === "partial1" || kind === "partial2" || kind === "quick" || kind === "diagnostic" || kind === "level-exam" ? items : shuffle(items) };
    current = 0; selected = null; typedAnswer = ""; answered = false; sessionCorrect = 0; sessionDone = false;
    view = "session"; closeMenu(); render();
  }

  function renderSession() {
    if (!session.items.length) {
      app.innerHTML = `<section class="practice-page"><div class="empty-state"><span>✓</span><h2>No saved mistakes</h2><p>Complete some practice first, then return here to review incorrect answers.</p><button class="primary" data-action="home">Back to topics</button></div></section>`;
      return;
    }
    if (sessionDone) { renderResults(); return; }
    const exercise = session.items[current];
    const topic = topicById(exercise.topic);
    const progressWidth = ((current + (answered ? 1 : 0)) / session.items.length) * 100;
    const correct = answered && isCorrectAnswer(exercise);
    app.innerHTML = `<section class="practice-page"><div class="quiz-layout"><aside class="quiz-sidebar"><button class="back-link" data-action="exit-session">← Exit session</button><span class="eyebrow">${session.kind === "partial1" ? "All nine Partial 1 units" : session.kind === "partial2" ? "All seven Partial 2 units" : session.kind === "diagnostic" ? `${university.diagnostic.length} level signals` : session.kind === "level-exam" ? "Level checkpoint" : escapeHtml(topic.title)}</span><h2>${escapeHtml(session.title)}</h2><div class="session-stat"><span>Progress</span><strong>${current + 1} / ${session.items.length}</strong></div><div class="progress-track"><span style="width:${progressWidth}%"></span></div><div class="session-stat"><span>Correct</span><strong>${sessionCorrect}</strong></div><p class="sidebar-tip"><strong>Strategy:</strong> identify the context before choosing the grammar form.</p></aside>
      <article class="question-card ${exercise.passage ? "reading-question" : ""}"><div class="question-meta"><span class="topic-pill">${escapeHtml(topic.icon)} ${escapeHtml(topic.title)}</span><span>${escapeHtml(exercise.taskType || (exercise.type === "text" ? "Written answer" : "Multiple choice"))}</span></div>
      ${exercise.passage ? `<div class="reading-box"><span>Reading task</span><h3>${escapeHtml(exercise.passageTitle)}</h3><p>${escapeHtml(exercise.passage)}</p></div>` : ""}<p class="instruction">${escapeHtml(exercise.instruction)}</p><h2>${escapeHtml(exercise.prompt)}</h2>
      ${exercise.type === "choice" ? renderOptions(exercise) : `<div class="written-answer"><label for="written-input">Your answer</label><input id="written-input" type="text" autocomplete="off" spellcheck="false" value="${escapeHtml(typedAnswer)}" ${answered ? "disabled" : ""}><small>Capitalisation and final punctuation are ignored.</small></div>`}
      ${answered ? `<div class="feedback ${correct ? "success" : "error"}" aria-live="polite"><div class="feedback-title"><span>${correct ? "✓" : "!"}</span><strong>${correct ? "Correct" : "Not quite"}</strong></div><p>${escapeHtml(exercise.explanation)}</p>${!correct ? `<small><strong>Accepted answer:</strong> ${exercise.type === "choice" ? escapeHtml(exercise.options[exercise.answer]) : escapeHtml(exercise.answers[0])}</small>` : ""}</div>` : ""}
      <div class="question-actions">${answered ? `<button class="primary" data-action="next">${current === session.items.length - 1 ? "View results" : "Next question →"}</button>` : `<button class="primary" data-action="submit" ${exercise.type === "choice" ? (selected === null ? "disabled" : "") : (typedAnswer.trim() ? "" : "disabled")}>Check answer</button>`}</div></article></div></section>`;
    if (exercise.type === "text" && !answered) document.querySelector("#written-input")?.focus();
  }

  function renderOptions(exercise) {
    return `<div class="answers" role="radiogroup" aria-label="Answer options">${exercise.options.map((option, index) => {
      let state = selected === index ? "selected" : "";
      if (answered && index === exercise.answer) state = "correct";
      else if (answered && index === selected) state = "wrong";
      const status = answered && index === exercise.answer ? "✓" : answered && index === selected ? "×" : "";
      return `<button class="answer ${state}" type="button" data-option="${index}" role="radio" aria-checked="${selected === index}" ${answered ? "disabled" : ""}><span class="answer-letter">${String.fromCharCode(65 + index)}</span><span>${escapeHtml(option)}</span><span class="answer-status">${status}</span></button>`;
    }).join("")}</div>`;
  }

  function renderResults() {
    const score = percent(sessionCorrect, session.items.length);
    const groupIds = [...new Set(session.items.map((item) => item.topic || item.skill || "diagnostic"))];
    const breakdown = groupIds.map((groupId) => {
      const topic = topicById(groupId);
      const topicItems = session.items.filter((item) => (item.topic || item.skill || "diagnostic") === groupId);
      if (!topicItems.length) return "";
      const correctItems = topicItems.filter((item) => progress[item.id]?.lastCorrect).length;
      return `<div><span>${escapeHtml(topic.title)}</span><strong>${correctItems} / ${topicItems.length}</strong></div>`;
    }).join("");
    const diagnosticLevel = session.kind === "diagnostic" ? score >= 84 ? "C1 starting signal" : score >= 67 ? "B2+ starting signal" : score >= 50 ? "B2 starting signal" : "B1+ starting signal" : "";
    const productionRoute = session.kind === "level-exam" && session.production?.length ? `<div class="production-route"><span class="eyebrow">Production route</span><p>Complete these open tasks after the checkpoint. They assess what selected answers cannot show.</p><div>${session.production.map((item) => `<button class="secondary" data-action="challenge" data-activity="${item.id}">${escapeHtml(item.title || item.prompt)}</button>`).join("")}</div></div>` : "";
    if (!session.resultSaved) {
      meta.results = [{ at: new Date().toISOString(), kind: session.kind, title: session.title, score, correct: sessionCorrect, total: session.items.length }, ...(meta.results || [])].slice(0, 30);
      if (session.kind === "diagnostic") meta.levelEstimate = diagnosticLevel;
      saveMeta();
      session.resultSaved = true;
    }
    app.innerHTML = `<section class="practice-page"><div class="results-card wide-results"><span class="eyebrow">Session completed</span><div class="result-score">${score}<sup>%</sup></div><h2>${session.kind === "diagnostic" ? diagnosticLevel : score >= 80 ? "Strong performance" : score >= 65 ? "Good progress" : "Keep practising"}</h2><p>You answered <strong>${sessionCorrect}</strong> of <strong>${session.items.length}</strong> questions correctly.</p>${session.kind === "diagnostic" ? `<div class="diagnostic-result"><strong>This is a starting estimate, not a permanent label.</strong><span>Open the recommended skill labs, produce something and repeat the diagnostic after a study cycle.</span></div>` : ""}${productionRoute}<div class="result-breakdown">${breakdown}</div><div class="result-actions">${mistakes().length ? '<button class="primary" data-action="review-mistakes">Review mistakes</button>' : ""}${reviewDue().length ? '<button class="secondary" data-action="review-due">Review due</button>' : ""}<button class="secondary" data-action="repeat-session">Try again</button><button class="text-button" data-action="home">Back to topics</button></div></div></section>`;
  }

  function renderMistakesPage() {
    const items = mistakes();
    app.innerHTML = `<section class="content-page"><div class="page-heading"><span class="eyebrow">Targeted review</span><h1>My mistakes</h1><p>A question leaves this list when your latest answer is correct. Spaced review also brings difficult questions back before they are forgotten.</p></div>${items.length ? `<div class="mistake-summary"><div><strong>${items.length}</strong><span>questions to master</span></div><button class="primary" data-action="review-mistakes">Practise these mistakes</button></div><div class="mistake-list">${items.map((item) => { const record = progress[item.id] || {}; const itemTopic = topicById(item.topic || item.skill); return `<article><span>${escapeHtml(itemTopic.icon)}</span><div><small>${escapeHtml(itemTopic.title)} · ${escapeHtml(record.errorType || "review")}</small><p>${escapeHtml(item.prompt)}</p></div><strong>${item.type === "choice" ? escapeHtml(item.options[item.answer]) : escapeHtml(item.answers?.[0] || item.sample || "Open challenge")}</strong></article>`; }).join("")}</div>` : `<div class="empty-state"><span>✓</span><h2>Nothing to review</h2><p>You have no saved mistakes.</p><button class="primary" data-action="home">Choose a topic</button></div>`}</section>`;
  }

  function updateChrome() {
    document.querySelector(".nav-count").textContent = mistakes().length;
    document.querySelectorAll("#main-nav [data-action]").forEach((button) => {
      const active = (view === "home" && button.dataset.action === "home") || (view === "university" && button.dataset.action === "university") || (view === "skill" && button.dataset.action === "skills") || (view === "diagnostic" && button.dataset.action === "diagnostic") || (view === "mistakes" && button.dataset.action === "mistakes") || (session?.kind === "partial1" && view === "session" && button.dataset.action === "partial-1-test") || (session?.kind === "partial2" && view === "session" && button.dataset.action === "partial-2-test");
      button.classList.toggle("active", active);
    });
  }

  function render() {
    if (view === "home") renderHome();
    else if (view === "university") renderUniversity();
    else if (view === "level") renderLevel(activeSkill);
    else if (view === "module") renderModule(activeModule);
    else if (view === "skill") renderSkillPage(activeSkill);
    else if (view === "projects") renderProjects();
    else if (view === "challenge") renderChallenge(activeChallenge);
    else if (view === "diagnostic") renderDiagnostic();
    else if (view === "topic") renderTopic();
    else if (view === "session") renderSession();
    else renderMistakesPage();
    updateChrome();
  }

  function navigate(nextView, topicId = null) {
    view = nextView;
    if (nextView === "topic") activeTopic = topicId || activeTopic;
    if (nextView === "skill" || nextView === "level") activeSkill = topicId || activeSkill;
    if (nextView === "module") activeModule = topicId || activeModule;
    if (nextView === "challenge") activeChallenge = topicId || activeChallenge;
    session = nextView === "session" ? session : null; closeMenu(); render();
    window.scrollTo({ top: 0, behavior: "smooth" }); app.focus({ preventScroll: true });
  }

  function closeMenu() { nav.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false"); }

  async function copyPrompt(button) {
    const value = button.dataset.prompt;
    try { await navigator.clipboard.writeText(value); }
    catch {
      const area = document.createElement("textarea"); area.value = value; document.body.append(area); area.select(); document.execCommand("copy"); area.remove();
    }
    const status = button.parentElement.querySelector(".copy-status"); status.textContent = "Prompt copied.";
    window.setTimeout(() => { status.textContent = ""; }, 2500);
  }

  document.addEventListener("input", (event) => {
    if (event.target.id !== "written-input") return;
    typedAnswer = event.target.value;
    const submit = document.querySelector('[data-action="submit"]');
    if (submit) submit.disabled = !typedAnswer.trim();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target.id === "written-input" && typedAnswer.trim() && !answered) document.querySelector('[data-action="submit"]')?.click();
  });

  document.addEventListener("click", (event) => {
    const option = event.target.closest("[data-option]");
    if (option && !answered) { selected = Number(option.dataset.option); renderSession(); return; }
    const control = event.target.closest("[data-action]");
    if (!control) return;
    const action = control.dataset.action;
    if (action === "menu") { const open = nav.classList.toggle("open"); menuButton.setAttribute("aria-expanded", String(open)); return; }
    if (action === "home") { navigate("home"); return; }
    if (action === "university") { navigate("university"); return; }
    if (action === "skills") { navigate("university"); return; }
    if (action === "level") { navigate("level", control.dataset.level); return; }
    if (action === "module") { navigate("module", control.dataset.module); return; }
    if (action === "level-exam") { startSession("level-exam", control.dataset.level); return; }
    if (action === "module-lesson") { const lesson = document.querySelector(`[data-lesson="${control.dataset.lesson}"]`); control.textContent = "Lesson completed ✓"; control.disabled = true; control.classList.add("lesson-complete"); progress[`lesson:${control.dataset.lesson}`] = { completedAt: new Date().toISOString() }; saveProgress(); return; }
    if (action === "skill") { navigate("skill", control.dataset.skill); return; }
    if (action === "projects") { navigate("projects"); return; }
    if (action === "challenge") { navigate("challenge", control.dataset.activity); return; }
    if (action === "favorite") { toggleFavorite(control.dataset.item); render(); return; }
    if (action === "skill-practice") { startSession("skill", control.dataset.skill); return; }
    if (action === "diagnostic") { navigate("diagnostic"); return; }
    if (action === "start-diagnostic") { startSession("diagnostic"); return; }
    if (action === "review-due") { startSession("review"); return; }
    if (action === "speak") { if ("speechSynthesis" in window) { window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(control.dataset.speech || "English Lab practice"); utterance.lang = "en-US"; utterance.rate = 0.9; window.speechSynthesis.speak(utterance); } return; }
    if (action === "toggle-transcript") { document.querySelector(".transcript-box")?.classList.toggle("is-hidden"); return; }
    if (action === "toggle-model") { const guidance = document.querySelector(".model-guidance"); guidance?.classList.toggle("is-hidden"); control.textContent = guidance?.classList.contains("is-hidden") ? "Show model guidance after self-review" : "Hide model guidance"; return; }
    if (action === "save-note") { const note = document.querySelector("#challenge-note")?.value.trim() || ""; progress[`note:${control.dataset.activity}`] = { text: note, updatedAt: new Date().toISOString() }; saveProgress(); const status = control.parentElement.querySelector(".copy-status"); if (status) { status.textContent = "Reflection saved."; window.setTimeout(() => { status.textContent = ""; }, 2200); } return; }
    if (action === "topic") { navigate("topic", control.dataset.topic); return; }
    if (action === "topic-practice") { startSession("topic", control.dataset.topic); return; }
    if (action === "quick-test") { startSession("quick", control.dataset.topic); return; }
    if (action === "all-practice") { startSession("all"); return; }
    if (action === "partial-1-test") { startSession("partial1"); return; }
    if (action === "partial-2-test") { startSession("partial2"); return; }
    if (action === "mistakes") { navigate("mistakes"); return; }
    if (action === "review-mistakes") { startSession("mistakes"); return; }
    if (action === "exit-session") { if (session?.kind === "skill") navigate("skill", session.topicId); else if (session?.kind === "diagnostic") navigate("diagnostic"); else if (session?.kind === "level-exam") navigate("level", session.topicId); else session?.topicId ? navigate("topic", session.topicId) : navigate("home"); return; }
    if (action === "copy-prompt") { copyPrompt(control); return; }
    if (action === "submit" && !answered) {
      const exercise = session.items[current]; const correct = isCorrectAnswer(exercise);
      recordStudyDay();
      const old = progress[exercise.id] || { attempts: 0, correct: 0 };
      const errorType = correct ? null : exercise.passage ? "context reading" : exercise.type === "text" ? "written production" : "form or meaning choice";
      const intervalDays = correct ? Math.min(30, old.intervalDays ? old.intervalDays * 2 : 1) : 0;
      const nextReview = new Date(Date.now() + intervalDays * 86400000).toISOString();
      const history = [...(old.history || []), { at: new Date().toISOString(), correct, errorType, answer: exercise.type === "choice" ? selected : typedAnswer }].slice(-8);
      progress[exercise.id] = { attempts: old.attempts + 1, correct: old.correct + (correct ? 1 : 0), lastCorrect: correct, lastAnswer: exercise.type === "choice" ? selected : typedAnswer, errorType, intervalDays, nextReview, history };
      if (correct) sessionCorrect += 1; answered = true; saveProgress(); render(); return;
    }
    if (action === "next") { if (current === session.items.length - 1) sessionDone = true; else { current += 1; selected = null; typedAnswer = ""; answered = false; } render(); return; }
    if (action === "repeat-session") { startSession(session.kind, session.topicId); return; }
    if (action === "reset" && window.confirm("Delete all saved progress, favorites and study history?")) { progress = {}; meta = { favorites: [], results: [], streak: 0, lastStudyDate: null, levelEstimate: null }; saveProgress(); saveMeta(); render(); }
  });

  const params = new URLSearchParams(window.location.search);
  const requestedTopic = params.get("topic");
  const requestedMode = params.get("mode");
  if (requestedTopic && topics.some((topic) => topic.id === requestedTopic)) { activeTopic = requestedTopic; view = "topic"; render(); }
  else if (requestedMode === "university") navigate("university");
  else if (requestedMode === "diagnostic") navigate("diagnostic");
  else if (requestedMode === "partial1") startSession("partial1");
  else if (requestedMode === "partial2") startSession("partial2");
  else if (requestedMode === "all") startSession("all");
  else render();
})();
