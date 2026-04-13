import { useSeoMeta } from '@unhead/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Server, Image, Globe, ArrowRight, Box, Layers, Terminal, Key, Users, Wrench } from 'lucide-react';
import { useState, useEffect, type CSSProperties } from 'react';
import { NostrEventsBackground } from '@/components/NostrEventsBackground';
import { RubixLoader, RubixLoaderColor } from '@samthomson/rubix-loader';
import { brandAccent } from '@/lib/brandAccents';

function rkCardStyle(index: number): CSSProperties {
  const a = brandAccent(index);
  return {
    '--rk-card-base': a.base,
    '--rk-card-glow': a.glow,
  } as CSSProperties;
}

function rkIconTileStyle(index: number): CSSProperties {
  const a = brandAccent(index);
  return {
    borderColor: a.base,
    '--rk-icon-glow': a.glow,
  } as CSSProperties;
}

const Index = () => {
  const serviceColors = Object.values(RubixLoaderColor);
  const [displayedText, setDisplayedText] = useState('');
  const [_, setFontLoaded] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const fullText = 'RELAYKIT';
  
  useEffect(() => {
    // Foolproof font loading check by measuring text width
    const checkFontLoaded = () => {
      return new Promise<void>((resolve) => {
        const testText = document.createElement('span');
        testText.style.fontFamily = 'Ethnocentric';
        testText.style.fontSize = '100px';
        testText.style.position = 'absolute';
        testText.style.left = '-9999px';
        testText.textContent = 'RELAYKIT';
        document.body.appendChild(testText);
        
        let checks = 0;
        const maxChecks = 50; // Max 5 seconds
        
        const checkInterval = setInterval(() => {
          const width = testText.offsetWidth;
          checks++;
          
          // If width is non-zero and reasonable, font is loaded
          // Fallback fonts would give different width
          if (width > 500 || checks >= maxChecks) {
            clearInterval(checkInterval);
            document.body.removeChild(testText);
            resolve();
          }
        }, 100);
      });
    };
    
    checkFontLoaded().then(() => {
      setFontLoaded(true);
      setShowTitle(true);
      
      // Start typing animation after font loads
      let currentIndex = 0;
      const typingSpeed = 150; // milliseconds per character
      
      const typeTimer = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedText(fullText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeTimer);
        }
      }, typingSpeed);
      
      return () => clearInterval(typeTimer);
    });
  }, []);

  useSeoMeta({
    title: 'RelayKit — Self-host Nostr Services',
    description: 'Deploy and manage relays, Blossom, and nsite gateways from one simple self-hosted control panel.',
  });

  return (
    <div className="min-h-screen bg-background relative isolate">
      <NostrEventsBackground />
      
      {/* Hero Section */}
      <section className="relative isolate px-6 pt-16 pb-20 sm:pt-28 sm:pb-28 md:pt-32 md:pb-32">
        <div className="text-center">
          <div className="flex justify-center mb-10">
            <RubixLoader 
              size={320}
              colors={serviceColors}
            />
          </div>
          <div className="mb-10 min-h-[8rem] sm:min-h-[10rem] lg:min-h-[12rem] flex justify-center items-center w-full px-4">
            {showTitle && (
              <div className="title-cursor-container text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.2em] text-foreground font-display uppercase leading-none max-w-full">
                <span>{displayedText}</span>
                <span
                  className="cursor-bar animate-blink sm:w-3 bg-[rgb(118,82,168)] shadow-[0_0_14px_rgba(90,60,140,0.65)]"
                />
              </div>
            )}
          </div>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
            One install script. Deploy and manage Nostr relays, Blossom servers, and nsite gateways. Link your domains.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8 transition-shadow ring-1 ring-transparent hover:ring-[rgba(118,82,168,0.85)] hover:shadow-[0_0_32px_-4px_rgba(90,60,140,0.55)]"
              asChild
            >
              <a href="https://github.com/samthomson/relaykit-proto" target="_blank" rel="noopener noreferrer">
                View on GitHub
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
          <div className="flex justify-center">
            <div
              className="border-2 px-6 py-3 text-sm font-bold uppercase tracking-wider border-[rgb(118,82,168)] shadow-[0_0_28px_-6px_rgba(90,60,140,0.45)]"
            >
              Currently in Beta — Contributions Welcome
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 border-t border-border">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">
            <span className="inline-block rk-section-title">What it does</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div
                className="rk-icon-tile mx-auto w-12 h-12 border flex items-center justify-center bg-background/60"
                style={rkIconTileStyle(0)}
              >
                <Terminal className="h-6 w-6" style={{ color: brandAccent(0).base }} />
              </div>
              <h3 className="font-semibold text-foreground">One install script</h3>
              <p className="text-sm text-muted-foreground">
                Run on any VPS with a single command
              </p>
            </div>
            <div className="text-center space-y-4">
              <div
                className="rk-icon-tile mx-auto w-12 h-12 border flex items-center justify-center bg-background/60"
                style={rkIconTileStyle(1)}
              >
                <Box className="h-6 w-6" style={{ color: brandAccent(1).base }} />
              </div>
              <h3 className="font-semibold text-foreground">Run many services</h3>
              <p className="text-sm text-muted-foreground">
                Deploy as many nostr services (relays, Blossoms, nsites) as needed
              </p>
            </div>
            <div className="text-center space-y-4">
              <div
                className="rk-icon-tile mx-auto w-12 h-12 border flex items-center justify-center bg-background/60"
                style={rkIconTileStyle(2)}
              >
                <Layers className="h-6 w-6" style={{ color: brandAccent(2).base }} />
              </div>
              <h3 className="font-semibold text-foreground">Group into projects / envs</h3>
              <p className="text-sm text-muted-foreground">
                Organize services by project or environment
              </p>
            </div>
            <div className="text-center space-y-4">
              <div
                className="rk-icon-tile mx-auto w-12 h-12 border flex items-center justify-center bg-background/60"
                style={rkIconTileStyle(3)}
              >
                <Globe className="h-6 w-6" style={{ color: brandAccent(3).base }} />
              </div>
              <h3 className="font-semibold text-foreground">Link your domains</h3>
              <p className="text-sm text-muted-foreground">
                Connect custom domains to your services
              </p>
            </div>
            <div className="text-center space-y-4">
              <div
                className="rk-icon-tile mx-auto w-12 h-12 border flex items-center justify-center bg-background/60"
                style={rkIconTileStyle(4)}
              >
                <Key className="h-6 w-6" style={{ color: brandAccent(4).base }} />
              </div>
              <h3 className="font-semibold text-foreground">NIP-07 auth</h3>
              <p className="text-sm text-muted-foreground">
                Sign in with your existing Nostr identity
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">
            <span className="inline-block rk-section-title">Who it&apos;s for</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="rk-card-hover border border-border bg-card/80" style={rkCardStyle(0)}>
              <CardContent className="pt-8 pb-6 px-6 space-y-4">
                <div
                  className="rk-icon-tile w-10 h-10 border flex items-center justify-center bg-background/50"
                  style={rkIconTileStyle(0)}
                >
                  <Users className="h-5 w-5" style={{ color: brandAccent(0).base }} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Self-hosters</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Run your own relay, Blossom server, or nsite gateway without complex configuration.
                </p>
              </CardContent>
            </Card>

            <Card className="rk-card-hover border border-border bg-card/80" style={rkCardStyle(1)}>
              <CardContent className="pt-8 pb-6 px-6 space-y-4">
                <div
                  className="rk-icon-tile w-10 h-10 border flex items-center justify-center bg-background/50"
                  style={rkIconTileStyle(1)}
                >
                  <Wrench className="h-5 w-5" style={{ color: brandAccent(1).base }} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Developers</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Spin up disposable test infrastructure for dev environments in seconds. Finally a nostr testnet.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What You Can Deploy Section */}
      <section className="px-6 py-20 border-t border-border">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">
            <span className="inline-block rk-section-title">What you can deploy</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="rk-card-hover border border-border bg-card/80" style={rkCardStyle(2)}>
              <CardContent className="pt-8 pb-6 px-6 space-y-4">
                <div
                  className="rk-icon-tile w-10 h-10 border flex items-center justify-center bg-background/50"
                  style={rkIconTileStyle(2)}
                >
                  <Server className="h-5 w-5" style={{ color: brandAccent(2).base }} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Relays</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Nostr relays with configurable storage and policies
                </p>
                <div className="space-y-2">
                  <code className="block text-[10px] break-all text-[rgb(72,48,118)] dark:text-[rgba(190,165,235,0.95)]">
                    wss://relay.yourdomain.com
                  </code>
                  <div className="text-xs text-muted-foreground space-y-1 pt-2">
                    <div>• nostr-rs-relay</div>
                    <div>• strfry</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rk-card-hover border border-border bg-card/80" style={rkCardStyle(3)}>
              <CardContent className="pt-8 pb-6 px-6 space-y-4">
                <div
                  className="rk-icon-tile w-10 h-10 border flex items-center justify-center bg-background/50"
                  style={rkIconTileStyle(3)}
                >
                  <Image className="h-5 w-5" style={{ color: brandAccent(3).base }} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Blossom</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Media server for images, videos, and files
                </p>
                <code className="block text-[10px] break-all text-[rgb(72,48,118)] dark:text-[rgba(190,165,235,0.95)]">
                  https://blossom.yourdomain.com
                </code>
              </CardContent>
            </Card>

            <Card className="rk-card-hover border border-border bg-card/80" style={rkCardStyle(4)}>
              <CardContent className="pt-8 pb-6 px-6 space-y-4">
                <div
                  className="rk-icon-tile w-10 h-10 border flex items-center justify-center bg-background/50"
                  style={rkIconTileStyle(4)}
                >
                  <Globe className="h-5 w-5" style={{ color: brandAccent(4).base }} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">nsite gateway</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Serve static sites from Nostr events (NIP-5A)
                </p>
                <code className="block text-[10px] break-all text-[rgb(72,48,118)] dark:text-[rgba(190,165,235,0.95)]">
                  https://yourdomain.com
                </code>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20 overflow-hidden">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">
            <span className="inline-block rk-section-title">How it works</span>
          </h2>
          <div className="space-y-12">
            <div className="flex gap-6 items-start">
              <div
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center font-bold text-sm text-foreground border bg-[rgba(118,82,168,0.35)] border-[rgba(90,60,140,0.85)] shadow-[0_0_22px_-4px_rgba(72,48,118,0.45)]"
              >
                1
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-semibold mb-2 text-foreground">Run install script on VPS</h3>
                <p className="text-muted-foreground">
                  One command installs RelayKit on any server
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center font-bold text-sm text-foreground border bg-[rgba(128,92,178,0.38)] border-[rgba(98,68,155,0.88)] shadow-[0_0_22px_-4px_rgba(82,58,128,0.45)]"
              >
                2
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-semibold mb-2 text-foreground">Auth with NIP-07 browser extension</h3>
                <p className="text-muted-foreground">
                  Sign in using your Nostr identity
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center font-bold text-sm text-foreground border bg-[rgba(138,108,188,0.38)] border-[rgba(108,78,158,0.88)] shadow-[0_0_22px_-4px_rgba(92,68,138,0.45)]"
              >
                3
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-semibold mb-2 text-foreground">Deploy and manage services</h3>
                <p className="text-muted-foreground">
                  Monitor logs, update configs, manage domains
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative isolate px-6 py-24 sm:py-32 border-t border-border">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-foreground mb-8">
            Run your own Nostr stack.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8 transition-shadow ring-1 ring-transparent hover:ring-[rgba(118,82,168,0.85)] hover:shadow-[0_0_32px_-4px_rgba(90,60,140,0.55)]"
              asChild
            >
              <a href="https://github.com/samthomson/relaykit-proto" target="_blank" rel="noopener noreferrer">
                View on GitHub
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-12">
        <div className="mx-auto max-w-6xl space-y-4 text-left">
          <div>
            <span className="font-bold text-foreground text-lg">RelayKit</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <a
              href="https://relayk.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-semibold underline-offset-4 decoration-[rgba(118,82,168,0.65)] hover:underline hover:text-[rgb(62,38,108)] hover:decoration-[rgb(118,82,168)] dark:hover:text-[rgba(190,165,235,0.98)]"
            >
              Hosted on RelayKit
            </a>
            <span className="text-border">•</span>
            <a
              href="https://shakespeare.diy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-semibold underline-offset-4 decoration-[rgba(118,82,168,0.65)] hover:underline hover:text-[rgb(62,38,108)] hover:decoration-[rgb(118,82,168)] dark:hover:text-[rgba(190,165,235,0.98)]"
            >
              Vibed with Shakespeare
            </a>
          </div>

          <div className="text-sm">
            <span className="text-muted-foreground">Follow on Nostr for updates: </span>
            <a
              href="https://ditto.pub/follow/npub1yzfm42rzr3dj2h50flpvdl0uzrv22kv2y4ghve804w5xqu6lzqcqkyfxu5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-semibold underline-offset-4 decoration-[rgba(118,82,168,0.65)] hover:underline hover:text-[rgb(62,38,108)] hover:decoration-[rgb(118,82,168)] dark:hover:text-[rgba(190,165,235,0.98)]"
            >
              @sam
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
