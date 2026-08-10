(() => {
  "use strict";
  const university = window.EnglishUniversityData;
  const catalogs = window.EnglishCatalogs;
  if (!university || !catalogs) return;
  const activities = university.activities;
  const existing = new Set(activities.map((item) => item.id));
  const add = (item) => { if (!existing.has(item.id)) { activities.push(item); existing.add(item.id); } };
  const quiz = (id, skill, level, taskType, prompt, options, answer, explanation) => ({ id, skill, level, mode: "quiz", type: "choice", taskType, instruction: "Choose the option that best fits the context.", prompt, options, answer, explanation, topic: `skill-${skill}` });
  const challenge = (id, skill, level, title, prompt, preparation, checklist, sample) => ({ id, skill, level, mode: "challenge", title, prompt, preparation, checklist, sample, topic: `skill-${skill}` });

  catalogs.vocabularyCatalog.forEach((topic, index) => {
    const [word, collocation, synonym] = topic.entries[0];
    add(quiz(`vocab-domain-${topic.id}`, "vocabulary", topic.level, "Domain retrieval", `Which option is the natural use of “${word}” in the ${topic.title.toLowerCase()} domain?`, [collocation, `do ${word}`, `make a ${synonym}`, `word ${word}ing`], 0, `${collocation} is the natural combination; ${synonym} is a related meaning cue, not a replacement in this sentence.`));
  });

  catalogs.readingLibrary.forEach((text) => {
    add(quiz(`reading-library-${text.id}`, "reading", text.level, "Library inference", `After reading “${text.title}”, which reading skill should you prioritise?`, [text.focus, "Count every word without interpreting it", "Translate each sentence before finding the claim", "Ignore the writer’s choices"], 0, `This text is designed to practise ${text.focus}. Read for the relationship between details and the writer’s purpose.`));
  });

  catalogs.writingCatalog.forEach((brief) => {
    add(challenge(`writing-brief-${brief.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, "writing", brief.level, brief.title, `Complete the ${brief.genre.toLowerCase()} brief: ${brief.title}. Write ${brief.wordLimit}, follow the recommended structure and complete a self-review before comparing your draft with feedback.`, ["Plan the audience and purpose.", `Use the structure: ${brief.structure.join(" → ")}.`, `Include language work on: ${brief.language.join(", ")}.`], ["Word limit respected", "Structure complete", "Audience and register", "Self-review"], "A strong draft makes its purpose visible and gives every paragraph a job."));
  });

  catalogs.speakingSimulations.forEach((simulation) => {
    add(challenge(`speaking-simulation-${simulation.id}`, "speaking", simulation.level, simulation.title, `Run the ${simulation.title.toLowerCase()} simulation. Roles: ${simulation.roles.join(" and ")}. Goal: ${simulation.goal}`, ["Prepare five keywords, not a script.", "Ask at least one follow-up question.", "Finish by summarising the next step."], ["Role maintained", "Interaction", "Useful language", "Follow-up", "Outcome"], "A successful simulation ends with a clear outcome, not only fluent sentences."));
  });

  catalogs.listeningLibrary.forEach((audio) => {
    add(quiz(`listening-library-${audio.id}`, "listening", audio.level, "Library gist", `After listening to “${audio.title}”, what should you identify first?`, [audio.focus, "The speaker’s accent only", "Every function word", "The transcript’s punctuation"], 0, `Start with ${audio.focus}; then replay for supporting details and exact language.`));
  });

  catalogs.pronunciationCatalog.forEach((unit) => {
    add(challenge(`pronunciation-unit-${unit.id}`, "pronunciation", unit.level, unit.title, `Complete the pronunciation unit on ${unit.focus}. ${unit.task}.`, ["Listen or read the model once.", "Record one focused attempt.", "Repeat after identifying one change."], ["Target identified", "First attempt", "Specific adjustment", "Second attempt"], "Pronunciation practice is more effective when each repetition has one observable target."));
  });

  const usedDiagnostic = new Set(university.diagnostic.map((item) => item.id));
  university.levels.forEach((level) => {
    const currentCount = university.diagnostic.filter((item) => item.level === level.id).length;
    const needed = Math.max(0, 6 - currentCount);
    activities.filter((item) => item.level === level.id && item.mode === "quiz").slice(0, needed).forEach((item, index) => {
      const id = `diag-${level.id}-${index + 1}`;
      if (!usedDiagnostic.has(id)) university.diagnostic.push({ ...item, id, instruction: "Diagnostic question: answer without notes.", diagnosticSource: item.id });
    });
  });

  university.levelExams = university.levels.map((level) => ({
    id: `${level.id}-exam`, level: level.id, title: level.exam,
    questions: activities.filter((activity) => activity.level === level.id && activity.mode === "quiz"),
    production: activities.filter((activity) => activity.level === level.id && activity.mode === "challenge").slice(0, 6)
  }));
})();
