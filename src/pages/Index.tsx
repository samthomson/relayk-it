import { useSeoMeta } from '@unhead/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Server, Image, Globe, ArrowRight, Box, Zap, Layers, Terminal, Key, Users, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
          <div className="flex justify-center mb-6">
            <Badge variant="outline" className="text-accent border-accent/30 bg-accent/5 px-3 py-1">
              Beta — Work in Progress
            </Badge>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground mb-6">
            Self-host Nostr services
          </h1>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            One install script. One dashboard. Deploy relays, Blossom, and nsites in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8"
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

      {/* Why RelayKit Section */}
      <section className="px-6 py-20 bg-secondary/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">
            Why RelayKit
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Terminal className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">One install script</h3>
              <p className="text-sm text-muted-foreground">
                Run on any VPS with a single command
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Box className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Run many services</h3>
              <p className="text-sm text-muted-foreground">
                Deploy as many relays and Blossoms as needed
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Layers className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Group into projects</h3>
              <p className="text-sm text-muted-foreground">
                Organize services by project or environment
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Key className="h-6 w-6 text-accent" />
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
            Who it's for
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardContent className="pt-8 pb-6 px-6 space-y-4">
                <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Self-hosters</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Run your own relay, Blossom server, or nsite gateway without complex configuration.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardContent className="pt-8 pb-6 px-6 space-y-4">
                <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center">
                  <Wrench className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Developers</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Spin up test infrastructure and development environments in seconds.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What You Can Deploy Section */}
      <section className="px-6 py-20 bg-secondary/30">
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
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Nostr relay with configurable storage and policies
                </p>
                <div className="space-y-2">
                  <code className="block text-xs text-accent">wss://yourdomain.com</code>
                  <div className="text-xs text-muted-foreground space-y-1 pt-2">
                    <div>• nostr-rs-relay</div>
                    <div>• strfry</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardContent className="pt-8 pb-6 px-6 space-y-4">
                <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center">
                  <Image className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Blossom</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Media server for images, videos, and files
                </p>
                <code className="block text-xs text-accent">https://yourdomain.com</code>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardContent className="pt-8 pb-6 px-6 space-y-4">
                <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">nsite gateway</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Serve static sites from Nostr events (NIP-5A)
                </p>
                <code className="block text-xs text-accent">https://yourdomain.com</code>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">
            How it works
          </h2>
          <div className="space-y-12">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
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
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
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
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
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
      <section className="relative isolate px-6 py-24 sm:py-32 bg-secondary/30">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute right-1/3 bottom-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Run your own Nostr stack.
          </h2>
          <p className="text-muted-foreground mb-8">
            Currently in beta. Contributions welcome.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8"
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
      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">RelayKit</span>
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
