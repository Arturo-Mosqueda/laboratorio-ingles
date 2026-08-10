(() => {
  "use strict";

  const university = window.EnglishUniversityData;
  const catalogs = window.EnglishCatalogs;
  if (!university || !catalogs) return;

  const activities = university.activities;
  const existing = new Set(activities.map((item) => item.id));
  const add = (item) => {
    if (!existing.has(item.id)) {
      activities.push(item);
      existing.add(item.id);
    }
  };
  const slug = (value) => String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const topic = (skill) => `skill-${skill}`;
  const choice = (id, skill, level, taskType, prompt, options, answer, explanation, extra = {}) => ({
    id, skill, level, mode: "quiz", type: "choice", taskType,
    instruction: extra.instruction || "Choose the option that best fits the task.",
    prompt, options, answer, explanation, topic: topic(skill), ...extra
  });
  const written = (id, skill, level, taskType, prompt, answers, explanation, extra = {}) => ({
    id, skill, level, mode: "quiz", type: "text", taskType,
    instruction: extra.instruction || "Write the missing language. Check the whole context before submitting.",
    prompt, answers, explanation, topic: topic(skill), ...extra
  });
  const challenge = (id, skill, level, title, prompt, preparation, checklist, sample, extra = {}) => ({
    id, skill, level, mode: "challenge", title, prompt, preparation, checklist, sample,
    topic: topic(skill), ...extra
  });

  const allGrammar = catalogs.grammarCatalog;
  const grammarExamples = allGrammar.map((item) => item.example);
  const grammarForms = allGrammar.map((item) => item.form);
  const grammarFocuses = allGrammar.map((item) => item.focus);

  allGrammar.forEach((item, index) => {
    const id = slug(item.id);
    const otherForms = [
      item.form,
      grammarForms[(index + 9) % grammarForms.length],
      grammarForms[(index + 21) % grammarForms.length],
      grammarForms[(index + 34) % grammarForms.length]
    ];
    const otherExamples = [
      item.example,
      grammarExamples[(index + 7) % grammarExamples.length],
      grammarExamples[(index + 18) % grammarExamples.length],
      grammarExamples[(index + 31) % grammarExamples.length]
    ];
    const otherFocuses = [
      item.focus,
      grammarFocuses[(index + 5) % grammarFocuses.length],
      grammarFocuses[(index + 13) % grammarFocuses.length],
      grammarFocuses[(index + 27) % grammarFocuses.length]
    ];

    add(choice(`deep-grammar-${id}-form`, "grammar", item.level, "Form recognition",
      `Which form describes ${item.title.toLowerCase()}?`, otherForms, 0,
      `${item.title} is built with ${item.form}. The form must serve the meaning and viewpoint in the context.`));
    add(choice(`deep-grammar-${id}-example`, "grammar", item.level, "Example matching",
      `Which sentence is a natural example of ${item.title.toLowerCase()}?`, otherExamples, 0,
      `The first sentence illustrates ${item.title}: ${item.focus}. The other sentences illustrate different structures.`));
    add(choice(`deep-grammar-${id}-purpose`, "grammar", item.level, "Meaning and purpose",
      `What is the main communicative purpose of ${item.title.toLowerCase()}?`, otherFocuses, 0,
      `${item.title} is useful for ${item.focus}. Start with the speaker's purpose before building the form.`));
    add(choice(`deep-grammar-${id}-context`, "grammar", item.level, "Context decision",
      `A learner wants to say: “${item.example}” in a lesson about ${item.title}. Which choice should they check first?`,
      [item.focus, "whether every sentence can use the same tense", "whether the sentence can omit its main verb", "whether the most formal option is always correct"], 0,
      `The relevant check is ${item.focus}. Grammar choices express a relationship between form, time, focus and purpose.`));
    add(choice(`deep-grammar-${id}-contrast`, "grammar", item.level, "Contrastive grammar",
      `Which question helps distinguish ${item.title.toLowerCase()} from a nearby alternative?`,
      [`What meaning or viewpoint does the speaker want to highlight?`, "Which option has the longest verb phrase?", "Which option sounds most complicated?", "Which option contains the most words?"], 0,
      `Meaning comes first: compare the viewpoint and communicative purpose, not the length of the structure.`));
  });

  const wordFamilyOptions = (word) => [
    `${word} and its related forms must fit the sentence`,
    `every related form has exactly the same grammar`,
    `a synonym can replace every collocation`,
    `register never changes word choice`
  ];
  catalogs.vocabularyCatalog.forEach((domain, domainIndex) => {
    domain.entries.forEach(([word, collocation, synonym], entryIndex) => {
      const id = `${slug(domain.id)}-${slug(word)}-${entryIndex + 1}`;
      const distractorDomain = catalogs.vocabularyCatalog[(domainIndex + 3) % catalogs.vocabularyCatalog.length];
      const distractor = distractorDomain.entries[0][0];
      add(choice(`deep-vocab-${id}-collocation`, "vocabulary", domain.level, "Collocation retrieval",
        `Which phrase uses “${word}” naturally in the ${domain.title.toLowerCase()} domain?`,
        [collocation, `do ${word}`, `make ${word}ing`, `${word} a quickly`], 0,
        `${collocation} is the established combination. A related meaning such as ${synonym} is not automatically interchangeable in a collocation.`));
      add(choice(`deep-vocab-${id}-synonym`, "vocabulary", domain.level, "Synonym and nuance",
        `Which option is closest in meaning to “${word}” in this context?`,
        [synonym, distractor, "a completely unrelated process", "a word with the opposite meaning"], 0,
        `${synonym} is the closest meaning cue. Check the sentence and register before replacing a word.`));
      add(choice(`deep-vocab-${id}-family`, "vocabulary", domain.level, "Word family",
        `What should you check when you build a word family from “${word}”?`, wordFamilyOptions(word), 0,
        `A word family changes form and sometimes register or meaning. The correct form depends on the grammatical slot.`));
      add(choice(`deep-vocab-${id}-register`, "vocabulary", domain.level, "Register choice",
        `In a ${domain.title.toLowerCase()} report, why might “${word}” be preferable to a casual synonym?`,
        [`It fits the topic and the intended register`, "It is always shorter", "It never needs a collocation", "It makes evidence unnecessary"], 0,
        `Vocabulary is appropriate when its meaning, collocations and register match the audience and purpose.`));
      add(choice(`deep-vocab-${id}-context`, "vocabulary", domain.level, "Contextual precision",
        `A writer uses “${word}” with “${collocation.replace(word, "___") }”. Which completion is most natural?`,
        [word, distractor, "an unrelated adjective", "nothing: the phrase needs no word"], 0,
        `The original word completes the attested collocation: ${collocation}. Learn vocabulary as a usable combination.`));
    });
  });

  const useLinkers = [
    ["The data was limited; ___, it helped us identify the next question.", ["nevertheless", "because", "unless", "whereas"], 0, "Nevertheless signals a contrast between a limitation and a useful result."],
    ["The team postponed the launch ___ the safety checks were incomplete.", ["because", "despite", "although", "whereas"], 0, "Because introduces the reason for the postponement."],
    ["___ the revised timetable, the final session will finish earlier.", ["According to", "Although", "Despite of", "Unless of"], 0, "According to is followed by a noun phrase and attributes the information to the timetable."],
    ["The report is concise, ___ it still acknowledges the main limitation.", ["but", "so that", "unless", "in order"], 0, "But joins two contrasting observations."],
    ["The proposal will proceed ___ the review identifies a serious risk.", ["unless", "despite", "because of", "whereas"], 0, "Unless introduces the condition that would stop the proposal."],
    ["The survey measures attitudes, ___ the interview explores experiences.", ["whereas", "therefore", "because", "despite"], 0, "Whereas contrasts the focus of the two methods."],
    ["The result was promising. ___, the sample was too small for a broad claim.", ["However", "For example", "Similarly", "In addition to"], 0, "However introduces a qualification after a positive statement."],
    ["The findings are useful ___ they cannot answer the wider policy question.", ["even though", "so that", "because of", "in order"], 0, "Even though introduces a concession." ]
  ];
  useLinkers.forEach((item, index) => {
    university.levels.forEach((level, levelIndex) => {
      const offset = (index + levelIndex) % useLinkers.length;
      const [prompt, options, answer, explanation] = useLinkers[offset];
      add(choice(`deep-use-linker-${level.id}-${index + 1}`, "use-of-english", level.id, "Linking structure", prompt, options, answer, explanation));
    });
  });

  const openCloze = [
    ["The workshop was divided ___ three stages so that participants could review each decision.", ["into"], "Divided into introduces the resulting parts."],
    ["The manager asked us to look ___ the figures before the meeting.", ["over", "through"], "Look over and look through can both mean examine, with look over especially common for a quick check."],
    ["The proposal is designed ___ reduce delays without adding another approval stage.", ["to"], "Designed to is followed by the infinitive."],
    ["The lecturer referred ___ a study that had tracked the same group for ten years.", ["to"], "Refer to takes the preposition to."],
    ["The team succeeded ___ keeping the service open during the repair.", ["in"], "Succeed in is followed by a noun or gerund."],
    ["The findings are consistent ___ earlier work, although the method is different.", ["with"], "Consistent with introduces the comparison."],
    ["The researcher warned us not to draw conclusions ___ the evidence had been checked.", ["before", "until"], "Before and until can mark the point at which the evidence check must happen."],
    ["The policy was introduced ___ response to repeated requests from residents.", ["in"], "In response to is the fixed expression." ]
  ];
  openCloze.forEach(([prompt, answers, explanation], index) => {
    university.levels.forEach((level, levelIndex) => {
      const item = openCloze[(index + levelIndex) % openCloze.length];
      add(written(`deep-use-cloze-${level.id}-${index + 1}`, "use-of-english", level.id, "Open cloze", item[0], item[1], item[2], {
        instruction: "Complete the sentence with one suitable word.",
        answerDisplay: item[1][0]
      }));
    });
  });

  const readingVariants = [
    ["main-idea", "What is the central idea?", (text) => text.focus, ["A list of unrelated details", "A translation exercise", "A description with no purpose"]],
    ["purpose", "What is the writer mainly trying to do?", (text) => `explore ${text.focus}`, ["sell an unrelated product", "tell a joke without a point", "avoid making any distinction"]],
    ["inference", "What can a careful reader reasonably infer?", (text) => "The relationship between details and the writer’s purpose matters", ["Every detail has the same importance", "Inference means guessing without evidence", "The title replaces the text"]],
    ["vocabulary", "What should you do with an unfamiliar word in this text?", (text) => "Use surrounding clues, word form and the paragraph’s direction", ["Stop reading immediately", "Assume the first translation is exact", "Ignore the sentence around it"]],
    ["critical", "Which question would deepen the reading?", (text) => "What evidence supports the claim and what perspective is missing?", ["How many letters are in the title?", "Can every idea be reduced to one word?", "Does the reader have to agree?"]],
    ["tone", "Which reading habit best helps identify tone?", (text) => "Notice evaluative words, contrast and the degree of certainty", ["Count only nouns", "Ignore adjectives and linkers", "Read the final line alone"]]
  ];
  catalogs.readingLibrary.forEach((text, textIndex) => {
    readingVariants.forEach(([variant, question, correct, wrongs], variantIndex) => {
      const options = [correct(text), ...wrongs];
      add(choice(`deep-reading-${slug(text.id)}-${variant}`, "reading", text.level, `Reading ${variant}`,
        `${question} Read “${text.title}” before answering.`, options, 0,
        `The text practises ${text.focus}. Return to the evidence and explain how it supports the answer.`, {
          passageTitle: text.title,
          passage: text.text,
          instruction: "Read the passage once for meaning, then answer using evidence from the text."
        }));
    });
  });

  const listeningVariants = [
    ["gist", "What is the speaker’s main point?", (audio) => audio.focus, ["The speaker’s accent is the topic", "The transcript has no meaning", "Every word must be memorised"]],
    ["detail", "Which listening move helps you find a specific detail?", () => "Listen again with a precise question in mind", ["Try to write every sound at once", "Ignore numbers and names", "Decide the answer before listening"]],
    ["attitude", "What should you notice when identifying attitude?", () => "Stress, contrast, hedging and evaluative language", ["Only the first noun", "The length of the recording", "Whether the transcript uses commas"]],
    ["inference", "What is a strong way to infer an unstated meaning?", () => "Combine the speaker’s words with context and tone", ["Choose the most dramatic interpretation", "Ignore what the speaker qualifies", "Treat every possibility as equally likely"]],
    ["note-taking", "What makes notes useful after a lecture or interview?", () => "They show relationships between claims, evidence and implications", ["They copy every function word", "They contain no headings", "They replace the need to understand"]],
    ["transcript", "When should you use a transcript?", () => "After a first attempt, to confirm details and notice language", ["Before every first listen", "Instead of listening", "Only to count punctuation"]]
  ];
  catalogs.listeningLibrary.forEach((audio) => {
    listeningVariants.forEach(([variant, question, correct, wrongs]) => {
      add(choice(`deep-listening-${slug(audio.id)}-${variant}`, "listening", audio.level, `Listening ${variant}`,
        `${question} Use the text “${audio.title}” as your listening prompt.`, [correct(audio), ...wrongs], 0,
        `Start with ${audio.focus}; then replay the model and use the transcript only after your first attempt.`, {
          transcript: audio.transcript,
          audioTitle: audio.title,
          instruction: "Play the model text, listen once without looking, then answer."
        }));
    });
  });

  const pronunciationVariants = [
    ["sound", "Which first step is most useful when practising a target sound?", "Find a clear model and compare one focused contrast", ["Change every sound at once", "Speak faster immediately", "Ignore intelligibility"]],
    ["stress", "What does word stress make easier for a listener?", "It highlights the syllable that carries the word’s recognisable rhythm", ["It removes all vowels", "It makes every syllable equally strong", "It replaces vocabulary knowledge"]],
    ["rhythm", "What should you do when practising sentence rhythm?", "Make important content words prominent and reduce predictable function words", ["Stress every word equally", "Pause after every syllable", "Whisper the main verb"]],
    ["linking", "Why can linking help connected speech?", "It connects neighbouring sounds while keeping the words intelligible", ["It deletes the message", "It forces a pause between words", "It changes every consonant"]],
    ["intonation", "What can intonation communicate beyond grammar?", "Stance, contrast, confidence and whether an idea is complete", ["Only spelling", "The number of letters", "The exact dictionary definition"]],
    ["shadowing", "What is the main purpose of shadowing?", "To practise prediction, timing and rhythm while following a model", ["To translate each word", "To avoid listening", "To speak without any model"]]
  ];
  catalogs.pronunciationCatalog.forEach((unit) => {
    pronunciationVariants.forEach(([variant, prompt, correct, wrongs]) => {
      add(choice(`deep-pronunciation-${slug(unit.id)}-${variant}`, "pronunciation", unit.level, `Pronunciation ${variant}`,
        `${prompt} Target: ${unit.focus}.`, [correct, ...wrongs], 0,
        `${unit.task} Keep one observable target for the first attempt and one adjustment for the second.`, {
          instruction: "Read the model aloud or use SpeechSynthesis, then choose the best practice decision."
        }));
    });
  });

  const criticalVariants = [
    ["claim", "Which reading question identifies a claim?", "What is the writer asking the reader to accept or consider?", ["How long is the paragraph?", "Which word is shortest?", "What colour is the page?"]],
    ["evidence", "Which question tests evidence?", "Does the evidence actually support the claim, and how strong is it?", ["Is the claim fashionable?", "Can the evidence be ignored?", "Does agreement make it true?"]],
    ["assumption", "What is an assumption?", "An unstated idea that must be true for an argument to work", ["A spelling mistake", "A title with no purpose", "Any sentence with a number"]],
    ["bias", "What can reveal a writer’s bias?", "Selection, omission, loaded labels and unequal standards", ["The font size alone", "The number of paragraphs", "A neutral definition"]],
    ["counterargument", "What makes a counterargument useful?", "It is a serious objection that the original claim must answer", ["It attacks a weak version", "It changes the topic", "It repeats the claim"]],
    ["synthesis", "What does synthesis require?", "Explaining how ideas from different sources agree, differ or leave a gap", ["Listing titles only", "Copying one source", "Choosing the longest quote"]]
  ];
  catalogs.readingLibrary.forEach((text) => {
    criticalVariants.forEach(([variant, prompt, correct, wrongs]) => {
      add(choice(`deep-critical-${slug(text.id)}-${variant}`, "critical-thinking", text.level, `Critical reading ${variant}`,
        `${prompt} Apply the question to “${text.title}”.`, [correct, ...wrongs], 0,
        `Use the passage’s claim, evidence, omissions and language choices. Critical reading makes the reasoning visible.`, {
          passageTitle: text.title,
          passage: text.text,
          instruction: "Read the text, identify the relevant relationship and choose the strongest analysis."
        }));
    });
  });

  const writingBriefs = catalogs.writingCatalog;
  writingBriefs.forEach((brief, index) => {
    const id = slug(brief.title);
    const makeWriting = (variant, extraPrompt, extraChecklist) => challenge(
      `deep-writing-${id}-${variant}`, "writing", brief.level, `${brief.title} — ${variant.replace(/-/g, " ")}`,
      `${extraPrompt} Write ${brief.wordLimit}. Use the structure ${brief.structure.join(" → ")} and language such as ${brief.language.join(", ")}. Complete the self-review before opening model guidance.`,
      ["Clarify audience, purpose and register.", `Plan the stages: ${brief.structure.join(" → ")}.`, `Reserve time to check: ${brief.language.join(", ")}.`],
      [...brief.language.map((item) => `${item} used accurately`), "Structure complete", "Register appropriate", "Self-review completed", ...extraChecklist],
      `A strong ${brief.genre.toLowerCase()} makes its purpose visible, gives each paragraph a job and uses the requested language naturally.`,
      {
        wordLimit: brief.wordLimit,
        recommendedStructure: brief.structure,
        usefulLanguage: brief.language,
        modelAnswer: `Model guidance: address ${brief.structure.join(", ")} for the intended audience. Use ${brief.language.join(", ")} accurately, support the main points with concrete details and finish with a controlled conclusion.`,
        promptVariant: variant
      }
    );
    add(makeWriting("audience", `Rewrite or adapt the original brief so that it is clearly aimed at a different audience.`, ["Audience shift explained"]));
    add(makeWriting("evidence", `Complete the original brief, but include one specific example or piece of evidence that makes the main point credible.`, ["Specific evidence"]));
    add(makeWriting("register", `Complete the original brief and then revise three sentences to make the register more precise for the genre.`, ["Three register revisions"]));
    add(makeWriting("revision", `Draft the original brief, self-review it, and produce a short revision note explaining the two changes that most improved clarity.`, ["Revision note"]));
  });

  const speakingSimulations = catalogs.speakingSimulations;
  speakingSimulations.forEach((simulation) => {
    const id = slug(simulation.id);
    const makeSpeaking = (variant, instruction, extraCheck) => challenge(
      `deep-speaking-${id}-${variant}`, "speaking", simulation.level, `${simulation.title} — ${variant.replace(/-/g, " ")}`,
      `${instruction} Roles: ${simulation.roles.join(" and ")}. Goal: ${simulation.goal}`,
      ["Prepare five keywords, not a script.", "Ask one follow-up question and respond to the answer.", "Finish by stating the next step or outcome."],
      ["Role maintained", "Interaction", "Useful language", "Follow-up", "Outcome", extraCheck],
      "A strong simulation makes the relationship, goal and next action clear rather than delivering a memorised monologue.",
      { voicePrompt: `Act as my ${simulation.roles[0] || "conversation partner"} in this situation: ${simulation.title}. Your goal is ${simulation.goal}. Ask one follow-up question at a time, wait for my answer, correct only one important issue after each turn, and finish with a brief feedback summary.` }
    );
    add(makeSpeaking("clarify", "Run the situation once, then ask for clarification when a detail is unclear.", "Clarification"));
    add(makeSpeaking("constraint", "Run the situation with one constraint: limited time, budget, information or authority.", "Constraint managed"));
    add(makeSpeaking("follow-up", "Run the situation and then answer two unexpected follow-up questions that challenge your first response.", "Follow-up response"));
    add(makeSpeaking("reflection", "Run the situation, repeat one key turn with more precise language and explain what changed.", "Self-correction"));
  });

  const fluencyPrompts = [
    ["describe", "Describe a place, object or process for 45 seconds, then add one detail the listener could not see."],
    ["compare", "Compare two realistic options for one minute and finish with a conditional recommendation."],
    ["explain", "Explain a familiar process to a new learner without using specialist language."],
    ["defend", "Defend a position for 90 seconds, concede one concern and return to your main reason."],
    ["speculate", "Describe what is observable, infer what happened before and predict what might happen next."],
    ["summarise", "Summarise a short article or conversation in five key points and one qualified conclusion."]
  ];
  university.levels.forEach((level, levelIndex) => {
    fluencyPrompts.forEach(([variant, prompt], index) => {
      add(challenge(`deep-fluency-${level.id}-${variant}`, "fluency", level.id, `${level.code} fluency: ${variant}`,
        prompt,
        ["Prepare five keywords, not full sentences.", "Keep speaking when a word is missing: paraphrase and continue.", "Record a first and second attempt."],
        ["Target time reached", "Structure clear", "Paraphrase used", "Second attempt", "One improvement identified"],
        "Fluency grows when communication continues while vocabulary is being retrieved. Measure organisation and recoverability, not only speed.",
        { timerSeconds: levelIndex < 2 ? 60 : 120 }
      ));
    });
  });

  const thinkingTasks = [
    ["circumlocution", "Explain an object or concept without naming it. Give its category, purpose, appearance and one contrast."],
    ["paraphrase", "Rewrite three sentences with different grammar and vocabulary while preserving the exact meaning."],
    ["definition", "Define three abstract words without translating them: category, characteristic, example and boundary."],
    ["register", "Reformulate one casual sentence for a friend, a manager and an academic audience. Explain the shifts."],
    ["question", "Turn a fact into a why, how or what-if question, then answer it with a qualified explanation."],
    ["retrieval", "Choose five useful words from a recent lesson and make a connected mini-story without looking at translations."]
  ];
  university.levels.forEach((level) => {
    thinkingTasks.forEach(([variant, prompt]) => {
      add(challenge(`deep-thinking-${level.id}-${variant}`, "english-thinking", level.id, `${level.code} English thinking: ${variant}`,
        prompt,
        ["Use English definitions and examples.", "Keep the meaning precise.", "Record one attempt and revise one sentence."],
        ["No translation", "Meaning preserved", "Useful example", "Boundary or contrast", "Revision completed"],
        "Thinking directly in English becomes easier when you practise meaning, relationships and examples instead of isolated translation.",
        { voicePrompt: `Coach my English-thinking task: ${prompt} Do not translate for me. Ask follow-up questions, let me explain, and give feedback on clarity, precision and natural phrasing after I finish.` }
      ));
    });
  });

  const academicTasks = [
    ["lecture-notes", "Take notes from a short lecture, then explain the claim, evidence, limitation and implication."],
    ["source-paragraph", "Combine two ideas from a reading into one paragraph using reporting verbs and a qualified synthesis."],
    ["presentation", "Give a three-minute explanation of a surprising finding and answer one challenge question."],
    ["abstract", "Write a concise abstract with aim, method, result and limitation for a small study."],
    ["critical-response", "Respond to a claim by defining its terms, considering a counterargument and qualifying the conclusion."],
    ["seminar", "Open an academic discussion, invite another view, connect it to evidence and summarise the unresolved question."]
  ];
  university.levels.filter((level) => level.id !== "b1-plus").forEach((level) => {
    academicTasks.forEach(([variant, prompt]) => {
      add(challenge(`deep-academic-${level.id}-${variant}`, "academic-english", level.id, `${level.code} academic: ${variant}`,
        prompt,
        ["State the purpose before adding detail.", "Distinguish evidence from interpretation.", "Use cautious language where the evidence is limited."],
        ["Purpose clear", "Evidence attributed", "Hedging or qualification", "Cohesion", "Response to a question"],
        "Academic communication is strongest when the speaker or writer makes the evidence, reasoning and limits visible.",
        { voicePrompt: `Be my academic English tutor for this task: ${prompt} Ask me to clarify claims and evidence, wait for my full response, then give feedback on structure, register, precision and one high-value correction.` }
      ));
    });
  });

  const professionalTasks = [
    ["update", "Give a concise workplace update: progress, obstacle, next action and realistic time estimate."],
    ["email", "Draft or say a professional message that states purpose, context, requested action and deadline."],
    ["meeting", "Open a meeting, invite two viewpoints, summarise agreement and assign an owner for the next step."],
    ["negotiation", "Negotiate a constraint by identifying interests, offering two options and agreeing a review point."],
    ["presentation", "Present a recommendation to a non-specialist audience and answer a concern without jargon."],
    ["technical", "Explain a technical process, its main risk and one practical safeguard to a colleague outside your field."]
  ];
  university.levels.forEach((level) => {
    professionalTasks.forEach(([variant, prompt]) => {
      add(challenge(`deep-professional-${level.id}-${variant}`, "professional-english", level.id, `${level.code} professional: ${variant}`,
        prompt,
        ["Clarify the audience and outcome.", "Use a direct but respectful register.", "End with an explicit next step."],
        ["Purpose", "Relevant detail", "Register", "Action or decision", "Follow-up"],
        "Professional English is useful when another person can understand the situation and decide what to do next.",
        { voicePrompt: `Act as my professional English partner. Task: ${prompt} Ask realistic follow-up questions, let me respond spontaneously, and then give brief feedback on clarity, diplomacy, register and one natural collocation.` }
      ));
    });
  });

  // Attach every activity to a real module so module routes can expose focused practice.
  university.levels.forEach((level) => {
    const modules = level.modules || [];
    const levelActivities = activities.filter((item) => item.level === level.id);
    levelActivities.forEach((item, index) => {
      if (item.moduleId) return;
      const candidates = modules.filter((module) => module.skills.includes(item.skill));
      item.moduleId = (candidates[index % Math.max(candidates.length, 1)] || modules[index % modules.length])?.id || null;
    });
  });

  // Give every module a real checkpoint, including production-led modules whose
  // main bank is intentionally made of open challenges.
  university.levels.forEach((level) => {
    level.modules.forEach((module) => {
      const currentQuestions = activities.filter((item) => item.moduleId === module.id && item.mode === "quiz");
      const needed = Math.max(0, 8 - currentQuestions.length);
      for (let index = 0; index < needed; index += 1) {
        const skill = module.skills[index % module.skills.length];
        add(choice(`deep-module-${slug(module.id)}-${index + 1}`, skill, level.id, "Module checkpoint",
          `Which action best supports the ${module.title.toLowerCase()} route?`,
          [`Work with the context, check the intended meaning and produce one original example.`, "Memorise an isolated translation and skip the context.", "Choose the longest answer without checking the audience.", "Repeat the same sentence without reviewing it."], 0,
          `${module.title} focuses on ${module.focus} The strongest routine combines noticing, controlled practice, independent production and reflection.`, {
            moduleId: module.id,
            instruction: "Choose the study decision that best matches this module’s learning outcome."
          }));
      }
    });
  });

  const sampleQuestions = (pool, limit) => {
    const groups = [...new Set(pool.map((item) => item.skill))].map((skill) => pool.filter((item) => item.skill === skill));
    const selected = [];
    let cursor = 0;
    while (selected.length < limit && groups.some((group) => group.length)) {
      groups.forEach((group) => {
        if (selected.length >= limit) return;
        if (group.length) selected.push(group.shift());
      });
      cursor += 1;
      if (cursor > limit + groups.length) break;
    }
    return selected;
  };

  university.levelExams = university.levels.map((level) => {
    const quizPool = activities.filter((activity) => activity.level === level.id && activity.mode === "quiz");
    const moduleTests = level.modules.map((module) => ({
      id: `${module.id}-test`,
      moduleId: module.id,
      title: `${module.title} checkpoint`,
      questions: sampleQuestions(quizPool.filter((item) => item.moduleId === module.id), 12),
      production: activities.filter((item) => item.moduleId === module.id && item.mode === "challenge").slice(0, 3)
    }));
    return {
      id: `${level.id}-exam`,
      level: level.id,
      title: level.exam,
      questions: sampleQuestions([...quizPool], 48),
      questionPool: quizPool,
      moduleTests,
      production: activities.filter((activity) => activity.level === level.id && activity.mode === "challenge").slice(0, 10)
    };
  });
})();
