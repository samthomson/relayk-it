import { useSeoMeta } from '@unhead/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Server, Image, Globe, ArrowRight, Box, Settings, Zap } from 'lucide-react';

const Index = () => {
  useSeoMeta({
    title: 'RelayKit — Self-host Nostr Services',
    description: 'Deploy and manage relays, Blossom, and nsite gateways from one simple self-hosted control panel.',
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative isolate px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground mb-6">
            Self-host Nostr services
          </h1>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            RelayKit gives you a clean control panel to deploy relays, Blossom, and nsites in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8">
              Start self-hosting
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why RelayKit Section */}
      <section className="px-6 py-20 bg-secondary/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">
            Why RelayKit
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Deploy in minutes</h3>
              <p className="text-sm text-muted-foreground">
                One-click presets get you running fast
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Settings className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Manage from one UI</h3>
              <p className="text-sm text-muted-foreground">
                Domains, config, and logs in one dashboard
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Box className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Keep full control</h3>
              <p className="text-sm text-muted-foreground">
                Your server, your data, your infrastructure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Deploy Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">
            What you can deploy
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardContent className="pt-8 pb-6 px-6 space-y-4">
                <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center">
                  <Server className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Relay</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nostr relay with configurable storage and policies
                </p>
                <code className="block text-xs font-mono text-accent">wss://relay.yourdomain.com</code>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardContent className="pt-8 pb-6 px-6 space-y-4">
                <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center">
                  <Image className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Blossom</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Media server for images, videos, and files
                </p>
                <code className="block text-xs font-mono text-accent">https://cdn.yourdomain.com</code>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardContent className="pt-8 pb-6 px-6 space-y-4">
                <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">nsite gateway</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Serve static sites from Nostr events (NIP-5A)
                </p>
                <code className="block text-xs font-mono text-accent">https://nsite.yourdomain.com</code>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20 bg-secondary/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">
            How it works
          </h2>
          <div className="space-y-12">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold font-mono text-sm">
                1
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-semibold mb-2 text-foreground">Connect server + Dokploy</h3>
                <p className="text-muted-foreground">
                  Link your VPS and Dokploy instance to RelayKit
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold font-mono text-sm">
                2
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-semibold mb-2 text-foreground">Choose preset + set config</h3>
                <p className="text-muted-foreground">
                  Select relay, Blossom, or nsite with your preferred settings
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold font-mono text-sm">
                3
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-semibold mb-2 text-foreground">Deploy and manage from dashboard</h3>
                <p className="text-muted-foreground">
                  Monitor logs, update configs, and manage domains in one place
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative isolate px-6 py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute right-1/3 bottom-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-foreground mb-8">
            Run your own Nostr stack.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8">
              Start self-hosting
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8">
              View docs
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-foreground">RelayKit</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Vibed with</span>
            <a
              href="https://shakespeare.diy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline font-medium"
            >
              Shakespeare
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
