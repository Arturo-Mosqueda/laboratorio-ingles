(() => {
  "use strict";

  const { topics, guides, exercises } = window.GrammarLabData;
  const university = window.EnglishUniversityData || { levels: [], skills: [], activities: [], projects: [], diagnostic: [], levelExams: [] };
  const skillActivities = university.activities || [];
  const catalogs = window.EnglishCatalogs || { grammarCatalog: [], vocabularyCatalog: [], readingLibrary: [], writingCatalog: [], speakingSimulations: [], listeningLibrary: [], pronunciationCatalog: [] };
  const storageKey = "english-lab-progress-v2";
  const metaStorageKey = "english-lab-meta-v1";
  const themeStorageKey = "english-lab-theme-v1";
  const app = document.querySelector("#app");
  const nav = document.querySelector("#main-nav");
  const menuButton = document.querySelector('[data-action="menu"]');

  let view = "home";
  let activeTopic = null;
  let activeSkill = null;
  let activeChallenge = null;
  let activeModule = null;
  let activeLesson = null;
  let activeGrammar = null;
  let activeIntegratedUnit = null;
  let activeExam = null;
  let progress = loadProgress();
  let meta = loadMeta();
  let session = null;
  let current = 0;
  let selected = null;
  let typedAnswer = "";
  let answered = false;
  let sessionCorrect = 0;
  let sessionDone = false;
  let searchQuery = "";
  let countdownHandle = null;
  let mediaRecorder = null;
  let recordingStream = null;
  let recordedChunks = [];
  let skillLevelFilter = "all";
  let skillModeFilter = "all";
  let skillDisplayLimit = 24;

  const escapeHtml = (value = "") => String(value)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;");

  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(storageKey)) || {}; }
    catch { return {}; }
  }

  function loadMeta() {
    const empty = { favorites: [], vocabulary: [], results: [], streak: 0, lastStudyDate: null, levelEstimate: null };
    try { const loaded = JSON.parse(localStorage.getItem(metaStorageKey)) || {}; return { ...empty, ...loaded, favorites: loaded.favorites || [], vocabulary: loaded.vocabulary || [], results: loaded.results || [] }; }
    catch { return empty; }
  }

  function applyTheme(theme) {
    document.body.classList.toggle("dark-theme", theme === "dark");
    const button = document.querySelector('[data-action="theme"]');
    if (button) button.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  }

  function toggleTheme() {
    const next = document.body.classList.contains("dark-theme") ? "light" : "dark";
    localStorage.setItem(themeStorageKey, next);
    applyTheme(next);
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

  function stopLocalRecording() {
    if (mediaRecorder?.state === "recording") mediaRecorder.stop();
    if (recordingStream) recordingStream.getTracks().forEach((track) => track.stop());
    recordingStream = null;
  }

  async function startLocalRecording() {
    const status = document.querySelector("#recording-status");
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      if (status) status.textContent = "Local recording is not supported in this browser. Use any recorder you trust and keep the file private.";
      return;
    }
    try {
      recordingStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordedChunks = [];
      mediaRecorder = new MediaRecorder(recordingStream);
      mediaRecorder.addEventListener("dataavailable", (event) => { if (event.data.size) recordedChunks.push(event.data); });
      mediaRecorder.addEventListener("stop", () => {
        const audio = document.querySelector("#local-recording-playback");
        if (audio && recordedChunks.length) { audio.src = URL.createObjectURL(new Blob(recordedChunks, { type: mediaRecorder.mimeType || "audio/webm" })); audio.hidden = false; }
        if (status) status.textContent = "Recording ready. Listen, choose one improvement and repeat the task.";
        if (activeChallenge && recordedChunks.length) {
          progress[`recording:${activeChallenge}`] = { recordedAt: new Date().toISOString(), localOnly: true };
          saveProgress();
          updateChallengeWorkspaceState();
        }
        if (recordingStream) recordingStream.getTracks().forEach((track) => track.stop());
        recordingStream = null;
      });
      mediaRecorder.start();
      if (status) status.textContent = "Recording locally… Nothing is uploaded.";
      const start = document.querySelector('[data-action="start-recording"]');
      const stop = document.querySelector('[data-action="stop-recording"]');
      if (start) start.disabled = true;
      if (stop) stop.disabled = false;
    } catch {
      if (status) status.textContent = "Microphone permission was not granted. You can still complete the task with an external recorder or voice conversation.";
    }
  }

  function startCountdown(seconds) {
    window.clearInterval(countdownHandle);
    let remaining = Number(seconds) || 60;
    const display = document.querySelector("#speaking-timer");
    const format = () => `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`;
    if (display) display.textContent = format();
    countdownHandle = window.setInterval(() => {
      remaining -= 1;
      if (display) display.textContent = format();
      if (remaining <= 0) { window.clearInterval(countdownHandle); countdownHandle = null; if (display) display.textContent = "Time — finish your sentence"; }
    }, 1000);
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
  const lessonById = (id) => (university.lessonIndex || []).find((lesson) => lesson.id === id);
  const grammarById = (id) => catalogs.grammarCatalog.find((item) => item.id === id);
  const integratedUnitById = (id) => (university.integratedUnits || []).find((item) => item.id === id);
  const topicById = (id) => topics.find((topic) => topic.id === id) || skillById(id) || (String(id || "").startsWith("skill-") ? skillById(String(id).slice(6)) : null) || {
    id, title: "Diagnostic", icon: "DI", description: "Level diagnostic", partial: null
  };
  const allPracticeItems = [...exercises, ...skillActivities, ...(university.diagnostic || [])];

  function renderBreadcrumbs(items) {
    return `<nav class="breadcrumbs" aria-label="Breadcrumb">${items.map((item, index) => index === items.length - 1
      ? `<span aria-current="page">${escapeHtml(item.label)}</span>`
      : `<button type="button" data-action="${item.action}" ${item.id ? `data-${item.key || item.action}="${escapeHtml(item.id)}"` : ""}>${escapeHtml(item.label)}</button><i aria-hidden="true">/</i>`).join("")}</nav>`;
  }
  const mistakes = () => allPracticeItems.filter((exercise) => progress[exercise.id] && progress[exercise.id].lastCorrect === false);
  const reviewDue = () => allPracticeItems.filter((exercise) => {
    if (exercise.mode === "challenge") return false;
    const saved = progress[exercise.id];
    return saved && (!saved.nextReview || saved.nextReview <= new Date().toISOString());
  });
  const vocabularyDue = () => (meta.vocabulary || []).filter((word) => !word.nextReview || word.nextReview <= new Date().toISOString());
  const vocabularyReviewItems = (dueOnly = true) => {
    const words = dueOnly ? vocabularyDue() : (meta.vocabulary || []);
    return words.map((word) => ({ id: `word-review:${word.id}`, wordId: word.id, skill: "vocabulary", level: word.level, mode: "quiz", type: "text", taskType: "Personal word-bank retrieval", instruction: "Retrieve the word or expression from its English definition.", prompt: `${word.meaning} (${word.stress})`, answers: [word.term], explanation: `${word.term}: ${word.collocation}. Say the stress pattern, then create a new sentence.`, topic: "skill-vocabulary" }));
  };

  function statsFor(items) {
    const guided = items.filter((item) => item.mode !== "challenge");
    const production = items.filter((item) => item.mode === "challenge");
    const attempted = items.filter((item) => progress[item.id]).length;
    const mastered = items.filter((item) => progress[item.id]?.lastCorrect === true || progress[item.id]?.completedAt).length;
    const guidedAttempted = guided.filter((item) => progress[item.id]?.attempts).length;
    const productionCompleted = production.filter((item) => progress[item.id]?.completedAt).length;
    const totals = guided.reduce((sum, item) => {
      const saved = progress[item.id];
      return { attempts: sum.attempts + (saved?.attempts || 0), correct: sum.correct + (saved?.correct || 0) };
    }, { attempts: 0, correct: 0 });
    return { attempted, mastered, guidedAttempted, guidedAvailable: guided.length, productionCompleted, productionAvailable: production.length, accuracy: percent(totals.correct, totals.attempts) };
  }

  function skillStats(skillId) {
    return statsFor(skillId === "grammar" ? [...exercises, ...skillActivities.filter((item) => item.skill === "grammar")] : skillActivities.filter((item) => item.skill === skillId));
  }

  function levelSkillStats(skillId, levelId) {
    const items = skillId === "grammar"
      ? skillActivities.filter((item) => item.skill === "grammar" && item.level === levelId)
      : skillActivities.filter((item) => item.skill === skillId && item.level === levelId);
    return statsFor(items);
  }

  function classifyError(item) {
    const label = `${item.topic || ""} ${item.skill || ""} ${item.taskType || ""}`.toLowerCase();
    if (label.includes("present-tenses")) return "present time and aspect";
    if (label.includes("past-tenses") || label.includes("narrative")) return "past timeline and narrative sequence";
    if (label.includes("passive")) return "active/passive focus and auxiliary form";
    if (label.includes("future")) return "future form and communicative purpose";
    if (label.includes("article") || label.includes("determiner") || label.includes("quantifier")) return "noun phrase and determiner choice";
    if (label.includes("collocation")) return "collocation";
    if (label.includes("word formation") || label.includes("word-formation")) return "word family and grammatical slot";
    if (label.includes("register")) return "register and audience";
    if (label.includes("reading")) return item.passage ? "reading evidence and inference" : "reading strategy";
    if (label.includes("listening")) return "listening detail, stance or inference";
    if (label.includes("pronunciation")) return "sound, stress or connected speech";
    if (label.includes("use-of-english")) return "grammar and lexical control";
    if (item.type === "text") return "written form retrieval";
    return "form, meaning or context choice";
  }

  function patternAdvice(pattern) {
    const type = pattern.errorType;
    if (type === "present time and aspect") return "You frequently lose the distinction between routine, current activity, present result and duration. Review the present-tense decision map.";
    if (type === "past timeline and narrative sequence") return "You frequently need a clearer separation between background, main events, earlier events and earlier duration.";
    if (type === "active/passive focus and auxiliary form") return "You often need to preserve the tense in the auxiliary while deciding whether the agent or receiver should be prominent.";
    if (type === "future form and communicative purpose") return "You often need to distinguish schedule, arrangement, prior intention, evidence and a decision made now.";
    if (type === "noun phrase and determiner choice") return "You often need to check whether a noun is singular, countable, specific and already identifiable before choosing the determiner.";
    if (type === "collocation") return "You frequently recognise the meaning but miss the natural word partnership. Review the complete phrase, not the isolated word.";
    if (type === "reading evidence and inference") return "Your answer may go beyond the text. Identify two supporting clues and keep the conclusion no stronger than the evidence.";
    if (type === "listening detail, stance or inference") return "Listen once for purpose, then replay with one precise question. Use stress, contrast and qualification as evidence.";
    return `This pattern appears repeatedly: ${type}. Complete a short targeted review and explain the reason for each answer.`;
  }

  function estimatedSkillLevel(skillId) {
    let estimate = "Building evidence";
    university.levels.forEach((level) => {
      const items = skillId === "grammar" ? skillActivities.filter((item) => item.skill === "grammar" && item.level === level.id) : skillActivities.filter((item) => item.skill === skillId && item.level === level.id);
      const stats = statsFor(items);
      const guidedRequired = Math.min(6, stats.guidedAvailable);
      const guidedReady = guidedRequired === 0 || (stats.guidedAttempted >= guidedRequired && stats.accuracy >= 72);
      const productionReady = stats.productionAvailable === 0 || stats.productionCompleted >= 1;
      if (guidedReady && productionReady && (stats.guidedAttempted || stats.productionCompleted)) estimate = level.code;
    });
    return estimate;
  }

  function errorPatterns() {
    const groups = new Map();
    allPracticeItems.forEach((item) => {
      const saved = progress[item.id];
      if (!saved || saved.lastCorrect !== false) return;
      const key = `${item.topic || item.skill || "general"}::${saved.errorType || "review"}`;
      const current = groups.get(key) || { count: 0, item, errorType: saved.errorType || "review" };
      current.count += 1;
      groups.set(key, current);
    });
    return [...groups.values()].sort((a, b) => b.count - a.count);
  }

  function renderProgressDashboard() {
    const topPatterns = errorPatterns().slice(0, 3);
    const nextProduction = skillActivities.find((item) => item.mode === "challenge" && progress[`draft:${item.id}`]?.text && !progress[item.id]?.completedAt)
      || skillActivities.find((item) => item.mode === "challenge" && !progress[item.id]?.completedAt);
    const skillRows = university.skills.map((skill) => {
      const overall = skillStats(skill.id);
      const levelCells = university.levels.map((level) => {
        const stats = levelSkillStats(skill.id, level.id);
        return `<span class="progress-level-cell"><small>${escapeHtml(level.code)}</small><strong>${stats.attempted}/${stats.mastered}</strong></span>`;
      }).join("");
      return `<article class="skill-progress-row"><div class="skill-progress-name"><span class="skill-icon skill-${escapeHtml(skill.color)}">${escapeHtml(skill.icon)}</span><div><strong>${escapeHtml(skill.title)}</strong><small>${overall.guidedAttempted} guided · ${overall.productionCompleted} produced · ${overall.accuracy}% guided accuracy · estimate: ${escapeHtml(estimatedSkillLevel(skill.id))}</small></div></div><div class="progress-levels">${levelCells}</div><button class="card-link" data-action="skill" data-skill="${skill.id}">Open →</button></article>`;
    }).join("");
    const recommendation = topPatterns.length
      ? `<div class="recommendation-box"><span class="eyebrow">Recommended next step</span><h3>Review ${escapeHtml(topPatterns[0].item.title || topPatterns[0].item.prompt)}</h3><p>This pattern currently has ${topPatterns[0].count} unresolved question${topPatterns[0].count === 1 ? "" : "s"}: ${escapeHtml(topPatterns[0].errorType)}. Open the targeted review queue and then return to the linked skill lab.</p><button class="secondary" data-action="review-mistakes">Start targeted review →</button></div>`
      : nextProduction
        ? `<div class="recommendation-box"><span class="eyebrow">Recommended next step</span><h3>${progress[`draft:${nextProduction.id}`]?.text ? "Finish your saved production" : "Add production evidence"}</h3><p>${escapeHtml(nextProduction.title || nextProduction.prompt)} will add reviewed writing, speaking or applied evidence to your guided results.</p><button class="secondary" data-action="challenge" data-activity="${nextProduction.id}">Open recommended challenge →</button></div>`
        : `<div class="recommendation-box"><span class="eyebrow">Recommended next step</span><h3>Consolidate your portfolio</h3><p>You have completed the available production route. Revisit a guided skill with the lowest accuracy, then improve one saved draft or recording.</p><button class="secondary" data-action="projects">Review integrated projects →</button></div>`;
    return `<section class="progress-dashboard"><div class="section-heading"><div><span class="eyebrow">Progress by skill</span><h2>See where to focus next</h2></div><p>Each level cell shows attempted and mastered activities. Use the recommendation to turn error patterns into a concrete study action.</p></div><div class="skill-progress-list">${skillRows}</div>${recommendation}</section>`;
  }

  function searchResults(query) {
    const needle = String(query || "").trim().toLowerCase();
    if (!needle) return "<p class=\"search-empty\">Search topics, skills, modules or activities.</p>";
    const matches = [];
    topics.forEach((item) => {
      if (`${item.title} ${item.description}`.toLowerCase().includes(needle)) matches.push({ type: "topic", id: item.id, title: item.title, detail: "Core grammar unit" });
    });
    catalogs.grammarCatalog.forEach((item) => {
      if (`${item.title} ${item.focus} ${item.form} ${item.example}`.toLowerCase().includes(needle)) matches.push({ type: "grammar-studio", id: item.id, title: item.title, detail: `${item.level.toUpperCase()} Grammar Studio` });
    });
    university.skills.forEach((item) => {
      if (`${item.title} ${item.description}`.toLowerCase().includes(needle)) matches.push({ type: "skill", id: item.id, title: item.title, detail: "Skill lab" });
    });
    university.levels.forEach((level) => level.modules.forEach((module) => {
      if (`${level.code} ${module.title} ${module.focus}`.toLowerCase().includes(needle)) matches.push({ type: "module", id: module.id, title: module.title, detail: `${level.code} module` });
    }));
    (university.integratedUnits || []).forEach((item) => {
      if (`${item.title} ${item.theme} ${item.reading.title} ${item.listening.title}`.toLowerCase().includes(needle)) matches.push({ type: "integrated-unit", id: item.id, title: item.title, detail: `${item.level.toUpperCase()} integrated unit` });
    });
    skillActivities.forEach((item) => {
      if (matches.length >= 18) return;
      if (`${item.title || ""} ${item.prompt || ""} ${item.taskType || ""}`.toLowerCase().includes(needle)) matches.push({ type: item.mode === "challenge" ? "challenge" : "skill", id: item.id, title: item.title || item.prompt, detail: `${university.levels.find((level) => level.id === item.level)?.code || "University"} · ${item.taskType || item.mode}` });
    });
    if (!matches.length) return "<p class=\"search-empty\">No matches yet. Try a grammar form, skill or topic word.</p>";
    return `<div class="search-result-list">${matches.slice(0, 18).map((match) => `<button class="search-result" data-action="search-result" data-result-type="${match.type}" data-result-id="${match.id}"><strong>${escapeHtml(match.title)}</strong><span>${escapeHtml(match.detail)}</span></button>`).join("")}</div>`;
  }

  function renderCourseSearch() {
    return `<section class="course-search"><label class="eyebrow" for="course-search-input">Search the University</label><div class="search-input-row"><input id="course-search-input" type="search" placeholder="Try passive voice, reading, technology or a module title" value="${escapeHtml(searchQuery)}" autocomplete="off"><span aria-hidden="true">⌕</span></div><div id="search-results" aria-live="polite">${searchResults(searchQuery)}</div></section>`;
  }

  function renderLevelCard(level) {
    const levelModules = level.modules.length;
    const levelActivities = skillActivities.filter((item) => item.level === level.id).length;
    const levelTopics = level.id === "b2" ? topics.length : level.id === "b1-plus" ? 0 : 0;
    return `<article class="level-card"><div class="level-card-top"><span class="level-code">${escapeHtml(level.code)}</span><span>${levelModules} modules</span></div><h3>${escapeHtml(level.title)}</h3><p>${escapeHtml(level.description)}</p><div class="level-card-meta"><span>${levelActivities} levelled activities</span><span>${levelTopics ? `${levelTopics} grammar units` : "Curriculum route"}</span></div><button class="card-link" data-action="level" data-level="${level.id}">Explore level →</button></article>`;
  }

  function renderSkillCard(skill) {
    const items = skillActivities.filter((item) => item.skill === skill.id);
    const trackedItems = skill.id === "grammar" ? [...exercises, ...items] : items;
    const total = trackedItems.length;
    const stats = statsFor(trackedItems);
    return `<article class="skill-card"><div class="skill-card-top"><span class="skill-icon skill-${escapeHtml(skill.color)}">${escapeHtml(skill.icon)}</span><span>${total} activities</span></div><h3>${escapeHtml(skill.title)}</h3><p>${escapeHtml(skill.description)}</p><div class="mini-progress"><span style="width:${total ? stats.mastered / total * 100 : 0}%"></span></div><div class="skill-card-footer"><span>${stats.mastered} mastered</span><button class="card-link" data-action="skill" data-skill="${skill.id}">Open lab →</button></div></article>`;
  }

  function renderUniversityOverview() {
    return `<section class="university-section"><div class="section-heading"><div><span class="eyebrow">Personal English University</span><h2>A route from B1+ to C1</h2></div><p>A long-form curriculum combining grammar, vocabulary, receptive skills, production, pronunciation, Use of English and critical thinking.</p></div><div class="level-roadmap">${university.levels.map(renderLevelCard).join("")}</div><div class="section-heading skill-heading"><div><span class="eyebrow">Skill library</span><h2>Build the whole language system</h2></div><p>Open a skill lab for guided practice, independent challenges and level-specific projects.</p></div><div class="skill-grid">${university.skills.map(renderSkillCard).join("")}</div><div class="project-strip integrated-strip"><div><span class="eyebrow">Integrated units</span><h3>Reading → vocabulary → listening → discussion → writing</h3><p>${university.integratedUnits?.length || 0} source-based units connect comprehension, language, pronunciation, critical thinking and production.</p></div><button class="primary" data-action="integrated-units">Open integrated route →</button></div><div class="project-strip"><div><span class="eyebrow">Integrated projects</span><h3>Learn by making something real</h3><p>Projects connect reading, vocabulary, listening, speaking, writing and reflection.</p></div><button class="secondary" data-action="projects">View project route →</button></div></section>`;
  }

  function renderCourseRail() {
    return `<aside class="course-rail" aria-label="University sidebar"><div><span class="eyebrow">Course map</span><h2>B1+ → C1</h2><p>Move by level, skill or source-based unit.</p></div><nav>${university.levels.map((level) => `<button data-action="level" data-level="${level.id}"><strong>${escapeHtml(level.code)}</strong><span>${escapeHtml(level.title)}</span></button>`).join("")}<button data-action="integrated-units"><strong>IN</strong><span>Integrated units</span></button><button data-action="word-bank"><strong>VO</strong><span>Personal word bank</span></button><button data-action="mistakes"><strong>ER</strong><span>Targeted review</span></button></nav></aside>`;
  }

  function renderHome() {
    const overall = statsFor(exercises);
    const partial1Topics = topics.filter((topic) => topic.partial === 1);
    const partial2Topics = topics.filter((topic) => topic.partial === 2);
    const partial1Exam = exercises.filter((item) => item.exam === 1).length;
    const partial2Exam = exercises.filter((item) => item.exam === 2).length;
    app.innerHTML = `<div class="home-page">
      <section class="hero"><div class="hero-copy"><span class="eyebrow">English-only · Personal English University</span>
        <h1>Build English you can<br><em>use with confidence</em></h1>
        <p>Follow a progressive B1+ → C1 route with grammar, vocabulary, reading, listening, writing, speaking, pronunciation, projects and the original two-part grammar course.</p>
        <div class="hero-actions"><button class="primary" data-action="university">Open the University route →</button><button class="secondary" data-action="topic" data-topic="present-tenses">Start core grammar</button></div></div>
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
    const completed = allPracticeItems.filter((item) => progress[item.id]?.lastCorrect === true || progress[item.id]?.completedAt).length;
    const due = reviewDue().length;
    app.innerHTML = `<section class="content-page university-page"><div class="university-layout">${renderCourseRail()}<div class="university-main"><div class="page-heading"><span class="eyebrow">Personal English University</span><h1>Build English for real life, study and work.</h1><p>Follow a progressive B1+ → B2 → B2+ → C1 route. Existing grammar remains available below, while the new skill labs turn knowledge into understanding and communication.</p></div>${renderCourseSearch()}<div class="university-summary"><div><strong>${completed}</strong><span>activities mastered</span></div><div><strong>${university.levels.length}</strong><span>levels</span></div><div><strong>${meta.streak || 0}</strong><span>day streak</span></div><div><strong>${escapeHtml(meta.levelEstimate || "Not measured")}</strong><span>starting estimate</span></div><button class="primary" data-action="diagnostic">Take the level diagnostic →</button></div><div class="review-strip"><div><span class="eyebrow">Study queue</span><h3>${due ? `${due} activities ready for review` : "Your review queue is clear"}</h3><p>Correct answers return after a longer interval; difficult answers come back sooner.</p></div><button class="secondary" data-action="review-due" ${due ? "" : "disabled"}>Open review queue →</button></div>${renderProgressDashboard()}${renderUniversityOverview()}<section class="curriculum-principles"><span class="eyebrow">Study method</span><h2>Learn → practise → produce → reflect</h2><div class="principle-grid"><div><strong>Input</strong><p>Read and listen to language in meaningful contexts.</p></div><div><strong>Control</strong><p>Use guided grammar and Use of English practice.</p></div><div><strong>Production</strong><p>Write, speak, pronounce and solve open-ended challenges.</p></div><div><strong>Reflection</strong><p>Review mistakes, record progress and return to difficult skills.</p></div></div></section></div></div></section>`;
  }

  function renderLevel(levelId) {
    const level = university.levels.find((item) => item.id === levelId);
    if (!level) return renderUniversity();
    const levelExam = university.levelExams?.find((exam) => exam.level === level.id);
    const progressTests = (levelExam?.progressTests || []).map((test) => `<article><span class="eyebrow">${escapeHtml(test.stage)}</span><h3>${escapeHtml(test.title)}</h3><p>${test.questions.length} mixed questions across the level.</p><button class="secondary" data-action="progress-test" data-level="${level.id}" data-test="${test.id}">Start progress test →</button></article>`).join("");
    const skillTests = (levelExam?.skillTests || []).map((test) => `<button class="secondary" data-action="skill-test" data-level="${level.id}" data-test="${test.id}">${escapeHtml(skillById(test.skill)?.title || test.skill)} · ${test.questions.length}</button>`).join("");
    app.innerHTML = `<section class="content-page level-page">${renderBreadcrumbs([{ label: "University", action: "university" }, { label: level.code }])}<div class="page-heading"><span class="eyebrow">Level ${escapeHtml(level.code)}</span><h1>${escapeHtml(level.title)}</h1><p>${escapeHtml(level.description)} ${escapeHtml(level.outcome)}</p></div><div class="module-list">${level.modules.map((module, index) => `<article class="module-card"><span class="module-number">${String(index + 1).padStart(2, "0")}</span><div><span class="eyebrow">${escapeHtml(module.skills.join(" · "))}</span><h2>${escapeHtml(module.title)}</h2><p>${escapeHtml(module.focus)}</p><div class="module-meta"><span>${module.lessons?.length || 0} lessons</span><span>${escapeHtml(module.assessment?.quiz || "Module checkpoint")}</span></div><div class="module-actions"><button class="primary" data-action="module" data-module="${module.id}">Open module →</button>${module.skills.map((skillId) => skillById(skillId) ? `<button class="secondary" data-action="skill" data-skill="${skillId}">${escapeHtml(skillById(skillId).title)} lab →</button>` : "").join("")}</div></div></article>`).join("")}</div><section class="level-test-ladder"><div class="section-heading"><div><span class="eyebrow">Assessment ladder</span><h2>Check progress before the final</h2></div><p>Use module checkpoints for local control, skill tests for a focused measurement and three cumulative progress tests for readiness.</p></div><div class="progress-test-grid">${progressTests}</div><div class="skill-test-strip"><strong>Skill tests</strong>${skillTests}</div></section><section class="exam-route"><div><span class="eyebrow">Milestone</span><h2>${escapeHtml(level.exam)}</h2><p>${levelExam?.questions.length || 0} guided questions plus a production route. Complete the modules, save evidence in your portfolio and return here when your skill scores are ready.</p></div><div class="exam-actions"><button class="primary" data-action="integrated-exam" data-level="${level.id}">Open integrated exam →</button><button class="secondary" data-action="level-exam" data-level="${level.id}">Quiz checkpoint</button><button class="secondary" data-action="diagnostic">Open diagnostic →</button></div></section></section>`;
  }

  function renderIntegratedExam(levelId) {
    const level = university.levels.find((item) => item.id === levelId);
    if (!level) return renderUniversity();
    const levelItems = skillActivities.filter((item) => item.level === levelId);
    const first = (skill, mode = "quiz") => levelItems.find((item) => item.skill === skill && item.mode === mode);
    const project = university.projects.find((item) => item.level === levelId);
    const sections = [
      { label: "Grammar + Use of English", description: "Complete the guided checkpoint of tense, form, transformation, collocation and register decisions.", action: "level-exam", attrs: `data-level="${levelId}"`, text: "Start checkpoint →", count: `${university.levelExams.find((exam) => exam.level === levelId)?.questions.length || 0} questions` },
      { label: "Reading", description: "Read for gist, detail, inference, tone and the relationship between evidence and claim.", action: "skill-level", attrs: `data-skill="reading" data-level="${levelId}"`, text: "Start reading section →", count: `${levelItems.filter((item) => item.skill === "reading").length} questions` },
      { label: "Listening", description: "Listen for detail, attitude, implication and the speaker’s level of certainty.", action: "skill-level", attrs: `data-skill="listening" data-level="${levelId}"`, text: "Start listening section →", count: `${levelItems.filter((item) => item.skill === "listening").length} questions` },
      { label: "Writing", description: "Produce a complete genre response, self-review it and reveal guidance only after drafting.", action: "challenge", attrs: `data-activity="${first("writing", "challenge")?.id || ""}"`, text: "Open writing task →", count: "production" },
      { label: "Speaking", description: "Complete a timed interaction or simulation and respond to an unscripted follow-up.", action: "challenge", attrs: `data-activity="${first("speaking", "challenge")?.id || ""}"`, text: "Open speaking task →", count: "production" }
    ];
    app.innerHTML = `<section class="content-page integrated-exam-page"><button class="back-link" data-action="level" data-level="${level.id}">← Back to ${escapeHtml(level.code)} level</button><div class="page-heading"><span class="eyebrow">${escapeHtml(level.code)} integrated assessment</span><h1>${escapeHtml(level.exam)}</h1><p>Complete the sections in any order, then use your evidence and results to decide what to revisit. A language score is strongest when it includes both recognition and production.</p></div><div class="integrated-exam-grid">${sections.map((section) => `<article class="integrated-exam-card"><div class="activity-card-top"><span class="eyebrow">${escapeHtml(section.count)}</span><span>${escapeHtml(level.code)}</span></div><h2>${escapeHtml(section.label)}</h2><p>${escapeHtml(section.description)}</p><button class="primary" data-action="${section.action}" ${section.attrs}>${escapeHtml(section.text)}</button></article>`).join("")}</div>${project ? `<section class="exam-route"><div><span class="eyebrow">Portfolio evidence</span><h2>${escapeHtml(project.title)}</h2><p>${escapeHtml(project.description)}</p></div><button class="primary" data-action="challenge" data-activity="${project.id}">Open project brief →</button></section>` : ""}</section>`;
  }

  function renderModule(moduleId) {
    const module = moduleById(moduleId);
    if (!module) return renderUniversity();
    const moduleExam = university.levelExams?.find((exam) => exam.level === module.level.id)?.moduleTests?.find((test) => test.moduleId === module.id);
    const routeItems = skillActivities.filter((item) => item.moduleId === module.id);
    const routeSkills = [...new Set(routeItems.map((item) => item.skill))];
    const routeSummary = routeSkills.map((skillId) => {
      const items = routeItems.filter((item) => item.skill === skillId);
      const quizzes = items.filter((item) => item.mode === "quiz").length;
      const challenges = items.filter((item) => item.mode === "challenge").length;
      return `<div class="module-practice-row"><div><strong>${escapeHtml(skillById(skillId)?.title || skillId)}</strong><span>${quizzes} guided questions · ${challenges} production tasks</span></div>${quizzes ? `<button class="secondary" data-action="module-practice" data-module="${module.id}" data-skill="${skillId}">Practise ${escapeHtml(skillById(skillId)?.title || "skill")} →</button>` : challenges ? `<button class="secondary" data-action="skill" data-skill="${skillId}">Open ${escapeHtml(skillById(skillId)?.title || "skill")} lab →</button>` : ""}</div>`;
    }).join("");
    const completedLessons = (module.lessons || []).filter((item) => progress[`lesson:${item.id}`]?.completedAt).length;
    const lessonCards = (module.lessons || []).map((item, index) => {
      const complete = Boolean(progress[`lesson:${item.id}`]?.completedAt);
      return `<article class="lesson-card ${complete ? "is-complete" : ""}"><span class="module-number">${String(index + 1).padStart(2, "0")}</span><div><span class="eyebrow">${escapeHtml(item.stage)}</span><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.body)}</p><div class="lesson-card-actions"><button class="primary" data-action="module-lesson" data-lesson="${item.id}">Open lesson →</button><span>${complete ? "Completed ✓" : `${item.activityIds?.length || 0} linked activities`}</span></div></div></article>`;
    }).join("");
    app.innerHTML = `<section class="content-page module-page">${renderBreadcrumbs([{ label: "University", action: "university" }, { label: module.level.code, action: "level", id: module.level.id, key: "level" }, { label: module.title }])}<div class="page-heading"><span class="eyebrow">${escapeHtml(module.level.code)} module · ${completedLessons}/${module.lessons?.length || 0} lessons</span><h1>${escapeHtml(module.title)}</h1><p>${escapeHtml(module.focus)}</p>${module.essentialQuestion ? `<div class="essential-question"><span>Essential question</span><strong>${escapeHtml(module.essentialQuestion)}</strong></div>` : ""}${module.keyTerms?.length ? `<div class="term-strip">${module.keyTerms.map((term) => `<span>${escapeHtml(term)}</span>`).join("")}</div>` : ""}</div><div class="lesson-route">${lessonCards}</div><div class="module-assessment"><span class="eyebrow">Module assessment route</span><h2>From recognition to production</h2><div class="assessment-route"><div><strong>Quiz</strong><span>${escapeHtml(module.assessment.quiz)}</span></div><div><strong>Reading</strong><span>${escapeHtml(module.assessment.reading)}</span></div><div><strong>Listening</strong><span>${escapeHtml(module.assessment.listening)}</span></div><div><strong>Writing / speaking</strong><span>${escapeHtml(module.assessment.writing)}</span></div></div>${moduleExam?.questions?.length ? `<div class="module-test-route"><span class="eyebrow">Checkpoint</span><p>${moduleExam.questions.length} mixed questions from this module’s connected activities.</p><button class="primary" data-action="module-test" data-module="${module.id}">Take module checkpoint →</button></div>` : ""}<div class="module-practice-list">${routeSummary}</div>${routeItems.length ? `<p class="module-route-note">This module has ${routeItems.length} connected University activities. Complete guided questions first, then open the production tasks from the relevant skill lab.</p>` : ""}</div></section>`;
  }

  function renderLesson(lessonId) {
    const item = lessonById(lessonId);
    const module = item ? moduleById(item.moduleId) : null;
    if (!item || !module) return renderUniversity();
    const moduleLessons = module.lessons || [];
    const index = moduleLessons.findIndex((candidate) => candidate.id === item.id);
    const previous = moduleLessons[index - 1];
    const next = moduleLessons[index + 1];
    const complete = Boolean(progress[`lesson:${item.id}`]?.completedAt);
    const linked = (item.activityIds || []).map(activityById).filter(Boolean);
    app.innerHTML = `<section class="content-page lesson-studio">${renderBreadcrumbs([{ label: "University", action: "university" }, { label: module.level.code, action: "level", id: module.level.id, key: "level" }, { label: module.title, action: "module", id: module.id, key: "module" }, { label: item.title }])}<header class="lesson-studio-hero"><div><span class="eyebrow">${escapeHtml(module.level.code)} · ${escapeHtml(item.stage)} · Lesson ${index + 1} of ${moduleLessons.length}</span><h1>${escapeHtml(item.title)}</h1><p>${escapeHtml(item.explanation)}</p></div><div class="lesson-status ${complete ? "is-complete" : ""}"><span>${complete ? "Completed" : "In progress"}</span><strong>${String(index + 1).padStart(2, "0")}</strong></div></header><section class="lesson-objectives"><div><span class="eyebrow">Learning outcomes</span><h2>What you should be able to do</h2></div><ul>${(item.objectives || []).map((objective) => `<li>${escapeHtml(objective)}</li>`).join("")}</ul></section><figure class="learning-flow"><figcaption>Lesson decision path</figcaption>${(item.visual || []).map((step, stepIndex) => `<div><span>${stepIndex + 1}</span><strong>${escapeHtml(step)}</strong></div>`).join("")}</figure><div class="lesson-studio-grid"><article><span class="eyebrow">Model in context</span><h2>Notice the language decision</h2><blockquote>${escapeHtml(item.model)}</blockquote><p>Read the model for meaning first. Then identify what the form, vocabulary or discourse choice helps the reader or listener understand.</p></article><article><span class="eyebrow">Guided practice</span><h2>Work with support</h2><p>${escapeHtml(item.guided)}</p><ol><li>Name the purpose before choosing language.</li><li>Point to evidence in the context.</li><li>Compare one alternative and explain the difference.</li></ol></article><article><span class="eyebrow">Independent production</span><h2>Create evidence</h2><p>${escapeHtml(item.output)}</p><ul><li>Complete a first attempt without a model.</li><li>Review meaning, organisation, accuracy, range and register.</li><li>Repeat one section after identifying a specific improvement.</li></ul></article></div>${linked.length ? `<section class="linked-practice"><div><span class="eyebrow">Linked practice</span><h2>Apply this lesson now</h2><p>${linked.length} questions from this module are connected to the lesson.</p></div><button class="primary" data-action="lesson-practice" data-lesson="${item.id}">Start guided practice →</button></section>` : ""}<section class="lesson-completion"><div><span class="eyebrow">Reflection</span><h2>${complete ? "Lesson evidence saved" : "Finish the learning cycle"}</h2><p>Mark the lesson complete only after you have produced and reviewed an answer.</p></div><button class="${complete ? "secondary" : "primary"}" data-action="lesson-complete" data-lesson="${item.id}">${complete ? "Completed ✓" : "Mark lesson complete"}</button></section><nav class="lesson-pager" aria-label="Lesson navigation"><button class="secondary" data-action="${previous ? "module-lesson" : "module"}" ${previous ? `data-lesson="${previous.id}"` : `data-module="${module.id}"`}>← ${previous ? escapeHtml(previous.title) : "Module overview"}</button><button class="primary" data-action="${next ? "module-lesson" : "module"}" ${next ? `data-lesson="${next.id}"` : `data-module="${module.id}"`}>${next ? escapeHtml(next.title) : "Module checkpoint"} →</button></nav></section>`;
  }

  function renderActivityCard(item) {
    const isChallenge = item.mode === "challenge";
    const level = university.levels.find((candidate) => candidate.id === item.level);
    const saved = progress[item.id];
    const state = isChallenge
      ? (saved?.completedAt ? "Production completed ✓" : progress[`draft:${item.id}`]?.text ? "Draft saved" : "Production challenge")
      : (saved?.lastCorrect === true ? "Mastered ✓" : saved?.lastCorrect === false ? "Review recommended" : "Interactive question");
    return `<article class="activity-card ${saved?.completedAt || saved?.lastCorrect === true ? "is-complete" : ""}"><div class="activity-card-top"><span class="eyebrow">${escapeHtml(level?.code || item.level || "All levels")}</span><span>${escapeHtml(item.taskType || (isChallenge ? "Production challenge" : "Guided practice"))}</span><button class="favorite-button ${isFavorite(item.id) ? "is-favorite" : ""}" data-action="favorite" data-item="${item.id}" aria-label="${isFavorite(item.id) ? "Remove from favorites" : "Add to favorites"}">${isFavorite(item.id) ? "★" : "☆"}</button></div><h2>${escapeHtml(item.title || item.prompt)}</h2><p>${escapeHtml(item.prompt)}</p><div class="activity-card-footer">${isChallenge ? `<button class="secondary" data-action="challenge" data-activity="${item.id}">Open challenge →</button>` : `<span>${escapeHtml(state)}</span>`}</div></article>`;
  }

  function activityPriority(item) {
    const saved = progress[item.id];
    if (saved?.lastCorrect === false) return 0;
    if (!saved && !progress[`draft:${item.id}`]) return 1;
    if (item.mode === "challenge" && !saved?.completedAt) return 2;
    return 3;
  }

  function renderActivityBrowser(items) {
    const filtered = items
      .filter((item) => skillLevelFilter === "all" || item.level === skillLevelFilter)
      .filter((item) => skillModeFilter === "all" || item.mode === skillModeFilter)
      .sort((a, b) => activityPriority(a) - activityPriority(b)
        || university.levels.findIndex((level) => level.id === a.level) - university.levels.findIndex((level) => level.id === b.level)
        || String(a.id).localeCompare(String(b.id)));
    const visible = filtered.slice(0, skillDisplayLimit);
    const levelFilters = [{ id: "all", code: "All levels" }, ...university.levels.filter((level) => items.some((item) => item.level === level.id))]
      .map((level) => `<button class="filter-chip ${skillLevelFilter === level.id ? "is-active" : ""}" data-action="activity-filter-level" data-level="${level.id}">${escapeHtml(level.code)}</button>`).join("");
    const modes = [{ id: "all", label: "All activities" }, { id: "quiz", label: "Guided" }, { id: "challenge", label: "Production" }]
      .filter((mode) => mode.id === "all" || items.some((item) => item.mode === mode.id))
      .map((mode) => `<button class="filter-chip ${skillModeFilter === mode.id ? "is-active" : ""}" data-action="activity-filter-mode" data-mode="${mode.id}">${escapeHtml(mode.label)}</button>`).join("");
    const empty = `<div class="empty-state compact-empty"><span>↻</span><h2>No activities match these filters.</h2><p>Choose another level or activity type.</p></div>`;
    return `<section class="activity-browser" aria-label="Activity library"><div class="activity-browser-toolbar"><div class="filter-group"><strong>Level</strong><div>${levelFilters}</div></div><div class="filter-group"><strong>Practice type</strong><div>${modes}</div></div></div><div class="activity-browser-summary"><span>Showing <strong>${visible.length}</strong> of <strong>${filtered.length}</strong> matching activities</span><span>Errors and unfinished work appear first.</span></div>${visible.length ? `<div class="skill-activity-grid">${visible.map(renderActivityCard).join("")}</div>` : empty}${visible.length < filtered.length ? `<div class="show-more-row"><button class="secondary" data-action="show-more-activities">Show ${Math.min(24, filtered.length - visible.length)} more</button></div>` : ""}</section>`;
  }

  function renderSkillPage(skillId) {
    const skill = skillById(skillId);
    if (!skill) return renderUniversity();
    if (skillId === "grammar") {
      const universityGrammar = skillActivities.filter((item) => item.skill === "grammar");
      const universityGrammarQuizzes = universityGrammar.filter((item) => item.mode === "quiz");
      app.innerHTML = `<section class="content-page skill-page"><button class="back-link" data-action="university">← University map</button><div class="skill-page-hero"><div><span class="skill-icon skill-${escapeHtml(skill.color)}">${escapeHtml(skill.icon)}</span><span class="eyebrow">Core + University grammar</span><h1>Grammar</h1><p>${escapeHtml(skill.description)} The original 16-topic course remains the central grammar route, with detailed lessons, diagrams, quick tests and two partial exams. The University route adds ${universityGrammarQuizzes.length} levelled form, meaning, register and contrast questions.</p></div><div class="skill-page-actions"><button class="primary" data-action="all-practice">Practise all ${exercises.length} core questions →</button><button class="secondary" data-action="skill-practice" data-skill="grammar">Start a smart ${Math.min(24, universityGrammarQuizzes.length)}-question session →</button></div></div><section class="grammar-core-route"><div class="section-heading"><div><span class="eyebrow">Core route</span><h2>Choose a grammar topic</h2></div><p>Open any unit for its explanation, examples, practice bank, mini-test and voice prompt.</p></div><div class="topic-grid">${topics.map((topic, index) => renderTopicCard(topic, index)).join("")}</div></section><section class="university-activity-route"><div class="section-heading"><div><span class="eyebrow">Levelled extension</span><h2>Grammar in the University syllabus</h2></div><p>Filter the library by level or activity type. Difficult and unfinished work is shown first.</p></div>${renderActivityBrowser(universityGrammar)}</section>${renderCatalogExtras("grammar")}</section>`;
      return;
    }
    const items = skillActivities.filter((item) => item.skill === skillId);
    const quizItems = items.filter((item) => item.mode === "quiz");
    const challengeItems = items.filter((item) => item.mode === "challenge");
    const levelButtons = university.levels.filter((level) => items.some((item) => item.level === level.id && item.mode === "quiz")).map((level) => `<button class="secondary" data-action="skill-level" data-skill="${skill.id}" data-level="${level.id}">${escapeHtml(level.code)} section</button>`).join("");
    app.innerHTML = `<section class="content-page skill-page"><button class="back-link" data-action="university">← University map</button><div class="skill-page-hero"><div><span class="skill-icon skill-${escapeHtml(skill.color)}">${escapeHtml(skill.icon)}</span><span class="eyebrow">Skill lab</span><h1>${escapeHtml(skill.title)}</h1><p>${escapeHtml(skill.description)}</p></div>${quizItems.length ? `<div class="skill-page-actions"><button class="primary" data-action="skill-practice" data-skill="${skill.id}">Start a smart ${Math.min(24, quizItems.length)}-question session →</button>${levelButtons}</div>` : ""}</div>${renderActivityBrowser(items)}${renderCatalogExtras(skillId)}${challengeItems.length ? `<div class="callout"><strong>Production matters.</strong><p>Complete open challenges after guided practice. Save a real draft, outline or recording, review it against the checklist and then mark the challenge complete.</p></div>` : ""}</section>`;
  }

  function renderIntegratedUnits() {
    const units = university.integratedUnits || [];
    app.innerHTML = `<section class="content-page integrated-library">${renderBreadcrumbs([{ label: "University", action: "university" }, { label: "Integrated units" }])}<div class="page-heading"><span class="eyebrow">Source-based learning</span><h1>Connect every skill around one real question.</h1><p>Each unit contains a substantial original reading, contextual vocabulary, playable listening, pronunciation transfer, critical discussion, speaking and a complete writing task with delayed model feedback.</p></div><div class="integrated-unit-grid">${units.map((unit) => { const level = university.levels.find((item) => item.id === unit.level); const unitItems = skillActivities.filter((item) => item.integratedUnitId === unit.id); const completed = unitItems.filter((item) => progress[item.id]?.lastCorrect || progress[item.id]?.completedAt).length; return `<article class="integrated-unit-card"><div class="activity-card-top"><span class="eyebrow">${escapeHtml(level?.code || unit.level)}</span><span>${completed}/${unitItems.length} complete</span></div><h2>${escapeHtml(unit.title)}</h2><p>${escapeHtml(unit.theme)}</p><div class="unit-source-meta"><span>${unit.reading.text.split(/\s+/).length} reading words</span><span>${unit.listening.transcript.split(/\s+/).length} listening words</span><span>${unit.reading.vocabulary.length} lexical targets</span></div><button class="primary" data-action="integrated-unit" data-unit="${unit.id}">Open integrated unit →</button></article>`; }).join("")}</div></section>`;
  }

  function renderIntegratedUnit(unitId) {
    const unit = integratedUnitById(unitId);
    if (!unit) return renderIntegratedUnits();
    const level = university.levels.find((item) => item.id === unit.level);
    const unitItems = skillActivities.filter((item) => item.integratedUnitId === unit.id);
    const challengeId = (skill) => unitItems.find((item) => item.skill === skill && item.mode === "challenge")?.id || "";
    app.innerHTML = `<section class="content-page integrated-unit-page">${renderBreadcrumbs([{ label: "University", action: "university" }, { label: "Integrated units", action: "integrated-units" }, { label: unit.title }])}<header class="integrated-unit-hero"><div><span class="eyebrow">${escapeHtml(level?.code || unit.level)} · Integrated unit</span><h1>${escapeHtml(unit.title)}</h1><p>${escapeHtml(unit.theme)}</p></div><div class="integrated-sequence" aria-label="Integrated learning sequence"><span>Read</span><i>→</i><span>Notice</span><i>→</i><span>Listen</span><i>→</i><span>Discuss</span><i>→</i><span>Write</span></div></header><section class="source-panel reading-source"><div class="source-panel-heading"><div><span class="eyebrow">${escapeHtml(unit.reading.genre)} · ${unit.reading.text.split(/\s+/).length} words</span><h2>${escapeHtml(unit.reading.title)}</h2></div><button class="primary" data-action="integrated-reading" data-unit="${unit.id}">Start reading questions →</button></div><div class="long-source-text">${unit.reading.text.split("\n\n").map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div></section><section class="integrated-vocabulary"><div class="section-heading"><div><span class="eyebrow">Vocabulary in use</span><h2>Meaning, collocation and stress</h2></div><p>Retrieve each item from the source context before saving it to your personal word bank.</p></div><div class="integrated-vocab-grid">${unit.reading.vocabulary.map((entry) => `<article><span class="word-stress">${escapeHtml(entry.stress)}</span><h3>${escapeHtml(entry.term)}</h3><p>${escapeHtml(entry.meaning)}</p><code>${escapeHtml(entry.collocation)}</code><button class="text-button" data-action="save-word" data-unit="${unit.id}" data-word="${escapeHtml(entry.term)}">Save to word bank</button></article>`).join("")}</div></section><section class="source-panel listening-source"><div class="source-panel-heading"><div><span class="eyebrow">${escapeHtml(unit.listening.genre)} · ${unit.listening.lang} voice · ${unit.listening.transcript.split(/\s+/).length} words</span><h2>${escapeHtml(unit.listening.title)}</h2></div><div class="source-actions"><button class="secondary" data-action="speak" data-lang="${unit.listening.lang}" data-rate="${unit.listening.rate}" data-speech="${escapeHtml(unit.listening.transcript)}">▶ Play listening</button><button class="primary" data-action="integrated-listening" data-unit="${unit.id}">Start listening questions →</button></div></div><details><summary>Show transcript after the first listen</summary><div class="long-source-text">${unit.listening.transcript.split("\n").map((line) => `<p>${escapeHtml(line)}</p>`).join("")}</div></details></section><section class="integrated-production-grid"><article><span class="eyebrow">Critical discussion</span><h2>Evaluate the question</h2><p>${escapeHtml(unit.critical)}</p><button class="secondary" data-action="challenge" data-activity="${challengeId("critical-thinking")}">Open critical task →</button></article><article><span class="eyebrow">Speaking</span><h2>Respond and interact</h2><p>${escapeHtml(unit.speaking)}</p><button class="secondary" data-action="challenge" data-activity="${challengeId("speaking")}">Open speaking task →</button></article><article><span class="eyebrow">Pronunciation</span><h2>Transfer sound to meaning</h2><p>${escapeHtml(unit.pronunciation)}</p><button class="secondary" data-action="challenge" data-activity="${challengeId("pronunciation")}">Open pronunciation task →</button></article><article><span class="eyebrow">Writing · ${escapeHtml(unit.writing.wordLimit)}</span><h2>${escapeHtml(unit.writing.genre)}</h2><p>${escapeHtml(unit.writing.prompt)}</p><button class="primary" data-action="challenge" data-activity="${challengeId("writing")}">Open writing studio →</button></article></section></section>`;
  }

  function renderWordBank() {
    const words = meta.vocabulary || [];
    const due = vocabularyDue();
    const stages = ["New", "Learning", "Developing", "Secure", "Long-term", "Maintained"];
    app.innerHTML = `<section class="content-page word-bank-page">${renderBreadcrumbs([{ label: "University", action: "university" }, { label: "Word bank" }])}<div class="page-heading"><span class="eyebrow">Personal vocabulary · spaced retrieval</span><h1>Turn noticed words into language you can retrieve.</h1><p>Saved lexical items include an English meaning, collocation and stress pattern. Correct retrieval increases the interval; an error shortens it and returns the item sooner.</p></div><section class="word-bank-summary"><div><strong>${words.length}</strong><span>saved items</span></div><div><strong>${due.length}</strong><span>due now</span></div><div><strong>${words.filter((word) => (word.stage || 0) >= 3).length}</strong><span>secure items</span></div><button class="primary" data-action="review-words" ${words.length ? "" : "disabled"}>${due.length ? `Review ${due.length} due words` : "Practise saved words"} →</button></section>${words.length ? `<div class="word-bank-grid">${words.map((word) => { const unit = integratedUnitById(word.unitId); const isDue = !word.nextReview || word.nextReview <= new Date().toISOString(); return `<article><div class="activity-card-top"><span class="eyebrow">${escapeHtml(stages[Math.min(word.stage || 0, stages.length - 1)])}</span><span>${isDue ? "Due now" : `Review ${new Date(word.nextReview).toLocaleDateString("en-GB")}`}</span></div><span class="word-stress">${escapeHtml(word.stress)}</span><h2>${escapeHtml(word.term)}</h2><p>${escapeHtml(word.meaning)}</p><code>${escapeHtml(word.collocation)}</code><small>${escapeHtml(unit?.title || word.sourceTitle || word.level)}</small><div class="word-card-actions"><button class="secondary" data-action="speak" data-speech="${escapeHtml(`${word.term}. ${word.collocation}.`)}">▶ Hear it</button><button class="text-button" data-action="remove-word" data-word-id="${escapeHtml(word.id)}">Remove</button></div></article>`; }).join("")}</div>` : `<div class="empty-state"><span>VO</span><h2>Your word bank is empty</h2><p>Open an integrated unit or vocabulary domain and save useful words after seeing them in context.</p><button class="primary" data-action="integrated-units">Open integrated units →</button></div>`}</section>`;
  }

  function renderProjects() {
    app.innerHTML = `<section class="content-page projects-page"><button class="back-link" data-action="university">← University map</button><div class="page-heading"><span class="eyebrow">Integrated projects</span><h1>Turn practice into evidence.</h1><p>Each project combines several skills and creates a piece of work you can revisit, improve and compare over time.</p></div><div class="project-grid">${university.projects.map((project) => `<article class="project-card"><span class="eyebrow">${escapeHtml((university.levels.find((level) => level.id === project.level) || {}).code || project.level)}</span><h2>${escapeHtml(project.title)}</h2><p>${escapeHtml(project.description)}</p><div>${project.skills.map((skillId) => `<span>${escapeHtml(skillById(skillId)?.title || skillId)}</span>`).join("")}</div><button class="secondary" data-action="challenge" data-activity="${project.id}">Open project brief →</button></article>`).join("")}</div></section>`;
  }

  function renderCatalogExtras(skillId) {
    if (skillId === "grammar") return `<section class="catalog-section"><div class="section-heading"><div><span class="eyebrow">Extended grammar roadmap</span><h2>B1+ → C1 grammar map</h2></div><p>Every roadmap item opens a complete studio with meaning, form, a visual decision path, comparison, guided practice, an independent challenge and a focused mini-test.</p></div><div class="catalog-grid">${catalogs.grammarCatalog.map((item) => `<article class="catalog-card"><div class="catalog-card-top"><span class="eyebrow">${escapeHtml(item.level)}</span><span>${escapeHtml(item.id)}</span></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.focus)}</p><code>${escapeHtml(item.form)}</code><em>${escapeHtml(item.example)}</em><button class="secondary" data-action="grammar-studio" data-grammar="${item.id}">Open Grammar Studio →</button></article>`).join("")}</div></section>`;
    if (skillId === "vocabulary") return `<section class="catalog-section vocabulary-systems"><div class="section-heading"><div><span class="eyebrow">Vocabulary by domain</span><h2>Learn lexical systems, not isolated translations</h2></div><p>Each domain combines meaning, collocation, synonyms, antonyms, word families, affixes, register, connotation, phrasal verbs, idioms and fixed expressions.</p></div><div class="catalog-grid">${catalogs.vocabularyCatalog.map((item) => `<article class="catalog-card vocabulary-system-card"><div class="catalog-card-top"><span class="eyebrow">${escapeHtml(item.level)}</span><span>${escapeHtml(item.id)}</span></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.focus)}</p><div class="catalog-entries">${item.entries.map(([word, collocation, synonym]) => `<div><strong>${escapeHtml(word)}</strong><span>${escapeHtml(collocation)}</span><small>near-synonym: ${escapeHtml(synonym)}</small><button class="text-button" data-action="save-catalog-word" data-domain="${item.id}" data-word="${escapeHtml(word)}">Save word</button></div>`).join("")}</div>${item.system ? `<details class="lexical-system"><summary>Open the language system</summary><dl><div><dt>Word families</dt><dd>${escapeHtml(item.system.family)}</dd></div><div><dt>Affixes</dt><dd>${escapeHtml(item.system.affix)}</dd></div><div><dt>Antonym contrast</dt><dd>${escapeHtml(item.system.antonym)}</dd></div><div><dt>Register</dt><dd>${escapeHtml(item.system.register)}</dd></div><div><dt>Connotation</dt><dd>${escapeHtml(item.system.connotation)}</dd></div><div><dt>Phrasal verbs</dt><dd>${escapeHtml(item.system.phrasal)}</dd></div><div><dt>Idiom</dt><dd>${escapeHtml(item.system.idiom)}</dd></div><div><dt>Fixed expressions</dt><dd>${escapeHtml(item.system.fixed)}</dd></div></dl></details>` : ""}</article>`).join("")}</div></section>`;
    if (skillId === "reading") return `<section class="catalog-section"><div class="section-heading"><div><span class="eyebrow">Reading library</span><h2>Texts with a purpose</h2></div><p>Read once for meaning, again for evidence and a third time for language, tone and inference.</p></div><div class="catalog-grid">${catalogs.readingLibrary.map((item) => `<article class="catalog-card reading-catalog-card"><div class="catalog-card-top"><span class="eyebrow">${escapeHtml(item.level)} · ${escapeHtml(item.genre)}</span><span>${escapeHtml(item.id)}</span></div><h3>${escapeHtml(item.title)}</h3><details><summary>Open text</summary><p>${escapeHtml(item.text)}</p></details><em>${escapeHtml(item.focus)}</em></article>`).join("")}</div></section>`;
    if (skillId === "writing") return `<section class="catalog-section"><div class="section-heading"><div><span class="eyebrow">Writing genre route</span><h2>From message to synthesis</h2></div><p>Use each brief to plan, draft, self-review and only then compare with model guidance.</p></div><div class="catalog-grid">${catalogs.writingCatalog.map((item) => `<article class="catalog-card"><div class="catalog-card-top"><span class="eyebrow">${escapeHtml(item.level)} · ${escapeHtml(item.genre)}</span><span>${escapeHtml(item.wordLimit)}</span></div><h3>${escapeHtml(item.title)}</h3><div class="catalog-list"><strong>Structure</strong><span>${item.structure.map(escapeHtml).join(" · ")}</span><strong>Language</strong><span>${item.language.map(escapeHtml).join(" · ")}</span></div></article>`).join("")}</div></section>`;
    if (skillId === "speaking") return `<section class="catalog-section"><div class="section-heading"><div><span class="eyebrow">Speaking simulations</span><h2>Real-world interaction</h2></div><p>Use the role, goal and follow-up questions to practise interaction rather than a memorised monologue.</p></div><div class="catalog-grid">${catalogs.speakingSimulations.map((item) => `<article class="catalog-card"><div class="catalog-card-top"><span class="eyebrow">${escapeHtml(item.level)}</span><span>${escapeHtml(item.id)}</span></div><h3>${escapeHtml(item.title)}</h3><p><strong>Roles:</strong> ${item.roles.map(escapeHtml).join(" · ")}</p><em>${escapeHtml(item.goal)}</em><button class="secondary" data-action="speak" data-speech="${escapeHtml(`${item.title}. ${item.goal}`)}">▶ Hear a model prompt</button></article>`).join("")}</div></section>`;
    if (skillId === "listening") return `<section class="catalog-section"><div class="section-heading"><div><span class="eyebrow">Listening library</span><h2>From announcements to academic ideas</h2></div><p>Listen once for gist, again for detail and a third time for attitude or implication. Use the transcript after the first attempt.</p></div><div class="catalog-grid">${catalogs.listeningLibrary.map((item) => `<article class="catalog-card"><div class="catalog-card-top"><span class="eyebrow">${escapeHtml(item.level)} · ${escapeHtml(item.genre)}</span><span>${escapeHtml(item.lang || item.speechLang || "en-US")}</span></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.focus)}</p><button class="secondary" data-action="speak" data-lang="${escapeHtml(item.lang || item.speechLang || "en-US")}" data-rate="${item.rate || item.speechRate || 0.9}" data-speech="${escapeHtml(item.transcript)}">▶ Play text</button><details><summary>Show transcript</summary><p>${escapeHtml(item.transcript)}</p></details></article>`).join("")}</div></section>`;
    if (skillId === "pronunciation") return `<section class="catalog-section"><div class="section-heading"><div><span class="eyebrow">Pronunciation syllabus</span><h2>Sounds, stress, rhythm and stance</h2></div><p>Record a first attempt, listen critically and repeat with one specific focus at a time.</p></div><figure class="learning-flow pronunciation-map"><figcaption>Pronunciation transfer map</figcaption><div><span>1</span><strong>Sound contrast</strong><p>/ɪ/ ship · /iː/ sheep<br>/f/ fan · /v/ van</p></div><div><span>2</span><strong>Word stress</strong><p>PHOtograph → phoTOGraphy</p></div><div><span>3</span><strong>Thought groups</strong><p>package one meaning unit at a time</p></div><div><span>4</span><strong>Prominence</strong><p>stress the word that carries the contrast</p></div><div><span>5</span><strong>Intonation</strong><p>signal completion, doubt, correction or openness</p></div></figure><div class="catalog-grid">${catalogs.pronunciationCatalog.map((item) => `<article class="catalog-card"><div class="catalog-card-top"><span class="eyebrow">${escapeHtml(item.level)}</span><span>${escapeHtml(item.id)}</span></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.focus)}</p><em>${escapeHtml(item.task)}</em></article>`).join("")}</div></section>`;
    if (skillId === "technical-english") { const scenarios = university.technicalScenarios || []; return `<section class="catalog-section technical-route"><div class="section-heading"><div><span class="eyebrow">Technical communication route</span><h2>System → evidence → risk → decision</h2></div><p>Build accuracy without hiding the explanation behind jargon. Every level combines terminology, processes, safeguards, audience adaptation and spoken defence.</p></div><figure class="learning-flow technical-flow"><figcaption>Technical explanation model</figcaption><div><span>1</span><strong>Define</strong><p>Name the system, term and operating boundary.</p></div><div><span>2</span><strong>Sequence</strong><p>Show inputs, stages, checks and output.</p></div><div><span>3</span><strong>Evidence</strong><p>State the measurement, test or trace.</p></div><div><span>4</span><strong>Risk</strong><p>Connect failure mode, consequence and safeguard.</p></div><div><span>5</span><strong>Adapt</strong><p>Preserve precision for the real audience and decision.</p></div></figure><div class="technical-level-grid">${university.levels.map((level) => { const levelScenarios = scenarios.filter((item) => item.level === level.id); return `<article><span class="eyebrow">${escapeHtml(level.code)}</span><h3>${levelScenarios.length} technical systems</h3><p>${levelScenarios.map((item) => escapeHtml(item.domain)).join(" · ")}</p><button class="secondary" data-action="skill-level" data-skill="technical-english" data-level="${level.id}">Open ${escapeHtml(level.code)} practice →</button></article>`; }).join("")}</div></section>`; }
    return "";
  }

  function renderGrammarStudio(grammarId) {
    const item = grammarById(grammarId);
    if (!item?.studio) return renderSkillPage("grammar");
    const studio = item.studio;
    const level = university.levels.find((candidate) => candidate.id === item.level);
    const saved = progress[`note:grammar:${item.id}`]?.text || "";
    const practice = (studio.practiceIds || []).map(activityById).filter(Boolean);
    app.innerHTML = `<section class="content-page grammar-studio">${renderBreadcrumbs([{ label: "University", action: "university" }, { label: "Grammar", action: "skill", id: "grammar", key: "skill" }, { label: item.title }])}<header class="grammar-studio-hero"><div><span class="eyebrow">${escapeHtml(level?.code || item.level)} Grammar Studio</span><h1>${escapeHtml(item.title)}</h1><p>${escapeHtml(studio.overview)}</p></div><div class="grammar-form-card"><span>Core pattern</span><code>${escapeHtml(studio.form)}</code></div></header><figure class="grammar-choice-flow"><figcaption>Meaning-to-form decision</figcaption><div><span>1</span><strong>Context</strong><p>Identify the time, relationship, audience and purpose.</p></div><div><span>2</span><strong>Meaning</strong><p>${escapeHtml(item.focus)}</p></div><div><span>3</span><strong>Form</strong><p>${escapeHtml(item.form)}</p></div><div><span>4</span><strong>Check</strong><p>Compare the alternative, then verify agreement, order and register.</p></div></figure><div class="grammar-studio-grid"><article><span class="eyebrow">Detailed explanation</span><h2>Why speakers choose it</h2><p>${escapeHtml(studio.decision)}</p><h3>Questions to ask</h3><ol>${studio.questions.map((question) => `<li>${escapeHtml(question)}</li>`).join("")}</ol></article><article><span class="eyebrow">Examples and contrast</span><h2>Compare the viewpoint</h2><div class="grammar-model"><strong>${escapeHtml(item.title)}</strong><code>${escapeHtml(studio.model)}</code></div><div class="grammar-model comparison"><strong>Compare: ${escapeHtml(studio.comparisonTitle)}</strong><code>${escapeHtml(studio.comparison)}</code></div><p>The comparison is not automatically interchangeable. Explain which context and viewpoint would make each model natural.</p></article></div><section class="grammar-guided-route"><div><span class="eyebrow">Guided practice</span><h2>Retrieve form, meaning and contrast</h2><p>${practice.length} focused questions are connected to this studio. The mini-test gives feedback and adds difficult decisions to spaced review.</p></div><button class="primary" data-action="grammar-mini-test" data-grammar="${item.id}">Start ${practice.length}-question mini-test →</button></section><section class="grammar-independent"><div><span class="eyebrow">Independent B2/C1 challenge</span><h2>Make the grammar necessary</h2><p>${escapeHtml(studio.challenge)}</p><ul><li>Underline the context clue that makes the choice natural.</li><li>Explain the meaning difference from one nearby alternative.</li><li>Review form, word order, agreement and register.</li></ul></div><div><label class="eyebrow" for="grammar-note">Your examples and reflection</label><textarea id="grammar-note" placeholder="Write your three-sentence context and explain the choice.">${escapeHtml(saved)}</textarea><button class="primary" data-action="save-grammar-note" data-grammar="${item.id}">Save Grammar Studio work</button><span class="copy-status" aria-live="polite"></span></div></section></section>`;
  }

  function challengeItemById(activityId) {
    return activityById(activityId) || university.projects.find((project) => project.id === activityId);
  }

  function countWords(value = "") {
    return String(value).trim() ? String(value).trim().split(/\s+/).length : 0;
  }

  function minimumWritingWords(wordLimit) {
    const values = String(wordLimit || "").match(/\d+/g)?.map(Number) || [];
    return Math.max(40, Math.ceil((values[0] || 70) * 0.6));
  }

  function isWritingChallenge(item) {
    return item?.skill === "writing" || Boolean(item?.wordLimit);
  }

  function isOralChallenge(item) {
    return ["speaking", "fluency", "pronunciation"].includes(item?.skill) || Boolean(item?.voicePrompt);
  }

  function challengeEvidenceState(item, readPage = false) {
    const criteria = item.selfReviewCriteria || item.checklist || ["Grammar", "Vocabulary", "Coherence", "Cohesion", "Organisation", "Register", "Accuracy", "Range"];
    const draft = readPage ? (document.querySelector("#challenge-draft")?.value || "") : (progress[`draft:${item.id}`]?.text || "");
    const checked = readPage
      ? [...document.querySelectorAll("[data-review-index]:checked")].map((input) => Number(input.dataset.reviewIndex))
      : (progress[`review:${item.id}`]?.checked || []);
    const words = countWords(draft);
    const oral = isOralChallenge(item);
    const writing = isWritingChallenge(item);
    const recorded = Boolean(progress[`recording:${item.id}`]?.recordedAt);
    const minimumWords = writing ? minimumWritingWords(item.wordLimit) : oral ? 10 : 20;
    const requiredChecks = writing ? criteria.length : Math.max(1, Math.ceil(criteria.length / 2));
    const evidenceReady = words >= minimumWords || (oral && recorded);
    return { draft, checked, words, minimumWords, requiredChecks, criteriaCount: criteria.length, recorded, ready: Boolean(progress[item.id]?.completedAt) || (evidenceReady && checked.length >= requiredChecks) };
  }

  function persistChallengeWorkspace(item) {
    const state = challengeEvidenceState(item, true);
    const note = document.querySelector("#challenge-note")?.value.trim() || "";
    const now = new Date().toISOString();
    progress[`draft:${item.id}`] = { text: state.draft, wordCount: state.words, updatedAt: now };
    progress[`review:${item.id}`] = { checked: state.checked, updatedAt: now };
    progress[`note:${item.id}`] = { text: note, updatedAt: now };
    recordStudyDay();
    saveProgress();
    return state;
  }

  function updateChallengeWorkspaceState() {
    const item = challengeItemById(activeChallenge);
    if (!item || !document.querySelector("#challenge-draft")) return;
    const state = challengeEvidenceState(item, true);
    const counter = document.querySelector("#challenge-word-count");
    const evidence = document.querySelector("#challenge-evidence-status");
    const complete = document.querySelector('[data-action="complete-challenge"]');
    const model = document.querySelector('[data-action="toggle-model"]');
    if (counter) counter.textContent = `${state.words} words`;
    if (evidence) evidence.textContent = `${state.checked.length}/${state.criteriaCount} review checks · target: ${state.minimumWords}+ words${isOralChallenge(item) ? " or a local recording" : ""}`;
    if (complete && !progress[item.id]?.completedAt) complete.disabled = !state.ready;
    if (model && isWritingChallenge(item)) {
      model.disabled = !state.ready;
      model.textContent = state.ready ? "Show model answer after self-review" : "Complete your draft and self-review to unlock the model";
    }
  }

  function renderChallenge(activityId) {
    const item = challengeItemById(activityId);
    if (!item) return renderUniversity();
    const savedNote = progress[`note:${item.id}`]?.text || "";
    const savedDraft = progress[`draft:${item.id}`]?.text || "";
    const savedReview = progress[`review:${item.id}`]?.checked || [];
    const skill = item.skill ? skillById(item.skill) : null;
    const speechText = item.speechText || item.transcript || item.voicePrompt || item.prompt || item.description || "English Lab practice";
    const briefMeta = item.wordLimit ? `<div class="writing-brief-meta"><div><strong>Word limit</strong><span>${escapeHtml(item.wordLimit)}</span></div><div><strong>Structure</strong><span>${(item.recommendedStructure || []).map(escapeHtml).join(" → ")}</span></div><div><strong>Useful language</strong><span>${(item.usefulLanguage || []).map(escapeHtml).join(" · ")}</span></div></div>` : "";
    const projectMeta = item.milestones?.length ? `<section class="project-blueprint"><div><span class="eyebrow">Project milestones</span><ol>${item.milestones.map((milestone) => `<li>${escapeHtml(milestone)}</li>`).join("")}</ol></div><div><span class="eyebrow">Required deliverables</span><ul>${(item.deliverables || []).map((deliverable) => `<li>${escapeHtml(deliverable)}</li>`).join("")}</ul></div><div><span class="eyebrow">Integrated evidence</span><p>${(item.skills || []).map((skillId) => escapeHtml(skillById(skillId)?.title || skillId)).join(" · ")}</p></div></section>` : "";
    const modelGuidance = item.modelAnswer || item.sample || "Finish your own work before comparing it with a model or asking for feedback.";
    const modelParagraphs = String(modelGuidance).split(/\n\n+/).map((paragraph) => `<p>${escapeHtml(paragraph).replaceAll("\n", "<br>")}</p>`).join("");
    const modelCommentary = item.modelCommentary ? `<aside class="model-commentary"><strong>Why this model works</strong><p>${escapeHtml(item.modelCommentary)}</p></aside>` : "";
    const reviewCriteria = item.selfReviewCriteria || item.checklist || ["Grammar", "Vocabulary", "Coherence", "Cohesion", "Organisation", "Register", "Accuracy", "Range"];
    const challengeComplete = Boolean(progress[item.id]?.completedAt);
    const state = challengeEvidenceState(item);
    const writing = isWritingChallenge(item);
    const oral = isOralChallenge(item);
    const voiceCard = item.voicePrompt ? `<section class="voice-card challenge-voice-card"><div class="voice-icon" aria-hidden="true">◉</div><div><span class="eyebrow">Optional voice practice</span><h2>Practise this challenge aloud</h2><p>Copy this text into a voice conversation after completing your own attempt.</p><pre>${escapeHtml(item.voicePrompt)}</pre><button class="secondary" data-action="copy-prompt" data-prompt="${escapeHtml(item.voicePrompt)}">Copy voice prompt</button><span class="copy-status" aria-live="polite"></span></div></section>` : "";
    const timerSeconds = item.timerSeconds || (item.level === "c1" ? 180 : item.level === "b2-plus" ? 120 : item.level === "b2" ? 90 : 60);
    const oralTools = oral ? `<section class="oral-tools"><div><span class="eyebrow">Local speaking tools</span><h2>Time, record, listen, repeat</h2><p>The recording stays in this browser tab and is never uploaded by English Lab. Only a completion timestamp is saved.</p></div><div class="oral-tool-controls"><div class="timer-control"><strong id="speaking-timer">${String(Math.floor(timerSeconds / 60)).padStart(2, "0")}:${String(timerSeconds % 60).padStart(2, "0")}</strong><button class="secondary" data-action="start-timer" data-seconds="${timerSeconds}">Start timer</button></div><div class="recording-control"><button class="primary" data-action="start-recording">Record locally</button><button class="secondary" data-action="stop-recording" disabled>Stop</button><audio id="local-recording-playback" controls hidden></audio><span id="recording-status" aria-live="polite">${state.recorded ? "A local recording attempt was completed previously." : "Microphone access is requested only when you press Record."}</span></div></div></section>` : "";
    const draftLabel = writing ? "Your draft" : oral ? "Speaking outline or transcript" : "Your response and evidence notes";
    const modelLocked = writing && !state.ready;
    app.innerHTML = `<section class="content-page challenge-page"><button class="back-link" data-action="${skill ? "skill" : "projects"}" data-skill="${skill?.id || ""}">← Back to ${skill ? escapeHtml(skill.title) : "projects"}</button><div class="page-heading"><span class="eyebrow">${escapeHtml(item.level || "Integrated project")}${challengeComplete ? " · Completed ✓" : ""}</span><h1>${escapeHtml(item.title || "Project brief")}</h1><p>${escapeHtml(item.prompt || item.description)}</p><button class="favorite-button challenge-favorite ${isFavorite(item.id) ? "is-favorite" : ""}" data-action="favorite" data-item="${item.id}">${isFavorite(item.id) ? "★ Saved" : "☆ Save challenge"}</button></div>${briefMeta}${projectMeta}${oralTools}<section class="production-workspace"><div class="workspace-heading"><div><span class="eyebrow">Production workspace</span><h2>${draftLabel}</h2><p>Produce before comparing. Your work is stored only in this browser.</p></div><div class="workspace-metrics"><strong id="challenge-word-count">${countWords(savedDraft)} words</strong><span id="challenge-evidence-status">${state.checked.length}/${state.criteriaCount} review checks · target: ${state.minimumWords}+ words${oral ? " or a local recording" : ""}</span></div></div><label class="sr-only" for="challenge-draft">${draftLabel}</label><textarea id="challenge-draft" placeholder="Write your first attempt, speaking outline, transcript or evidence here.">${escapeHtml(savedDraft)}</textarea><div class="workspace-actions"><button class="secondary" data-action="save-challenge-work" data-activity="${item.id}">Save work</button><button class="text-button" data-action="copy-draft">Copy draft</button><span class="copy-status" id="workspace-status" aria-live="polite"></span></div></section><div class="challenge-layout"><article class="challenge-panel"><span class="eyebrow">Preparation</span><ol>${(item.preparation || ["Read the prompt carefully.", "Plan before producing your answer.", "Review your work after completing it."]).map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>${item.transcript ? `<div class="transcript-box"><span class="eyebrow">Listening text</span><p>${escapeHtml(item.transcript)}</p></div>` : ""}<div class="challenge-actions"><button class="secondary" data-action="speak" data-speech="${escapeHtml(speechText)}">▶ Play model text</button>${item.transcript ? `<button class="text-button" data-action="toggle-transcript">Show / hide transcript</button>` : ""}</div></article><aside class="challenge-panel checklist-panel"><span class="eyebrow">Self-review checklist</span><ul>${reviewCriteria.map((check, index) => `<li><label><input type="checkbox" data-review-index="${index}" ${savedReview.includes(index) ? "checked" : ""}> ${escapeHtml(check)}</label></li>`).join("")}</ul><label class="eyebrow" for="challenge-note">Reflection note</label><textarea id="challenge-note" placeholder="What did you do well? What will you improve next time?">${escapeHtml(savedNote)}</textarea><button class="${challengeComplete ? "secondary" : "primary"}" data-action="complete-challenge" data-activity="${item.id}" ${challengeComplete || !state.ready ? "disabled" : ""}>${challengeComplete ? "Challenge completed ✓" : "Complete challenge"}</button><span class="copy-status" id="completion-status" aria-live="polite"></span></aside></div><div class="model-note"><button class="text-button" data-action="toggle-model" ${modelLocked ? "disabled" : ""}>${modelLocked ? "Complete your draft and self-review to unlock the model" : "Show model answer after self-review"}</button><div class="model-guidance is-hidden"><span class="eyebrow">Model answer / example</span><div class="model-answer-text">${modelParagraphs}</div>${modelCommentary}</div></div>${voiceCard}</section>`;
  }

  function renderDiagnostic() {
    app.innerHTML = `<section class="content-page"><div class="page-heading"><span class="eyebrow">B1+ → C1 diagnostic</span><h1>Find your best starting point.</h1><p>This ${university.diagnostic.length}-question diagnostic is balanced at sixteen questions per level and samples grammar, vocabulary, reading, listening, pronunciation, Use of English and critical thinking. Confirm the result with writing and speaking evidence.</p></div><button class="primary" data-action="start-diagnostic">Start diagnostic →</button><div class="reference-grid diagnostic-grid"><article class="reference-card"><span>Use it once</span><h2>Answer without notes</h2><p>Your first result is more useful when it reflects your current control and intuition.</p></article><article class="reference-card"><span>Read the feedback</span><h2>Compare levels and skills</h2><p>The result separates level evidence from the skill sample and sends difficult decisions to targeted review.</p></article><article class="reference-card"><span>Revisit later</span><h2>Compare progress</h2><p>Repeat after a study cycle and compare the level signals with your production portfolio.</p></article></div></section>`;
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

  function smartPracticeSet(items, limit = 24) {
    const now = new Date().toISOString();
    const groups = [[], [], [], []];
    items.forEach((item) => {
      const saved = progress[item.id];
      if (saved?.lastCorrect === false) groups[0].push(item);
      else if (saved && (!saved.nextReview || saved.nextReview <= now)) groups[1].push(item);
      else if (!saved) groups[2].push(item);
      else groups[3].push(item);
    });
    return groups.flatMap((group) => shuffle(group)).slice(0, Math.min(limit, items.length));
  }

  function startSession(kind, topicId = null, levelId = null) {
    const activeViewId = view === "topic" ? activeTopic : view === "skill" || view === "level" ? activeSkill : view === "module" ? activeModule : view === "lesson" ? activeLesson : view === "grammar-studio" ? activeGrammar : view === "integrated-unit" ? activeIntegratedUnit : view === "integrated-exam" ? activeExam : null;
    const returnTarget = view === "session" && session?.returnTarget ? session.returnTarget : { view, id: activeViewId };
    let items = [];
    let title = "Practice";
    let production = [];
    if (kind === "topic") { items = exercises.filter((item) => item.topic === topicId); title = `${topicById(topicId).title} practice`; }
    if (kind === "quick") { items = exercises.filter((item) => item.topic === topicId && item.quickTest); title = `${topicById(topicId).title} quick test`; }
    if (kind === "all") { items = exercises; title = "All-topic practice"; }
    if (kind === "partial1") { items = exercises.filter((item) => item.exam === 1); title = "Partial 1 exam"; }
    if (kind === "partial2") { items = exercises.filter((item) => item.exam === 2); title = "Partial 2 exam"; }
    if (kind === "skill") { items = smartPracticeSet(skillActivities.filter((item) => item.skill === topicId && item.mode === "quiz"), 24); title = `${skillById(topicId)?.title || "Skill"} · smart practice`; }
    if (kind === "skill-level") { items = smartPracticeSet(skillActivities.filter((item) => item.skill === topicId && item.level === levelId && item.mode === "quiz"), 20); title = `${skillById(topicId)?.title || "Skill"} · ${university.levels.find((item) => item.id === levelId)?.code || levelId} section`; }
    if (kind === "module") { items = smartPracticeSet(skillActivities.filter((item) => item.moduleId === levelId && item.skill === topicId && item.mode === "quiz"), 20); title = `${skillById(topicId)?.title || "Skill"} · module practice`; }
    if (kind === "lesson-practice") { const lesson = lessonById(topicId); items = (lesson?.activityIds || []).map(activityById).filter((item) => item?.mode === "quiz"); title = `${lesson?.title || "Lesson"} · guided practice`; }
    if (kind === "grammar-mini-test") { const grammar = grammarById(topicId); items = (grammar?.studio?.practiceIds || []).map(activityById).filter((item) => item?.mode === "quiz"); title = `${grammar?.title || "Grammar"} · mini-test`; }
    if (kind === "integrated-reading") { const unit = integratedUnitById(topicId); items = skillActivities.filter((item) => item.integratedUnitId === topicId && item.skill === "reading" && item.mode === "quiz"); title = `${unit?.title || "Integrated unit"} · reading`; }
    if (kind === "integrated-listening") { const unit = integratedUnitById(topicId); items = skillActivities.filter((item) => item.integratedUnitId === topicId && item.skill === "listening" && item.mode === "quiz"); title = `${unit?.title || "Integrated unit"} · listening`; }
    if (kind === "skill-test") { const exam = university.levelExams?.find((item) => item.level === levelId); const test = exam?.skillTests?.find((item) => item.id === topicId); items = test?.questions || []; title = test?.title || "Skill test"; }
    if (kind === "progress-test") { const exam = university.levelExams?.find((item) => item.level === levelId); const test = exam?.progressTests?.find((item) => item.id === topicId); items = test?.questions || []; title = test?.title || "Progress test"; }
    if (kind === "word-review") { items = vocabularyReviewItems(true); if (!items.length) items = vocabularyReviewItems(false); title = "Personal word-bank review"; }
    if (kind === "module-test") { const moduleExam = university.levelExams?.flatMap((exam) => exam.moduleTests || []).find((test) => test.moduleId === topicId); items = moduleExam?.questions || []; production = moduleExam?.production || []; title = moduleExam?.title || "Module checkpoint"; }
    if (kind === "diagnostic") { items = university.diagnostic || []; title = "B1+ → C1 diagnostic"; }
    if (kind === "review") { items = smartPracticeSet(reviewDue(), 30); title = "Spaced review queue"; }
    if (kind === "level-exam") { const exam = university.levelExams?.find((item) => item.level === topicId); items = exam?.questions || []; production = exam?.production || []; title = exam?.title || "Level exam"; }
    if (kind === "mistakes") { items = smartPracticeSet(mistakes(), 30); title = "Mistake review"; }
    session = { kind, topicId, levelId, title, production, returnTarget, items: kind === "partial1" || kind === "partial2" || kind === "quick" || kind === "diagnostic" || kind === "level-exam" || kind === "skill" || kind === "skill-level" || kind === "module" || kind === "module-test" || kind === "lesson-practice" || kind === "grammar-mini-test" || kind === "integrated-reading" || kind === "integrated-listening" || kind === "skill-test" || kind === "progress-test" || kind === "review" || kind === "mistakes" ? items : shuffle(items) };
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
    app.innerHTML = `<section class="practice-page"><div class="quiz-layout"><aside class="quiz-sidebar"><button class="back-link" data-action="exit-session">← Exit session</button><span class="eyebrow">${session.kind === "partial1" ? "All nine Partial 1 units" : session.kind === "partial2" ? "All seven Partial 2 units" : session.kind === "diagnostic" ? `${university.diagnostic.length} level signals` : session.kind === "level-exam" ? "Level checkpoint" : session.kind === "module-test" ? "Module checkpoint" : escapeHtml(topic.title)}</span><h2>${escapeHtml(session.title)}</h2><div class="session-stat"><span>Progress</span><strong>${current + 1} / ${session.items.length}</strong></div><div class="progress-track"><span style="width:${progressWidth}%"></span></div><div class="session-stat"><span>Correct</span><strong>${sessionCorrect}</strong></div><p class="sidebar-tip"><strong>Strategy:</strong> identify the context before choosing the grammar form.</p></aside>
      <article class="question-card ${exercise.passage ? "reading-question" : ""}"><div class="question-meta"><span class="topic-pill">${escapeHtml(topic.icon)} ${escapeHtml(topic.title)}</span><span>${escapeHtml(exercise.taskType || (exercise.type === "text" ? "Written answer" : "Multiple choice"))}</span></div>
      ${exercise.passage ? `<div class="reading-box"><span>Reading task</span><h3>${escapeHtml(exercise.passageTitle)}</h3><p>${escapeHtml(exercise.passage)}</p></div>` : ""}${exercise.transcript ? `<div class="reading-box listening-box"><span>Listening fallback</span><h3>${escapeHtml(exercise.audioTitle || "Listen and decide")}</h3><button class="secondary" data-action="speak" data-lang="${exercise.speechLang || "en-US"}" data-rate="${exercise.speechRate || 0.9}" data-speech="${escapeHtml(exercise.transcript)}">▶ Play model text</button><details><summary>Show transcript after your first attempt</summary><p>${escapeHtml(exercise.transcript)}</p></details></div>` : ""}<p class="instruction">${escapeHtml(exercise.instruction)}</p><h2>${escapeHtml(exercise.prompt)}</h2>
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
    const diagnosticLevels = session.kind === "diagnostic" ? university.levels.map((level) => { const items = session.items.filter((item) => item.level === level.id); const correct = items.filter((item) => progress[item.id]?.lastCorrect).length; return { level, correct, total: items.length, accuracy: percent(correct, items.length) }; }) : [];
    const highestSignal = diagnosticLevels.filter((item) => item.accuracy >= 63).at(-1)?.level || university.levels[0];
    const diagnosticLevel = session.kind === "diagnostic" ? `${highestSignal.code} starting signal` : "";
    const diagnosticSkillProfile = session.kind === "diagnostic" ? [...new Set(session.items.map((item) => item.skill).filter(Boolean))].map((skillId) => { const items = session.items.filter((item) => item.skill === skillId); const correct = items.filter((item) => progress[item.id]?.lastCorrect).length; return `<div><span>${escapeHtml(skillById(skillId)?.title || skillId)}</span><strong>${correct} / ${items.length}</strong></div>`; }).join("") : "";
    const diagnosticLevelProfile = session.kind === "diagnostic" ? `<section class="diagnostic-profile"><div><span class="eyebrow">Level evidence</span>${diagnosticLevels.map((item) => `<p><strong>${escapeHtml(item.level.code)}</strong><span>${item.correct}/${item.total} · ${item.accuracy}%</span></p>`).join("")}</div><div><span class="eyebrow">Skill sample</span>${diagnosticSkillProfile}</div></section>` : "";
    const productionRoute = (session.kind === "level-exam" || session.kind === "module-test") && session.production?.length ? `<div class="production-route"><span class="eyebrow">Production route</span><p>Complete these open tasks after the checkpoint. They assess what selected answers cannot show.</p><div>${session.production.map((item) => `<button class="secondary" data-action="challenge" data-activity="${item.id}">${escapeHtml(item.title || item.prompt)}</button>`).join("")}</div></div>` : "";
    if (!session.resultSaved) {
      meta.results = [{ at: new Date().toISOString(), kind: session.kind, title: session.title, score, correct: sessionCorrect, total: session.items.length }, ...(meta.results || [])].slice(0, 30);
      if (session.kind === "diagnostic") meta.levelEstimate = diagnosticLevel;
      saveMeta();
      session.resultSaved = true;
    }
    app.innerHTML = `<section class="practice-page"><div class="results-card wide-results"><span class="eyebrow">Session completed</span><div class="result-score">${score}<sup>%</sup></div><h2>${session.kind === "diagnostic" ? diagnosticLevel : score >= 80 ? "Strong performance" : score >= 65 ? "Good progress" : "Keep practising"}</h2><p>You answered <strong>${sessionCorrect}</strong> of <strong>${session.items.length}</strong> questions correctly.</p>${session.kind === "diagnostic" ? `<div class="diagnostic-result"><strong>This is a starting estimate, not a permanent label.</strong><span>The estimate uses the highest level at which at least 63% of the sampled questions were controlled. Confirm it with writing and speaking evidence.</span></div>${diagnosticLevelProfile}` : ""}${productionRoute}<div class="result-breakdown">${breakdown}</div><div class="result-actions">${mistakes().length ? '<button class="primary" data-action="review-mistakes">Review mistakes</button>' : ""}${reviewDue().length ? '<button class="secondary" data-action="review-due">Review due</button>' : ""}<button class="secondary" data-action="repeat-session">Try again</button><button class="text-button" data-action="home">Back to topics</button></div></div></section>`;
  }

  function renderMistakesPage() {
    const items = mistakes();
    const patterns = errorPatterns();
    const patternSummary = patterns.length ? `<section class="error-patterns"><div class="section-heading"><div><span class="eyebrow">Pattern detection</span><h2>What your errors suggest</h2></div><p>Patterns group unresolved answers by skill and error type so you can choose a smaller, more useful review session.</p></div><div class="error-pattern-grid">${patterns.slice(0, 6).map((pattern) => `<article><span class="eyebrow">${escapeHtml(pattern.errorType)}</span><strong>${pattern.count}</strong><p>${escapeHtml(topicById(pattern.item.topic || pattern.item.skill).title)}</p><small>${escapeHtml(patternAdvice(pattern))}</small></article>`).join("")}</div></section>` : "";
    app.innerHTML = `<section class="content-page"><div class="page-heading"><span class="eyebrow">Targeted review</span><h1>My mistakes</h1><p>Each record keeps the question, your latest answer, the accepted answer, the error category, topic and date. A question leaves this list when your latest answer is correct.</p></div>${patternSummary}${items.length ? `<div class="mistake-summary"><div><strong>${items.length}</strong><span>questions to master</span></div><button class="primary" data-action="review-mistakes">Practise these mistakes</button></div><div class="mistake-list detailed-mistakes">${items.map((item) => { const record = progress[item.id] || {}; const itemTopic = topicById(item.topic || item.skill); const userAnswer = item.type === "choice" ? item.options?.[record.lastAnswer] : record.lastAnswer; const correctAnswer = record.correctAnswer || (item.type === "choice" ? item.options[item.answer] : item.answers?.[0] || item.sample || "Open challenge"); return `<article><span>${escapeHtml(itemTopic.icon)}</span><div><small>${escapeHtml(itemTopic.title)} · ${escapeHtml(record.errorType || "review")} · ${record.lastAttemptAt ? new Date(record.lastAttemptAt).toLocaleDateString("en-GB") : "date unavailable"}</small><p>${escapeHtml(item.prompt)}</p><div class="mistake-answer-pair"><span><b>Your answer</b>${escapeHtml(userAnswer ?? "No answer")}</span><span><b>Accepted answer</b>${escapeHtml(correctAnswer)}</span></div></div></article>`; }).join("")}</div>` : `<div class="empty-state"><span>✓</span><h2>Nothing to review</h2><p>You have no saved mistakes.</p><button class="primary" data-action="home">Choose a topic</button></div>`}</section>`;
  }

  function updateChrome() {
    document.querySelector(".nav-count").textContent = mistakes().length;
    document.querySelectorAll("#main-nav [data-action]").forEach((button) => {
      const active = (view === "home" && button.dataset.action === "home") || (view === "university" && button.dataset.action === "university") || (view === "skill" && button.dataset.action === "skills") || (view === "diagnostic" && button.dataset.action === "diagnostic") || (view === "word-bank" && button.dataset.action === "word-bank") || (view === "mistakes" && button.dataset.action === "mistakes") || (session?.kind === "partial1" && view === "session" && button.dataset.action === "partial-1-test") || (session?.kind === "partial2" && view === "session" && button.dataset.action === "partial-2-test");
      button.classList.toggle("active", active);
    });
  }

  function render() {
    if (view === "home") renderHome();
    else if (view === "university") renderUniversity();
    else if (view === "level") renderLevel(activeSkill);
    else if (view === "integrated-exam") renderIntegratedExam(activeExam);
    else if (view === "module") renderModule(activeModule);
    else if (view === "lesson") renderLesson(activeLesson);
    else if (view === "grammar-studio") renderGrammarStudio(activeGrammar);
    else if (view === "integrated-units") renderIntegratedUnits();
    else if (view === "integrated-unit") renderIntegratedUnit(activeIntegratedUnit);
    else if (view === "word-bank") renderWordBank();
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
    window.clearInterval(countdownHandle); countdownHandle = null; stopLocalRecording();
    if (nextView === "skill" && (view !== "skill" || (topicId && topicId !== activeSkill))) {
      skillLevelFilter = "all";
      skillModeFilter = "all";
      skillDisplayLimit = 24;
    }
    view = nextView;
    if (nextView === "topic") activeTopic = topicId || activeTopic;
    if (nextView === "skill" || nextView === "level") activeSkill = topicId || activeSkill;
    if (nextView === "module") activeModule = topicId || activeModule;
    if (nextView === "lesson") activeLesson = topicId || activeLesson;
    if (nextView === "grammar-studio") activeGrammar = topicId || activeGrammar;
    if (nextView === "integrated-unit") activeIntegratedUnit = topicId || activeIntegratedUnit;
    if (nextView === "challenge") activeChallenge = topicId || activeChallenge;
    if (nextView === "integrated-exam") activeExam = topicId || activeExam;
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
    if (event.target.id === "course-search-input") {
      searchQuery = event.target.value;
      const results = document.querySelector("#search-results");
      if (results) results.innerHTML = searchResults(searchQuery);
      return;
    }
    if (event.target.id === "challenge-draft") {
      updateChallengeWorkspaceState();
      return;
    }
    if (event.target.id !== "written-input") return;
    typedAnswer = event.target.value;
    const submit = document.querySelector('[data-action="submit"]');
    if (submit) submit.disabled = !typedAnswer.trim();
  });

  document.addEventListener("change", (event) => {
    if (event.target.matches("[data-review-index]")) updateChallengeWorkspaceState();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target.id === "written-input" && typedAnswer.trim() && !answered) document.querySelector('[data-action="submit"]')?.click();
  });

  document.addEventListener("click", async (event) => {
    const option = event.target.closest("[data-option]");
    if (option && !answered) { selected = Number(option.dataset.option); renderSession(); return; }
    const control = event.target.closest("[data-action]");
    if (!control) return;
    const action = control.dataset.action;
    if (action === "menu") { const open = nav.classList.toggle("open"); menuButton.setAttribute("aria-expanded", String(open)); return; }
    if (action === "theme") { toggleTheme(); return; }
    if (action === "home") { navigate("home"); return; }
    if (action === "university") { navigate("university"); return; }
    if (action === "word-bank") { navigate("word-bank"); return; }
    if (action === "integrated-units") { navigate("integrated-units"); return; }
    if (action === "integrated-unit") { navigate("integrated-unit", control.dataset.unit); return; }
    if (action === "skills") { navigate("university"); return; }
    if (action === "level") { navigate("level", control.dataset.level); return; }
    if (action === "integrated-exam") { navigate("integrated-exam", control.dataset.level); return; }
    if (action === "module") { navigate("module", control.dataset.module); return; }
    if (action === "module-lesson") { navigate("lesson", control.dataset.lesson); return; }
    if (action === "grammar-studio") { navigate("grammar-studio", control.dataset.grammar); return; }
    if (action === "level-exam") { startSession("level-exam", control.dataset.level); return; }
    if (action === "skill-level") { startSession("skill-level", control.dataset.skill, control.dataset.level); return; }
    if (action === "module-practice") { startSession("module", control.dataset.skill, control.dataset.module); return; }
    if (action === "module-test") { startSession("module-test", control.dataset.module); return; }
    if (action === "lesson-practice") { startSession("lesson-practice", control.dataset.lesson); return; }
    if (action === "grammar-mini-test") { startSession("grammar-mini-test", control.dataset.grammar); return; }
    if (action === "integrated-reading") { startSession("integrated-reading", control.dataset.unit); return; }
    if (action === "integrated-listening") { startSession("integrated-listening", control.dataset.unit); return; }
    if (action === "skill-test") { startSession("skill-test", control.dataset.test, control.dataset.level); return; }
    if (action === "progress-test") { startSession("progress-test", control.dataset.test, control.dataset.level); return; }
    if (action === "review-words") { startSession("word-review"); return; }
    if (action === "start-timer") { startCountdown(control.dataset.seconds); return; }
    if (action === "start-recording") { startLocalRecording(); return; }
    if (action === "stop-recording") { stopLocalRecording(); control.disabled = true; const start = document.querySelector('[data-action="start-recording"]'); if (start) start.disabled = false; return; }
    if (action === "lesson-complete") { progress[`lesson:${control.dataset.lesson}`] = { completedAt: new Date().toISOString() }; recordStudyDay(); saveProgress(); renderLesson(control.dataset.lesson); return; }
    if (action === "skill") { navigate("skill", control.dataset.skill); return; }
    if (action === "activity-filter-level") { skillLevelFilter = control.dataset.level; skillDisplayLimit = 24; renderSkillPage(activeSkill); return; }
    if (action === "activity-filter-mode") { skillModeFilter = control.dataset.mode; skillDisplayLimit = 24; renderSkillPage(activeSkill); return; }
    if (action === "show-more-activities") { skillDisplayLimit += 24; renderSkillPage(activeSkill); return; }
    if (action === "projects") { navigate("projects"); return; }
    if (action === "challenge") { navigate("challenge", control.dataset.activity); return; }
    if (action === "favorite") { toggleFavorite(control.dataset.item); render(); return; }
    if (action === "search-result") { const type = control.dataset.resultType; const id = control.dataset.resultId; if (type === "topic") navigate("topic", id); else if (type === "skill") navigate("skill", id); else if (type === "module") navigate("module", id); else if (type === "grammar-studio") navigate("grammar-studio", id); else if (type === "integrated-unit") navigate("integrated-unit", id); else if (type === "challenge") navigate("challenge", id); else navigate("skill", skillActivities.find((item) => item.id === id)?.skill || "grammar"); return; }
    if (action === "skill-practice") { startSession("skill", control.dataset.skill); return; }
    if (action === "diagnostic") { navigate("diagnostic"); return; }
    if (action === "start-diagnostic") { startSession("diagnostic"); return; }
    if (action === "review-due") { startSession("review"); return; }
    if (action === "speak") { if ("speechSynthesis" in window) { window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(control.dataset.speech || "English Lab practice"); const requestedLang = control.dataset.lang || "en-US"; const voices = window.speechSynthesis.getVoices(); utterance.lang = requestedLang; utterance.voice = voices.find((voice) => voice.lang.toLowerCase() === requestedLang.toLowerCase()) || voices.find((voice) => voice.lang.toLowerCase().startsWith(requestedLang.slice(0, 2).toLowerCase())) || null; utterance.rate = Number(control.dataset.rate || 0.9); window.speechSynthesis.speak(utterance); control.textContent = `Playing ${requestedLang}…`; utterance.onend = () => { control.textContent = "▶ Play again"; }; } return; }
    if (action === "toggle-transcript") { document.querySelector(".transcript-box")?.classList.toggle("is-hidden"); return; }
    if (action === "toggle-model") { const item = challengeItemById(activeChallenge); if (item && isWritingChallenge(item) && !challengeEvidenceState(item, true).ready) { updateChallengeWorkspaceState(); return; } if (item) persistChallengeWorkspace(item); const guidance = document.querySelector(".model-guidance"); guidance?.classList.toggle("is-hidden"); control.textContent = guidance?.classList.contains("is-hidden") ? "Show model answer after self-review" : "Hide model answer"; return; }
    if (action === "save-challenge-work") { const item = challengeItemById(control.dataset.activity); if (!item) return; const state = persistChallengeWorkspace(item); const status = document.querySelector("#workspace-status"); if (status) { status.textContent = `Work saved · ${state.words} words · ${state.checked.length} checks.`; window.setTimeout(() => { status.textContent = ""; }, 2500); } updateChallengeWorkspaceState(); return; }
    if (action === "copy-draft") { const value = document.querySelector("#challenge-draft")?.value || ""; try { await navigator.clipboard.writeText(value); } catch { const area = document.createElement("textarea"); area.value = value; document.body.append(area); area.select(); document.execCommand("copy"); area.remove(); } const status = document.querySelector("#workspace-status"); if (status) { status.textContent = "Draft copied."; window.setTimeout(() => { status.textContent = ""; }, 2000); } return; }
    if (action === "complete-challenge") { const item = challengeItemById(control.dataset.activity); if (!item) return; const state = persistChallengeWorkspace(item); if (!state.ready) { const status = document.querySelector("#completion-status"); if (status) status.textContent = `Add evidence and complete at least ${state.requiredChecks} review checks first.`; updateChallengeWorkspaceState(); return; } const now = new Date().toISOString(); const oldChallenge = progress[item.id] || { attempts: 0, correct: 0, history: [] }; progress[item.id] = { ...oldChallenge, attempts: oldChallenge.attempts + (oldChallenge.completedAt ? 0 : 1), completedAt: oldChallenge.completedAt || now, production: true, evidence: { words: state.words, checked: state.checked.length, recorded: state.recorded }, history: [...(oldChallenge.history || []), { at: now, type: "production", words: state.words, checked: state.checked.length, recorded: state.recorded }].slice(-12) }; saveProgress(); renderChallenge(item.id); return; }
    if (action === "save-grammar-note") { const note = document.querySelector("#grammar-note")?.value.trim() || ""; progress[`note:grammar:${control.dataset.grammar}`] = { text: note, updatedAt: new Date().toISOString() }; recordStudyDay(); saveProgress(); const status = control.parentElement.querySelector(".copy-status"); if (status) status.textContent = "Grammar Studio work saved in this browser."; return; }
    if (action === "save-word") { const unit = integratedUnitById(control.dataset.unit); const entry = unit?.reading.vocabulary.find((candidate) => candidate.term === control.dataset.word); if (entry && !meta.vocabulary.some((candidate) => candidate.id === `${unit.id}:${entry.term}`)) { meta.vocabulary.push({ id: `${unit.id}:${entry.term}`, unitId: unit.id, level: unit.level, ...entry, addedAt: new Date().toISOString(), stage: 0, ease: 2.5, intervalDays: 1, nextReview: new Date(Date.now() + 86400000).toISOString() }); saveMeta(); control.textContent = "Saved ✓"; control.disabled = true; } return; }
    if (action === "save-catalog-word") { const domain = catalogs.vocabularyCatalog.find((item) => item.id === control.dataset.domain); const entry = domain?.entries.find(([word]) => word === control.dataset.word); const id = `catalog:${domain?.id}:${entry?.[0]}`; if (domain && entry && !meta.vocabulary.some((candidate) => candidate.id === id)) { meta.vocabulary.push({ id, level: domain.level, sourceTitle: domain.title, term: entry[0], collocation: entry[1], meaning: entry[2], stress: entry[0].toUpperCase(), addedAt: new Date().toISOString(), stage: 0, ease: 2.5, intervalDays: 1, nextReview: new Date(Date.now() + 86400000).toISOString() }); saveMeta(); control.textContent = "Saved ✓"; control.disabled = true; } return; }
    if (action === "remove-word") { meta.vocabulary = (meta.vocabulary || []).filter((word) => word.id !== control.dataset.wordId); saveMeta(); renderWordBank(); return; }
    if (action === "topic") { navigate("topic", control.dataset.topic); return; }
    if (action === "topic-practice") { startSession("topic", control.dataset.topic); return; }
    if (action === "quick-test") { startSession("quick", control.dataset.topic); return; }
    if (action === "all-practice") { startSession("all"); return; }
    if (action === "partial-1-test") { startSession("partial1"); return; }
    if (action === "partial-2-test") { startSession("partial2"); return; }
    if (action === "mistakes") { navigate("mistakes"); return; }
    if (action === "review-mistakes") { startSession("mistakes"); return; }
    if (action === "exit-session") { if (session?.returnTarget?.view && session.returnTarget.view !== "session") navigate(session.returnTarget.view, session.returnTarget.id); else navigate("home"); return; }
    if (action === "copy-prompt") { copyPrompt(control); return; }
    if (action === "submit" && !answered) {
      const exercise = session.items[current]; const correct = isCorrectAnswer(exercise);
      recordStudyDay();
      const old = progress[exercise.id] || { attempts: 0, correct: 0 };
      const errorType = correct ? null : classifyError(exercise);
      const intervalDays = correct ? Math.min(60, old.intervalDays ? Math.max(1, Math.round(old.intervalDays * (old.ease || 2))) : 1) : 1;
      const nextReview = new Date(Date.now() + intervalDays * 86400000).toISOString();
      const attemptedAt = new Date().toISOString();
      const answerValue = exercise.type === "choice" ? selected : typedAnswer;
      const correctAnswer = exercise.type === "choice" ? exercise.options[exercise.answer] : exercise.answers?.[0];
      const ease = Math.max(1.3, Math.min(2.8, (old.ease || 2) + (correct ? 0.1 : -0.2)));
      const history = [...(old.history || []), { at: attemptedAt, correct, errorType, answer: answerValue, correctAnswer, topic: exercise.topic || null, skill: exercise.skill || null, level: exercise.level || null }].slice(-12);
      progress[exercise.id] = { attempts: old.attempts + 1, correct: old.correct + (correct ? 1 : 0), lastCorrect: correct, lastAnswer: answerValue, correctAnswer, errorType, topic: exercise.topic || null, skill: exercise.skill || null, level: exercise.level || null, lastAttemptAt: attemptedAt, ease, intervalDays, nextReview, history };
      if (session.kind === "word-review" && exercise.wordId) {
        const word = meta.vocabulary.find((item) => item.id === exercise.wordId);
        if (word) {
          const intervals = [1, 3, 7, 14, 30, 60];
          word.stage = correct ? Math.min(intervals.length - 1, (word.stage || 0) + 1) : Math.max(0, (word.stage || 0) - 1);
          word.ease = Math.max(1.3, Math.min(2.8, (word.ease || 2.5) + (correct ? 0.05 : -0.2)));
          word.intervalDays = correct ? intervals[word.stage] : 1;
          word.nextReview = new Date(Date.now() + word.intervalDays * 86400000).toISOString();
          word.lastReviewedAt = attemptedAt;
          word.lastCorrect = correct;
          saveMeta();
        }
      }
      if (correct) sessionCorrect += 1; answered = true; saveProgress(); render(); return;
    }
    if (action === "next") { if (current === session.items.length - 1) sessionDone = true; else { current += 1; selected = null; typedAnswer = ""; answered = false; } render(); return; }
    if (action === "repeat-session") { startSession(session.kind, session.topicId, session.levelId); return; }
    if (action === "reset" && window.confirm("Delete all saved progress, favorites, vocabulary and study history?")) { progress = {}; meta = { favorites: [], vocabulary: [], results: [], streak: 0, lastStudyDate: null, levelEstimate: null }; saveProgress(); saveMeta(); render(); }
  });

  const params = new URLSearchParams(window.location.search);
  const requestedTopic = params.get("topic");
  const requestedMode = params.get("mode");
  const requestedSkill = params.get("skill");
  const requestedLevel = params.get("level");
  const requestedModule = params.get("module");
  const requestedLesson = params.get("lesson");
  const requestedGrammar = params.get("grammar");
  const requestedIntegratedUnit = params.get("unit");
  const requestedChallenge = params.get("challenge");
  if (requestedTopic && topics.some((topic) => topic.id === requestedTopic)) { activeTopic = requestedTopic; view = "topic"; render(); }
  else if (requestedLesson && lessonById(requestedLesson)) { activeLesson = requestedLesson; view = "lesson"; render(); }
  else if (requestedGrammar && grammarById(requestedGrammar)) { activeGrammar = requestedGrammar; view = "grammar-studio"; render(); }
  else if (requestedIntegratedUnit && integratedUnitById(requestedIntegratedUnit)) { activeIntegratedUnit = requestedIntegratedUnit; view = "integrated-unit"; render(); }
  else if (requestedChallenge && (activityById(requestedChallenge) || university.projects.find((project) => project.id === requestedChallenge))) { activeChallenge = requestedChallenge; view = "challenge"; render(); }
  else if (requestedModule && moduleById(requestedModule)) { activeModule = requestedModule; view = "module"; render(); }
  else if (requestedLevel && university.levels.some((level) => level.id === requestedLevel)) { activeSkill = requestedLevel; view = "level"; render(); }
  else if (requestedSkill && skillById(requestedSkill)) { activeSkill = requestedSkill; view = "skill"; render(); }
  else if (requestedMode === "university") navigate("university");
  else if (requestedMode === "integrated-units") navigate("integrated-units");
  else if (requestedMode === "word-bank") navigate("word-bank");
  else if (requestedMode === "diagnostic") navigate("diagnostic");
  else if (requestedMode === "partial1") startSession("partial1");
  else if (requestedMode === "partial2") startSession("partial2");
  else if (requestedMode === "all") startSession("all");
  else render();
  applyTheme(localStorage.getItem(themeStorageKey) || "light");
})();
