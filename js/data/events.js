/**
 * Everything the site shows lives here. To add a meeting, append an object to
 * EVENTS — the timeline sorts itself by date. Events without a date are treated
 * as "upcoming" and placed at the end.
 *
 * poster: either { image: 'assets/posters/<file>', alt } for a real poster, or
 *         { template: '<design id>' } for one of the built-in designs in
 *         js/posters/designs.js.
 * tilt:   resting rotation of the card on the wall, in degrees.
 */

export const SOCIETY = {
  name: 'The Philosophical Society',
  school: 'ʻIolani School',
  founded: 'Late 2024',
  email: 'TL2701@iolani.org',
  instagram: 'https://www.instagram.com/philosophic.society/',
  instagramHandle: '@philosophic.society',
};

export const EVENTS = [
  {
    id: 'inaugural-assembly',
    kind: 'Inaugural Assembly',
    title: 'The Trolley Problem',
    question: 'Should individual interests ever be sacrificed for the common good?',
    date: '2025-01-22',
    time: 'Meeting Period, 10:50–11:40',
    place: 'Room W310',
    people: [['President', 'Tata Li'], ['Vice President', 'Sophia Duan'], ['Secretary', 'Qingqing Chen']],
    attendance: 19,
    summary: [
      'The Society’s first meeting. With the House not yet convened, the Secretariat chose moral philosophy as the way in: a live simulation of the Trolley Problem, a presentation on utilitarianism and deontology, and an extended debate on how far a government may reach into private life to stop terrorism.',
    ],
    quote: 'We are not bound by existing norms. We are not bound by accepted values. We can question the validity of natural rights.',
    sections: [
      {
        heading: 'Agenda',
        items: [
          'Formal introduction: why everything at the Society is temporary, and decided collectively by its members',
          'Trolley Problem game: three scenarios, each put to a vote',
          'Presentation: utilitarianism and deontology',
          'Extended debate: to what extent should a government intervene in private life if it meant stopping terrorism?',
          'Club overview and conclusion',
        ],
      },
      {
        heading: 'Proceedings',
        items: [
          'Scenario 1, one life for five: 8 for, 7 against pulling the lever. The lever was pulled.',
          'Scenario 2, four lives for five: 7 for, 8 against. The lever was not pulled.',
          'Scenario 3, pushing the man from the bridge: 4 for, 11 against. He was not pushed.',
        ],
      },
    ],
    links: [
      { label: 'Absurd Trolley Problems', href: 'https://neal.fun/absurd-trolley-problems/' },
      { label: 'Meeting slides', href: 'https://docs.google.com/presentation/u/0/d/1cKbYMd2-k2kGg29oQl6vQzG1Ye49v_qnoEWo3IiF_wE/edit' },
    ],
    poster: { image: 'assets/posters/trolley.jpg', alt: 'Inaugural Meeting poster: Wednesday Jan. 22, Meeting Period at W310. Consider the Trolley Problem.' },
    tilt: 3,
  },
  {
    id: 'second-assembly',
    kind: 'Second Assembly',
    title: 'The Ideal Society',
    question: 'What makes an ideal society?',
    date: '2025-03-07',
    time: 'Meeting/Lunch, 12:05–12:55',
    place: 'Room W310',
    people: [['President', 'Tata Li'], ['Vice President & Secretary', 'Sophia Duan']],
    attendance: 17,
    summary: [
      'Four groups, four lenses: liberalism, socialism, meritocracy and anarchy. After an introduction to the veil of ignorance, each group drafted a resolution describing the ideal society from its assigned perspective, then defended it on the open floor.',
    ],
    sections: [
      {
        heading: 'Agenda',
        items: [
          'Introduction to the topic and the veil of ignorance (8 min)',
          'Breakout session: each group drafts a resolution from its assigned key idea (10 min)',
          'Open-floor presentations, first-round vote, amendments, final vote and adoption of a resolution (20 min)',
          'Closing and club next steps (5 min)',
        ],
      },
    ],
    poster: { template: 'ideal-society' },
    tilt: -2.5,
  },
  {
    id: 'third-assembly',
    kind: 'Third Assembly',
    title: 'Just War',
    question: 'When is it just to go to war?',
    date: '2025-04-16',
    time: 'Lunch, 12:20–12:55',
    place: 'Room W310',
    people: [['President', 'Tata Li'], ['Vice President & Secretary', 'Sophia Duan']],
    attendance: 17,
    summary: [
      'An introduction to just war theory (jus ad bellum) through Michael Walzer and a run of historical cases, followed by an open debate in which the Assembly voted on the necessary conditions for a just war. The Society also launched its website and opened submissions to its journal, The Philosophe.',
    ],
    sections: [
      {
        heading: 'Agenda',
        items: [
          'Announcements: official website launch; The Philosophe opens to submissions',
          'Introduction to just war theory, with cases from Ukraine (2022), Iraq (2002), the Falklands (1982) and the Arab–Israeli war of 1956',
          'Open debate: when is it just to go to war? (20 min)',
          'Review resolution and vote (5 min)',
        ],
      },
      {
        heading: 'Proceedings',
        items: [
          'Genuine representation of the people is a necessary condition: 11 for, 0 against.',
          'A just cause is a necessary condition: 7 for, 2 against. The dissent held that “just” is vague enough for governments to abuse.',
          'Last resort is a necessary condition: 5 for, 5 against.',
          'Probability of success is a necessary condition: 1 for, 7 against. Moral causes and self-defense were held to come first.',
          'The Assembly voted that further discussion is needed before issuing a public statement.',
        ],
      },
    ],
    links: [
      { label: 'Just War Theory: an overview with Michael Walzer', href: 'https://www.youtube.com/watch?v=LcBovmGZSPU' },
      { label: 'Crash Course: Just War Theory', href: 'https://www.youtube.com/watch?v=VNbpj4rs3Hw' },
    ],
    poster: { template: 'just-war' },
    tilt: 2,
  },
  {
    id: 'fourth-assembly',
    kind: 'Fourth Assembly',
    title: 'Moral Ignorance',
    question: 'Does ignorance justify moral failure?',
    date: '2025-05-16',
    time: 'Lunch, 12:20–12:55',
    place: 'Room W310',
    people: [['President', 'Tata Li'], ['Vice President', 'Sophia Duan']],
    summary: [
      'If you did not know you were doing wrong, are you to blame? The Assembly took up the epistemic condition for moral responsibility, anchored by Gideon Rosen’s Parity Thesis: someone who acts from ignorance is culpable only if they are culpable for the ignorance itself, and that holds for moral ignorance too.',
    ],
    sections: [
      {
        heading: 'Agenda',
        items: [
          'Announcement: End of Year Assembly on Wednesday, May 28',
          'Introduction to the topic',
          'Open debate: does ignorance justify moral failures? (20 min)',
        ],
      },
    ],
    links: [
      { label: '“The Epistemic Condition for Moral Responsibility”, Stanford Encyclopedia of Philosophy (2022)', href: 'https://plato.stanford.edu/archives/win2022/entries/moral-responsibility-epistemic' },
      { label: '“Culpability and Ignorance”, Gideon Rosen (2003)', href: 'http://www.jstor.org/stable/4545386', note: 'The first four pages carry the core argument.' },
    ],
    poster: { template: 'ignorance' },
    tilt: -1.5,
  },
  {
    id: 'fifth-assembly',
    kind: 'Fifth Assembly',
    title: 'End of Year Assembly',
    question: 'Should club policy be decided by an informed democracy?',
    date: '2025-05-28',
    time: 'Lunch/Meeting, 11:30–12:30',
    place: 'Room W310',
    people: [['President', 'Tata Li'], ['Vice President', 'Sophia Duan']],
    attendance: 18,
    summary: [
      'Pizza, celebration and reflections to close the 2024–25 school year, then a debate on how the Society should govern itself: who counts as a member, whom the Standing Committee represents, and who structures the meetings.',
    ],
    sections: [
      {
        heading: 'Agenda',
        items: [
          'Pizza: one each of pepperoni, margherita, veggie and supreme',
          'Discussion on club policy: the scope of membership, the Standing Committee, who structures meetings, and how new members join the Secretariat',
        ],
      },
      {
        heading: 'Resolution',
        items: [
          'From Fall 2025, Assemblies meet every two weeks, on Fridays or E/F schedules.',
          'The Standing Committee directly represents the club’s permanent voting members; any attendee who asks to join is included.',
          'The Standing Committee re-registers at the start of each quarter.',
          'The Standing Committee talks by text under rules it sets for orderly discourse; the wider membership is reached by email.',
        ],
      },
    ],
    poster: { template: 'pizza' },
    tilt: 3.5,
  },
  {
    id: 'unabomber-manifesto',
    kind: 'Reading Seminar',
    title: 'The Unabomber Manifesto',
    question: 'Should we resist technological progress to preserve human nature?',
    date: '2025-11-12',
    time: 'Meeting Period',
    place: 'Room I-203',
    summary: [
      'A read-and-discuss seminar on Industrial Society and Its Future (1995), the manifesto of Theodore Kaczynski, asking whether technological progress should be resisted to preserve human nature.',
    ],
    poster: { image: 'assets/posters/unabomber.jpg', alt: 'Reading Seminar poster: Should we resist technological progress to preserve human nature? Read and discuss the Unabomber Manifesto. Wed Nov 12, 2025, Meeting Period at I-203.' },
    tilt: 4,
  },
  {
    id: 'after-virtue',
    kind: 'Speaker & Discussion',
    title: 'After Virtue',
    question: 'Is there no ethical common ground in today’s pluralistic society?',
    date: '2026-03-10',
    time: 'Meeting Period',
    place: 'Room I-204',
    people: [['Faculty speaker', 'Mr. David Buchanan'], ['Moderator', 'Arina Shumilova']],
    summary: [
      'A faculty speaker introduces the argument; the discussion is open to all. Mr. David Buchanan on After Virtue, Alasdair MacIntyre’s landmark book of moral philosophy.',
    ],
    poster: { image: 'assets/posters/after-virtue.jpg', alt: 'Poster: Is There No Ethical Common Ground in Today’s Pluralistic Society? Featuring faculty speaker Mr. David Buchanan and moderator Arina Shumilova, on After Virtue. Tuesday Mar 10, Meeting Period, I-204.' },
    tilt: -3,
  },
  {
    id: 'wittgenstein',
    kind: 'Speaker & Discussion',
    title: 'Rev. Morehouse on Wittgenstein',
    question: 'If words only mean what we agree they mean, can language ever describe objective reality?',
    date: '2026-05-27',
    time: 'Meeting/Lunch',
    place: 'Room I-214',
    people: [['Speaker', 'Rev. Morehouse']],
    summary: [
      'Rev. Morehouse on Ludwig Wittgenstein, and on whether a language built on agreement can ever describe the world as it is.',
    ],
    poster: { image: 'assets/posters/wittgenstein.jpg', alt: 'Poster: If words only mean what we agree they mean, can language ever describe objective reality? Rev. Morehouse on Wittgenstein. Wednesday May 27, Meeting/Lunch at I-214.' },
    tilt: -1,
  },
  {
    id: 'next',
    kind: 'Next Assembly',
    title: 'To Be Announced',
    question: 'The next question is yet to be asked.',
    date: null,
    place: 'To be announced',
    summary: [
      'Topics are proposed by members and chosen by the Standing Committee. Membership is open to all: come to a meeting and bring a question worth arguing about.',
    ],
    links: [
      { label: 'Follow @philosophic.society on Instagram', href: 'https://www.instagram.com/philosophic.society/' },
      { label: 'Write to the Secretariat', href: 'mailto:TL2701@iolani.org' },
    ],
    poster: { template: 'upcoming' },
    tilt: 2,
  },
];
