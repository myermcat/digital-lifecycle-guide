/**
 * The home page's prose.
 *
 * Written here rather than in the route because the French guide is a second build
 * of the same routes: text inside a .tsx is the same text in both languages.
 */
export const HOME = {
  p1: "This is a guide for people who work on digital services for the Government of Canada. You could be anyone: any role, any background, a small team or a large one.",
  p2: "You might build in-house, contract a team to build, or buy from a supplier. Your budget might be generous or almost nothing. None of that changes what follows, because this guide is about the practices that matter for any digital work, at any size.",
  p3: "Take a department with money for a service, no technical staff of its own, and a date somebody else set, because a minister announced it or the legislation names it. Going to a large supplier and paying them to work out most of the detail may genuinely be its best option. That skips almost everything described here, and it can still be the right decision.",
  p4: "So the guide stops short of telling you exactly what to do. The right answer depends on things only you can see: your deadline, your budget, who you have, and what your department is already committed to.",
  p5: "If the new service is replacing something, keep the old one running until the new one has carried real volume for a while and held. It is tempting to switch off early, because running two things is awkward and somebody is usually asking when it will stop. But nothing before launch tests real volume, people need time to move across, and once everyone has moved there is no way back. If the new service then struggles, the department finds itself negotiating changes with a supplier it can no longer walk away from, which is an expensive place to be standing.",
  p6: "The same thing read backwards is a planning problem. If something is going to replace a service you already run, the replacement has to be funded, competed, built and steadied before the old one can be switched off. Counted backwards from the day you would like the old service gone, that is usually years, and for much of it a department pays for both.",
  p7: "Which is why it is worth the effort to understand what you actually want, and what you are buying, well enough to say both plainly. A supplier given a vague description will build something roughly as vague, in much the way a vague prompt to an artificial intelligence tool returns something you did not quite ask for. Neither is anyone behaving badly. It is just what happens when the description was not clear enough to build from.",
  p8: "Some people reading this know exactly what they own. Their department's application register has their name against a system, and once a year somebody asks them to rate its health.",
  p9: "Most do not. They think of themselves as running a program. A grant, a licence, a benefit, an inspection regime. Each of those has a digital solution, and someone is accountable for that solution.",
  p10: "You may never have chosen any of this. It does not matter how you arrived.",
  p11: "If a digital service delivers your program, or one is about to, you are its business owner. You are accountable for it from before it exists until after it is switched off. This guide is for you.",
  p12: "Here is the entire lifecycle on one page: every official approval, review, and sign-off a service passes through, from the first problem to retiring or replacing it, who owns each one, and roughly how long it takes.",
  p13: "Every digital service, whatever it does, runs into the same handful of questions over its life. What problem are we solving, and for whom. Is the solution working for the people who use it. Is it still the right solution. When is it time to let it go. The questions repeat. What changes is where you are in the life of the service when you ask them.",
  p14: "The lifecycle falls into three phases: Create, Live, and Sunset. A phase is a big chapter in the life of a service.",
  p15: "Each phase has smaller parts, called sub-phases. Create has Discovery, Alpha, and Beta. Live has Stabilization, Growth, and Maturity. The phase is like the chapter of a book; the sub-phase is the page you are on within it.",
  p16: "The quickest test is where your feedback comes from. In Create it comes from sketches, prototypes, and conversations about what you might build. In Live it comes from the running system: real users, real data, real bugs. In Sunset you have mostly stopped gathering feedback and started closing things down.",
  p17: "Nadia is a director general. She runs a grants program that funds renewable energy projects. It has existed for years, and it has always been run on spreadsheets, email threads, and a shared drive.",
  p18: "Then the volume of applications doubles. Her team cannot process them fast enough. Applicants cannot find out what is happening to their submission. Auditors cannot easily verify how any decision was made.",
  p19: "Nadia does not think of herself as owning a digital service. She thinks of herself as running an energy program.",
  p20: "Her corporate services team tells her she can buy a grants management system or build one. The project is scored for complexity and risk, and the score comes in under what her department is trusted to approve on its own, and the cost fits within the department's existing operating budget. No Treasury Board submission, and no appearance before the Government of Canada Enterprise Architecture Review Board. Her own director approves the budget.",
  p21: "Her contracting authority runs the competition. It goes out as a request for proposal (RFP) against an existing standing offer, and three suppliers answer. Procurement writes the document, but the requirements inside it come from Nadia's team, and they are sensible ones: applicants need a portal, adjudicators need a queue, finance needs an audit trail, and the system has to produce reports for Parliament.",
  p22: "This is where the lifecycle starts mattering, and nobody told her. Among many other things:",
  p23: "She signs a three-year contract with no exit rights and no data portability.",
  p24: "Nobody thought to ask for them at signature. When the supplier raises the price in year two, she has nothing to push back with.",
  p25: "The system was configured to her current process rather than designed to adapt.",
  p26: "Program rules always change. Hers change. Each change request costs forty thousand dollars.",
  p27: "The accessibility conformance report was for an older version of the product.",
  p28: "The version actually deployed was never reassessed. In year one an employee using a screen reader files a complaint.",
  p29: "She never asked whether anyone else had already solved this problem.",
  p30: "Another department may already run a grants system she could reuse. Nobody looked before the money moved.",
  p31: "Nobody is measuring whether an applicant can finish an application without phoning the help desk. There is no plan for year three, when the contract ends.",
  p32: "Nadia did nothing reckless. She bought a system the way it is normally bought. Every cost in that list was settled in the few weeks before she signed, and paid for over the following three years.",
  p33: "This guide has two settings that change what you see throughout. Pick what fits your situation. You can change your mind later.",
  p34: "This is a first attempt, written in a few months. If somebody picks the work up later, here is what would have been useful to know at the start.",
  p35: "Most existing Government of Canada services were bought rather than built by the department itself, and how you buy changes when things happen. Three examples:",
  p36: "A department that contracts a team.",
  p37: "A department that buys a finished product.",
  p38: "A department following the agile approach Public Services and Procurement Canada sets out.",
  p39: "The competition, the signature and the first real build are the same three events in all three cases. Where they land moves by a whole sub-phase, and the only thing that moved them is how the department chose to buy. That is why this guide describes each sub-phase more loosely than the guides it learned from.",
  p40: "No guide can tell a department how its particular service will go. What it can do is leave the reader harder to surprise. If the next version of this does one thing better, we would like it to be that: fewer people finding out about a decision at the point where it has already been made for them.",

  // "What this guide is": the sentence wrapped around UI.aFewWaysOfBuildingADigitalService.
  whatThisGuideIsLead: "It describes",
  whatThisGuideIsTail: ", not the only correct way, because there is not one.",

  // "What is here for you, whichever way you go": the body after each bolded lead-in.
  hereForYouSecurityBody: "Every service needs them, whether it was built in-house, bought whole, or assembled from something that already existed.",
  hereForYouCheckpointsBody: "The assessments, approvals and authorizations a Government of Canada service has to clear. They will find you whichever route you take, and each one is cheaper to prepare for than to be surprised by.",
  hereForYouPictureBody: "Which decisions arrive in roughly what order, who else has to be involved, and which of them are expensive to reverse later.",

  // "The one thing worth holding on to": the body after UI.itStaysYourService.
  itStaysYourServiceBody: "You can hand the building to a supplier, and much of the time that is the sensible thing to do. What does not transfer with it is the answering for it. When a service does not work, the person who cannot get their application in never hears about the procurement contract behind it, and would not care if they did. They experience it as the Government of Canada failing them, and it is the department that answers for that, publicly and afterwards.",

  // "You might be:" — each line is an article, a bolded role, and the rest of the line.
  roleBusinessOwnerArticle: "a ",
  roleBusinessOwnerLabel: "business owner",
  roleBusinessOwnerRest: "already named against a system in your department's application register",
  roleProgramManagerArticle: "a ",
  roleProgramManagerLabel: "program manager",
  roleProgramManagerRest: "whose process has stopped coping with the volume",
  rolePolicyLeadArticle: "a ",
  rolePolicyLeadLabel: "policy lead",
  // Leading space is deliberate: this one sits directly against the bolded role.
  rolePolicyLeadRest: " who has been told to deliver something by a date",
  roleDirectorGeneralArticle: "a ",
  roleDirectorGeneralLabel: "director general",
  roleDirectorGeneralRest: "who has inherited a system nobody can fully explain",
  roleProjectManagerArticle: "a ",
  roleProjectManagerLabel: "project manager",
  roleProjectManagerRest: "handed a service that is already live",
  roleOtherPositions: "or in any of the other positions people find themselves in when a service becomes their responsibility. The list is not meant to be complete.",

  // The gate-map callout's link.
  seeTheWholePathLinkLabel: "See the whole path →",

  // The sub-phase pills inside the three-phases accordion, and their hover hints.
  subphasesOfCreateIntro: "The three sub-phases of Create:",
  subphasesOfLiveIntro: "The three sub-phases of Live:",
  subphaseDiscoveryHint: "Understand the problem before you commit to a solution.",
  subphaseAlphaHint: "Try things out cheaply before you build the real one.",
  subphaseBetaHint: "Build the first real version that will go live.",
  subphaseStabilizationHint: "Stabilize the service right after it goes live.",
  subphaseGrowthHint: "Add capability as more users arrive.",
  subphaseMaturityHint: "Keep the service healthy over the long term.",

  // The joined-up delivery sentence wrapped around the thread link.
  joinedUpDeliveryLead: "Whichever phase you are in, one idea runs under all of it: a government service is almost never the thing a person actually wants. It is one step in a much bigger journey of theirs, often spread across many departments and levels of government.",
  joinedUpDeliveryTail: "is where that thinking starts.",

  // The worked example.
  nadiaDisclaimer: "Nadia is made up, and so is her program. Any resemblance to real persons or programs is coincidental.",
  nadiaClosingPoint: "The point of this guide is that the next Nadia knows all of it while she can still do something about it.",

  // "Why we could not simply follow the UK and Australia": the sentence around both links.
  twoGuidesLead: "The two guides we looked at most were the",
  twoGuidesAnd: "and",
  twoGuidesTail: ". Both draw firm lines between phases, and both can, because each is written for one situation: a small team of public servants building a service themselves, on shared infrastructure and reusable components their government has already built for that purpose.",

  // The three procurement examples: the body after each bolded lead-in (p36..p38).
  procurementContractsTeamBody: "It runs the competition during Discovery and signs as Alpha begins, because the contracted team is who builds the prototypes.",
  procurementBuysProductBody: "It competes during Alpha and signs as Beta begins, and never builds a prototype at all, because the product already exists.",
  procurementAgileBody: "It competes during Discovery, signs with several suppliers at once as Alpha begins, and each of them builds a prototype under that contract. The winner is chosen by amending their contract rather than by running a second competition.",
} as const;
