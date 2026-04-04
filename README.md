[![YouTube Demo](https://img.shields.io/badge/🎥_Demo_Video-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/49la6mt6Awo)
## 📺 Demo Video

<div align="center">

### 🎥 Watch the Complete Demo

<div align="center">

## 🎬 Watch the Complete Demo

[![Watch the demo](https://img.shields.io/badge/▶️_CLICK_TO_WATCH_DEMO-FF0000?style=for-the-badge&logo=youtube&logoColor=white&labelColor=CC0000&fontSize=20)](https://youtu.be/49la6mt6Awo)

### 🚀 Full Walkthrough: Codebase + Live Demo + Features

</div>

*The video covers: Codebase walkthrough, Multi-Agent architecture, Live app demonstration, and Feature showcase*

</div>

---

**Demo Video Link:** https://youtu.be/49la6mt6Awo

# 🤖 Pseudo Help

> **Autonomous Multi-Agent AI Study Assistant | Planner + Critic Architecture | Persistent Memory | 5 Specialized Tools**

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://pseudo-help.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-black)](https://github.com/AnandRajGarv/pseudo-help-working)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

An autonomous AI agent that creates personalized study plans using true multi-agent architecture with self-improvement capabilities.



# 🧠 Pseudo Help - Autonomous AI Study Assistant

[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-blue?logo=render)](https://pseudo-help.onrender.com)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js)](https://nodejs.org/)
[![Groq AI](https://img.shields.io/badge/Groq-API-purple?logo=groq)](https://console.groq.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-live-brightgreen)](https://pseudo-help.onrender.com)

> **🤖 An Autonomous AI Agent that creates personalized study plans using multi-agent architecture (Planner + Critic) with memory, tools, and self-improvement capabilities.**

---

## 🌐 Live Demo

### 🔗 **Try it now:** [https://pseudo-help.onrender.com](https://pseudo-help.onrender.com)

> ⚡ *Note: Free tier may take 30-50 seconds to wake up after inactivity*

---

## 📌 Overview

**Pseudo Help** is a fully autonomous AI study assistant built for the **ORBIT Agentic Hyperthon**. It demonstrates true agentic behavior through:

| Capability | Description |
|------------|-------------|
| 🧠 **Long-term Memory** | Remembers past goals and adapts to user history |
| 🔧 **Smart Tools** | Study time calculator, resource finder, difficulty estimator |
| 🤖 **Multi-Agent Architecture** | Planner Agent + Critic Agent working in harmony |
| 🔄 **Self-Improvement Loop** | Iterative refinement of study plans |
| 💬 **Transparent Reasoning** | Shows every step of the agent's thinking process |

---

## ✨ Features

### 🤖 Agentic Capabilities

| Feature | Description |
|---------|-------------|
| **Perception** | Takes user input (learning goal) and analyzes context |
| **Reasoning** | Evaluates goal complexity, difficulty, and requirements |
| **Planning** | Generates structured, day-by-day study plans |
| **Execution** | Returns actionable learning roadmap with resources |
| **Self-Improvement** | Critic agent reviews and enhances plans |

### 🎨 User Experience

- 🌓 **Dark/Light Mode** - Seamless theme switching
- 📊 **Progress Tracker** - Mark days complete (0/7 days)
- 💾 **Save Plans** - Local storage for multiple plans
- 📋 **Copy to Clipboard** - One-click copy functionality
- 📥 **Download as TXT** - Export plans to text files
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🎨 **Premium UI** - Glass morphism, floating particles, smooth animations
- 🔗 **Timeline View** - Vertical roadmap with connection dots

---

## 🏗️ System Architecture
┌─────────────────────────────────────────────────────────────────┐
│ FRONTEND (UI LAYER) │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐ │
│ │ Premium UI │ │ Timeline │ │ Progress Tracker │ │
│ │ Glass morph │ │ (Roadmap) │ │ (Day Completion) │ │
│ └──────────────┘ └──────────────┘ └──────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────┐
│ BACKEND (Node.js + Express) │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐ │
│ │ Memory │ │ Tools │ │ Groq API Client │ │
│ │ Storage │ │ (5 Tools) │ │ (LLM Integration) │ │
│ └──────────────┘ └──────────────┘ └──────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────┐
│ MULTI-AGENT SYSTEM │
│ ┌─────────────────────────┐ ┌─────────────────────────────┐ │
│ │ PLANNER AGENT │───▶│ CRITIC AGENT │ │
│ │ (Creates Study Plan) │ │ (Improves & Refines) │ │
│ └─────────────────────────┘ └─────────────────────────────┘ │
│ │
│ 🔁 Iterative Loop (2 cycles for quality) │
└─────────────────────────────────────────────────────────────────┘
---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Backend** | Node.js + Express.js | Server & API routes |
| **AI/LLM** | Groq API (Llama 3.3 70B) | Study plan generation |
| **Frontend** | HTML5, CSS3, JavaScript | User interface |
| **Storage** | LocalStorage (browser) + JSON file (server) | Memory persistence |
| **Deployment** | Render | Cloud hosting |
| **Version Control** | Git & GitHub | Source control |

---

## 📁 Project Structure
pseudo-help-working/
├── public/
│ └── index.html # Main frontend application (Premium UI)
├── server.js # Backend server with AI agents
├── package.json # Dependencies and scripts
├── .env # Environment variables (API keys)
├── render.yaml # Render deployment configuration
├── memory.json # Persistent memory storage (auto-generated)
└── README.md # Project documentation
---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Groq API Key** - [Get free key here](https://console.groq.com/keys)

### Local Installation

```bash
# 1. Clone the repository
git clone https://github.com/AnandRajGarv/pseudo-help-working.git
cd pseudo-help-working

# 2. Install dependencies
npm install

# 3. Create .env file with your API key
echo GROQ_API_KEY=your_groq_api_key_here > .env

# 4. Start the server
node server.js

# 5. Open your browser
open http://localhost:3000
