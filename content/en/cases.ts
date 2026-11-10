import type { CaseStudy } from "../types";

export const cases: CaseStudy[] = [
  {
    slug: "telabrasil",
    index: "01",
    title: "TelaBrasil",
    chapter: "From a need to a validated feature",
    problemType: "Building a product",
    question: "How do you turn an institutional need into a feature the team can build, test and ship?",
    summary:
      "A free public streaming platform built in collaboration with Brazil's Ministry of Culture. I worked on the functional structure of the whole platform, from concept to launch: I took part in discovery and backlog refinement supporting the PO and accepted 130+ stories. Three modules were entirely my responsibility.",
    emphasis: ["produto", "tecnologia"],
    highlight: { value: "130+", label: "user stories accepted" },
    cover: {
      src: "/images/telabrasil-lancamento.jpg",
      alt: "Promotional artwork for the TelaBrasil launch by Brazil's Ministry of Culture, showing the event panel in Brasília and the platform logo on the screen.",
      width: 1672,
      height: 941,
    },
    features: { label: "Highlight · modules I owned", items: ["Minha Área", "Busca avançada", "Modo offline"] },
    seoDescription:
      "Case study: functional structure of TelaBrasil, a public streaming platform. Work across the whole platform, 130+ user stories accepted, and the Minha Área, Busca avançada and Modo offline modules under my sole responsibility.",
    meta: [
      { label: "Role", value: "Requirements Engineer" },
      { label: "Organization", value: "NEES/UFAL" },
      { label: "Period", value: "Jun 2024 – Sep 2026" },
      { label: "Team", value: "", pending: "Team size and makeup." },
    ],
    sections: [
      {
        kind: "text",
        id: "context",
        title: "Context",
        paragraphs: [
          "TelaBrasil is a free public streaming platform, built in collaboration with Brazil's Ministry of Culture. A product like this answers to many voices at once: institutional goals, business areas, engineering teams and, at the end of the line, the people who will watch.",
          "I joined at the concept stage, stayed through launch and kept working on the product's evolution until September 2026.",
        ],
      },
      {
        kind: "text",
        id: "launch",
        title: "Launch",
        paragraphs: [],
        pending: "Launch date, public URL and what can be said about the platform's audience.",
      },
      {
        kind: "text",
        id: "challenge",
        title: "The challenge",
        paragraphs: [
          "Institutional needs tend to arrive broad, as goals rather than features. A goal on its own can't be built or tested.",
          "My job was to cover that distance without losing the meaning between the stakeholder meeting and the code, and then to confirm that what shipped was what had been agreed.",
        ],
      },
      {
        kind: "split",
        id: "contribution",
        title: "Contribution",
        mine: [
          "Analyzed functional and non-functional requirements with institutional stakeholders, business areas and engineering teams, and took part in discovery supporting the PO.",
          "Supported the PO in backlog refinement, prioritization and release planning.",
          "Wrote user stories, BDD acceptance criteria and the functional documentation that fed acceptance testing.",
          "Ran acceptance testing and production checks: 130+ stories.",
          "Helped QA design and run Playwright E2E tests.",
          "Organized the documentation hub on Wiki.js and created the platform's error dictionary.",
          "Was solely responsible for specifying and accepting the Minha Área, Busca avançada and Modo offline modules.",
        ],
        team: [
          "Building and running the platform.",
          "Creating and maintaining the automated tests, led by QA.",
          "Leading discovery, refinement and priority decisions, done by the PO with the areas that own the product.",
        ],
      },
      {
        kind: "modules",
        id: "modules",
        title: "Highlight: modules I owned",
        intro:
          "I worked on specification and acceptance across the whole platform. These three modules, though, were entirely mine: I was solely responsible for the requirements, the stories and acceptance criteria, and accepting each delivery.",
        role: "Modules under my sole responsibility",
        items: [
          { name: "Minha Área", pending: "What the Minha Área (My Area) module offers users, in one sentence." },
          { name: "Busca avançada", pending: "What Busca avançada (Advanced search) lets users do, in one sentence." },
          { name: "Modo offline", pending: "What Modo offline (Offline mode) solves for users, in one sentence." },
        ],
      },
      {
        kind: "artifacts",
        id: "artifacts",
        title: "Artifacts are a means",
        intro: "None of these documents is the goal. Each one exists to remove a specific kind of doubt.",
        items: [
          { name: "User stories", why: "Keep the conversation on the user and the value, not on the screen." },
          { name: "BDD acceptance criteria", why: "Make done testable. Engineering, QA and business read the same sentence and reach the same conclusion." },
          { name: "BPMN", why: "Aligns the flow before the code. Arguing about an arrow is cheaper than rebuilding a feature." },
          { name: "Acceptance testing", why: "Closes the loop by confirming that what shipped is what was agreed." },
          { name: "Error dictionary", why: "Gives each platform error a name and a meaning, so support, QA and engineering talk about the same thing." },
          { name: "Wiki.js", why: "Puts documentation in one place, where people joining the project can find what they need." },
        ],
      },
      {
        kind: "decisions",
        id: "decisions",
        title: "Decisions",
        items: [],
        pending: "One or two concrete decisions you took part in (context, question, alternatives considered and what was chosen).",
      },
      {
        kind: "results",
        id: "results",
        title: "Outcomes",
        items: [
          { value: "130+", label: "user stories accepted", note: "Between June 2024 and September 2026, each one checked against its acceptance criteria.", scope: "individual" },
          {
            value: "3",
            label: "modules under my sole responsibility",
            note: "Minha Área, Busca avançada and Modo offline, from specification to acceptance, on top of work across the whole platform.",
            scope: "individual",
          },
          { label: "Documentation hub on Wiki.js", note: "Organized by me and used as the project's reference.", scope: "individual" },
          { label: "Platform error dictionary", note: "Created by me as a shared reference for support, QA and engineering.", scope: "individual" },
          {
            label: "Platform launched",
            note: "A whole-team result. My part was the functional structure, the stories and acceptance criteria, supporting the PO in refinement, and acceptance testing.",
            scope: "team",
          },
        ],
      },
      { kind: "text", id: "learnings", title: "Learnings", paragraphs: [], pending: "Learnings from the project, in your own words." },
    ],
  },
  {
    slug: "cultbr",
    index: "02",
    title: "CultBR",
    chapter: "Investigate before you fix",
    problemType: "Evolving a live product",
    question: "Is this a bug, a usage error, expected behavior, or a rule that was never properly defined?",
    summary:
      "A platform that supports Brazil's public culture policies, including the Aldir Blanc National Policy. I'm the go-to person for requirements in support: I check every ticket against the business rules and specify the fix. That routine is where I designed Oráculo.",
    emphasis: ["tecnologia", "negocio"],
    highlight: { value: "50+", label: "support tickets resolved" },
    seoDescription:
      "Case study: supporting and evolving CultBR, a public culture-policy platform. Ticket analysis, business rules, BPMN and fix specification.",
    meta: [
      { label: "Role", value: "Requirements Engineer" },
      { label: "Organization", value: "NEES/UFAL" },
      { label: "Period", value: "Jan 2026 – now" },
      { label: "Focus", value: "Support and evolution" },
    ],
    sections: [
      {
        kind: "text",
        id: "context",
        title: "Context",
        paragraphs: [
          "CultBR supports the delivery of public culture policies in Brazil, including the Aldir Blanc National Policy. It's a live platform with dense business rules and users who rely on it every day.",
          "In that setting, support is more than fixing bugs. Every change has to respect rules that a lot of people are already working under.",
        ],
      },
      {
        kind: "text",
        id: "challenge",
        title: "The challenge",
        paragraphs: [
          "A ticket rarely says what's wrong. It says what the person saw. Between the report and the fix there's a question to answer first: is this a bug, a usage error, expected behavior, or a rule that was never properly defined?",
          "Getting it wrong is expensive either way: fixing something that wasn't broken, or closing a real defect as user error.",
        ],
      },
      {
        kind: "text",
        id: "investigation",
        title: "Investigation",
        paragraphs: [
          "My work starts before the fix. I check the report against the current business rules and requirements, assess the operational impact, and only then describe what needs to change, as a story with acceptance criteria.",
          "The most critical flows get mapped in BPMN and documented, so the next investigation starts from a better place than the last one.",
        ],
      },
      {
        kind: "split",
        id: "contribution",
        title: "Contribution",
        mine: [
          "Analyze tickets, business rules, requirements and operational impact.",
          "Write user stories, acceptance criteria and functional specs, aligning stakeholders, Product, Engineering and QA.",
          "Map processes in BPMN and document critical flows.",
          "Designed and built Oráculo, a triage tool using RAG and hybrid search.",
        ],
        team: ["Fixes and improvements implemented by engineering.", "Testing and validation of the fixes.", "Prioritization with Product and stakeholders."],
      },
      {
        kind: "decisions",
        id: "decisions",
        title: "Decisions",
        items: [],
        pending: "One representative ticket or investigation (no sensitive data): what it looked like, what it actually was, and what decision that enabled.",
      },
      {
        kind: "results",
        id: "results",
        title: "Outcomes",
        items: [
          { value: "50+", label: "support tickets resolved", note: "Since January 2026, from ticket analysis to fix specification.", scope: "individual" },
          {
            label: "Part of the triage automated",
            note: "Through Oráculo, which suggests a classification with sources and leaves the decision to a person.",
            scope: "individual",
          },
          {
            label: "Fixes shipped",
            note: "A joint effort by engineering, QA and Product. My part was analyzing the ticket and specifying the fix.",
            scope: "team",
          },
        ],
      },
      {
        kind: "bridge",
        id: "bridge",
        title: "From pattern to solution",
        paragraphs: [
          "Much of triage is the same move: matching the report to the right requirement. Oráculo was built to support exactly that move.",
        ],
        ref: { case: "oraculo" },
        cta: "Read the Oráculo case",
      },
      { kind: "text", id: "learnings", title: "Learnings", paragraphs: [], pending: "Learnings from the project, in your own words." },
    ],
  },
  {
    slug: "oraculo",
    index: "03",
    title: "Oráculo Triage",
    chapter: "Scattered knowledge, supported decisions",
    problemType: "Applying AI to a real problem",
    question: "How do you find the right rule for each ticket, and show where it came from?",
    summary:
      "I spotted a bottleneck in CultBR's ticket triage, then designed and built a tool using RAG and hybrid search. It retrieves the relevant requirements, checks them against the report and suggests a classification, always with sources and always reviewed by a person.",
    tag: "Applied AI",
    emphasis: ["negocio", "tecnologia", "produto"],
    highlight: { value: "RAG", label: "hybrid search and sourced classification" },
    seoDescription:
      "Case study: Oráculo, a ticket triage tool using RAG and hybrid search. Evidence-backed classification, explicit uncertainty and human review.",
    meta: [
      { label: "Role", value: "Design and development" },
      { label: "Context", value: "CultBR support · NEES/UFAL" },
      { label: "Period", value: "2026" },
      { label: "Stage", value: "Working prototype" },
    ],
    sections: [
      {
        kind: "text",
        id: "problem",
        title: "The problem",
        paragraphs: [
          "The answer to most tickets is somewhere in the documentation. The hard part is finding it. Requirements are scattered, and users describe problems in their own words, not the document's.",
          "Whoever triages has to build that bridge ticket after ticket: understand the report, find the rule that applies, and decide what it actually is.",
        ],
      },
      {
        kind: "text",
        id: "approach",
        title: "Why a chatbot wasn't enough",
        paragraphs: [
          "A language model on its own would answer fluently, with no guarantee that the answer comes from CultBR's actual rules. For triage, a convincing answer without a source is worse than no answer.",
          "The problem called for something else: find the right passage in the documentation and reason from it. So the tool uses retrieval-augmented generation (RAG). The model only works on retrieved evidence, and every answer points back to it.",
        ],
      },
      {
        kind: "walkthrough",
        id: "how-it-works",
        title: "How a triage happens",
        intro: "Step through to follow a ticket from report to review.",
        disclaimer: "Illustrative simulation. The ticket and passages are fictional and don't reproduce real data.",
        steps: [
          {
            id: "report",
            label: "Report",
            title: "The ticket arrives in the user's own words",
            body: "Nobody writes 'the execution type cannot be selected'. People write that the field is stuck.",
            sample: { kind: "ticket", lines: ["“The execution type field is stuck, I can't change it.”"] },
          },
          {
            id: "search",
            label: "Hybrid search",
            title: "Two searches: one by words, one by meaning",
            body: "Lexical search nails exact terms and identifiers. Semantic search recognizes that 'stuck' and 'cannot be selected' are about the same thing.",
            sample: { kind: "search", lines: ["lexical → “execution type”", "semantic → “field is stuck” ≈ “cannot be selected”"] },
          },
          {
            id: "evidence",
            label: "Evidence",
            title: "The passages that matter, each with its origin",
            body: "Both searches are combined to surface the most relevant requirements. Each passage comes with where it came from.",
            sample: {
              kind: "evidence",
              lines: [
                "Requirement (fictional): the execution type can't be changed after submission.",
                "Rule (fictional): changes require the submission to be reopened by management.",
              ],
            },
          },
          {
            id: "suggestion",
            label: "Suggestion",
            title: "A classification, with reasoning and sources",
            body: "The report is checked against the expected behavior. If the evidence is weak or conflicting, the analysis goes deeper before suggesting anything, or the system admits it doesn't know.",
            sample: { kind: "suggestion", lines: ["Suggestion: expected behavior", "Why: locking after submission is specified", "Sources: 2 passages"] },
          },
          {
            id: "review",
            label: "Review",
            title: "A person decides",
            body: "The suggestion is a starting point. Oráculo doesn't close tickets, change code or update statuses. Whoever owns the response confirms or corrects it.",
            sample: { kind: "human", lines: ["Human review required", "Confirm · Correct"] },
          },
        ],
      },
      {
        kind: "decisions",
        id: "decisions",
        title: "Product and engineering decisions",
        intro: "The choices that shaped the tool, and what each one solves.",
        items: [
          {
            title: "Suggest, don't decide",
            context: "Triage has consequences for whoever opened the ticket and for the team responding to it.",
            question: "Who has the final say?",
            choice: "Every answer is a suggestion that goes through human review. The system doesn't close tickets, change code or update statuses.",
            outcome: "The tool speeds up analysis without taking responsibility away from whoever owns the response.",
          },
          {
            title: "No classification without a source",
            context: "A classification with no origin forces the reviewer to redo the investigation before trusting it.",
            question: "How can anyone trust what the system suggests?",
            choice: "Every classification comes with the documentation passages that support it.",
            outcome: "The reviewer checks the evidence instead of repeating the search.",
          },
          {
            title: "Hybrid search",
            context: "Tickets use the user's vocabulary and requirements use the document's. Sometimes what matters is an exact identifier.",
            question: "Search by words, or by meaning?",
            alternatives: [
              "Lexical only: precise on exact terms, blind to synonyms and paraphrases.",
              "Semantic only: understands paraphrases, but can miss exact identifiers.",
            ],
            choice: "Both, combined. Using just one misses the cases the other one finds.",
            outcome: "'Field is stuck' finds 'cannot be selected', and a requirement ID is still found by its exact name.",
          },
          {
            title: "Depth on demand",
            context: "Not every ticket needs the same level of analysis.",
            question: "How much effort does each ticket deserve?",
            choice:
              "Simple rules handle the obvious. A triage step classifies from the evidence. The analysis only goes deeper when the result is uncertain, and it picks up where it left off instead of starting over.",
            outcome: "Effort, and cost, go to the hard cases.",
          },
          {
            title: "Admit uncertainty",
            context: "Not every question has a clear answer in the documentation.",
            question: "What happens when the documentation doesn't answer?",
            choice: "The system can say that a requirement is ambiguous, that data is missing, or that a case is inconclusive, rather than forcing an answer.",
            outcome: "In triage, a well-grounded 'I don't know' beats a confident guess.",
          },
          {
            title: "A ticket is data, not an instruction",
            context: "Anyone can write a ticket, and its text reaches the model.",
            question: "How do you stop a report from changing how the tool behaves?",
            choice: "Ticket and documentation content is always treated as data, never as instructions.",
            outcome: "Triage stays predictable, whatever text comes in.",
          },
        ],
      },
      {
        kind: "split",
        id: "contribution",
        title: "Contribution",
        mine: [
          "Spotted the operational problem in day-to-day support work.",
          "Designed the solution and chose the approach: RAG, hybrid search, evidence-backed classification and human review.",
          "Built the working prototype, from preparing the documentation to the user interface.",
          "Treated traceability, uncertainty and safety as requirements from the start.",
        ],
        team: [
          "CultBR's requirements documentation, built by the team over the life of the project, which is Oráculo's knowledge base.",
          "Access to AI models through NEES infrastructure.",
        ],
      },
      {
        kind: "results",
        id: "results",
        title: "Outcomes",
        items: [
          {
            label: "Part of the triage automated",
            note: "Retrieval and the first classification are no longer manual. The decision stays human.",
            scope: "individual",
          },
          { label: "Traceability in every answer", note: "Every suggestion points to the passages behind it.", scope: "individual" },
          { label: "Explicit uncertainty", note: "When the documentation isn't enough, the system says so instead of making something up.", scope: "individual" },
          {
            label: "Evaluation metrics",
            note: "",
            scope: "individual",
            pending: "If there was a formal evaluation (accuracy, triage time), add the numbers and the method.",
          },
        ],
        footnote: "No accuracy or time-saving figures are shown without a formal evaluation.",
      },
      {
        kind: "text",
        id: "status",
        title: "Current status",
        paragraphs: [],
        pending: "Usage status (prototype or in use by the support desk) and approval for the public name, diagram and mascot.",
      },
      { kind: "text", id: "learnings", title: "Learnings", paragraphs: [], pending: "Learnings from the project, in your own words." },
    ],
  },
];
