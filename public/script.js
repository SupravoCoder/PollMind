/**
 * PollMind — Main Application Logic (Desktop Version)
 */

const PAGE_TITLES = {
    home: "Welcome to PollMind",
    chat: "Chat with PollMind",
    learn: "Learn Hub",
    quiz: "Quiz Arena",
    election: "Election Mode",
    profile: "Your Profile"
};

const TOPIC_ICONS = [
    "fa-person-booth", "fa-microchip", "fa-user-group",
    "fa-id-card", "fa-ban", "fa-landmark", "fa-house-chimney", "fa-child"
];

// ═══ STATE ═══
const state = {
    lang: localStorage.getItem('pm-lang') || 'en',
    screen: 'chat',
    quiz: { current: 0, score: 0, questions: [], answered: false },
    stats: JSON.parse(localStorage.getItem('pm-stats') || '{"chats":0,"quizzes":0,"streak":0,"bestScore":0,"xp":0}')
};
function saveStats() { localStorage.setItem('pm-stats', JSON.stringify(state.stats)); }

// ═══ LANGUAGE ═══
function label(key) {
    return (LANGUAGES[state.lang] && LANGUAGES[state.lang].labels[key]) || LANGUAGES.en.labels[key] || key;
}
function applyLanguage() {
    document.querySelectorAll('[data-label]').forEach(el => {
        el.textContent = label(el.getAttribute('data-label'));
    });
    const ci = document.getElementById('chat-input');
    if (ci) ci.placeholder = label('askMe');
    document.querySelectorAll('.lang-option').forEach(b => b.classList.toggle('active', b.dataset.lang === state.lang));
    renderLanguageGrid();
}
function setLanguage(lang) {
    state.lang = lang;
    localStorage.setItem('pm-lang', lang);
    applyLanguage();
    document.getElementById('lang-dropdown').classList.add('hidden');
}

// ═══ NAVIGATION ═══
function switchScreen(name) {
    state.screen = name;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-' + name).classList.add('active');
    document.querySelectorAll('.sidebar-item').forEach(n => {
        const isA = n.dataset.screen === name;
        n.classList.toggle('active', isA);
        n.setAttribute('aria-selected', isA);
    });
    document.getElementById('page-title').textContent = PAGE_TITLES[name] || name;
    if (name === 'election') renderElectionTab('guide');
}

// ═══ CHAT ═══
function addMessage(text, isBot) {
    const c = document.getElementById('chat-messages');
    const d = document.createElement('div');
    d.className = 'msg ' + (isBot ? 'msg-bot' : 'msg-user');
    d.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    c.appendChild(d);
    c.scrollTop = c.scrollHeight;
}
function findResponse(input) {
    const l = input.toLowerCase();
    for (const e of CHAT_RESPONSES) {
        if (e.keywords.some(k => l.includes(k))) return e.response;
    }
    return DEFAULT_RESPONSE.response;
}
function handleChat() {
    const inp = document.getElementById('chat-input');
    const t = inp.value.trim();
    if (!t) return;
    addMessage(t, false);
    inp.value = '';
    state.stats.chats++; state.stats.xp += 5; saveStats(); updateProfile();
    setTimeout(() => addMessage(findResponse(t), true), 400);
}
function renderQuickReplies() {
    const c = document.getElementById('quick-replies');
    c.innerHTML = '';
    QUICK_REPLIES.forEach(t => {
        const b = document.createElement('button');
        b.className = 'quick-chip'; b.textContent = t;
        b.addEventListener('click', () => { document.getElementById('chat-input').value = t; handleChat(); });
        c.appendChild(b);
    });
}
function renderTopicSidebar() {
    const c = document.getElementById('topic-list');
    if (!c) return;
    c.innerHTML = '';
    QUICK_REPLIES.forEach((t, i) => {
        const b = document.createElement('button');
        b.className = 'topic-btn';
        b.innerHTML = `<i class="fa-solid ${TOPIC_ICONS[i] || 'fa-circle-question'}"></i> ${t}`;
        b.addEventListener('click', () => { document.getElementById('chat-input').value = t; handleChat(); });
        c.appendChild(b);
    });
}

// ═══ LEARN ═══
function showLearnTopic(topic) {
    const content = document.getElementById('learn-content');
    content.classList.remove('hidden');
    let html = '<button class="learn-back" id="learn-back"><i class="fa-solid fa-arrow-left"></i> Back to topics</button>';
    if (topic === 'roles') {
        html += '<h3>Governance Roles in India</h3>';
        GOVERNANCE_ROLES.forEach(r => {
            html += `<div class="role-card"><div class="role-header"><div class="role-icon" style="background:${r.color}"><i class="fa-solid ${r.icon}"></i></div><span class="role-title">${r.title}</span><span class="role-level">${r.level}</span></div><div class="role-desc">${r.description}</div></div>`;
        });
    } else if (topic === 'myths') {
        html += '<h3>Myth Busters 🔍</h3>';
        MYTHS.forEach(m => {
            html += `<div class="myth-card"><div class="myth-label">❌ Myth</div><div class="myth-text">${m.myth}</div><div class="fact-label">✅ Fact</div><div class="fact-text">${m.fact}</div></div>`;
        });
    } else if (topic === 'process') {
        html += '<h3>Indian Election Process</h3>';
        const steps = [
            { n:1, t:'Voter Registration', d:'Citizens aged 18+ register on the Electoral Roll via NVSP or BLO to get their Voter ID (EPIC card).' },
            { n:2, t:'Election Announcement', d:'The ECI announces election dates and the Model Code of Conduct (MCC) comes into effect immediately.' },
            { n:3, t:'Nominations', d:'Candidates file nomination papers with affidavits. Papers are scrutinized and candidates can withdraw within the deadline.' },
            { n:4, t:'Campaigning', d:'Parties campaign through rallies, ads, and social media. Campaigning stops 48 hours before polling (silence period).' },
            { n:5, t:'Polling Day', d:'Voters cast votes using EVMs at assigned booths. VVPAT provides paper verification. Voting happens in phases.' },
            { n:6, t:'Counting & Results', d:'Votes are counted under tight security. The party/coalition with 272+ Lok Sabha seats forms the government.' }
        ];
        steps.forEach((s, i) => {
            html += `<div class="process-step"><div class="process-dot">${s.n}</div>${i < steps.length-1 ? '<div class="process-line"></div>':''}<div class="process-info"><h4>${s.t}</h4><p>${s.d}</p></div></div>`;
        });
    } else if (topic === 'simulation') {
        html += renderSimulation();
    }
    content.innerHTML = html;
    document.getElementById('learn-back').addEventListener('click', () => content.classList.add('hidden'));
    if (topic === 'simulation') initSimulation();
}

function renderSimulation() {
    let h = '<div class="sim-container"><h3 class="sim-title">🗳️ Mock Election — Cast Your Vote!</h3><p style="color:var(--text-muted);font-size:.9rem;margin-bottom:20px;">This is a simulation using the First Past The Post (FPTP) system used in India.</p><div class="sim-candidates" id="sim-candidates">';
    SIM_CANDIDATES.forEach((c, i) => {
        h += `<div class="sim-candidate" data-idx="${i}"><span class="sim-symbol">${c.symbol}</span><div><div class="sim-name">${c.name}</div><div class="sim-party">${c.party}</div><div class="sim-manifesto">"${c.manifesto}"</div></div></div>`;
    });
    h += '</div><button class="primary-btn" id="sim-vote-btn" disabled>Cast Your Vote</button><div id="sim-results"></div></div>';
    return h;
}

function initSimulation() {
    let sel = -1;
    const cards = document.querySelectorAll('.sim-candidate');
    const vBtn = document.getElementById('sim-vote-btn');
    cards.forEach(c => {
        c.addEventListener('click', () => {
            sel = parseInt(c.dataset.idx);
            cards.forEach(x => x.classList.remove('selected'));
            c.classList.add('selected');
            vBtn.disabled = false;
        });
    });
    vBtn.addEventListener('click', () => {
        if (sel < 0) return;
        vBtn.disabled = true;
        cards.forEach(c => c.style.pointerEvents = 'none');
        const votes = SIM_CANDIDATES.map(() => Math.floor(Math.random()*40000)+10000);
        votes[sel] += 5000;
        const total = votes.reduce((a,b)=>a+b,0);
        const wi = votes.indexOf(Math.max(...votes));
        let h = '<div class="sim-results"><h3 style="margin:20px 0 16px">📊 Results</h3>';
        SIM_CANDIDATES.forEach((c,i) => {
            const p = ((votes[i]/total)*100).toFixed(1);
            h += `<div class="sim-bar-container"><div class="sim-bar-label"><span>${c.symbol} ${c.name}</span><span>${votes[i].toLocaleString()} votes (${p}%)</span></div><div class="sim-bar"><div class="sim-bar-fill" style="width:0%;background:${c.color}" data-width="${p}%"></div></div></div>`;
        });
        h += `<div class="sim-winner">🏆 Winner: ${SIM_CANDIDATES[wi].name} (${SIM_CANDIDATES[wi].party})</div><p style="color:var(--text-muted);font-size:.85rem;margin-top:8px;">In FPTP, the candidate with the most votes wins — no minimum percentage needed!</p></div>`;
        document.getElementById('sim-results').innerHTML = h;
        setTimeout(() => document.querySelectorAll('.sim-bar-fill').forEach(b => b.style.width = b.dataset.width), 100);
        state.stats.xp += 15; saveStats(); updateProfile();
    });
}

// ═══ QUIZ ═══
function startQuiz() {
    const sh = [...QUIZ_QUESTIONS].sort(() => Math.random()-.5);
    state.quiz = { current:0, score:0, questions:sh.slice(0,5), answered:false };
    document.getElementById('quiz-start').classList.add('hidden');
    document.getElementById('quiz-results').classList.add('hidden');
    document.getElementById('quiz-play').classList.remove('hidden');
    renderQuestion();
}
function renderQuestion() {
    const q = state.quiz.questions[state.quiz.current], i = state.quiz.current, t = state.quiz.questions.length;
    document.getElementById('quiz-progress-fill').style.width = ((i/t)*100)+'%';
    document.getElementById('quiz-counter').textContent = `${i+1}/${t}`;
    document.getElementById('quiz-score').textContent = `${label('score')}: ${state.quiz.score}`;
    document.getElementById('quiz-question').textContent = q.question;
    document.getElementById('quiz-feedback').classList.add('hidden');
    document.getElementById('quiz-next').classList.add('hidden');
    state.quiz.answered = false;
    const oe = document.getElementById('quiz-options');
    oe.innerHTML = '';
    q.options.forEach((opt, idx) => {
        const b = document.createElement('button');
        b.className = 'quiz-option'; b.textContent = opt;
        b.setAttribute('role','radio'); b.setAttribute('aria-checked','false');
        b.addEventListener('click', () => answerQuiz(idx, q.correct));
        oe.appendChild(b);
    });
}
function answerQuiz(sel, cor) {
    if (state.quiz.answered) return;
    state.quiz.answered = true;
    document.querySelectorAll('.quiz-option').forEach((b,i) => {
        b.disabled = true;
        if (i === cor) b.classList.add('correct');
        if (i === sel && i !== cor) b.classList.add('wrong');
    });
    const fb = document.getElementById('quiz-feedback'), q = state.quiz.questions[state.quiz.current];
    if (sel === cor) { state.quiz.score++; fb.className = 'quiz-feedback correct'; fb.textContent = `${label('correct')} ${q.explanation}`; }
    else { fb.className = 'quiz-feedback wrong'; fb.textContent = `${label('incorrect')} ${q.explanation}`; }
    fb.classList.remove('hidden');
    document.getElementById('quiz-next').classList.remove('hidden');
}
function nextQuestion() {
    state.quiz.current++;
    if (state.quiz.current >= state.quiz.questions.length) showQuizResults();
    else renderQuestion();
}
function showQuizResults() {
    document.getElementById('quiz-play').classList.add('hidden');
    const r = document.getElementById('quiz-results'); r.classList.remove('hidden');
    const s = state.quiz.score, t = state.quiz.questions.length, p = Math.round((s/t)*100);
    let ic, ti;
    if (p>=80){ic='🏆';ti='Excellent!';}else if(p>=60){ic='👏';ti='Great Job!';}else if(p>=40){ic='💪';ti='Keep Learning!';}else{ic='📚';ti='Study More!';}
    document.getElementById('quiz-results-icon').textContent = ic;
    document.getElementById('quiz-results-title').textContent = ti;
    document.getElementById('quiz-results-score').textContent = `You scored ${s}/${t} (${p}%)`;
    state.stats.quizzes++; state.stats.xp += s*10;
    if (s > state.stats.bestScore) state.stats.bestScore = s;
    if (s >= 3) state.stats.streak++; else state.stats.streak = 0;
    saveStats(); updateProfile();
    document.getElementById('streak-display').textContent = state.stats.streak;
    document.getElementById('best-score-display').textContent = state.stats.bestScore;
}

// ═══ ELECTION ═══
function renderElectionTab(tab) {
    const c = document.getElementById('election-content');
    document.querySelectorAll('.election-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    if (tab === 'guide') {
        c.innerHTML = VOTING_GUIDE_STEPS.map(s => `<div class="guide-step"><div class="guide-step-header"><div class="guide-step-icon"><i class="fa-solid ${s.icon}"></i></div><span class="guide-step-title">${s.title}</span></div><ul class="guide-items">${s.items.map(i=>`<li>${i}</li>`).join('')}</ul></div>`).join('');
    } else if (tab === 'docs') {
        c.innerHTML = REQUIRED_DOCUMENTS.map(d => `<div class="doc-card ${d.primary?'primary-doc':''}"><div class="doc-icon"><i class="fa-solid ${d.icon}"></i></div><span class="doc-name">${d.name}</span>${d.primary?'<span class="doc-badge">Primary</span>':''}</div>`).join('');
    } else if (tab === 'tips') {
        const tips = [
            {icon:'📱',text:'<strong>Download the Voter Helpline App</strong> by ECI to find your booth, check your name, and get updates.'},
            {icon:'🕐',text:'<strong>Reach early!</strong> Polling usually starts at 7 AM. Avoid the afternoon rush.'},
            {icon:'📵',text:'<strong>No phones allowed</strong> inside the voting compartment.'},
            {icon:'📸',text:'<strong>No selfies with EVM!</strong> Taking photos inside the booth is punishable.'},
            {icon:'🖊️',text:'<strong>The ink on your finger</strong> is indelible and lasts about 2 weeks.'},
            {icon:'⏰',text:'<strong>If you are in the queue</strong> when polling closes, you WILL be allowed to vote.'},
            {icon:'🆓',text:'<strong>Paid leave:</strong> Employers must give paid time off on polling day.'},
            {icon:'♿',text:'<strong>Special provisions</strong> exist for elderly, disabled, and pregnant voters.'}
        ];
        c.innerHTML = tips.map(t => `<div class="tip-card"><span class="tip-icon">${t.icon}</span><div class="tip-text">${t.text}</div></div>`).join('');
    }
}

// ═══ PROFILE ═══
function updateProfile() {
    const s = state.stats;
    document.getElementById('stat-chats').textContent = s.chats;
    document.getElementById('stat-quizzes').textContent = s.quizzes;
    document.getElementById('stat-streak').textContent = s.streak;
    document.getElementById('streak-display').textContent = s.streak;
    document.getElementById('best-score-display').textContent = s.bestScore;
    let ln, lc;
    if (s.xp<100){ln=label('beginner');lc='beginner';}else if(s.xp<300){ln=label('intermediate');lc='intermediate';}else{ln=label('advanced');lc='advanced';}
    const b = document.querySelector('.level-badge'); b.textContent = ln; b.className = 'level-badge '+lc;
    const mx = s.xp<100?100:(s.xp<300?300:500);
    document.getElementById('profile-xp-fill').style.width = Math.min((s.xp/mx)*100,100)+'%';
    document.getElementById('profile-xp-text').textContent = `${s.xp} / ${mx} XP`;
}
function renderLanguageGrid() {
    const g = document.getElementById('language-grid'); if (!g) return;
    g.innerHTML = '';
    Object.entries(LANGUAGES).forEach(([code, lang]) => {
        const b = document.createElement('button');
        b.className = 'lang-card' + (code === state.lang ? ' active' : '');
        b.textContent = lang.name;
        b.addEventListener('click', () => setLanguage(code));
        g.appendChild(b);
    });
}

// ═══ INIT ═══
document.addEventListener('DOMContentLoaded', () => {
    // Sidebar nav
    document.querySelectorAll('.sidebar-item').forEach(b => b.addEventListener('click', () => switchScreen(b.dataset.screen)));

    // Home CTA buttons
    document.getElementById('home-start-chat').addEventListener('click', () => switchScreen('chat'));
    document.getElementById('home-start-learn').addEventListener('click', () => switchScreen('learn'));

    // Chat
    document.getElementById('chat-send').addEventListener('click', handleChat);
    document.getElementById('chat-input').addEventListener('keydown', e => { if (e.key==='Enter') handleChat(); });
    renderQuickReplies();
    renderTopicSidebar();
    addMessage("Namaste! 🙏 I'm **PollMind**, your AI guide to Indian elections and democracy.\n\nAsk me anything about voting, EVMs, Voter ID, or how the Indian government works!\n\nTap a topic or type your question.", true);

    // Language
    document.getElementById('lang-btn').addEventListener('click', () => document.getElementById('lang-dropdown').classList.toggle('hidden'));
    document.querySelectorAll('.lang-option').forEach(b => b.addEventListener('click', () => setLanguage(b.dataset.lang)));


    // Learn
    document.querySelectorAll('.learn-card').forEach(c => c.addEventListener('click', () => showLearnTopic(c.dataset.topic)));

    // Quiz
    document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
    document.getElementById('quiz-next').addEventListener('click', nextQuestion);
    document.getElementById('quiz-retry').addEventListener('click', () => {
        document.getElementById('quiz-results').classList.add('hidden');
        document.getElementById('quiz-start').classList.remove('hidden');
    });

    // Election tabs
    document.querySelectorAll('.election-tab').forEach(t => t.addEventListener('click', () => renderElectionTab(t.dataset.tab)));

    applyLanguage();
    updateProfile();
});
