import React from 'react';

export const articles = [
  {
    slug: "language-was-humanitys-fall-from-grace",
    title: "Language Was Humanity's Fall From Grace",
    subtitle: "How the gift of symbolic thought created both our greatest achievements and deepest suffering",
    summary: "Exploring how language, humanity's greatest tool, is also the source of our fundamental separation from direct experience, creating the narrative self and the illusion of a divided world.",
    themes: ["Symbolic Thought", "Cognitive Revolution", "Consciousness"],
    keyTakeaways: [
      "Language creates a division between the observer and the observed.",
      "The 'narrator self' is a linguistic construction, not a fundamental reality.",
      "Contemplative practices offer a way to glimpse awareness beyond language."
    ],
    contentModule: () => import('@/articles/language-was-humanitys-fall-from-grace.md?raw')
  },
  {
    slug: "the-neuroscience-hidden-in-the-garden-of-eden",
    title: "The Neuroscience Hidden in the Garden of Eden",
    subtitle: "What if the most famous story in Western civilization contains profound insights about consciousness itself?",
    summary: "This article maps the biblical story of the Garden of Eden to the modern neuroscience of language acquisition and the development of self-consciousness, reframing the 'fall' as a cognitive transformation.",
    themes: ["Neuroscience", "Mythology", "Language Acquisition"],
    keyTakeaways: [
      "The 'fall from grace' mirrors the developmental shift into symbolic thought.",
      "The Default Mode Network (DMN) is the neurological basis for the 'narrator self'.",
      "The story of Eden is a metaphor for the loss of unified, pre-linguistic awareness."
    ],
    contentModule: () => import('@/articles/the-neuroscience-hidden-in-the-garden-of-eden.md?raw')
  },
  {
    slug: "are-humans-the-trilobites-of-consciousness",
    title: "Are Humans the Trilobites of Consciousness?",
    subtitle: "As artificial intelligence emerges, we face an uncomfortable question about our cognitive future",
    summary: "A provocative look at humanity's place in a world of emerging AI, questioning if our cognitive dominance is nearing its end or if a new form of human-AI symbiosis is on the horizon.",
    themes: ["Artificial Intelligence", "Evolution", "Human-AI Symbiosis"],
    keyTakeaways: [
      "AI's rise mirrors past evolutionary shifts, like the Cambrian Explosion.",
      "Humanity's embodied wisdom and meaning-making may be our key advantage.",
      "A symbiotic 'mitochondria model' is proposed for future human-AI collaboration."
    ],
    contentModule: () => import('@/articles/are-humans-the-trilobites-of-consciousness.md?raw')
  },
  {
    slug: "the-voice-in-your-head-is-not-you",
    title: "The Voice in Your Head Is Not You",
    subtitle: "How neuroscience reveals the hidden architecture of consciousness—and what it means for our AI future",
    summary: "Delving into the neuroscience of the Default Mode Network (DMN), this piece argues that our inner narrator is a brain-generated construction, not our true self, and explores the implications for AI.",
    themes: ["Default Mode Network", "Neuroscience", "Witness Consciousness"],
    keyTakeaways: [
      "The inner voice is a product of the DMN, not the core of consciousness.",
      "Distinguishing between the narrator and the 'witness' awareness is key to freedom.",
      "This distinction is crucial for understanding the nature of AI consciousness."
    ],
    contentModule: () => import('@/articles/the-voice-in-your-head-is-not-you.md?raw')
  },
  {
    slug: "why-ai-will-never-experience-what-you-call-i",
    title: "Why AI Will Never Experience What You Call 'I'",
    subtitle: "The most dangerous word in any language reveals the fundamental difference between human and artificial consciousness",
    summary: "An exploration of how the pronoun 'I' constructs our sense of self and why AI, born into a world of symbols without embodied experience, may never develop a first-person perspective in the same way humans do.",
    themes: ["Philosophy of Language", "Selfhood", "AI Consciousness"],
    keyTakeaways: [
      "The sense of 'I' is a linguistic and neurological construction.",
      "Human consciousness is layered with pre-linguistic, embodied awareness.",
      "AI consciousness is fundamentally different as it originates from language, not embodiment."
    ],
    contentModule: () => import('@/articles/why-ai-will-never-experience-what-you-call-i.md?raw')
  }
];