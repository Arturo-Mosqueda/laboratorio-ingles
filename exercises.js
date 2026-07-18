const topics = [
  { id: "future-choices", number: "01", icon: "FC", title: "Future choices", subtitle: "Will, going to and present forms", description: "Choose a future form from the speaker’s intention, evidence, arrangement or timetable.", lesson: [
    ["will + base verb", "Use it for spontaneous decisions, offers, promises and predictions based mainly on opinion.", "The phone is ringing. I’ll answer it."],
    ["be going to + base verb", "Use it for an intention decided before speaking or a prediction supported by present evidence.", "Look at those clouds. It’s going to rain."],
    ["present continuous", "Use it for a personal arrangement that is already organised, often with a time or place.", "We’re meeting the designer at ten."],
    ["present simple", "Use it for timetables, programmes and schedules controlled externally.", "The workshop starts at nine."]
  ]},
  { id: "future-continuous", number: "02", icon: "F→", title: "Future continuous", subtitle: "Actions in progress later", description: "Describe an activity that will be in progress at a future time or ask politely about plans.", lesson: [
    ["will be + verb-ing", "Focus on the middle of an activity at a stated future time.", "At eight, I’ll be travelling home."],
    ["polite plan questions", "Use the form to ask about plans without sounding as if you want to influence them.", "Will you be using the meeting room later?"],
    ["state verbs", "Avoid continuous forms with state verbs such as know, believe, need and own.", "I’ll know the result tomorrow."]
  ]},
  { id: "time-clauses", number: "03", icon: "TC", title: "Future time clauses", subtitle: "When, until, before and as soon as", description: "Use present forms after future time conjunctions, even when the meaning is future.", lesson: [
    ["when / before / after + present", "The time clause normally takes a present form; the main clause can contain will.", "I’ll call you when I arrive."],
    ["until / as soon as / once", "Use the present simple for a future event after these conjunctions.", "We won’t begin until everyone is ready."],
    ["while + present continuous", "Use it when the activity in the time clause will be in progress.", "Take notes while you’re listening."]
  ]},
  { id: "articles", number: "04", icon: "Aa", title: "Articles", subtitle: "A, an, the and zero article", description: "Choose an article from sound, countability, specificity and shared knowledge.", lesson: [
    ["a / an", "Introduce one non-specific singular countable noun. Choose by sound, not spelling.", "a university · an hour"],
    ["the", "Use it for something specific, already mentioned, unique or identified by context.", "the report you sent"],
    ["zero article", "Use no article for many plural or uncountable generalisations, meals, languages and subjects.", "Technology changes quickly."]
  ]},
  { id: "determiners", number: "05", icon: "DT", title: "Demonstratives and possessives", subtitle: "This, that, whose and possessive forms", description: "Identify distance, ownership and choices within a known set.", lesson: [
    ["this / these", "Refer to singular or plural things that feel near in space, time or context.", "These notes are useful."],
    ["that / those", "Refer to singular or plural things that feel more distant.", "Who owns that bicycle?"],
    ["possessive determiner vs pronoun", "A determiner comes before a noun; a possessive pronoun replaces the noun phrase.", "This is my desk. That one is mine."],
    ["which / what / whose", "Use which for a limited choice, what for an open choice and whose for ownership.", "Which route should we take?"]
  ]},
  { id: "distributives", number: "06", icon: "1:1", title: "Distributives", subtitle: "Each, every, both, either and neither", description: "Refer to members of a group individually, collectively or as two alternatives.", lesson: [
    ["each / every + singular noun", "Each focuses on members separately; every considers all members one by one.", "Each student has a locker."],
    ["both + plural noun", "Both includes two people or things together and takes a plural verb.", "Both solutions work."],
    ["either / neither", "Either means one or the other of two; neither means not one and not the other.", "Neither answer is correct."]
  ]},
  { id: "quantifiers", number: "07", icon: "½", title: "Quantifiers", subtitle: "Much, many, few, little and enough", description: "Express quantity accurately with countable and uncountable nouns.", lesson: [
    ["many / a few / few", "Use these with plural countable nouns.", "We asked many questions."],
    ["much / a little / little", "Use these with uncountable nouns.", "There is a little time left."],
    ["some / any / enough", "These can be used with plural countable or uncountable nouns.", "Do we have enough information?"],
    ["few vs a few · little vs a little", "Without a, the quantity is usually viewed as insufficient; with a, it is small but useful.", "Few people replied, but a few offered help."]
  ]}
];

const exercises = [];
const mc = (topic, prompt, options, answer, explanation, instruction = "Choose the best answer.") => ({ topic, type: "choice", instruction, prompt, options, answer, explanation });
const text = (topic, prompt, answers, explanation, instruction = "Write the missing words.") => ({ topic, type: "text", instruction, prompt, answers, explanation });
const reading = (topic, title, passage, prompt, options, answer, explanation) => ({ ...mc(topic, prompt, options, answer, explanation, "Read the text and choose the best answer."), passageTitle: title, passage });

const banks = {
  "future-choices": [
    mc("future-choices", "The doorbell is ringing. I ___ it.", ["answer", "will answer", "am going to answer", "am answering every day"], 1, "The decision is made at the moment of speaking, so will is natural."),
    mc("future-choices", "We bought the paint yesterday. We ___ the kitchen this weekend.", ["will paint suddenly", "are going to paint", "paint", "will be paint"], 1, "The plan existed before the speaker mentioned it."),
    mc("future-choices", "I ___ the dentist at 3:30 tomorrow; the appointment is confirmed.", ["see", "will see perhaps", "am seeing", "am going see"], 2, "A confirmed personal arrangement normally takes the present continuous."),
    mc("future-choices", "The last train ___ at 11:45 tonight.", ["leaves", "is going to leaving", "will leaving", "leave"], 0, "A published timetable normally takes the present simple."),
    mc("future-choices", "Look at that cyclist! He ___ into the barrier.", ["will perhaps crash", "is going to crash", "crashes every day", "is crash"], 1, "Visible evidence supports a prediction with going to."),
    mc("future-choices", "I think remote work ___ even more common.", ["will become", "is becoming tomorrow at nine", "becomes by decision", "is going become"], 0, "I think introduces an opinion-based prediction with will."),
    mc("future-choices", "We ___ our new clients for lunch on Friday; the table is booked.", ["meet", "are meeting", "will meet perhaps", "meeting"], 1, "The booking makes this a confirmed arrangement."),
    mc("future-choices", "The conference ___ on 12 September according to the programme.", ["is beginning suddenly", "will begin maybe", "begins", "begin"], 2, "An official programme is expressed with the present simple."),
    text("future-choices", "Complete the spontaneous offer: ‘Those bags look heavy. I ___ you.’", ["will help", "i'll help", "ill help"], "An immediate offer is commonly expressed with will."),
    text("future-choices", "Complete the prior intention: ‘She has already decided. She ___ a coding course.’", ["is going to take", "she is going to take", "she's going to take", "shes going to take"], "Going to shows that the decision was made earlier."),
    text("future-choices", "Complete the arrangement: ‘We ___ Sam outside the theatre at seven.’", ["are meeting", "we are meeting", "we're meeting", "were meeting"], "The agreed time and place make this an arrangement."),
    reading("future-choices", "A community event", "Mina has organised a neighbourhood clean-up for Saturday. Everyone has agreed to meet outside the library at eight. The library doors open at 7:45, and the forecast shows heavy rain clouds for the afternoon.", "Which sentence best describes the group’s arrangement?", ["They meet outside the library every day.", "They are meeting outside the library at eight.", "They will meet without a plan.", "They going to meet outside."], 1, "The meeting is an agreed arrangement with a specific time and place."),
    reading("future-choices", "A community event", "Mina has organised a neighbourhood clean-up for Saturday. Everyone has agreed to meet outside the library at eight. The library doors open at 7:45, and the forecast shows heavy rain clouds for the afternoon.", "Which form best reports the library timetable?", ["The library is opening by intention.", "The library will opening.", "The library opens at 7:45.", "The library is going open."], 2, "The opening time belongs to an official schedule."),
    reading("future-choices", "A community event", "Mina has organised a neighbourhood clean-up for Saturday. Everyone has agreed to meet outside the library at eight. The library doors open at 7:45, and the forecast shows heavy rain clouds for the afternoon.", "The clouds suggest that it ___.", ["is going to rain", "rains by arrangement", "is raining next year", "will rain yesterday"], 0, "The prediction is based on present evidence."),
  ],
  "future-continuous": [
    mc("future-continuous", "At this time tomorrow, I ___ across the Atlantic.", ["fly", "will be flying", "will flying", "am fly"], 1, "The activity will be in progress at a specific future time."),
    mc("future-continuous", "Don’t call at nine. We ___ the final presentation then.", ["will be giving", "give yesterday", "will giving", "are give"], 0, "Then identifies the middle of a future activity."),
    mc("future-continuous", "___ the projector this afternoon?", ["Will you be using", "Will you using", "Do you be using", "Are you use"], 0, "Future continuous can ask politely about another person’s plans."),
    mc("future-continuous", "At noon, the technicians ___ the network, so it may be unavailable.", ["will be testing", "test last week", "will tested", "are test"], 0, "The test will be in progress at noon."),
    mc("future-continuous", "Which sentence focuses on an activity in progress?", ["I’ll write the report tonight.", "I’ll be writing the report at eight.", "I write the report yesterday.", "I’m going write it."], 1, "Future continuous places us in the middle of the activity."),
    mc("future-continuous", "This time next week, they ___ with their host family.", ["will be staying", "stay yesterday", "will staying", "are stayed"], 0, "This time next week signals a future activity in progress."),
    mc("future-continuous", "Choose the natural sentence with a state verb.", ["I’ll be knowing the answer tomorrow.", "I’ll know the answer tomorrow.", "I be knowing the answer.", "I’ll knowing it."], 1, "Know is normally not used in a continuous form."),
    mc("future-continuous", "During the morning session, participants ___ in small groups.", ["will be working", "will working", "worked tomorrow", "be work"], 0, "During the session emphasises an ongoing future process."),
    text("future-continuous", "Complete: ‘At 6 p.m., she ___ home from work.’ (drive)", ["will be driving", "she will be driving", "she'll be driving", "shell be driving"], "Use will be plus the -ing form for an action in progress."),
    text("future-continuous", "Complete the polite question: ‘___ with us this evening?’ (you / eat)", ["will you be eating"], "The full question is Will you be eating with us this evening?"),
    text("future-continuous", "Complete: ‘They ___ the lab between two and four.’ (use)", ["will be using", "they will be using", "they'll be using", "theyll be using"], "The activity occupies a future period."),
    reading("future-continuous", "Tomorrow at the studio", "The production team starts at seven tomorrow. At eight, Lara will be checking the lights while Ben records the opening scene. Between nine and ten, the editors will be preparing a preview for the client.", "What will Lara be doing at eight?", ["She will be checking the lights.", "She checks the client.", "She will record yesterday.", "She is going checked."], 0, "The text states that her activity will be in progress at eight."),
    reading("future-continuous", "Tomorrow at the studio", "The production team starts at seven tomorrow. At eight, Lara will be checking the lights while Ben records the opening scene. Between nine and ten, the editors will be preparing a preview for the client.", "Which activity will be in progress between nine and ten?", ["The lights will open.", "The editors will be preparing a preview.", "Ben prepares yesterday.", "The client will preparing."], 1, "The editors’ work fills that future period."),
    reading("future-continuous", "Tomorrow at the studio", "The production team starts at seven tomorrow. At eight, Lara will be checking the lights while Ben records the opening scene. Between nine and ten, the editors will be preparing a preview for the client.", "Which question politely checks Ben’s plan?", ["Will Ben be recording at eight?", "Does Ben be record at eight?", "Will Ben recording at eight?", "Ben will be record?"], 0, "Will + subject + be + -ing forms the future-continuous question."),
  ],
  "time-clauses": [
    mc("time-clauses", "I’ll message you when I ___ home.", ["will get", "get", "will getting", "got tomorrow"], 1, "Use the present simple after when for future time."),
    mc("time-clauses", "We won’t start until everyone ___.", ["will arrive", "arrives", "will arriving", "arrive yesterday"], 1, "Until takes a present form in a future time clause."),
    mc("time-clauses", "As soon as the results ___ available, we’ll contact you.", ["will be", "are", "will being", "were tomorrow"], 1, "Use the present simple after as soon as."),
    mc("time-clauses", "I’ll take a break after I ___ this section.", ["finish", "will finish", "will finishing", "finished tomorrow"], 0, "After introduces a future time clause with a present form."),
    mc("time-clauses", "Which sentence is correct?", ["I’ll call before I will leave.", "I’ll call before I leave.", "I call tomorrow before I will leave.", "I’ll calling before I leave."], 1, "Do not normally use will after before in a future time clause."),
    mc("time-clauses", "Take notes while the lecturer ___.", ["will speak", "is speaking", "will speaking", "spoke tomorrow"], 1, "Present continuous is possible for an activity in progress after while."),
    mc("time-clauses", "Once the manager ___ the plan, we’ll begin.", ["approves", "will approve", "will approving", "approve yesterday"], 0, "Once takes the present simple for a future event."),
    mc("time-clauses", "I’ll wait here until the bus ___.", ["will come", "comes", "will coming", "came tomorrow"], 1, "The future meaning does not require will after until."),
    text("time-clauses", "Complete: ‘I’ll let you know as soon as I ___ the answer.’ (find)", ["find", "i find"], "Use present simple after as soon as."),
    text("time-clauses", "Complete: ‘Before she ___, she’ll check the address.’ (leave)", ["leaves", "she leaves"], "The time clause uses present simple."),
    text("time-clauses", "Correct the time clause: ‘We’ll eat when Dad will arrive.’", ["we'll eat when dad arrives", "we will eat when dad arrives", "when dad arrives", "dad arrives"], "Replace will arrive with arrives in the time clause."),
    reading("time-clauses", "The field trip", "Our coach leaves at six tomorrow. We’ll check every student’s name before the coach departs. Once everyone is on board, the guide will explain the route. Please remain seated until the driver opens the doors at the museum.", "What happens before the coach departs?", ["The guide will open the museum.", "The teachers will check the students’ names.", "Everyone will go home.", "The driver will explain grammar."], 1, "The first time relationship is stated directly in the text."),
    reading("time-clauses", "The field trip", "Our coach leaves at six tomorrow. We’ll check every student’s name before the coach departs. Once everyone is on board, the guide will explain the route. Please remain seated until the driver opens the doors at the museum.", "Why does the text use ‘departs’ after before?", ["It describes the past.", "Future time clauses normally use a present form.", "Depart cannot take will.", "The coach leaves every day."], 1, "A present form follows before even though the meaning is future."),
    reading("time-clauses", "The field trip", "Our coach leaves at six tomorrow. We’ll check every student’s name before the coach departs. Once everyone is on board, the guide will explain the route. Please remain seated until the driver opens the doors at the museum.", "Complete the rule shown by the last sentence: until + ___.", ["will + verb", "present form", "past perfect", "future continuous only"], 1, "Until introduces a future time clause with a present form."),
  ],
  "articles": [
    mc("articles", "My sister wants to become ___ architect.", ["a", "an", "the", "—"], 1, "Architect begins with a vowel sound, so use an."),
    mc("articles", "I saw a documentary. ___ documentary was about space.", ["A", "An", "The", "—"], 2, "The noun is specific because it has already been mentioned."),
    mc("articles", "___ technology can improve people’s lives.", ["A", "An", "The", "—"], 3, "Technology is uncountable and used as a general concept."),
    mc("articles", "She plays ___ cello in the city orchestra.", ["a", "an", "the", "—"], 2, "Musical instruments normally take the in this expression."),
    mc("articles", "They crossed ___ Pacific by boat.", ["a", "an", "the", "—"], 2, "Names of oceans take the."),
    mc("articles", "We usually have ___ lunch at one.", ["a", "an", "the", "—"], 3, "Meals normally take no article when mentioned generally."),
    mc("articles", "This is ___ most useful guide I’ve found.", ["a", "an", "the", "—"], 2, "Superlatives normally take the."),
    mc("articles", "It took me ___ hour to finish.", ["a", "an", "the", "—"], 1, "Hour begins with a vowel sound because h is silent."),
    text("articles", "Complete with an article or a dash: ‘She studies at ___ university in Leeds.’", ["a"], "University begins with the consonant sound /j/."),
    text("articles", "Complete with an article or a dash: ‘___ information in this email is confidential.’", ["the"], "The phrase identifies specific information in this email."),
    text("articles", "Complete with an article or a dash: ‘He speaks ___ Spanish at work.’", ["—", "-", "no article", "zero article"], "Languages normally take no article."),
    reading("articles", "A day at the museum", "Leo works at a science museum near the river. The museum has an exhibition about space travel and a small café. At lunchtime, Leo usually eats in the café before helping visitors in the exhibition hall.", "Why does ‘the museum’ take the?", ["Every building takes the.", "The museum has already been identified.", "Museum is uncountable.", "It begins with a vowel."], 1, "The text has identified a particular museum where Leo works."),
    reading("articles", "A day at the museum", "Leo works at a science museum near the river. The museum has an exhibition about space travel and a small café. At lunchtime, Leo usually eats in the café before helping visitors in the exhibition hall.", "Which phrase introduces something for the first time?", ["the river", "the museum", "an exhibition", "the exhibition hall"], 2, "An exhibition introduces one previously unidentified singular countable thing."),
    reading("articles", "A day at the museum", "Leo works at a science museum near the river. The museum has an exhibition about space travel and a small café. At lunchtime, Leo usually eats in the café before helping visitors in the exhibition hall.", "Which sentence uses the normal article pattern for a meal?", ["Leo eats the lunchtime.", "Leo has a lunch every day.", "Leo eats lunch at the café.", "Leo eats an lunch."], 2, "The name of a meal normally takes no article."),
  ],
  "determiners": [
    mc("determiners", "Could you pass me ___ book over there?", ["this", "these", "that", "those"], 2, "That refers to one thing at a distance."),
    mc("determiners", "___ keys here belong to me.", ["This", "That", "These", "Those one"], 2, "These refers to plural things near the speaker."),
    mc("determiners", "This laptop belongs to me. It is ___.", ["my", "mine", "me", "myself"], 1, "Mine is a possessive pronoun and replaces the noun phrase."),
    mc("determiners", "___ jacket is this?", ["Who", "Who’s", "Whose", "Which of"], 2, "Whose asks about ownership."),
    mc("determiners", "___ route should we take, the red one or the blue one?", ["What", "Which", "Whose", "Who"], 1, "Which is used for a limited, known set of choices."),
    mc("determiners", "I like ___ idea you mentioned earlier.", ["that", "those", "these one", "mine"], 0, "That can refer back to a singular idea at a contextual distance."),
    mc("determiners", "Their office is larger than ___.", ["our", "ours", "us", "ours office"], 1, "Ours replaces our office."),
    mc("determiners", "___ subjects interest you most?", ["What", "Whose", "Who’s", "Mine"], 0, "What asks an open question rather than choosing from a stated set."),
    text("determiners", "Complete: ‘This seat is not yours; it is ___.’ (belonging to me)", ["mine"], "Mine is the independent possessive pronoun."),
    text("determiners", "Complete: ‘___ documents on my desk are urgent.’ (near, plural)", ["these"], "These refers to plural nouns near the speaker."),
    text("determiners", "Complete the ownership question: ‘___ phone is ringing?’", ["whose"], "Whose asks who owns something."),
    reading("determiners", "Choosing a workspace", "Nora is comparing two desks. This desk beside the window is hers, but that desk near the door belongs to Kai. Both have comfortable chairs. Nora asks, ‘Which desk has the better light?’", "What does ‘this desk’ refer to?", ["The desk near Nora and the window", "Both desks", "Kai’s chair", "A desk in another building"], 0, "This signals singular proximity."),
    reading("determiners", "Choosing a workspace", "Nora is comparing two desks. This desk beside the window is hers, but that desk near the door belongs to Kai. Both have comfortable chairs. Nora asks, ‘Which desk has the better light?’", "Which word shows that the window desk belongs to Nora?", ["this", "hers", "that", "which"], 1, "Hers is the possessive pronoun replacing Nora’s desk."),
    reading("determiners", "Choosing a workspace", "Nora is comparing two desks. This desk beside the window is hers, but that desk near the door belongs to Kai. Both have comfortable chairs. Nora asks, ‘Which desk has the better light?’", "Why does Nora use which?", ["She asks about ownership.", "She is choosing from two known desks.", "She does not know what a desk is.", "She refers to a distant plural noun."], 1, "Which is appropriate for a limited, identified choice."),
  ],
  "distributives": [
    mc("distributives", "___ participant needs an identification card.", ["Every", "All", "Both", "Many of"], 0, "Every takes a singular noun and singular verb."),
    mc("distributives", "___ of the two routes is acceptable; choose one.", ["Both", "Either", "All", "Every"], 1, "Either means one or the other of two."),
    mc("distributives", "___ of my parents speaks Japanese.", ["Both", "Either", "All", "Neither"], 3, "Neither means not one and not the other."),
    mc("distributives", "___ student has a separate locker.", ["Each", "Both", "All of", "Many"], 0, "Each focuses on members individually and takes a singular noun."),
    mc("distributives", "___ answers are correct.", ["Both", "Either", "Neither", "Every"], 0, "Both includes two things and takes a plural noun and verb."),
    mc("distributives", "We invited five colleagues, and ___ of them replied.", ["every", "all", "either", "neither"], 1, "All of them refers to the complete group of five."),
    mc("distributives", "You may sit on ___ side of the table.", ["either", "both", "every of", "all"], 0, "Either side means one side or the other."),
    mc("distributives", "___ option works, so we need a new plan.", ["Both", "Either", "Neither", "All"], 2, "Neither with a singular noun means that both options fail."),
    text("distributives", "Complete: ‘___ of the twins has a bicycle; they share one car instead.’", ["neither"], "Neither of the twins means not one and not the other."),
    text("distributives", "Complete: ‘___ books are useful, so take the two of them.’", ["both"], "Both includes the complete pair."),
    text("distributives", "Correct the sentence: ‘Every students have a ticket.’", ["every student has a ticket", "every student has a ticket."], "Every takes a singular noun and singular verb."),
    reading("distributives", "Two project proposals", "The committee received two proposals. Both proposals include a training programme, but neither proposal includes a complete budget. Either team may submit a revised version. Each team has one week to make changes.", "What is true of the training programme?", ["Neither proposal has one.", "Both proposals include one.", "Only one proposal includes one.", "Every budget includes one."], 1, "Both includes the two proposals together."),
    reading("distributives", "Two project proposals", "The committee received two proposals. Both proposals include a training programme, but neither proposal includes a complete budget. Either team may submit a revised version. Each team has one week to make changes.", "What does neither proposal mean?", ["The first proposal only", "Not one proposal and not the other", "Both proposals together", "Any proposal in a large group"], 1, "Neither refers negatively to the two alternatives."),
    reading("distributives", "Two project proposals", "The committee received two proposals. Both proposals include a training programme, but neither proposal includes a complete budget. Either team may submit a revised version. Each team has one week to make changes.", "Why is ‘has’ singular after each team?", ["Team is always plural.", "Each takes a singular noun and verb.", "The sentence is in the past.", "Either requires a plural verb."], 1, "Each team is grammatically singular."),
  ],
  "quantifiers": [
    mc("quantifiers", "How ___ emails did you receive?", ["much", "many", "little", "a little"], 1, "Emails is a plural countable noun."),
    mc("quantifiers", "We don’t have ___ information yet.", ["many", "much", "a few", "several"], 1, "Information is uncountable."),
    mc("quantifiers", "I made ___ useful contacts at the conference.", ["a little", "a few", "much", "little"], 1, "Contacts is countable plural, and a few gives a positive small quantity."),
    mc("quantifiers", "There is ___ time left, so we can review one more example.", ["a little", "a few", "many", "few"], 0, "Time is uncountable, and a little means some useful amount."),
    mc("quantifiers", "There are too ___ cars on this road.", ["much", "many", "little", "a little"], 1, "Cars is plural and countable."),
    mc("quantifiers", "The machine produces too ___ noise.", ["many", "much", "few", "several"], 1, "Noise is uncountable."),
    mc("quantifiers", "Do we have ___ chairs for everyone?", ["enough", "many of", "little", "few of"], 0, "Enough expresses a sufficient quantity."),
    mc("quantifiers", "___ students understood the instruction, so the teacher explained it again.", ["A few", "Few", "A little", "Much"], 1, "Few presents the number as insufficient."),
    text("quantifiers", "Complete: ‘We have ___ milk for two cups of coffee.’ (a small but sufficient amount)", ["a little"], "A little is used positively with an uncountable noun."),
    text("quantifiers", "Complete: ‘There are ___ mistakes to correct.’ (a small but useful number)", ["a few"], "A few is used positively with plural countable nouns."),
    text("quantifiers", "Complete: ‘The room is not large ___.’", ["enough"], "Enough follows an adjective: large enough."),
    reading("quantifiers", "Preparing a workshop", "We have enough chairs for the workshop, but there are very few spare tables. We also have a little coffee and plenty of water. Unfortunately, there isn’t much time before the participants arrive.", "Which resource is sufficient for the participants?", ["Chairs", "Spare tables", "Time", "Coffee for a large crowd"], 0, "Enough chairs explicitly expresses sufficiency."),
    reading("quantifiers", "Preparing a workshop", "We have enough chairs for the workshop, but there are very few spare tables. We also have a little coffee and plenty of water. Unfortunately, there isn’t much time before the participants arrive.", "What does ‘very few spare tables’ suggest?", ["A large number", "Possibly not enough", "An uncountable quantity", "Exactly two"], 1, "Few without a presents the small number as insufficient or problematic."),
    reading("quantifiers", "Preparing a workshop", "We have enough chairs for the workshop, but there are very few spare tables. We also have a little coffee and plenty of water. Unfortunately, there isn’t much time before the participants arrive.", "Why is much used with time?", ["Time is plural.", "Time is uncountable here.", "Much always follows there.", "The sentence is affirmative."], 1, "Time is treated as an uncountable noun."),
  ]
};

Object.entries(banks).forEach(([topic, items]) => items.forEach((item, index) => {
  exercises.push({ ...item, id: `${topic}-${String(index + 1).padStart(2, "0")}`, quickTest: [0, 1, 2, 3, 8, 9, 11, 12].includes(index), finalTest: [1, 3, 6, 9, 12].includes(index) });
}));

window.GrammarLabData = { topics, exercises };
