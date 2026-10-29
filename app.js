// NxtWave AI Workshop Growth Platform - Core Interactive Engine

// --- Global State ---
const state = {
  activeTab: 'evaluator',
  studentName: 'Sneha Sri',
  college: 'B.Tech Final Year',
  referrals: 2,
  referralCode: 'SNEHA-AI-2026',
  whatsappStage: 'welcome'
};

// --- Presets for AI Project Evaluator ---
const presets = {
  todo: {
    title: 'Task Manager / To-Do App with User Authentication',
    stack: 'React, Node.js, Express, MongoDB',
    branch: 'CSE/IT - SDE Role',
    desc: 'A full-stack CRUD web application where users can register, log in, create tasks, edit tasks, mark as complete, and delete tasks.',
    deploy: 'local'
  },
  ml_spam: {
    title: 'SMS Spam Detection using Machine Learning',
    stack: 'Python, Scikit-Learn, Naive Bayes, NLTK',
    branch: 'AI/DS - AI Engineer',
    desc: 'Trained a Multinomial Naive Bayes classifier on the SMS Spam Collection dataset with TF-IDF vectorizer. Outputs 98% accuracy in Jupyter notebook.',
    deploy: 'local'
  },
  agentic: {
    title: 'Multimodal Research Copilot with Gemini 1.5 Flash & RAG',
    stack: 'Python, Google Gemini API, Streamlit, ChromaDB',
    branch: 'AI/DS - AI Engineer',
    desc: 'An autonomous agent that ingests research PDFs, extracts multimodal diagrams, and synthesizes executive summaries with zero hallucination citations.',
    deploy: 'deployed'
  }
};

// --- Tab Switching Logic ---
function switchTab(tabId) {
  state.activeTab = tabId;
  
  // Hide all views
  document.querySelectorAll('.tab-view').forEach(view => {
    view.classList.add('hidden');
    view.classList.remove('block');
  });

  // Show selected view
  const targetView = document.getElementById(`view-${tabId}`);
  if (targetView) {
    targetView.classList.remove('hidden');
    targetView.classList.add('block');
  }

  // Update Desktop tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.classList.add('text-slate-400');
  });
  const activeBtn = document.getElementById(`tab-btn-${tabId}`);
  if (activeBtn) {
    activeBtn.classList.add('active');
    activeBtn.classList.remove('text-slate-400');
  }

  // Update Mobile tab buttons
  document.querySelectorAll('.mobile-tab-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.classList.add('text-slate-400');
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
      btn.classList.remove('text-slate-400');
    }
  });

  // Reinitialize icons in newly visible view
  if (window.lucide) {
    lucide.createIcons();
  }
}

// --- Presets Handler ---
function loadPreset(key) {
  const p = presets[key];
  if (!p) return;

  document.getElementById('eval-title').value = p.title;
  document.getElementById('eval-stack').value = p.stack;
  document.getElementById('eval-branch').value = p.branch;
  document.getElementById('eval-desc').value = p.desc;

  const deployRadios = document.getElementsByName('deploy-status');
  for (let r of deployRadios) {
    if (r.value === p.deploy) r.checked = true;
  }

  runEvaluation();
}

// --- AI Project Evaluation Algorithm ---
function runEvaluation() {
  const title = (document.getElementById('eval-title').value || '').toLowerCase();
  const stack = (document.getElementById('eval-stack').value || '').toLowerCase();
  const desc = (document.getElementById('eval-desc').value || '').toLowerCase();
  
  let isDeployed = false;
  const deployRadios = document.getElementsByName('deploy-status');
  for (let r of deployRadios) {
    if (r.checked && r.value === 'deployed') isDeployed = true;
  }

  // Heuristic Keyword Analysis
  const hasModernAI = title.includes('gemini') || title.includes('llm') || title.includes('agent') || title.includes('rag') || 
                      stack.includes('gemini') || stack.includes('langchain') || stack.includes('genai') || desc.includes('multimodal');
  
  const hasLegacyML = title.includes('naive bayes') || title.includes('spam') || title.includes('sentiment') || 
                      title.includes('attendance') || stack.includes('opencv') || stack.includes('scikit');

  const isGenericCRUD = title.includes('to-do') || title.includes('task') || title.includes('crud') || 
                        title.includes('weather') || title.includes('calculator') || title.includes('clone');

  let score = 38;
  let aiScore = 15;
  let indScore = 40;
  let depScore = isDeployed ? 70 : 20;
  let verdictTitle = 'High Rejection Risk (Generic 2018 Template)';
  let verdictColor = 'text-rose-400';
  let badgeColor = 'bg-rose-500/10 text-rose-400';
  let verdictSub = 'Over 70% of final-year engineering resumes have this exact template. Recruiters skip it in under 6 seconds.';
  let redFlags = [];
  let upgradeIdea = '';

  if (hasModernAI && isDeployed) {
    score = 94;
    aiScore = 95;
    indScore = 92;
    depScore = 95;
    verdictTitle = 'Tier-1 Recruiter Magnet (Top 2% Profile)';
    verdictColor = 'text-emerald-400';
    verdictSub = 'Outstanding! Modern GenAI architecture with live URL and quantifiable metrics. This directly lands product-company interviews.';
    redFlags = [
      'None detected! Project demonstrates production LLM integration.',
      'Strong differentiator: Live link allows hiring managers to test instantly.',
      'Includes stateful context handling and structured multimodal output.'
    ];
    upgradeIdea = 'Add Latency Benchmarking (p95 response times) & Token Cost Analytics to make it 100/100!';
  } else if (hasModernAI && !isDeployed) {
    score = 68;
    aiScore = 80;
    indScore = 75;
    depScore = 30;
    verdictTitle = 'Promising AI Concept, But Lacks Live Proof';
    verdictColor = 'text-amber-400';
    verdictSub = 'The GenAI idea is great, but running only on localhost severely hurts placement credibility. Recruiters never run code locally.';
    redFlags = [
      'Localhost Only: Interviewers cannot test your app while reviewing your resume.',
      'Missing Automated CI/CD deployment on Streamlit/Vercel.',
      'Need to highlight token usage and latency optimization in resume bullets.'
    ];
    upgradeIdea = 'Deploy live on Streamlit Cloud + Vercel in 15 mins during our Sunday workshop!';
  } else if (hasLegacyML) {
    score = 42;
    aiScore = 25;
    indScore = 45;
    depScore = isDeployed ? 60 : 20;
    verdictTitle = 'High Rejection Risk (Obsolete 2017 ML Tutorial)';
    verdictColor = 'text-rose-400';
    verdictSub = 'OpenCV attendance / Naive Bayes spam classifiers are considered copy-pasted college tutorial projects by technical interviewers.';
    redFlags = [
      'Obsolete Tech: Pre-LLM classical algorithms have near-zero hiring premium in 2026.',
      'High Plagiarism Association: Found in thousands of GitHub student repositories.',
      'Zero Cloud API or modern SaaS integration.'
    ];
    upgradeIdea = 'Upgrade to "Multimodal Face & Identity Verification Agent with Gemini Vision API" in 60 Mins!';
  } else {
    // Generic CRUD or basic app
    score = isDeployed ? 48 : 34;
    aiScore = 10;
    indScore = 35;
    depScore = isDeployed ? 60 : 15;
    verdictTitle = 'Critical Vulnerability (Generic CRUD Application)';
    verdictColor = 'text-rose-400';
    verdictSub = 'Basic To-Do, Weather, or CRUD apps scream "first year beginner" to tech recruiters hiring final-year engineers.';
    redFlags = [
      'Zero AI Integration: In 2026, tech companies prioritize candidates with GenAI literacy.',
      'No Algorithmic Complexity: Lacks data pipeline, embeddings, or agentic reasoning.',
      'Resume Bullet Deficit: Cannot demonstrate business impact or ROI.'
    ];
    upgradeIdea = 'Transform this into an "Autonomous AI Task Prioritization & Execution Agent" in 60 mins!';
  }

  // Update UI Elements
  document.getElementById('eval-score-num').innerHTML = `${score}<span class="text-xs text-slate-500 font-normal">/100</span>`;
  document.getElementById('eval-score-num').className = `text-3xl font-extrabold ${verdictColor} font-mono`;
  document.getElementById('eval-verdict-title').className = `text-xl font-extrabold ${verdictColor} flex items-center gap-2 mt-0.5`;
  document.getElementById('eval-verdict-title').innerHTML = `<i data-lucide="${score > 75 ? 'check-circle' : 'alert-triangle'}" class="w-5 h-5 ${verdictColor}"></i> ${verdictTitle}`;
  document.getElementById('eval-verdict-subtitle').innerText = verdictSub;

  // Bars
  document.getElementById('metric-ai').innerText = `${aiScore}%`;
  document.getElementById('bar-ai').style.width = `${aiScore}%`;
  document.getElementById('bar-ai').className = `h-full ${aiScore > 70 ? 'bg-emerald-500' : aiScore > 40 ? 'bg-amber-500' : 'bg-rose-500'} transition-all duration-500`;

  document.getElementById('metric-ind').innerText = `${indScore}%`;
  document.getElementById('bar-ind').style.width = `${indScore}%`;
  document.getElementById('bar-ind').className = `h-full ${indScore > 70 ? 'bg-emerald-500' : indScore > 40 ? 'bg-amber-500' : 'bg-rose-500'} transition-all duration-500`;

  document.getElementById('metric-dep').innerText = `${depScore}%`;
  document.getElementById('bar-dep').style.width = `${depScore}%`;
  document.getElementById('bar-dep').className = `h-full ${depScore > 70 ? 'bg-emerald-500' : depScore > 40 ? 'bg-amber-500' : 'bg-rose-500'} transition-all duration-500`;

  // Red Flags
  const flagsContainer = document.getElementById('eval-red-flags');
  flagsContainer.innerHTML = redFlags.map(rf => `
    <li class="flex items-start gap-2 ${score > 75 ? 'bg-emerald-950/20 border-emerald-900/30' : 'bg-rose-950/20 border-rose-900/30'} border p-2.5 rounded-lg">
      <i data-lucide="${score > 75 ? 'check-circle' : 'x-circle'}" class="w-4 h-4 ${score > 75 ? 'text-emerald-400' : 'text-rose-400'} shrink-0 mt-0.5"></i>
      <span>${rf}</span>
    </li>
  `).join('');

  // Upgrade Solution
  const upgradeContainer = document.getElementById('eval-upgrade-solution');
  upgradeContainer.innerHTML = `
    <p class="font-semibold text-white">
      Recommended NxtWave 60-Minute Transformation: <br>
      <span class="text-cyan-400 text-base">${upgradeIdea}</span>
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-2">
      <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-cyan-400"></i> Free Gemini 1.5 Flash API</div>
      <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-cyan-400"></i> Zero-Config Streamlit Cloud Deploy</div>
      <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-cyan-400"></i> Verifiable GitHub Repo + README Badge</div>
      <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-cyan-400"></i> 3 Tailored Resume Bullets with Metrics</div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

// --- Referral Engine Operations ---
function copyReferralLink() {
  const link = document.getElementById('ref-link-input').value;
  navigator.clipboard.writeText(link).then(() => {
    const btn = document.getElementById('btn-copy-link');
    btn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> <span class="text-emerald-400">Copied!</span>`;
    if (window.lucide) lucide.createIcons();
    setTimeout(() => {
      btn.innerHTML = `<i data-lucide="copy" class="w-3.5 h-3.5"></i> <span>Copy</span>`;
      if (window.lucide) lucide.createIcons();
    }, 2000);
  });
}

function simulateWhatsAppShare() {
  const text = `Hey guys! 👋 Placement season is brutal with 0 AI projects on our resume.\n\nNxtWave is hosting a FREE 60-min live workshop this Sunday: "Build Your First AI Project in 60 Mins"!\nWe build & deploy live with Gemini API. No paid GPU needed.\n\nRegister via my batch link: ${document.getElementById('ref-link-input').value}`;
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

function simulateAddReferral() {
  if (state.referrals >= 5) {
    alert("You have already reached the maximum milestone (5 referrals) for this simulation!");
    return;
  }

  state.referrals += 1;
  updateReferralUI();
}

function updateReferralUI() {
  const count = state.referrals;
  document.getElementById('ref-count-display').innerText = count;
  document.getElementById('user-leaderboard-count').innerText = count;

  // Update progress bar (0 to 5 friends => 0% to 100%)
  const percentage = Math.min(100, Math.round((count / 5) * 100));
  document.getElementById('ref-progress-bar').style.width = `${percentage}%`;

  // Milestone 2 (3 friends)
  const m2 = document.getElementById('milestone-2');
  const m2Status = document.getElementById('m2-status');
  if (count >= 3) {
    m2.className = 'p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/20 text-xs';
    m2Status.className = 'font-semibold text-emerald-400 text-[11px] mt-0.5';
    m2Status.innerText = 'Unlocked! 🎉';
  } else {
    m2.className = 'p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs';
    m2Status.className = 'font-semibold text-amber-400 text-[11px] mt-0.5';
    m2Status.innerText = `Need ${3 - count} more`;
  }

  // Milestone 3 (5 friends)
  const m3 = document.getElementById('milestone-3');
  const m3Status = document.getElementById('m3-status');
  if (count >= 5) {
    m3.className = 'p-2.5 rounded-xl border border-amber-500/40 bg-amber-950/20 text-xs';
    m3Status.className = 'font-semibold text-amber-400 text-[11px] mt-0.5';
    m3Status.innerText = 'Leaderboard Top! 🏆';
  } else {
    m3.className = 'p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs';
    m3Status.className = 'font-semibold text-slate-400 text-[11px] mt-0.5';
    m3Status.innerText = `Need ${5 - count} more`;
  }
}

// --- WhatsApp Bot Conversations Data ---
const whatsappStages = {
  welcome: {
    messages: [
      {
        from: 'bot',
        text: '🎉 Hi Sneha! Welcome to the 60-Minute AI Project Workshop with NxtWave.\n\n📅 Date: This Sunday, 11:00 AM IST\n🚀 Mission: Build & deploy your live AI project before 12:00 PM!\n\nTap below to add it directly to your calendar so you don’t miss the joining link.',
        time: '10:02 AM'
      },
      {
        from: 'bot',
        text: '💡 Want to unlock the "50+ GenAI Placement Resume Bullet Points PDF"? Invite 1 batchmate with your link:\nnxtwave.tech/ai60?ref=SNEHA-AI-2026',
        time: '10:02 AM'
      }
    ],
    buttons: [
      { text: '📅 Add to Google Calendar (.ics)', action: 'cal' },
      { text: '👥 Share Link with Class WhatsApp', action: 'share' }
    ]
  },
  prep: {
    messages: [
      {
        from: 'bot',
        text: '⚡ [Quick 90-Sec Pre-Work] Hey Sneha, our workshop is in 2 days!\n\nTo ensure you deploy in 60 mins without delays, grab your FREE Google Gemini API key right now:\n🔗 aistudio.google.com\n\n(No credit card required. 100% free forever for students).',
        time: 'Yesterday, 6:30 PM'
      },
      {
        from: 'user',
        text: 'Done! I generated my Gemini API key and saved it in notepad 👍',
        time: 'Yesterday, 6:38 PM'
      },
      {
        from: 'bot',
        text: 'Awesome! You’re ahead of 80% of students. We have reserved your interactive code sandbox.',
        time: 'Yesterday, 6:39 PM'
      }
    ],
    buttons: [
      { text: '✅ I have my API Key ready', action: 'key_ready' },
      { text: '❓ How do I get Gemini API Key?', action: 'key_help' }
    ]
  },
  reminder: {
    messages: [
      {
        from: 'bot',
        text: '🚨 STARTS IN 60 MINUTES!\n\n"Build Your First AI Project in 60 Minutes" goes live at 11:00 AM sharp.\n\nRoom Link: https://nxtwave.tech/live-room-74\nAccess PIN: 884-219\n\n💻 Laptop recommended. Let’s get an AI project deployed on your GitHub today!',
        time: '10:00 AM'
      }
    ],
    buttons: [
      { text: '🔗 Enter Live Workshop Room', action: 'enter_room' },
      { text: '📥 Open GitHub Code Boilerplate', action: 'open_repo' }
    ]
  },
  live: {
    messages: [
      {
        from: 'bot',
        text: '🔴 Live Build Checkpoint (Minute 25):\n\nWe just finished the Gemini API streaming logic! If you encounter a `ResourceExhausted` error, switch to model `gemini-1.5-flash-8b`.\n\nNeed the snippet? Tap below:',
        time: '11:26 AM'
      }
    ],
    buttons: [
      { text: '📋 Copy Minute 25 Code Snippet', action: 'copy_snippet' },
      { text: '🙋 Ask Live TA in Chat', action: 'ask_ta' }
    ]
  },
  submission: {
    messages: [
      {
        from: 'bot',
        text: '🎓 WORKSHOP COMPLETE! 🚀\n\nSneha, submit your live Streamlit/Vercel URL and GitHub repository link below to generate your Verified NxtWave AI Project Certificate + Recruiter Scorecard!',
        time: '12:05 PM'
      },
      {
        from: 'user',
        text: 'https://github.com/SNEHA-1014/campus-ai-copilot\nLive URL: https://campus-ai-copilot.streamlit.app',
        time: '12:08 PM'
      },
      {
        from: 'bot',
        text: '✅ Verified! Your AI project is live and accessible globally. Generating your credential badge...',
        time: '12:08 PM'
      }
    ],
    buttons: [
      { text: '📜 Download Certificate of Completion', action: 'cert' },
      { text: '💼 Copy 3 Resume Bullets for Placements', action: 'bullets' }
    ]
  }
};

function changeWhatsAppStage(stageKey) {
  state.whatsappStage = stageKey;
  const selectElem = document.getElementById('wa-stage-select');
  if (selectElem) selectElem.value = stageKey;

  const stageData = whatsappStages[stageKey];
  if (!stageData) return;

  const chatContainer = document.getElementById('wa-chat-container');
  chatContainer.innerHTML = stageData.messages.map(m => {
    if (m.from === 'bot') {
      return `
        <div class="flex flex-col items-start max-w-[85%]">
          <div class="wa-bubble-received p-2.5 text-xs whitespace-pre-line leading-relaxed">
            ${m.text}
            <div class="text-[9px] text-slate-400 text-right mt-1 font-mono">${m.time}</div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="flex flex-col items-end max-w-[85%] ml-auto">
          <div class="wa-bubble-sent p-2.5 text-xs whitespace-pre-line leading-relaxed">
            ${m.text}
            <div class="text-[9px] text-slate-300 text-right mt-1 font-mono flex items-center justify-end gap-1">
              <span>${m.time}</span>
              <i data-lucide="check-check" class="w-3 h-3 text-cyan-300"></i>
            </div>
          </div>
        </div>
      `;
    }
  }).join('');

  // Render Action Buttons
  const actionBar = document.getElementById('wa-action-bar');
  actionBar.innerHTML = stageData.buttons.map(b => `
    <button onclick="handleWhatsAppBtnClick('${b.action}')" class="w-full bg-[#2a3942] hover:bg-[#32444f] text-cyan-300 text-[11px] font-semibold py-2 px-3 rounded-lg border border-slate-700/60 flex items-center justify-center gap-1.5 transition-all">
      ${b.text}
    </button>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

function handleWhatsAppBtnClick(action) {
  if (action === 'cal') {
    alert("Simulation: Calendar event (.ics) synced to Google Calendar for Sunday at 11:00 AM IST!");
  } else if (action === 'share') {
    simulateWhatsAppShare();
  } else if (action === 'key_ready') {
    alert("Simulation: Your response has been recorded. Pre-workshop checklist marked 100% complete!");
  } else if (action === 'enter_room') {
    alert("Simulation: Directing to live workshop stream (YouTube Live / Zoom embedded)!");
  } else if (action === 'copy_snippet') {
    copyCodeSnippet();
  } else if (action === 'cert') {
    alert("Simulation: Verified Certificate #NW-AI-2026-9481 generated for Sneha Sri!");
  } else if (action === 'bullets') {
    alert("Simulation: 3 ATS-optimized resume bullet points copied to your clipboard!");
  } else {
    alert(`Action executed: ${action}`);
  }
}

// --- Quick Registration Simulator ---
function scrollToRegister() {
  const modal = document.getElementById('reg-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeRegisterModal() {
  const modal = document.getElementById('reg-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function submitRegistration() {
  const name = document.getElementById('reg-name').value;
  const phone = document.getElementById('reg-phone').value;
  const college = document.getElementById('reg-college').value;

  if (!name) return;

  state.studentName = name;
  state.college = college;
  const codePrefix = name.split(' ')[0].toUpperCase();
  state.referralCode = `${codePrefix}-AI-2026`;

  // Update UI references
  document.getElementById('ref-student-name').innerText = name;
  document.getElementById('ref-link-input').value = `https://nxtwave.tech/ai60?ref=${state.referralCode}`;

  closeRegisterModal();
  switchTab('referral');

  alert(`🎉 Registration Simulated Successfully!\nWelcome ${name}! Your custom referral link has been generated. Check Tab 2 to see your Milestone perks!`);
}

// --- Code Snippet Copier ---
function copyCodeSnippet() {
  const code = `import streamlit as st
import google.generativeai as genai
import os

# 1. Initialize Page & Clean UI
st.set_page_config(page_title="CampusAI Copilot", page_icon="🤖", layout="centered")
st.title("⚡ CampusAI: Instant Resume & Project Co-Pilot")
st.caption("Built live in 60 minutes with NxtWave • Powered by Gemini 1.5 Flash")

# 2. Free Google Gemini API Setup
api_key = st.sidebar.text_input("Enter Free Gemini API Key", type="password")
if not api_key:
    st.info("👉 Get your free key at: aistudio.google.com")
    st.stop()

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

# 3. Interactive User Input
project_idea = st.text_area("Paste your college project summary or resume bullet:")

if st.button("🚀 Upgrade My Project with GenAI"):
    with st.spinner("Synthesizing recruiter-grade architecture..."):
        prompt = f"Analyze this final-year project: '{project_idea}'. Provide: 1. A recruiter score (1-100), 2. An advanced GenAI upgrade using agents/RAG, 3. Three quantified resume bullets."
        response = model.generate_content(prompt)
        st.success("Project Transformation Complete!")
        st.markdown(response.text)`;

  navigator.clipboard.writeText(code).then(() => {
    const btn = document.getElementById('btn-copy-code');
    if (btn) {
      btn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> <span class="text-emerald-400">Code Copied!</span>`;
      if (window.lucide) lucide.createIcons();
      setTimeout(() => {
        btn.innerHTML = `<i data-lucide="copy" class="w-3.5 h-3.5"></i> <span>Copy Code</span>`;
        if (window.lucide) lucide.createIcons();
      }, 2000);
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  runEvaluation();
  changeWhatsAppStage('welcome');
  updateReferralUI();
});
