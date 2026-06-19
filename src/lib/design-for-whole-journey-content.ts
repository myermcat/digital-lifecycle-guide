import type { SourceItem } from "@/components/SourcesBlock";
import type { PhaseFitCard } from "@/components/WeightedPhaseBlock";
import type { ExternalLinkKey } from "@/lib/external-links";
import { THREADS } from "@/lib/guide-strings";

export const DESIGN_FOR_WHOLE_JOURNEY = {
  title: "Design for the whole journey",

  mostPeopleDoNotWant: {
    id: "most-people-do-not-want",
    title: "Most people do not want to use government services",
    paragraphs: [
      "Most of the time, people do not want to use a government service. What they want is to move to a new country, start a job, raise a child, retire. The service is the thing they have to do to get to what they actually want.",
      "The best service of all is one where the person barely has to do anything, because the parts of government that already hold the information just use it. If the tax agency already knows someone's income, that person should not have to prove it again to another department. That only works when teams and departments step back and work together.",
      'A good service mirrors what the person is trying to do. As Louise Downe, who led design for the UK government, put it: good services are verbs, and bad services are nouns.',
    ],
  },

  seeingTheBiggerPicture: {
    id: "seeing-the-bigger-picture",
    title: "Good service design means seeing the bigger picture",
    paragraphs: [
      "Government touches the big moments of a person's life: being born, moving to Canada, starting a job, moving home, raising a family, retiring. Yet the services for any one of those moments are split into fragments and spread across departments, and across federal, provincial, and municipal government.",
      "That makes it hard for a person to work out what they have to do, and when. They either have to learn how government is organised, or pay someone who already does.",
    ],
  },

  buildingALifeInCanada: {
    id: "building-a-life-in-canada",
    title: "Building a life in Canada, an end-to-end service",
    intro:
      "Take someone moving to Canada for work, call her Amara, a nurse. Her goal is simple: live and work here, with her kids in school. To get there she has to spend time figuring out everything she needs to do, then more time working out which part of government to deal with, then more time again doing each task. And English may not be her first language.",
    amaraJourney:
      "At a minimum, she has to get permission to come, applying for permanent residence (IRCC); if her job requires it, her employer first gets a labour market assessment (ESDC). She lands, and a border officer admits her (CBSA). Before she can be paid she needs a Social Insurance Number (Service Canada). She opens a bank account. She applies for a provincial health card, and in some provinces waits three months for coverage to start (her province). She gets a driver's licence (her province). To work as a nurse she gets her credentials recognised by the provincial regulator. She enrols her kids in school (her province). She files taxes and registers to receive the Canada Child Benefit and the GST credit (CRA). Months later she has to track when her PR card needs renewing, and when she can apply for citizenship (IRCC).",
    afterVisual: [
      "No single office sees Amara's whole journey. Each sees its own form. Amara is the only one who lives the whole thing, and she has to work out the order, the timing, and which office to call. If you research or design only one part of a person's journey, you miss the chance to make the end-to-end service work better. And by better, we mean what actually works for people, even when that is harder than what looks tidy on your own screen.",
      "A well-designed service makes it simpler for people to do what the rules ask, and simpler for government to apply those rules when it needs to.",
    ],
  },

  yourServiceIsOneBox: {
    id: "your-service-is-one-box",
    title: "Your service is one box",
    paragraphs: [
      "The part your team owns, the visa, the health card, the tax account, is one box in a much larger journey. It can be flawless on its own and the journey can still fall apart, if the boxes do not join up.",
      "When you map the whole journey, you see where it breaks between offices, which is where people get lost, scared, or stuck. You spot steps that repeat across services, and parts that could be reused or shared rather than built again. Map the journey first, then design your box to fit it.",
    ],
  },

  whereToGoNext: {
    id: "where-to-go-next",
    title: "Where to go next",
    cards: [
      {
        title: "Joined-up delivery",
        body: "How to work across departments when a journey spans them.",
        linkTo: THREADS["joined-up-delivery"].path,
        linkLabel: "Joined-up delivery thread",
        compact: true,
        weight: "light",
      },
      {
        title: "User research",
        body: "Understanding the whole journey a person takes, including the parts beyond your own service.",
        linkTo: THREADS["user-research"].path,
        linkLabel: "User research thread",
        compact: true,
        weight: "light",
      },
    ] satisfies PhaseFitCard[],
  },

  sources: [
    {
      label: "Inspiration and source",
      linkKey: "uk-home-office-service-design" satisfies ExternalLinkKey,
    },
    {
      label: "Supporting reference",
      linkKey: "digital-standards" satisfies ExternalLinkKey,
    },
    {
      label: "Supporting reference",
      linkKey: "uk-service-manual-whole-problem" satisfies ExternalLinkKey,
    },
  ] satisfies SourceItem[],
} as const;
