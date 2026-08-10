(() => {
  "use strict";

  const grammar = (level, id, title, focus, form, example) => ({ level, id, title, focus, form, example });
  const grammarCatalog = [
    grammar("b1-plus", "present-simple", "Present Simple", "habits, facts, routines and state verbs", "subject + base verb / -s", "She works in a community library."),
    grammar("b1-plus", "present-continuous", "Present Continuous", "actions now, temporary situations and changing trends", "am/is/are + verb-ing", "They are renovating the station."),
    grammar("b1-plus", "present-perfect", "Present Perfect", "experiences, recent results and unfinished time", "have/has + past participle", "I have already sent the form."),
    grammar("b1-plus", "present-perfect-continuous", "Present Perfect Continuous", "activity, duration, temporary repetition and visible recent evidence", "have/has been + verb-ing", "I have been studying since the library opened."),
    grammar("b1-plus", "past-simple", "Past Simple", "completed events in finished past time", "verb-ed / irregular past", "We arrived before the gates opened."),
    grammar("b1-plus", "past-continuous", "Past Continuous", "background actions and interrupted events", "was/were + verb-ing", "I was reading when the lights went out."),
    grammar("b1-plus", "past-perfect", "Past Perfect", "an earlier event before a past reference", "had + past participle", "The train had left before we reached the platform."),
    grammar("b1-plus", "past-perfect-continuous", "Past Perfect Continuous", "an ongoing earlier activity and its duration or result", "had been + verb-ing", "They had been waiting for an hour when the doors opened."),
    grammar("b1-plus", "future-forms", "Future Forms", "will, going to, present continuous and timetables", "will / be going to / be + ing / present simple", "The course starts on Monday, but I’m meeting the tutor tomorrow."),
    grammar("b1-plus", "modals", "Modals", "ability, obligation, permission, advice and probability", "modal + base verb", "You should check the instructions first."),
    grammar("b1-plus", "comparatives", "Comparatives and Superlatives", "comparing people, places, processes and results", "-er / more / the most", "This route is less expensive than the old one."),
    grammar("b1-plus", "conditionals", "First and Second Conditionals", "real future possibilities and hypothetical situations", "if + present, will / if + past, would", "If we leave now, we’ll catch the early bus."),
    grammar("b1-plus", "passive", "Basic Passive Voice", "focus on the receiver when the agent is unknown or less important", "be + past participle", "The forms are checked every Friday."),
    grammar("b1-plus", "reported-speech", "Reported Speech", "reporting statements, questions and requests", "reporting verb + adjusted clause", "She said that the meeting was cancelled."),
    grammar("b1-plus", "relative-clauses", "Relative Clauses", "defining and adding information about people and things", "who / which / that / whose", "The colleague who designed it is presenting today."),
    grammar("b1-plus", "gerunds-infinitives", "Gerunds and Infinitives", "verb patterns after common verbs and expressions", "verb + -ing / to + verb", "They agreed to postpone the launch."),
    grammar("b1-plus", "articles", "Articles", "specific, general, singular countable and uncountable reference", "a/an / the / zero article", "The advice was useful; advice is not always specific."),
    grammar("b1-plus", "quantifiers", "Quantifiers", "amount, number, sufficiency and approximate quantity", "much / many / enough / a few / a little", "There are enough seats for everyone."),
    grammar("b1-plus", "determiners", "Determiners", "pointing, possession, distribution and reference", "this / that / each / my / either", "Each applicant receives a confirmation email."),
    grammar("b1-plus", "prepositions", "Prepositions", "time, place, movement and fixed combinations", "preposition + noun / -ing", "The workshop takes place on Thursday afternoon."),
    grammar("b1-plus", "phrasal-verbs", "Phrasal Verbs", "common verb-particle combinations in everyday English", "verb + particle (+ object)", "Please look over the report before sending it."),
    grammar("b1-plus", "sentence-building", "Sentence Building", "coordination, subordination and clear paragraph links", "clause + linker + clause", "Although the route was longer, we arrived on time."),

    grammar("b2", "mixed-tenses", "Mixed Tenses", "choosing aspect and time from a connected context", "simple / continuous / perfect viewpoints", "She has worked there for years but is considering a change."),
    grammar("b2", "narrative-tenses", "Narrative Tenses", "main events, background, flashback and duration in stories", "past simple / continuous / perfect", "He was driving home when he realised he had forgotten the key."),
    grammar("b2", "advanced-passive", "Advanced Passive", "continuous, perfect, reporting and agentless passive structures", "be + being/been + past participle", "The findings are believed to have been misinterpreted."),
    grammar("b2", "causative", "Causative Structures", "arranging for someone to do something or causing an outcome", "have/get + object + past participle", "We had the equipment tested before the expedition."),
    grammar("b2", "advanced-conditionals", "Advanced Conditionals", "mixed time references and alternatives to if", "unless / provided that / inversion", "Had we known earlier, we would have acted differently."),
    grammar("b2", "modal-deduction", "Modal Deduction", "certainty, probability and impossibility about present situations", "must / may / might / can’t + base or be-ing", "They must be waiting outside; the room is empty."),
    grammar("b2", "modal-perfects", "Modal Perfects", "deduction, criticism and unreal past alternatives", "modal + have + past participle", "She must have missed the announcement."),
    grammar("b2", "reported-speech", "Advanced Reported Speech", "reporting verbs, distancing and changes in stance", "verb + object + infinitive / that-clause", "The witness denied having seen the vehicle."),
    grammar("b2", "inversion", "Inversion", "emphasis after negative and limiting expressions", "negative opener + auxiliary + subject", "Rarely have we seen such a rapid recovery."),
    grammar("b2", "emphasis", "Emphasis", "making a contrast or correction prominent", "do / cleft / fronting", "What matters is how the evidence is interpreted."),
    grammar("b2", "relative-clauses", "Advanced Relative Clauses", "non-defining clauses, prepositions and reduced forms", "which / whom / preposition + which", "The proposal, which was revised twice, was accepted."),
    grammar("b2", "reduced-clauses", "Reduced Clauses", "compressing information while keeping the relationship clear", "-ing / -ed / to-infinitive clause", "Designed for small teams, the tool is easy to adapt."),
    grammar("b2", "participles", "Participle Clauses", "cause, time, result and contrast in concise sentences", "having + past participle / -ing / -ed", "Having reviewed the data, the team changed its conclusion."),
    grammar("b2", "noun-phrases", "Complex Noun Phrases", "dense information in academic and professional writing", "determiner + modifiers + head noun + postmodifier", "A carefully monitored long-term intervention was introduced."),
    grammar("b2", "advanced-articles", "Advanced Articles", "institutions, abstract nouns, generic reference and titles", "the / zero article by reference type", "Research takes time, but the research in this report is focused."),
    grammar("b2", "advanced-quantifiers", "Advanced Quantifiers", "degree, proportion, distributive reference and formal alternatives", "a great deal of / each of / a minority of", "A significant proportion of participants requested support."),
    grammar("b2", "ellipsis", "Substitution and Ellipsis", "avoiding repetition while keeping meaning recoverable", "one/ones, so/neither, omitted clause", "Some preferred the online option; others did not."),
    grammar("b2", "linking", "Linking Structures", "concession, cause, result, condition and sequencing", "discourse linker + clause / noun phrase", "The method is simple; nevertheless, it requires training."),
    grammar("b2", "register", "Formal and Informal Register", "matching grammar and vocabulary to audience and purpose", "directness, modality and lexical choice", "Could you clarify the expected timeline?"),

    grammar("b2-plus", "mixed-conditionals", "Mixed Conditionals", "connecting a past condition to a present result or a present condition to a past result", "if + past perfect, would + base / if + past, would have + past participle", "If the team had planned earlier, the launch would be less stressful now."),
    grammar("b2-plus", "advanced-modals", "Nuanced Modal Meaning", "degrees of certainty, criticism, willingness and tentative interpretation", "modal expression + base/perfect/continuous aspect", "The figures may have been affected by a change in sampling."),
    grammar("b2-plus", "negative-inversion", "Negative and Limiting Inversion", "formal emphasis after rarely, little, not only and under no circumstances", "fronted negative phrase + auxiliary + subject", "Only after the audit did the pattern become visible."),
    grammar("b2-plus", "emphatic-do", "Emphatic Do", "correcting, insisting and adding contrast in speech and writing", "do/does/did + base verb", "The method does produce useful results in small teams."),
    grammar("b2-plus", "reduced-relative", "Reduced Relative Clauses", "compressing defining and non-defining information without losing the relationship", "-ing / -ed / to-infinitive clause", "The report published last month challenges the earlier assumption."),
    grammar("b2-plus", "participle-cause", "Participle Clauses for Cause and Time", "linking events concisely through cause, time, result and concession", "having + past participle / -ing / -ed", "Having reviewed the evidence, the panel requested a second test."),
    grammar("b2-plus", "complex-noun-phrases", "Advanced Noun Phrases", "packing precise information into academic and professional noun groups", "determiner + modifiers + head + postmodifier", "A carefully monitored two-year intervention was introduced."),
    grammar("b2-plus", "substitution-ellipsis", "Substitution and Ellipsis", "avoiding repetition while keeping the intended comparison recoverable", "one/ones, so/neither, omitted clause", "The online route is cheaper than the physical one, but less personal."),
    grammar("b2-plus", "concessive-linking", "Concessive Linking", "acknowledging a limitation while maintaining a qualified claim", "although / even though / despite / that said", "The approach is demanding; that said, it produces consistent results."),
    grammar("b2-plus", "reporting-distance", "Reporting and Distancing", "attributing claims while controlling certainty and responsibility", "reporting verb + that/gerund/infinitive", "The authors are believed to have underestimated the practical cost."),
    grammar("b2-plus", "advanced-passive", "Reporting Passive", "using passive reporting to foreground evidence and distance the writer", "it is believed/reported + that / subject + is believed + to", "The device is thought to reduce energy use in cold conditions."),
    grammar("b2-plus", "hypothetical-alternatives", "Hypothetical Alternatives", "offering alternatives to if for formal conditions and consequences", "were it not for / had it not been for / otherwise", "Were it not for the grant, the community project would close."),
    grammar("b2-plus", "focus-fronting", "Focus Fronting", "moving information to the front to create contrast and organise a response", "fronted complement + normal order or inversion", "More difficult to explain was the change in public trust."),
    grammar("b2-plus", "discourse-stance", "Discourse Stance", "showing agreement, reservation, reformulation and the strength of a claim", "stance adverbial + clause / reformulating linker", "To some extent, the results support the proposed explanation."),
    grammar("b2-plus", "complex-complementation", "Complex Complementation", "choosing infinitive, gerund and that-clause patterns after reporting and evaluation verbs", "verb + object + infinitive / gerund / that-clause", "The review recommends that the procedure be repeated with a larger sample."),

    grammar("c1", "advanced-inversion", "Advanced Inversion", "formal emphasis, conditional inversion and fronted adverbials", "auxiliary + subject after fronted expression", "Not until the second trial did the pattern become clear."),
    grammar("c1", "cleft-sentences", "Cleft Sentences", "focusing one element of a complex message", "it is/was…that/who / what…is", "What the evidence shows is a change in behaviour."),
    grammar("c1", "fronting", "Fronting", "placing a phrase first to organise discourse or create contrast", "fronted complement + inversion/normal order", "More difficult to explain was the final result."),
    grammar("c1", "complex-conditionals", "Complex Conditionals", "remote, mixed and implied conditions with nuanced outcomes", "if / were it not for / otherwise", "Were it not for the funding, the project would have ended."),
    grammar("c1", "complex-modality", "Complex Modality", "degrees of certainty, obligation, willingness and tentativeness", "modal expressions + aspect + stance", "The pattern would appear to support a narrower claim."),
    grammar("c1", "hedging", "Hedging", "limiting claims so they match evidence and academic convention", "may / tend to / appears to / arguably", "The findings arguably point to a wider structural issue."),
    grammar("c1", "nominalisation", "Nominalisation", "compressing actions and relations into formal noun phrases", "verb/adjective → abstract noun", "The rapid expansion of the scheme created new demands."),
    grammar("c1", "participle-clauses", "Advanced Participle Clauses", "layering time, cause and concession without repetitive clauses", "having been / being / -ed participle", "Having been warned, the team proceeded cautiously."),
    grammar("c1", "sophisticated-linking", "Sophisticated Linking", "cohesion across paragraphs and complex arguments", "concessive, reformulating and additive devices", "That said, the limitation does not invalidate the central observation."),
    grammar("c1", "discourse-grammar", "Discourse Grammar", "topic, focus, given/new information and interactional meaning", "information structure + stance", "The point is not that the system fails, but that its scope is limited."),
    grammar("c1", "formal-register", "Formal and Informal Structures", "adapting syntax, directness and vocabulary to demanding audiences", "register-sensitive alternatives", "We regret to inform you that the revised schedule cannot be accommodated."),
    grammar("c1", "nuanced-tenses", "Nuanced Tense Choices", "viewpoint, evidential distance and subtle time connections", "aspect + discourse reference", "She has been questioning the assumption rather than rejecting it outright."),
    grammar("c1", "advanced-reported-speech", "Advanced Reported Speech", "stance, attribution, distancing and embedded evaluation", "reporting verb + clause/gerund/infinitive", "The authors acknowledge having underestimated the cost."),
    grammar("c1", "advanced-emphasis", "Advanced Emphasis", "contrastive focus, correction and rhetorical prominence", "cleft, fronting, do, lexical focus", "It was the timing, rather than the principle, that caused concern."),
    grammar("c1", "advanced-ellipsis", "Advanced Ellipsis and Substitution", "economy and cohesion in formal speech and writing", "omitted recoverable material / substitution", "The first model is cheaper than the second, but less reliable."),
    grammar("c1", "complex-sentences", "Complex Sentence Construction", "controlling long sentences without losing clarity", "nested clauses + information hierarchy", "The proposal, which was revised after consultation, addresses a problem that had previously been overlooked.")
  ];

  const vocabTopic = (level, id, title, focus, entries) => ({ level, id, title, focus, entries });
  const vocabularyCatalog = [
    vocabTopic("b1-plus", "education", "Education", "learning, assessment and study habits", [["assignment", "submit an assignment", "task"], ["revise", "revise for an exam", "review"]]),
    vocabTopic("b1-plus", "technology", "Technology", "devices, apps and everyday digital actions", [["update", "update software", "upgrade"], ["access", "access an account", "enter"]]),
    vocabTopic("b1-plus", "health", "Health", "symptoms, treatment and healthy routines", [["recover", "recover from an illness", "get better"], ["appointment", "book an appointment", "meeting"]]),
    vocabTopic("b1-plus", "relationships", "Relationships", "communication, trust and disagreement", [["supportive", "a supportive friend", "helpful"], ["misunderstanding", "clear up a misunderstanding", "confusion"]]),
    vocabTopic("b1-plus", "travel", "Travel", "transport, accommodation and practical problems", [["departure", "departure time", "leaving"], ["destination", "reach a destination", "place"]]),
    vocabTopic("b1-plus", "everyday-life", "Everyday Life", "routines, services, shopping and household language", [["appointment", "cancel an appointment", "arrangement"], ["repair", "repair a device", "fix"]]),
    vocabTopic("b2", "science", "Science", "methods, evidence, results and limitations", [["hypothesis", "test a hypothesis", "proposal"], ["reliable", "reliable evidence", "dependable"]]),
    vocabTopic("b2", "environment", "Environment", "climate, conservation and sustainable choices", [["emission", "reduce emissions", "release"], ["sustainable", "sustainable development", "maintainable"]]),
    vocabTopic("b2", "society", "Society", "communities, inequality, identity and change", [["inequality", "address inequality", "unfairness"], ["belonging", "a sense of belonging", "connection"]]),
    vocabTopic("b2", "culture", "Culture", "art, heritage, identity and cultural participation", [["heritage", "cultural heritage", "legacy"], ["audience", "reach a wider audience", "viewers"]]),
    vocabTopic("b2", "media", "Media", "reporting, sources, framing and public attention", [["headline", "run a headline", "title"], ["bias", "media bias", "partiality"]]),
    vocabTopic("b2", "work", "Work", "roles, performance, teamwork and development", [["workload", "manage a workload", "amount of work"], ["promotion", "be considered for promotion", "advancement"]]),
    vocabTopic("b2-plus", "politics", "Politics", "policy, representation, institutions and debate", [["constituency", "represent a constituency", "electoral area"], ["legislation", "pass legislation", "law-making"]]),
    vocabTopic("b2-plus", "economics", "Economics", "growth, markets, inflation and public resources", [["revenue", "generate revenue", "income"], ["inflation", "rising inflation", "price growth"]]),
    vocabTopic("b2-plus", "business", "Business", "strategy, risk, negotiation and performance", [["stakeholder", "consult stakeholders", "interested party"], ["feasible", "a feasible proposal", "practical"]]),
    vocabTopic("b2-plus", "psychology", "Psychology", "behaviour, motivation, memory and wellbeing", [["cognitive", "cognitive load", "mental"], ["reinforce", "reinforce a habit", "strengthen"]]),
    vocabTopic("b2-plus", "crime-law", "Crime and Law", "evidence, rights, courts and regulation", [["witness", "a key witness", "observer"], ["comply", "comply with regulations", "follow"]]),
    vocabTopic("c1", "ai", "Artificial Intelligence", "models, data, bias, automation and accountability", [["deploy", "deploy a model", "put into use"], ["transparent", "a transparent process", "open"]]),
    vocabTopic("c1", "engineering", "Engineering", "design, systems, testing and failure analysis", [["constraint", "design constraint", "limitation"], ["prototype", "test a prototype", "early model"]]),
    vocabTopic("c1", "space", "Space", "exploration, instrumentation and scientific uncertainty", [["orbital", "orbital mission", "related to an orbit"], ["payload", "launch a payload", "cargo"]]),
    vocabTopic("c1", "climate", "Climate", "adaptation, mitigation and contested evidence", [["resilience", "build climate resilience", "capacity to recover"], ["mitigate", "mitigate the impact", "reduce"]]),
    vocabTopic("c1", "finance", "Finance", "investment, risk, regulation and long-term planning", [["liability", "meet a liability", "financial obligation"], ["diversify", "diversify a portfolio", "spread risk"]])
  ];

  const reading = (level, id, genre, title, text, focus) => ({ level, id, genre, title, text, focus });
  const readingLibrary = [
    reading("b1-plus", "reading-library-blog", "Blog", "Learning a new route", "When the bus route changed, I first treated the extra walk as a nuisance. After a week, I noticed that I arrived calmer and knew more people on the street. A small inconvenience had become part of a better routine.", "main idea, sequence and personal reflection"),
    reading("b1-plus", "reading-library-interview", "Interview", "A first week at work", "The new assistant says the hardest part was not the software but knowing when to ask a question. By Friday, she had begun writing down uncertainties before speaking to her supervisor.", "detail, inference and workplace vocabulary"),
    reading("b2", "reading-library-news", "News report", "The quiet repair", "A town repaired a public square in stages rather than closing it for one large project. Traders complained about the slow progress, yet footfall increased as each section reopened.", "contrast, evidence and author purpose"),
    reading("b2", "reading-library-science", "Science article", "Why small trials matter", "Small trials cannot settle every question, but they can reveal which questions deserve a larger investment. Their value lies in disciplined uncertainty rather than premature certainty.", "argument, limitation and key vocabulary"),
    reading("b2-plus", "reading-library-professional", "Professional memo", "A meeting that produces decisions", "A meeting becomes useful when participants know which decisions are required, which information is missing and who will act next. Conversation alone is not evidence of progress.", "purpose, register and implied recommendation"),
    reading("b2-plus", "reading-library-environment", "Opinion article", "The cost of convenience", "Convenience is not free when its hidden costs are transferred to workers, communities or future users. A serious evaluation asks who benefits, who pays and which alternatives remain possible.", "critical questions and framing"),
    reading("c1", "reading-library-academic", "Academic essay", "When measurement changes behaviour", "A measure introduced to describe performance can eventually become a target. Once people optimise for the number rather than the underlying purpose, apparent improvement may conceal a change in behaviour.", "assumption, implication and academic stance"),
    reading("c1", "reading-library-technology", "Long-form analysis", "The promise of friction", "Designers often remove every pause from a system, yet some pauses protect judgement. The challenge is not to celebrate friction or eliminate it, but to distinguish needless effort from useful deliberation.", "synthesis, counterargument and tone")
  ];

  const writingCatalog = [
    { level: "b1-plus", genre: "Message", title: "Explain a change of plan", wordLimit: "80–100 words", structure: ["reason", "alternative", "question"], language: ["time markers", "friendly openings", "future forms"] },
    { level: "b1-plus", genre: "Description", title: "Describe a useful object", wordLimit: "100–120 words", structure: ["identify", "details", "personal value"], language: ["relative clauses", "adjectives", "present forms"] },
    { level: "b2", genre: "Opinion essay", title: "Should public spaces offer free Wi-Fi?", wordLimit: "180–220 words", structure: ["issue", "two viewpoints", "qualified conclusion"], language: ["concession", "examples", "formal linking"] },
    { level: "b2", genre: "Review", title: "Review a course or service", wordLimit: "180–220 words", structure: ["overview", "strengths", "limitations", "recommendation"], language: ["evaluative adjectives", "contrast", "audience awareness"] },
    { level: "b2", genre: "Report", title: "Improve a shared workspace", wordLimit: "200–240 words", structure: ["findings", "problems", "recommendations"], language: ["headings", "passive voice", "action verbs"] },
    { level: "b2-plus", genre: "Proposal", title: "Reduce unnecessary meetings", wordLimit: "220–260 words", structure: ["purpose", "options", "recommendation", "implementation"], language: ["modality", "risk", "measurement"] },
    { level: "b2-plus", genre: "Narrative", title: "A decision made too late", wordLimit: "220–260 words", structure: ["setting", "turning point", "consequence", "reflection"], language: ["narrative tenses", "participle clauses", "cohesion"] },
    { level: "c1", genre: "Critical response", title: "Does convenience improve life?", wordLimit: "260–300 words", structure: ["thesis", "evidence", "counterargument", "qualification"], language: ["hedging", "nominalisation", "synthesis"] },
    { level: "c1", genre: "Formal correspondence", title: "Respond to a disputed decision", wordLimit: "230–270 words", structure: ["purpose", "acknowledge", "challenge", "requested action"], language: ["formal register", "polite firmness", "complex sentences"] },
    { level: "c1", genre: "Academic synthesis", title: "Combine two viewpoints", wordLimit: "280–320 words", structure: ["source framing", "comparison", "evaluation", "conclusion"], language: ["reporting verbs", "discourse markers", "cautious claims"] }
  ];

  const speakingSimulations = [
    { level: "b1-plus", id: "sim-airport", title: "Airport problem", roles: ["passenger", "service agent"], goal: "Explain a missed connection and find a practical alternative." },
    { level: "b1-plus", id: "sim-restaurant", title: "Restaurant request", roles: ["customer", "server"], goal: "Ask about ingredients, explain a preference and resolve a small problem politely." },
    { level: "b2", id: "sim-job-interview", title: "Job interview", roles: ["candidate", "interviewer"], goal: "Give a specific example, answer a follow-up and ask an informed question." },
    { level: "b2", id: "sim-university", title: "University interview", roles: ["applicant", "adviser"], goal: "Explain a study plan, justify a choice and respond to a concern." },
    { level: "b2", id: "sim-doctor", title: "Doctor appointment", roles: ["patient", "doctor"], goal: "Describe symptoms accurately, ask for clarification and agree on next steps." },
    { level: "b2-plus", id: "sim-meeting", title: "Team meeting", roles: ["facilitator", "team members"], goal: "Set an agenda, manage disagreement and close with decisions." },
    { level: "b2-plus", id: "sim-technical", title: "Technical explanation", roles: ["engineer", "non-specialist client"], goal: "Explain a system, check understanding and discuss one trade-off." },
    { level: "c1", id: "sim-debate", title: "Public debate", roles: ["speaker", "challenger"], goal: "Defend a qualified position and respond to a counterargument." },
    { level: "c1", id: "sim-academic", title: "Academic discussion", roles: ["researcher", "seminar group"], goal: "Interpret evidence, challenge an assumption and propose a question." },
    { level: "c1", id: "sim-negotiation", title: "Business negotiation", roles: ["client", "supplier"], goal: "Identify interests, make concessions and agree on a review condition." }
  ];

  const listeningLibrary = [
    { level: "b1-plus", id: "listen-dialogue", genre: "Dialogue", title: "Changing a booking", transcript: "I can move your appointment to Thursday afternoon, but I need to check whether the specialist is available.", focus: "offers, conditions and key details" },
    { level: "b1-plus", id: "listen-announcement", genre: "Announcement", title: "Station update", transcript: "Passengers for the coastal service should use platform six. The train will depart ten minutes later than scheduled.", focus: "gist and corrected information" },
    { level: "b2", id: "listen-interview", genre: "Interview", title: "Learning from a failed launch", transcript: "The launch did not fail because the idea was weak; we failed to test how new users would understand the first screen.", focus: "cause, contrast and speaker attitude" },
    { level: "b2", id: "listen-news", genre: "News report", title: "A policy in practice", transcript: "The policy was announced last year, but local authorities have applied it differently, which makes national comparisons difficult.", focus: "contrast and implication" },
    { level: "b2-plus", id: "listen-lecture", genre: "Lecture", title: "How measures shape behaviour", transcript: "Once an indicator becomes a target, people may improve the indicator without improving the underlying activity.", focus: "main claim and example" },
    { level: "b2-plus", id: "listen-meeting", genre: "Meeting", title: "Choosing a pilot", transcript: "Let’s test the smaller version first. It will not answer every question, but it will tell us whether the process is workable.", focus: "proposal and limitation" },
    { level: "c1", id: "listen-academic", genre: "Academic explanation", title: "Evidence and uncertainty", transcript: "Uncertainty is not the absence of knowledge; it is a description of how confidently a claim can be extended beyond the evidence.", focus: "definition and nuance" },
    { level: "c1", id: "listen-debate", genre: "Debate", title: "The cost of speed", transcript: "Speed is valuable when delay causes harm, but speed without review simply moves errors further downstream.", focus: "concession, contrast and stance" }
  ];

  const pronunciationCatalog = [
    { level: "b1-plus", id: "pron-vowels", title: "Short and long vowels", focus: "ship/sheep, full/fool, live/leave", task: "listen, choose and repeat minimal pairs" },
    { level: "b1-plus", id: "pron-consonants", title: "Voicing contrasts", focus: "fan/van, rice/rise, bat/bad", task: "feel the vibration and record contrast pairs" },
    { level: "b2", id: "pron-word-stress", title: "Word stress and families", focus: "PHOtograph, phoTOGraphy, photoGRAPHic", task: "mark stress before reading a word family" },
    { level: "b2", id: "pron-sentence-stress", title: "Sentence stress", focus: "content words, corrections and contrast", task: "move focus to change the implied meaning" },
    { level: "b2-plus", id: "pron-linking", title: "Linking and reductions", focus: "consonant–vowel linking and weak forms", task: "shadow a short natural-speed sentence" },
    { level: "b2-plus", id: "pron-rhythm", title: "Rhythm and thought groups", focus: "pauses, prominence and predictable timing", task: "divide a long sentence into thought groups" },
    { level: "c1", id: "pron-intonation", title: "Intonation and stance", focus: "support, doubt, correction and irony", task: "say one sentence with three attitudes" },
    { level: "c1", id: "pron-connected", title: "Connected academic speech", focus: "reductions without losing intelligibility", task: "listen, annotate and deliver a short explanation" }
  ];

  window.EnglishCatalogs = { grammarCatalog, vocabularyCatalog, readingLibrary, writingCatalog, speakingSimulations, listeningLibrary, pronunciationCatalog };
})();
