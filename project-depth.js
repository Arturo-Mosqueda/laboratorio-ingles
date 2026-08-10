(() => {
  "use strict";
  const university = window.EnglishUniversityData;
  if (!university) return;

  const details = {
    "project-b1-story": {
      prompt: "Create a two-minute personal story and a 150-word written version. Make the sequence, change and final reflection clear to someone who was not present.",
      preparation: ["Choose one real event with a clear change or problem.", "Create a four-part map: setting → change → response → result.", "Select six sequence markers and four useful story verbs.", "Record a first oral version before writing.", "Use the written version to improve, not copy, the final recording."],
      milestones: ["Story map", "First recording", "Written version", "Revised recording", "Reflection"],
      deliverables: ["Two-minute audio", "150-word narrative", "Story timeline", "80-word reflection"],
      checklist: ["Setting is concise", "Past tenses organise the timeline", "Turning point is clear", "Sequence markers are natural", "Listener can follow without questions", "Written and oral versions are not identical", "Final reflection explains significance", "Revision evidence included"],
      modelAnswer: "Portfolio model: begin with a concise setting, slow down at the turning point and end by explaining why the event matters now. The written version may add precise detail; the oral version should prioritise listener orientation and rhythm.",
      modelCommentary: "A successful project demonstrates control across planning, grammar, writing, speaking and reflection rather than a memorised script.",
      voicePrompt: "Be my B1+ story coach. Ask me for the setting, change, response and result one stage at a time. Let me tell the complete story, then give feedback on past simple, past continuous, sequence markers and intelligibility. Ask me to repeat one improved section."
    },
    "project-b1-guide": {
      prompt: "Design an everyday survival guide for a visitor to your area. Combine practical vocabulary, clear instructions, a short reading section and a two-minute audio explanation.",
      preparation: ["Define one specific visitor and three likely situations.", "Research opening times, routes or service rules from reliable local information.", "Select twelve useful words or expressions and group them by situation.", "Write instructions with visible order and conditions.", "Record an explanation that adds guidance rather than reading the page aloud."],
      milestones: ["Audience profile", "Information check", "Vocabulary bank", "Guide draft", "Audio and user test"],
      deliverables: ["One-page guide", "Twelve-item lexical bank", "Two-minute audio", "User-test note"],
      checklist: ["Audience is specific", "Information is accurate", "Instructions are actionable", "Vocabulary includes collocations", "Conditions and warnings are clear", "Audio adds useful context", "Pronunciation is intelligible", "User feedback changed one element"],
      modelAnswer: "Portfolio model: organise the guide around real visitor decisions—arrival, transport, payment and help. Use headings, short instructions and examples. In the audio, explain one common misunderstanding and how to resolve it politely.",
      modelCommentary: "The project succeeds when a visitor can act, not merely when the language is grammatically correct.",
      voicePrompt: "Act as a visitor using my survival guide. Ask realistic questions about transport, payment, directions and a small problem. Do not accept vague instructions; ask me to clarify until you could act. Finish with feedback on clarity, vocabulary and politeness."
    },
    "project-b2-report": {
      prompt: "Investigate one campus or community problem, compare two original source texts and submit a 220–260 word report with evidence, limitations and practical recommendations.",
      preparation: ["Define a question narrow enough to investigate.", "Read two sources with different purposes or perspectives.", "Create a claim-evidence-limit matrix.", "Collect one small piece of local evidence such as observation or a short anonymous survey.", "Separate findings from recommendations before drafting."],
      milestones: ["Research question", "Source matrix", "Local evidence", "Report draft", "Revision memo"],
      deliverables: ["Two-source matrix", "Local evidence note", "220–260 word report", "Revision memo"],
      checklist: ["Question and audience are clear", "Both sources represented fairly", "Evidence attributed", "Limitation acknowledged", "Findings separated from recommendations", "Recommendations follow from evidence", "Formal register controlled", "Revision responds to feedback"],
      modelAnswer: "Portfolio model: use headings for Purpose, Findings, Limitations and Recommendations. Synthesize the sources by issue rather than summarising them one after another. Recommend actions whose scale matches the evidence.",
      modelCommentary: "A B2 report demonstrates both language control and responsible use of evidence.",
      voicePrompt: "Be a college committee member reviewing my report. Ask me to state the strongest evidence, the main limitation and why each recommendation is feasible. Challenge one unsupported claim, then give feedback on formal register and clarity."
    },
    "project-b2-podcast": {
      prompt: "Produce a four-minute explanatory podcast about a current issue. Integrate a reading source, a short interview or simulated quotation, topic vocabulary and a qualified conclusion.",
      preparation: ["Frame one question the episode will answer.", "Read one substantial source and identify claim, evidence and limitation.", "Select ten lexical items with pronunciation and collocation notes.", "Plan an opening, two evidence sections, counterpoint and conclusion.", "Record a rough version and revise pacing from listener notes."],
      milestones: ["Question and source", "Vocabulary/pronunciation bank", "Episode outline", "Rough recording", "Final episode and reflection"],
      deliverables: ["Four-minute audio", "Source note", "Ten-item language bank", "Transcript outline", "Reflection"],
      checklist: ["Opening creates a clear question", "Source is represented accurately", "Evidence and opinion are separated", "Counterpoint is genuine", "Vocabulary sounds natural", "Stress and thought groups guide the listener", "Conclusion is qualified", "Final version responds to listening evidence"],
      modelAnswer: "Portfolio model: open with a concrete situation, define the issue, explain one source finding, include a contrasting perspective and return to a narrower answer. Use music only if it supports rather than hides the spoken structure.",
      modelCommentary: "The podcast integrates reading, mediation, vocabulary, pronunciation and sustained spoken production.",
      voicePrompt: "Act as my podcast editor. Ask for my central question, evidence, counterpoint and intended listener. After I give a two-minute preview, identify where a listener may lose the structure and suggest one pronunciation and one wording improvement."
    },
    "project-b2p-debate": {
      prompt: "Research and deliver both sides of a contested question, then defend a qualified position during a six-minute debate with spontaneous counterarguments.",
      preparation: ["Define the motion and any ambiguous terms.", "Build the strongest evidence-based case for each side.", "Identify assumptions, stakeholder interests and one counterexample.", "Prepare structure and evidence, not complete sentences.", "Invite an opponent or voice partner to add an unexpected objection."],
      milestones: ["Motion definition", "Two-sided evidence map", "Opening case", "Live debate", "Revised position"],
      deliverables: ["Argument map", "Two-minute opening", "Six-minute debate", "Counterargument log", "Revised claim"],
      checklist: ["Motion defined", "Opposing case represented fairly", "Evidence supports claims", "Assumptions identified", "Interaction responds to the actual objection", "Concession improves precision", "Register remains respectful", "Final position changes where evidence requires"],
      modelAnswer: "Portfolio model: the final claim should normally be narrower and more defensible than the opening claim. Record not only what you said, but which counterargument changed your reasoning and why.",
      modelCommentary: "Advanced debate is measured by responsive reasoning, not by refusing to change position.",
      voicePrompt: "Debate this motion with me as a strong but fair opponent. First ask me to define the motion. Let me give my opening case, then present one evidence objection, one fairness objection and one practical constraint separately. Finish by asking for my revised position and give language feedback."
    },
    "project-b2p-rewrite": {
      prompt: "Transform one informal message into a professional email and an academic-style paragraph. Preserve the core meaning and explain every major change in vocabulary, grammar, directness and information density.",
      preparation: ["Select a realistic informal message with a clear purpose.", "Mark content that must remain unchanged.", "Define the professional reader and required action.", "Define the academic purpose and evidence relationship.", "Annotate lexical and grammatical shifts after writing both versions."],
      milestones: ["Source message", "Audience analysis", "Professional version", "Academic version", "Language commentary"],
      deliverables: ["Original message", "180-word professional email", "180-word academic paragraph", "Change table", "Reflection"],
      checklist: ["Core meaning preserved", "Professional action is clear", "Academic relationship is explicit", "Directness fits each audience", "Collocations are natural", "Grammar changes are purposeful", "No version is merely a synonym replacement", "Commentary explains listener/reader effect"],
      modelAnswer: "Portfolio model: compare a casual request such as ‘Can you send me the numbers soon?’ with a professional request that includes purpose and deadline, and an academic sentence that attributes data and qualifies interpretation.",
      modelCommentary: "Register transformation is successful when relationship and purpose change while factual meaning remains controlled.",
      voicePrompt: "Give me one informal sentence at a time and ask me to reformulate it for a colleague, a manager and an academic audience. Challenge any version that changes the core meaning. After five items, summarise my strongest and weakest register choices."
    },
    "project-c1-synthesis": {
      prompt: "Combine two substantial, contrasting texts into a 300-word critical synthesis that identifies agreement, methodological difference, value conflict and one unanswered question.",
      preparation: ["Choose sources that genuinely disagree or operationalise the issue differently.", "Annotate claim, evidence, method, certainty and purpose.", "Build a thematic matrix instead of source-by-source notes.", "Draft a synthesis thesis that preserves uncertainty.", "Check attribution and paraphrase before evaluating."],
      milestones: ["Source approval", "Thematic matrix", "Synthesis thesis", "Draft and source check", "Final response"],
      deliverables: ["Two annotated texts", "Thematic matrix", "300-word synthesis", "Source-use audit", "Critical reflection"],
      checklist: ["Sources are substantial and contrasting", "Both represented fairly", "Organisation is thematic", "Methodological difference is visible", "Value conflict is distinguished from factual disagreement", "Attribution and paraphrase are accurate", "Conclusion preserves an open question", "Own analytical voice remains clear"],
      modelAnswer: "Portfolio model: organise around access, effectiveness and responsibility rather than ‘Source A says / Source B says’. The conclusion should state what can be accepted, what remains contested and which evidence would change the judgement.",
      modelCommentary: "C1 synthesis creates relationships among sources and makes limits explicit without losing a coherent line of reasoning.",
      voicePrompt: "Be my academic synthesis examiner. Ask me to explain the two sources neutrally, then question their methods, assumptions and points of agreement. Do not let me list them separately. Finish by asking for a qualified synthesis and feedback on reporting verbs and hedging."
    },
    "project-c1-presentation": {
      prompt: "Deliver a seven-minute professional presentation that explains a complex recommendation to a mixed audience, uses evidence responsibly and answers three challenging follow-up questions.",
      preparation: ["Define the audience decision and what they already know.", "Select one central message, three supporting points and one limitation.", "Design a visual or diagram that clarifies a relationship rather than decorating the slide.", "Rehearse signposting, thought groups and the transition into questions.", "Record the final delivery and review evidence at timestamps."],
      milestones: ["Audience and outcome", "Evidence outline", "Visual explanation", "Rehearsal", "Presentation, questions and review"],
      deliverables: ["Seven-minute recording", "One-page visual", "Evidence note", "Question-response log", "Timestamped reflection"],
      checklist: ["Purpose and decision are explicit", "Structure is easy to follow", "Evidence is relevant and qualified", "Visual clarifies a relationship", "Technical terms are explained", "Pronunciation signals focus and hierarchy", "Answers address the exact challenge", "Reflection cites observable evidence"],
      modelAnswer: "Portfolio model: open with the decision the audience must make, not a long history. Return to one central recommendation after evidence, alternatives and limitation. During questions, clarify the premise before answering and admit what the evidence cannot establish.",
      modelCommentary: "The presentation demonstrates academic-professional speaking, listening, pronunciation, mediation and responsive reasoning.",
      voicePrompt: "Act as a mixed professional panel. Let me deliver a concise version of my presentation, then ask three challenging questions: one about evidence, one about cost or feasibility and one about an unintended consequence. Wait for each complete answer and finish with detailed feedback on structure, stance and pronunciation."
    }
  };

  university.projects.forEach((project) => {
    const extra = details[project.id];
    if (!extra) return;
    Object.assign(project, extra, { mode: "challenge", selfReviewCriteria: ["Task achievement", "Evidence", "Integration", "Organisation", "Grammar", "Vocabulary", "Register", "Reflection"] });
  });
})();
