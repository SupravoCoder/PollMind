/**
 * PollMind — All application data
 * This file contains all content for offline-first functionality.
 * No network requests needed for core features.
 */

// ═══════════════════════════════════════════════
//  MULTILINGUAL LABELS
// ═══════════════════════════════════════════════
const LANGUAGES = {
    en: {
        name: "English",
        labels: {
            chat: "Chat", learn: "Learn", quiz: "Quiz", election: "Election", profile: "Profile",
            askMe: "Ask me about Indian elections...",
            send: "Send", tryAsking: "Try asking:",
            learnTitle: "Learn Hub", quizTitle: "Quiz Arena", electionTitle: "Election Mode",
            profileTitle: "Your Profile", startQuiz: "Start Quiz", nextQ: "Next",
            score: "Score", streak: "Streak", level: "Level",
            votingGuide: "Voting Guide", documents: "Documents", tips: "Tips",
            mythBuster: "Myth Busters", roles: "Governance Roles", process: "Election Process",
            simulation: "Election Simulation", dailyQuiz: "Daily Quiz",
            civicChallenge: "Civic Challenge", language: "Language", progress: "Progress",
            eli10: "Explain Like I'm 10", factCheck: "Fact Check",
            beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced",
            correct: "Correct!", incorrect: "Not quite!",
        }
    },
    hi: {
        name: "हिन्दी",
        labels: {
            chat: "चैट", learn: "सीखें", quiz: "क्विज़", election: "चुनाव", profile: "प्रोफ़ाइल",
            askMe: "भारतीय चुनावों के बारे में पूछें...",
            send: "भेजें", tryAsking: "पूछकर देखें:",
            learnTitle: "सीखने का केंद्र", quizTitle: "क्विज़ अखाड़ा", electionTitle: "चुनाव मोड",
            profileTitle: "आपकी प्रोफ़ाइल", startQuiz: "क्विज़ शुरू करें", nextQ: "अगला",
            score: "अंक", streak: "लगातार", level: "स्तर",
            votingGuide: "मतदान गाइड", documents: "दस्तावेज़", tips: "सुझाव",
            mythBuster: "मिथक vs तथ्य", roles: "शासन की भूमिकाएँ", process: "चुनाव प्रक्रिया",
            simulation: "चुनाव सिमुलेशन", dailyQuiz: "दैनिक क्विज़",
            civicChallenge: "नागरिक चुनौती", language: "भाषा", progress: "प्रगति",
            eli10: "सरल भाषा में समझाएं", factCheck: "तथ्य जांच",
            beginner: "शुरुआती", intermediate: "मध्यम", advanced: "उन्नत",
            correct: "सही!", incorrect: "गलत!",
        }
    },
    bn: {
        name: "বাংলা",
        labels: {
            chat: "চ্যাট", learn: "শিখুন", quiz: "কুইজ", election: "নির্বাচন", profile: "প্রোফাইল",
            askMe: "ভারতীয় নির্বাচন সম্পর্কে জিজ্ঞাসা করুন...",
            send: "পাঠান", tryAsking: "জিজ্ঞাসা করুন:",
            learnTitle: "শেখার কেন্দ্র", quizTitle: "কুইজ আখড়া", electionTitle: "নির্বাচন মোড",
            profileTitle: "আপনার প্রোফাইল", startQuiz: "কুইজ শুরু", nextQ: "পরবর্তী",
            score: "স্কোর", streak: "ধারাবাহিক", level: "স্তর",
            votingGuide: "ভোট গাইড", documents: "কাগজপত্র", tips: "টিপস",
            mythBuster: "মিথ vs সত্য", roles: "শাসন ভূমিকা", process: "নির্বাচন প্রক্রিয়া",
            simulation: "নির্বাচন সিমুলেশন", dailyQuiz: "দৈনিক কুইজ",
            civicChallenge: "নাগরিক চ্যালেঞ্জ", language: "ভাষা", progress: "অগ্রগতি",
            eli10: "সহজ ভাষায় বুঝিয়ে দিন", factCheck: "তথ্য যাচাই",
            beginner: "শিক্ষানবিস", intermediate: "মাঝারি", advanced: "উন্নত",
            correct: "সঠিক!", incorrect: "ভুল!",
        }
    },
    ta: {
        name: "தமிழ்",
        labels: {
            chat: "அரட்டை", learn: "கற்றல்", quiz: "வினாடி", election: "தேர்தல்", profile: "சுயவிவரம்",
            askMe: "இந்திய தேர்தல்கள் பற்றி கேளுங்கள்...",
            send: "அனுப்பு", tryAsking: "கேளுங்கள்:",
            learnTitle: "கற்றல் மையம்", quizTitle: "வினாடி வினா", electionTitle: "தேர்தல் முறை",
            profileTitle: "உங்கள் சுயவிவரம்", startQuiz: "தொடங்கு", nextQ: "அடுத்து",
            score: "மதிப்பெண்", streak: "தொடர்", level: "நிலை",
            votingGuide: "வாக்களிப்பு வழிகாட்டி", documents: "ஆவணங்கள்", tips: "குறிப்புகள்",
            mythBuster: "கட்டுக்கதை vs உண்மை", roles: "ஆட்சி பாத்திரங்கள்", process: "தேர்தல் செயல்முறை",
            simulation: "தேர்தல் உருவகப்படுத்துதல்", dailyQuiz: "தினசரி வினாடி",
            civicChallenge: "குடிமை சவால்", language: "மொழி", progress: "முன்னேற்றம்",
            eli10: "எளிமையாக புரியவையுங்கள்", factCheck: "உண்மை சரிபார்",
            beginner: "தொடக்கநிலை", intermediate: "இடைநிலை", advanced: "மேம்பட்ட",
            correct: "சரி!", incorrect: "தவறு!",
        }
    }
};

// ═══════════════════════════════════════════════
//  CHAT RESPONSES (AI-like keyword matching)
// ═══════════════════════════════════════════════
const CHAT_RESPONSES = [
    {
        keywords: ["how", "voting", "work", "vote", "kaise", "কিভাবে", "எப்படி"],
        response: "Great question! 🗳️ In India, voting works like this:\n\n1️⃣ Go to your assigned polling booth\n2️⃣ Show your Voter ID (EPIC card)\n3️⃣ Get your finger marked with indelible ink\n4️⃣ Press the button next to your chosen candidate on the EVM\n5️⃣ Check your vote on the VVPAT slip\n\nYour vote is 100% secret and secure!",
        eli10: "Voting is like choosing the class monitor! 🏫 You go to a special room, press a button next to the person you want to win, and nobody knows who you picked. It's a secret!"
    },
    {
        keywords: ["mp", "mla", "difference", "अंतर", "পার্থক্য"],
        response: "Think of it like levels! 🏛️\n\n🔵 **MP (Member of Parliament)** → Works at the national level in Delhi. Makes laws for the whole country. India has 543 MPs in Lok Sabha.\n\n🟢 **MLA (Member of Legislative Assembly)** → Works at the state level in the state capital. Makes laws for your state.\n\nBoth are elected by YOU through your vote!",
        eli10: "An MLA is like your school principal — they take care of your school (state). An MP is like the education minister — they make rules for ALL schools in the country! 🏫🇮🇳"
    },
    {
        keywords: ["evm", "electronic", "machine", "ईवीएम", "মেশিন"],
        response: "An **EVM (Electronic Voting Machine)** is the device you use to cast your vote! 🖥️\n\n📦 It has two parts:\n• **Ballot Unit** — Where you press the button next to your candidate\n• **Control Unit** — Operated by the polling officer\n\n🔒 EVMs are NOT connected to the internet and cannot be hacked remotely.\n\n📝 **VVPAT** — A small printer attached to the EVM that shows a paper slip of your vote for 7 seconds so you can verify it.",
        eli10: "An EVM is like a special calculator that counts votes! You press a button, and it remembers who you chose. It even prints a small receipt so you can check! 🧾"
    },
    {
        keywords: ["nota", "none", "reject", "नोटा"],
        response: "**NOTA** stands for **\"None Of The Above\"** 🚫\n\nIf you don't like any candidate, you can press the NOTA button on the EVM. It was introduced by the Supreme Court in 2013.\n\n⚠️ Important: Even if NOTA gets the most votes, the candidate with the next highest votes still wins. NOTA is a way to register your protest!",
        eli10: "NOTA is like saying 'I don't want any of these options for class monitor!' But someone still becomes monitor — NOTA just shows you weren't happy with the choices. 😕"
    },
    {
        keywords: ["voter", "id", "epic", "card", "register", "पहचान", "ভোটার"],
        response: "Your **Voter ID (EPIC Card)** is your ticket to vote! 🪪\n\n📋 **How to get one:**\n1. Visit **voters.eci.gov.in** or download the **Voter Helpline App**\n2. Fill out **Form 6** online\n3. Submit your documents (age proof, address proof, photo)\n4. A BLO (Booth Level Officer) will visit to verify\n5. Your EPIC card will be delivered!\n\n✅ You need to be **18 years or older** and an **Indian citizen**.",
        eli10: "A Voter ID is like your school ID card, but for voting! Without it, you can't vote — just like you can't enter school without your school ID! 🪪"
    },
    {
        keywords: ["election", "commission", "eci", "आयोग", "কমিশন"],
        response: "The **Election Commission of India (ECI)** is the boss of all elections! 🏛️\n\n👤 It is headed by the **Chief Election Commissioner (CEC)** and up to 2 other Election Commissioners.\n\n🔑 What does ECI do?\n• Announces election dates\n• Enforces the Model Code of Conduct\n• Monitors spending by candidates\n• Ensures free and fair elections\n• Manages the entire electoral roll\n\n📅 ECI was established on **25th January, 1950** — which is why we celebrate **National Voters' Day** on that date!",
        eli10: "The Election Commission is like the referee in a cricket match! 🏏 They make sure everyone plays fair and nobody cheats during the election game."
    },
    {
        keywords: ["panchayat", "gram", "local", "village", "पंचायत", "গ্রাম", "ग्राम"],
        response: "**Panchayati Raj** is India's system of local self-governance! 🏘️\n\nIt has **3 levels:**\n\n🏠 **Gram Panchayat** — Village level (headed by Sarpanch)\n📍 **Panchayat Samiti** — Block/Taluk level\n🏢 **Zila Parishad** — District level\n\n🗳️ Elections are held every **5 years**\n👩 **One-third seats are reserved for women**\n\nThe 73rd Amendment (1992) gave constitutional status to Panchayats!",
        eli10: "Panchayat is like having a mini-government in your village! The Sarpanch is like the village captain who decides things like fixing roads and building schools nearby! 🏘️"
    },
    {
        keywords: ["model", "code", "conduct", "mcc", "आचार", "আচরণ"],
        response: "The **Model Code of Conduct (MCC)** is a set of rules that kick in the moment elections are announced! 📜\n\n🚫 **What's NOT allowed:**\n• No new government schemes or projects\n• No use of government vehicles for campaigning\n• No appealing to voters on religion or caste\n• No distributing money or gifts\n\n🛑 **Campaigning stops 48 hours before polling day** (silence period)\n\n⚠️ Violating MCC can lead to FIRs, election cancellation, or disqualification!",
        eli10: "MCC is like the rules during an exam! 📝 Once the election 'exam' starts, leaders can't use unfair advantages or give treats to get votes!"
    },
    {
        keywords: ["first", "time", "voter", "new", "young", "पहली", "প্রথম"],
        response: "Welcome, first-time voter! 🎉 Here's everything you need:\n\n✅ **Step 1:** Register at voters.eci.gov.in (if you turned 18)\n✅ **Step 2:** Get your EPIC card\n✅ **Step 3:** Find your polling booth on the Voter Helpline App\n✅ **Step 4:** Carry your Voter ID on polling day\n✅ **Step 5:** Cast your vote on the EVM!\n\n📱 Download the **Voter Helpline App** — it has everything!\n\n💡 Pro tip: Research candidates beforehand. Check their affidavits on the ECI website for criminal records, education, and assets!",
        eli10: "Voting for the first time is super exciting — like your first day at a new school! 🎒 Just bring your Voter ID card, go to the right place, and press the button. Easy peasy! ✨"
    },
    {
        keywords: ["constituency", "seat", "how many", "lok sabha", "rajya sabha", "लोक", "রাজ্য"],
        response: "India's Parliament has **two houses:** 🏛️\n\n🔵 **Lok Sabha (House of the People)**\n• 543 elected seats + 2 nominated Anglo-Indians\n• Members elected directly by the people\n• Term: 5 years\n• The PM needs majority here (272+ seats)\n\n🟡 **Rajya Sabha (Council of States)**\n• 245 members (233 elected + 12 nominated)\n• Elected by MLAs (not directly by people)\n• Members serve 6-year terms (⅓ retire every 2 years)\n• Represents the states",
        eli10: "India has two big groups that make rules — Lok Sabha (chosen by all of us!) and Rajya Sabha (chosen by state leaders). Together they make all the laws! ⚖️"
    },
    {
        keywords: ["help", "hello", "hi", "hey", "namaste", "नमस्ते", "হ্যালো"],
        response: "Namaste! 🙏 I'm **PollMind**, your friendly election guide!\n\nI can help you with:\n🗳️ How voting works in India\n🏛️ Roles like MP, MLA, Sarpanch\n📜 Election Commission & MCC\n🪪 Voter ID registration\n📊 Understanding election results\n🔍 Fact-checking election myths\n\nJust type your question or tap one of the quick topics below!",
        eli10: "Hi there! 👋 I'm PollMind — think of me as your election teacher! Ask me anything about voting and I'll explain it super simply! 🌟"
    }
];

const DEFAULT_RESPONSE = {
    response: "That's an interesting question! 🤔 I'm best at answering questions about:\n\n🗳️ Indian elections & voting\n🏛️ Parliament, MPs, MLAs\n📜 Election Commission\n🪪 Voter ID & registration\n📊 How results work\n\nTry asking me one of these topics!",
    eli10: "Hmm, I'm not sure about that one! 🤷 But I know a LOT about elections and voting in India. Try asking me about how voting works or what a Voter ID is!"
};

// ═══════════════════════════════════════════════
//  QUICK REPLY CHIPS
// ═══════════════════════════════════════════════
const QUICK_REPLIES = [
    "How does voting work?",
    "What is an EVM?",
    "MP vs MLA difference",
    "How to get Voter ID?",
    "What is NOTA?",
    "What is the Election Commission?",
    "Explain Panchayati Raj",
    "I'm a first-time voter!"
];

// ═══════════════════════════════════════════════
//  QUIZ QUESTIONS
// ═══════════════════════════════════════════════
const QUIZ_QUESTIONS = [
    {
        question: "What is the minimum age to vote in India?",
        options: ["16 years", "18 years", "21 years", "25 years"],
        correct: 1,
        explanation: "The minimum voting age in India was reduced from 21 to 18 by the 61st Amendment Act, 1988."
    },
    {
        question: "How many seats are there in the Lok Sabha?",
        options: ["245", "543", "500", "435"],
        correct: 1,
        explanation: "Lok Sabha has 543 elected seats. Members are directly elected by the people of India."
    },
    {
        question: "What does EVM stand for?",
        options: ["Electronic Vote Monitor", "Electronic Voting Machine", "Election Verification Module", "Electoral Vote Manager"],
        correct: 1,
        explanation: "EVM stands for Electronic Voting Machine. India started using EVMs nationally from the 2004 general elections."
    },
    {
        question: "When is National Voters' Day celebrated?",
        options: ["26th January", "25th January", "15th August", "2nd October"],
        correct: 1,
        explanation: "National Voters' Day is celebrated on 25th January, the founding day of the Election Commission of India (1950)."
    },
    {
        question: "What is the 'silence period' before polling day?",
        options: ["24 hours", "48 hours", "72 hours", "12 hours"],
        correct: 1,
        explanation: "Campaigning must stop 48 hours before the polling day to give voters time to make informed decisions peacefully."
    },
    {
        question: "NOTA was introduced in which year?",
        options: ["2009", "2011", "2013", "2015"],
        correct: 2,
        explanation: "NOTA (None Of The Above) was introduced in 2013 following a Supreme Court ruling in the PUCL vs Union of India case."
    },
    {
        question: "Which body conducts elections in India?",
        options: ["Supreme Court", "President", "Election Commission", "Parliament"],
        correct: 2,
        explanation: "The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering elections."
    },
    {
        question: "What is the term of a Lok Sabha member?",
        options: ["4 years", "5 years", "6 years", "3 years"],
        correct: 1,
        explanation: "A Lok Sabha member serves a 5-year term, unless the house is dissolved earlier."
    },
    {
        question: "Which amendment gave Panchayats constitutional status?",
        options: ["42nd", "44th", "73rd", "86th"],
        correct: 2,
        explanation: "The 73rd Constitutional Amendment Act (1992) gave Panchayati Raj institutions constitutional status and ensured regular elections."
    },
    {
        question: "What fraction of Panchayat seats are reserved for women?",
        options: ["One-fourth", "One-third", "One-half", "No reservation"],
        correct: 1,
        explanation: "The 73rd Amendment mandates that at least one-third of total seats in Panchayats be reserved for women."
    },
    {
        question: "What is VVPAT?",
        options: ["Voter Verification and Poll Audit Trail", "Voter Verifiable Paper Audit Trail", "Vote Verified Paper Authentication Tool", "Voting Verification Protocol and Technology"],
        correct: 1,
        explanation: "VVPAT (Voter Verifiable Paper Audit Trail) prints a paper slip showing the voter's choice for 7 seconds for verification."
    },
    {
        question: "How many members does the Rajya Sabha have?",
        options: ["200", "230", "245", "250"],
        correct: 2,
        explanation: "Rajya Sabha has a maximum of 250 members — 238 elected by state/UT assemblies and 12 nominated by the President."
    }
];

// ═══════════════════════════════════════════════
//  MYTH BUSTERS
// ═══════════════════════════════════════════════
const MYTHS = [
    {
        myth: "EVMs can be hacked using WiFi or Bluetooth",
        fact: "EVMs are standalone machines with NO wireless connectivity, no internet, and no remote access. They are manufactured by ECIL and BEL under strict security.",
        icon: "fa-wifi"
    },
    {
        myth: "If NOTA gets the most votes, there's a re-election",
        fact: "Even if NOTA receives the maximum votes, the candidate with the highest votes among actual candidates wins. NOTA is only a symbolic protest option.",
        icon: "fa-ban"
    },
    {
        myth: "You need your Voter ID card to vote — no alternatives",
        fact: "You can use 12 other approved photo IDs like Aadhaar, Passport, PAN Card, Driving License, etc. The Voter ID is just one of the accepted documents.",
        icon: "fa-id-card"
    },
    {
        myth: "Voting is mandatory in India",
        fact: "Voting is a right, not a compulsion in India. There is no legal penalty for not voting, though some states like Gujarat have experimented with compulsory voting in local elections.",
        icon: "fa-gavel"
    },
    {
        myth: "The ruling party controls the Election Commission",
        fact: "The ECI is a constitutional body (Article 324) and functions independently. The CEC can only be removed through impeachment, similar to a Supreme Court judge.",
        icon: "fa-scale-balanced"
    },
    {
        myth: "NRIs cannot vote in Indian elections",
        fact: "NRIs CAN vote! Since 2011, NRIs can vote in person at their registered constituency. The ECI has also been exploring e-postal ballot options for NRIs.",
        icon: "fa-globe"
    }
];

// ═══════════════════════════════════════════════
//  ELECTION STEPS (Voting Guide)
// ═══════════════════════════════════════════════
const VOTING_GUIDE_STEPS = [
    {
        title: "Before Polling Day",
        icon: "fa-calendar-check",
        items: [
            "Check if your name is on the Electoral Roll at voters.eci.gov.in",
            "Download the Voter Helpline App to find your polling booth",
            "Keep your Voter ID (EPIC) or approved photo ID ready",
            "Research candidates — check their affidavits on the ECI website"
        ]
    },
    {
        title: "On Polling Day",
        icon: "fa-person-walking",
        items: [
            "Reach your assigned polling booth during voting hours (usually 7 AM – 6 PM)",
            "Stand in the queue — cutting the line is not allowed",
            "Show your Voter ID or approved photo ID to the polling officer",
            "Your name will be checked against the voter list and marked"
        ]
    },
    {
        title: "Inside the Booth",
        icon: "fa-person-booth",
        items: [
            "Your left index finger will be marked with indelible ink",
            "You'll be directed to the voting compartment (it's private!)",
            "Press the button next to your chosen candidate on the EVM",
            "Check the VVPAT slip to verify your vote (visible for 7 seconds)"
        ]
    },
    {
        title: "After Voting",
        icon: "fa-check-circle",
        items: [
            "Exit the booth — do NOT use your phone inside",
            "Don't try to take a selfie with the EVM (it's illegal!)",
            "Your vote is now recorded and completely anonymous",
            "Share on social media that you voted to inspire others! 🗳️"
        ]
    }
];

const REQUIRED_DOCUMENTS = [
    { name: "Voter ID Card (EPIC)", icon: "fa-id-card", primary: true },
    { name: "Aadhaar Card", icon: "fa-fingerprint", primary: false },
    { name: "Passport", icon: "fa-passport", primary: false },
    { name: "Driving License", icon: "fa-car", primary: false },
    { name: "PAN Card", icon: "fa-credit-card", primary: false },
    { name: "Bank Passbook with Photo", icon: "fa-building-columns", primary: false },
    { name: "MNREGA Job Card", icon: "fa-briefcase", primary: false },
    { name: "Government Photo ID", icon: "fa-address-card", primary: false }
];

// ═══════════════════════════════════════════════
//  GOVERNANCE ROLES
// ═══════════════════════════════════════════════
const GOVERNANCE_ROLES = [
    {
        title: "Sarpanch",
        level: "Village",
        icon: "fa-house-chimney",
        color: "#10b981",
        description: "Head of the Gram Panchayat. Elected directly by village voters. Manages village development, sanitation, and local disputes.",
        eli10: "The village captain! They decide things like fixing the village road or building a new well."
    },
    {
        title: "MLA",
        level: "State",
        icon: "fa-landmark",
        color: "#3b82f6",
        description: "Member of Legislative Assembly. Represents a state constituency in the Vidhan Sabha. Makes state laws and addresses local issues.",
        eli10: "Like your school principal! They take care of problems in your area and make rules for the state."
    },
    {
        title: "MP",
        level: "National",
        icon: "fa-building-columns",
        color: "#8b5cf6",
        description: "Member of Parliament. Represents a Lok Sabha constituency. Makes national laws, approves the budget, and holds the government accountable.",
        eli10: "Like the headmaster of ALL schools! They sit in Delhi and make rules for the entire country."
    },
    {
        title: "Chief Minister",
        level: "State",
        icon: "fa-user-tie",
        color: "#f59e0b",
        description: "Head of the state government. Leader of the party/coalition with majority in the Vidhan Sabha. Runs the state administration.",
        eli10: "The team captain of a state! They lead their state's team of MLAs."
    },
    {
        title: "Prime Minister",
        level: "National",
        icon: "fa-star",
        color: "#ef4444",
        description: "Head of the central government. Leader of the majority party/coalition in Lok Sabha. Leads the country's administration and policy.",
        eli10: "The captain of Team India (the government)! They lead all the MPs and make the biggest decisions for the country."
    }
];

// ═══════════════════════════════════════════════
//  ELECTION SIMULATION DATA
// ═══════════════════════════════════════════════
const SIM_CANDIDATES = [
    { name: "Priya Sharma", party: "People's Progress Party", symbol: "🌻", color: "#f59e0b", manifesto: "Focus on education reform and digital literacy" },
    { name: "Rajesh Kumar", party: "National Development Front", symbol: "🔵", color: "#3b82f6", manifesto: "Infrastructure development and job creation" },
    { name: "Amina Begum", party: "Green Future Alliance", symbol: "🌿", color: "#10b981", manifesto: "Environmental protection and sustainable farming" },
    { name: "Vikram Singh", party: "Youth Forward Movement", symbol: "⚡", color: "#8b5cf6", manifesto: "Startup ecosystem and youth employment" }
];
