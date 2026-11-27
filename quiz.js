const types = ['overthinker', 'avoider', 'peacekeeper', 'underprepared'];
const questions = [
  ['You have been meaning to speak to someone on your team about their attitude for two weeks. What is closest to what is actually happening?',
    'I keep going over how it might go wrong and talking myself out of it',
    "I know I need to do it — I just haven't found the right moment",
    'I started to bring it up once but it got awkward and I let it drop',
    "I'm not sure how to open the conversation without it becoming a confrontation"],
  ['When you think about the conversation you need to have, what goes through your mind first?',
    'What if it makes things worse?', "I'll do it next week when things are calmer",
    "I don't want to damage the relationship", "I wouldn't know where to start"],
  ['How long has the situation been going on?',
    "A few weeks — I've been thinking about it since it started",
    'Longer than it should have — I keep putting it off',
    "A while — I've tried to address it but it never quite gets resolved",
    'Recent enough that I want to handle it properly from the start'],
  ['What would it mean to you to get this conversation handled well?',
    "I'd stop lying awake going over it",
    "I'd finally feel like I'd dealt with something I've been carrying",
    "I'd feel like a proper manager — firm but still someone they respect",
    "I'd feel confident doing it again when the next situation comes up"],
  ['What would help you most right now?',
    "Reassurance that I'm reading the situation correctly",
    'Something that gets me off the starting block',
    'A way to stay in the conversation when it gets uncomfortable',
    'A clear structure so I know what to say and in what order']
];
const communityUrl = 'https://www.skool.com/the-people-leaders-room-5009/about';
const privacyUrl = 'https://thepeoplementor.co.uk/privacy-policy/';
const results = {
  overthinker: {
    name: 'The Overthinker',
    headline: 'You prepare so thoroughly that you never quite start.',
    reflection: [
      'You’ve probably had this conversation several times in your head. You’ve thought about what you’ll say if they get defensive, what you’ll do if they get upset and how you’ll respond if they see it completely differently. By Monday, you’ve done a lot of thinking and the person still has no idea anything needs to change.',
      'It makes sense that you want to get it right. But there comes a point when rehearsing every possible reaction leaves you with more to worry about. In the meantime, you’re spending energy working around an issue the other person may not even know is there.',
      'Bring your attention back to what you need them to hear. You can give yourself a clear starting point and make room for whatever they have to say.'
    ],
    action: 'Write down the one thing you need this person to understand by the end of the conversation. If you’ve got a whole page, read it back and ask yourself which sentence matters most. Start there.',
    invitation: 'If it would help to talk through what you’re planning to say, you’re welcome in The People Leaders’ Room. It’s a free, private community for managers, separate from your workplace.'
  },
  avoider: {
    name: 'The Avoider',
    headline: 'You know what needs saying. You keep finding reasons to wait.',
    reflection: [
      'You were going to do it last week, then something urgent came up. This week the team’s stretched and it feels like a poor time to bring it up. Both reasons might be perfectly genuine. The trouble is there’s nearly always something else going on.',
      'Waiting can feel safer because you don’t have to deal with how they might respond today. But while you’re waiting, you might be picking up the work yourself or hoping they’ll notice the problem. They may assume you’re happy with how things are going.',
      'It’s understandable to feel uneasy about what might happen once you’ve said it. Giving the conversation a place in your diary gives you time to prepare for that uncertainty and a point at which to stop postponing it.'
    ],
    action: 'Put a date in your diary within the next ten working days. If you can, invite the other person and tell them briefly what you’d like to discuss. Then use the time you’ve got to think through how you’ll open.',
    invitation: 'If you’d like to talk through what’s making you hesitate, there’s room for that in The People Leaders’ Room. It’s a free, private community for managers, separate from your workplace.'
  },
  peacekeeper: {
    name: 'The Peacekeeper',
    headline: 'You raise it, then soften the message when it gets uncomfortable.',
    reflection: [
      'You get as far as raising the issue. Then their face changes or their voice tightens, and you hear yourself saying, “It’s probably fine.” You both leave feeling a bit relieved. A week later, the same thing happens and you realise they may never have understood what you were asking them to change.',
      'It makes sense to care how your feedback lands. You can give someone a moment to take it in, listen to what they say and still come back to the point you need to make. They deserve to know what you’re asking of them.',
      'If you feel yourself backing away from the issue, pause. Ask how they see it. Then bring the conversation back to the change you need to agree together.'
    ],
    action: 'Before you go in, write down the one thing you need to see change. For example, “I need the handover notes completed before the next shift starts.” Keep that sentence in front of you so you can come back to it when the conversation gets uncomfortable.',
    invitation: 'If you’d like to practise staying clear when someone pushes back, you can talk it through in The People Leaders’ Room. It’s a free, private community for managers, separate from your workplace.'
  },
  underprepared: {
    name: 'The Underprepared',
    headline: 'You’re willing to have the conversation. You’re unsure where to start.',
    reflection: [
      'You know the issue needs dealing with and you’re willing to bring it up. Then you try to work out what to say first, how much detail to give and what you want to agree by the end. It’s easy to stall when you’re trying to work out all three at once.',
      'A short structure can take some of that pressure off. When you have a few notes in front of you, you can spend more of the conversation listening to what the other person says.',
      'Start with the issue, the evidence and the outcome you need. Ask what was happening from their side before you agree what to do next.'
    ],
    action: 'Write one sentence naming the issue, jot down one or two specific things you’ve seen or heard, and write what needs to change. For example, if handovers are being missed, note which ones and what the next shift needs from them going forward.',
    invitation: 'If you’d like somewhere to try out what you’re going to say, you’re welcome in The People Leaders’ Room. It’s a free, private community where managers share what’s worked for them, separate from your workplace.'
  }
};
function score(answers) {
  const counts = Object.fromEntries(types.map(type => [type, 0]));
  for (const answer of answers) counts[answer]++;
  const highest = Math.max(...Object.values(counts));
  // Prioritise what the reader says would help now, then what is happening.
  return [4, 0, 1, 2, 3].map(index => answers[index]).find(type => counts[type] === highest);
}
if (typeof module !== 'undefined') module.exports = { score, types, questions, results };

if (typeof document !== 'undefined') {
  const screen = document.querySelector('#screen');
  const intro = screen.innerHTML;
  const answers = [];
  let current = 0;

  function show(html, focus = true) {
    screen.innerHTML = html;
    if (focus) document.querySelector('#heading').focus();
  }

  function start(focus) {
    show(intro + '<p>Think of one workplace conversation you’ve been putting off or struggling to finish. Keep it in mind as you answer.</p><button type="button">Start the quiz</button>', focus);
    screen.querySelector('button').onclick = () => renderQuestion();
  }

  function renderQuestion() {
    const [question, ...options] = questions[current];
    show(`
      <p class="progress" id="progress-label">Question ${current + 1} of ${questions.length}</p>
      <progress aria-labelledby="progress-label" max="${questions.length}" value="${current + 1}"></progress>
      <h1 id="heading" tabindex="-1">${question}</h1>
      <form>
        <fieldset aria-labelledby="heading">
          ${options.map((option, index) => `
            <label class="choice"><input type="radio" name="choice" value="${types[index]}" required
            ${answers[current] === types[index] ? 'checked' : ''}><span>${option}</span></label>
          `).join('')}
        </fieldset>
        <div class="controls">
          ${current ? '<button class="secondary" id="back" type="button">Back</button>' : ''}
          <button type="submit">Continue</button>
        </div>
      </form>`);
    const back = screen.querySelector('#back');
    if (back) back.onclick = () => { current--; renderQuestion(); };
    const form = screen.querySelector('form');
    form.onsubmit = event => {
      event.preventDefault();
      answers[current] = new FormData(form).get('choice');
      if (current === questions.length - 1) renderSignup(score(answers));
      else { current++; renderQuestion(); }
    };
  }

  function renderResult(tag) {
    const result = results[tag];
    show(`
      <p class="progress">The pattern in your answers</p>
      <h1 id="heading" tabindex="-1">${result.name}</h1>
      <p class="result-headline">${result.headline}</p>
      ${result.reflection.map(paragraph => `<p>${paragraph}</p>`).join('')}
      <h2>One practical first step</h2>
      <p>${result.action}</p>
      <p>Think about whether this fits the conversation you had in mind. Another conversation might bring out a different pattern.</p>
      <p>${result.invitation}</p>
      <p><a href="${communityUrl}" target="_blank" rel="noopener">Visit The People Leaders’ Room</a></p>
      <p>You’re signed up. Look out for the first email from Nicola.</p>
      <button type="button" class="secondary" id="restart">Take the quiz again</button>`);
    screen.querySelector('#restart').onclick = () => {
      current = 0;
      answers.length = 0;
      start(true);
    };
  }

  function renderSignup(tag) {
    const endpoint = window.quizConfig?.webhookUrl;
    show(`
      <h1 id="heading" tabindex="-1">Your result is ready</h1>
      ${endpoint ? `
        <p>Sign up to see your result and get five practical emails from Nicola about what to do next. You can unsubscribe at any time.</p>
        <form>
          <label for="email">Email address</label>
          <input class="email" type="email" id="email" name="email" autocomplete="email" maxlength="254" required>
          <button type="submit">Sign up and see my result</button>
        </form>
        <p class="privacy">Your email is not shared with your employer. You can read how I look after your details in my <a href="${privacyUrl}" target="_blank" rel="noopener">privacy policy</a>.</p>` : '<p>Sign-up is temporarily unavailable. Please try again later.</p>'}
      <p role="status" id="status"></p>
      <button class="secondary" id="back" type="button">Back</button>`);
    const back = screen.querySelector('#back');
    back.onclick = renderQuestion;
    const form = screen.querySelector('form');
    if (!form) return;
    const status = screen.querySelector('#status');
    const submit = form.querySelector('button');
    form.onsubmit = async event => {
      event.preventDefault();
      const email = new FormData(form).get('email').trim();
      submit.disabled = true;
      back.disabled = true;
      status.textContent = 'Signing you up…';
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: new URLSearchParams({ email, tag: tag === 'avoider' ? 'conversation-quiz-avoider' : tag, source: 'conversation-barrier-quiz', consent: 'yes' }),
          signal: AbortSignal.timeout(12000)
        });
        if (!response.ok || (await response.json()).ok !== true) throw new Error('Sign-up failed');
        renderResult(tag);
      } catch {
        status.textContent = 'We couldn’t confirm your sign-up. Please try again.';
        submit.disabled = false;
      } finally {
        back.disabled = false;
      }
    };
  }

  start(false);
}
