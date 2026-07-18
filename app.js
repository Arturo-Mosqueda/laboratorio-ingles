(() => {
  "use strict";

  const { exercises, topicInfo } = window.GrammarLabData;
  const storageKey = "laboratorio-ingles-progress-v1";
  const app = document.querySelector("#app");
  const nav = document.querySelector("#main-nav");
  const menuButton = document.querySelector('[data-action="menu"]');

  let view = "lesson";
  let progress = loadProgress();
  let session = [];
  let current = 0;
  let selected = null;
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
    catch { /* The app remains usable when storage is unavailable. */ }
  }

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  const percent = (correct, total) => total ? Math.round((correct / total) * 100) : 0;
  const mistakes = () => exercises.filter((item) => progress[item.id] && progress[item.id].lastAnswer !== item.answer);

  function createMixedSession() {
    const readings = shuffle(exercises.filter((item) => item.passage)).slice(0, 6);
    const shortQuestions = shuffle(exercises.filter((item) => !item.passage)).slice(0, 14);
    return shuffle([...readings, ...shortQuestions]);
  }

  function lessonSection(number, id, eyebrow, title, body) {
    return `<section class="lesson-section" id="${id}">
      <header class="lesson-section-head"><span>${number}</span><div><small>${eyebrow}</small><h2>${title}</h2></div></header>
      <div class="lesson-body">${body}</div>
    </section>`;
  }

  function grammarCase(form, structure, use, examples, signals = "") {
    return `<div class="grammar-case"><div class="grammar-label"><h3>${form}</h3><code>${structure}</code></div>
      <div class="grammar-detail"><p>${use}</p><div>${examples.map((example) => `<em>${example}</em>`).join("")}</div>
      ${signals ? `<small><strong>Señales:</strong> ${signals}</small>` : ""}</div></div>`;
  }

  function renderLesson() {
    const sections = [
      lessonSection("01", "future-map", "Future forms", "No existe un solo futuro en inglés", `
        <p>El inglés elige la forma futura según <strong>cómo ve el hablante el evento</strong>: decisión inmediata, intención previa, arreglo, horario, proceso, resultado o duración.</p>
        <div class="decision-table">
          <div><strong>Decisión inmediata</strong><code>will + base verb</code><em>The phone is ringing. I’ll answer it.</em></div>
          <div><strong>Intención anterior</strong><code>be going to + base verb</code><em>I’m going to apply for that job.</em></div>
          <div><strong>Arreglo confirmado</strong><code>present continuous</code><em>I’m meeting Laura at six.</em></div>
          <div><strong>Horario oficial</strong><code>present simple</code><em>The train leaves at 7:15.</em></div>
          <div><strong>Acción en progreso</strong><code>will be + verb-ing</code><em>At eight, I’ll be studying.</em></div>
          <div><strong>Resultado completado</strong><code>will have + participle</code><em>By Friday, I’ll have finished.</em></div>
        </div>
        <div class="callout"><strong>Pregunta mental útil</strong><p>¿Es una decisión, intención, arreglo, horario, proceso, resultado o duración?</p></div>`),
      lessonSection("02", "present-future", "Present tenses for future", "El presente también puede hablar del futuro", `
        ${grammarCase("Present continuous", "am / is / are + verb-ing", "Arreglos personales ya organizados; suele existir una cita, reserva, hora o lugar.", ["I’m seeing the dentist on Thursday.", "We’re flying to Monterrey tomorrow."], "tomorrow, tonight, at 4 p.m.")}
        ${grammarCase("Present simple", "base verb / verb-s", "Horarios, programas y eventos controlados por una organización.", ["The lecture starts at nine.", "My flight lands at 18:20."], "timetables, itineraries, schedules")}`),
      lessonSection("03", "will-going", "Prediction & intention", "Will y be going to", `
        ${grammarCase("Will", "will / won’t + base verb", "Decisiones espontáneas, ofrecimientos, promesas y predicciones basadas en opinión.", ["I’ll carry that box for you.", "I think AI will change education."], "I think, probably, I expect")}
        ${grammarCase("Be going to", "am / is / are going to + verb", "Intenciones decididas antes de hablar y predicciones basadas en evidencia presente.", ["I’m going to learn Portuguese.", "Look at those clouds. It’s going to rain."], "I’ve decided, look!, visible evidence")}`),
      lessonSection("04", "continuous", "Future continuous", "Una acción en progreso en el futuro", `
        ${grammarCase("Future continuous", "will be + verb-ing", "Muestra una actividad en desarrollo en un momento futuro y permite preguntar por planes con cortesía.", ["This time tomorrow, I’ll be taking my exam.", "Will you be using the car this afternoon?"], "this time tomorrow, at 8 p.m.")}
        <div class="callout warning"><strong>Verbos de estado</strong><p>Normalmente no usamos formas continuas con know, believe, own, need o want.</p></div>`),
      lessonSection("05", "perfect", "Perfect futures", "Resultado o duración antes de un punto futuro", `
        ${grammarCase("Future perfect simple", "will have + past participle", "Una acción estará terminada antes de una fecha o evento futuro; importa el resultado.", ["By Friday, we’ll have completed the design.", "She’ll have left before you arrive."], "by, by the time, before")}
        ${grammarCase("Future perfect continuous", "will have been + verb-ing", "Indica cuánto tiempo habrá durado una actividad hasta un punto futuro.", ["By June, I’ll have been studying English for two years."], "by + future point + for + duration")}`),
      lessonSection("06", "time-clauses", "Future time clauses", "Después de when no usamos will", `
        <p><strong>When, as soon as, before, after, until, once, while</strong> y <strong>by the time</strong> introducen cláusulas temporales. Aunque hablen del futuro, normalmente usan presente.</p>
        <div class="formula-box"><code>future main clause</code><span>+</span><code>when / until + present form</code></div>
        <div class="example-stack"><p><span>✓</span> I’ll call you when I <strong>arrive</strong>.</p><p><span>✓</span> We won’t leave until everyone <strong>is</strong> ready.</p><p class="bad"><span>×</span> I’ll call you when I <strong>will arrive</strong>.</p></div>`),
      lessonSection("07", "determiners", "Determiners", "Palabras que delimitan un sustantivo", `
        <p>Los determinantes indican <strong>cuál, de quién, cuántos o qué proporción</strong>. No acumulamos determinantes centrales: decimos “my book” o “the book”, no “the my book”.</p>
        <div class="family-grid"><div><strong>Articles</strong><span>a, an, the, zero article</span></div><div><strong>Demonstratives</strong><span>this, that, these, those</span></div><div><strong>Possessives</strong><span>my, your, his, her, our, their</span></div><div><strong>Interrogatives</strong><span>which, what, whose</span></div><div><strong>Distributives</strong><span>each, every, both, either, neither</span></div><div><strong>Quantifiers</strong><span>some, any, much, many, enough…</span></div></div>`),
      lessonSection("08", "articles", "Articles", "A/an, the y zero article", `
        ${grammarCase("A / an", "a + consonant sound · an + vowel sound", "Presenta un sustantivo contable singular no identificado previamente. Importa el sonido, no la letra.", ["a university", "an hour", "an architect"])}
        ${grammarCase("The", "the + specific noun", "Señala algo identificable, ya mencionado o único en el contexto.", ["the report you sent", "the Pacific", "the best option"])}
        ${grammarCase("Zero article", "—", "Generalizaciones con plurales e incontables, comidas, idiomas y varias instituciones en su función principal.", ["Technology changes quickly.", "We have lunch at one."])} `),
      lessonSection("09", "distributives", "Distributives", "Each, every, all, both, either y neither", `
        <div class="rule-table"><div><strong>each</strong><span>uno por uno</span><code>Each student has a locker.</code></div><div><strong>every</strong><span>todos individualmente</span><code>Every room has a window.</code></div><div><strong>both</strong><span>los dos</span><code>Both answers are correct.</code></div><div><strong>either</strong><span>cualquiera de dos</span><code>Either route is fine.</code></div><div><strong>neither</strong><span>ninguno de dos</span><code>Neither option works.</code></div></div>`),
      lessonSection("10", "quantifiers", "Quantifiers", "La cantidad depende del tipo de sustantivo", `
        <div class="quantifier-table"><div class="table-head"><span>Contables</span><span>Incontables</span><span>Ambos</span></div><div><span>many, a few, few</span><span>much, a little, little</span><span>some, any, enough, a lot of</span></div></div>
        ${grammarCase("Few / little", "few + plural · little + uncountable", "Sin “a” suelen transmitir una cantidad insuficiente; con “a”, una cantidad pequeña pero útil.", ["Few students passed.", "A few students passed.", "We have little time."])}
        <div class="callout"><strong>Concordancia</strong><p>Los incontables llevan verbo singular: “The information is useful”.</p></div>`)
    ].join("");

    app.innerHTML = `<div class="lesson-page"><section class="lesson-hero"><span class="eyebrow">Guía completa · B2 inicial</span>
      <h1>Future forms<br><em>&amp; determiners</em></h1><p>Aprende a elegir la estructura correcta según la intención, evidencia, horario, duración, especificidad y cantidad.</p>
      <div class="lesson-meta"><span>8 formas de futuro</span><span>6 familias de determinantes</span><span>76 ejercicios</span></div></section>
      <div class="lesson-layout"><aside class="lesson-toc"><span>En esta lección</span>
      ${[["future-map","1. Mapa del futuro"],["present-future","2. Present tenses"],["will-going","3. Will vs. going to"],["continuous","4. Future continuous"],["perfect","5. Future perfect"],["time-clauses","6. Time clauses"],["determiners","7. Determiners"],["articles","8. Articles"],["distributives","9. Distributives"],["quantifiers","10. Quantifiers"]].map(([id, label]) => `<a href="#${id}">${label}</a>`).join("")}
      <button class="primary" type="button" data-action="practice">Practicar todo →</button></aside><article class="lesson-content">${sections}
      <section class="lesson-finish"><span class="eyebrow">Ahora sí: aplicación</span><h2>Practica las reglas mezcladas</h2><p>Cada sesión combina 20 preguntas, incluidas seis dentro de lecturas.</p><button class="primary" type="button" data-action="practice">Comenzar práctica mixta →</button></section>
      </article></div></div>`;
  }

  function startPractice(onlyMistakes = false) {
    session = onlyMistakes ? shuffle(mistakes()) : createMixedSession();
    current = 0; selected = null; answered = false; sessionCorrect = 0; sessionDone = false;
    view = "practice"; closeMenu(); render();
  }

  function renderPractice() {
    if (!session.length) {
      app.innerHTML = `<section class="practice-page"><div class="empty-state"><span>✓</span><h2>No hay errores pendientes</h2><p>Haz una práctica mixta para generar un nuevo registro.</p><button class="primary" data-action="practice">Iniciar práctica mixta</button></div></section>`;
      return;
    }
    if (sessionDone) {
      const score = percent(sessionCorrect, session.length);
      const totals = Object.values(progress).reduce((sum, item) => ({ attempts: sum.attempts + item.attempts, correct: sum.correct + item.correct }), { attempts: 0, correct: 0 });
      app.innerHTML = `<section class="practice-page"><div class="results-card"><span class="eyebrow">Sesión completada</span><div class="result-score">${score}<sup>%</sup></div><h2>${score >= 80 ? "¡Muy buen dominio!" : score >= 60 ? "Vas por buen camino" : "Vuelve a la explicación"}</h2><p>Acertaste <strong>${sessionCorrect}</strong> de <strong>${session.length}</strong>. Precisión histórica: <strong>${percent(totals.correct, totals.attempts)}%</strong>.</p><div class="result-actions">${mistakes().length ? '<button class="primary" data-action="review">Repasar errores</button>' : ""}<button class="secondary" data-action="practice">Nueva sesión</button><button class="text-button" data-action="lesson">Volver a la explicación</button></div></div></section>`;
      return;
    }

    const exercise = session[current];
    const progressWidth = ((current + (answered ? 1 : 0)) / session.length) * 100;
    const options = exercise.options.map((option, index) => {
      let state = selected === index ? "selected" : "";
      if (answered && index === exercise.answer) state = "correct";
      else if (answered && index === selected) state = "wrong";
      const status = answered && index === exercise.answer ? "✓" : answered && index === selected ? "×" : "";
      return `<button class="answer ${state}" type="button" data-option="${index}" role="radio" aria-checked="${selected === index}" ${answered ? "disabled" : ""}><span class="answer-letter">${String.fromCharCode(65 + index)}</span><span>${escapeHtml(option)}</span><span class="answer-status">${status}</span></button>`;
    }).join("");

    app.innerHTML = `<section class="practice-page"><div class="quiz-layout"><aside class="quiz-sidebar"><button class="back-link" data-action="lesson">← Volver a la explicación</button><span class="eyebrow">Todos los temas</span><h2>Práctica mixta</h2><div class="session-stat"><span>Progreso</span><strong>${current + 1} / ${session.length}</strong></div><div class="progress-track"><span style="width:${progressWidth}%"></span></div><div class="session-stat"><span>Aciertos</span><strong>${sessionCorrect}</strong></div><p class="sidebar-tip"><strong>Estrategia:</strong> identifica primero el contexto y después la regla.</p></aside>
      <article class="question-card ${exercise.passage ? "reading-question" : ""}"><div class="question-meta"><span class="topic-pill">${exercise.passage ? "Reading · mixed grammar" : `${topicInfo[exercise.topic].icon} ${topicInfo[exercise.topic].title}`}</span><span>${exercise.level === "bridge" ? "B2" : "B1+ → B2"}</span></div>
      ${exercise.passage ? `<div class="reading-box"><span>Lectura</span><h3>${escapeHtml(exercise.passageTitle)}</h3><p>${escapeHtml(exercise.passage)}</p></div>` : ""}<p class="instruction">${escapeHtml(exercise.instruction)}</p><h2>${escapeHtml(exercise.prompt)}</h2><div class="answers" role="radiogroup" aria-label="Opciones de respuesta">${options}</div>
      ${answered ? `<div class="feedback ${selected === exercise.answer ? "success" : "error"}" aria-live="polite"><div class="feedback-title"><span>${selected === exercise.answer ? "✓" : "!"}</span><strong>${selected === exercise.answer ? "Correcto" : "Todavía no"}</strong></div><p>${escapeHtml(exercise.explanation)}</p>${exercise.tip ? `<small><strong>Recuerda:</strong> ${escapeHtml(exercise.tip)}</small>` : ""}</div>` : ""}
      <div class="question-actions">${answered ? `<button class="primary" data-action="next">${current === session.length - 1 ? "Ver resultados" : "Siguiente pregunta →"}</button>` : `<button class="primary" data-action="submit" ${selected === null ? "disabled" : ""}>Comprobar respuesta</button>`}</div></article></div></section>`;
  }

  function renderMistakes() {
    const items = mistakes();
    app.innerHTML = `<section class="content-page"><div class="page-heading"><span class="eyebrow">Repetición inteligente</span><h1>Mis errores</h1><p>Una pregunta desaparece cuando la contestas correctamente.</p></div>${items.length ? `<div class="mistake-summary"><div><strong>${items.length}</strong><span>preguntas por dominar</span></div><button class="primary" data-action="review">Practicar estos errores</button></div><div class="mistake-list">${items.map((item) => `<article><span>${item.passage ? "R" : escapeHtml(topicInfo[item.topic].icon)}</span><div><small>${item.passage ? "Reading · mixed grammar" : escapeHtml(topicInfo[item.topic].title)}</small><p>${escapeHtml(item.prompt)}</p></div><strong>${escapeHtml(item.options[item.answer])}</strong></article>`).join("")}</div>` : `<div class="empty-state"><span>✓</span><h2>Todo limpio</h2><p>No tienes errores pendientes.</p><button class="primary" data-action="practice">Iniciar práctica mixta</button></div>`}</section>`;
  }

  function updateChrome() {
    document.querySelectorAll("#main-nav [data-action]").forEach((button) => button.classList.toggle("active", button.dataset.action === view));
    document.querySelector(".nav-count").textContent = mistakes().length;
  }

  function render() {
    if (view === "lesson") renderLesson();
    else if (view === "practice") renderPractice();
    else renderMistakes();
    updateChrome();
  }

  function navigate(nextView) {
    view = nextView; closeMenu(); render();
    window.scrollTo({ top: 0, behavior: "smooth" });
    app.focus({ preventScroll: true });
  }

  function closeMenu() {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }

  document.addEventListener("click", (event) => {
    const option = event.target.closest("[data-option]");
    if (option && !answered) { selected = Number(option.dataset.option); renderPractice(); return; }
    const control = event.target.closest("[data-action]");
    if (!control) return;
    const action = control.dataset.action;
    if (action === "menu") {
      const open = nav.classList.toggle("open"); menuButton.setAttribute("aria-expanded", String(open)); return;
    }
    if (action === "lesson" || action === "mistakes") { navigate(action); return; }
    if (action === "practice") { startPractice(); return; }
    if (action === "review") { startPractice(true); return; }
    if (action === "submit" && selected !== null && !answered) {
      const exercise = session[current]; const correct = selected === exercise.answer;
      const old = progress[exercise.id] || { attempts: 0, correct: 0 };
      progress[exercise.id] = { attempts: old.attempts + 1, correct: old.correct + (correct ? 1 : 0), lastAnswer: selected };
      if (correct) sessionCorrect += 1; answered = true; saveProgress(); render(); return;
    }
    if (action === "next") {
      if (current === session.length - 1) sessionDone = true;
      else { current += 1; selected = null; answered = false; }
      render(); return;
    }
    if (action === "reset" && window.confirm("¿Quieres borrar todo tu progreso y tus errores guardados?")) {
      progress = {}; saveProgress(); render();
    }
  });

  const initialView = new URLSearchParams(window.location.search).get("view");
  if (initialView === "practice") startPractice();
  else if (initialView === "mistakes") { view = "mistakes"; render(); }
  else render();
})();
