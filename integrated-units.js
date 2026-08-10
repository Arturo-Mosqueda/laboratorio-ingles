(() => {
  "use strict";

  const university = window.EnglishUniversityData;
  const catalogs = window.EnglishCatalogs;
  if (!university || !catalogs) return;

  const units = [
    {
      id: "integrated-b1-repair-cafe", level: "b1-plus", moduleId: "b1-reading", title: "The repair café", theme: "Community and everyday sustainability",
      reading: {
        genre: "Blog feature", title: "A second life for broken things",
        text: `On the first Saturday of every month, a quiet room behind Westfield Library becomes a repair café. People arrive with lamps that no longer switch on, jackets with broken zips and small machines that have stopped working. The volunteers do not promise to repair everything. Instead, they invite each visitor to sit beside them, describe the problem and take part in the process.

Maya first visited with a toaster that had belonged to her grandmother. She expected to leave it at a desk and collect it later. A volunteer called Ben asked her to open the case with him. They discovered that one inexpensive part had failed. While Ben replaced it, he explained why the fault had occurred and how Maya could notice the same warning signs in future.

The café has repaired more than 300 objects in a year, but the organisers say that the numbers are not their only measure of success. Visitors who learn a simple skill often return to help someone else. The project therefore reduces waste and also changes the way neighbours see their possessions and one another. A broken object is no longer just rubbish; it can become the beginning of a conversation.`,
        vocabulary: [
          { term: "fault", meaning: "a problem that prevents something from working correctly", collocation: "identify a fault", stress: "FAULT" },
          { term: "inexpensive", meaning: "not costing very much", collocation: "an inexpensive part", stress: "in-ex-PEN-sive" },
          { term: "warning sign", meaning: "evidence that a problem may develop", collocation: "notice a warning sign", stress: "WARNING sign" },
          { term: "reduce waste", meaning: "make the amount of discarded material smaller", collocation: "reduce household waste", stress: "re-DUCE WASTE" }
        ],
        questions: [
          ["What makes the repair café different from an ordinary repair service?", ["Visitors participate in the repair", "It repairs only expensive objects", "Visitors must already be experts", "It sells new machines"], 0, "Visitors sit with volunteers, describe the problem and participate in the process."],
          ["Why was Maya surprised?", ["The toaster was impossible to open", "She was asked to help with the repair", "The café charged a high fee", "Her grandmother was a volunteer"], 1, "She expected to leave the toaster, but Ben involved her in opening and understanding it."],
          ["What can be inferred about the organisers' definition of success?", ["Only the number of repaired items matters", "Learning and community participation also matter", "The project should become a shop", "Every object must be saved"], 1, "They explicitly say numbers are not the only measure and value returning visitors who help others."],
          ["In the text, what does ‘fault’ mean?", ["A personal criticism", "A repair tool", "A technical problem", "A volunteer shift"], 2, "The failed part caused a technical problem in the toaster."],
          ["What is the writer's main purpose?", ["To warn readers never to replace appliances", "To show how one project combines repair, learning and community", "To advertise a particular toaster", "To argue that libraries should close"], 1, "The article develops the practical, educational and social value of the project."],
        ]
      },
      listening: {
        genre: "Dialogue", title: "Choosing what to repair first", rate: 0.82,
        transcript: `Coordinator: We have six visitors waiting and only three repairers. Which job should we take first?\nVolunteer: The lamp is probably quick, but the coffee machine may be a safety issue. Its owner said it started producing smoke.\nCoordinator: Good point. Let us inspect the coffee machine first, but do not plug it in. I will explain the delay to the lamp owner.\nVolunteer: What about the torn backpack?\nCoordinator: Leila can begin that one while we inspect the machine. If we cannot repair the machine safely, we should tell the owner exactly why and suggest the correct recycling service.\nVolunteer: So the order is safety first, then the quick lamp repair?\nCoordinator: Exactly. A fast repair is useful, but it should never come before a risk check.`,
        questions: [
          ["What is the main decision in the dialogue?", ["How much visitors should pay", "Which repair should be handled first", "Whether the café should open", "Who owns the lamp"], 1, "The speakers decide the order in which to handle the waiting repairs."],
          ["Why will they inspect the coffee machine first?", ["It is the easiest job", "Its owner is a volunteer", "It may present a safety risk", "The lamp has already been repaired"], 2, "Smoke suggests a possible safety issue."],
          ["What will Leila do?", ["Explain the delay", "Begin repairing the backpack", "Recycle the coffee machine", "Plug in the machine"], 1, "The coordinator assigns the backpack to Leila."],
          ["Which principle does the coordinator emphasise?", ["Speed always matters most", "Visitors should repair everything alone", "Safety takes priority over speed", "Machines should never be recycled"], 2, "The final turn contrasts a quick repair with the need for a risk check."],
        ]
      },
      discussion: "Should products be designed so ordinary users can repair them? Consider safety, cost, waste and ownership.",
      writing: { genre: "Informal email", wordLimit: "120–140 words", prompt: "Write to a friend describing your first visit to the repair café, what you learned and whether you plan to return.", structure: ["reason for visiting", "what happened", "what you learned", "next plan"], useful: ["At first...", "While we were...", "It turned out that...", "I am planning to..."], model: `Hi Sam,\n\nI finally took my old desk lamp to the repair café on Saturday. At first, I thought I would simply leave it there, but a volunteer asked me to help. While we were checking the cable, she showed me how to look for damage safely. It turned out that the switch was the problem, so the repair was quite simple.\n\nThe best part was learning how the lamp works. I had always assumed that broken electrical items had to be thrown away. Now I understand that some faults can be repaired with one small part. I am planning to return next month and help at the welcome desk. Would you like to bring your old radio?\n\nTake care,\nAlex`, commentary: "The model covers every content point, uses an informal but clear register and combines past simple, past continuous and present relevance." },
      speaking: "Explain whether you would use a repair café. Give one personal example, one safety concern and one suggestion for the organisers.",
      pronunciation: "Contrast the stress in REpair (noun) and rePAIR (verb), then shadow: ‘A safe repair is more important than a quick repair.’",
      critical: "The organisers report 300 repaired objects. What additional evidence would show whether the project changes long-term behaviour?"
    },
    {
      id: "integrated-b1-travel-change", level: "b1-plus", moduleId: "b1-communication", title: "When the route changes", theme: "Travel, planning and communication",
      reading: {
        genre: "Narrative", title: "The station with no trains",
        text: `Leo arrived at Brookdale Station forty minutes before his train because he did not want to repeat an earlier mistake. The departure board showed the correct time, but no platform number appeared. Ten minutes later, an announcement explained that flooding had closed the railway line beyond Milltown.

Several passengers immediately joined a long queue at the information desk. Leo opened the rail company's app, but it continued to show the original journey. An older passenger beside him looked worried because she had a hospital appointment in the city. Leo suggested asking whether their tickets were valid on the express bus. While she held their place in the queue, he checked the bus stop outside.

The station manager eventually confirmed that rail tickets would be accepted on two replacement buses. The first bus was already full, but the second was leaving twenty minutes later. Leo and the passenger reached the city with little time to spare. The delay was frustrating, yet Leo noticed that the journey became manageable as soon as they stopped waiting for perfect information and began checking realistic alternatives.`,
        vocabulary: [
          { term: "departure board", meaning: "a display showing when services leave", collocation: "check the departure board", stress: "de-PAR-ture board" },
          { term: "replacement bus", meaning: "a bus provided instead of a cancelled train", collocation: "take a replacement bus", stress: "re-PLACE-ment bus" },
          { term: "valid", meaning: "officially acceptable for a purpose", collocation: "a valid ticket", stress: "VAL-id" },
          { term: "with time to spare", meaning: "earlier than necessary", collocation: "arrive with time to spare", stress: "TIME to SPARE" }
        ],
        questions: [
          ["Why did Leo arrive early?", ["He wanted to avoid repeating a past problem", "He planned to meet the station manager", "The train had already left", "He worked at the station"], 0, "The opening says he did not want to repeat an earlier mistake."],
          ["What problem did the app have?", ["It would not open", "It displayed the original journey", "It sold the wrong ticket", "It showed the hospital address"], 1, "The app did not yet reflect the disruption."],
          ["How did Leo help the older passenger?", ["He gave her his train ticket", "He drove her to the city", "He investigated a bus alternative", "He changed her appointment"], 2, "He suggested and checked whether the express bus could be used."],
          ["What lesson does Leo take from the experience?", ["Perfect information is always available", "Waiting is safer than acting", "Checking workable alternatives can reduce uncertainty", "Travel apps should never be used"], 2, "The final sentence contrasts waiting for perfect information with checking realistic alternatives."],
          ["What does ‘valid’ mean in relation to the tickets?", ["Cheap", "Accepted for travel", "Recently purchased", "Printed clearly"], 1, "The question is whether rail tickets will be accepted on the buses."],
        ]
      },
      listening: {
        genre: "Announcement", title: "Replacement service information", rate: 0.86,
        transcript: `Attention please. The 10:15 service to Central City has been cancelled because of flooding near Milltown. Passengers should not wait on platform three. Two replacement buses will leave from the main entrance. Bus A will travel directly to Central City and will not stop at intermediate stations. Bus B will serve Lakeside, Milltown and Central City. Rail tickets are valid on both buses. Passengers for Lakeside should take Bus B, which is expected to leave at 10:35. If you need step-free access, please speak to a member of staff before joining the queue. We apologise for the disruption.`,
        questions: [
          ["Why has the train been cancelled?", ["A technical inspection", "Flooding near Milltown", "A staff meeting", "A missing driver"], 1, "Flooding near Milltown is given as the cause."],
          ["Which bus should a passenger for Lakeside take?", ["Bus A", "Bus B", "Either bus", "No replacement bus"], 1, "Bus B serves the intermediate station at Lakeside."],
          ["Where will the buses leave from?", ["Platform three", "The car park", "The main entrance", "Milltown"], 2, "The announcement says both buses leave from the main entrance."],
          ["Who should speak to staff before queuing?", ["Passengers with step-free access needs", "Everyone travelling to Central City", "Only people with digital tickets", "Passengers on Bus A"], 0, "The final instruction is directed at passengers needing step-free access."],
        ]
      },
      discussion: "Which is more important during travel disruption: fast information, accurate information or helpful staff? Defend a priority.",
      writing: { genre: "Message", wordLimit: "90–110 words", prompt: "Send a message explaining a travel delay, your new route and the time you expect to arrive.", structure: ["brief apology", "cause", "new plan", "arrival estimate"], useful: ["has been cancelled", "I am taking... instead", "I should arrive by...", "I will let you know if..."], model: `Hi Mia, I am sorry, but my train has been cancelled because of flooding near Milltown. I am taking a replacement bus instead. It leaves from the main entrance at 10:35 and goes through Lakeside before reaching the city, so the journey will take longer than usual. I should arrive at the office by about 12:15. I have the presentation files with me, and I can send them now if you need to begin without me. I will let you know if the bus is delayed again.`, commentary: "The model gives the reader an immediate situation, an actionable plan and a realistic arrival estimate." },
      speaking: "Role-play a conversation with a station employee. Explain your destination and constraint, ask two precise questions and confirm the final plan.",
      pronunciation: "Practise sentence stress in ‘The TRAIN has been CANcelled, but a BUS is leaving at TEN thirty-FIVE.’",
      critical: "Should transport companies update apps before making station announcements, or can one channel reasonably come first?"
    },
    {
      id: "integrated-b2-urban-heat", level: "b2", moduleId: "b2-reading", title: "Cooling the city", theme: "Science, environment and public policy",
      reading: {
        genre: "Science feature", title: "Why two streets can feel like different climates",
        text: `On a hot afternoon, two streets less than a kilometre apart can have noticeably different temperatures. The difference is not imaginary. Dark roofs and roads absorb solar energy, while trees provide shade and release water vapour. Dense groups of buildings can also trap warm air and reduce wind. Together, these effects create what researchers call an urban heat island.

City governments have begun testing several responses. Some paint roofs with reflective coatings; others plant trees or replace sealed surfaces with materials that allow water into the soil. Each intervention has advantages, but none is automatically suitable everywhere. A young tree offers limited shade and needs water for years before it provides its full benefit. A reflective roof can reduce heat inside a building, yet poor installation may shorten the roof's life.

Researchers therefore recommend measuring neighbourhood conditions before choosing a solution. Temperature is important, but so are housing quality, access to public space and the number of residents who work outdoors. The hottest area on a map is not always the place where heat causes the greatest harm. Effective policy combines physical measurements with information about who is exposed, for how long and what resources they can use to stay safe.`,
        vocabulary: [
          { term: "absorb", meaning: "take in energy or liquid", collocation: "absorb solar energy", stress: "ab-SORB" },
          { term: "reflective coating", meaning: "a surface treatment that sends light or heat back", collocation: "apply a reflective coating", stress: "re-FLEC-tive COAT-ing" },
          { term: "intervention", meaning: "an action intended to improve a situation", collocation: "evaluate an intervention", stress: "in-ter-VEN-tion" },
          { term: "exposed", meaning: "not protected from a harmful condition", collocation: "be exposed to heat", stress: "ex-POSED" }
        ],
        questions: [
          ["Which factor contributes to an urban heat island?", ["Trees releasing water vapour", "Dark surfaces absorbing energy", "Buildings increasing wind", "Water entering the soil"], 1, "Dark roofs and roads absorb solar energy and contribute to higher temperatures."],
          ["Why does the writer mention a young tree?", ["To show that every solution has practical limits", "To argue that trees never help", "To compare trees with buildings", "To explain roof damage"], 0, "The young tree illustrates that an intervention may take time and require resources."],
          ["What is the central recommendation?", ["Use the same intervention in every neighbourhood", "Measure only the highest temperature", "Match solutions to physical and social conditions", "Avoid collecting information about residents"], 2, "The final paragraph argues for combining measurements with exposure and resource information."],
          ["What does ‘exposed’ refer to here?", ["Being publicly criticised", "Experiencing heat without enough protection", "Living near a new tree", "Working with maps"], 1, "The context concerns who faces heat, for how long and with what protection."],
          ["Which statement best captures the author's tone?", ["Cautiously practical", "Completely opposed to intervention", "Uncritically enthusiastic", "Amused by the research"], 0, "The text sees value in interventions while consistently examining conditions and limitations."],
        ]
      },
      listening: {
        genre: "Short lecture", title: "Temperature is not the same as risk", rate: 0.94,
        transcript: `When we map urban heat, we usually begin with surface temperature because satellites can measure it across an entire city. That information is valuable, but it does not tell us everything about risk. Imagine two neighbourhoods with the same afternoon temperature. In the first, most homes are well insulated and residents can reach a shaded public building. In the second, many people work outdoors and electricity cuts regularly interrupt cooling systems. The physical temperature is similar, but the likely harm is not. This is why researchers combine hazard, exposure and vulnerability. Hazard describes the heat itself. Exposure concerns who experiences it and for how long. Vulnerability refers to the conditions that make recovery or protection more difficult. A map of risk therefore requires more than a map of temperature.`,
        questions: [
          ["What is the lecturer's main point?", ["Satellite data is useless", "Risk depends on more than physical temperature", "All neighbourhoods have equal resources", "Outdoor work prevents measurement"], 1, "The lecture distinguishes temperature from the broader concept of risk."],
          ["What resource is available in the first neighbourhood?", ["A hospital", "A shaded public building", "Free transport", "A research centre"], 1, "Residents can reach a shaded public building."],
          ["What does exposure describe?", ["The heat itself", "The conditions that make recovery hard", "Who experiences the heat and for how long", "How satellites work"], 2, "The lecturer explicitly defines exposure in those terms."],
          ["Why are the two neighbourhoods compared?", ["To show how equal temperatures can produce unequal risk", "To prove insulation causes heat", "To criticise public buildings", "To recommend electricity cuts"], 0, "The comparison demonstrates that social and material conditions change likely harm."],
        ]
      },
      discussion: "A city can fund only one programme this year: tree planting, reflective roofs or public cooling centres. Compare impact, speed, fairness and maintenance.",
      writing: { genre: "Report", wordLimit: "200–240 words", prompt: "Write a report recommending two measures to reduce heat risk around a college campus.", structure: ["purpose", "current risks", "recommended measures", "monitoring"], useful: ["It was observed that...", "Particular attention should be paid to...", "It is recommended that...", "Success could be measured by..."], model: `Report: Reducing Heat Risk on Campus\n\nPurpose\nThis report identifies the areas where students and staff are most exposed to summer heat and recommends two practical measures.\n\nCurrent risks\nThe main courtyard has little shade, while the west-facing study rooms become extremely warm in the afternoon. Outdoor maintenance staff are exposed for longer periods than most students, and the nearest cool indoor space is not clearly signposted.\n\nRecommendations\nFirst, temporary shade structures should be installed in the courtyard before the hottest month. These could provide immediate protection while newly planted trees develop. Second, reflective film should be tested on the windows of one west-facing room. A pilot would allow the college to measure indoor temperature and identify any problems before wider installation.\n\nMonitoring\nSuccess could be measured through hourly temperature records, use of shaded areas and short surveys of staff who work outdoors. Particular attention should be paid to whether the measures reduce exposure for the groups currently facing the greatest risk.`, commentary: "The model separates findings from action, proposes an immediate and a testable longer-term measure, and defines evidence for review." },
      speaking: "Present a two-minute heat-risk recommendation to a campus committee, then answer a challenge about cost.",
      pronunciation: "Mark thought groups and prominent words in: ‘A map of TEMperature / is not automatically / a map of RISK.’",
      critical: "How could a city avoid spending resources only in neighbourhoods that already have the strongest political influence?"
    },
    {
      id: "integrated-b2-work-patterns", level: "b2", moduleId: "b2-writing", title: "Designing hybrid work", theme: "Work, evidence and professional communication",
      reading: {
        genre: "Professional report", title: "Beyond office days",
        text: `A medium-sized design company introduced a hybrid policy that required employees to attend the office on Tuesday and Thursday. Managers expected the shared schedule to improve collaboration. Six months later, project delivery had become slightly faster, but employee surveys showed that many office days were still filled with individual online meetings.

The company reviewed meeting calendars and workspace use. Teams that planned specific collaborative tasks for office days reported better results than teams that simply shared the same location. Employees also valued predictable days because they could organise travel and care responsibilities. However, the fixed schedule created problems for colleagues working with clients in different time zones.

The evidence also differed by role. New employees valued spontaneous questions and informal observation, whereas experienced staff often protected uninterrupted home-working time for complex design work. Managers therefore stopped treating one arrangement as equally useful for every task. They began asking which interactions required shared materials, rapid feedback or relationship building, and which depended mainly on concentration.

The review did not recommend removing office requirements or increasing them. Instead, it proposed that each team define which activities genuinely benefit from physical presence, publish a monthly collaboration plan and retain a process for justified exceptions. The central finding was that location alone does not create collaboration. A useful policy connects place to purpose and makes the reason for attendance visible.`,
        vocabulary: [
          { term: "predictable", meaning: "known or expected in advance", collocation: "a predictable schedule", stress: "pre-DICT-a-ble" },
          { term: "physical presence", meaning: "being in the same real location", collocation: "require physical presence", stress: "PHYS-i-cal PRES-ence" },
          { term: "justified exception", meaning: "a permitted difference supported by a reason", collocation: "request a justified exception", stress: "JUS-ti-fied ex-CEP-tion" },
          { term: "retain", meaning: "continue to have or keep", collocation: "retain a process", stress: "re-TAIN" }
        ],
        questions: [
          ["What unexpected problem appeared on office days?", ["Employees refused to use computers", "Many people still attended individual online meetings", "Projects became much slower", "The office closed on Thursdays"], 1, "The report notes that shared-location days still contained individual online meetings."],
          ["Which teams reported better results?", ["Teams with the longest commute", "Teams that planned collaborative office tasks", "Teams working only with foreign clients", "Teams with no schedule"], 1, "Planning purpose-specific collaborative work was associated with better results."],
          ["Why did some employees value fixed days?", ["They eliminated all meetings", "They made personal planning easier", "They increased salaries", "They removed client work"], 1, "Predictable days helped organise travel and care responsibilities."],
          ["What is the report's central conclusion?", ["Office work always improves performance", "Remote work should be prohibited", "Location should be connected to a clear collaborative purpose", "Every team needs the same schedule"], 2, "The conclusion explicitly states that useful policy connects place to purpose."],
          ["What is the function of the final proposal?", ["To replace evidence with opinion", "To create a purpose-based and flexible policy", "To make the schedule less predictable", "To require more online meetings"], 1, "The proposal preserves coordination while adding purpose and justified exceptions."],
        ]
      },
      listening: {
        genre: "Team meeting", title: "Planning one useful office day", rate: 0.96,
        transcript: `Manager: We are all in the office next Tuesday, so I would like the day to produce something we cannot achieve as easily online.\nDesigner: The prototype review would benefit from having the physical materials in one room.\nDeveloper: Agreed, but the client call should stay online because their team is in three countries.\nManager: That makes sense. Could we review the prototype in the morning, document the decisions before lunch and leave the afternoon flexible?\nDesigner: Yes, provided that everyone reads the user feedback beforehand. Otherwise we will spend the session repeating information.\nDeveloper: I can circulate a one-page summary on Monday and list the two decisions we need.\nManager: Good. Then attendance has a clear purpose: examine the prototype and resolve those decisions.`,
        questions: [
          ["What does the manager want from the office day?", ["More time online", "An outcome that is harder to achieve remotely", "A new attendance rule", "A longer client call"], 1, "The manager wants the day to produce something not as easily achieved online."],
          ["Why will the client call remain online?", ["The prototype is missing", "The client team is distributed across countries", "The office has no internet", "The designer cannot attend"], 1, "The client's team is in three countries."],
          ["What condition does the designer add?", ["Everyone must read the feedback first", "The afternoon must be cancelled", "The client must visit", "No decisions should be documented"], 0, "The designer says the plan works provided everyone reads the feedback beforehand."],
          ["What will the developer circulate?", ["A new prototype", "A travel plan", "A one-page summary and decision list", "Meeting minutes from last year"], 2, "The developer offers a short summary and identifies the two required decisions."],
        ]
      },
      discussion: "Should hybrid policies be fixed for fairness or flexible for purpose? Define what fairness means in your answer.",
      writing: { genre: "Formal email", wordLimit: "180–210 words", prompt: "Email your team explaining the purpose, preparation and expected outcome of an office collaboration day.", structure: ["purpose", "agenda", "preparation", "expected decision"], useful: ["The purpose of the session is...", "Please review... in advance", "By the end of the session...", "If you are unable to..."], model: `Subject: Tuesday collaboration session\n\nDear team,\n\nThe purpose of Tuesday's office session is to review the physical prototype and resolve two design decisions that have remained open during our online meetings.\n\nWe will examine the prototype from 9:30 to 11:00, compare it with the latest user feedback and record our decisions before lunch. The client call will remain online in the afternoon because their representatives are joining from several countries.\n\nPlease read the attached one-page feedback summary in advance and add any essential questions by Monday at 3 p.m. This preparation will allow us to use the shared time for evaluation rather than repeating background information.\n\nBy the end of the session, we should have agreed on the navigation layout and the material for the outer case. If you are unable to attend in person, please contact me so that we can arrange a focused remote contribution.\n\nBest regards,\nJordan`, commentary: "The email makes attendance purposeful, states preparation and defines two observable outcomes while allowing a justified alternative." },
      speaking: "Lead a meeting that compares two scheduling options, invites concerns and closes with a decision, owner and deadline.",
      pronunciation: "Practise polite but firm prominence: ‘We need the FEEDBACK before Tuesday, not the final DESIGN.’",
      critical: "The report found faster delivery after the policy. Why is that not enough to prove that the attendance rule caused the improvement?"
    },
    {
      id: "integrated-b2p-ai-hiring", level: "b2-plus", moduleId: "b2p-reading", title: "AI in recruitment", theme: "Technology, work, fairness and evidence",
      reading: {
        genre: "Investigative article", title: "When efficiency becomes a filter",
        text: `A large retailer introduced an automated system to rank applications for entry-level roles. The company said the tool would reduce waiting time and allow recruiters to focus on interviews. During the first three months, the average processing time fell from twelve days to four.

The improvement appeared clear until an internal review compared outcomes across applicant groups. Candidates whose work histories contained frequent short contracts were rejected at a higher rate, even when those contracts were common in their region or industry. The system had learned from earlier hiring decisions, which often treated a stable employment history as evidence of reliability. It reproduced that preference without understanding why a candidate's record looked different.

The company did not conclude that automation was necessarily unfair. Instead, it suspended automatic rejection, required human review for borderline cases and began testing whether each feature actually predicted later job performance. Critics argued that these safeguards arrived only after applicants had been affected. Supporters replied that a documented review was more transparent than the informal judgements recruiters had previously made.

The dispute reveals a wider question. A faster decision process can still be a poor decision process. Efficiency should be measured alongside accuracy, fairness, explainability and the opportunity to challenge an outcome.`,
        vocabulary: [
          { term: "borderline case", meaning: "a case close to the decision boundary", collocation: "review a borderline case", stress: "BOR-der-line CASE" },
          { term: "safeguard", meaning: "a measure designed to prevent harm", collocation: "introduce a safeguard", stress: "SAFE-guard" },
          { term: "reproduce a preference", meaning: "create the same tendency again", collocation: "reproduce historical bias", stress: "re-pro-DUCE a PREF-er-ence" },
          { term: "challenge an outcome", meaning: "formally question or appeal a result", collocation: "the right to challenge an outcome", stress: "CHAL-lenge an OUT-come" }
        ],
        questions: [
          ["What initial benefit did the system produce?", ["More applicants were hired", "Processing time was reduced", "Recruiters stopped interviewing", "Job performance improved"], 1, "The measured improvement was the fall from twelve processing days to four."],
          ["Why were some short-contract histories problematic for the system?", ["The system treated stability as a sign of reliability", "Short contracts were illegal", "Applicants omitted their regions", "Recruiters requested longer applications"], 0, "The historical pattern associated stable employment with reliability without context."],
          ["What can be inferred from the supporters' response?", ["Human judgement is always unbiased", "Documented systems can make review more visible", "Applicants should not appeal", "Automation is accurate by definition"], 1, "Supporters contrast documented review with less visible informal judgement."],
          ["What is the writer's position?", ["Efficiency alone is sufficient", "Automation should never be used", "Decision quality requires several measures beyond speed", "Historical data cannot be analysed"], 2, "The conclusion explicitly places fairness, accuracy, explainability and challenge alongside efficiency."],
          ["Which criticism is directed at the timing of the safeguards?", ["They were introduced before testing", "They came after applicants had experienced the system", "They removed human review", "They focused only on job performance"], 1, "Critics point out that people were affected before the safeguards were added."],
        ]
      },
      listening: {
        genre: "Debate extract", title: "Can a documented model be fairer?", rate: 1,
        transcript: `Speaker A: I am not defending the original model. I am arguing that a measurable system gives us something specific to audit. Informal hiring decisions also contain bias, but those decisions are rarely recorded in a form that allows systematic review.\nSpeaker B: Auditability matters, but it does not solve the power problem. An applicant may not know which information influenced the score or how to challenge it. A system can be transparent to the company and opaque to the person affected.\nSpeaker A: Then the answer is to require explanations and an appeal process, not to return to undocumented judgement.\nSpeaker B: Perhaps, but explanation must be meaningful. Listing fifty variables is not the same as explaining which reason changed the decision and whether that reason was relevant.`,
        questions: [
          ["What advantage does Speaker A claim for a measurable system?", ["It removes every bias", "It can be systematically audited", "It guarantees an interview", "It uses fewer variables"], 1, "Speaker A values the existence of records that make systematic review possible."],
          ["What distinction does Speaker B make about transparency?", ["A system may be clear to the company but unclear to an applicant", "Applicants understand every variable", "Informal decisions are always recorded", "Appeals are unnecessary"], 0, "Speaker B distinguishes organisational visibility from meaningful explanation to the affected person."],
          ["Where do the speakers partly agree?", ["The original model was acceptable", "Undocumented judgement has no risk", "Explanation and review mechanisms matter", "Automation should replace interviews"], 2, "Both turns move toward explanation, audit and appeal, although they disagree about sufficiency."],
          ["What does Speaker B mean by ‘meaningful’ explanation?", ["Publishing every variable", "Identifying the relevant reason that affected the outcome", "Using technical vocabulary", "Providing the result more quickly"], 1, "The final sentence contrasts a variable list with an explanation of the decisive relevant reason."],
        ]
      },
      discussion: "Should applicants have a legal right to a human review of automated hiring decisions? Address cost, scale, fairness and abuse.",
      writing: { genre: "Proposal", wordLimit: "220–260 words", prompt: "Write a proposal for safeguards before a company pilots automated application screening.", structure: ["objective", "risk", "safeguards", "monitoring", "review condition"], useful: ["Prior to deployment...", "A human review should be triggered when...", "The pilot would be suspended if...", "Outcome data should be disaggregated by..."], model: `Proposal: Safeguards for an Automated Screening Pilot\n\nObjective\nThe pilot should test whether automated screening can reduce processing time without creating unjustified differences between comparable applicants.\n\nPrincipal risks\nHistorical hiring data may reproduce earlier preferences that are unrelated to job performance. Applicants may also be unable to understand or challenge a rejection if the decisive factors are not recorded clearly.\n\nProposed safeguards\nPrior to deployment, every input variable should be reviewed for job relevance. Automatic rejection should be prohibited; instead, low and borderline scores should trigger a trained human review. Applicants should receive a concise explanation of the principal reason for a negative decision and a route to request reconsideration.\n\nMonitoring and review\nOutcome data should be disaggregated by region, career pattern and other legally appropriate groups. The team should compare processing time, later job performance, appeal rates and differences in selection outcomes. The pilot would be suspended if a substantial unexplained disparity appeared or if reviewers repeatedly overturned the same type of decision.\n\nRecommendation\nA limited twelve-week pilot is recommended, provided that an independent reviewer can inspect the process and publish a summary of findings.`, commentary: "The proposal defines the success criterion, turns abstract fairness into observable safeguards and sets a condition under which the pilot must stop." },
      speaking: "Take part in a formal debate. Defend a qualified position, respond to the strongest objection and propose one enforceable safeguard.",
      pronunciation: "Use contrastive stress to separate concepts: ‘The system may be transparent to the COMPANY, but opaque to the APPLICANT.’",
      critical: "Which outcomes would distinguish a fairer system from a merely faster one, and what evidence could still be misleading?"
    },
    {
      id: "integrated-b2p-engineering-failure", level: "b2-plus", moduleId: "b2p-production", title: "Learning from system failure", theme: "Engineering, evidence and technical communication",
      reading: {
        genre: "Engineering case study", title: "The alarm that everyone learned to ignore",
        text: `A packaging plant installed sensors to detect unusual pressure in a cooling system. During the first week, the sensors produced dozens of warnings. Most were triggered by harmless pressure changes when production lines started. Operators checked the equipment repeatedly and found no fault.

Because the alerts interrupted work, the team increased the warning threshold. The number of alarms fell, and the system appeared easier to manage. Three months later, a small leak developed gradually. Its signal remained below the new threshold until the cooling unit shut down, stopping production for nine hours.

The technical review did not blame a single operator. It found a design problem in the relationship between the sensors, alert rules and work process. The original system could not distinguish a brief start-up change from a sustained rise in pressure. Frequent low-value alarms trained operators to expect that warnings would not require action. Raising the threshold removed the interruption but also removed an early signal.

The plant replaced the single threshold with a rule that considered both pressure and duration. It also created three alert levels with different required responses. The case shows that an alarm is not useful simply because it detects something. It must help a person distinguish normal variation from a condition that requires attention.`,
        vocabulary: [
          { term: "threshold", meaning: "the level at which a response is triggered", collocation: "raise the warning threshold", stress: "THRESH-old" },
          { term: "sustained", meaning: "continuing for a period rather than brief", collocation: "a sustained increase", stress: "sus-TAINED" },
          { term: "low-value alarm", meaning: "an alert that rarely requires useful action", collocation: "reduce low-value alarms", stress: "low-VALUE a-LARM" },
          { term: "normal variation", meaning: "expected change within an acceptable range", collocation: "distinguish normal variation from failure", stress: "NOR-mal var-i-A-tion" }
        ],
        questions: [
          ["Why did the team raise the warning threshold?", ["The sensors had stopped working", "Frequent harmless alerts interrupted work", "A leak had already closed the plant", "Production pressure was too low"], 1, "The alarms were frequent, disruptive and usually harmless."],
          ["Why was the later leak not detected early?", ["Its signal stayed below the new threshold", "Operators removed every sensor", "The cooling system had no pressure", "The leak occurred before installation"], 0, "The gradual signal did not cross the higher warning level until shutdown."],
          ["What systemic cause did the review identify?", ["One careless operator", "The inability to distinguish brief changes from sustained pressure", "A lack of production lines", "Too many repair tools"], 1, "The alert logic did not include duration, so different conditions looked similar."],
          ["What broader lesson does the case support?", ["More alarms always improve safety", "Detection is useful only when it supports meaningful action", "Thresholds should never change", "Operators should ignore start-up conditions"], 1, "The final paragraph connects usefulness to distinguishing normal variation from actionable conditions."],
          ["Why does the writer state that the review did not blame one operator?", ["To focus attention on the design and process relationship", "To show that no one used the equipment", "To claim the leak was imaginary", "To remove the need for review"], 0, "The sentence redirects explanation toward the system, alert rules and work process."],
        ]
      },
      listening: {
        genre: "Technical briefing", title: "The revised alert logic", rate: 1,
        transcript: `Engineer: The new system does not ask only whether pressure crosses one number. It also asks how long the change continues and whether temperature is rising at the same time. A short pressure spike during start-up creates an information message, not an audible alarm. If pressure remains high for more than ninety seconds, the control room receives a warning and an operator checks the unit. If high pressure appears together with rising temperature, the system creates an immediate critical alert and begins a controlled shutdown. None of these rules removes human judgement. The goal is to give the operator a clearer signal about urgency and the response expected next. We will review false alarms and missed events every month rather than assuming the initial settings are permanent.`,
        questions: [
          ["What happens after a short start-up pressure spike?", ["A critical shutdown begins", "An information message appears", "The plant closes", "An operator replaces the sensor"], 1, "A brief start-up spike produces information rather than an audible alarm."],
          ["When does the control room receive a warning?", ["When pressure remains high for over ninety seconds", "Every time production starts", "Only after a shutdown", "When temperature falls"], 0, "Duration above the threshold triggers the warning."],
          ["Which combination produces an immediate critical alert?", ["Low pressure and falling temperature", "A brief pressure change alone", "High pressure with rising temperature", "A monthly review"], 2, "The system treats simultaneous high pressure and rising temperature as urgent."],
          ["What role remains for human judgement?", ["None", "Operators interpret urgency and perform checks", "Humans set off every alarm manually", "Only managers can view messages"], 1, "The speaker says the rules support rather than remove human judgement."],
        ]
      },
      discussion: "When a person ignores an alarm after many false warnings, is the main failure individual, technical or organisational? Defend a distributed explanation.",
      writing: { genre: "Technical incident report", wordLimit: "220–260 words", prompt: "Report the failure, contributing factors, corrective actions and a verification plan for a non-specialist manager.", structure: ["incident", "impact", "contributing factors", "corrective actions", "verification"], useful: ["The immediate cause was...", "A contributing factor was...", "The revised system distinguishes...", "Effectiveness will be verified by..."], model: `Incident Report: Cooling-System Shutdown\n\nIncident and impact\nA gradual leak caused the cooling unit to shut down, interrupting production for nine hours. The leak was not identified early because its pressure signal remained below the revised alarm threshold.\n\nContributing factors\nThe original sensor logic responded to pressure alone and could not distinguish brief start-up variation from a sustained increase. Frequent non-actionable alarms led the team to raise the threshold, reducing disruption but removing sensitivity to a developing fault. The review therefore identified a system-design issue rather than a single operator error.\n\nCorrective actions\nThe alert logic has been revised to consider pressure, duration and temperature together. Three alert levels now distinguish information, required inspection and critical response. Each level includes a defined operator action.\n\nVerification\nEffectiveness will be reviewed monthly using the number of false alarms, confirmed faults detected before shutdown and cases in which operators considered the required action unclear. A simulation of gradual pressure increase will also be conducted after software updates. The settings should be adjusted only after documented evidence shows that the revised rule creates either unnecessary interruption or an unacceptable missed-event risk.`, commentary: "The report translates technical logic for management, distinguishes immediate and systemic causes and defines how corrective action will be tested." },
      speaking: "Explain the failure to a non-technical manager in three minutes, then answer why the team cannot simply lower the threshold again.",
      pronunciation: "Divide the technical explanation into thought groups and keep PRESSURE, DURATION, TEMPERATURE and RESPONSE prominent.",
      critical: "What evidence would show that the revised system improves safety without creating a new alarm-fatigue problem?"
    },
    {
      id: "integrated-c1-space-debris", level: "c1", moduleId: "c1-reading", title: "Who governs orbital debris?", theme: "Space, law, engineering and shared risk",
      reading: {
        genre: "Policy analysis", title: "A crowded orbit and a missing referee",
        text: `Low Earth orbit is often described as a vast environment, yet useful orbital paths are not unlimited. Thousands of active satellites now share those paths with inactive spacecraft, discarded rocket components and fragments created by earlier collisions. Even a small fragment can damage a functioning satellite because objects travel at extremely high relative speeds.

Operators can sometimes move a satellite away from a predicted conjunction, but avoidance is not a complete solution. A manoeuvre consumes fuel, may interrupt the satellite's mission and depends on accurate information about both objects. Responsibility is also fragmented. National authorities license launches, private companies operate constellations and tracking organisations publish warnings, but no single institution controls every decision.

Proposals for debris removal raise further questions. Removing an object requires approaching and capturing hardware that belongs to another state or company. The same technology could also be interpreted as having military capability. A technically successful mission may therefore create political concern unless ownership, consent and verification are addressed in advance.

The policy challenge is not simply to invent a better machine. It is to create incentives for prevention, reliable information-sharing and rules for intervention before a crisis makes cooperation more difficult. Orbital debris illustrates a recurring problem in shared environments: individual actors receive the immediate benefit of activity, while the long-term risk is distributed across everyone who depends on the system.`,
        vocabulary: [
          { term: "conjunction", meaning: "a predicted close approach between objects in space", collocation: "a conjunction warning", stress: "con-JUNC-tion" },
          { term: "manoeuvre", meaning: "a controlled change in position or movement", collocation: "perform an avoidance manoeuvre", stress: "ma-NOEU-vre" },
          { term: "fragmented responsibility", meaning: "responsibility divided among actors without one clear controller", collocation: "address fragmented responsibility", stress: "FRAG-men-ted re-spon-si-BIL-i-ty" },
          { term: "incentive", meaning: "something that encourages a particular action", collocation: "create an incentive for prevention", stress: "in-CEN-tive" }
        ],
        questions: [
          ["Why can a small fragment cause serious damage?", ["It contains fuel", "Objects have very high relative speeds", "It controls an orbital path", "Satellites cannot be moved"], 1, "The text links potential damage to extremely high relative speeds."],
          ["Which limitation of avoidance manoeuvres is mentioned?", ["They require no information", "They can consume fuel and interrupt a mission", "They remove ownership questions", "They are controlled by one institution"], 1, "Fuel use, mission interruption and information dependence are explicit limitations."],
          ["Why might debris-removal technology create political concern?", ["It cannot approach objects", "It could also be interpreted as a military capability", "All debris has no owner", "Tracking organisations prohibit launches"], 1, "Approach-and-capture capability has a possible dual interpretation."],
          ["What assumption does the writer challenge?", ["Technical invention alone can solve the governance problem", "Orbital paths have value", "Prevention requires incentives", "Space activity creates benefits"], 0, "The final paragraph explicitly says the challenge is not simply to invent a better machine."],
          ["What larger pattern does orbital debris illustrate?", ["Immediate benefits can accompany risks distributed across many actors", "Shared environments eliminate responsibility", "Private companies always control policy", "Crisis automatically improves cooperation"], 0, "The conclusion generalises from individual benefit and distributed long-term risk."],
        ]
      },
      listening: {
        genre: "Panel discussion", title: "Who should pay for prevention?", rate: 1.04,
        transcript: `Moderator: Should operators pay a fee for the long-term orbital risk created by each launch?\nPolicy researcher: A fee could create an incentive to design satellites that can be removed safely, but the calculation must reward genuine risk reduction rather than simply satellite size.\nIndustry representative: We should be careful. New operators may face a high barrier while older debris remains in orbit without anyone paying. A fee that applies only to future launches could be fair administratively but incomplete environmentally.\nEngineer: That is why the fee should be paired with technical standards and a shared removal fund. However, we should not pretend that every old object can be captured immediately. Some are difficult to approach, and removal itself introduces risk.\nModerator: So the disagreement is less about whether prevention matters and more about how responsibility should be distributed across new activity and inherited debris.`,
        questions: [
          ["What possible benefit does the researcher see in a fee?", ["It could encourage safer end-of-life design", "It would remove every old object", "It would reward larger satellites", "It would end technical standards"], 0, "The researcher links the fee to design choices that reduce future risk."],
          ["What fairness concern does the industry representative raise?", ["Older debris may remain while only new operators pay", "Fees are impossible to calculate", "New satellites create no risk", "Technical standards are too old"], 0, "The speaker contrasts burdens on new activity with inherited debris."],
          ["Why does the engineer reject immediate removal of every old object?", ["Ownership never matters", "Some objects are difficult and removal creates risk", "No tracking information exists", "Prevention is unnecessary"], 1, "Technical difficulty and removal risk limit what can be done immediately."],
          ["How does the moderator reframe the disagreement?", ["As a dispute about whether space exists", "As a question of distributing responsibility", "As proof that prevention has no value", "As a choice between engineering and law"], 1, "The final summary identifies responsibility across new activity and inherited debris."],
        ]
      },
      discussion: "Design a fair responsibility model for new launches, legacy debris and countries with emerging space programmes.",
      writing: { genre: "Discursive essay", wordLimit: "250–290 words", prompt: "Evaluate whether market incentives or international rules should play the greater role in reducing orbital debris.", structure: ["frame the shared-risk problem", "case for incentives", "case for rules", "interaction and limits", "qualified conclusion"], useful: ["A market mechanism may...", "This presupposes that...", "Regulation is more defensible where...", "The two approaches are not mutually exclusive..."], model: `Reducing orbital debris requires both technical innovation and a credible way to distribute responsibility. Market incentives can influence design quickly, whereas international rules can establish duties that do not depend on an operator's immediate commercial interest. The question is which mechanism should lead.\n\nA risk-based launch fee could reward satellites designed for reliable tracking and safe removal. It may also encourage companies to consider long-term orbital cost when choosing an architecture. This approach, however, presupposes that risk can be measured consistently. A poorly designed fee might favour large established operators or reward features that are easy to document rather than those that genuinely reduce danger.\n\nInternational rules are more defensible where one actor's decision imposes risk on others. Common standards for data sharing, end-of-life planning and consent for removal could reduce uncertainty and provide a basis for accountability. Yet rules negotiated slowly may lag behind technology, and enforcement remains difficult when responsibility is divided across states and companies.\n\nThe two approaches are therefore not mutually exclusive. International rules should define minimum obligations and verification, while market mechanisms should reward performance beyond that baseline. Rules ought to play the greater role because orbital safety is a shared condition, not a private product. Their effectiveness, however, will depend on whether they create practical incentives and include support for emerging programmes rather than preserving the advantage of established actors.`, commentary: "The model evaluates both mechanisms, exposes assumptions and reaches a qualified conclusion that explains how the approaches interact." },
      speaking: "Give a four-minute policy briefing, distinguish technical from governance problems and respond to a fairness objection from an emerging space programme.",
      pronunciation: "Practise contrast and qualification: ‘The problem is not ONLY technical; it is ALSO institutional.’",
      critical: "Who benefits from describing orbit as an unlimited frontier, and which policy choices might that metaphor hide?"
    },
    {
      id: "integrated-c1-metrics", level: "c1", moduleId: "c1-writing", title: "When a metric becomes the goal", theme: "Media, organisations and unintended consequences",
      reading: {
        genre: "Academic-style essay", title: "The number that changes the work",
        text: `Organisations use metrics because complex activity is difficult to observe directly. A school may track completion rates, a newsroom may count clicks and a customer-service team may measure call duration. Such indicators can reveal patterns that intuition misses. Problems arise, however, when the indicator stops describing the work and begins to define it.

If employees know that one number determines reward or criticism, they have a reason to improve that number. Sometimes the response improves the underlying activity: a team may simplify a confusing process after seeing repeated delays. In other cases, people adapt in ways that preserve the appearance of success. A service agent evaluated mainly on short calls may transfer difficult customers rather than solve their problems. The recorded duration falls while the customer's total effort rises.

This does not mean measurement is futile. It means that a metric should be treated as evidence within a system of judgement. Counter-metrics can expose trade-offs: call duration can be considered alongside repeat contact and customer effort. Qualitative review can reveal whether an apparent improvement represents changed behaviour rather than a better outcome.

The most important question is therefore not whether a metric is accurate in isolation. It is what behaviour the metric makes rational once careers, budgets or public reputation depend on it. Measurement does not merely observe an organisation; under pressure, it helps shape the organisation it claims to describe.`,
        vocabulary: [
          { term: "underlying activity", meaning: "the real process or outcome beneath a measurement", collocation: "improve the underlying activity", stress: "UN-der-ly-ing ac-TIV-i-ty" },
          { term: "counter-metric", meaning: "an additional measure used to reveal a trade-off", collocation: "introduce a counter-metric", stress: "COUN-ter MET-ric" },
          { term: "qualitative review", meaning: "evaluation based on observed qualities and interpretation", collocation: "conduct a qualitative review", stress: "QUAL-i-ta-tive re-VIEW" },
          { term: "in isolation", meaning: "considered without its wider context", collocation: "interpret a figure in isolation", stress: "in i-so-LA-tion" }
        ],
        questions: [
          ["What central distinction does the essay make?", ["Description versus definition of work", "Schools versus newsrooms", "Long calls versus short calls", "Qualitative versus inaccurate data"], 0, "The argument turns on a metric moving from describing work to defining what counts as success."],
          ["Why is the service-agent example used?", ["To prove all short calls are effective", "To show how a metric can improve while the real outcome worsens", "To recommend transferring customers", "To explain why calls cannot be measured"], 1, "Recorded duration improves while customer effort increases."],
          ["What role do counter-metrics play?", ["They replace judgement", "They reveal possible trade-offs", "They guarantee honest behaviour", "They make qualitative review unnecessary"], 1, "The text says they can expose what one metric misses or shifts elsewhere."],
          ["What is implied by the final sentence?", ["Measurement can influence the behaviour it evaluates", "Organisations should publish no data", "Metrics are always inaccurate", "Careers never depend on indicators"], 0, "The writer argues that pressured measurement changes the system being measured."],
          ["Which tone best describes the essay?", ["Analytical and qualified", "Entirely dismissive", "Personal and nostalgic", "Uncritically promotional"], 0, "The essay recognises value, examines failure modes and proposes a more careful use."],
        ]
      },
      listening: {
        genre: "Podcast interview", title: "What happened after the target changed", rate: 1.05,
        transcript: `Host: Your team reduced average response time by almost forty percent. Why did you later change the target?\nManager: Because the average concealed a shift in behaviour. Easy requests were answered immediately, which improved the number, but complicated cases waited much longer. Staff had learned that resolving five simple requests protected the target better than spending the same time on one difficult case.\nHost: Was that deliberate manipulation?\nManager: Not necessarily. The metric made one choice rational. We had told people that speed mattered and had failed to show how complexity would be recognised.\nHost: What replaced the target?\nManager: We kept response time, but grouped cases by complexity and added repeat contact. We also review a sample of cases each month. The new system is less elegant, but it represents the work more honestly.`,
        questions: [
          ["Why was the original improvement misleading?", ["No requests were answered", "Easy cases improved the average while complex cases waited", "The team stopped recording time", "Every case had equal complexity"], 1, "The average hid different treatment of easy and difficult requests."],
          ["How does the manager interpret staff behaviour?", ["As necessarily dishonest", "As a rational response to the metric", "As unrelated to management", "As evidence that speed never matters"], 1, "The manager explicitly resists the manipulation label and examines the incentive."],
          ["What additional measure was introduced?", ["Employee age", "Repeat contact", "Office attendance", "Number of managers"], 1, "Repeat contact accompanies complexity grouping and sample review."],
          ["Why is the new system described as ‘less elegant’?", ["It is more complex but represents work more honestly", "It uses only one number", "It excludes difficult cases", "It removes review"], 0, "The speaker accepts reduced simplicity in exchange for better representation."],
        ]
      },
      discussion: "Choose a metric used in school or work. Explain the behaviour it rewards, one unintended consequence and a better evidence set.",
      writing: { genre: "Critical response", wordLimit: "260–300 words", prompt: "Respond critically to the claim: ‘What gets measured gets improved.’ Use the reading and listening as source material without copying them.", structure: ["interpret the claim", "value of measurement", "counterexample", "conditions for defensible use", "qualified judgement"], useful: ["The claim is persuasive insofar as...", "It overlooks the possibility that...", "A more defensible formulation would be...", "This distinction matters because..."], model: `The claim that “what gets measured gets improved” is persuasive insofar as measurement directs attention towards patterns that would otherwise remain anecdotal. A team that records delays, repeat errors or unequal outcomes can identify a problem and test whether an intervention changes it. Measurement can therefore support improvement, but the slogan overlooks a crucial distinction: a number can improve without the underlying activity improving.\n\nThe customer-service examples illustrate this risk. When short response time became the dominant target, staff had a reason to prioritise easy requests. The average fell, yet complicated cases waited longer. This was not necessarily dishonest behaviour; it was a predictable response to the incentive created by the metric. Calling the lower average an improvement would confuse the indicator with the purpose it was meant to represent.\n\nA defensible measurement system should therefore use several forms of evidence. Measures need to be grouped by relevant context, such as case complexity, and paired with counter-metrics that expose displaced costs. Qualitative review is also necessary because no fixed set of numbers can anticipate every strategy people may adopt. Most importantly, those being evaluated should understand the purpose of the measures and be able to report where they distort the work.\n\nA more accurate formulation would be that what gets measured attracts effort. Whether that effort produces improvement depends on how well the metric represents the objective, what other evidence constrains it and how willing the organisation is to revise the system when behaviour changes.`, commentary: "The response reframes the slogan, integrates both inputs, distinguishes incentive from dishonesty and proposes conditions rather than a simple rejection." },
      speaking: "Present the strongest version of the slogan, challenge it with an example and defend a revised formulation under follow-up questioning.",
      pronunciation: "Use focus to change the argument: ‘What gets MEASURED attracts effort’ versus ‘What gets measured attracts EFFORT.’",
      critical: "Who should be involved in designing a performance measure, and whose knowledge is usually missing?"
    }
  ];

  const existingIds = new Set(university.activities.map((item) => item.id));
  const add = (item) => { if (!existingIds.has(item.id)) { university.activities.push(item); existingIds.add(item.id); } };
  const topic = (skill) => `skill-${skill}`;
  const choice = (id, skill, unit, taskType, prompt, options, answer, explanation, extra = {}) => add({ id, skill, level: unit.level, moduleId: unit.moduleId, integratedUnitId: unit.id, mode: "quiz", type: "choice", taskType, instruction: extra.instruction || "Use evidence from the source before choosing.", prompt, options, answer, explanation, topic: topic(skill), ...extra });
  const challenge = (id, skill, unit, title, prompt, preparation, checklist, sample, extra = {}) => add({ id, skill, level: unit.level, moduleId: unit.moduleId, integratedUnitId: unit.id, mode: "challenge", title, prompt, preparation, checklist, sample, topic: topic(skill), ...extra });

  const listeningLanguages = ["en-GB", "en-US", "en-US", "en-GB", "en-CA", "en-AU", "en-GB", "en-US"];
  units.forEach((unit, unitIndex) => {
    unit.listening.lang = listeningLanguages[unitIndex % listeningLanguages.length];
    unit.reading.questions.forEach(([prompt, options, answer, explanation], index) => choice(`${unit.id}-reading-${index + 1}`, "reading", unit, ["Reading detail", "Reading evidence", "Reading inference", "Vocabulary in context", "Author purpose and tone"][index], prompt, options, answer, explanation, { passageTitle: unit.reading.title, passage: unit.reading.text, instruction: "Read the complete text, identify the relevant evidence and choose the strongest answer." }));
    unit.listening.questions.forEach(([prompt, options, answer, explanation], index) => choice(`${unit.id}-listening-${index + 1}`, "listening", unit, ["Listening gist", "Listening detail", "Speaker attitude", "Listening inference"][index], prompt, options, answer, explanation, { transcript: unit.listening.transcript, audioTitle: unit.listening.title, speechRate: unit.listening.rate, speechLang: unit.listening.lang, instruction: "Listen once without reading, answer from meaning, then replay and use the transcript to verify." }));
    unit.reading.vocabulary.slice(0, 2).forEach((entry, index) => choice(`${unit.id}-vocabulary-${index + 1}`, "vocabulary", unit, "Vocabulary in context", `Which phrase uses “${entry.term}” naturally in this unit?`, [entry.collocation, `do ${entry.term}`, `${entry.term} veryly`, `make an ${entry.term}ing`], 0, `${entry.collocation} is the natural combination used in this context. ${entry.term} means ${entry.meaning}.`));
    challenge(`${unit.id}-writing`, "writing", unit, `${unit.title} — ${unit.writing.genre}`, unit.writing.prompt, [`Plan: ${unit.writing.structure.join(" → ")}.`, `Use language such as ${unit.writing.useful.join(" · ")}.`, "Write a complete first draft before opening the model."], ["Content and task achievement", "Organisation and cohesion", "Grammar accuracy and range", "Vocabulary precision", "Register", "Self-review completed"], "Complete your own response before opening the model.", { wordLimit: unit.writing.wordLimit, recommendedStructure: unit.writing.structure, usefulLanguage: unit.writing.useful, modelAnswer: unit.writing.model, modelCommentary: unit.writing.commentary, selfReviewCriteria: ["Grammar", "Vocabulary", "Coherence", "Cohesion", "Organisation", "Register", "Accuracy", "Range"] });
    challenge(`${unit.id}-speaking`, "speaking", unit, `${unit.title} — discussion`, unit.speaking, ["Review the source claims and vocabulary.", "Prepare five keywords, not a script.", "Plan one qualification and one response to a challenge."], ["Clear position", "Evidence from the unit", "Interaction", "Repair and follow-up", "Pronunciation and fluency"], "A strong response answers the exact question, uses evidence and changes intelligently after a challenge.", { voicePrompt: `Run an English speaking practice based on this unit: ${unit.title}. Task: ${unit.speaking} Ask one question at a time, wait for my complete answer, challenge one assumption, request clarification once, and finish with feedback on fluency, interaction, grammar, vocabulary and pronunciation. Do not translate.` });
    challenge(`${unit.id}-pronunciation`, "pronunciation", unit, `${unit.title} — pronunciation transfer`, unit.pronunciation, ["Listen to the browser model once.", "Mark stress and thought groups.", "Record a first and second attempt."], ["Target feature audible", "Key words prominent", "Thought groups clear", "Second attempt improved"], "Pronunciation practice is successful when the listener can recover the intended focus and relationship.", { speechText: unit.pronunciation });
    challenge(`${unit.id}-critical`, "critical-thinking", unit, `${unit.title} — critical inquiry`, unit.critical, ["Return to the source evidence.", "Distinguish fact, interpretation and assumption.", "Consider an alternative explanation or stakeholder."], ["Question answered", "Evidence used", "Assumption identified", "Alternative considered", "Qualified conclusion"], "A critical response represents the original position fairly before testing its evidence, scope and implications.");

    catalogs.readingLibrary.push({ level: unit.level, id: `${unit.id}-library-reading`, genre: unit.reading.genre, title: unit.reading.title, text: unit.reading.text, focus: "integrated comprehension, inference, vocabulary, purpose and critical response", integratedUnitId: unit.id, wordCount: unit.reading.text.split(/\s+/).length });
    catalogs.listeningLibrary.push({ level: unit.level, id: `${unit.id}-library-listening`, genre: unit.listening.genre, title: unit.listening.title, transcript: unit.listening.transcript, focus: "gist, detail, stance, inference and structured notes", integratedUnitId: unit.id, rate: unit.listening.rate, wordCount: unit.listening.transcript.split(/\s+/).length });
  });

  university.integratedUnits = units;

  const stratified = (pool, limit) => {
    const groups = [...new Set(pool.map((item) => item.skill))].map((skill) => pool.filter((item) => item.skill === skill));
    const output = [];
    while (output.length < limit && groups.some((group) => group.length)) groups.forEach((group) => { if (output.length < limit && group.length) output.push(group.shift()); });
    return output;
  };

  const originalDiagnostic = university.diagnostic.filter((item) => /^diag-\d+$/.test(item.id));
  const diagnosticSkills = ["grammar", "vocabulary", "reading", "listening", "use-of-english", "pronunciation", "critical-thinking"];
  university.diagnostic = university.levels.flatMap((level) => {
    const selected = [...originalDiagnostic.filter((item) => item.level === level.id)];
    const seenSources = new Set(selected.map((item) => item.diagnosticSource || item.id));
    const groups = diagnosticSkills.map((skill) => university.activities.filter((item) => item.level === level.id && item.skill === skill && item.mode === "quiz"));
    let cursor = 0;
    while (selected.length < 16 && groups.some((group) => group.length)) {
      const group = groups[cursor % groups.length];
      let source = group.shift();
      while (source && seenSources.has(source.id)) source = group.shift();
      if (source) { seenSources.add(source.id); selected.push({ ...source, id: `diagnostic-${level.id}-${selected.length + 1}`, diagnosticSource: source.id, instruction: "Diagnostic question: answer without notes or translation." }); }
      cursor += 1;
    }
    return selected.slice(0, 16);
  });

  university.levelExams.forEach((exam) => {
    const pool = university.activities.filter((item) => item.level === exam.level && item.mode === "quiz");
    const level = university.levels.find((item) => item.id === exam.level);
    exam.questionPool = pool;
    exam.questions = stratified(pool, 48);
    exam.skillTests = university.skills.map((skill) => ({ id: `${exam.level}-${skill.id}-skill-test`, skill: skill.id, title: `${level.code} ${skill.title} skill test`, questions: stratified(pool.filter((item) => item.skill === skill.id), 20) })).filter((test) => test.questions.length >= 8);
    exam.progressTests = [
      { id: `${exam.level}-progress-1`, title: `${level.code} Progress test 1`, stage: "Foundation", questions: stratified(pool, 24) },
      { id: `${exam.level}-progress-2`, title: `${level.code} Progress test 2`, stage: "Development", questions: stratified([...pool].reverse(), 32) },
      { id: `${exam.level}-progress-3`, title: `${level.code} Progress test 3`, stage: "Readiness", questions: stratified(pool.filter((_, index) => index % 2 === 0).concat(pool.filter((_, index) => index % 2 === 1)), 40) }
    ];
    exam.moduleTests = level.modules.map((module) => ({ id: `${module.id}-test`, moduleId: module.id, title: `${module.title} checkpoint`, questions: stratified(pool.filter((item) => item.moduleId === module.id), 12), production: university.activities.filter((item) => item.moduleId === module.id && item.mode === "challenge").slice(0, 3) }));
  });
})();
