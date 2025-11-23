import { BlogPost } from "../types";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Optimizing React for Low-End Devices: What No One Tells You",
    excerpt:
      "How I stopped React from choking on animations by ditching state and letting the GPU do real work.",
    date: "Oct 24, 2024",
    readTime: "9 min read",
    tags: ["React", "Performance", "Animation"],
    content: `
# Why React Struggles on Cheap Hardware

Most developers test on their MacBook Pro and call their app “smooth.”  
Meanwhile, someone using a five-year-old laptop opens the same app and their fan starts begging for mercy.

The biggest culprit? **State-driven animations**.

Every time you think you're being clever updating a cursor position, scroll effect, or hover animation using React state, you're basically telling React:

> "Hey, can you re-render the entire component tree for this 2px movement? Thanks."

Low-end machines *hate* this.

---

# The Actual Fix: Let the GPU Do the Heavy Lifting

React's render cycle is the bottleneck. So instead of fighting it, I avoided it.

That’s when **MotionValues** from Framer Motion became my weapon of choice.

\`\`\`ts
const x = useMotionValue(0);

// No re-renders. Pure, raw, GPU-friendly updates.
x.set(120);
\`\`\`

Pair this with CSS transforms like \`translate3d\` or \`scale\`, and suddenly the UI feels like it got a hardware upgrade.

---

# What This Changed

- CPU usage dropped **60%**  
- Battery drain decreased  
- Janky scroll effects turned buttery smooth  
- Even trash-tier laptops could handle my animations  

Animations should never touch React state.  
Lesson learned the hard way.

    `,
  },
  {
    id: "2",
    title: "Why I Switched from VS Code to Neovim (and Never Looked Back)",
    excerpt:
      "VS Code slowed me down. Neovim punched me in the face and made me faster. Here's how Lua, motions, and terminal workflows rewired my brain.",
    date: "Nov 02, 2024",
    readTime: "11 min read",
    tags: ["Linux", "Neovim", "Productivity"],
    content: `
# VS Code Was Comfortable — Too Comfortable

VS Code is great… until you realize you're coding inside a Chromium browser that eats RAM like it’s free.

The biggest problem wasn't performance though.  
It was **workflow friction**.

I kept reaching for my mouse.  
Switching tabs.  
Clicking around the file explorer like a lost intern.

I hated that.

---

# Neovim Doesn’t Care About Your Feelings

Neovim is brutally honest.  
It gives you nothing by default.

You build everything from scratch, and it forces you to think:

- What is slowing me down?
- What do I actually need?
- How can I move more efficiently?

That mindset shift alone made me twice as fast.

---

# Lua Made Configuration *Fun*

Lua turned Neovim from “ancient terminal editor” into a programmable beast.

My key plugins?

### 🔍 Telescope
My fuzzy finder, file navigator, grep tool, project switcher... basically my entire brain.

### 🎣 Harpoon
Instant jumps to my most-used files. VS Code users have no idea what they’re missing.

### 🎯 LSP + Treesitter
VS Code-level autocomplete, but without the performance tax.

---

# Terminal-Centric Dev Is a Cheat Code

Now I run everything inside tmux:

- Neovim  
- API logs  
- Database shell  
- Dev server  

All tiled.  
All keyboard driven.  
Zero mouse.

It feels like upgrading from a bicycle to a motorcycle.

    `,
  },
  {
    id: "4",
    title:
      "How I Turned a Raspberry Pi Into a Full Dev Machine (And Why It Shocked Me)",
    excerpt:
      "I tried using a Raspberry Pi as a real development workstation. Spoiler: it handled way more than I expected.",
    date: "Dec 01, 2024",
    readTime: "10 min read",
    tags: ["Raspberry Pi", "Linux", "ARM", "Hardware"],
    content: `
# Why Even Try This?

Because I like suffering — and because everyone online kept saying:

> “You can’t use a Raspberry Pi as a dev machine.”

Challenge accepted.

I grabbed a Raspberry Pi 5, slapped an NVMe hat on it, installed Arch ARM (because of course I did), and decided to code on it for a full week.

---

# The Surprising Part: It Was Actually *Usable*

Here’s what I ran **simultaneously**:

- Neovim (fast as hell)
- Go compiler
- Node dev server
- PostgreSQL
- Docker containers (slow but functional)
- Firefox with 5–6 tabs

And the system never begged for mercy.

The only part that felt painful was bundling large TypeScript projects — esbuild saved me there.

---

# What I Built on It

- A Go API  
- A tiny React dashboard  
- A Python script for GPIO  
- A local network monitor using Rust  

This thing is a tiny home-lab monster.

---

# Should You Use a Pi as Your Main Dev Machine?

If you’re expecting MacBook power: forget it.  
If you want a:

- cheap dev workstation  
- self-hosted services box  
- portable coding setup  
- programmable hardware playground  

Then the Pi is unbeatable.

Honestly, everyone should try this at least once. It changes how you think about hardware performance and optimization.

    `,
  },
];
