# DMICO Terminal — Launch Checklist

One-time list, delete this file after launch if you like. Work top to bottom.

## Pre-flight (at the desk, 10 minutes)

- [ ] Open `index.html` in your browser. Check: your avatar shows, Gaji Decoder card glows lantern-orange with BOARDING SOON, footer has the "ground crew" link, nothing looks broken on a narrow window (F12 > mobile view).
- [ ] Open `editor.html`. Check: the form loads with current board content, Generate produces output.
- [ ] Delete `icons/Untitled design(5).png` if you want a tidy repo (everything was generated from it already).
- [ ] Push everything via GitHub Desktop.

## Go live (5 minutes)

- [ ] GitHub repo > Settings > Pages > Source: Deploy from a branch > `main` / root > Save.
- [ ] Wait ~2 minutes, visit `https://ico506.github.io/dmico-terminal/`.
- [ ] Tap the Gaji Decoder card, tap the GitHub pill, install the PWA from the browser menu on your phone. All should behave.
- [ ] Visit once, then check `dmico.goatcounter.com` shows the hit.

## Board content (when ready)

- [ ] Real IG handle into the Instagram social, delete its `hidden: true`.
- [ ] Real XHS profile URL into the XHS social, delete its `hidden: true`.
- [ ] When Gaji Decoder ships: paste its URL into the card, flip status to `now-boarding`.

## Editor direct-commit (one-time, optional but recommended)

- [ ] GitHub > Settings > Developer settings > Fine-grained tokens > Generate: only `dmico-terminal`, Contents read/write, nothing else.
- [ ] Open the live editor via the footer "ground crew" link, paste token, tick remember, do a test commit (change one word in the tagline, commit, refresh site, change it back).

## Spread the link

- [ ] Bio on IG account(s) → the Terminal URL (or `#terminal-a` deep link per persona).
- [ ] Bio on XHS account(s) → same.
- [ ] GitHub profile README / website field → same.
- [ ] QR (`assets/qr-dmico-terminal.png`) into slide templates / name card file.

## Day-60 review reminder (per standing rules)

- [ ] ~7 September 2026: is every bio migrated? Was at least one card added organically? GoatCounter: which gates get boarded? Decide: keep as-is / promote a different featured card / consider custom domain.

Everything else about running the board day-to-day lives in `GUIDE.md`.
