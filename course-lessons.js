(() => {
  "use strict";

  const university = window.EnglishUniversityData;
  const catalogs = window.EnglishCatalogs;
  if (!university || !catalogs) return;

  const lesson = (title, explanation, model, guided, output) => ({ title, explanation, model, guided, output });

  const blueprints = {
    "b1-grammar": {
      question: "How do time, viewpoint and sentence focus work together?",
      terms: ["reference time", "state", "event", "result", "duration", "agent"],
      sequence: [
        lesson("Build the tense map", "Begin with reference time: now, unfinished time, finished past or a later point. Then decide whether the speaker presents a fact, an activity, a result or a duration.", "I work from home on Fridays. / I am working from home today. / I have worked from home for three years.", "Label the reference time and viewpoint in six sentences before naming the tense.", "Write four connected sentences about study or work, each using a different viewpoint."),
        lesson("Control common contrasts", "Simple forms present facts or complete events; continuous forms place the listener inside an activity. Perfect forms connect one time to another and should not be chosen only because a sentence contains since or for.", "She read the report yesterday. / She has read the report, so she can discuss it now.", "Choose between simple, continuous and perfect forms and justify every answer with a meaning clue.", "Explain one real change in your life using a stable fact, a current process and a present result."),
        lesson("Modals, conditions and future choices", "Modals express ability, obligation, advice, probability and deduction. Future meaning can use present forms, be going to or will; the form depends on schedule, arrangement, prior intention, evidence or a decision made now.", "The train leaves at six. We are meeting at the station. It is going to rain. I will bring an umbrella.", "Sort twelve contexts by communicative purpose before completing the verb phrase.", "Plan a weekend and explain which parts are schedules, arrangements, intentions and predictions."),
        lesson("Focus with passive and reported language", "The passive foregrounds the receiver or process; reported language adjusts viewpoint, reference and register. Preserve the original time relationship instead of changing forms mechanically.", "The samples were tested twice. The researcher said that the results required further analysis.", "Transform active statements and direct quotations, then compare what information becomes prominent.", "Write a short news update that includes two passives and two reported statements."),
        lesson("Accuracy clinic and transfer", "Articles, determiners, prepositions, relative clauses and verb patterns often carry more error risk than long verb phrases. Use a final editing pass that checks noun phrases, complementation and sentence boundaries.", "The advice that my tutor gave me was useful. I avoided making the same mistake again.", "Correct a paragraph by naming the rule behind each change rather than only replacing words.", "Create a personal error checklist and apply it to a 120-word response."),
      ]
    },
    "b1-vocabulary": {
      question: "How can a learner turn a known word into usable language?",
      terms: ["meaning", "collocation", "word family", "register", "phrasal verb", "retrieval"],
      sequence: [
        lesson("Learn lexical chunks", "A word becomes useful when it is stored with its common partners. Learn a noun with a verb and adjective, and learn a verb with its typical object or preposition.", "make progress · steady progress · progress towards a goal", "Build three collocation branches for six familiar words.", "Use eight new combinations in a connected account of your week."),
        lesson("Build word families", "Prefixes and suffixes change grammar and sometimes meaning. Identify the sentence slot before selecting a noun, verb, adjective or adverb.", "decide → decision → decisive → decisively", "Mark the grammatical slot in ten sentences and form the required word.", "Create a four-column family table and write one natural sentence per form."),
        lesson("Use phrasal verbs in context", "Phrasal verbs are organised by meaning, situation and register, not by the particle alone. Notice whether the object can separate the verb and particle.", "look the figure up / look it up; look after a client", "Group phrasal verbs by task: starting, checking, postponing, solving and finishing.", "Tell a short workplace or travel story using five phrasal verbs naturally."),
        lesson("Choose synonym and register", "Near-synonyms differ in strength, connotation, grammar and formality. Test a replacement in the complete sentence and for the intended audience.", "helpful advice / valuable evidence / substantial improvement", "Compare synonym pairs and reject one replacement that changes the tone or collocation.", "Rewrite one message for a friend and for a manager, explaining three lexical changes."),
        lesson("Retrieve without translation", "Active recall strengthens access. Define a word in English, give a typical situation, contrast it with a near-synonym and use it before checking notes.", "A deadline is the latest time by which a task must be finished.", "Run timed definition and circumlocution rounds with twelve target words.", "Record a two-minute explanation that uses ten words from the module without a list."),
      ]
    },
    "b1-reading": {
      question: "How can a reader build meaning without translating every sentence?",
      terms: ["gist", "detail", "reference", "sequence", "inference", "evidence"],
      sequence: [
        lesson("Read for the situation", "On the first reading, identify who is communicating, why, where and what changes. Ignore a few unknown words if the central situation remains clear.", "A notice may inform, warn, request action or explain a change.", "Read three short genres in ninety seconds and write a one-sentence gist for each.", "Choose a practical text and explain its audience, purpose and required action."),
        lesson("Find detail efficiently", "A detail question gives a search target. Predict whether the answer will be a name, time, reason, condition or result, then scan for the surrounding idea.", "The ticket is free, but visitors must reserve a time.", "Answer detail questions while underlining the phrase that proves each response.", "Write five questions about a text and identify the exact evidence for each answer."),
        lesson("Track sequence and reference", "Pronouns, demonstratives and linkers create chains across sentences. Resolve what each item refers to and how however, therefore or meanwhile changes the direction.", "The trial was small. Nevertheless, it revealed a serious design problem.", "Draw a sequence map and connect four reference words to their antecedents.", "Retell a short narrative without losing the order or the cause-and-effect links."),
        lesson("Infer from evidence", "An inference is a conclusion supported by details but not stated word for word. Combine at least two clues and keep the conclusion no stronger than the evidence.", "She checked the address twice and arrived forty minutes early: the meeting probably mattered to her.", "Rank four possible inferences from strongly supported to speculative.", "Write one inference, cite two clues and name one alternative explanation."),
        lesson("Respond critically", "Separate a writer's claim from examples and opinions. Ask what evidence is offered, which perspective is absent and whether the conclusion applies beyond the case described.", "One positive example can illustrate a possibility, but it cannot prove a universal claim.", "Annotate claim, evidence, limitation and loaded language in an opinion paragraph.", "Write a four-sentence response that agrees partly, challenges one assumption and asks one question."),
      ]
    },
    "b1-communication": {
      question: "How can connected English remain clear when planning time is limited?",
      terms: ["purpose", "sequence", "interaction", "repair", "paragraph", "self-review"],
      sequence: [
        lesson("Shape a clear message", "Begin with audience and purpose. A short message still needs the situation, the essential detail and the action or response expected next.", "I cannot attend on Thursday because my shift has changed. Could we meet on Friday instead?", "Reorder five messages so the reason, alternative and question are easy to follow.", "Write an 80-word message that changes a plan without sounding abrupt."),
        lesson("Describe with useful detail", "Organise a description from overview to selected detail and personal significance. Relative clauses and precise adjectives can add information without producing a list.", "The desk by the window, which I found at a market, is where I do most of my writing.", "Expand basic noun phrases with location, function and a defining detail.", "Describe a place or object for one minute, then create a 120-word written version."),
        lesson("Tell a complete story", "A listener needs setting, change, response and result. Past continuous builds background; past simple moves the sequence; time markers prevent the events from becoming a list.", "I was waiting for the bus when a stranger handed me a wallet that someone had dropped.", "Complete a four-part story map and retell it with six sequence markers.", "Record a ninety-second personal story and revise its least clear transition."),
        lesson("Interact and repair", "Conversation includes clarification, checking and repair. When a word is unavailable, describe its category, function or appearance and keep the interaction moving.", "Do you mean the earlier version? / It is the device you use to measure temperature.", "Practise requesting clarification and paraphrasing in six everyday role cards.", "Complete a three-minute service conversation with one misunderstanding and a successful repair."),
        lesson("Review production", "Self-review should separate content from language. First confirm that the response achieves its purpose, then check organisation, grammar, vocabulary, register and intelligibility.", "The question is not only 'Is it correct?' but also 'Can the reader or listener act on it?'", "Apply an eight-criterion checklist to a sample response and prioritise three revisions.", "Repeat one written and one spoken task, documenting the change that improved each version."),
      ]
    },
    "b1-sound": {
      question: "Which pronunciation choices make intermediate speech easier to understand?",
      terms: ["phoneme", "voicing", "word stress", "sentence stress", "rhythm", "linking"],
      sequence: [
        lesson("Hear sound contrasts", "Minimal pairs isolate one phoneme. Compare mouth position, vowel length or voicing, then confirm that the contrast changes the word a listener hears.", "ship / sheep · fan / van · rice / rise", "Listen, choose and repeat twelve pairs while recording uncertain contrasts.", "Create six short sentences that place difficult pairs in meaningful context."),
        lesson("Control word stress", "English words normally have one strongest syllable. Stress can move across a word family, changing vowel quality in the unstressed syllables.", "PHOtograph · phoTOGraphy · photoGRAPHic", "Mark stress before hearing the model, then correct the prediction.", "Build a personal list of ten useful words and record each inside a sentence."),
        lesson("Make key words prominent", "Sentence stress highlights new, contrasting or important information. Grammar words are often less prominent unless they are corrected or contrasted.", "I asked for the BLUE file. / I ASKED for the blue file.", "Move the main stress across one sentence and identify the implied correction.", "Say five short updates with one clearly selected focus in each."),
        lesson("Build rhythm and linking", "English rhythm groups words around prominent syllables. Linking a final consonant to a following vowel can make phrases easier to process without deleting meaning.", "pick_it_up · turn_it_off · an_old_idea", "Mark thought groups and links in a short dialogue before shadowing it.", "Shadow a thirty-second model twice and note one rhythm improvement."),
        lesson("Monitor intelligibility", "An accent does not need to disappear. Prioritise contrasts, stress and phrasing that affect the listener, and change one feature per attempt.", "A slower, well-grouped sentence is often clearer than an over-fast sentence with equal stress.", "Use a listener checklist to identify where meaning became uncertain.", "Record a one-minute explanation, obtain listener feedback and repeat the difficult section."),
      ]
    },

    "b2-grammar": {
      question: "How do proficient speakers choose among several grammatically possible forms?",
      terms: ["aspect", "modality", "focus", "clause", "cohesion", "register"],
      sequence: [
        lesson("Coordinate mixed tenses", "Establish one reference point and show how other events relate to it. Narrative and mixed-tense accuracy depends on timeline logic across sentences, not isolated gap clues.", "By the time the review began, the team had collected the data but was still checking two unusual results.", "Map the timeline in a short report and justify every tense shift.", "Write a 160-word account with present relevance, past sequence, background and an earlier cause."),
        lesson("Control passive and causative focus", "Use passive structures for processes, results or unknown agents; use have or get something done when a subject arranges a service. Keep responsibility explicit when it matters.", "The equipment is being calibrated. We had the sensors replaced last week.", "Rewrite a process description while explaining each change of focus.", "Create a short technical update containing active responsibility, two passives and one causative."),
        lesson("Express deduction and past possibility", "Modal meaning depends on evidence, certainty and time. Perfect infinitives locate deductions, criticism or unreal possibilities before the present viewpoint.", "She must have missed the message. They might be waiting outside. You should have checked the address.", "Rank deductions by certainty and distinguish evidence from advice or criticism.", "Explain three possible causes of a problem and label how certain each conclusion is."),
        lesson("Build clauses and emphasis", "Relative, participle and reduced clauses compress information; inversion and emphatic structures redirect attention. Use complexity only when the relationship remains easy to recover.", "Having reviewed the evidence, the panel revised its recommendation. Rarely had the issue received such attention.", "Expand and reduce clauses, comparing clarity, rhythm and register.", "Write a formal paragraph using one reduced clause and one controlled emphatic structure."),
        lesson("Link a coherent argument", "Linkers express logical relationships: addition, contrast, concession, cause, result and condition. Substitution and ellipsis reduce repetition when the missing meaning is recoverable.", "The first option is cheaper; nevertheless, the second is more reliable, and the client may prefer it.", "Choose linkers from the relationship rather than from punctuation alone.", "Write a balanced recommendation and edit it for cohesion, reference and unnecessary repetition."),
      ]
    },
    "b2-vocabulary": {
      question: "How can vocabulary become more precise, natural and audience-aware?",
      terms: ["collocation", "connotation", "register", "lexical set", "word formation", "precision"],
      sequence: [
        lesson("Build domain networks", "Organise vocabulary around a real question in science, environment, society, culture, media or work. Connect actors, actions, evidence, problems and outcomes.", "conduct research · gather evidence · obtain a result · acknowledge a limitation", "Build a concept map from twelve words and explain the relationships aloud.", "Write a short domain briefing that uses eight connected terms rather than a list."),
        lesson("Strengthen collocation", "Natural combinations are constrained: evidence can be compelling or inconclusive; a problem can be addressed, tackled or exacerbated. Record the pattern and an example.", "mounting pressure · address inequality · reach a wider audience", "Correct unnatural combinations and explain the grammatical pattern around each one.", "Create five sentence frames that you can reuse in discussion and writing."),
        lesson("Use word formation strategically", "Word formation changes grammatical role and can create evaluative meaning through prefixes. Check spelling changes, negative prefixes and whether the derived word is established.", "rely → reliable → reliability → unreliable", "Complete a contextual word-formation text and annotate the required part of speech.", "Build two word families and use contrasting positive and negative forms."),
        lesson("Control connotation and stance", "Words with similar dictionary meanings may suggest approval, doubt, intensity or social judgement. Choose a word that matches both evidence and relationship.", "persistent can praise determination; stubborn can criticise refusal to change.", "Compare near-synonyms inside short news, academic and conversational contexts.", "Rewrite a paragraph to sound neutral, supportive and sceptical without changing the facts."),
        lesson("Retrieve in production", "Vocabulary becomes available through spaced, effortful retrieval. Recall a collocation from a definition, use it in context, then review the exact pattern.", "A policy can be introduced, implemented, evaluated, revised or withdrawn.", "Complete timed retrieval rounds with meaning, collocation and sentence prompts.", "Give a two-minute explanation using ten target items and reflect on two retrieval gaps."),
      ]
    },
    "b2-reading": {
      question: "How can a reader interpret argument, tone and implied meaning across longer texts?",
      terms: ["claim", "evidence", "purpose", "tone", "inference", "framing"],
      sequence: [
        lesson("Map text structure", "Identify the opening problem, the development of evidence, shifts in viewpoint and the conclusion. Headings and linkers help, but paragraph function matters more than topic words.", "A paragraph may introduce a claim, qualify it, give a counterexample or draw an implication.", "Assign a function to each paragraph of a long article and justify two boundaries.", "Create a reverse outline that shows how one original article develops."),
        lesson("Read for purpose and audience", "Purpose shapes selection and explanation. A report may recommend action; an interview may reveal perspective; a feature may inform while inviting reflection.", "The same statistic can support a warning, a proposal or a retrospective explanation.", "Compare two genres on the same issue and identify what each expects from the reader.", "Rewrite one paragraph for a different audience and explain what changed."),
        lesson("Infer attitude and implication", "Attitude appears through evaluative vocabulary, quotation choices, hedging, concession and what the writer treats as surprising or obvious.", "The plan is ambitious, although its timetable remains difficult to defend.", "Mark language that creates cautious approval, distance or criticism.", "Write two supported inferences and state which words limit their certainty."),
        lesson("Evaluate evidence", "Ask whether evidence is relevant, sufficient, representative and independent. Correlation, anecdote and authority can contribute without proving the whole claim.", "A successful pilot shows possibility in one context; it does not guarantee universal effectiveness.", "Rank four pieces of evidence for one claim and explain the strongest limitation.", "Write a critical paragraph that preserves the finding while narrowing the conclusion."),
        lesson("Compare perspectives", "Cross-text reading requires a common comparison question. Separate agreement on facts from disagreement about causes, priorities or consequences.", "Two writers may accept the same data but disagree about which risk deserves attention.", "Complete a claim-evidence-stance matrix for three short viewpoints.", "Produce a synthesis that identifies agreement, disagreement and one unanswered question."),
      ]
    },
    "b2-writing": {
      question: "How does purpose control structure, evidence and register across B2 genres?",
      terms: ["audience", "thesis", "paragraph function", "cohesion", "register", "revision"],
      sequence: [
        lesson("Plan for task and reader", "Underline every content point, identify the reader and decide the response expected. A plan should assign one job to each paragraph before sentences are drafted.", "A report informs and recommends; a review evaluates for a particular audience.", "Compare three plans and identify which one fully answers the brief.", "Create paragraph plans for an essay, report and formal email on one topic."),
        lesson("Develop an argument", "A paragraph needs a controlling point, explanation, relevant support and a link to the task. Counterarguments should be represented fairly before response.", "Although cost is a legitimate concern, a limited pilot could test demand without committing the full budget.", "Expand short claims with reasons, examples, conditions and counterpoints.", "Write two contrasting body paragraphs and a qualified conclusion."),
        lesson("Control genre and register", "Genre is a relationship among writer, reader and action. Headings, directness, evaluation and recommendations change according to that relationship.", "It is recommended that... / I would strongly recommend... / You should definitely try...", "Sort language into report, proposal, review and email contexts, explaining borderline choices.", "Rewrite the same recommendation for a friend, a committee and a client."),
        lesson("Create cohesion", "Cohesion comes from logical progression, reference chains and controlled repetition, not a high number of linkers. Keep the noun visible when a pronoun could be ambiguous.", "The programme reduced waiting times. This improvement was strongest during the morning period.", "Repair a text with unclear references, overused linkers and repeated sentence openings.", "Revise a draft using a reverse outline and a reference-chain check."),
        lesson("Edit with evidence", "Self-review in passes: content, organisation, grammar, vocabulary, register and accuracy. Compare revisions and explain why the new version better serves the reader.", "A correction removes an error; a revision improves the communication decision.", "Apply a B2 rubric to a sample and prioritise three high-value changes.", "Complete a timed task, self-assess it and write a short revision memo."),
      ]
    },
    "b2-speaking": {
      question: "How can a speaker sustain interaction, reasoning and repair at B2?",
      terms: ["turn-taking", "comparison", "speculation", "negotiation", "repair", "follow-up"],
      sequence: [
        lesson("Build a structured long turn", "Use a brief opening, grouped points and a final position. Select details rather than describing everything, and keep the answer connected to the question.", "Both options improve access, but the first is more practical because...", "Give sixty-second responses from five-keyword plans.", "Record a two-minute compare-and-speculate answer and evaluate its structure."),
        lesson("Support and qualify opinions", "Move beyond preference by giving reasons, examples, limits and conditions. Calibrate certainty so a personal prediction does not sound like a proven fact.", "This could be effective in larger cities, provided that the service remains reliable.", "Turn unsupported claims into defensible B2 opinions.", "Respond to five abstract questions with a reason, example and qualification."),
        lesson("Solve problems collaboratively", "A collaborative task needs invitations, responses, comparison and a decision. Build on another idea before redirecting or disagreeing.", "That could address the cost issue. What about the effect on access?", "Use role cards to compare options and reach decisions under changing constraints.", "Complete a four-minute decision task and note where interaction changed the outcome."),
        lesson("Repair and clarify", "Fluent speakers signal uncertainty, paraphrase missing vocabulary and check shared understanding. Repair should preserve momentum rather than restart the whole response.", "What I mean is... / It is similar to... / Have I understood you correctly?", "Practise deliberate vocabulary gaps and clarification requests.", "Explain a technical or unfamiliar process to a non-specialist and respond to two questions."),
        lesson("Respond to counterarguments", "A useful response acknowledges the strongest part of an objection, identifies its scope and defends a revised position with evidence or a condition.", "That concern is valid when funding is fixed; however, a staged trial would allow the cost to be reviewed.", "Build concession-response pairs from six debate claims.", "Defend a position for three minutes and answer an unexpected challenge."),
      ]
    },
    "b2-listening": {
      question: "How can a listener follow natural-speed speech without understanding every word?",
      terms: ["gist", "detail", "attitude", "discourse marker", "reduction", "note-taking"],
      sequence: [
        lesson("Predict and listen for gist", "Use genre, title and question to predict likely content, then listen for the main purpose and outcome. Do not stop at the first unfamiliar phrase.", "A meeting update may explain progress, raise a risk or request a decision.", "Compare predictions with the actual gist after one uninterrupted listen.", "Summarise three short recordings in one sentence each."),
        lesson("Recover precise detail", "Before replay, turn the question into a precise listening target. Numbers, names and corrections often appear near contrast or reformulation.", "We planned to launch on Monday—Thursday is now more realistic.", "Complete detail grids from announcements and interviews.", "Create notes that distinguish original plan, change, reason and next action."),
        lesson("Recognise attitude", "Attitude is carried by evaluative language, intonation, hesitation, emphasis and contrast. Separate the literal proposition from the speaker's stance toward it.", "It is certainly ambitious; whether it is affordable is another matter.", "Match identical propositions delivered with different attitudes.", "Explain one speaker's attitude using two language or pronunciation clues."),
        lesson("Process connected speech", "Function words may reduce and neighbouring sounds may link. Listen first for stressed content words, then reconstruct the grammatical frame on replay.", "could have → could've; want to → wanna in informal speech", "Annotate reductions and thought groups in a short natural-speed extract.", "Shadow forty seconds while preserving key-word prominence and phrasing."),
        lesson("Take usable notes", "Notes should preserve the hierarchy of claim, support, example, limitation and action. Abbreviate repeated terms and leave space for relationships.", "claim → evidence → implication; problem → option → decision", "Compare a transcript-like note set with a structured note set.", "Listen to a two-minute explanation and produce a five-line reconstruction plus one inference."),
      ]
    },

    "b2p-grammar": {
      question: "How can complex grammar add precision without reducing clarity?",
      terms: ["inversion", "emphasis", "reduction", "ellipsis", "stance", "complementation"],
      sequence: [
        lesson("Use inversion for controlled emphasis", "Negative and limiting expressions can trigger auxiliary-subject inversion in formal or rhetorical contexts. The structure should highlight a genuine contrast or restriction.", "Only after the second trial did the team identify the cause.", "Transform sentences and explain why the fronted element deserves emphasis.", "Write a formal mini-report using two natural inversion patterns."),
        lesson("Focus information", "Clefts, fronting and emphatic do reorganise information around contrast, correction or the listener's current question.", "What the review revealed was a gap in the testing process. I do recognise the cost concern.", "Compare neutral and focused versions in context.", "Deliver a one-minute correction in which stress and grammar reinforce the same focus."),
        lesson("Compress clauses safely", "Reduced relatives and participle clauses remove recoverable material. Confirm time relationship and subject control so the compressed clause cannot attach to the wrong noun.", "Designed for small teams, the tool can be configured in minutes.", "Expand reductions to check meaning, then compress only the unambiguous cases.", "Revise a technical paragraph for concision without creating dangling participles."),
        lesson("Manage substitution and ellipsis", "Substitution and ellipsis avoid repetition when the missing form is recoverable from grammar and discourse. Register and rhythm determine whether the shortened version sounds natural.", "The first model was reliable; the second was not. Some supported the change, while others did not.", "Restore omitted language, then decide which repetitions should remain absent.", "Write a dialogue and a formal comparison using controlled substitution."),
        lesson("Choose nuanced complementation", "Verb, adjective and noun patterns control whether a complement uses an infinitive, gerund, that-clause or preposition. A form change may also change viewpoint.", "I remembered locking the door. / I remembered to lock the door.", "Classify complementation patterns and contrast meaning-sensitive pairs.", "Create a personal pattern bank and use eight items in a connected explanation."),
      ]
    },
    "b2p-language": {
      question: "How can advanced vocabulary express stance, degree and relationship?",
      terms: ["connotation", "idiom", "fixed phrase", "stance", "metaphor", "lexical precision"],
      sequence: [
        lesson("Map shades of meaning", "Advanced choices differ in intensity, evaluation and typical context. Place near-synonyms on a scale and verify their grammatical patterns.", "concerned → doubtful → sceptical → dismissive", "Rank lexical sets by degree and test them in short contexts.", "Describe one issue from cautiously positive, neutral and critical positions."),
        lesson("Control idioms and fixed expressions", "Idioms work when genre, relationship and frequency make them appropriate. Learn the whole grammatical frame and a realistic situation, not an isolated definition.", "raise a red flag · on balance · take something at face value", "Match fixed expressions to situations and reject register mismatches.", "Use five expressions in a meeting summary without forcing them."),
        lesson("Use sophisticated collocation", "Advanced fluency relies on predictable lexical partnerships around abstract nouns and reporting verbs.", "mounting evidence · a compelling case · draw a tentative conclusion", "Repair collocation errors in an academic-professional text.", "Build a reusable phrase bank around evidence, risk and decision-making."),
        lesson("Frame people and events fairly", "Labels can encode approval, blame or distance. Notice who receives humanising detail and whose actions are described through loaded verbs.", "campaigners / protesters / a vocal minority", "Rewrite a biased account in neutral language and identify every framing change.", "Produce two headlines with different framing, then write a balanced alternative."),
        lesson("Retrieve under pressure", "Make vocabulary available through timed paraphrase, definition, contrast and spontaneous use. Review precision after the communicative task, not during every sentence.", "If feasible is missing, describe something that can realistically be done with available resources.", "Complete rapid circumlocution and collocation rounds.", "Give a two-minute policy explanation using twelve target expressions."),
      ]
    },
    "b2p-reading": {
      question: "How can a reader evaluate competing arguments and hidden assumptions?",
      terms: ["assumption", "scope", "causation", "bias", "counterexample", "synthesis"],
      sequence: [
        lesson("Reconstruct the argument", "Separate the central claim, supporting reasons, evidence and conclusion. Record qualifiers because they define the claim's actual scope.", "The writer argues that the policy may help in dense cities, not that it will work everywhere.", "Turn an opinion article into an argument map.", "Write a neutral 100-word reconstruction before evaluating the view."),
        lesson("Identify assumptions", "Ask what must be true for the reason to support the conclusion. Assumptions may concern behaviour, fairness, causation or whether alternatives are available.", "If recordings exist, everyone will participate assumes availability produces engagement.", "Complete missing-assumption statements for five arguments.", "Challenge one assumption and revise the original claim so it remains defensible."),
        lesson("Distinguish causation from association", "A relationship between two measures may reflect direction, a third factor or selection. Strong causal claims require suitable comparison and a plausible mechanism.", "Higher participation and better results can move together without one directly causing the other.", "Evaluate causal language in science and media extracts.", "Rewrite an exaggerated causal headline to match the evidence."),
        lesson("Read across sources", "Compare sources along the same dimensions: claim, evidence, certainty, interests and omissions. Do not treat disagreement in tone as disagreement in facts.", "One source prioritises speed; another accepts the need for action but prioritises review.", "Complete a cross-text matrix and match statements to viewpoints.", "Synthesize agreement, genuine disagreement and one unresolved question."),
        lesson("Evaluate and respond", "A critical response represents the source accurately before judging evidence and implications. Offer a stronger alternative, not only a negative reaction.", "The argument identifies a real access problem, but its solution assumes stable funding.", "Score responses for fairness, evidence and explanatory value.", "Write a qualified response with one concession, one challenge and one constructive proposal."),
      ]
    },
    "b2p-production": {
      question: "How can a learner produce complex language accurately under time pressure?",
      terms: ["fluency", "synthesis", "register", "editing", "mediation", "reflection"],
      sequence: [
        lesson("Plan economically", "Use keywords, relationships and an outcome rather than full sentences. A compact plan protects attention for language, interaction and revision.", "claim → evidence → limitation → response", "Reduce over-detailed plans to five usable prompts.", "Complete a two-minute speaking and 220-word writing task from the same five-keyword plan."),
        lesson("Synthesize rather than list", "Synthesis creates a relationship between sources or viewpoints. Group by idea, then show agreement, contrast, development or a gap.", "Both sources value access; however, they disagree about whether cost or reliability is the main barrier.", "Combine paired source notes into synthesis sentences.", "Produce a short oral synthesis and a formal written paragraph from two inputs."),
        lesson("Shift register deliberately", "Keep the core meaning while changing directness, lexical choice, stance and information density for a new audience.", "We need to fix this soon. / Prompt action is required to address the issue.", "Transform messages across conversational, professional and academic contexts.", "Rewrite one explanation for a friend, a manager and a specialist audience."),
        lesson("Edit for range and precision", "Range means selecting varied language that improves meaning, not replacing every simple word. Edit repeated structures, vague nouns and unsupported certainty.", "The change was good → The change reduced delays without increasing reported errors.", "Complete a high-value revision pass on a weak draft.", "Revise a timed response and annotate five changes by purpose."),
        lesson("Reflect and repeat", "Deliberate repetition compares evidence. Select one weakness, design a small adjustment and repeat the same task under similar conditions.", "First attempt: unclear qualification. Second attempt: condition stated before the conclusion.", "Evaluate two versions and identify the intervention that produced improvement.", "Build a portfolio entry with first attempt, feedback, revision and next target."),
      ]
    },
    "b2p-technical": {
      question: "How can a technical explanation remain precise, testable and useful to different audiences?",
      terms: ["system boundary", "requirement", "constraint", "failure mode", "safeguard", "traceability"],
      sequence: [
        lesson("Define systems and boundaries", "A technical explanation first identifies the system, its purpose, inputs, outputs and operating boundary. A label is not a definition; the listener needs to know what the system does and where the account stops.", "The controller receives a temperature reading every second and opens the valve when the verified threshold is exceeded.", "Separate system, environment, interface and excluded factors in four short cases.", "Create a system-boundary diagram and a ninety-second explanation for a non-specialist teammate."),
        lesson("State requirements and constraints", "A requirement describes an outcome that must be verified; a constraint limits the available design choices. Use measurable conditions and distinguish mandatory performance from a preferred feature.", "The unit must transmit one verified status packet every minute while consuming no more than five watts.", "Rewrite vague goals as testable requirements and identify the constraint in each pair.", "Write five requirements for a small technical system and explain how each would be tested."),
        lesson("Explain processes and evidence", "Process language makes order, dependency and decision points explicit. Evidence should show whether each critical stage produced an acceptable result, not merely that an activity occurred.", "After the backup is created, it is restored in an isolated environment; only a successful restoration counts as verification.", "Reconstruct processes from shuffled steps and match each step to useful evidence.", "Deliver a two-minute process briefing with inputs, stages, checks, output and one limitation."),
        lesson("Connect failure modes to safeguards", "A failure mode states how a system can fail; risk considers consequence and likelihood; a safeguard interrupts the mechanism or reduces its effect. Avoid listing controls without explaining which failure they address.", "If the primary sensor drifts, an independent comparison detects the disagreement before the controller acts on the reading.", "Match failure mechanisms, consequences, detection methods and mitigations.", "Produce a risk note with one failure chain, preventive safeguard, recovery action and residual limitation."),
        lesson("Adapt and defend a technical brief", "Specialists need assumptions and method; managers need decision relevance; general audiences need an accurate mental model. Adapt information density without removing uncertainty, conditions or safety-critical relationships.", "The design passed the stated load test; this supports operation within that range, not performance under every possible condition.", "Present one finding to three audiences and respond to challenges about evidence, scope and trade-offs.", "Record a four-minute technical recommendation, answer two objections and revise one section after self-review."),
      ]
    },
    "b2p-listening": {
      question: "How can a listener recover stance and structure from connected, reduced speech?",
      terms: ["thought group", "prominence", "reduction", "stance", "repair", "multiple viewpoints"],
      sequence: [
        lesson("Hear thought groups", "Speakers package meaning into short groups around a prominent word. Pauses and pitch movement often reveal structure more reliably than individual words.", "The first OPTION / would reduce COSTS / but increase RISK.", "Mark thought-group boundaries after listening, then compare with the transcript.", "Shadow a one-minute explanation while preserving its information groups."),
        lesson("Reconstruct reduced language", "Weak forms and linked sounds make predictable grammar less prominent. Use stressed content words and context to reconstruct auxiliaries, pronouns and prepositions.", "could have been → could've been; a lot of → a lotta in casual delivery", "Complete selective dictation focused on reduced grammatical frames.", "Record a formal and conversational version of the same message."),
        lesson("Track stance shifts", "Speakers may move from approval to qualification or from uncertainty to decision. Notice contrast markers, hesitation, emphasis and evaluative verbs.", "I was initially convinced. Having seen the cost estimate, I am less certain.", "Plot stance changes across a short interview.", "Summarise a speaker's final position and explain how it changed."),
        lesson("Compare speakers", "In multi-speaker listening, track each person's claim, evidence, priority and response. Agreement on a decision may hide disagreement about the reason.", "Both accept the pilot, but one sees it as evidence while the other sees it as risk control.", "Complete a speaker matrix from a meeting extract.", "Report the agreement, disagreement and next action without attributing ideas incorrectly."),
        lesson("Recover from gaps", "When a phrase is missed, preserve the larger argument, mark uncertainty and test a reconstruction on replay. Do not invent precise detail from a vague impression.", "[unclear reason] → later consequence confirms a funding issue, not a timing issue.", "Use confidence labels in notes and verify only the uncertain links.", "Listen to a two-minute extract, reconstruct its logic and document two repaired gaps."),
      ]
    },

    "c1-grammar": {
      question: "How can grammar manage information, stance and reader expectations at C1?",
      terms: ["information structure", "hedging", "nominalisation", "discourse", "register", "complex sentence"],
      sequence: [
        lesson("Shape information structure", "Fronting, clefts and inversion guide attention by connecting given information to a focused contrast. Use them when discourse creates a real reason for emphasis.", "What the analysis fails to explain is the regional variation.", "Compare neutral and focused versions inside complete paragraphs.", "Revise an argument so two emphasis choices support its information flow."),
        lesson("Calibrate modality and hedging", "C1 modality distinguishes possibility, inference, obligation, willingness and distance. Hedge scope or certainty precisely rather than weakening every claim.", "The findings may indicate a short-term effect, although the mechanism remains unclear.", "Rank claims by certainty and identify which part—evidence, interpretation or scope—needs qualification.", "Write a research-style paragraph with three different, justified degrees of commitment."),
        lesson("Use nominalisation strategically", "Nominalisation can compress processes and create formal cohesion, but excessive noun density hides actors and actions. Alternate noun phrases with clear verbs.", "The committee rejected the proposal. / The committee's rejection of the proposal...", "Unpack dense noun phrases, then rebuild only the useful abstractions.", "Edit a formal paragraph for a balance of density, agency and readability."),
        lesson("Construct complex sentences", "A complex sentence should make hierarchy visible: main claim, condition, concession, reason or qualification. Punctuation and reference must keep attachments unambiguous.", "While the approach is inexpensive, its reliance on voluntary reporting, which varies widely, limits comparison.", "Diagram clause relationships and repair ambiguous attachments.", "Write five sentence patterns that express different logical hierarchies without fragments or run-ons."),
        lesson("Adapt discourse grammar", "Register changes not only vocabulary but directness, clause choice, agency and interpersonal stance. Select forms that fit purpose and relationship.", "Send me the figures. / Could you send the figures? / The figures would be helpful for the next stage of the analysis.", "Analyse grammar shifts across informal, professional and academic versions.", "Transform one difficult message for three audiences and justify every major structural choice."),
      ]
    },
    "c1-vocabulary": {
      question: "How can lexical choices become nuanced, idiomatic and precise without sounding forced?",
      terms: ["phraseology", "metaphor", "nominalisation", "register", "semantic prosody", "precision"],
      sequence: [
        lesson("Build academic phraseology", "Learn recurring frames that organise evidence, limitation and interpretation. Keep a variable slot so the phrase can transfer to new topics.", "This raises the question of whether... / The findings lend support to...", "Complete phrase frames from several academic contexts.", "Use eight frames in a coherent mini-analysis without repeating one function."),
        lesson("Notice semantic prosody", "Words attract positive or negative contexts beyond their basic definition. Inspect typical partners before assuming a synonym creates the same evaluation.", "trigger often introduces an undesirable process; foster usually introduces a valued development.", "Compare verb-noun partnerships for hidden evaluation.", "Rewrite a policy paragraph to make its evaluation neutral and explicit."),
        lesson("Use metaphor critically", "Metaphor frames a complex issue by highlighting one relationship and hiding others. Recognise conventional metaphors before choosing whether to extend or replace them.", "a wave of change · a bottleneck in the process · a fragile recovery", "Identify what three metaphors emphasise and omit.", "Explain one technical issue through a metaphor and state where the comparison breaks down."),
        lesson("Control idiomatic precision", "Idiomatic language should fit frequency, syntax, audience and stance. A less colourful fixed expression may be more natural in professional or academic prose.", "shed light on · take into account · draw a distinction", "Choose between idiom, fixed expression and literal wording across genres.", "Create a usable bank of ten expressions with grammar frames and original examples."),
        lesson("Edit lexical density", "Advanced writing needs precise content words but also clear verbs and reference. Replace vague language selectively and unpack clusters that slow the reader.", "The implementation of the optimisation of... → The team optimised how the system was implemented.", "Revise an over-dense text for clarity without making it simplistic.", "Annotate a final draft for precision, repetition, register and reader effort."),
      ]
    },
    "c1-reading": {
      question: "How can a reader evaluate complex texts whose conclusions remain implicit or contested?",
      terms: ["implicit claim", "method", "framing", "intertextuality", "synthesis", "critical response"],
      sequence: [
        lesson("Recover implicit claims", "C1 texts may distribute a position across examples, qualifications and contrast. Reconstruct the strongest claim the evidence supports without turning nuance into certainty.", "A writer can question a policy through selection and juxtaposition without stating that it should be rejected.", "Infer a thesis from paragraph functions and language choices.", "Write the implicit claim, two supporting clues and one limit on your interpretation."),
        lesson("Evaluate method and evidence", "Distinguish reported result, method, interpretation and external application. A credible limitation changes confidence or scope but does not automatically invalidate the study.", "A self-selected sample may represent engaged users better than the entire population.", "Audit a research-style text for sampling, measurement and causal reasoning.", "Produce a balanced evidence note for a non-specialist decision-maker."),
        lesson("Analyse framing and omission", "Framing appears in labels, baselines, comparisons, quoted voices and the order in which consequences are presented. Ask whose perspective becomes normal.", "Describing a cost as an investment invites a different evaluation from describing it as a burden.", "Compare alternative headlines and paragraph openings for the same facts.", "Rewrite a framed passage neutrally and explain what the original encouraged the reader to notice."),
        lesson("Synthesize complex sources", "Synthesis organises sources around questions, not authors. Track converging evidence, methodological differences, value conflicts and gaps.", "The sources agree that access matters but operationalise access differently.", "Build a thematic matrix across three sources.", "Write a 180-word synthesis that preserves one unresolved disagreement."),
        lesson("Formulate a critical response", "A strong response begins with accurate representation, evaluates reasoning and proposes a more defensible interpretation or action.", "The article convincingly identifies a coordination problem; its preferred solution, however, depends on an unstated assumption about stable demand.", "Score responses for fairness, evidence, scope and constructive value.", "Write a critical response with a concession, methodological challenge and qualified alternative."),
      ]
    },
    "c1-writing": {
      question: "How can C1 writing integrate sources, argument and register for a demanding reader?",
      terms: ["synthesis", "rhetorical move", "source attribution", "qualification", "cohesion", "editorial control"],
      sequence: [
        lesson("Frame a complex question", "Define key terms, identify the tension and state a thesis whose scope can be defended. Avoid opening with universal claims or empty background.", "The question is not whether digital access matters, but under which conditions it improves participation.", "Evaluate openings for relevance, scope and direction.", "Write three thesis versions, then select and justify the most defensible one."),
        lesson("Integrate sources", "Attribute, paraphrase and connect sources while keeping your own analytical voice. Each citation should perform a function inside the paragraph.", "Lee identifies a cost barrier, whereas Patel's data suggests that reliability is the stronger predictor.", "Repair source-by-source paragraphs by grouping evidence around ideas.", "Write a source-aware paragraph that creates agreement, contrast and a gap."),
        lesson("Develop counterargument", "Represent the strongest reasonable objection, concede what it establishes and explain why a narrower conclusion still follows.", "Critics rightly note the administrative cost; this objection is less decisive where existing systems can be adapted.", "Distinguish rebuttal, concession, qualification and evasion.", "Write a counterargument sequence that changes the precision of your thesis."),
        lesson("Control formal genres", "A proposal, report, critical response and formal letter differ in reader, decision and permissible stance. Use headings and recommendations only where they serve the genre.", "A proposal makes a future case; a report organises findings and implications.", "Transform one evidence set into two genre plans.", "Draft a complete C1 genre response with a visible audience and requested outcome."),
        lesson("Edit as an author", "Move from local correction to rhetorical editing: test paragraph function, evidence, qualification, reference and sentence rhythm before proofreading.", "If a paragraph has two competing jobs, divide or subordinate one line of reasoning.", "Reverse-outline a model and a personal draft.", "Submit a first draft, self-review, complete revision and explain six high-value decisions."),
      ]
    },
    "c1-speaking": {
      question: "How can a C1 speaker manage nuance, interaction and challenge spontaneously?",
      terms: ["stance", "floor management", "qualification", "counterargument", "audience adaptation", "reflection"],
      sequence: [
        lesson("Present a qualified position", "Define the issue, state a clear but limited position and organise support around two or three distinctions. Avoid using complexity to delay the answer.", "The policy is defensible as a temporary measure, provided that its impact is independently reviewed.", "Give ninety-second positions from unfamiliar prompts.", "Record a three-minute response with thesis, distinction, evidence, counterpoint and condition."),
        lesson("Manage academic discussion", "Connect your turn to what another speaker said, identify agreement or distinction and add evidence. Signal whether you are extending, challenging or reframing.", "I agree with the concern about access; I would distinguish access to the tool from meaningful participation.", "Practise entering, holding and yielding the floor in seminar sequences.", "Lead a five-minute discussion and summarise the strongest unresolved question."),
        lesson("Defend against counterargument", "Listen for the exact scope of the challenge before answering. Acknowledge legitimate force, reject overreach and revise your claim when necessary.", "That example weakens the universal claim, but it does not remove the pattern in high-risk contexts.", "Respond to increasingly strong objections without caricaturing them.", "Defend one view, accept one correction and articulate the improved position."),
        lesson("Adapt technical explanations", "Control assumed knowledge, define necessary terms, use analogy carefully and check understanding without sounding patronising.", "A model parameter is a value the system adjusts during learning; it is not the same as a rule written by a programmer.", "Explain one concept to beginner, managerial and specialist audiences.", "Deliver a five-minute technical briefing and answer three audience-specific questions."),
        lesson("Reflect on performance", "Use evidence from recording: pauses, repair, range, interaction, stress and listener response. Select one intervention and repeat a comparable task.", "Replace a vague self-judgement with a timestamped observation and a specific experiment.", "Analyse a model rubric and two contrasting recordings.", "Create a portfolio reflection with evidence, revised segment and next practice target."),
      ]
    },
    "c1-listening": {
      question: "How can a listener interpret implied meaning, multiple accents and complex argument?",
      terms: ["implication", "stance", "accent adaptation", "multi-speaker", "lecture structure", "critical note"],
      sequence: [
        lesson("Infer beyond the words", "Combine proposition, tone, context and discourse expectation. Keep inference proportional: an ironic or qualified remark may signal distance without complete rejection.", "Technically, the target was met—whether the target measured the right outcome is another question.", "Compare literal meaning with supported implications.", "Explain one implied stance using three independent clues."),
        lesson("Adapt to unfamiliar delivery", "Use a short calibration period to learn a speaker's vowel patterns, rhythm and recurring words. Focus on meaning-bearing contrasts, not accent labels.", "An unfamiliar pronunciation becomes easier when topic, collocation and repeated forms constrain the possibilities.", "Track repeated keywords across varied synthetic voices and rates.", "Listen to two deliveries of one text and record which cues supported adaptation."),
        lesson("Follow lectures", "Lectures signal definitions, claims, examples, objections and return points. Notes should expose this architecture and the speaker's degree of certainty.", "question → account A → limitation → account B → implication", "Turn a two-minute lecture into a hierarchical outline.", "Reconstruct the argument and ask one question that follows from its limitation."),
        lesson("Track a multi-speaker debate", "Maintain separate records of speaker position, evidence, priority and change. Overlap and agreement markers can reveal alliances that shift during the discussion.", "A speaker can accept another person's evidence while rejecting the policy conclusion.", "Complete a dynamic stance table from a debate extract.", "Report how two positions changed and which issue remained unresolved."),
        lesson("Evaluate spoken evidence", "Treat spoken confidence as delivery, not proof. Check source, method, examples, qualification and whether the conclusion exceeds what was presented.", "A persuasive anecdote can illustrate an impact but cannot establish how common it is.", "Audit a news-style report and a presentation for evidence quality.", "Write a critical listening note separating claim, support, gap and decision relevance."),
      ]
    }
  };

  const allModules = university.levels.flatMap((level) => level.modules);
  allModules.forEach((module) => {
    const blueprint = blueprints[module.id];
    if (!blueprint) return;
    module.essentialQuestion = blueprint.question;
    module.keyTerms = blueprint.terms;
    module.lessons = blueprint.sequence.map((entry, index) => {
      const candidates = university.activities.filter((activity) => activity.moduleId === module.id && module.skills.includes(activity.skill));
      return {
        id: `${module.id}-lesson-${index + 1}`,
        title: entry.title,
        stage: ["Concept", "Guided analysis", "Controlled practice", "Independent production", "Portfolio transfer"][index],
        body: entry.explanation,
        explanation: entry.explanation,
        model: entry.model,
        guided: entry.guided,
        output: entry.output,
        objectives: [
          `Explain the main decision behind ${entry.title.toLowerCase()}.`,
          `Apply the decision in a ${module.skills.map((skill) => skill.replaceAll("-", " ")).join(" and ")} task.`,
          "Reflect on one specific improvement after completing the task."
        ],
        visual: ["Context and purpose", "Language decision", "Evidence in the model", "Guided control", "Independent use"],
        activityIds: candidates.slice(index * 4, index * 4 + 4).map((activity) => activity.id)
      };
    });
  });

  catalogs.grammarCatalog.forEach((item, index, list) => {
    const comparison = list.find((candidate, candidateIndex) => candidate.level === item.level && candidateIndex !== index) || list[(index + 1) % list.length];
    item.studio = {
      overview: `${item.title} helps a speaker or writer express ${item.focus}. Start with that meaning and context before constructing the form.`,
      decision: `Use this structure when the intended meaning is ${item.focus}. Then build and check the pattern: ${item.form}.`,
      form: item.form,
      model: item.example,
      comparisonTitle: comparison.title,
      comparison: comparison.example,
      questions: [
        "What time, relationship or communicative purpose controls the choice?",
        `Which part of “${item.form}” changes for the subject, tense or clause?`,
        "What nearby alternative is possible, and how would its meaning differ?",
        "Does the final sentence fit the audience and register?"
      ],
      challenge: `Create a three-sentence context that makes ${item.title.toLowerCase()} necessary. Include one affirmative or main example, one contrast and one sentence that explains the meaning choice.`,
      practiceIds: university.activities.filter((activity) => activity.skill === "grammar" && activity.id.includes(item.id)).slice(0, 8).map((activity) => activity.id)
    };
  });

  university.lessonIndex = allModules.flatMap((module) => module.lessons.map((entry, index) => ({
    ...entry,
    moduleId: module.id,
    moduleTitle: module.title,
    levelId: university.levels.find((level) => level.modules.some((candidate) => candidate.id === module.id))?.id,
    position: index
  })));
})();
