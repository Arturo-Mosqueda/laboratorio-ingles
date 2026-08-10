(() => {
  "use strict";

  const university = window.EnglishUniversityData;
  if (!university) return;

  const scenarios = [
    { level: "b1-plus", id: "software-update", domain: "Software", term: "update", meaning: "a new version that fixes or improves software", collocation: "install an update", sequence: ["save open work", "install the update", "restart and verify the application"], risk: "unsaved work may be lost", safeguard: "save files and confirm that a backup exists", precise: "The update fixes the login error and requires one restart." },
    { level: "b1-plus", id: "temperature-sensor", domain: "Sensors", term: "sensor", meaning: "a device that detects or measures a physical condition", collocation: "calibrate a sensor", sequence: ["place the sensor beside a reference instrument", "compare both readings", "adjust and record the offset"], risk: "an inaccurate reading may trigger the wrong action", safeguard: "compare the sensor with a known reference", precise: "The sensor measures room temperature every ten seconds." },
    { level: "b1-plus", id: "battery-pack", domain: "Energy", term: "capacity", meaning: "the amount of energy a battery can store", collocation: "battery capacity", sequence: ["inspect the battery", "connect the approved charger", "monitor the charge indicator"], risk: "the battery may overheat during charging", safeguard: "use the approved charger and stop if the case becomes hot", precise: "The battery provides four hours of operation under normal load." },
    { level: "b1-plus", id: "simple-circuit", domain: "Electronics", term: "circuit", meaning: "a complete path through which electric current can flow", collocation: "complete a circuit", sequence: ["disconnect the power", "connect the components", "restore power and test the output"], risk: "a wrong connection may damage a component", safeguard: "check the diagram before restoring power", precise: "Closing the switch completes the circuit and turns on the lamp." },
    { level: "b1-plus", id: "web-form", domain: "Web systems", term: "validation", meaning: "a check that information has the required form", collocation: "input validation", sequence: ["enter the required data", "validate each field", "submit the accepted record"], risk: "invalid data may enter the system", safeguard: "show a specific message beside the incorrect field", precise: "The form rejects dates written in an unsupported format." },
    { level: "b1-plus", id: "robot-arm", domain: "Robotics", term: "range of motion", meaning: "the complete area through which a joint or mechanism can move", collocation: "limit the range of motion", sequence: ["clear the work area", "run the arm at low speed", "confirm each end position"], risk: "the arm may strike an object or person", safeguard: "use a safety boundary and test at low speed", precise: "The arm rotates ninety degrees and stops at the programmed limit." },
    { level: "b1-plus", id: "printer", domain: "Manufacturing", term: "layer", meaning: "one thin level of material placed above another", collocation: "print a layer", sequence: ["load the model", "check the first layer", "continue the print and inspect the result"], risk: "poor first-layer contact may ruin the part", safeguard: "pause and inspect the first layer before continuing", precise: "The printer builds the part in thin layers from the base upward." },
    { level: "b1-plus", id: "satellite-signal", domain: "Space systems", term: "signal", meaning: "information carried by radio, light or another changing quantity", collocation: "receive a signal", sequence: ["point the antenna", "identify the signal", "decode and record the data"], risk: "interference may make the message unclear", safeguard: "confirm the signal pattern before decoding the data", precise: "The ground antenna receives one status message every minute." },

    { level: "b2", id: "api-limit", domain: "Programming", term: "rate limit", meaning: "a restriction on how many requests a service accepts in a period", collocation: "exceed a rate limit", sequence: ["read the service limit", "queue and space the requests", "monitor rejected responses"], risk: "a burst of requests may be rejected", safeguard: "use a queue with controlled retries", precise: "The client sends no more than sixty requests per minute and retries after the stated delay." },
    { level: "b2", id: "database-backup", domain: "Data systems", term: "restore point", meaning: "a saved state to which data can be returned", collocation: "create a restore point", sequence: ["create the backup", "test it in an isolated environment", "record the verified restore time"], risk: "a backup may exist but fail when needed", safeguard: "perform a scheduled restoration test", precise: "The verified backup can restore the customer database within thirty minutes." },
    { level: "b2", id: "solar-inverter", domain: "Renewable energy", term: "conversion efficiency", meaning: "the proportion of input energy delivered in the required output form", collocation: "measure conversion efficiency", sequence: ["measure direct-current input", "measure alternating-current output", "compare the readings under the same load"], risk: "heat may reduce output and component life", safeguard: "monitor temperature and maintain clear ventilation", precise: "The inverter converts direct current to alternating current at ninety-six per cent efficiency." },
    { level: "b2", id: "tolerance", domain: "Engineering design", term: "tolerance", meaning: "the permitted variation from a specified dimension or value", collocation: "within tolerance", sequence: ["measure the part", "compare it with the permitted range", "accept or isolate the part"], risk: "stacked variations may prevent assembly", safeguard: "analyse combined tolerances before production", precise: "The shaft diameter must remain within plus or minus 0.05 millimetres." },
    { level: "b2", id: "regression-test", domain: "Software quality", term: "regression", meaning: "a new fault in behaviour that previously worked", collocation: "run a regression test", sequence: ["identify affected behaviour", "run the existing test suite", "investigate and document any failure"], risk: "a local fix may break another feature", safeguard: "rerun automated tests for related behaviour", precise: "The regression test confirms that password reset still works after the login change." },
    { level: "b2", id: "telemetry", domain: "Aerospace", term: "telemetry", meaning: "measurements transmitted automatically from a remote system", collocation: "transmit telemetry", sequence: ["sample the measurement", "encode the packet", "transmit and verify its timestamp"], risk: "missing timestamps may place readings in the wrong order", safeguard: "attach a synchronised timestamp to every packet", precise: "The vehicle transmits position, temperature and battery telemetry at two hertz." },
    { level: "b2", id: "model-validation", domain: "Artificial intelligence", term: "validation set", meaning: "data kept separate to evaluate a model during development", collocation: "evaluate on a validation set", sequence: ["separate the data", "train on the training set", "compare performance on unseen validation examples"], risk: "repeated adjustment may overfit the validation data", safeguard: "reserve an independent final test set", precise: "The team selects the threshold on validation data and reports final performance on an untouched test set." },
    { level: "b2", id: "network-redundancy", domain: "Networks", term: "redundancy", meaning: "an additional component or path that can take over after a failure", collocation: "build in redundancy", sequence: ["configure the secondary path", "simulate loss of the primary path", "confirm traffic transfers and returns safely"], risk: "a single link failure may stop the service", safeguard: "provide and regularly test an independent secondary path", precise: "Traffic switches to the secondary link if the primary connection fails." },

    { level: "b2-plus", id: "thermal-management", domain: "Aerospace engineering", term: "thermal margin", meaning: "the difference between an expected temperature and the permitted limit", collocation: "maintain thermal margin", sequence: ["estimate the heat load", "model heat transfer", "test the design at the limiting condition"], risk: "a component may exceed its qualified temperature", safeguard: "include margin and verify it in a thermal-vacuum test", precise: "The revised radiator maintains an eight-degree margin at the worst predicted hot case." },
    { level: "b2-plus", id: "autonomous-navigation", domain: "Robotics", term: "sensor fusion", meaning: "the combination of several measurements to estimate one state", collocation: "apply sensor fusion", sequence: ["align and timestamp measurements", "estimate the vehicle state", "compare the estimate with independent ground truth"], risk: "correlated sensor errors may create false confidence", safeguard: "model shared error sources and monitor disagreement", precise: "The estimator combines camera, inertial and wheel data while tracking uncertainty." },
    { level: "b2-plus", id: "bias-audit", domain: "Responsible AI", term: "disparate impact", meaning: "a substantially different outcome for groups even without explicit unequal treatment", collocation: "measure disparate impact", sequence: ["define the decision outcome", "compare relevant groups", "investigate causes and operational consequences"], risk: "an aggregate score may hide harm to one group", safeguard: "report disaggregated performance with uncertainty and context", precise: "The audit compares false-negative rates across groups and examines whether the difference changes access to interviews." },
    { level: "b2-plus", id: "fault-tolerance", domain: "Systems engineering", term: "graceful degradation", meaning: "continued limited operation after part of a system fails", collocation: "design for graceful degradation", sequence: ["identify critical functions", "isolate a failed component", "preserve the safest useful mode"], risk: "one failure may disable every function", safeguard: "separate critical paths and define a verified safe mode", precise: "After one sensor fails, the controller enters a reduced-performance mode instead of shutting down without warning." },
    { level: "b2-plus", id: "conjunction", domain: "Space operations", term: "conjunction", meaning: "a predicted close approach between objects in space", collocation: "assess a conjunction", sequence: ["receive the tracking update", "estimate collision probability and uncertainty", "coordinate and approve any manoeuvre"], risk: "late or uncertain data may produce an unnecessary or delayed manoeuvre", safeguard: "use updated tracking data and a documented decision threshold", precise: "The operations team will reassess the conjunction after the next tracking update before committing fuel." },
    { level: "b2-plus", id: "control-stability", domain: "Control engineering", term: "stability margin", meaning: "a measure of how far a feedback system is from unstable behaviour", collocation: "increase the stability margin", sequence: ["derive the response model", "analyse gain and phase margins", "test controlled disturbances on the real system"], risk: "delay in feedback may amplify oscillation", safeguard: "limit controller gain and verify response across expected delay", precise: "The controller settles within two seconds without sustained oscillation across the tested load range." },
    { level: "b2-plus", id: "data-provenance", domain: "Data engineering", term: "provenance", meaning: "a record of where data came from and how it changed", collocation: "preserve data provenance", sequence: ["identify the source", "record every transformation", "link the result to its versioned inputs"], risk: "a result may be impossible to reproduce or audit", safeguard: "store versioned sources, transformations and ownership metadata", precise: "Each published metric links to the source snapshot, transformation code and validation record." },
    { level: "b2-plus", id: "key-rotation", domain: "Cybersecurity", term: "key rotation", meaning: "the scheduled replacement of cryptographic keys", collocation: "perform key rotation", sequence: ["issue the new key", "migrate active services", "revoke the old key after verification"], risk: "revoking too early may interrupt a service", safeguard: "verify migration and retain a controlled rollback window", precise: "The service rotates signing keys every ninety days without accepting an expired key after the overlap period." },

    { level: "c1", id: "probabilistic-risk", domain: "Risk engineering", term: "uncertainty propagation", meaning: "the calculation of how uncertain inputs affect the range of an output", collocation: "propagate uncertainty", sequence: ["characterise input distributions", "run the risk model", "test sensitivity and report the output range"], risk: "a single point estimate may hide a severe but plausible outcome", safeguard: "report distributions, assumptions and sensitivity rather than one number", precise: "The median loss is modest, but the upper tail remains decision-relevant under two correlated failures." },
    { level: "c1", id: "distributed-consensus", domain: "Distributed computing", term: "consensus", meaning: "agreement among independent nodes about a shared system state", collocation: "reach consensus", sequence: ["propose a state change", "collect the required acknowledgements", "commit only after the protocol threshold is met"], risk: "a network partition may create conflicting histories", safeguard: "prefer consistency or availability explicitly and test partition behaviour", precise: "During a partition, the service rejects writes that cannot obtain a quorum, preserving one authoritative history." },
    { level: "c1", id: "model-drift", domain: "AI governance", term: "model drift", meaning: "a decline or change in performance as real conditions move away from development data", collocation: "monitor model drift", sequence: ["define operational indicators", "compare live and reference distributions", "investigate impact before retraining or rollback"], risk: "automatic retraining may reproduce a new harmful pattern", safeguard: "require impact review, versioned approval and rollback evidence", precise: "A distribution shift triggers investigation; it does not authorise deployment of a retrained model by itself." },
    { level: "c1", id: "certification", domain: "Aerospace assurance", term: "traceability", meaning: "a documented link from a requirement to design, evidence and verification", collocation: "maintain requirements traceability", sequence: ["baseline the requirement", "link design and verification evidence", "review every change for affected assurance claims"], risk: "an undocumented change may invalidate earlier evidence", safeguard: "maintain bidirectional traceability and formal change control", precise: "The safety requirement traces to the monitoring design, fault-injection test and reviewed acceptance result." },
    { level: "c1", id: "digital-twin", domain: "Advanced manufacturing", term: "digital twin", meaning: "a maintained computational representation linked to a particular physical system", collocation: "update a digital twin", sequence: ["synchronise measured state", "compare prediction with operation", "revise the model only after discrepancy analysis"], risk: "an outdated model may appear precise while misrepresenting the asset", safeguard: "track model validity, calibration date and operating envelope", precise: "The twin predicts bearing temperature only within the loads for which the model has been validated." },
    { level: "c1", id: "human-oversight", domain: "Human-centred automation", term: "meaningful oversight", meaning: "human review with enough information, authority and time to change an automated outcome", collocation: "provide meaningful oversight", sequence: ["present the recommendation and reasons", "allow a reviewer to inspect relevant evidence", "record an informed confirmation or override"], risk: "a nominal reviewer may simply approve every automated decision", safeguard: "give reviewers authority, usable explanations and monitored decision time", precise: "The reviewer can inspect the decisive evidence, request clarification and override the recommendation without penalty." },
    { level: "c1", id: "lifecycle-emissions", domain: "Climate technology", term: "lifecycle assessment", meaning: "evaluation of impacts across extraction, production, use and end-of-life stages", collocation: "conduct a lifecycle assessment", sequence: ["define the system boundary", "quantify inputs and impacts", "test how assumptions change the comparison"], risk: "a narrow boundary may shift rather than reduce environmental harm", safeguard: "publish boundaries, allocation choices and sensitivity cases", precise: "The lower operational emissions do not offset production impacts until the unit completes the stated service life." },
    { level: "c1", id: "stress-test", domain: "Financial systems", term: "stress test", meaning: "an evaluation of resilience under severe but plausible conditions", collocation: "run a stress test", sequence: ["define a coherent adverse scenario", "apply it across exposures", "evaluate capital, liquidity and second-order effects"], risk: "independent shocks may understate interactions during a crisis", safeguard: "model correlated shocks and feedback between liquidity and prices", precise: "The portfolio remains liquid in the baseline but breaches its buffer when rates and withdrawals rise together." }
  ];

  const moduleByLevel = {
    "b1-plus": "b1-vocabulary",
    b2: "b2-writing",
    "b2-plus": "b2p-technical",
    c1: "c1-speaking"
  };
  const levelCodes = { "b1-plus": "B1+", b2: "B2", "b2-plus": "B2+", c1: "C1" };
  const audiences = {
    "b1-plus": "a curious classmate",
    b2: "a project teammate outside your speciality",
    "b2-plus": "a manager making a technical decision",
    c1: "a mixed panel of specialists and decision-makers"
  };
  const timers = { "b1-plus": 60, b2: 90, "b2-plus": 120, c1: 180 };

  const rotateCorrect = (correct, distractors, position) => {
    const options = [correct, ...distractors.slice(0, 3)];
    const answer = position % options.length;
    if (answer) [options[0], options[answer]] = [options[answer], options[0]];
    return { options, answer };
  };

  const addQuiz = (scenario, suffix, taskType, instruction, prompt, correct, distractors, explanation, position) => {
    const choice = rotateCorrect(correct, distractors, position);
    university.activities.push({
      id: `technical-${scenario.level}-${scenario.id}-${suffix}`,
      level: scenario.level,
      skill: "technical-english",
      moduleId: moduleByLevel[scenario.level],
      mode: "quiz",
      type: "choice",
      taskType,
      instruction,
      prompt,
      options: choice.options,
      answer: choice.answer,
      explanation,
      topic: "skill-technical-english"
    });
  };

  const byLevel = Object.groupBy ? Object.groupBy(scenarios, (item) => item.level) : scenarios.reduce((groups, item) => {
    (groups[item.level] ||= []).push(item);
    return groups;
  }, {});

  Object.entries(byLevel).forEach(([level, levelScenarios]) => {
    levelScenarios.forEach((scenario, index) => {
      const alternatives = [1, 2, 3].map((offset) => levelScenarios[(index + offset) % levelScenarios.length]);
      addQuiz(scenario, "meaning", "Technical meaning in context", "Choose the technical term that matches the operational definition.", scenario.meaning, scenario.term, alternatives.map((item) => item.term), `${scenario.term} means ${scenario.meaning}. A natural combination is “${scenario.collocation}”.`, index);
      addQuiz(scenario, "sequence", "Process sequence", "Choose the next defensible step in the process.", `After “${scenario.sequence[0]}”, what should happen next?`, scenario.sequence[1], [scenario.sequence[2], alternatives[0].sequence[1], "publish the final result without checking it"], `The sequence is: ${scenario.sequence.join(" → ")}.`, index + 1);
      addQuiz(scenario, "risk", "Risk and safeguard", "Choose the safeguard that most directly addresses the stated risk.", `Risk: ${scenario.risk}. Which action addresses it most directly?`, scenario.safeguard, [alternatives[0].safeguard, alternatives[1].safeguard, "ignore the risk until a failure occurs"], `The safeguard is specific to the mechanism of harm: ${scenario.safeguard}.`, index + 2);
      addQuiz(scenario, "precision", "Audience-aware precision", "Choose the sentence that is precise enough for a technical briefing.", `Which sentence communicates the ${scenario.domain.toLowerCase()} point most precisely?`, scenario.precise, ["The system is very good and normally works fine.", "Something changes somewhere in the process.", "The technology should solve the problem without further evidence."], `The accepted sentence names an observable behaviour, condition, quantity or limitation: ${scenario.precise}`, index + 3);

      university.activities.push({
        id: `technical-${scenario.level}-${scenario.id}-briefing`,
        level,
        skill: "technical-english",
        moduleId: moduleByLevel[level],
        mode: "challenge",
        taskType: "Technical explanation and response",
        title: `${levelCodes[level]} technical briefing · ${scenario.domain}`,
        prompt: `Explain ${scenario.term} to ${audiences[level]}. Connect the definition to a process, state the main risk, justify one safeguard and answer a follow-up about evidence or limitations.`,
        preparation: [
          `Define ${scenario.term} without circular language or translation.`,
          `Map the process: ${scenario.sequence.join(" → ")}.`,
          `Separate the risk (“${scenario.risk}”) from the safeguard.`,
          "Choose one quantity, condition or test that would make the explanation verifiable."
        ],
        checklist: ["Purpose stated", "Term defined", "Process sequenced", "Risk mechanism explained", "Safeguard justified", "Evidence or limit stated", "Audience-aware register", "Follow-up answered"],
        modelAnswer: `A clear briefing would first define ${scenario.term} as ${scenario.meaning}. In this system, the process moves from ${scenario.sequence[0]} to ${scenario.sequence[1]} and then to ${scenario.sequence[2]}. The main concern is that ${scenario.risk}. The proposed safeguard is to ${scenario.safeguard}, because it intervenes before that failure can affect the result. For a non-specialist audience, the explanation should preserve the operational condition rather than replace it with vague reassurance. One precise sentence is: “${scenario.precise}” The final answer should also state what evidence would confirm that claim and where the explanation no longer applies.`,
        modelCommentary: "The model connects definition, sequence, risk, safeguard, evidence and limitation. It adapts density for the audience without removing the decision-relevant technical relationship.",
        voicePrompt: `Act as ${audiences[level]} during a technical discussion. Ask me to explain ${scenario.term}, the process, the risk and the safeguard. Do not accept unexplained jargon or vague claims. Ask one realistic challenge about evidence, failure or limitation, wait for my complete response, then give feedback on precision, organisation, register and intelligibility.`,
        timerSeconds: timers[level],
        topic: "skill-technical-english"
      });
    });
  });

  university.technicalScenarios = scenarios;
})();
