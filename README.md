# 🗳️ PollMind — Indian Election AI Guide

> An interactive AI-powered assistant that educates Indian citizens about elections, democracy, and governance in a friendly, multilingual, and fact-based way.

<p align="center">
  <img src="https://img.shields.io/badge/Made%20for-India%20🇮🇳-FF9933?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Theme-Indian%20Tricolor-138808?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Offline-Ready-000080?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-GPL%20v3-blue?style=for-the-badge" />
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 💬 **AI Chat Assistant** | Ask any question about Indian elections — voting process, EVMs, Voter ID, governance roles — and get instant, accurate answers |
| 📚 **Learn Hub** | Interactive cards covering Election Process (6-step timeline), Governance Roles (Sarpanch → PM), and Myth Busters |
| 🧠 **Quiz Arena** | Randomized 5-question quizzes with explanations, XP rewards, streak tracking, and difficulty levels |
| 🗳️ **Election Simulator** | Experience a mock FPTP election — vote for candidates and see animated results |
| 📋 **Election Mode** | Step-by-step voting guide, required document checklist, and polling day tips |
| 🌐 **Multilingual** | UI in English, Hindi (हिन्दी), Bengali (বাংলা), and Tamil (தமிழ்) |
| 📴 **Offline First** | All content bundled client-side — no API calls needed for core features |
| ♿ **Accessible** | ARIA roles, keyboard navigation, semantic HTML, large touch targets |

---

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph Client["🖥️ Client (Browser)"]
        direction TB
        HTML["index.html<br/>App Shell & Screens"]
        CSS["style.css<br/>Indian Tricolor Theme<br/>Responsive Layout"]
        JS["script.js<br/>App Logic & State"]
        DATA["data.js<br/>Offline Content Store"]
    end

    subgraph Screens["📱 Screens"]
        direction LR
        HOME["🏠 Home"]
        CHAT["💬 Chat"]
        LEARN["📚 Learn"]
        QUIZ["🧠 Quiz"]
        ELECTION["🗳️ Election"]
        PROFILE["👤 Profile"]
    end

    subgraph DataModules["📦 Data Modules"]
        direction LR
        LANG["🌐 Multilingual Labels<br/>EN / HI / BN / TA"]
        RESPONSES["🤖 Chat Responses<br/>Keyword Matching AI"]
        QUESTIONS["❓ Quiz Questions<br/>12-Question Bank"]
        MYTHS["🔍 Myth Busters<br/>6 Fact-Checks"]
        GUIDE["📋 Voting Guide<br/>Steps & Documents"]
        ROLES["🏛️ Governance Roles<br/>Sarpanch to PM"]
        SIM["🗳️ Simulation<br/>FPTP Mock Election"]
    end

    subgraph Storage["💾 Client Storage"]
        LS["localStorage<br/>Language Preference<br/>User Stats & XP"]
    end

    HTML --> JS
    CSS --> HTML
    JS --> DATA
    JS --> Screens
    DATA --> DataModules
    JS --> Storage

    subgraph External["🌍 External (CDN)"]
        FONTS["Google Fonts<br/>Outfit / Inter"]
        ICONS["Font Awesome 6<br/>Icon Library"]
    end

    HTML --> External
```

### Component Interaction Flow

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant UI as 🖥️ UI Layer
    participant SM as ⚙️ State Manager
    participant AI as 🤖 Chat Engine
    participant LS as 💾 localStorage

    U->>UI: Opens PollMind
    UI->>SM: Initialize state
    SM->>LS: Load saved preferences
    LS-->>SM: Language, Stats, XP
    SM-->>UI: Render Home screen

    U->>UI: Clicks "Start Chatting"
    UI->>SM: switchScreen('chat')
    SM-->>UI: Show Chat screen

    U->>UI: Types "How does voting work?"
    UI->>AI: findResponse(input)
    AI->>AI: Keyword matching against CHAT_RESPONSES
    AI-->>UI: Return matched response
    UI-->>U: Display bot message

    U->>UI: Starts Quiz
    UI->>SM: Shuffle & pick 5 questions
    SM-->>UI: Render question
    U->>UI: Selects answer
    UI->>SM: Update score, XP
    SM->>LS: Save stats
    SM-->>UI: Show feedback + next
```

---

## 📁 Project Structure

```
PollMind/
├── public/
│   ├── index.html      # App shell with 6 screens
│   ├── style.css       # Indian tricolor themed styles
│   ├── script.js       # Main application logic
│   └── data.js         # All content data (offline-first)
├── LICENSE             # GPL v3
└── README.md           # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Edge, Safari)
- Node.js (optional, for local dev server)

### Run Locally
```bash
# Clone the repository
git clone https://github.com/SupravoCoder/PollMind.git
cd PollMind

# Serve with any static server
npx serve public -p 3000

# Open in browser
open http://localhost:3000
```

---

## 🎨 Design System

The app uses a custom **Indian Tricolor** dark theme:

| Color | Hex | Usage |
|-------|-----|-------|
| 🟠 Saffron | `#FF9933` | Primary buttons, active states, accents |
| ⚪ White | `#FFFFFF` | Text, gradient midpoint |
| 🟢 Green | `#138808` | Success states, secondary buttons |
| 🔵 Navy | `#000080` | Accent, deep backgrounds |
| ⬛ Dark BG | `#0a0e1a` | App background with tricolor gradient glow |

---

## 🌐 Supported Languages

- 🇬🇧 English
- 🇮🇳 Hindi (हिन्दी)
- 🇮🇳 Bengali (বাংলা)
- 🇮🇳 Tamil (தமிழ்)

---

## 📜 License

This project is licensed under the [GNU General Public License v3.0](LICENSE).

---

## 🙏 Acknowledgements

- [Election Commission of India](https://eci.gov.in/) — Source of electoral information
- [Font Awesome](https://fontawesome.com/) — Icons
- [Google Fonts](https://fonts.google.com/) — Outfit & Inter typefaces

---

<p align="center">
  <b>PollMind is neutral, non-political, and fact-based.</b><br/>
  Built for education, not persuasion. 🇮🇳
</p>
