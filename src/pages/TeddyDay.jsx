import { useState, useEffect, useRef, useCallback } from 'react';
import RetroWindow from '../components/retro/RetroWindow';
import GlitchText from '../components/retro/GlitchText';
import { fireConfetti, fireConfettiCannon } from '../components/particles/ConfettiExplosion';

const CONVERSATION = [
  {
    teddy: "Suniye suniye... aapke liye ek baat hai. Bohot dino se rok ke rakhi thi. Aaj bol hi deta hoon... 🥺",
    responses: [
      "Arre baap re, kya hone wala hai",
      "Tune meri Maggi phir kha li kya?",
      "Yeh confession mat kar dena please..."
    ],
  },
  {
    teddy: "Are you Jio's 4G? Because ever since you came into my life, everything is unlimited and I can't stop buffering around you. 📶",
    responses: [
      "Bhai... that was smoother than Amul butter",
      "Mera network toh already drop ho raha hai",
      "Sir, aap ek stuffed toy ho. Chill."
    ],
  },
  {
    teddy: "Tum Maggi ho mere 2-minute break ki. Tum chai ho meri Monday morning ki. Tum last episode ho meri Netflix binge ki. Basically tum hi tum ho. 🍜☕",
    responses: [
      "Maggi se compare kiya?! ...okay that's love",
      "Monday chai is SACRED. Don't play with me.",
      "Itna sab hoon toh salary bhi do meri"
    ],
  },
  {
    teddy: "Main SRK hoon aur tum meri Kajol. Main arms spread karke train ke door pe khada hoon. Pakadogi ya nahi? DDLJ music plays... 🚂🎶",
    effect: 'shake',
    responses: [
      "Bhai train chhoot jayegi, jaldi bol",
      "Palat... PALAT... okay fine I'm looking",
      "SRK ke paas dimples hain, tere paas cotton hai"
    ],
  },
  {
    teddy: "Tum mere code ka missing semicolon ho — technically without you bhi chal jaata, but pura project CRASH. heart.exe has stopped working. Segfault in feelings. Core dumped. 💔",
    effect: 'glitch',
    responses: [
      "Ctrl+Z karke feelings undo kar le bhai",
      "Yeh toh Stack Overflow pe bhi nahi milega",
      "...achha that was genuinely beautiful yaar??"
    ],
  },
  {
    teddy: "Tere liye main Bahubali 1 AND 2 back-to-back dekhunga — with INTERVAL SAMOSA BREAK. Phir Baahubali ne Kattappa ko kyun maara wala discussion bhi karunga. FIVE HOURS. For you. 🍿",
    effect: 'shake+confetti',
    responses: [
      "FIVE HOURS?! Plus samosa?! Yeh toh serious hai.",
      "Kattappa discussion is the TRUE test of love",
      "Okay... tu sachchi mujhse pyaar karta hai 🥹"
    ],
  },
  {
    teddy: "Sun... main sirf ek teddy hoon. Polyester ka bana, cotton se bhara, aur thoda sa pagalpan andar se. But agar yeh rui ka dil dhadak sakta na... toh sirf tere liye dhadakta. Toh bol na... be my Valentine? 🧸💕",
    effect: 'confetti-cannon',
    responses: [
      "...haan bhai, haan. Tu jeet gaya drama king 🥹",
      "Ek teddy ne mujhe emotional kar diya. Kya life hai.",
      "HEART.EXE PE HI PIGHAL GAYI THI MAIN 💕"
    ],
  },
];

const FINAL_MESSAGE = "YAAAY! 🎉🧸💕 *does full Govinda dance on bed* MUJHE PATA THA interval samosa line kaam karegi! Aaj se tu meri aur main tera. Teddy Day ki kasam — yeh polyester ka dil sirf tere naam hai! 🎊💕";

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px' }}>
      <span style={{ fontSize: '0.85rem', color: '#999', fontFamily: 'var(--font-retro)' }}>
        Guddu Teddy is typing
      </span>
      <span className="typing-dots" style={{ display: 'inline-flex', gap: '3px' }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#DEB887',
              animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </span>
    </div>
  );
}

function ChatBubble({ message, isUser, effect, animate }) {
  const isGlitch = effect === 'glitch';
  const isShake = effect === 'shake' || effect === 'shake+confetti';

  return (
    <div
      className={`${animate ? 'animate-fade-in' : ''} ${isShake ? 'animate-shake' : ''}`}
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        alignItems: 'flex-start',
        gap: '8px',
        marginBottom: '12px',
      }}
    >
      {!isUser && (
        <div style={{
          fontSize: '1.5rem',
          flexShrink: 0,
          width: '32px',
          height: '32px',
          background: '#2a1a30',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #DEB887',
        }}>
          🧸
        </div>
      )}
      <div
        style={{
          background: isUser ? '#ff69b4' : '#DEB887',
          color: isUser ? '#fff' : '#1a1020',
          padding: '10px 14px',
          borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          maxWidth: '75%',
          fontFamily: 'var(--font-retro)',
          fontSize: '1rem',
          lineHeight: 1.4,
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          wordBreak: 'break-word',
        }}
      >
        {isGlitch ? (
          <GlitchText text={message} style={{ color: '#1a1020', fontSize: '1rem' }} />
        ) : (
          message
        )}
      </div>
      {isUser && (
        <div style={{
          fontSize: '1.2rem',
          flexShrink: 0,
          width: '32px',
          height: '32px',
          background: '#2a1030',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #ff69b4',
        }}>
          🫵
        </div>
      )}
    </div>
  );
}

export default function TeddyDay() {
  const [stage, setStage] = useState(0);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(true);
  const [showResponses, setShowResponses] = useState(false);
  const [completed, setCompleted] = useState(false);
  const chatRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  // Show teddy message with typing delay
  useEffect(() => {
    if (completed) return;

    setIsTyping(true);
    setShowResponses(false);

    const typingDelay = stage === 0 ? 1500 : 1800;
    const timer = setTimeout(() => {
      const conv = CONVERSATION[stage];
      setMessages((prev) => [
        ...prev,
        { text: conv.teddy, isUser: false, effect: conv.effect, animate: true },
      ]);
      setIsTyping(false);

      // Fire effects
      if (conv.effect === 'shake+confetti') {
        setTimeout(() => fireConfetti({ particleCount: 60, spread: 80 }), 300);
      }
      if (conv.effect === 'confetti-cannon') {
        setTimeout(() => fireConfettiCannon(), 300);
      }

      // Show response buttons after a short delay
      setTimeout(() => setShowResponses(true), 500);
    }, typingDelay);

    return () => clearTimeout(timer);
  }, [stage, completed]);

  // Auto-scroll when messages change or typing starts
  useEffect(() => {
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages, isTyping, scrollToBottom]);

  const handleResponse = useCallback((responseText) => {
    setShowResponses(false);

    // Add user message
    setMessages((prev) => [
      ...prev,
      { text: responseText, isUser: true, animate: true },
    ]);

    if (stage < CONVERSATION.length - 1) {
      // Advance to next stage
      setTimeout(() => setStage((s) => s + 1), 800);
    } else {
      // Final stage — show ending
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: FINAL_MESSAGE, isUser: false, animate: true },
        ]);
        setIsTyping(false);
        setCompleted(true);
        fireConfettiCannon();
      }, 2000);
    }
  }, [stage]);

  const handleRestart = useCallback(() => {
    setStage(0);
    setMessages([]);
    setIsTyping(true);
    setShowResponses(false);
    setCompleted(false);
  }, []);

  const currentConv = CONVERSATION[stage];
  const statusText = completed
    ? 'Guddu Teddy pagal ho gaya hai 💕'
    : isTyping
      ? '🧸 Guddu Teddy is typing...'
      : `Stage ${stage + 1} of ${CONVERSATION.length}`;

  return (
    <div className="container" style={{ maxWidth: 700 }}>
      {/* Typing animation keyframes */}
      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>

      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1
          className="pixel-text"
          style={{ fontSize: 'clamp(0.8rem, 3vw, 1.2rem)', color: '#DEB887', marginBottom: '8px' }}
        >
          🧸 Day 4: Teddy Day 🧸
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Guddu Teddy ka dil bhar aaya hai...
        </p>
      </header>

      <RetroWindow title="TeddyMessenger.exe" statusBar={statusText}>
        {/* Chat header */}
        <div style={{
          background: 'linear-gradient(180deg, #3a2050 0%, #2a1535 100%)',
          padding: '8px 12px',
          borderBottom: '2px solid #DEB887',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          margin: '-16px -16px 0 -16px',
        }}>
          <span style={{ fontSize: '1.3rem' }}>🧸</span>
          <span style={{
            fontFamily: 'var(--font-retro)',
            fontSize: '1.1rem',
            color: '#DEB887',
          }}>
            Chat with: Guddu Teddy
          </span>
          <span style={{
            marginLeft: 'auto',
            fontSize: '0.75rem',
            color: '#39ff14',
            fontFamily: 'var(--font-retro)',
          }}>
            ● Online
          </span>
        </div>

        {/* Chat messages area */}
        <div
          ref={chatRef}
          style={{
            background: '#1a1020',
            border: '2px inset #333',
            padding: '16px',
            minHeight: '300px',
            maxHeight: '400px',
            overflowY: 'auto',
            marginTop: '12px',
          }}
        >
          {messages.map((msg, i) => (
            <ChatBubble
              key={i}
              message={msg.text}
              isUser={msg.isUser}
              effect={msg.effect}
              animate={msg.animate}
            />
          ))}
          {isTyping && <TypingIndicator />}
        </div>

        {/* Response buttons */}
        {showResponses && !completed && (
          <div
            className="animate-fade-in"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginTop: '12px',
            }}
          >
            {currentConv.responses.map((resp, i) => (
              <button
                key={i}
                className="retro-btn"
                onClick={() => handleResponse(resp)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 14px',
                  fontSize: '0.75rem',
                  lineHeight: 1.4,
                }}
              >
                {resp}
              </button>
            ))}
          </div>
        )}
      </RetroWindow>

      {/* Completion card */}
      {completed && (
        <div
          className="animate-fade-in-scale"
          style={{
            background: 'var(--bg-panel)',
            border: '2px solid #DEB887',
            padding: '24px',
            textAlign: 'center',
            marginTop: '24px',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: 'clamp(0.6rem, 2vw, 0.85rem)',
            color: '#DEB887',
            marginBottom: '8px',
          }}>
            🏆 TEDDY PYAAR ACHIEVEMENT UNLOCKED 🏆
          </div>
          <p style={{
            fontFamily: 'var(--font-retro)',
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            marginBottom: '4px',
          }}>
            Tune ek stuffed bear ke 7 rounds ka drama jhel liya. Respect.
          </p>
          <p style={{
            fontFamily: 'var(--font-retro)',
            fontSize: '1.1rem',
            color: '#ff69b4',
            marginBottom: '6px',
          }}>
            Happy Teddy Day, yaar! 🧸💕
          </p>
          <p style={{
            fontFamily: 'var(--font-retro)',
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            marginBottom: '16px',
            lineHeight: 1.5,
          }}>
            Chahe duniya kuch bhi kahe — tera Guddu hamesha tere saath hai. Rui ka dil, asli pyaar. Iss Teddy Day, kisi ko gale lagaa le aur bol de — "Tu meri Maggi hai, 2 minutes mein nahi, hamesha ke liye." 💛
          </p>
          <button
            className="retro-btn"
            onClick={handleRestart}
            style={{ fontSize: '0.7rem' }}
          >
            🔄 CHAT AGAIN
          </button>
        </div>
      )}
    </div>
  );
}
