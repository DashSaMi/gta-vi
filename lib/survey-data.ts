export type SurveyAxis = 'story' | 'chaos' | 'vibe' | 'immersion';

export interface SurveyOption {
  label: string;
  detail: string;
  scores: Record<SurveyAxis, number>;
}

export interface SurveyQuestion {
  id: string;
  prompt: string;
  category: string;
  options: [SurveyOption, SurveyOption, SurveyOption, SurveyOption];
}

export interface SurveyResult {
  matchPercentage: number;
  archetypeTitle: string;
  archetypeSubtitle: string;
  outlookSummary: string;
  dayOnePlan: string;
  axisScores: {
    story: number;
    chaos: number;
    vibe: number;
    immersion: number;
  };
}

export const GTA_SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 'q1-first-drive',
    category: 'Arrival',
    prompt: 'The intro finishes and you finally have the keys in Vice City. Where are you steering first?',
    options: [
      {
        label: 'Straight down Ocean Drive at twilight',
        detail: 'Soak in the banafsh sunset, neon hotels, and traffic flow',
        scores: { story: 2, chaos: 1, vibe: 5, immersion: 4 },
      },
      {
        label: 'Test the cops on a coastal highway chase',
        detail: 'Push five-star pursuit AI and destruction physics immediately',
        scores: { story: 1, chaos: 5, vibe: 2, immersion: 3 },
      },
      {
        label: 'Follow Lucia and Jason’s opening storyline',
        detail: 'Stay locked into character dialogue and mission craft',
        scores: { story: 5, chaos: 1, vibe: 2, immersion: 4 },
      },
      {
        label: 'Cross the keys into the Grassrivers swamps',
        detail: 'Inspect weather, wildlife, and water reflections at the edge of the map',
        scores: { story: 2, chaos: 2, vibe: 3, immersion: 5 },
      },
    ],
  },
  {
    id: 'q2-protagonists',
    category: 'Characters',
    prompt: 'What excites you most about playing as both Lucia and Jason?',
    options: [
      {
        label: 'The Bonnie-and-Clyde heist tension and trust meter',
        detail: 'Seeing how high-stakes choices reshape their partnership',
        scores: { story: 5, chaos: 2, vibe: 2, immersion: 4 },
      },
      {
        label: 'Instant mid-robbery character switching',
        detail: 'Coordinating flanking angles and getaway driving on the fly',
        scores: { story: 3, chaos: 5, vibe: 1, immersion: 3 },
      },
      {
        label: 'Outfitting both characters for Vice nightlife',
        detail: 'Customizing streetwear, watches, safehouses, and cars',
        scores: { story: 2, chaos: 1, vibe: 5, immersion: 3 },
      },
      {
        label: 'How NPCs remember their reputation across districts',
        detail: 'Living inside an AI ecosystem that reacts to every job',
        scores: { story: 4, chaos: 2, vibe: 3, immersion: 5 },
      },
    ],
  },
  {
    id: 'q3-soundtrack',
    category: 'Radio & Vibe',
    prompt: 'Which radio station stays locked on your dashboard during late-night cruises?',
    options: [
      {
        label: '80s synthwave & neon Miami classics',
        detail: 'Pure Vice City nostalgia bathed in violet streetlamps',
        scores: { story: 2, chaos: 1, vibe: 5, immersion: 3 },
      },
      {
        label: 'Modern Florida hip-hop & bass-heavy club mixes',
        detail: 'High-energy soundtrack for rolling through downtown',
        scores: { story: 2, chaos: 3, vibe: 5, immersion: 2 },
      },
      {
        label: 'Satirical talk radio dissecting Leonida headlines',
        detail: 'Classic Rockstar humor reacting to in-world events',
        scores: { story: 5, chaos: 2, vibe: 3, immersion: 4 },
      },
      {
        label: 'Radio off — just engine rumble and ocean wind',
        detail: 'Pure spatial audio and street acoustics',
        scores: { story: 3, chaos: 2, vibe: 2, immersion: 5 },
      },
    ],
  },
  {
    id: 'q4-physics',
    category: 'Gameplay Feel',
    prompt: 'Which technical leap in the RAGE 9 engine matters most to your playstyle?',
    options: [
      {
        label: 'Realistic vehicle weight, suspension, and tire grip',
        detail: 'Every getaway drift and supercar corner feels earned',
        scores: { story: 1, chaos: 4, vibe: 3, immersion: 5 },
      },
      {
        label: 'Dynamic tropical storms and volumetric lighting',
        detail: 'Rain-slicked asphalt reflecting purple and coral signage',
        scores: { story: 2, chaos: 1, vibe: 5, immersion: 5 },
      },
      {
        label: 'Dense interiors with enterable clubs, malls, and motels',
        detail: 'Seamless transitions from street to indoor shootouts',
        scores: { story: 4, chaos: 4, vibe: 2, immersion: 4 },
      },
      {
        label: 'Expressive facial animation in unscripted moments',
        detail: 'Cinematic storytelling without breaking player control',
        scores: { story: 5, chaos: 1, vibe: 3, immersion: 4 },
      },
    ],
  },
  {
    id: 'q5-heists',
    category: 'Heist Design',
    prompt: 'When planning a multi-stage score in Port Gellhorn, how do you execute it?',
    options: [
      {
        label: 'Quiet recon, fake uniforms, zero alarms triggered',
        detail: 'Clean social engineering and silent exits',
        scores: { story: 5, chaos: 1, vibe: 3, immersion: 4 },
      },
      {
        label: 'Armored truck breach and speedboat extraction',
        detail: 'Loud, cinematic action straight out of a heat thriller',
        scores: { story: 3, chaos: 5, vibe: 3, immersion: 3 },
      },
      {
        label: 'Style first — matching custom rides and crisp getaway timing',
        detail: 'Pulling off the cleanest cinematic escape possible',
        scores: { story: 3, chaos: 3, vibe: 5, immersion: 3 },
      },
      {
        label: 'Improvising when an unexpected NPC or patrol changes the plan',
        detail: 'Embracing emergent sandbox chaos over rigid scripts',
        scores: { story: 2, chaos: 4, vibe: 2, immersion: 5 },
      },
    ],
  },
  {
    id: 'q6-satire',
    category: 'World Tone',
    prompt: 'What balance of crime drama and social satire do you want from GTA VI?',
    options: [
      {
        label: 'Grounded, emotional drama like GTA IV meets Heat',
        detail: 'Consequences that hit hard when loyalties fracture',
        scores: { story: 5, chaos: 1, vibe: 2, immersion: 4 },
      },
      {
        label: 'Sharp parody of viral social media and influencer culture',
        detail: 'Biting, hilarious Leonida feeds and live-streamed chaos',
        scores: { story: 4, chaos: 3, vibe: 4, immersion: 3 },
      },
      {
        label: 'Sun-soaked, larger-than-life Vice City swagger',
        detail: 'Glamour, neon nights, and unapologetic spectacle',
        scores: { story: 2, chaos: 3, vibe: 5, immersion: 3 },
      },
      {
        label: 'Unfiltered roadside weirdness in small towns and marshes',
        detail: 'Strangers & Freaks encounters around every corner',
        scores: { story: 3, chaos: 4, vibe: 3, immersion: 5 },
      },
    ],
  },
  {
    id: 'q7-multiplayer',
    category: 'Online Horizon',
    prompt: 'Once the main campaign credits roll, how do you picture your GTA VI Online life?',
    options: [
      {
        label: 'Running a custom nightclub and car-meet empire with friends',
        detail: 'Building a stylish crew HQ in downtown Vice City',
        scores: { story: 2, chaos: 2, vibe: 5, immersion: 4 },
      },
      {
        label: 'High-stakes PvP turf wars and air-sea smuggling runs',
        detail: 'Competitive mayhem across the Leonida Keys',
        scores: { story: 1, chaos: 5, vibe: 2, immersion: 3 },
      },
      {
        label: 'Co-op story expansions and roleplay servers',
        detail: 'Deep character-driven sessions with persistent crews',
        scores: { story: 5, chaos: 2, vibe: 3, immersion: 5 },
      },
      {
        label: 'Replaying single-player 100% completion instead',
        detail: 'Hunting every secret, Easter egg, and photo spot solo',
        scores: { story: 4, chaos: 1, vibe: 3, immersion: 5 },
      },
    ],
  },
  {
    id: 'q8-exploration',
    category: 'Exploration',
    prompt: 'How do you usually play massive Rockstar open worlds?',
    options: [
      {
        label: 'Walk neighborhoods slowly to admire architecture and signage',
        detail: 'Treating the city like a living architectural photography set',
        scores: { story: 3, chaos: 0, vibe: 5, immersion: 5 },
      },
      {
        label: 'Binge the main missions before spoilers hit the timeline',
        detail: 'Zero distractions until the story finale lands',
        scores: { story: 5, chaos: 2, vibe: 2, immersion: 3 },
      },
      {
        label: 'Collect weird vehicles, stunts, and jump ramps first',
        detail: 'Turning every bridge and marina into a playground',
        scores: { story: 1, chaos: 5, vibe: 4, immersion: 3 },
      },
      {
        label: 'Test every minigame, shop, and side hustle available',
        detail: 'Living a full second life inside Leonida',
        scores: { story: 3, chaos: 2, vibe: 4, immersion: 5 },
      },
    ],
  },
  {
    id: 'q9-favorite-era',
    category: 'Rockstar DNA',
    prompt: 'Which past Rockstar release feels closest to your ideal blueprint for GTA VI?',
    options: [
      {
        label: 'GTA: Vice City (2002) — unmatched atmosphere and style',
        detail: 'Iconic skyline, music, and coastal nightlife mood',
        scores: { story: 3, chaos: 2, vibe: 5, immersion: 3 },
      },
      {
        label: 'Red Dead Redemption 2 — living world & character depth',
        detail: 'Unrivaled realism, pacing, and reactive encounters',
        scores: { story: 5, chaos: 1, vibe: 3, immersion: 5 },
      },
      {
        label: 'GTA: San Andreas — pure scale and sandbox freedom',
        detail: 'Endless activities, multi-region travel, and replayability',
        scores: { story: 3, chaos: 4, vibe: 3, immersion: 4 },
      },
      {
        label: 'GTA V — cinematic heist pacing and triple-threat action',
        detail: 'Blockbuster missions and explosive set pieces',
        scores: { story: 3, chaos: 5, vibe: 3, immersion: 2 },
      },
    ],
  },
  {
    id: 'q10-launch-night',
    category: 'Launch Week',
    prompt: 'It is launch week (November 2026). How long is your opening night session?',
    options: [
      {
        label: 'Midnight launch marathon — straight through sunrise',
        detail: 'Snacks stocked, phone silent, zero sleep until dawn',
        scores: { story: 4, chaos: 4, vibe: 4, immersion: 5 },
      },
      {
        label: 'Two focused cinematic hours with headphones on',
        detail: 'Savoring every frame like a prestige film premiere',
        scores: { story: 5, chaos: 1, vibe: 4, immersion: 5 },
      },
      {
        label: 'Party chat with the squad testing chaos together',
        detail: 'Laughing over clips and stunts on day one',
        scores: { story: 2, chaos: 5, vibe: 4, immersion: 3 },
      },
      {
        label: 'Weekend deep dive after exploring Photo Mode spots',
        detail: 'Capturing Miami sunset shots and custom car builds',
        scores: { story: 2, chaos: 2, vibe: 5, immersion: 4 },
      },
    ],
  },
];

export function evaluateSurvey(answers: Record<string, number>): SurveyResult {
  const totals: Record<SurveyAxis, number> = {
    story: 0,
    chaos: 0,
    vibe: 0,
    immersion: 0,
  };

  let answeredCount = 0;
  for (const question of GTA_SURVEY_QUESTIONS) {
    const pickedIdx = answers[question.id];
    if (typeof pickedIdx === 'number' && pickedIdx >= 0 && pickedIdx < 4) {
      const option = question.options[pickedIdx];
      totals.story += option.scores.story;
      totals.chaos += option.scores.chaos;
      totals.vibe += option.scores.vibe;
      totals.immersion += option.scores.immersion;
      answeredCount++;
    }
  }

  // Normalize each axis to 45–99% range for expressive, readable bar comparisons
  const normalize = (raw: number) => {
    const maxTheoretical = 46;
    const pct = Math.round(48 + (Math.min(raw, maxTheoretical) / maxTheoretical) * 51);
    return Math.min(99, Math.max(42, pct));
  };

  const axisScores = {
    story: normalize(totals.story),
    chaos: normalize(totals.chaos),
    vibe: normalize(totals.vibe),
    immersion: normalize(totals.immersion),
  };

  const dominantEntry = (Object.entries(axisScores) as [SurveyAxis, number][]).sort(
    (a, b) => b[1] - a[1]
  )[0][0];

  const avgScore = Math.round(
    (axisScores.story + axisScores.chaos + axisScores.vibe + axisScores.immersion) / 4
  );
  const matchPercentage = answeredCount === 0 ? 75 : Math.min(99, Math.max(72, avgScore + 8));

  const profiles: Record<
    SurveyAxis,
    { title: string; subtitle: string; summary: string; plan: string }
  > = {
    story: {
      title: 'Leonida Noir Strategist',
      subtitle: 'Story-First Heist Architect',
      summary:
        'You value GTA VI for its character weight, sharp social satire, and tense dual-protagonist storytelling. Expect to fall in love with Lucia and Jason’s evolving chemistry and Rockstar’s most grounded dialogue since Red Dead Redemption 2.',
      plan: 'Play with minimal HUD, keep talk radio on between missions, and explore Port Gellhorn interiors slowly.',
    },
    chaos: {
      title: 'Five-Star Highway Outlaw',
      subtitle: 'High-Octane Sandbox Tactician',
      summary:
        'You thrive on RAGE 9 vehicle physics, reactive police chases, and explosive multi-angle heists. GTA VI’s destructible environments, mid-job character swaps, and coastal boat pursuits were built directly for your playstyle.',
      plan: 'Test the causeway bridges to the Leonida Keys in a muscle car before picking up your first heavy heist rig.',
    },
    vibe: {
      title: 'Ocean Drive Twilight Cruiser',
      subtitle: 'Miami Aesthetic & Culture Curator',
      summary:
        'For you, Vice City is a mood above all else—banafsh sunsets over Art Deco rooftops, synth-soaked boulevards, and custom garage builds. You will spend hours framing twilight drives and soaking in Leonida’s nightlife.',
      plan: 'Wait for sunset along Ocean Beach, tune into classic synth radio, and tour Starfish Island at golden hour.',
    },
    immersion: {
      title: 'Grassrivers World Explorer',
      subtitle: 'Next-Gen Simulation Purist',
      summary:
        'You care deepest about how alive Leonida feels—from volumetric coastal storms and wildlife ecosystems to NPCs that remember every encounter. You will uncover details most players sprint past.',
      plan: 'Take an airboat into the Grassrivers at dusk and follow unscripted Strangers & Freaks events.',
    },
  };

  const profile = profiles[dominantEntry];

  return {
    matchPercentage,
    archetypeTitle: profile.title,
    archetypeSubtitle: profile.subtitle,
    outlookSummary: profile.summary,
    dayOnePlan: profile.plan,
    axisScores,
  };
}
