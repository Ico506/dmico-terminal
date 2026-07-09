# DMICO Terminal — Owner's Guide

Everything you need to run and modify the board without archaeology. Written 9 July 2026, matches the shipped code.

---

## 1. The map: which file changes what

| File | What it controls | Touch it when |
|---|---|---|
| **`links.js`** | ALL content: your name, tagline, avatar path, socials, every card, every status, analytics code, theme colors | 95% of edits. This is the CMS |
| **`styles.css`** | How everything looks: colors (the `:root` token block at the top), fonts, card shapes, chip colors, animations | You want a visual change for everyone, forever |
| **`app.js`** | The logic: reads `links.js`, builds the page, handles scheduling, embeds, analytics events | Almost never. Only for new features |
| **`index.html`** | Page skeleton, browser tab title, OG/social preview text, footer | Changing share-preview text or footer wording |
| **`editor.html`** | The form-based board editor ("ground crew" link in the footer) | Never by hand; it edits `links.js` for you |
| **`sw.js`** | Offline cache. One thing matters: `CACHE_VERSION` at the top | Bump it (v3 → v4 → ...) whenever you change CSS/JS, or returning visitors see the stale version |
| **`manifest.webmanifest`** | The "install as app" name and icons | Renaming the app or replacing icons |
| **`assets/`** | Avatar, OG preview image, QR code, card thumbnails | Swapping images |
| **`icons/`** | Favicon + PWA icons | Rebranding only |

Golden rule: if the edit is about WHAT is on the board, it goes in `links.js`. If it is about HOW the board looks, it goes in `styles.css`. Nothing else needs opening.

## 2. Everyday recipes (all in `links.js`)

**Add a project card.** Find the right section's `cards: [...]` array, copy an existing card block, edit:

```js
{
  title: "My New Tool",
  desc: "One line about it.",
  url: "https://the-link.com",
  status: "now-boarding",
  icon: "🔧"
},
```

Every card block ends with `},` except the last one in its array. This comma rule causes 90% of breakage. If the board loads blank after an edit, you dropped or doubled a comma.

**Change a status.** Edit the `status` field. The four options and what visitors read into them: `now-boarding` (live, orange, pulses), `boarding-soon` (coming), `arrived` (shipped, stable), `delayed` (on hold, honest).

**Feature a card (lantern glow).** Add `featured: true`. Remove it from the old featured card first. One lit lantern on the whole board, ever.

**Park a card without deleting.** Add `hidden: true`. Remove the line to bring it back. Your IG and XHS social pills are parked this way right now, waiting for real handles.

**Schedule a card.** `showFrom: "2026-08-01T00:00:00+08:00"` makes it appear at launch time while you sleep. `showUntil` does the reverse. Delete the field when no longer needed.

**Embed a trailer or demo.** Add `embed: "https://www.youtube.com/embed/VIDEO_ID"` (use the /embed/ URL, not the watch URL) or an itch.io widget URL. The card grows a 16:9 player; the title becomes the link instead of the card.

**Turn on analytics.** Make a free account at goatcounter.com, pick a code, put it in `settings.goatcounter: "yourcode"`. Dashboard lives at `yourcode.goatcounter.com`. Every card click is logged as an event named after its gate.

**Recolor the board.** `settings.tokens` overrides any CSS variable without touching the stylesheet:

```js
tokens: { "--accent": "#A9B388", "--lantern": "#783D19" }
```

Your extended swatches: laurel green `#A9B388`, lemon meringue `#F9EBC7`, camel `#B99470`, russet `#783D19`.

**Add a whole section.** Copy a section block (terminal letter + name + cards array). It auto-hides while all its cards are hidden. Each section is deep-linkable at `#terminal-<letter>`, so a bio can point directly to `.../dmico-terminal/#terminal-b`.

## 3. Three ways to edit, pick per situation

1. **At the desk:** edit `links.js` in any editor, push with GitHub Desktop. The workhorse.
2. **On the phone, quick fix:** github.com > repo > `links.js` > pencil icon > commit. Nothing to install.
3. **Form mode (no code at all):** open the **ground crew** link in the page footer (or `editor.html` directly). Edit with forms, then either copy-paste the output into `links.js`, or use **Generate + commit to GitHub** to push straight from the browser.

### Setting up the direct-commit button (one-time, 5 minutes)

1. GitHub > Settings > Developer settings > Personal access tokens > **Fine-grained tokens** > Generate new token.
2. Repository access: **Only select repositories** > `dmico-terminal`.
3. Permissions: **Contents: Read and write**. Nothing else. Expiry: your call; longer = less re-setup.
4. Paste the token into the editor's GitHub box, tick "Remember on this device."

The token lives only in that browser's localStorage. It can touch only this one repo. If a device is ever lost, revoke the token on GitHub and nothing else is exposed. The public page itself still has no login and no backend; the editor is just a file generator with a courier service.

## 4. Things that bite (gotchas)

- **Stale page after pushing a change?** Bump `CACHE_VERSION` in `sw.js`. Content-only edits to `links.js` usually show up fine, but CSS/JS changes hide behind the old cache until the version bumps.
- **GitHub Pages is not instant.** A push takes ~1 minute to go live. Not broken, just brewing.
- **The share preview (WhatsApp/IG) is hard-coded** in `index.html` OG tags and `assets/og-image.png`. Changing your tagline in `links.js` does not update the share preview; edit both if the wording matters.
- **Avatar:** replace `assets/avatar.png` with a square image, keep the same filename, done. Same for the OG image.
- **Emoji icons vs thumbs:** `icon` is an emoji, `thumb` is an image path. If both exist, `thumb` wins.
- **Never commit a token, an API key, or anything secret to this repo.** It is public. The design needs no secrets; keep it that way.
- **QR code** (`assets/qr-dmico-terminal.png`) points at the GitHub Pages URL. If you ever buy a custom domain, regenerate it (any free QR generator, ink `#45301E` on `#F4EBD2` matches the brand).

## 5. What is intentionally NOT here

No backend, no database, no login, no build step, no framework. That is the security model and the RM0 model in one sentence: a static page has nothing to breach and nothing to bill. Before adding any feature that needs a server, re-read the PRD's architecture section and interrogate the idea twice (the PRD lives at `PRD_Claude/dmico-terminal_PRD/` outside this repo).
