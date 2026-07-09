# dmico-terminal

A place for links to all DMICO works. The departure board for the DMICO brand.

**Live:** https://ico506.github.io/dmico-terminal/ (enable GitHub Pages: Settings > Pages > Deploy from branch > `main`, root)

## How to update the board

Everything editable lives in **`links.js`**. Edit, commit, push via GitHub Desktop. That is the whole CMS.

- Add a card: copy an existing card block into a section's `cards` array.
- Change a status: edit the `status` field. Options: `now-boarding`, `boarding-soon`, `arrived`, `delayed`.
- Feature a card: `featured: true` (keep it to ONE card on the whole board).
- Park a card without deleting: `hidden: true`.
- Schedule a card: `showFrom` / `showUntil` with ISO datetimes.
- Embed a trailer/demo: add an `embed` field with a YouTube embed or itch.io widget URL.
- Turn on analytics: create a free GoatCounter account, put your code in `settings.goatcounter`.
- Recolor the whole board: override any CSS variable in `settings.tokens`, no stylesheet edits needed.

**Hate editing JS by hand?** Open `editor.html` (locally or on the live site). It loads the current board into a form: add cards, flip statuses, reorder, then Generate, copy the output into `links.js`, push. It saves nothing anywhere; it is a file generator, not an admin panel, so the no-login security model stays intact.

**Deep links:** each section is reachable at `#terminal-a`, `#terminal-b`, etc. Point each persona's bio at its own section if you like.

Replace `assets/avatar.png` with your real avatar (square image). QR code for posters/name cards: `assets/qr-dmico-terminal.png`.

## Stack

Static HTML/CSS/JS, no build step, no backend, no database. GitHub Pages hosting, RM0/month. Installable PWA. Read-only to visitors: the only write path is a push to this repo.

## Cache note

When shipping visual changes, bump `CACHE_VERSION` in `sw.js` so returning visitors get the new files.
