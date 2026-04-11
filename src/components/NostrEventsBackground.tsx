import { useEffect, useRef } from 'react';

interface NostrEvent {
  id: string;
  pubkey: string;
  created_at: number;
  kind: number;
  tags: string[][];
  content: string;
  sig: string;
}

const generateMockEvents = (): NostrEvent[] => {
  const events: NostrEvent[] = [];
  const kinds = [1, 3, 6, 7, 30023, 30078, 10002];
  const contents = [
    'Setting up my relay with RelayKit',
    'Just deployed a Blossom server',
    'Testing my new nsite gateway',
    'Self-hosting is freedom',
    'Finally got my own infrastructure',
    'Running nostr-rs-relay now',
    'Strfry is blazing fast',
  ];
  
  for (let i = 0; i < 20; i++) {
    events.push({
      id: Math.random().toString(36).substring(2, 15).repeat(4).substring(0, 64),
      pubkey: Math.random().toString(36).substring(2, 15).repeat(4).substring(0, 64),
      created_at: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 86400),
      kind: kinds[Math.floor(Math.random() * kinds.length)],
      tags: [
        ['e', Math.random().toString(36).substring(2, 15)],
        ['p', Math.random().toString(36).substring(2, 15)],
      ],
      content: contents[Math.floor(Math.random() * contents.length)],
      sig: Math.random().toString(36).substring(2, 15).repeat(4).substring(0, 128),
    });
  }
  
  return events;
};

export function NostrEventsBackground() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);
  
  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
      if (canvasRef.current) {
        canvasRef.current.style.transform = `translateY(${scrollY.current * 0.3}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const events = generateMockEvents();
  
  return (
    <div className="fixed inset-0 overflow-hidden opacity-[0.15] pointer-events-none" style={{ zIndex: 0 }}>
      <div ref={canvasRef} className="absolute inset-0 transition-transform will-change-transform">
        <div className="grid grid-cols-3 gap-8 p-8">
          {events.map((event, i) => (
            <div 
              key={i} 
              className="text-[10px] whitespace-pre-wrap break-all font-mono"
              style={{ 
                animationDelay: `${i * 0.5}s`,
              }}
            >
              {JSON.stringify(event, null, 2)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
