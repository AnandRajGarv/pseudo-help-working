import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ============ PERSISTENT MEMORY STORAGE ============
let memory = [];
let sessionHistory = [];
const MEMORY_FILE = 'memory.json';

// Load memory from file on startup
try {
  if (fs.existsSync(MEMORY_FILE)) {
    const data = fs.readFileSync(MEMORY_FILE, 'utf8');
    const loaded = JSON.parse(data);
    memory = loaded.memory || [];
    sessionHistory = loaded.sessionHistory || [];
    console.log(`📀 Loaded ${memory.length} memories from file`);
  }
} catch (error) {
  console.log("No existing memory file found, starting fresh");
}

// Save memory to file
function saveMemory() {
  try {
    fs.writeFileSync(MEMORY_FILE, JSON.stringify({ memory, sessionHistory }, null, 2));
    console.log("💾 Memory saved to file");
  } catch (error) {
    console.error("Failed to save memory:", error.message);
  }
}

// ============ TOOL 1: Study Time Calculator ============
function getStudyTime(goal) {
  const goalLower = goal.toLowerCase();
  if (goalLower.includes("dsa") || goalLower.includes("data structures")) return "2-3 hours/day";
  if (goalLower.includes("react")) return "2 hours/day";
  if (goalLower.includes("python")) return "1.5 hours/day";
  if (goalLower.includes("javascript")) return "2 hours/day";
  if (goalLower.includes("machine learning")) return "2-3 hours/day";
  if (goalLower.includes("java")) return "2 hours/day";
  if (goalLower.includes("web development")) return "2-3 hours/day";
  return "1-2 hours/day";
}

// ============ TOOL 2: Resource Finder ============
function getResources(goal) {
  const goalLower = goal.toLowerCase();
  const resources = {
    dsa: ["LeetCode", "GeeksforGeeks", "NeetCode YouTube", "AlgoExpert", "Coursera DSA Specialization"],
    react: ["React Official Docs", "JavaScript Mastery YouTube", "Frontend Mentor", "Scrimba", "React Beta Docs"],
    python: ["Python.org", "Real Python", "Automate the Boring Stuff", "Codecademy", "PyCharm Tutorials"],
    javascript: ["MDN Web Docs", "JavaScript.info", "freeCodeCamp", "The Odin Project", "JavaScript30"],
    ml: ["Kaggle", "Fast.ai", "Andrew Ng Course", "TensorFlow Playground", "Hugging Face"],
    webdev: ["freeCodeCamp", "The Odin Project", "Frontend Masters", "CSS Tricks", "Web.dev"]
  };
  
  if (goalLower.includes("dsa")) return resources.dsa;
  if (goalLower.includes("react")) return resources.react;
  if (goalLower.includes("python")) return resources.python;
  if (goalLower.includes("javascript")) return resources.javascript;
  if (goalLower.includes("machine learning")) return resources.ml;
  if (goalLower.includes("web")) return resources.webdev;
  
  return ["YouTube Tutorials", "Google Search", "Documentation", "Stack Overflow", "Online Courses"];
}

// ============ TOOL 3: Difficulty Estimator ============
function getDifficulty(goal) {
  const goalLower = goal.toLowerCase();
  if (goalLower.includes("dsa") || goalLower.includes("machine learning")) return "Advanced 🔥";
  if (goalLower.includes("react") || goalLower.includes("javascript")) return "Intermediate 📈";
  if (goalLower.includes("python")) return "Beginner Friendly 🌱";
  if (goalLower.includes("web")) return "Beginner to Intermediate 📚";
  return "Moderate ⚡";
}

// ============ TOOL 4: Prerequisite Checker ============
function getPrerequisites(goal) {
  const goalLower = goal.toLowerCase();
  if (goalLower.includes("react")) return ["HTML basics", "CSS fundamentals", "JavaScript ES6+"];
  if (goalLower.includes("dsa")) return ["Basic programming concepts", "Any programming language"];
  if (goalLower.includes("machine learning")) return ["Python basics", "Mathematics (Linear Algebra, Calculus)"];
  if (goalLower.includes("javascript")) return ["Basic HTML/CSS", "Understanding of programming logic"];
  return ["Basic computer knowledge", "Willingness to learn"];
}

// ============ TOOL 5: Project Idea Generator ============
function getProjectIdeas(goal) {
  const goalLower = goal.toLowerCase();
  if (goalLower.includes("react")) return ["Todo App", "Weather Dashboard", "E-commerce Cart", "Portfolio Website", "Blog Platform"];
  if (goalLower.includes("python")) return ["Calculator", "Password Generator", "Web Scraper", "To-Do List App", "Quiz Game"];
  if (goalLower.includes("dsa")) return ["Sorting Visualizer", "Pathfinding Algorithm", "Expression Evaluator", "Cache Implementation"];
  if (goalLower.includes("javascript")) return ["Interactive Form", "Color Picker", "Analog Clock", "Memory Game", "Drag & Drop"];
  return ["Personal Website", "Blog Platform", "Portfolio Project", "Automation Script"];
}

// ============ RETRY MECHANISM ============
async function retryAPI(fn, retries = 2, delay = 1000) {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    console.log(`🔄 Retrying... (${retries} attempts left)`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryAPI(fn, retries - 1, delay);
  }
}

// ============ PLANNER AGENT ============
async function plannerAgent(goal, context) {
  const systemPrompt = `You are Pseudo Help, an expert AI study planner. Create DETAILED, ACTIONABLE study plans.

Return a well-formatted plan with these sections:
📚 **Learning Path**
🎯 **Daily Breakdown (Day 1-7)**
✅ **Weekly Milestones**
📖 **Recommended Resources**
💡 **Pro Tips**
⭐ **Motivation**

Make it practical, beginner-friendly, and specific to the goal.`;

  const userPrompt = `
User's learning history: ${context.memory.join(", ") || "First time learner"}
Current goal: ${goal}
Difficulty: ${context.difficulty}
Study time: ${context.studyTime}
Prerequisites: ${context.prerequisites.join(", ")}
Project ideas: ${context.projectIdeas.slice(0, 3).join(", ")}

Create a comprehensive study plan.`;

  const response = await groq.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
  });
  
  return response.choices[0]?.message?.content || "Plan generated successfully!";
}

// ============ CRITIC AGENT (Self-Improvement) ============
async function criticAgent(plan, goal) {
  const systemPrompt = `You are an expert AI critic. Review and IMPROVE study plans.
Make them MORE:
- Practical and actionable
- Beginner-friendly
- Time-efficient
- Engaging

Return the IMPROVED version of the plan.`;

  const userPrompt = `
Original plan for "${goal}":
${plan}

Please improve this plan with better daily tasks, more specific resources, and additional motivation.`;

  const response = await groq.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
  });
  
  return response.choices[0]?.message?.content || plan;
}

// ============ SIMPLE AGENT (No loop) ============
async function simpleAgent(goal, context) {
  const systemPrompt = `You are a study planner. Create a simple, practical 7-day study plan.`;
  
  const userPrompt = `Create a study plan for a beginner learning: ${goal}
Study time: ${context.studyTime}
Resources: ${context.resources.slice(0, 3).join(", ")}`;

  const response = await groq.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
  });
  
  return response.choices[0]?.message?.content || "Plan generated!";
}

// ============ MAIN AGENT FUNCTION ============
async function pseudoHelpAgent(goal, agentMode = true) {
  // Add to memory
  memory.push(goal);
  sessionHistory.push({ goal, timestamp: new Date().toISOString() });
  saveMemory();
  
  console.log(`📝 Memory: ${memory.length} goal(s) stored`);
  console.log(`📊 Session: ${sessionHistory.length} total sessions`);
  
  // Gather tool data
  const context = {
    memory: memory,
    studyTime: getStudyTime(goal),
    resources: getResources(goal),
    difficulty: getDifficulty(goal),
    prerequisites: getPrerequisites(goal),
    projectIdeas: getProjectIdeas(goal)
  };
  
  console.log(`🔧 Tools used: Study Time, Resources, Difficulty, Prerequisites, Projects`);
  
  let plan;
  const thinkingSteps = ["🔍 Analyzing goal complexity..."];
  
  if (agentMode) {
    // FULL AUTONOMOUS MODE: Planner + Critic
    thinkingSteps.push("📝 Planner agent creating initial structure...");
    console.log("🤖 Running FULL AUTONOMOUS mode (Planner + Critic)");
    
    plan = await retryAPI(() => plannerAgent(goal, context));
    thinkingSteps.push("✅ Initial plan created");
    
    thinkingSteps.push("🔍 Critic agent reviewing and improving...");
    console.log("🔍 Running Critic agent for self-improvement");
    
    plan = await retryAPI(() => criticAgent(plan, goal));
    thinkingSteps.push("✅ Plan improved by Critic agent");
    
  } else {
    // SIMPLE MODE: Single generation
    thinkingSteps.push("📝 Generating simple plan...");
    console.log("⚡ Running SIMPLE mode");
    
    plan = await retryAPI(() => simpleAgent(goal, context));
    thinkingSteps.push("✅ Plan generated");
  }
  
  thinkingSteps.push(`📚 Recommended ${context.resources.length} resources`);
  thinkingSteps.push(`⏰ Estimated study time: ${context.studyTime}`);
  thinkingSteps.push(`📊 Difficulty level: ${context.difficulty}`);
  thinkingSteps.push(`✅ Ready to start learning!`);
  
  console.log("✅ Plan generated successfully!");
  
  return {
    plan: plan,
    thinkingSteps: thinkingSteps,
    metadata: {
      studyTime: context.studyTime,
      resourcesCount: context.resources.length,
      difficulty: context.difficulty,
      prerequisites: context.prerequisites,
      projectIdeas: context.projectIdeas,
      memorySize: memory.length,
      sessionsCount: sessionHistory.length,
      mode: agentMode ? "autonomous" : "simple"
    }
  };
}

// ============ API ENDPOINTS ============

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: '✅ API is working!', 
    time: new Date().toISOString(),
    memorySize: memory.length,
    status: 'active'
  });
});

// Main plan endpoint
app.post('/api/plan', async (req, res) => {
  console.log(`\n📥 Request received at: ${new Date().toLocaleTimeString()}`);
  
  try {
    const { goal, agentMode = true } = req.body;
    
    if (!goal) {
      return res.status(400).json({ error: 'Goal is required' });
    }
    
    console.log(`🎯 Goal: ${goal}`);
    console.log(`🤖 Mode: ${agentMode ? 'FULL AUTONOMOUS (Planner + Critic)' : 'SIMPLE'}`);
    
    const result = await pseudoHelpAgent(goal, agentMode);
    
    console.log(`✅ Sending response (${result.plan.length} chars)`);
    
    res.json({ 
      plan: result.plan,
      thinkingSteps: result.thinkingSteps,
      metadata: result.metadata
    });
    
  } catch (error) {
    console.error('❌ Server Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Clear memory endpoint
app.post('/api/clear-memory', (req, res) => {
  memory = [];
  sessionHistory = [];
  saveMemory();
  console.log("🧹 Memory cleared!");
  res.json({ 
    message: "Memory cleared successfully",
    memorySize: 0
  });
});

// Get stats endpoint
app.get('/api/stats', (req, res) => {
  res.json({
    memorySize: memory.length,
    sessions: sessionHistory.length,
    goals: memory,
    lastSession: sessionHistory[sessionHistory.length - 1] || null
  });
});

// Get resources for a goal
app.post('/api/resources', (req, res) => {
  const { goal } = req.body;
  const resources = getResources(goal);
  res.json({ resources });
});

// ============ START SERVER ============
app.listen(PORT, () => {
  console.log(`\n🚀 Pseudo Help running on http://localhost:${PORT}`);
  console.log(`📁 Test API: http://localhost:${PORT}/api/test`);
  console.log(`📊 Stats: http://localhost:${PORT}/api/stats`);
  console.log(`🌐 Open: http://localhost:${PORT}\n`);
  console.log(`💡 Features:`);
  console.log(`   - Multi-Agent System (Planner + Critic)`);
  console.log(`   - 5 Specialized Tools`);
  console.log(`   - Persistent Memory Storage`);
  console.log(`   - Retry Mechanism for API Calls`);
  console.log(`   - Session History Tracking\n`);
});