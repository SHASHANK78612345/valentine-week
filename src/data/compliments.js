export const roseCompliments = [
  "You're like Wi-Fi — I feel a connection. 📶",
  "Are you a magician? Because every time I look at you, everyone else disappears. ✨",
  "You're the reason I check my phone and smile like an idiot. 📱",
  "If you were a vegetable, you'd be a cute-cumber. 🥒",
  "You're hotter than the bottom of my laptop. 🔥",
  "I'd share my Netflix password with you. That's real love. 🎬",
  "You're my favorite notification. 🔔",
  "Are you Google? Because you have everything I've been searching for. 🔍",
  "You make my dopamine levels go stupid. 🧠",
  "I like you more than I like pizza. And I REALLY like pizza. 🍕",
  "You're the cheat code to my happiness. 🎮",
  "My heart does a little Windows startup sound when I see you. 💻",
  "You're proof that angels use dating apps. 😇",
  "I'd let you be player one. Always. 🕹️",
  "You're like a software update — I don't want to shut down, but I know you'll make things better. 💾",
  "If beauty were time, you'd be an eternity. ⏰",
  "You're the semicolon to my code — without you, nothing works. ;",
  "I love you more than coffee, and that's saying A LOT. ☕",
  "You're my emergency contact and my emergency chocolate stash. 🍫",
  "You had me at 'Hello World'. 👩‍💻",
  "You're the CSS to my HTML — you make everything beautiful. 🎨",
  "I'd wait for you longer than a Windows update. That's LOVE. ⏳",
  "You're like Ctrl+Z — you undo all my bad days. ⌨️",
  "My love for you is like a recursive function — it never ends. ∞",
  "You're not just my cup of tea, you're my entire teapot. 🫖",
];

export const chocolateCompliments = [
  { type: 'Dark Chocolate', text: "Like dark chocolate, you're intense, sophisticated, and an acquired taste I'm addicted to. 🖤" },
  { type: 'Milk Chocolate', text: "You're the milk chocolate of people — universally loved and impossible to resist. 🤎" },
  { type: 'White Chocolate', text: "Like white chocolate, people question if you're real because you're too good to be true. 🤍" },
  { type: 'Truffle', text: "You're like a truffle — fancy on the outside, soft on the inside, and worth every calorie. 🍬" },
  { type: 'Caramel Filled', text: "You're like a caramel chocolate — you look sweet, but inside you're even sweeter (and slightly gooey). 🍯" },
  { type: 'Hazelnut', text: "You're the Ferrero Rocher of humans — golden, nutty, and way too expensive for my league. ✨" },
];

export const hugReactions = [
  { min: 0, max: 10, label: 'Warming Up', message: '💕 Aww, hugs incoming...', color: '#ff69b4' },
  { min: 11, max: 25, label: 'Getting Cozy', message: '💗💗 Now we\'re talking!', color: '#ff1493' },
  { min: 26, max: 50, label: 'Hug Monster', message: '🤗 Are you trying to break a record?!', color: '#ff6600' },
  { min: 51, max: 100, label: 'Maximum Overdrive', message: '🌪️ THE HUG METER IS OVERHEATING!', color: '#ff0000' },
  { min: 101, max: 200, label: 'SYSTEM WARNING', message: '⚠️ HUG LEVELS CRITICAL! COLORS INVERTED!', color: '#00ffff' },
  { min: 201, max: 500, label: 'GLITCH MODE', message: '̷̧̛̹̈́E̸̢̛̘R̵̗̈́R̵̰̈O̴̱͝R̶̖͂: TOO MUCH LOVE', color: '#39ff14' },
  { min: 501, max: Infinity, label: 'BLUE SCREEN OF LOVE', message: 'A fatal love exception has occurred.', color: '#0000ff' },
];

export const kissTypes = [
  { name: 'Forehead Kiss', emoji: '😚', romance: 5, silliness: 1, message: 'The "I care about you deeply" kiss. Maximum tenderness.' },
  { name: 'Eskimo Kiss', emoji: '🤭', romance: 4, silliness: 4, message: 'Nose to nose. Adorable and slightly ticklish.' },
  { name: 'Butterfly Kiss', emoji: '🦋', romance: 4, silliness: 3, message: 'Eyelash flutter activated. Warning: may cause giggles.' },
  { name: 'Surprise Kiss', emoji: '😮', romance: 5, silliness: 2, message: 'Sneak attack! +100 romance points.' },
  { name: 'Movie Star Kiss', emoji: '🎬', romance: 5, silliness: 3, message: 'Dramatic. Cinematic. Oscar-worthy. Where\'s the rain?' },
  { name: 'Hand Kiss', emoji: '🤚', romance: 3, silliness: 2, message: 'M\'lady / M\'lord. Very distinguished. Monocle required.' },
  { name: 'Cheek Kiss', emoji: '😗', romance: 3, silliness: 1, message: 'Classic, reliable, wholesome. The Honda Civic of kisses.' },
  { name: '💎 JACKPOT: Marathon', emoji: '🏆', romance: 5, silliness: 5, message: 'JACKPOT! A whole marathon of kisses. Clear your schedule!' },
];

export const letterTemplates = [
  (inputs) => `My Dearest ${inputs.petName},

From the moment I met you, I knew you were special — mostly because ${inputs.annoyingHabit}, and yet somehow I still wanted to be around you. That takes real talent on your part.

Your ${inputs.bestFeature} is honestly unfair. Like, save some amazingness for the rest of us? I could stare at you longer than I stare at ${inputs.food} on a menu, and we both know how seriously I take that.

If I could take you anywhere, it'd be ${inputs.destination} — just you, me, and your ${inputs.weirdTalent} skills that I pretend to understand.

You're more ${inputs.adjective} than any ${inputs.movie} character, and unlike them, you're real (I've checked).

Forever yours (no refunds),
Your Valentine 💕`,

  (inputs) => `URGENT MEMO
TO: ${inputs.petName}
RE: Being Absolutely Amazing

This is a formal notice that you have been found guilty of:
1. Being too cute (${inputs.bestFeature} in particular — come on)
2. Making me think about ${inputs.food} romantically because it reminds me of our dates
3. Performing ${inputs.weirdTalent} in a way that shouldn't be attractive but somehow is
4. ${inputs.annoyingHabit}, which I've decided is actually adorable

Your sentence: Mandatory trip to ${inputs.destination} with me. Non-negotiable.

You are more ${inputs.adjective} than ${inputs.movie} deserves, and I am more in love with you than any sarcastic letter could express.

This memo is legally binding (in my heart).
— Your Valentine 💘`,

  (inputs) => `Dear ${inputs.petName},

I've been trying to write something ${inputs.adjective} enough to match how I feel about you, but honestly? Words are failing me harder than that time you tried ${inputs.weirdTalent}.

Here's what I know: Your ${inputs.bestFeature} makes me forget what I was saying mid-sentence. ${inputs.annoyingHabit} used to drive me crazy, but now it's just... you. And I love every bit of you.

I'd choose you over ${inputs.food}. I'd rewatch ${inputs.movie} a hundred times if it meant sitting next to you. I'd go to ${inputs.destination} or literally anywhere — because the destination doesn't matter when you're the journey.

(That was really cheesy. I'm not sorry.)

All my love and zero regrets,
Your Valentine 🌹`,

  (inputs) => `*loading love_letter.exe...*
*recipient: ${inputs.petName}*
*status: SMITTEN*

> SCAN COMPLETE. SUBJECT ANALYSIS:
> Best feature: ${inputs.bestFeature} [RATING: 11/10]
> Known habit: ${inputs.annoyingHabit} [STATUS: Endearing]
> Hidden talent: ${inputs.weirdTalent} [THREAT LEVEL: Adorable]
> Comparable to: ${inputs.movie} [BUT BETTER]
> Cravings when near subject: ${inputs.food}
> Dream destination with subject: ${inputs.destination}
> Overall assessment: More ${inputs.adjective} than scientifically possible

> CONCLUSION: This unit has developed feelings that exceed normal parameters.
> ERROR: Cannot compute life without you.
> RECOMMENDATION: Stay forever. ♥

*end transmission*
— Your Valentine 🤖💕`,
];

export const promiseClauses = [
  "The Party of the First Part (hereinafter referred to as 'Me') agrees to love the Party of the Second Part (hereinafter referred to as 'You') unconditionally, even on days when you steal all the blankets.",
  "Me shall provide a minimum of 3 (three) genuine compliments per day. Sarcastic compliments count as 0.5 each.",
  "Both parties agree that 'I\'m fine' never actually means fine, and further investigation is always warranted.",
  "Me agrees to watch your favorite show and pretend to enjoy it, even during the slow episodes. You agree to do the same. Neither party shall judge the other's taste in television.",
  "In the event of a disagreement about dinner, the 'I don't know, you pick' clause shall be limited to 2 (two) uses per week per party.",
  "Me promises to always laugh at your jokes, even the terrible ones. Especially the terrible ones.",
  "Both parties shall maintain an emergency chocolate supply for emotional support purposes.",
  "Me agrees to be the designated spider remover, jar opener, and/or emotional support human as needed.",
  "Neither party shall go to bed angry, unless it's past midnight, in which case anger shall be tabled until morning coffee has been consumed.",
  "Me promises to hold your hand in public, even when my palms are sweaty (which they will be, because you make me nervous in a good way).",
  "Both parties agree that 'just five more minutes' of sleep is sacred and shall not be questioned.",
  "Me shall send at least one unnecessarily long good morning text per week, complete with emojis.",
  "In the event of illness, the healthy party shall provide soup, blankets, and unlimited sympathy without saying 'I told you to wear a jacket.'",
  "Both parties agree to embarrass each other with affection in front of friends at least once a month.",
  "Me promises to remember the important dates. A shared Google Calendar is an acceptable backup system.",
  "Neither party shall weaponize the phrase 'per my last text' during arguments.",
  "Both parties shall take at least one spontaneous adventure per month, even if 'adventure' means trying a new restaurant.",
  "Me agrees to tolerate your music taste during road trips, for up to 50% of the drive time.",
  "In matters of pizza toppings, both parties shall respect each other's choices, no matter how objectively wrong they may be.",
  "Me promises that 'I love you' will never become routine — it will be said with meaning, even at 2 AM when half asleep.",
  "Both parties agree to grow together, not apart. Regular emotional check-ins are mandatory (but they can happen over ice cream).",
  "Me shall defend You in all situations, including but not limited to: family gatherings, social media debates, and arguments about whether a hot dog is a sandwich.",
  "Neither party shall screenshot embarrassing texts for blackmail purposes. (Previous screenshots are grandfathered in.)",
  "Both parties agree that this relationship is the best thing that happened to either of them, and they shall act accordingly.",
  "This contract is binding for eternity (∞) and shall survive all OS updates, career changes, bad haircuts, and existential crises.",
];

export const marqueeTexts = [
  "💕 You've been visited by the Valentine's Week fairy. Share with 10 people or face 7 years of bad Wi-Fi. 💕",
  "🌹 This website was hand-crafted with love, caffeine, and questionable CSS decisions 🌹",
  "💖 Side effects of this website may include: smiling, blushing, and an urge to hug someone 💖",
  "✨ Best viewed on a CRT monitor at 800x600 resolution. Just kidding. Or am I? ✨",
  "💝 No roses were harmed in the making of this website. They're all pixels. 💝",
  "🔥 Hot take: You're the best thing since sliced bread. And I really like bread. 🔥",
];
