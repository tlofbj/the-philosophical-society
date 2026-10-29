/**
 * Everything the site shows lives here. To add a meeting, append an object to
 * EVENTS — the timeline sorts itself by date. Events without a date are treated
 * as "upcoming" and placed at the end.
 *
 * poster:    either { image: 'assets/posters/<file>', alt } for a real poster
 *            (add fit: 'contain' and bg for art that isn't 3:4), or
 *            { template: '<design id>' } for one of the built-in designs in
 *            js/posters/designs.js.
 * bulletins: announcements as they ran in the ʻIolani bulletin, oldest first.
 *            An optional note labels each one (e.g. "Rescheduled").
 * figures:   big numbers shown in the detail view, as [value, label] pairs.
 * media:     images from the meeting itself (slides, diagrams), with alt and caption.
 * quoteBy:   who said the quote, if it isn't the Society's own.
 * tilt:      resting rotation of the card on the wall, in degrees.
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
  /* ——— 2024–25 ——— */
  {
    id: 'inaugural-assembly',
    kind: 'Inaugural Assembly',
    title: 'The Trolley Problem',
    question: 'Should individual interests ever be sacrificed for the common good?',
    date: '2025-01-22',
    time: 'Meeting Period, 10:50–11:40',
    place: 'Room W310, Dr. Stephens’ classroom',
    people: [['President', 'Tata Li'], ['Vice President', 'Sophia Duan'], ['Secretary', 'Qingqing Chen']],
    attendance: 19,
    summary: [
      'The Society’s first meeting. With the House not yet convened, the Secretariat chose moral philosophy as the way in: a live simulation of the Trolley Problem, a presentation on utilitarianism and deontology, and an extended debate on how far a government may reach into private life to stop terrorism.',
      'The poster asked two more questions: what is moral philosophy, and how justified are natural rights?',
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
    bulletins: [
      { text: 'PHILOSOPHIC SOCIETY: Join ʻIolani’s newest Philosophic Society’s Inaugural Meeting Wednesday January 22. Discuss the Trolley Problem, understand utilitarianism, and explore its moral implications: What would justify giving a person the death penalty? We’ll meet during Meeting Period at Dr. Stephens’ classroom W-310. We hope to see you there! (Questions? Email Tata Li at tl2701@iolani.org)' },
    ],
    links: [
      { label: 'Absurd Trolley Problems', href: 'https://neal.fun/absurd-trolley-problems/' },
      { label: 'Meeting slides', href: 'https://docs.google.com/presentation/u/0/d/1cKbYMd2-k2kGg29oQl6vQzG1Ye49v_qnoEWo3IiF_wE/edit' },
    ],
    poster: { image: 'assets/posters/trolley.jpg', alt: 'Inaugural Meeting poster: Wednesday Jan. 22, Meeting Period at W310. Consider the Trolley Problem: should individual interests ever be sacrificed for the common good? What is moral philosophy and how justified are natural rights?' },
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
    bulletins: [
      { text: 'PHILOSOPHIC SOCIETY: What makes a perfect society? The central topic for our March event will entail liberalism, socialism, meritocracy, and anarchy in efforts to answer this question. Bring your lunch and join us in our interactive debate at W310, Meeting/Lunch period (12:05), on Friday March 7! (Questions? Email tl2701@iolani.org)' },
    ],
    poster: { image: 'assets/posters/ideal-society.jpg', alt: 'Poster: We meet again. Friday Mar 7, 2025, 12:05 at W310. Central question: what makes a perfect society? Points of argument: liberalism, socialism, meritocracy, anarchy.' },
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
    bulletins: [
      {
        note: 'The Philosophe',
        text: 'PHILOSOPHIC SOCIETY: Raiders, don’t scroll away! Starting now, we are accepting student essays to be published in our Journal “The Philosophe!” If you ever wrote an argumentative essay on anything — maybe why pineapples belong on the pizza, or something more serious, why the death penalty should be reinstated — send a draft over to our Secretary-General Tata Li (TL2701@iolani.org)! Your essay, when approved, will show up on our very new and very good-looking website (https://sites.google.com/view/phiso/journal). At Philosophic Society, never believe what you have to say is unimportant!',
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
    bulletins: [
      { text: 'PHILOSOPHIC SOCIETY: Does ignorance justify moral failures? Join us on Friday 5/16 at W310 for our Fourth Assembly. Agenda and readings can be found here: https://sites.google.com/view/phiso/events/fourth-assembly.' },
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
    kind: 'End of Year Assembly',
    title: 'Assembly of Italian Delicacy',
    question: 'How do we make this club better?',
    date: '2025-05-28',
    time: 'Meeting/Lunch, 11:30–12:30',
    place: 'Room W310',
    people: [['President', 'Tata Li'], ['Vice President', 'Sophia Duan']],
    attendance: 18,
    summary: [
      'Pizza, celebration and reflections to close the Society’s first school year, then a debate on how it should govern itself: who counts as a member, whom the Standing Committee represents, who structures the meetings, and how new members join the Secretariat.',
    ],
    sections: [
      {
        heading: 'Agenda',
        items: [
          'Pizza: one each of pepperoni, margherita, veggie and supreme',
          'Discussion on club policy: the scope of membership, the Standing Committee, who structures meetings, and how new members join the Secretariat',
          'Secretariat positions open to application',
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
    bulletins: [
      { text: 'PHILOSOPHIC SOCIETY: As a new club dedicated to promote free thinking, we are thrilled to see our club membership INCREASE EVERY MEETING! Thank you for your support. In return, we would like to invite you all, member and first-timer, to our End of Year “Assembly of Italian Delicacy” on Wed 5/28 during Meeting/Lunch Period at W310. We will debate next year’s club policies and open Secretariat positions to application. Questions? Email Tata Li.' },
    ],
    poster: { template: 'pizza' },
    tilt: 3.5,
  },

  /* ——— 2025–26 ——— */
  {
    id: 'knowledge-existence',
    kind: 'Theme Exploration',
    title: 'Knowledge & Existence',
    date: '2025-09-30',
    time: 'Lunch',
    place: 'Room I-204, Dr. Stephens’ new classroom',
    summary: [
      'The first meeting of the 2025–26 school year, in a new room. The Society went over how the club runs, then dove straight into the month’s theme: Knowledge & Existence.',
    ],
    bulletins: [
      { text: 'PHILOSOPHIC SOCIETY: Join ʻIolani’s most open platform for philosophic discussion and debate TODAY during lunch at Dr. Stephens’ new classroom at I204! We’ll go over how we run this club and dive right into this month’s theme: “Knowledge & Existence”. Questions? Email Tata at tl2701@iolani.org.' },
    ],
    poster: { template: 'knowledge', where: 'Lunch · I-204' },
    tilt: -2,
  },
  {
    id: 'historical-wrongdoings',
    kind: 'Discussion',
    title: 'Historical Wrongdoings',
    question: 'Should we compensate for the historical wrongdoings of our nation or ancestors?',
    date: '2025-10-28',
    summary: [
      'The second meeting of the year started with a brainstorm on what counts as a historical wrongdoing, from slavery and the annexation of Hawaiʻi to Nazi Germany and colonial atrocities, then worked through two sources on reparations and a case on affirmative action.',
    ],
    sections: [
      {
        heading: 'Questions',
        items: [
          'Does any person or group of people have a right to reparations?',
          'Does the right to reparation die with the victim, or can it persist across generations?',
          'Does the moral obligation to give reparations extend beyond those who directly caused harm?',
          'Who bears the duty to pay reparations: individuals, beneficiaries, or nations?',
          'Can groups bear moral responsibility even if individual members are innocent?',
        ],
      },
    ],
    links: [
      { label: 'Coleman Hughes, “Statement Against Slavery Reparations”', href: 'https://www.americanrhetoric.com/speeches/slaveryreparationscolemanhughes.htm', note: 'Opening statement to the U.S. House Committee on the Judiciary, June 19, 2019' },
      { label: 'Vox, “Affirmative action, explained”', href: 'https://www.youtube.com/watch?v=HuUDhfKV3bk', note: 'Video. The additional case: SFFA v. Harvard (2023)' },
      { label: 'Human Rights Watch, “Q&A: Reparations for Historical and Ongoing Colonial Atrocities”', href: 'https://www.hrw.org/news/2025/09/04/qa-reparations-for-historical-and-ongoing-colonial-atrocities', note: 'September 4, 2025' },
      { label: 'John Rawls, “An Egalitarian Theory of Justice”', href: 'https://usdglobal.wordpress.com/wp-content/uploads/2015/05/02-an-egalitarian-theory-of-justice-by-rawls.pdf', note: 'Philosophical text, PDF' },
      { label: 'Janna Thompson, “Collective Responsibility for Historic Injustice”', href: 'https://drive.google.com/file/d/1jSMi1LAoAC7YYgxWveWAs9dtNlQQ3UUN/view?usp=sharing', note: 'Philosophical text, PDF' },
      { label: 'Pamphlet: excerpts from the Human Rights Watch Q&A', href: 'assets/docs/historical-wrongdoings-pamphlet.pdf', note: 'PDF, 2 pages' },
      { label: 'Meeting slides', href: 'assets/docs/historical-wrongdoings-slides.pdf', note: 'PDF, 8 slides' },
    ],
    poster: { template: 'wrongdoings' },
    tilt: 2.5,
  },
  {
    id: 'unabomber-manifesto',
    kind: 'Reading Seminar',
    title: 'The Unabomber Manifesto',
    question: 'Should we resist technological progress to preserve human nature?',
    date: '2025-11-12',
    time: 'Meeting Period',
    place: 'Room I-203',
    people: [['Readings prepared by', 'Peter Huang']],
    summary: [
      'A read-and-discuss seminar on Industrial Society and Its Future (1995) by Ted Kaczynski. Despite its author’s condemnable violence, its diagnosis of modern society remains thought-provoking, and its themes of technology, progress and human autonomy have only grown more relevant with the rise of artificial intelligence.',
      'The Society does not endorse the ideas or actions in the text, and condemns all terrorism and political violence. The text was read only to discuss and critique it.',
    ],
    sections: [
      {
        heading: 'Excerpts read',
        items: [
          'Introduction (¶1): the Industrial Revolution and its consequences',
          'Sources of social problems (¶48, ¶51): crowding, and the breakdown of small-scale communities',
          'Oversocialization (¶25–26)',
          'How some people adjust (¶84): surrogate activities',
          'Restriction of freedom is unavoidable in industrial society (¶115, ¶119)',
          'The power process (¶33–34): goal, effort, attainment and autonomy',
        ],
      },
    ],
    links: [
      { label: 'Pamphlet: selected excerpts', href: 'assets/docs/unabomber-pamphlet.pdf', note: 'PDF, 4 pages' },
      { label: 'Industrial Society and Its Future, full text (The Washington Post, 1995)', href: 'https://www.washingtonpost.com/wp-srv/national/longterm/unabomber/manifesto.text.htm' },
    ],
    poster: { image: 'assets/posters/unabomber.jpg', alt: 'Reading Seminar poster: Should we resist technological progress to preserve human nature? Read and discuss the Unabomber Manifesto. Wed Nov 12, 2025, Meeting Period at I-203.' },
    tilt: 4,
  },
  {
    id: 'free-will-1',
    kind: 'Discussion',
    title: 'Free Will, Part I',
    question: 'Do we have free will?',
    date: '2025-12-03',
    time: 'Meeting Period',
    place: 'Room I-203',
    summary: [
      'What is free will? Are your decisions really shaped by you alone? And does recognizing our free will compel us to be fully responsible for our actions? The discussion ran into strong arguments against libertarian free will, and left the room questioning whether the conscious mind has any influence over what we do.',
    ],
    bulletins: [
      { text: 'PHILOSOPHIC SOCIETY: This Wednesday, meeting period at I-203, we’ll talk about free will. What is free will? Are your decisions really shaped by you alone? Does recognizing our free will compel us to be fully responsible for our actions? RETURNERS AND NEW MEMBERS, get ready for some great philosophical discussions.' },
    ],
    poster: { template: 'free-will', part: 1, where: 'Meeting · I-203' },
    tilt: -3,
  },
  {
    id: 'free-will-2',
    kind: 'Discussion',
    title: 'Free Will, Part II',
    question: 'If our choices are determined, are we still morally responsible?',
    date: '2025-12-10',
    time: 'Lunch',
    place: 'Room I-203 or I-204',
    summary: [
      'Part I ended in a nihilistic position. Part II asked what follows for society: does determinism excuse us from moral responsibility, and should we believe in free will anyway? Spinoza, one of the greatest philosophers and a hard determinist, was put on the stand, with compatibilism as the alternative.',
    ],
    quote: 'Men are deceived because they think themselves free… and the sole reason for thinking so is that they are conscious of their own actions, and ignorant of the causes by which those actions are determined.',
    quoteBy: 'Baruch Spinoza',
    sections: [
      {
        heading: 'Review',
        items: [
          'Libertarian free will: individuals are the ultimate source of their decisions; given the same circumstances, a person could have chosen otherwise. Defending it means showing a mechanism by which thoughts arise independent of any prior cause (“free”), and originate in nothing but the self (“will”).',
          'Hard determinism: however vividly we feel free, we are not. Genuine free will would put us outside the physical world, which is fundamentally mechanical. Defending it rests on the assumption that every natural event is caused.',
          'Compatibilism, or soft determinism: free will can exist in a determined world, if it means independence from external influence rather than the ability to act otherwise. Defending it means showing how any influence at all can count as internal.',
        ],
      },
    ],
    links: [
      { label: 'Jerry Coyne (University of Chicago), “Does determinism eliminate morality?”', href: 'https://www.youtube.com/watch?v=1jCfAeD8iWE', note: 'Video, 4:14' },
      { label: 'Sprouts, “The Milgram Experiment: Obedience to Authority”', href: 'https://www.youtube.com/watch?v=vuMt8b4UrcI', note: 'Video, 5:46' },
      { label: 'Prindle Institute for Ethics, “Determinism and Punishment”', href: 'https://www.prindleinstitute.org/2019/08/determinism-and-punishment/', note: '4-minute read' },
      { label: 'Melonballer Nick, “Rejection of Free Will Is Flawed and Baseless”', href: 'https://www.youtube.com/watch?v=MvVkLlwBhB0', note: 'Video, 21:35' },
    ],
    bulletins: [
      { text: 'PHILOSOPHIC SOCIETY: Two weeks ago, we confronted strong opinions against (libertarian) free will and found ourselves in a nihilistic position that questions whether our conscious mind has any influence over our actions. But does that excuse us from moral responsibility? And should we believe in free will anyways? Come back this Wednesday during lunch at I-203 or I-204 for Free Will Part 2.' },
    ],
    poster: { template: 'free-will', part: 2, where: 'Lunch · I-203/204' },
    tilt: 1.5,
  },
  {
    id: 'human-rights',
    kind: 'Debate',
    title: 'Human Rights',
    question: 'Are we born with human rights? If not, who gave us these rights?',
    date: '2026-01-28',
    time: 'Lunch',
    place: 'Room I-204',
    summary: [
      'Current challenges to the post-WWII order have forced a reassessment of ideas long taken for granted, among them rights and sovereignty. With the Universal Declaration of Human Rights as the reference point, the Society debated where rights come from. Members could send in their positions beforehand through Raider Opinions.',
      'The meeting also went over the nomination rules for the Society’s inaugural council.',
    ],
    bulletins: [
      { text: 'PHILOSOPHIC SOCIETY: The current challenges to the post-WWII order have forced us to reassess the concepts of rights, sovereignty, and other ideas that we’ve taken for granted. On Wednesday 1/28, Lunch, at I204, the Philosophic Society will debate the question: Are we born with human rights? If not, who gave us those rights? If you already have ideas or an opinion, submit to the Philosophic Society Raider Opinions (https://forms.gle/wvRAyQEP2KqJ8R6X9)! We will also go over our inaugural council nomination rules.' },
    ],
    links: [
      { label: 'The Universal Declaration of Human Rights (1948)', href: 'https://www.un.org/en/about-us/universal-declaration-of-human-rights' },
      { label: '“The Evolution of Universality in the Drafting of the UDHR”', href: 'https://digitalcommons.du.edu/cgi/viewcontent.cgi?article=1012&context=hrhw', note: '4 pages' },
      { label: '“The Universal Declaration and the Distortion of Human Rights”', href: 'https://www.thepublicdiscourse.com/2018/12/47365/', note: 'Public Discourse, web article' },
      { label: 'What human rights mean to an Iranian escapee', href: 'https://www.youtube.com/watch?v=NC5rjBrIgQs', note: 'Video, 4:51' },
      { label: 'A Cambridge professor on Jeremy Bentham and natural rights', href: 'https://www.youtube.com/watch?v=ZAC24MLgzXI', note: 'Video, 4:38' },
    ],
    poster: { template: 'rights', where: 'Lunch · I-204' },
    tilt: -1,
  },
  {
    id: 'after-virtue',
    kind: 'Speaker Series',
    title: 'After Virtue',
    question: 'Is there no ethical common ground in today’s pluralistic society?',
    date: '2026-03-10',
    time: 'Meeting Period',
    place: 'Room I-204',
    people: [['Faculty speaker', 'Mr. David Buchanan'], ['Moderator', 'Arina Shumilova ’27']],
    summary: [
      'The start of a new tradition: inviting ʻIolani’s own faculty and students to speak. Religion teacher Mr. David Buchanan introduced the argument of After Virtue, Alasdair MacIntyre’s landmark book of moral philosophy, and asked whether moral agreement can exist on the philosophical foundations of a morally pluralistic society. The discussion that followed was open to all.',
    ],
    bulletins: [
      { text: 'PHILOSOPHICAL SOCIETY: Today, we kick off our new tradition to invite ʻIolani’s very own members—faculty and students—to speak at our meetings. Joining us at meeting period today, I-204, is religion teacher Mr. David Buchanan on the topic: Can moral agreement exist on the philosophical foundations of today’s morally pluralistic society? Our very own Arina Shumilova ’27 will preside at the meeting. Join us if this is something you’re into. We welcome both students and faculty members.' },
    ],
    sections: [
      { heading: 'Reading', items: ['Alasdair MacIntyre, After Virtue: A Study in Moral Theory (1981)'] },
    ],
    links: [
      { label: 'After Virtue, by Alasdair MacIntyre', href: 'https://www.bu.edu/cpt/resources/book-reviews/after-virtue-by-alasdair-macintyre/', note: 'Book review, Boston University Center for Practical Theology' },
    ],
    poster: { image: 'assets/posters/after-virtue.jpg', alt: 'Poster: Is There No Ethical Common Ground in Today’s Pluralistic Society? Featuring faculty speaker Mr. David Buchanan and moderator Arina Shumilova, on After Virtue. Tuesday Mar 10, Meeting Period, I-204.' },
    tilt: -3,
  },
  {
    id: 'wittgenstein',
    kind: 'Speaker Series',
    title: 'Wittgenstein’s Language Games',
    question: 'If the meaning of a word is socially defined, can we ever speak about an objective reality?',
    date: '2026-05-27',
    time: 'Meeting/Lunch',
    place: 'Room I-214',
    people: [['Speaker', 'Rev. Morehouse, ʻIolani Chaplain'], ['Moderator', 'Sophia Duan']],
    summary: [
      'The final meeting of 2025–26. Rev. Morehouse introduced one of Ludwig Wittgenstein’s pivotal questions: if the meanings of words are set only by how society uses them, can we ever speak about objective reality, or only approximate it in socially defined language games? And if language can’t describe reality, is philosophical reasoning even possible? No prior knowledge was needed, and there was Raising Cane’s for everyone.',
      'First planned for Tuesday, May 19, the meeting moved to May 27 to avoid a clash with an SAO event.',
    ],
    bulletins: [
      { note: 'First announced', text: 'PHILOSOPHICAL SOCIETY: JOIN US at lunch for our final meeting of the year on TUESDAY, MAY 19 in I-204. We’ll be having Canes and Rev. Morehouse will introduce philosophical titan Wittgenstein’s pivotal question: If the meanings of words are determined solely by societal use, can we ever speak about an objective reality, or do we only ever approximate objective reality in socially defined language games? Let’s end this year with a meaningful discussion of philosophy!' },
      { note: 'Rescheduled', text: 'PHILOSOPHICAL SOCIETY: To avoid a clash with the SAO event, we’ve rescheduled our meeting to NEXT WEDNESDAY 5/27 Meeting/Lunch in I-204. We’ll still have Canes, and Chaplain Morehouse will charge us with the question of whether language can really describe objective reality, and therefore, whether philosophical reasoning is even possible. You need no prior knowledge to come; just bring a mind of curiosity. Thank you!' },
    ],
    sections: [
      { heading: 'Reading', items: ['Ludwig Wittgenstein, Philosophical Investigations (1953), where language games are introduced'] },
    ],
    links: [
      { label: '“Ludwig Wittgenstein”, Stanford Encyclopedia of Philosophy', href: 'https://plato.stanford.edu/entries/wittgenstein/' },
    ],
    poster: { image: 'assets/posters/wittgenstein.jpg', alt: 'Poster: If words only mean what we agree they mean, can language ever describe objective reality? Rev. Morehouse on Wittgenstein’s Language Games. Wednesday May 27, Meeting/Lunch at I-214. Philosophic Society Speaker Series.' },
    tilt: -1,
  },

  /* ——— 2026–27 ——— */
  {
    id: 'club-day-2026',
    kind: 'Club Day',
    title: 'What Is on Your Mind?',
    question: 'Bring it to the Philosophical Society.',
    date: '2026-09-02',
    summary: [
      'The Society’s pitch for its third year. From 2026–27 it meets monthly during meeting periods in Weinberg 313, with a new topic every month and new opinions presented.',
    ],
    poster: { image: 'assets/posters/club-day.jpg', alt: 'Club Day poster: What is on your mind? Bring it to the Philosophical Society. Monthly. W-313. New opinions presented.', fit: 'contain', bg: '#121316' },
    tilt: 2,
  },
  {
    id: 'privilege',
    kind: 'September Seminar',
    title: 'Privilege & Obligation',
    question: 'If we are more privileged, are we obligated to help others?',
    date: '2026-09-25',
    place: 'Room W313',
    people: [['With', 'Dr. Stephens']],
    summary: [
      'The first monthly seminar of 2026–27, with Dr. Stephens. Where should we draw the lines between generosity, responsibility and obligation? And beneath that, a harder question: can we actually help those who are less fortunate? Six thinkers were set against each other, from Andrew Carnegie to Audre Lorde.',
    ],
    media: [
      {
        image: 'assets/figures/less-fortunate.png',
        alt: 'Diagram titled “Can we actually help those who are less fortunate?” Orange lines run to Andrew Carnegie (noblesse oblige), Peter Singer (effective altruism) and Jane Addams. Green lines run to William Graham Sumner, Milton Friedman and Audre Lorde. All the lines cross at one point.',
        caption: 'From the meeting: six answers, crossing at one question.',
      },
    ],
    sections: [
      {
        heading: 'On the board',
        items: [
          'Andrew Carnegie: noblesse oblige. In “The Gospel of Wealth” (1889), the rich hold their surplus in trust for the public good.',
          'Peter Singer: effective altruism. If we can prevent suffering without sacrificing anything of comparable moral importance, we ought to.',
          'Jane Addams: co-founded Hull House (1889), the Chicago settlement house where reformers lived among those they served.',
          'William Graham Sumner: What Social Classes Owe to Each Other (1883).',
          'Milton Friedman: the social responsibility of business is to increase its profits (1970).',
          'Audre Lorde: “The Master’s Tools Will Never Dismantle the Master’s House” (1979).',
        ],
      },
    ],
    bulletins: [
      { text: 'IOLANI PHILOSOPHICAL SOCIETY: Come in this Friday 9/25 to W313 for our September seminar with Dr. Stephens: “If we are more privileged, are we obligated to help others?” Where should we draw the lines between generosity, responsibility, and obligation? If you hold an opinion or are just curious to hear what folks are saying, I encourage you to join!' },
    ],
    poster: { template: 'privilege', where: 'W313' },
    tilt: -2.5,
  },
  {
    id: 'next',
    kind: 'Next Seminar',
    title: 'To Be Announced',
    question: 'The next question is yet to be asked.',
    date: null,
    time: 'Meeting Period',
    place: 'Room W313 (Weinberg 313)',
    summary: [
      'The Society meets once a month, with a new topic every time. Membership is open to all: come to a meeting and bring a question worth arguing about.',
    ],
    figures: {
      heading: 'The first two years',
      items: [
        ['45+', 'unique attendees'],
        ['12', 'meetings'],
        ['17', 'attendees per meeting, on average'],
        ['35+', 'came back at least once'],
        ['5', 'teachers in attendance'],
      ],
    },
    links: [
      { label: 'Follow @philosophic.society on Instagram', href: 'https://www.instagram.com/philosophic.society/' },
      { label: 'Write to the Secretariat', href: 'mailto:TL2701@iolani.org' },
    ],
    poster: { template: 'upcoming' },
    tilt: 2,
  },
];
