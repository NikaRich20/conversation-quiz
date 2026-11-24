# What's actually stopping you from having that conversation?

A static five-question quiz for The People Mentor. Open index.html in a browser to review the quiz. After the fifth question, the reader signs up by email and sees the result once the webhook confirms the sign-up.

## Scoring

Each answer gives one point to its mapped pattern. The highest total wins. Ties use the reader's answer to question 5 if it matches a tied pattern, then questions 1 through 4 in order.

## Connect the welcome sequence

Set webhookUrl in config.js to the public HTTPS intake endpoint. The form sends a POST with URL-encoded fields email, tag, source (conversation-barrier-quiz) and consent (yes). The tags are overthinker, conversation-quiz-avoider, peacekeeper and underprepared.

Configure the intake to accept the four exact tags, validate the email and consent, and upsert the contact in Systeme.io before applying the matching tag. Keep the Systeme.io API key and the internal Make webhook URL behind the intake endpoint. Rate-limit the public endpoint and make retries idempotent. Preserve existing unsubscribe status and record the opt-in timestamp. Configure the four matching tag triggers to subscribe to the confirmed five-email campaign. Check for tag-name collisions and existing rules before enabling.

Return HTTP 200 with a JSON body of {"ok":true} only once signup processing succeeds. Return a non-2xx status on failure. Set Access-Control-Allow-Origin to the deployed quiz origin. If signup fails, the reader can retry without re-answering the quiz.

## Publish

Use a GitHub Pages repository with index.html, styles.css, quiz.js and config.js at the branch root. In WordPress or Elementor, embed the published quiz URL in an HTML block. Replace the example URL below with the live Pages URL.

```html
<iframe src="https://OWNER.github.io/REPOSITORY/" title="What's actually stopping you from having that conversation?" width="100%" height="1050" style="border:0"></iframe>
```

After publishing, run one opted-in test per result with authorised test addresses. Confirm all four tags, the selected campaign, and receipt of the first email. Check that the result stays hidden until signup succeeds.
