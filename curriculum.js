(() => {
  "use strict";

  const levels = [
    {
      id: "b1-plus",
      code: "B1+",
      title: "Foundation and control",
      description: "Consolidate the structures and habits that make intermediate English accurate, useful and easy to understand.",
      outcome: "Handle everyday situations, explain experiences clearly and write connected paragraphs with reliable grammar.",
      modules: [
        { id: "b1-grammar", title: "Grammar control", focus: "Core tenses, modals, conditionals, articles and sentence building.", skills: ["grammar", "use-of-english"] },
        { id: "b1-vocabulary", title: "Everyday vocabulary", focus: "Collocations, word families, phrasal verbs and practical topic language.", skills: ["vocabulary"] },
        { id: "b1-reading", title: "Reading for meaning", focus: "Short articles, messages and narratives with main-idea and detail strategies.", skills: ["reading", "critical-thinking"] },
        { id: "b1-communication", title: "Everyday communication", focus: "Descriptions, stories, requests and short opinion exchanges.", skills: ["speaking", "writing"] },
        { id: "b1-sound", title: "Clear English", focus: "Key vowel contrasts, word stress and intelligible connected speech.", skills: ["listening", "pronunciation"] }
      ],
      exam: "B1+ progress exam"
    },
    {
      id: "b2",
      code: "B2",
      title: "Functional and academic English",
      description: "Move from correct sentences to flexible choices in texts, discussions, study and work.",
      outcome: "Understand extended texts, defend an opinion, write organised B2 genres and interact with confidence.",
      modules: [
        { id: "b2-grammar", title: "Grammar in context", focus: "Mixed tenses, passive voice, clauses, modality and advanced linking.", skills: ["grammar", "use-of-english"] },
        { id: "b2-vocabulary", title: "Precision and collocation", focus: "Topic vocabulary, register, word formation and natural combinations.", skills: ["vocabulary"] },
        { id: "b2-reading", title: "Reading between the lines", focus: "Reports, articles, interviews and narratives with inference and tone.", skills: ["reading", "critical-thinking"] },
        { id: "b2-writing", title: "B2 writing studio", focus: "Essays, reports, reviews, proposals, narratives and formal emails.", skills: ["writing"] },
        { id: "b2-speaking", title: "Discussion and problem solving", focus: "Comparing, speculating, negotiating and responding to counterarguments.", skills: ["speaking"] },
        { id: "b2-listening", title: "Natural-speed listening", focus: "Interviews, announcements, lectures and speaker attitude.", skills: ["listening", "pronunciation"] }
      ],
      exam: "B2 progress exam"
    },
    {
      id: "b2-plus",
      code: "B2+",
      title: "Range, nuance and fluency",
      description: "Stretch beyond safe language with complex ideas, precise vocabulary and faster decisions.",
      outcome: "Sustain longer arguments, infer unstated meaning and adapt register in demanding academic and professional contexts.",
      modules: [
        { id: "b2p-grammar", title: "Complex grammar choices", focus: "Inversion, emphasis, reduced clauses, ellipsis and nuanced modality.", skills: ["grammar", "use-of-english"] },
        { id: "b2p-language", title: "Advanced lexical control", focus: "Connotation, idioms, sophisticated collocations and word formation.", skills: ["vocabulary"] },
        { id: "b2p-reading", title: "Argument and evidence", focus: "Long-form journalism, science writing and competing viewpoints.", skills: ["reading", "critical-thinking"] },
        { id: "b2p-production", title: "Fluent production", focus: "Timed speaking, synthesis, summaries and controlled rewriting.", skills: ["speaking", "writing"] },
        { id: "b2p-listening", title: "Connected speech lab", focus: "Reduced forms, discourse markers, stance and varied delivery.", skills: ["listening", "pronunciation"] }
      ],
      exam: "B2+ range and fluency exam"
    },
    {
      id: "c1",
      code: "C1",
      title: "Advanced, natural and flexible English",
      description: "Develop the control needed for complex academic, professional and intellectual communication.",
      outcome: "Read and evaluate complex ideas, write with a controlled register and speak spontaneously with nuance.",
      modules: [
        { id: "c1-grammar", title: "Advanced grammar and discourse", focus: "Clefts, fronting, advanced conditionals, hedging and discourse grammar.", skills: ["grammar", "use-of-english"] },
        { id: "c1-vocabulary", title: "Sophisticated expression", focus: "Nominalisation, metaphor, register, idiomatic precision and academic phraseology.", skills: ["vocabulary"] },
        { id: "c1-reading", title: "Critical and academic reading", focus: "Research-style texts, bias, assumptions, synthesis and authorial purpose.", skills: ["reading", "critical-thinking"] },
        { id: "c1-writing", title: "C1 writing and synthesis", focus: "Argumentative essays, critical responses, proposals and formal correspondence.", skills: ["writing"] },
        { id: "c1-speaking", title: "Academic and professional speaking", focus: "Presentations, negotiation, challenge, defence and spontaneous follow-up.", skills: ["speaking"] },
        { id: "c1-listening", title: "Complex listening", focus: "Lectures, debates, implied meaning, attitude and multiple accents.", skills: ["listening", "pronunciation"] }
      ],
      exam: "C1 integrated exam"
    }
  ];

  const skills = [
    { id: "grammar", icon: "GR", title: "Grammar", description: "Understand form, meaning and register, then use grammar in real context.", color: "green" },
    { id: "vocabulary", icon: "VO", title: "Vocabulary", description: "Learn words through collocations, families, register, connotation and retrieval.", color: "gold" },
    { id: "reading", icon: "RE", title: "Reading", description: "Read for gist, detail, inference, tone, purpose and critical response.", color: "blue" },
    { id: "writing", icon: "WR", title: "Writing", description: "Plan, draft, self-review and refine texts from B1+ messages to C1 arguments.", color: "coral" },
    { id: "listening", icon: "LI", title: "Listening", description: "Build comprehension from clear speech to natural speed, reductions and attitude.", color: "purple" },
    { id: "speaking", icon: "SP", title: "Speaking", description: "Practise fluency, interaction, explanation, discussion and defending a position.", color: "teal" },
    { id: "pronunciation", icon: "PR", title: "Pronunciation", description: "Train sounds, stress, rhythm, linking, weak forms and intelligibility.", color: "rose" },
    { id: "use-of-english", icon: "UE", title: "Use of English", description: "Practise cloze, transformations, word formation, errors, collocations and phrasal verbs.", color: "gold" },
    { id: "critical-thinking", icon: "CT", title: "Critical thinking", description: "Infer, evaluate evidence, identify assumptions and formulate counterarguments.", color: "blue" }
  ];

  const activities = [
    { id: "vocab-education-collocation", skill: "vocabulary", level: "b1-plus", mode: "quiz", type: "choice", taskType: "Collocation choice", instruction: "Choose the natural collocation.", prompt: "Students are encouraged to ___ notes during the lecture.", options: ["make", "do", "take", "give"], answer: 2, explanation: "Take notes is the standard collocation.", topic: "skill-vocabulary" },
    { id: "vocab-technology-family", skill: "vocabulary", level: "b2", mode: "quiz", type: "choice", taskType: "Word family", instruction: "Choose the form that completes the sentence.", prompt: "The new system is highly ___ and can be adapted to different teams.", options: ["flexibility", "flexible", "flexibly", "flexibilise"], answer: 1, explanation: "The adjective flexible follows be and describes the system.", topic: "skill-vocabulary" },
    { id: "vocab-climate-register", skill: "vocabulary", level: "b2-plus", mode: "quiz", type: "choice", taskType: "Register and meaning", instruction: "Choose the most precise formal option.", prompt: "The report says the policy could ___ inequality if it is not revised.", options: ["make worse", "exacerbate", "do bad", "upset up"], answer: 1, explanation: "Exacerbate means make a problem more severe and is appropriate in formal analysis.", topic: "skill-vocabulary" },
    { id: "vocab-meaning-retrieval", skill: "vocabulary", level: "c1", mode: "challenge", title: "Explain without translating", prompt: "Explain the meaning of ‘substantial’ without using the word itself or translating it. Then give two natural collocations.", preparation: ["Think of quantity, importance and degree.", "Use a definition, an example and a contrast."], checklist: ["Clear definition", "Two collocations", "One contrast or limitation"], sample: "A substantial change is large or important enough to have a noticeable effect.", topic: "skill-vocabulary" },

    { id: "reading-urban-gardens", skill: "reading", level: "b1-plus", mode: "quiz", type: "choice", taskType: "Reading inference", instruction: "Read the text and choose the best inference.", passageTitle: "A garden above the street", passage: "When the residents converted the unused roof into a garden, they expected fresher herbs. They did not expect neighbours who had never spoken to begin sharing tools and advice. The harvest is modest, but the weekly gardening session has become the building’s most reliable meeting point.", prompt: "What unexpected benefit did the project create?", options: ["A large commercial harvest", "More interaction between residents", "A cheaper building", "A replacement for local shops"], answer: 1, explanation: "The text contrasts the modest harvest with the new social connection between neighbours.", topic: "skill-reading" },
    { id: "reading-science-purpose", skill: "reading", level: "b2", mode: "quiz", type: "choice", taskType: "Author purpose", instruction: "Read the text and identify the author’s main purpose.", passageTitle: "Small experiments, better decisions", passage: "A pilot project is not a promise that a solution will work everywhere. It is a controlled opportunity to observe, revise and decide what evidence is still missing. Treating a pilot as a public-relations success can hide useful failures; treating it as a learning process makes those failures informative.", prompt: "Why does the author contrast two ways of treating a pilot?", options: ["To argue that pilots should never be public", "To show why honest evaluation improves learning", "To prove every pilot fails", "To recommend replacing evidence with publicity"], answer: 1, explanation: "The contrast supports the argument that transparent evaluation turns failures into useful evidence.", topic: "skill-reading" },
    { id: "reading-c1-assumptions", skill: "reading", level: "c1", mode: "challenge", title: "Challenge an assumption", prompt: "Read a short opinion article of your choice. Identify one assumption the writer makes, decide whether it is justified and write a three-sentence response.", preparation: ["Underline the writer’s main claim.", "Ask what must be true for the claim to follow.", "Look for evidence, omissions and alternative explanations."], checklist: ["Claim identified", "Assumption stated", "Evidence evaluated", "Alternative considered"], sample: "The writer assumes that convenience is the main reason people adopt the service, but cost and social pressure could also explain the behaviour.", topic: "skill-reading" },

    { id: "writing-b1-email", skill: "writing", level: "b1-plus", mode: "challenge", title: "Informal email: change of plans", prompt: "Write 100–120 words to a friend explaining why you cannot attend a planned activity, suggesting an alternative and asking a follow-up question.", preparation: ["Open warmly and explain the change clearly.", "Use at least two linking expressions.", "Close with a natural question."], checklist: ["All three content points", "Informal register", "Paragraphing", "Accurate past and future forms"], sample: "Do not read the model until you have self-reviewed your own draft.", topic: "skill-writing" },
    { id: "writing-b2-report", skill: "writing", level: "b2", mode: "challenge", title: "Report: improve a study space", prompt: "Write a 180–220 word report for a college committee. Describe two problems with the current study space and recommend practical improvements.", preparation: ["Use headings or clear paragraphs.", "Support recommendations with reasons.", "Use a formal, objective register."], checklist: ["Purpose and audience clear", "Two problems", "Actionable recommendations", "Formal linking and vocabulary"], sample: "A strong report separates findings from recommendations and makes each proposal easy to act on.", topic: "skill-writing" },
    { id: "writing-c1-synthesis", skill: "writing", level: "c1", mode: "challenge", title: "Critical synthesis", prompt: "Write 250–280 words comparing two viewpoints on whether universities should record all lectures. Reach a qualified conclusion rather than simply choosing a side.", preparation: ["Represent both positions fairly.", "Use concession and contrast.", "State what your conclusion depends on."], checklist: ["Balanced synthesis", "Evidence or examples", "Nuanced thesis", "Controlled C1 register", "Self-review completed"], sample: "A qualified conclusion explains when a policy is useful and what safeguards or limits it needs.", topic: "skill-writing" },

    { id: "listening-b1-announcement", skill: "listening", level: "b1-plus", mode: "quiz", type: "choice", taskType: "Listening for detail", instruction: "Play the announcement, then choose the correct detail.", transcript: "Good morning. The 9:20 service to Northbridge will now leave from platform four, not platform two. Passengers should keep their tickets ready and allow extra time to cross the station.", prompt: "Where will the train leave from?", options: ["Platform two", "Platform four", "Northbridge station office", "The bus stop"], answer: 1, explanation: "The announcement corrects the original platform and says the service will leave from platform four.", topic: "skill-listening" },
    { id: "listening-b2-attitude", skill: "listening", level: "b2", mode: "quiz", type: "choice", taskType: "Speaker attitude", instruction: "Play or read the extract and identify the speaker’s attitude.", transcript: "The proposal is certainly ambitious. I would be more convinced, however, if the team explained how the timetable could be funded. At present, the figures leave too many questions unanswered.", prompt: "How does the speaker feel about the proposal?", options: ["Unreservedly enthusiastic", "Cautiously doubtful", "Angry about a personal insult", "Completely indifferent"], answer: 1, explanation: "Ambitious is positive, but the unanswered questions make the overall attitude cautious and doubtful.", topic: "skill-listening" },
    { id: "listening-c1-note-taking", skill: "listening", level: "c1", mode: "challenge", title: "Lecture notes and inference", prompt: "Listen to a two-minute academic explanation using SpeechSynthesis or a teacher’s recording. Produce five notes, one implied conclusion and one question for the speaker.", preparation: ["Write keywords, not full sentences.", "Mark examples separately from claims.", "Listen again only to confirm uncertain links."], checklist: ["Five useful notes", "Main claim", "Implied conclusion", "Follow-up question"], sample: "Your notes should allow another student to reconstruct the lecture’s argument without a full transcript.", topic: "skill-listening" },

    { id: "speaking-b1-description", skill: "speaking", level: "b1-plus", mode: "challenge", title: "Thirty-second description", prompt: "Speak for 30 seconds describing a place where you study. Mention what is there, what you usually do and one change you would make.", preparation: ["Use a simple beginning–detail–opinion structure.", "Include one present simple and one present continuous sentence."], checklist: ["30 seconds", "Specific details", "Clear sequence", "Understandable pronunciation"], sample: "Use the optional voice prompt below the activity to practise with a conversation partner.", topic: "skill-speaking" },
    { id: "speaking-b2-problem-solving", skill: "speaking", level: "b2", mode: "challenge", title: "Solve a community problem", prompt: "You and a partner have a limited budget to improve a neighbourhood. Discuss three options, compare them and agree on one plan.", preparation: ["Ask for your partner’s priorities.", "Use phrases for comparing, conceding and reaching agreement.", "Give at least one reason and one drawback for each option."], checklist: ["Interaction", "Comparison", "Reasons", "Agreement or justified disagreement"], sample: "I can see the benefit of X; nevertheless, Y would have a wider impact because…", topic: "skill-speaking" },
    { id: "speaking-c1-defence", skill: "speaking", level: "c1", mode: "challenge", title: "Defend a nuanced position", prompt: "Argue for or against the claim ‘Technology makes people less independent’. Present a qualified position, respond to a counterargument and finish with a condition.", preparation: ["Define what independent means in your argument.", "Distinguish convenience from dependence.", "Use one concession and one hypothetical example."], checklist: ["Clear position", "Counterargument", "Nuance", "Spontaneous follow-up"], sample: "The effect depends less on technology itself than on whether users retain the ability to act without it.", topic: "skill-speaking" },

    { id: "pronunciation-stress", skill: "pronunciation", level: "b1-plus", mode: "challenge", title: "Word-stress awareness", prompt: "Read aloud: PHOtograph, phoTOGraphy, photoGRAPHic. Mark the stressed syllable and record yourself saying the three forms.", preparation: ["Tap once on the strongest syllable.", "Keep unstressed vowels shorter and weaker.", "Compare the word family, not isolated words."], checklist: ["Stress moves correctly", "Vowels remain clear", "Three recordings"], sample: "Stress can move when a suffix changes the word family.", topic: "skill-pronunciation" },
    { id: "pronunciation-linking", skill: "pronunciation", level: "b2", mode: "challenge", title: "Linking and rhythm", prompt: "Shadow this sentence three times: ‘I’d like to ask you about the results of the experiment.’ Focus on linking consonants to vowels and keeping the content words prominent.", preparation: ["Listen to the browser model first.", "Underline the content words.", "Do not pronounce every word with equal force."], checklist: ["Smooth linking", "Natural rhythm", "Content-word stress", "Third attempt clearer than first"], sample: "Connected speech should remain intelligible; speed is less important than a stable rhythm.", topic: "skill-pronunciation" },
    { id: "pronunciation-c1-intonation", skill: "pronunciation", level: "c1", mode: "challenge", title: "Intonation and stance", prompt: "Say ‘That is an interesting proposal’ three ways: genuinely positive, politely doubtful and strongly ironic. Explain what changes in pitch, stress and context.", preparation: ["Keep the words constant.", "Change the focus word and pitch movement.", "Explain how a listener could misread the intention."], checklist: ["Three distinguishable versions", "Stance explained", "Context supplied"], sample: "Intonation carries attitude, but listeners interpret it together with context and word choice.", topic: "skill-pronunciation" },

    { id: "use-cloze-linker", skill: "use-of-english", level: "b1-plus", mode: "quiz", type: "choice", taskType: "Open cloze", instruction: "Choose the linker that creates the correct relationship.", prompt: "The route was longer than expected. ___, everyone arrived before the meeting began.", options: ["However", "Because", "Although", "Despite"], answer: 0, explanation: "However introduces a contrast with the previous sentence and can stand at the beginning of this sentence.", topic: "skill-use-of-english" },
    { id: "use-word-formation", skill: "use-of-english", level: "b2", mode: "quiz", type: "choice", taskType: "Word formation", instruction: "Choose the correct form of the word in brackets.", prompt: "The committee questioned the ___ of the timetable. (FEASIBLE)", options: ["feasibility", "feasible", "feasibly", "unfeasiblely"], answer: 0, explanation: "The noun feasibility names the quality being questioned.", topic: "skill-use-of-english" },
    { id: "use-transformation", skill: "use-of-english", level: "b2-plus", mode: "quiz", type: "choice", taskType: "Key-word transformation", instruction: "Choose the sentence with the same meaning.", prompt: "‘We only understood the risk after the test.’ Which option keeps the meaning?", options: ["Only after the test did we understand the risk.", "Only after the test we understood the risk.", "Only after the test had we understand the risk.", "Only after the test did understood we the risk."], answer: 0, explanation: "A negative or limiting fronted expression triggers subject–auxiliary inversion: did we understand.", topic: "skill-use-of-english" },
    { id: "use-c1-hedging", skill: "use-of-english", level: "c1", mode: "quiz", type: "choice", taskType: "Register and hedging", instruction: "Choose the most appropriately cautious academic sentence.", prompt: "The findings ___ suggest that the intervention improved retention.", options: ["definitely prove", "appear to", "are totally showing", "must absolutely mean"], answer: 1, explanation: "Appear to expresses a cautious interpretation suitable for academic writing.", topic: "skill-use-of-english" }
  ];

  const projects = [
    { id: "project-b1-story", level: "b1-plus", title: "My English story", description: "Create a two-minute personal story and a 150-word written version using clear sequence markers.", skills: ["speaking", "writing", "grammar"] },
    { id: "project-b1-guide", level: "b1-plus", title: "Everyday survival guide", description: "Design a practical guide for a visitor with vocabulary, instructions and a short audio explanation.", skills: ["vocabulary", "writing", "speaking"] },
    { id: "project-b2-report", level: "b2", title: "Evidence-based campus report", description: "Read two short sources, compare their claims and submit a formal report with recommendations.", skills: ["reading", "writing", "critical-thinking"] },
    { id: "project-b2-podcast", level: "b2", title: "Mini podcast", description: "Plan and record a four-minute episode explaining a current issue with an introduction, evidence and conclusion.", skills: ["listening", "speaking", "vocabulary"] },
    { id: "project-b2p-debate", level: "b2-plus", title: "Structured debate", description: "Research both sides of a question, anticipate objections and defend a qualified position.", skills: ["critical-thinking", "speaking", "use-of-english"] },
    { id: "project-b2p-rewrite", level: "b2-plus", title: "Register transformation", description: "Rewrite an informal message as a professional email and explain every major language choice.", skills: ["writing", "vocabulary", "grammar"] },
    { id: "project-c1-synthesis", level: "c1", title: "Academic synthesis", description: "Combine two contrasting texts into a balanced critical response with an explicit line of reasoning.", skills: ["reading", "writing", "critical-thinking"] },
    { id: "project-c1-presentation", level: "c1", title: "Professional presentation", description: "Deliver a seven-minute presentation, answer hostile follow-up questions and submit a reflective review.", skills: ["speaking", "listening", "pronunciation"] }
  ];

  const diagnostic = [
    { id: "diag-1", level: "b1-plus", skill: "grammar", type: "choice", prompt: "I ___ here since 2022.", options: ["work", "am working", "have worked", "worked"], answer: 2, explanation: "Since gives a starting point connected to now, so present perfect is appropriate." },
    { id: "diag-2", level: "b1-plus", skill: "vocabulary", type: "choice", prompt: "Please ___ attention to the final instruction.", options: ["do", "make", "pay", "put"], answer: 2, explanation: "Pay attention is the standard collocation." },
    { id: "diag-3", level: "b2", skill: "grammar", type: "choice", prompt: "By the time we arrived, the lecture ___.", options: ["started", "has started", "had started", "was starting"], answer: 2, explanation: "Past perfect places the earlier event before another past reference." },
    { id: "diag-4", level: "b2", skill: "reading", type: "choice", prompt: "If an author gives evidence for a claim, what should you check next?", options: ["Whether the evidence actually supports it", "Whether every sentence is short", "Whether the title is attractive", "Whether you agree immediately"], answer: 0, explanation: "Critical reading tests the relationship between evidence and claim." },
    { id: "diag-5", level: "b2-plus", skill: "use-of-english", type: "choice", prompt: "Rarely ___ such a rapid change in public opinion.", options: ["we have seen", "have we seen", "we saw have", "did we have saw"], answer: 1, explanation: "Fronted negative adverbs such as rarely trigger inversion." },
    { id: "diag-6", level: "c1", skill: "writing", type: "choice", prompt: "Which opening is most suitable for a formal proposal?", options: ["Hey, here is my idea", "This proposal outlines three measures designed to…", "You guys should really…", "I wanna talk about…"], answer: 1, explanation: "The second option states purpose and uses a formal register." }
  ];

  window.EnglishUniversityData = { levels, skills, activities, projects, diagnostic };
})();
