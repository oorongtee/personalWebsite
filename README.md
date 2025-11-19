Ray’s Personal Website

A modern and fully responsive personal portfolio built with Vanilla JavaScript, featuring interactive UI, modular architecture, dynamic weather visualization, and an integrated AI assistant.

🌟 Overview

This project showcases Ray as a Product Manager & Front-end Engineer, featuring clean design, smooth micro-interactions, and a product-oriented content structure.
The website is deployed hosting platforms and structured for scalability and maintainability.

🚀 Core Features
🎨 Modern UI & Interaction Design

Responsive Layout supporting desktop, tablet, and mobile devices

Glassmorphism (backdrop-filter) for navigation and panels

Micro-interactions including hover scaling, click feedback, and scroll reveal animations

Warm earth-tone design system with soft shadows and 12–16px border radius

Dynamic animated background and subtle atmospheric effects

🌤️ Dynamic Weather System

Fetches real-time data from the Central Weather Administration (Taiwan)

Interactive leaf widget with breathing animation

Weather panel reveals: temperature, humidity, wind speed

Visual effects adapt to weather conditions (wind ripples, ambient colors)

🤖 Built-in AI Assistant

A product-oriented assistant that can:

Answer visitor questions about Ray

Describe projects and skills

Assist users navigating the website

📄 SPA Architecture

Pure Vanilla JS single-page application (SPA)

Hash-based routing system

Dynamic content rendering via template modules

No frameworks or external dependencies

🧰 Tech Stack

HTML5 – Semantic structure

CSS3 – Advanced animation & responsive design

JavaScript (ES6+) – Routing & interaction logic

EmailJS – Contact form integration

Central Weather Administration API – Real-time weather data

🗂️ Project Structure
personal-website/
├── index.html
├── index.js
├── assets/
│   ├── css/
│   │   ├── home.css
│   │   ├── chatbot.css
│   ├── js/
│   │   ├── chatbot-fixed.js
│   │   ├── weather-api.js
│   ├── images/
│   │   └── leaf.svg
├── netlify.toml
└── README.md

🛠️ Development Notes & Best Practices (AI-Assisted Workflow)
✨ Benefits of AI-Assisted Development

Generates UI components, CSS modules, and layout ideas

Provides animation parameters, design suggestions, and UX improvements

Assists with Git initialization and version control workflows

⚠️ Challenges & Recommendations
1. Code & Feature Management

Remove old code before adding new features to avoid AI mixing functionalities

Avoid requesting full “clean code” refactoring mid-development — may remove working logic

Clean code progressively or define a strict structure from the beginning

2. Project Structure & Performance

As the project grows, AI inspection time increases

Modularizing early reduces complexity and errors

3. Responsive Design Workflow

Design from the smallest breakpoint first

Ensure cross-route layout consistency

4. Design Limitations

AI-generated animations and decorative elements may lack refinement

Manual fine-tuning is often required

5. Technical Debt Management

New features may introduce unpredictable bugs

Disable features temporarily only with clear notes — easy to forget re-enabling

Version control before each major change is essential

🎨 Design System Principles
1. Visual Comfort

Relaxed line height (1.6–1.75em)

Warm shadows using rgba(139, 69, 19, 0.1–0.3)

Soft border-radius (12–16px)

Glassmorphism using backdrop-filter: blur(10px)

2. Micro-Interactions

Hover scale: 1.02x

Click feedback: 0.98x

Scroll reveal: fade + 12px upward movement

Smooth 0.3s ease-in-out transitions

3. Progressive Disclosure

Weather widget expands only on interaction

Works detail panel opens on demand

Transparent navigation preserves content visibility

4. Accessibility & Performance

High contrast warm palette

Optimized CSS transforms for animation

Touch-friendly interactions

Keyboard navigation considerations

🧩 Pages & Content
Home

Hero introduction

Project highlights

Social links & resume download

About

Structured timeline

Professional experience and skills

Real company names:

Locas Technology CO., LTD（英商鴻璽科技）

BITAPE Logistics Technology CO., LTD（幣態科技）

Works

Real project portfolio

Updated order, accurate tech tags and links

Notes

Searchable article list

Category filters

Contact

Email form powered by EmailJS

English error messages for consistency

🌐 Deployment

This project supports deployment to:

Netlify (via netlify.toml)

GitHub Pages

Vercel

✔️ UX Improvement Log (Summary)

Major improvements include:

Full RWD refactor

Unified design language

Weather system overhaul

Modernized card system & layout rhythm

Realistic portfolio content

Brand identity enhancement

Updated social links & resume integration

📈 Future Enhancements

Dark mode toggle

Additional micro-interaction refinements

User preferences storage

Design system documentation

Improved loading performance

📞 Contact

📧 ray68125@gmail.com

📍 Taipei, Taiwan
🌐 GitHub / Medium / LinkedIn updated in the website footer
