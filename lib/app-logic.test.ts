import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidEmail,
  deriveDisplayName,
  createAuthorizedFan,
  mergeAuthorizedFan,
  buildThankYouCards,
  INITIAL_AUTHORIZED_FANS,
} from './auth-store';
import { GTA_SURVEY_QUESTIONS, evaluateSurvey } from './survey-data';

test('email validation accepts real addresses and rejects invalid strings', () => {
  assert.equal(isValidEmail('saman.karimian12@gmail.com'), true);
  assert.equal(isValidEmail('player@vice-city.io'), true);
  assert.equal(isValidEmail(''), false);
  assert.equal(isValidEmail('not-an-email'), false);
  assert.equal(isValidEmail('missing@domain'), false);
});

test('deriveDisplayName uses nickname if provided or formats email handle', () => {
  assert.equal(deriveDisplayName('saman.karimian12@gmail.com', 'Saman Dev'), 'Saman Dev');
  assert.equal(deriveDisplayName('saman.karimian12@gmail.com'), 'Saman Karimian');
  assert.equal(deriveDisplayName('lucia_vice@leonida.fm'), 'Lucia Vice');
});

test('buildThankYouCards returns 5 cards and prioritizes newly authorized user', () => {
  const userFan = createAuthorizedFan('alex.rivera@miami.dev', 'Alex Rivera');
  const pool = mergeAuthorizedFan(INITIAL_AUTHORIZED_FANS, userFan);
  const cards = buildThankYouCards(pool, 3, userFan.displayName);

  assert.equal(cards.length, 5);
  assert.equal(cards[0].fanName, 'Alex Rivera');
  for (const card of cards) {
    assert.ok(card.message.length > 10);
    assert.ok(card.cityTag.length > 0);
  }

  const nextCycleCards = buildThankYouCards(pool, 4);
  assert.equal(nextCycleCards.length, 5);
  assert.notDeepEqual(
    cards.map((c) => c.fanName),
    nextCycleCards.map((c) => c.fanName)
  );
});

test('survey catalog has 10 questions with 4 options each', () => {
  assert.equal(GTA_SURVEY_QUESTIONS.length, 10);
  for (const q of GTA_SURVEY_QUESTIONS) {
    assert.equal(q.options.length, 4);
  }
});

test('evaluateSurvey calculates distinct archetypes based on player answers', () => {
  const storyAnswers: Record<string, number> = {};
  const chaosAnswers: Record<string, number> = {};

  GTA_SURVEY_QUESTIONS.forEach((q) => {
    // Pick highest story option vs highest chaos option
    let bestStoryIdx = 0;
    let bestChaosIdx = 0;
    q.options.forEach((opt, idx) => {
      if (opt.scores.story > q.options[bestStoryIdx].scores.story) bestStoryIdx = idx;
      if (opt.scores.chaos > q.options[bestChaosIdx].scores.chaos) bestChaosIdx = idx;
    });
    storyAnswers[q.id] = bestStoryIdx;
    chaosAnswers[q.id] = bestChaosIdx;
  });

  const storyResult = evaluateSurvey(storyAnswers);
  const chaosResult = evaluateSurvey(chaosAnswers);

  assert.ok(storyResult.matchPercentage >= 72 && storyResult.matchPercentage <= 99);
  assert.equal(storyResult.archetypeTitle, 'Leonida Noir Strategist');
  assert.equal(chaosResult.archetypeTitle, 'Five-Star Highway Outlaw');
});
