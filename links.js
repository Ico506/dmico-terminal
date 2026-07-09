/* ============================================================
   DMICO TERMINAL — THE content file. This is your CMS.
   Edit this file, push via GitHub Desktop, board updates.

   Card fields:
     title       (required) project name
     desc        (required) one-liner shown under the title
     url         link target. Leave "" for not-clickable yet
     status      "now-boarding" | "boarding-soon" | "arrived" | "delayed"
     icon        emoji shown in the gate badge (optional)
     thumb       "./assets/xxx.png" image instead of emoji (optional)
     featured    true = lantern glow, top of its section (max ONE on the board)
     hidden      true = card not rendered (park it without deleting)
     showFrom    "2026-08-01T00:00:00+08:00" appear from this time (optional)
     showUntil   ISO datetime, disappear after this time (optional)
     embed       iframe URL (YouTube embed link, itch.io widget) shown
                 inside the card, 16:9. Card becomes non-clickable;
                 the title links to `url` instead (optional)

   Deep links: each section is reachable at #terminal-<letter>,
   e.g. https://ico506.github.io/dmico-terminal/#terminal-a
   Handy for pointing each persona's bio at its own section.

   Prefer forms over raw editing? Open editor.html locally,
   fill the form, copy the generated file back here.
   ============================================================ */

window.TERMINAL = {
  profile: {
    name: "DMICO",
    tagline: "Vibe-coded tools, games, and research by Damico. Built in Sibu, Sarawak.",
    avatar: "./assets/avatar.png"
  },

  /* Social strip under the header. hidden: true to park one. */
  socials: [
    { label: "GitHub", url: "https://github.com/Ico506", icon: "github" },
    { label: "Instagram", url: "https://instagram.com/YOUR_HANDLE", icon: "instagram", hidden: true },
    { label: "XHS", url: "https://xiaohongshu.com/user/profile/YOUR_ID", icon: "xhs", hidden: true },
    { label: "Email", url: "mailto:damianyong506@gmail.com", icon: "mail" }
  ],

  sections: [
    {
      terminal: "A",
      name: "Web Tools",
      cards: [
        {
          title: "Gaji Decoder",
          desc: "What your gaji actually looks like after EPF, SOCSO, EIS and PCB. Verdict included.",
          url: "",
          status: "boarding-soon",
          icon: "💸",
          featured: true
        }
      ]
    },
    {
      terminal: "B",
      name: "Games",
      cards: [
        {
          title: "Example game card",
          desc: "Unhide me when there is a public game to show. Add an embed URL for a playable widget or trailer.",
          url: "https://example.itch.io/your-game",
          status: "delayed",
          icon: "🎮",
          hidden: true
        }
      ]
    },
    {
      terminal: "C",
      name: "Research & Writing",
      cards: [
        {
          title: "Example research card",
          desc: "AR/VR + Game Studies work goes here when it is public.",
          url: "https://example.com",
          status: "boarding-soon",
          icon: "📚",
          hidden: true
        }
      ]
    }
  ],

  settings: {
    /* GoatCounter analytics. Create a free account at goatcounter.com,
       pick a code (e.g. "dmico"), put it here. Empty = analytics off. */
    goatcounter: "dmico",

    /* Theme token overrides. Any CSS variable from styles.css can be
       overridden here without touching the stylesheet. Examples:
       tokens: {
         "--accent": "#A9B388",      (laurel green swatch)
         "--lantern": "#783D19"      (russet swatch)
       }
       Delete or leave empty for the default DMICO palette. */
    tokens: {}
  }
};
