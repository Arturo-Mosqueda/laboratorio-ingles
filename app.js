(() => {
  "use strict";

  const { topics, exercises } = window.GrammarLabData;
  const storageKey = "english-lab-progress-v2";
  const app = document.querySelector("#app");
  const nav = document.querySelector("#main-nav");
  const menuButton = document.querySelector('[data-action="menu"]');

  let view = "home";
  let activeTopic = null;
  let progress = loadProgress();
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

  function saveProgress() {
    try { localStorage.setItem(storageKey, JSON.stringify(progress)); }
    catch { /* Storage is optional. */ }
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
  const topicById = (id) => topics.find((topic) => topic.id === id);
  const mistakes = () => exercises.filter((exercise) => progress[exercise.id] && progress[exercise.id].lastCorrect === false);

  function statsFor(items) {
    const attempted = items.filter((item) => progress[item.id]).length;
    const mastered = items.filter((item) => progress[item.id]?.lastCorrect).length;
    const totals = items.reduce((sum, item) => {
      const saved = progress[item.id];
      return { attempts: sum.attempts + (saved?.attempts || 0), correct: sum.correct + (saved?.correct || 0) };
    }, { attempts: 0, correct: 0 });
    return { attempted, mastered, accuracy: percent(totals.correct, totals.attempts) };
  }

  function renderHome() {
    const overall = statsFor(exercises);
    app.innerHTML = `<div class="home-page">
      <section class="hero"><div class="hero-copy"><span class="eyebrow">English-only · B2 foundation</span>
        <h1>Grammar you can<br><em>use with confidence</em></h1>
        <p>Study seven focused units, practise every question by topic, complete short tests and finish with a comprehensive B2 grammar test.</p>
        <div class="hero-actions"><button class="primary" data-action="topic" data-topic="future-choices">Start the first unit →</button><button class="secondary" data-action="all-practice">Practise all ${exercises.length} questions</button></div></div>
        <aside class="hero-card"><div class="level-ring" style="--score:${overall.mastered / exercises.length * 360}deg"><div><strong>${overall.mastered}</strong><span>mastered</span></div></div>
          <div class="hero-stats"><div><strong>${exercises.length}</strong><span>questions</span></div><div><strong>${overall.attempted}</strong><span>attempted</span></div><div><strong>${overall.accuracy}%</strong><span>accuracy</span></div></div>
          <p>Your work is saved in this browser. A question is mastered when your latest answer is correct.</p></aside></section>
      <section class="section-wrap"><div class="section-heading"><div><span class="eyebrow">Course map</span><h2>Choose a grammar unit</h2></div><p>Each unit includes a concise lesson, all 14 practice questions, an eight-question test, a reading task and a voice-practice prompt.</p></div>
        <div class="topic-grid">${topics.map(renderTopicCard).join("")}</div></section>
      <section class="final-banner"><div><span class="eyebrow">Comprehensive assessment</span><h2>Ready for the final test?</h2><p>Complete 35 balanced questions covering all seven units.</p></div><button class="primary" data-action="final-test">Start final test →</button></section>
    </div>`;
  }

  function renderTopicCard(topic, index) {
    const items = exercises.filter((item) => item.topic === topic.id);
    const stats = statsFor(items);
    return `<article class="topic-card"><div class="topic-top"><span class="topic-icon icon-${index + 1}">${topic.icon}</span><span class="question-count">${items.length} questions</span></div>
      <h3>${topic.title}</h3><p>${topic.description}</p><div class="mini-progress"><span style="width:${stats.mastered / items.length * 100}%"></span></div>
      <div class="topic-footer"><span>${stats.mastered} mastered</span><button class="card-link" data-action="topic" data-topic="${topic.id}">Open unit →</button></div></article>`;
  }

  function renderTopic() {
    const topic = topicById(activeTopic);
    const items = exercises.filter((item) => item.topic === topic.id);
    const stats = statsFor(items);
    const voicePrompt = `You are my English speaking partner. Help me practise ${topic.title.toLowerCase()} at B2 level. Speak only in English. First ask me whether I want a real-life role-play, a grammar explanation, a guided conversation or a quick oral quiz. Correct my mistakes politely, explain them briefly and ask me to repeat the corrected sentence. Do not give me every answer immediately.`;
    app.innerHTML = `<div class="lesson-page"><section class="lesson-hero topic-hero"><button class="back-link" data-action="home">← All topics</button><span class="eyebrow">Unit ${topic.number} · ${topic.subtitle}</span><h1>${topic.title}</h1><p>${topic.description}</p>
      <div class="topic-actions"><button class="primary" data-action="topic-practice" data-topic="${topic.id}">Practise all ${items.length}</button><button class="secondary" data-action="quick-test" data-topic="${topic.id}">Take the 8-question test</button></div>
      <div class="unit-progress"><span><strong>${stats.mastered}</strong> of ${items.length} mastered</span><span><strong>${stats.accuracy}%</strong> historical accuracy</span></div></section>
      <div class="lesson-layout"><aside class="lesson-toc"><span>In this unit</span>${topic.lesson.map((item, index) => `<a href="#rule-${index + 1}">${index + 1}. ${escapeHtml(item[0])}</a>`).join("")}<button class="primary" data-action="quick-test" data-topic="${topic.id}">Quick test →</button></aside>
      <article class="lesson-content">${topic.lesson.map((item, index) => `<section class="lesson-section" id="rule-${index + 1}"><header class="lesson-section-head"><span>${String(index + 1).padStart(2, "0")}</span><div><small>${topic.subtitle}</small><h2>${escapeHtml(item[0])}</h2></div></header><div class="lesson-body"><p>${escapeHtml(item[1])}</p><div class="example-stack"><p><span>✓</span>${escapeHtml(item[2])}</p></div></div></section>`).join("")}
      <section class="lesson-finish"><span class="eyebrow">Apply the rules</span><h2>Practise this unit</h2><p>Work through every multiple-choice, written and reading question in this topic.</p><button class="primary" data-action="topic-practice" data-topic="${topic.id}">Start all ${items.length} questions →</button></section>
      <section class="voice-card"><div class="voice-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6"/></svg></div><div><span class="eyebrow">Optional speaking practice</span><h2>Practice with ChatGPT Voice</h2><p>Copy this text, open a voice conversation and use it as your starting prompt. This is a text-only helper and does not connect to any external service.</p><pre>${escapeHtml(voicePrompt)}</pre><button class="secondary" data-action="copy-prompt" data-prompt="${escapeHtml(voicePrompt)}">Copy prompt</button><span class="copy-status" aria-live="polite"></span></div></section>
      </article></div></div>`;
  }

  function startSession(kind, topicId = null) {
    let items = [];
    let title = "Practice";
    if (kind === "topic") { items = exercises.filter((item) => item.topic === topicId); title = `${topicById(topicId).title} practice`; }
    if (kind === "quick") { items = exercises.filter((item) => item.topic === topicId && item.quickTest); title = `${topicById(topicId).title} quick test`; }
    if (kind === "all") { items = exercises; title = "All-topic practice"; }
    if (kind === "final") { items = exercises.filter((item) => item.finalTest); title = "Comprehensive final test"; }
    if (kind === "mistakes") { items = mistakes(); title = "Mistake review"; }
    session = { kind, topicId, title, items: kind === "final" || kind === "quick" ? items : shuffle(items) };
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
    app.innerHTML = `<section class="practice-page"><div class="quiz-layout"><aside class="quiz-sidebar"><button class="back-link" data-action="exit-session">← Exit session</button><span class="eyebrow">${session.kind === "final" ? "All seven units" : escapeHtml(topic.title)}</span><h2>${escapeHtml(session.title)}</h2><div class="session-stat"><span>Progress</span><strong>${current + 1} / ${session.items.length}</strong></div><div class="progress-track"><span style="width:${progressWidth}%"></span></div><div class="session-stat"><span>Correct</span><strong>${sessionCorrect}</strong></div><p class="sidebar-tip"><strong>Strategy:</strong> identify the context before choosing the grammar form.</p></aside>
      <article class="question-card ${exercise.passage ? "reading-question" : ""}"><div class="question-meta"><span class="topic-pill">${escapeHtml(topic.icon)} ${escapeHtml(topic.title)}</span><span>${exercise.type === "text" ? "Written answer" : "Multiple choice"}</span></div>
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
    const breakdown = topics.map((topic) => {
      const topicItems = session.items.filter((item) => item.topic === topic.id);
      if (!topicItems.length) return "";
      const correctItems = topicItems.filter((item) => progress[item.id]?.lastCorrect).length;
      return `<div><span>${escapeHtml(topic.title)}</span><strong>${correctItems} / ${topicItems.length}</strong></div>`;
    }).join("");
    app.innerHTML = `<section class="practice-page"><div class="results-card wide-results"><span class="eyebrow">Session completed</span><div class="result-score">${score}<sup>%</sup></div><h2>${score >= 80 ? "Strong performance" : score >= 65 ? "Good progress" : "Keep practising"}</h2><p>You answered <strong>${sessionCorrect}</strong> of <strong>${session.items.length}</strong> questions correctly.</p><div class="result-breakdown">${breakdown}</div><div class="result-actions">${mistakes().length ? '<button class="primary" data-action="review-mistakes">Review mistakes</button>' : ""}<button class="secondary" data-action="repeat-session">Try again</button><button class="text-button" data-action="home">Back to topics</button></div></div></section>`;
  }

  function renderMistakesPage() {
    const items = mistakes();
    app.innerHTML = `<section class="content-page"><div class="page-heading"><span class="eyebrow">Targeted review</span><h1>My mistakes</h1><p>A question leaves this list when your latest answer is correct.</p></div>${items.length ? `<div class="mistake-summary"><div><strong>${items.length}</strong><span>questions to master</span></div><button class="primary" data-action="review-mistakes">Practise these mistakes</button></div><div class="mistake-list">${items.map((item) => `<article><span>${escapeHtml(topicById(item.topic).icon)}</span><div><small>${escapeHtml(topicById(item.topic).title)}</small><p>${escapeHtml(item.prompt)}</p></div><strong>${item.type === "choice" ? escapeHtml(item.options[item.answer]) : escapeHtml(item.answers[0])}</strong></article>`).join("")}</div>` : `<div class="empty-state"><span>✓</span><h2>Nothing to review</h2><p>You have no saved mistakes.</p><button class="primary" data-action="home">Choose a topic</button></div>`}</section>`;
  }

  function updateChrome() {
    document.querySelector(".nav-count").textContent = mistakes().length;
    document.querySelectorAll("#main-nav [data-action]").forEach((button) => {
      const active = (view === "home" && button.dataset.action === "home") || (view === "mistakes" && button.dataset.action === "mistakes") || (session?.kind === "final" && view === "session" && button.dataset.action === "final-test");
      button.classList.toggle("active", active);
    });
  }

  function render() {
    if (view === "home") renderHome();
    else if (view === "topic") renderTopic();
    else if (view === "session") renderSession();
    else renderMistakesPage();
    updateChrome();
  }

  function navigate(nextView, topicId = null) {
    view = nextView; activeTopic = topicId || activeTopic; session = nextView === "session" ? session : null; closeMenu(); render();
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
    if (action === "topic") { navigate("topic", control.dataset.topic); return; }
    if (action === "topic-practice") { startSession("topic", control.dataset.topic); return; }
    if (action === "quick-test") { startSession("quick", control.dataset.topic); return; }
    if (action === "all-practice") { startSession("all"); return; }
    if (action === "final-test") { startSession("final"); return; }
    if (action === "mistakes") { navigate("mistakes"); return; }
    if (action === "review-mistakes") { startSession("mistakes"); return; }
    if (action === "exit-session") { session?.topicId ? navigate("topic", session.topicId) : navigate("home"); return; }
    if (action === "copy-prompt") { copyPrompt(control); return; }
    if (action === "submit" && !answered) {
      const exercise = session.items[current]; const correct = isCorrectAnswer(exercise);
      const old = progress[exercise.id] || { attempts: 0, correct: 0 };
      progress[exercise.id] = { attempts: old.attempts + 1, correct: old.correct + (correct ? 1 : 0), lastCorrect: correct, lastAnswer: exercise.type === "choice" ? selected : typedAnswer };
      if (correct) sessionCorrect += 1; answered = true; saveProgress(); render(); return;
    }
    if (action === "next") { if (current === session.items.length - 1) sessionDone = true; else { current += 1; selected = null; typedAnswer = ""; answered = false; } render(); return; }
    if (action === "repeat-session") { startSession(session.kind, session.topicId); return; }
    if (action === "reset" && window.confirm("Delete all saved progress and mistakes?")) { progress = {}; saveProgress(); render(); }
  });

  const params = new URLSearchParams(window.location.search);
  const requestedTopic = params.get("topic");
  const requestedMode = params.get("mode");
  if (requestedTopic && topicById(requestedTopic)) { activeTopic = requestedTopic; view = "topic"; render(); }
  else if (requestedMode === "final") startSession("final");
  else if (requestedMode === "all") startSession("all");
  else render();
})();
