(() => {
  "use strict";
  const university = window.EnglishUniversityData;
  const catalogs = window.EnglishCatalogs;
  if (!university || !catalogs) return;
  const activities = university.activities;
  const existing = new Set(activities.map((item) => item.id));
  const slug = (value) => String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const add = (item) => { if (item && !existing.has(item.id)) { activities.push(item); existing.add(item.id); } };
  const choice = (id, skill, level, taskType, prompt, options, answer, explanation, extra = {}) => ({ id, skill, level, mode: "quiz", type: "choice", taskType, instruction: extra.instruction || "Choose the option that best fits the context.", prompt, options, answer, explanation, topic: `skill-${skill}`, ...extra });
  const challenge = (id, skill, level, title, prompt, preparation, checklist, sample, extra = {}) => ({ id, skill, level, mode: "challenge", title, prompt, preparation, checklist, sample, topic: `skill-${skill}`, ...extra });
  const levelCode = (id) => university.levels.find((level) => level.id === id)?.code || id;

  const readingExtra = [
    ["evidence", "Which detail would count as evidence for the text’s main point?", (text) => `A detail that directly supports ${text.focus}`, ["A detail chosen only because it is vivid", "A personal reaction with no reference", "A dictionary definition unrelated to the passage"]],
    ["sequence", "How should you organise the information while reading?", () => "Track the movement from situation to development to implication", ["Read every sentence as a separate fact", "Ignore shifts signalled by linkers", "Start by translating the final adjective"]],
    ["reference", "What should you check when a pronoun or linker refers back?", () => "The previous idea that makes the relationship coherent", ["The nearest word regardless of meaning", "The title only", "A word from another paragraph"]],
    ["paraphrase", "Which is the best way to paraphrase a key sentence?", () => "Keep the claim and relationship while changing structure and vocabulary", ["Replace every word with a synonym", "Copy the sentence and change punctuation", "Remove the qualification"]],
    ["heading", "Which heading would best guide a second reading?", (text) => `Purpose and evidence: ${text.focus}`, ["Words with five letters", "Everything the reader already knows", "A topic unrelated to the author’s concern"]],
    ["counterexample", "What would challenge a broad interpretation of the text?", () => "A plausible case where the stated pattern does not apply", ["A spelling correction", "A longer title", "A reaction that supplies no reason"]],
    ["audience", "What can the intended audience help you infer?", () => "Which background knowledge and degree of explanation the writer expects", ["The exact truth of every claim", "The number of words in each sentence", "Whether evidence is unnecessary"]],
    ["transfer", "How could you transfer the reading strategy to a new text?", () => "Ask the same questions about purpose, evidence, tone and omitted perspectives", ["Use the same answer for every text", "Ignore genre and audience", "Look only for identical vocabulary"]]
  ];
  catalogs.readingLibrary.forEach((text) => readingExtra.forEach(([variant, prompt, correct, wrongs]) => add(choice(`depth-reading-${slug(text.id)}-${variant}`, "reading", text.level, `Reading ${variant}`, `${prompt} Apply it to “${text.title}”.`, [correct(text), ...wrongs], 0, `The passage focuses on ${text.focus}; return to its wording and explain the evidence for your decision.`, { passageTitle: text.title, passage: text.text, instruction: "Read for meaning, locate the relevant evidence and then answer." }))));

  const listeningExtra = [
    ["prediction", "What can you predict before listening?", (audio) => `The likely focus: ${audio.focus}`, ["Every exact word", "The speaker’s private thoughts", "The punctuation of the transcript"]],
    ["sequence", "What should you do on a second listen?", () => "Check the order of points and the linkers that connect them", ["Start translating from the last word", "Ignore transitions", "Write down only articles"]],
    ["number", "How can you avoid missing a number, name or qualification?", () => "Listen for the surrounding phrase and replay with a precise question", ["Guess from the first sound", "Assume every number is a result", "Use the transcript before hearing the message"]],
    ["repair", "What is a useful response when one phrase is unclear?", () => "Keep the overall meaning, mark uncertainty and use the context on replay", ["Stop the task permanently", "Invent a confident detail", "Ignore the whole paragraph"]],
    ["speaker-goal", "Which clue can reveal the speaker’s goal?", () => "Requests, recommendations, contrasts and the action expected next", ["The recording length alone", "Every repeated article", "The file name"]],
    ["reductions", "How should you handle reduced speech?", () => "Listen for stressed content words and use the surrounding grammar to reconstruct the phrase", ["Expect every word to be fully pronounced", "Treat reductions as missing information", "Focus only on pauses"]],
    ["comparison", "What makes two speakers’ views different?", () => "Compare their claims, evidence, certainty and evaluative language", ["Their speaking speed only", "The number of turns", "Whether both use the same article"]],
    ["transfer", "How can this listening strategy transfer to a lecture or meeting?", () => "Track purpose, decisions, evidence and unresolved questions", ["Memorise isolated words", "Ignore who will act next", "Write the transcript from memory"]]
  ];
  catalogs.listeningLibrary.forEach((audio) => listeningExtra.forEach(([variant, prompt, correct, wrongs]) => add(choice(`depth-listening-${slug(audio.id)}-${variant}`, "listening", audio.level, `Listening ${variant}`, `${prompt} Use “${audio.title}” as the model.`, [correct(audio), ...wrongs], 0, `Listen first for ${audio.focus}, then replay for the detail or relationship in the question.`, { transcript: audio.transcript, audioTitle: audio.title, instruction: "Listen once without reading, then answer and replay if needed." }))));

  const pronunciationExtra = [
    ["minimal-pair", "What makes a minimal-pair comparison useful?", () => "It isolates one sound contrast while keeping the rest of the word similar", ["It changes every syllable", "It removes the need to listen", "It measures spelling only"]],
    ["vowel-length", "What should you compare when a vowel contrast is difficult?", () => "Tongue position, length, lip shape and the surrounding consonants", ["Only the written letter", "The speaker’s job", "The number of syllables in a sentence"]],
    ["consonant", "What helps a learner adjust a consonant?", () => "Identify place, manner and voicing, then record one focused contrast", ["Speak faster without a model", "Change the whole sentence", "Avoid listening to feedback"]],
    ["sentence-stress", "Why does sentence stress matter for meaning?", () => "Moving the prominent word can change contrast, correction or what is new", ["It makes all words equal", "It changes the spelling", "It removes intonation"]],
    ["weak-form", "Which words are most likely to reduce in connected speech?", () => "Predictable function words that are not carrying the main contrast", ["Every content word", "The key noun in a correction", "The only stressed word"]],
    ["pause", "How can a pause support a complex explanation?", () => "It groups ideas and gives the listener time to process the next relationship", ["It replaces a verb", "It proves the claim", "It makes every word prominent"]],
    ["repair", "What is the best response to an unintelligible recording of yourself?", () => "Choose one observable target, repeat and compare the two attempts", ["Change everything at once", "Delete the recording", "Speak with no model"]],
    ["transfer", "How can pronunciation work support speaking?", () => "It improves the listener’s access to focus, stance and connected meaning", ["It replaces vocabulary", "It removes the need for interaction", "It makes grammar irrelevant"]]
  ];
  catalogs.pronunciationCatalog.forEach((unit) => pronunciationExtra.forEach(([variant, prompt, correct, wrongs]) => add(choice(`depth-pronunciation-${slug(unit.id)}-${variant}`, "pronunciation", unit.level, `Pronunciation ${variant}`, `${prompt} Target: ${unit.focus}.`, [correct(), ...wrongs], 0, `${unit.task} Keep one target per repetition and judge success by intelligibility and listener effect.`))));

  const criticalExtra = [
    ["scope", "What question checks the scope of a claim?", () => "Does the evidence justify the same generality, time period and population?", ["Is the sentence short?", "Does the claim sound confident?", "Is the title memorable?"]],
    ["source", "What should you ask about a source?", () => "Who produced it, for what purpose and with what access to evidence?", ["Whether it uses a large font", "Whether the reader likes it", "Whether it has no limitations"]],
    ["causation", "What distinguishes correlation from causation?", () => "A relationship does not by itself show which factor caused the outcome", ["Causation always needs a longer title", "Correlation is never useful", "Any sequence proves a cause"]],
    ["alternative", "What is an alternative explanation?", () => "Another plausible reason for the same evidence or outcome", ["A synonym for the conclusion", "A personal insult", "A repeated headline"]],
    ["certainty", "How should a reader interpret a hedged claim?", () => "As a claim whose strength is deliberately limited by the evidence", ["As proof of everything", "As a sentence with no meaning", "As a command"]],
    ["fairness", "What makes a summary fair?", () => "It represents the source’s main reasoning before evaluating it", ["It removes every qualification", "It attacks the writer", "It copies only the preferred sentence"]],
    ["decision", "What makes critical thinking useful in a practical decision?", () => "It compares evidence, assumptions, consequences and competing priorities", ["It delays every decision forever", "It chooses the longest argument", "It avoids uncertainty"]],
    ["reflection", "What should you do after finding a strong objection?", () => "Revise the claim, evidence or scope instead of pretending the objection is absent", ["Delete the objection", "Repeat the slogan", "Change the subject"]]
  ];
  catalogs.readingLibrary.forEach((text) => criticalExtra.forEach(([variant, prompt, correct, wrongs]) => add(choice(`depth-critical-${slug(text.id)}-${variant}`, "critical-thinking", text.level, `Critical thinking ${variant}`, `${prompt} Apply the question to “${text.title}”.`, [correct(), ...wrongs], 0, `The text offers a context for examining ${text.focus}; support your decision with a specific detail.`, { passageTitle: text.title, passage: text.text, instruction: "Read critically: identify the claim or reasoning before choosing." }))));

  const useExtra = [
    ["word-formation", "The committee questioned the long-term ___ of the plan. (SUSTAIN)", ["sustainability", "sustainable", "sustainably", "sustainer"], 0, "The noun sustainability names the quality being questioned."],
    ["transformation", "Choose the closest meaning to: ‘The technician repaired the server.’", ["I had the server repaired.", "I had repaired the technician.", "The server had repairing.", "I made the server repair."], 0, "Have something done describes arranging for another person to perform the service."],
    ["error", "Choose the corrected sentence: ‘She suggested to postpone the meeting.’", ["She suggested postponing the meeting.", "She suggested to postponing the meeting.", "She suggested postpone the meeting.", "She suggested that postponing to meeting."], 0, "Suggest is followed by a gerund or a that-clause, not normally by to + infinitive."],
    ["collocation", "The evidence casts ___ on the original explanation.", ["doubt", "questioning", "uncertaintying", "suspicioning"], 0, "Cast doubt on is the natural collocation."],
    ["phrasal", "The team had to ___ the launch because a safety check was incomplete.", ["put off", "put up", "put through", "put out"], 0, "Put off means postpone."],
    ["idiom", "After the first design failed, the engineers returned to the ___.", ["drawing board", "drawing room", "drawing line", "drawing point"], 0, "Return to the drawing board means start planning again."],
    ["register", "Choose the most suitable formal sentence.", ["We regret to inform you that the appointment must be rescheduled.", "Hey, we have to move your thing.", "Your appointment is kinda messed up.", "Yo, the time is off."], 0, "The first option is precise, polite and appropriate for formal correspondence."],
    ["open-cloze", "The proposal was rejected ___ the evidence did not address the central risk.", ["because", "despite", "unless", "whereas"], 0, "Because introduces the reason for rejection."],
    ["sentence-completion", "Complete the sentence with the most precise ending: ‘The review recommends that…’", ["the procedure be repeated with a larger sample.", "the procedure repeating to a sample.", "repeat the procedure to be larger.", "the sample has procedure repeat."], 0, "Recommend that can introduce a formal that-clause; the first completion is grammatical and precise."],
    ["multiple-choice-cloze", "The findings were useful, ___ they could not answer the wider policy question.", ["although", "because of", "unless of", "despite of"], 0, "Although introduces a concession before a clause and completes the multiple-choice cloze naturally."]
  ];
  university.levels.forEach((level) => useExtra.forEach(([variant, prompt, options, answer, explanation], index) => add(choice(`depth-use-${level.id}-${variant}-${index + 1}`, "use-of-english", level.id, variant === "sentence-completion" ? "Sentence completion" : variant === "multiple-choice-cloze" ? "Multiple-choice cloze" : `Use of English ${variant}`, prompt, options, answer, explanation))));

  const writingExtra = [
    ["time-box", "Complete the brief in one focused draft, then spend five minutes revising only the opening and conclusion.", "Time-boxed revision"],
    ["counterpoint", "Add one fair counterpoint and respond to it without losing the main purpose of the genre.", "Counterpoint handled"],
    ["concise", "Draft the brief, then reduce ten words or phrases that repeat information without changing the meaning.", "Concise revision"],
    ["cohesion", "Use a deliberate reference chain and three linkers to make the relationship between paragraphs easy to follow.", "Cohesion checked"],
    ["feedback", "Ask a partner or teacher for one question about your draft, answer it in a revision note and improve the relevant sentence.", "Feedback applied"],
    ["genre-shift", "Write the brief once, then adapt the same information to a different register or audience in a short second version.", "Genre shift explained"],
    ["precision", "Replace five vague words with precise nouns or verbs, then check that the new choices keep the intended tone.", "Lexical precision"],
    ["cohesive-summary", "Write a two-sentence summary of your own draft that preserves its claim, evidence and limitation.", "Self-summary"],
    ["sentence-control", "Combine two short sentences in three different ways and choose the version that makes the relationship clearest.", "Sentence control"],
    ["reader-test", "Read the draft aloud as if you were the intended reader and note one place where the next action or conclusion is unclear.", "Reader test"]
  ];
  catalogs.writingCatalog.forEach((brief) => writingExtra.forEach(([variant, prompt, check]) => add(challenge(`depth-writing-${slug(brief.title)}-${variant}`, "writing", brief.level, `${brief.title} — ${variant.replace(/-/g, " ")}`, `${prompt} ${brief.title} remains the central brief: write ${brief.wordLimit}, follow ${brief.structure.join(" → ")} and use ${brief.language.join(", ")}.`, ["Clarify audience and purpose.", `Plan ${brief.structure.join(" → ")}.`, "Draft before comparing with model guidance."], [check, "Word limit", "Structure", "Register", "Self-review"], `A strong ${brief.genre.toLowerCase()} makes a deliberate choice about audience, evidence, organisation and language.`, { wordLimit: brief.wordLimit, recommendedStructure: brief.structure, usefulLanguage: brief.language, modelAnswer: `Model guidance: make the audience and purpose visible, use ${brief.language.join(", ")}, support the main points and revise for clarity before comparing your response.` }))));

  const speakingExtra = [
    ["warm-up", "Start with a 20-second context statement before the interaction begins.", "Context established"],
    ["clarification", "Ask the other person to clarify one detail, then reformulate your understanding before responding.", "Clarification and reformulation"],
    ["turn-taking", "Invite another view, acknowledge it and take the turn back with a clear signpost.", "Turn-taking"],
    ["repair", "When you lose a word, paraphrase it and continue rather than restarting the whole answer.", "Communication repair"],
    ["counterargument", "Respond to a reasonable challenge by conceding one point and defending a narrower claim.", "Counterargument"],
    ["improvise", "Add one unexpected constraint to the simulation and reach an outcome with the information available.", "Improvisation"],
    ["precision", "Repeat your most important sentence with one more precise collocation and explain the improvement.", "Lexical precision"],
    ["listener", "Adapt one explanation for a specialist and a non-specialist listener without changing the central message.", "Audience adaptation"],
    ["stance", "Say the same recommendation as enthusiastic, cautious and firmly corrective; explain the listener effect.", "Stance control"],
    ["reflection", "After the simulation, identify one successful turn, one missed opportunity and one next experiment.", "Interaction reflection"]
  ];
  catalogs.speakingSimulations.forEach((simulation) => speakingExtra.forEach(([variant, prompt, check]) => add(challenge(`depth-speaking-${slug(simulation.id)}-${variant}`, "speaking", simulation.level, `${simulation.title} — ${variant.replace(/-/g, " ")}`, `${prompt} Roles: ${simulation.roles.join(" and ")}. Goal: ${simulation.goal}`, ["Prepare keywords, not a script.", "Keep the role and purpose visible.", "Ask and answer at least one follow-up."], [check, "Role maintained", "Interaction", "Useful language", "Outcome"], "A successful simulation balances fluency with listening, repair, precision and a clear outcome.", { voicePrompt: `Run this speaking simulation with me: ${simulation.title}. Roles: ${simulation.roles.join(" and ")}. Goal: ${simulation.goal}. Add this focus: ${prompt} Ask one follow-up at a time, wait for my answer, correct one high-value issue after each turn, and finish with feedback on interaction, fluency and natural language.` }))));

  const fluencyExtra = [
    ["sequence", "Explain a routine using at least six sequence markers and no restart."],
    ["cause", "Describe a problem, explain two possible causes and choose the most likely one."],
    ["effect", "Explain a change and trace three consequences for different people."],
    ["example", "Give a general opinion, then support it with two specific examples."],
    ["qualification", "Make a strong claim, then soften it so it matches the available evidence."],
    ["analogy", "Explain a difficult idea through an analogy and state where the analogy stops working."],
    ["question", "Answer an unexpected why question by thinking aloud and organising your response."],
    ["decision", "Compare three options and make a recommendation under one stated condition."],
    ["story", "Tell a short story with a background, turning point, consequence and reflection."],
    ["summary", "Summarise a conversation without quoting every detail; preserve the disagreement."],
    ["definition", "Define a technical term for a beginner, then use it in a natural sentence."],
    ["perspective", "Explain the same event from two participants’ perspectives without confusing facts and interpretations."],
    ["repair", "Speak for 90 seconds while deliberately recovering from three missing words through paraphrase."],
    ["linking", "Give a structured answer using concession, cause, result and a final recommendation."],
    ["speed-change", "Give the same answer in 30 seconds and two minutes; explain what you selected or removed."],
    ["listener-check", "Explain a process and ask one question that checks whether the listener followed it."],
    ["stance-shift", "Present one idea as certain, probable and speculative by changing your language and intonation."],
    ["reflection", "Review a recording and repeat the least clear section with a more economical structure."]
  ];
  university.levels.forEach((level) => fluencyExtra.forEach(([variant, prompt]) => add(challenge(`depth-fluency-${level.id}-${variant}`, "fluency", level.id, `${levelCode(level.id)} fluency: ${variant}`, prompt, ["Prepare five keywords.", "Keep communicating if a word is missing.", "Record a first and second attempt."], ["Target time", "Structure", "Recovery", "Second attempt", "Reflection"], "Fluency is the ability to keep meaning moving while planning, retrieving and repairing language.", { timerSeconds: level.id === "b1-plus" ? 45 : 90 }))));

  const thinkingExtra = [
    ["category", "Choose a word and explain its category, function, typical context and one non-example."],
    ["contrast", "Explain the difference between two near-synonyms through a pair of contrasting situations."],
    ["collocation", "Choose a useful word and build five collocations, then connect them in a short explanation."],
    ["image", "Describe an unfamiliar image without naming the central object; let the listener infer it."],
    ["process", "Explain how something works without using the verb normally associated with it."],
    ["analogy", "Use an analogy to explain an abstract concept and identify one limitation of the analogy."],
    ["definition", "Define a difficult adjective without translation and show how its connotation changes in a sentence."],
    ["paraphrase", "Paraphrase a sentence three ways: neutral, formal and conversational."],
    ["register", "Take one idea and make it suitable for a friend, a colleague and an academic audience."],
    ["circumlocution", "Describe a word you cannot recall by category, purpose, appearance and contrast."],
    ["word-family", "Build a word family and place each form into an original sentence with the correct grammar."],
    ["retrieval", "Retrieve eight words from a recent unit and use them in one coherent story."],
    ["questioning", "Turn an unfamiliar claim into three questions that reveal its meaning and assumptions."],
    ["explain", "Explain a familiar object to someone who has never seen it, checking understanding twice."],
    ["precision", "Replace vague words in a short paragraph with choices that show degree and register."],
    ["translation-resist", "Describe a difficult idea without translating it; use examples and boundaries instead."],
    ["listener", "Define a term, ask the listener to paraphrase it and repair any misunderstanding."],
    ["reflection", "Review a definition and identify which part was unclear, too broad or too dependent on translation."]
  ];
  university.levels.forEach((level) => thinkingExtra.forEach(([variant, prompt]) => add(challenge(`depth-thinking-${level.id}-${variant}`, "english-thinking", level.id, `${levelCode(level.id)} English thinking: ${variant}`, prompt, ["Use English examples, not translation.", "Make the boundary of the meaning clear.", "Record and revise one explanation."], ["No translation", "Meaning", "Example", "Boundary", "Revision"], "English thinking grows through retrieval, definition, paraphrase and interaction with meaning rather than word-for-word substitution.", { voicePrompt: `Coach this English-thinking activity with me: ${prompt} Do not translate. Ask me to explain, give examples and repair unclear meaning, then give feedback on precision and natural phrasing.` }))));

  const academicExtra = [
    "research-question", "method-limitation", "reporting-verbs", "hedged-claim", "synthesis", "counterclaim", "seminar-turn", "source-evaluation", "lecture-outline", "data-commentary", "abstract-revision", "formal-definition", "academic-collocation", "critical-summary", "problem-solution", "literature-link", "qualification", "evidence-chain", "presentation-opening", "question-response", "conclusion", "paraphrase-source"
  ];
  const academicPrompts = {
    "research-question": "Turn a broad topic into a focused research question and explain why its scope is manageable.",
    "method-limitation": "Describe a possible method and one limitation without presenting the limitation as a failure.",
    "reporting-verbs": "Report an idea from a source using two verbs that show different degrees of agreement or distance.",
    "hedged-claim": "Rewrite a strong claim so that its certainty and scope match the evidence available.",
    "synthesis": "Combine two related ideas into one paragraph and state the relationship you have created.",
    "counterclaim": "Present a serious counterclaim, respond to it fairly and return to a narrower conclusion.",
    "seminar-turn": "Enter an academic discussion by connecting another speaker’s point to evidence and adding a distinction.",
    "source-evaluation": "Evaluate a source’s authority, purpose, evidence and limitation before using it.",
    "lecture-outline": "Turn a lecture or article into a heading outline with claims, evidence and implications.",
    "data-commentary": "Describe a trend in data, qualify the interpretation and avoid claiming more than the graph shows.",
    "abstract-revision": "Revise an abstract so the aim, method, result and limitation are all visible in a compact structure.",
    "formal-definition": "Define a specialist term for an academic reader and show its boundary through an example.",
    "academic-collocation": "Build a set of academic collocations around one key noun and use them in a paragraph.",
    "critical-summary": "Summarise an argument while preserving its qualifications, then add one sentence of evaluation.",
    "problem-solution": "Present a problem, explain its causes, compare two responses and recommend one with a condition.",
    "literature-link": "Connect two sources through agreement, contrast or a gap rather than listing them separately.",
    "qualification": "Add a qualification that makes a conclusion more defensible without making it meaningless.",
    "evidence-chain": "Trace the chain from observation to interpretation to conclusion and identify the weakest link.",
    "presentation-opening": "Open a short academic presentation with a question, relevance and a clear roadmap.",
    "question-response": "Answer a challenging academic question by clarifying its terms before giving a qualified response.",
    "conclusion": "Write or say a conclusion that returns to the question, synthesises evidence and states a limit.",
    "paraphrase-source": "Paraphrase a source accurately, attribute it and explain how it supports your own point."
  };
  university.levels.filter((level) => level.id !== "b1-plus").forEach((level) => academicExtra.forEach((variant) => add(challenge(`depth-academic-${level.id}-${variant}`, "academic-english", level.id, `${levelCode(level.id)} academic: ${variant.replace(/-/g, " ")}`, academicPrompts[variant], ["State the academic purpose.", "Separate evidence from interpretation.", "Use cautious and source-aware language."], ["Purpose", "Evidence", "Cohesion", "Register", "Qualification"], "Academic English makes the reasoning, evidence and limits visible to a reader or listener.", { voicePrompt: `Be my academic English tutor. Task: ${academicPrompts[variant]} Ask one probing follow-up, wait for my complete answer, then give feedback on structure, evidence, register, precision and one high-value correction.` }))));

  const professionalExtra = [
    "agenda", "minutes", "handover", "deadline", "priority", "risk", "feedback", "escalation", "client", "stakeholder", "interview", "onboarding", "report", "proposal", "presentation", "technical-brief"
  ];
  const professionalPrompts = {
    agenda: "Set a meeting agenda with a purpose, two decisions and a realistic time limit.", minutes: "Summarise a meeting in clear minutes: decision, owner, deadline and unresolved question.", handover: "Hand over a task to a colleague, including status, risk, next action and where the information is stored.", deadline: "Negotiate a deadline by distinguishing the essential deliverable from a useful extra.", priority: "Explain how you would prioritise three competing requests and what you would postpone.", risk: "Raise a risk without creating panic: describe likelihood, impact, mitigation and review point.", feedback: "Give constructive feedback with a specific observation, effect and practical next step.", escalation: "Escalate a problem respectfully after explaining what has already been tried.", client: "Explain a delay to a client, acknowledge its impact and offer two realistic options.", stakeholder: "Adapt one recommendation for a technical stakeholder and a non-specialist stakeholder.", interview: "Answer a competency question with context, action, result and reflection.", onboarding: "Explain a process to a new colleague and check understanding without sounding impatient.", report: "Write or present a concise report with purpose, findings, risk and recommendation.", proposal: "Propose a change, explain benefits and costs and define how success will be measured.", presentation: "Present a recommendation and respond to a concern while protecting the relationship.", "technical-brief": "Explain a technical process, one failure mode and one safeguard to a decision-maker."
  };
  university.levels.forEach((level) => professionalExtra.forEach((variant) => add(challenge(`depth-professional-${level.id}-${variant}`, "professional-english", level.id, `${levelCode(level.id)} professional: ${variant.replace(/-/g, " ")}`, professionalPrompts[variant], ["Clarify the audience and outcome.", "Use a direct, respectful register.", "Finish with an action or decision."], ["Purpose", "Relevant detail", "Diplomacy", "Decision", "Follow-up"], "Professional English is successful when another person can understand the situation, weigh the trade-off and act next.", { voicePrompt: `Act as my professional English partner. Task: ${professionalPrompts[variant]} Ask realistic follow-up questions, let me respond spontaneously, and give feedback on clarity, diplomacy, register and one natural collocation after I finish.` }))));

  // Place the new depth items into module routes and refresh the stratified exams.
  university.levels.forEach((level) => {
    const modules = level.modules || [];
    activities.filter((item) => item.level === level.id && !item.moduleId).forEach((item, index) => {
      const candidates = modules.filter((module) => module.skills.includes(item.skill));
      item.moduleId = (candidates[index % Math.max(candidates.length, 1)] || modules[index % modules.length])?.id || null;
    });
  });

  // Expand the starting diagnostic to twelve signals per level while keeping
  // the original six questions and their explanations intact.
  const diagnosticIds = new Set(university.diagnostic.map((item) => item.id));
  university.levels.forEach((level) => {
    const current = university.diagnostic.filter((item) => item.level === level.id).length;
    activities.filter((item) => item.level === level.id && item.mode === "quiz").slice(0, Math.max(0, 12 - current)).forEach((item, index) => {
      const id = `diag-full-${level.id}-${index + 1}`;
      if (!diagnosticIds.has(id)) university.diagnostic.push({ ...item, id, instruction: "Diagnostic question: answer without notes.", diagnosticSource: item.id });
    });
  });

  const sample = (pool, limit) => {
    const groups = [...new Set(pool.map((item) => item.skill))].map((skill) => pool.filter((item) => item.skill === skill));
    const selected = [];
    while (selected.length < limit && groups.some((group) => group.length)) groups.forEach((group) => { if (selected.length < limit && group.length) selected.push(group.shift()); });
    return selected;
  };
  university.levelExams = university.levels.map((level) => {
    const pool = activities.filter((item) => item.level === level.id && item.mode === "quiz");
    const moduleTests = level.modules.map((module) => ({ id: `${module.id}-test`, moduleId: module.id, title: `${module.title} checkpoint`, questions: sample(pool.filter((item) => item.moduleId === module.id), 12), production: activities.filter((item) => item.moduleId === module.id && item.mode === "challenge").slice(0, 3) }));
    return { id: `${level.id}-exam`, level: level.id, title: level.exam, questions: sample([...pool], 48), questionPool: pool, moduleTests, production: activities.filter((item) => item.level === level.id && item.mode === "challenge").slice(0, 10) };
  });
})();
