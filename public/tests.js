"use strict";

/**
 * PollMind — Test Suite
 * 
 * Validates core functionality: data integrity, response matching,
 * quiz logic, language support, and security (XSS prevention).
 * 
 * Run: Open test.html in a browser and check the console.
 */

let passed = 0;
let failed = 0;

function assert(condition, testName) {
    if (condition) {
        passed++;
        console.log(`✅ PASS: ${testName}`);
    } else {
        failed++;
        console.error(`❌ FAIL: ${testName}`);
    }
}

function runTests() {
    console.log('═══════════════════════════════════');
    console.log('  PollMind Test Suite');
    console.log('═══════════════════════════════════\n');

    // ── DATA INTEGRITY ──
    console.log('── Data Integrity ──');
    assert(typeof LANGUAGES === 'object', 'LANGUAGES object exists');
    assert(Object.keys(LANGUAGES).length >= 4, 'At least 4 languages defined');
    assert(LANGUAGES.en && LANGUAGES.hi && LANGUAGES.bn && LANGUAGES.ta, 'All 4 language packs present');
    assert(CHAT_RESPONSES.length >= 10, 'At least 10 chat response entries');
    assert(QUIZ_QUESTIONS.length >= 10, 'At least 10 quiz questions');
    assert(MYTHS.length >= 5, 'At least 5 myth-buster entries');
    assert(VOTING_GUIDE_STEPS.length >= 4, 'At least 4 voting guide steps');
    assert(GOVERNANCE_ROLES.length >= 5, 'At least 5 governance roles');
    assert(SIM_CANDIDATES.length >= 4, 'At least 4 simulation candidates');
    assert(REQUIRED_DOCUMENTS.length >= 7, 'At least 7 accepted documents');
    assert(QUICK_REPLIES.length >= 5, 'At least 5 quick reply chips');

    // ── LANGUAGE LABELS ──
    console.log('\n── Language Labels ──');
    const requiredLabels = ['chat', 'learn', 'quiz', 'election', 'profile', 'send', 'score', 'streak'];
    for (const lang of Object.keys(LANGUAGES)) {
        for (const key of requiredLabels) {
            assert(LANGUAGES[lang].labels[key], `${lang}: label '${key}' exists`);
        }
    }

    // ── CHAT RESPONSE MATCHING ──
    console.log('\n── Chat Response Matching ──');
    assert(findLocalResponse('How does voting work in India?') !== DEFAULT_RESPONSE.response, 'Matches "voting" keyword');
    assert(findLocalResponse('What is an EVM?') !== DEFAULT_RESPONSE.response, 'Matches "evm" keyword');
    assert(findLocalResponse('Tell me about NOTA') !== DEFAULT_RESPONSE.response, 'Matches "nota" keyword');
    assert(findLocalResponse('What is the Election Commission?') !== DEFAULT_RESPONSE.response, 'Matches "election commission"');
    assert(findLocalResponse('How to get a Voter ID card?') !== DEFAULT_RESPONSE.response, 'Matches "voter id"');
    assert(findLocalResponse('Explain Panchayati Raj') !== DEFAULT_RESPONSE.response, 'Matches "panchayat"');
    assert(findLocalResponse('What is xyzzy123?') === DEFAULT_RESPONSE.response, 'Unknown query returns default');

    // ── QUIZ QUESTION VALIDATION ──
    console.log('\n── Quiz Question Validation ──');
    for (let i = 0; i < QUIZ_QUESTIONS.length; i++) {
        const q = QUIZ_QUESTIONS[i];
        assert(q.question && q.question.length > 10, `Q${i+1}: Has valid question text`);
        assert(q.options && q.options.length === 4, `Q${i+1}: Has exactly 4 options`);
        assert(typeof q.correct === 'number' && q.correct >= 0 && q.correct < 4, `Q${i+1}: Correct index is valid`);
        assert(q.explanation && q.explanation.length > 10, `Q${i+1}: Has explanation`);
    }

    // ── SECURITY: XSS PREVENTION ──
    console.log('\n── Security: XSS Prevention ──');
    assert(typeof sanitize === 'function', 'sanitize() function exists');
    const xssInput = '<script>alert("XSS")</script>';
    const sanitized = sanitize(xssInput);
    assert(!sanitized.includes('<script>'), 'Script tags are escaped');
    assert(sanitized.includes('&lt;script&gt;'), 'Correctly HTML-encoded');

    // ── GEMINI CONFIG ──
    console.log('\n── Gemini API Config ──');
    assert(typeof GEMINI_CONFIG === 'object', 'GEMINI_CONFIG exists');
    assert(GEMINI_CONFIG.model === 'gemini-2.0-flash', 'Uses gemini-2.0-flash model');
    assert(GEMINI_CONFIG.systemPrompt.includes('neutral'), 'System prompt includes neutrality');
    assert(GEMINI_CONFIG.systemPrompt.includes('non-political'), 'System prompt is non-political');
    assert(typeof getGeminiResponse === 'function', 'getGeminiResponse() function exists');

    // ── SIMULATION CANDIDATES ──
    console.log('\n── Simulation Candidates ──');
    for (const c of SIM_CANDIDATES) {
        assert(c.name && c.party && c.symbol && c.manifesto, `Candidate ${c.name}: all fields present`);
        assert(c.color && c.color.startsWith('#'), `Candidate ${c.name}: has valid color`);
    }

    // ── MYTH BUSTERS ──
    console.log('\n── Myth Busters ──');
    for (const m of MYTHS) {
        assert(m.myth && m.myth.length > 10, `Myth present: ${m.myth.substring(0, 30)}...`);
        assert(m.fact && m.fact.length > 20, `Fact present for: ${m.myth.substring(0, 30)}...`);
    }

    // ── APP CONSTANTS ──
    console.log('\n── App Constants ──');
    assert(typeof MAX_CHAT_HISTORY === 'number', 'MAX_CHAT_HISTORY is defined');
    assert(typeof XP_CHAT_MESSAGE === 'number', 'XP_CHAT_MESSAGE is defined');
    assert(typeof GEMINI_MAX_TOKENS === 'number', 'GEMINI_MAX_TOKENS is defined');

    // ── ANALYTICS INTEGRATION ──
    console.log('\n── Analytics Integration ──');
    assert(typeof logAnalyticsEvent === 'function', 'logAnalyticsEvent() function exists');
    assert(typeof saveQuizHistory === 'function', 'saveQuizHistory() function exists');

    // ── RESULTS ──
    console.log('\n═══════════════════════════════════');
    console.log(`  Results: ${passed} passed, ${failed} failed`);
    console.log('═══════════════════════════════════');
    document.getElementById('test-results').innerHTML = `
        <div style="font-family:monospace;padding:20px;background:#0a0e1a;color:#f8fafc;border-radius:12px;">
            <h2 style="color:${failed === 0 ? '#138808' : '#ef4444'}">
                ${failed === 0 ? '✅ All Tests Passed!' : `⚠️ ${failed} Test(s) Failed`}
            </h2>
            <p style="color:#94a3b8">${passed} passed, ${failed} failed out of ${passed + failed} tests</p>
            <p style="color:#94a3b8;margin-top:8px;">Open browser console (F12) for detailed results.</p>
        </div>`;
}

// Run on page load
window.addEventListener('DOMContentLoaded', runTests);
