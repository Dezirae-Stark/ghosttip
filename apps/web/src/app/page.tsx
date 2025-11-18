import Link from 'next/link';
import { Logo, LogoText, Button } from '@ghosttip/ui';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-4">
          <Logo size={80} animate />
          <LogoText className="text-5xl" />
        </div>

        {/* Hero */}
        <h1 className="text-4xl md:text-6xl font-bold">
          <span className="text-gradient-cyan-magenta">
            Anonymous Tipping
          </span>
          <br />
          <span className="text-gray-300">Made Simple</span>
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Aggregate all your payment methods into one anonymous link. Share it
          anywhere. Protect your privacy while accepting tips from fans.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center">
          <Link href="/auth/register">
            <Button variant="neon" size="lg">
              Get Started
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <FeatureCard
            title="🛡️ Private"
            description="Protect your identity. No PII exposed through our platform."
          />
          <FeatureCard
            title="⚡ Simple"
            description="One link for all payment methods. Copy, paste, done."
          />
          <FeatureCard
            title="🔒 Secure"
            description="Post-quantum ready encryption. Battle-tested security."
          />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="card-glow rounded-lg p-6">
      <h3 className="text-xl font-bold text-cyan-400 mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
