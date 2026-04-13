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

const generateMockEvents = (count: number): NostrEvent[] => {
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
  
  for (let i = 0; i < count; i++) {
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
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);
  const column4Ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (column1Ref.current) {
        column1Ref.current.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
      if (column2Ref.current) {
        column2Ref.current.style.transform = `translateY(${-scrollY * 0.25}px)`;
      }
      if (column3Ref.current) {
        column3Ref.current.style.transform = `translateY(${scrollY * 0.35}px)`;
      }
      if (column4Ref.current) {
        column4Ref.current.style.transform = `translateY(${-scrollY * 0.2}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const column1Events = generateMockEvents(8);
  const column2Events = generateMockEvents(8);
  const column3Events = generateMockEvents(8);
  const column4Events = generateMockEvents(8);
  
  return (
    <div
      className="fixed inset-0 overflow-hidden opacity-[0.12] pointer-events-none text-[hsl(265,48%,38%)]"
      style={{ zIndex: 0 }}
    >
      <div className="absolute inset-0 flex gap-12 px-8">
        <div ref={column1Ref} className="flex-1 space-y-8 will-change-transform" style={{ transform: 'translateY(-20%)' }}>
          {column1Events.map((event, i) => (
            <div key={i} className="text-[9px] whitespace-pre-wrap break-all font-mono">
              {JSON.stringify(event, null, 2)}
            </div>
          ))}
        </div>
        
        <div ref={column2Ref} className="flex-1 space-y-8 will-change-transform" style={{ transform: 'translateY(-50%)' }}>
          {column2Events.map((event, i) => (
            <div key={i} className="text-[9px] whitespace-pre-wrap break-all font-mono">
              {JSON.stringify(event, null, 2)}
            </div>
          ))}
        </div>
        
        <div ref={column3Ref} className="flex-1 space-y-8 will-change-transform" style={{ transform: 'translateY(-10%)' }}>
          {column3Events.map((event, i) => (
            <div key={i} className="text-[9px] whitespace-pre-wrap break-all font-mono">
              {JSON.stringify(event, null, 2)}
            </div>
          ))}
        </div>
        
        <div ref={column4Ref} className="flex-1 space-y-8 will-change-transform" style={{ transform: 'translateY(-40%)' }}>
          {column4Events.map((event, i) => (
            <div key={i} className="text-[9px] whitespace-pre-wrap break-all font-mono">
              {JSON.stringify(event, null, 2)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
