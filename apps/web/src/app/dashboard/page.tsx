'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Logo,
  LogoText,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@ghosttip/ui';
import { tipProfileApi, paymentMethodApi, authApi } from '@/lib/api';
import type { TipProfile, PaymentMethod } from '@ghosttip/shared';
import { getPaymentMethodInfo } from '@ghosttip/shared';

export default function DashboardPage() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<TipProfile[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const loadData = async () => {
    try {
      const [profilesData, methodsData] = await Promise.all([
        tipProfileApi.getMyProfiles(),
        paymentMethodApi.getMy(),
      ]);
      setProfiles(profilesData);
      setPaymentMethods(methodsData);
    } catch (err) {
      console.error('Failed to load data:', err);
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authApi.logout();
    router.push('/');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Logo size={64} animate />
          <p className="text-gray-400 mt-4">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Logo size={40} />
            <LogoText className="text-3xl" />
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Tip Profiles Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gradient-cyan-magenta">
              Your Tip Profiles
            </h2>
            <Button
              variant="default"
              onClick={() => setShowCreateProfile(!showCreateProfile)}
            >
              {showCreateProfile ? 'Cancel' : 'Create Profile'}
            </Button>
          </div>

          {showCreateProfile && (
            <CreateProfileForm
              onSuccess={() => {
                setShowCreateProfile(false);
                loadData();
              }}
            />
          )}

          {profiles.length === 0 && !showCreateProfile ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-400 mb-4">
                  You haven&apos;t created any tip profiles yet
                </p>
                <Button onClick={() => setShowCreateProfile(true)}>
                  Create Your First Profile
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {profiles.map((profile) => (
                <Card key={profile.id}>
                  <CardHeader>
                    <CardTitle>{profile.displayName}</CardTitle>
                    <CardDescription>@{profile.slug}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-400">Tip URL:</p>
                        <div className="flex items-center gap-2">
                          <code className="text-sm text-cyan-400 bg-gray-800 px-2 py-1 rounded flex-1 overflow-x-auto">
                            {process.env.NEXT_PUBLIC_APP_URL}/u/{profile.slug}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              copyToClipboard(
                                `${process.env.NEXT_PUBLIC_APP_URL}/u/${profile.slug}`
                              )
                            }
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Link href={`/u/${profile.slug}`} target="_blank">
                      <Button variant="outline" size="sm">
                        View Public Page
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Payment Methods Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gradient-cyan-magenta">
              Payment Methods
            </h2>
            <Button
              variant="default"
              onClick={() => setShowAddPayment(!showAddPayment)}
            >
              {showAddPayment ? 'Cancel' : 'Add Method'}
            </Button>
          </div>

          {showAddPayment && (
            <AddPaymentMethodForm
              onSuccess={() => {
                setShowAddPayment(false);
                loadData();
              }}
            />
          )}

          {paymentMethods.length === 0 && !showAddPayment ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-400 mb-4">
                  No payment methods added yet
                </p>
                <Button onClick={() => setShowAddPayment(true)}>
                  Add Your First Payment Method
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paymentMethods.map((method) => {
                const info = getPaymentMethodInfo(method.type);
                return (
                  <Card key={method.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span>{info.name}</span>
                      </CardTitle>
                      <CardDescription>{method.label}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <code className="text-sm text-gray-300 bg-gray-800 px-2 py-1 rounded block overflow-x-auto">
                        {method.publicHandle}
                      </code>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

// Create Profile Form Component
function CreateProfileForm({ onSuccess }: { onSuccess: () => void }) {
  const [slug, setSlug] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await tipProfileApi.create({ slug, displayName, bio });
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Create Tip Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Slug (URL handle)
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) =>
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))
              }
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none text-gray-100"
              placeholder="my-handle"
            />
            <p className="text-xs text-gray-500 mt-1">
              Your URL will be: /u/{slug || 'my-handle'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none text-gray-100"
              placeholder="My Creator Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bio (optional)
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none text-gray-100"
              placeholder="Tell people about yourself..."
            />
          </div>

          <Button type="submit" variant="neon" disabled={loading}>
            {loading ? 'Creating...' : 'Create Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// Add Payment Method Form Component
function AddPaymentMethodForm({ onSuccess }: { onSuccess: () => void }) {
  const [type, setType] = useState('CASH_APP');
  const [label, setLabel] = useState('');
  const [publicHandle, setPublicHandle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await paymentMethodApi.create({ type: type as any, label, publicHandle });
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add payment method');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Add Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Payment Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none text-gray-100"
            >
              <option value="CASH_APP">Cash App</option>
              <option value="VENMO">Venmo</option>
              <option value="PAYPAL">PayPal</option>
              <option value="BTC">Bitcoin</option>
              <option value="ETH">Ethereum</option>
              <option value="XMR">Monero</option>
              <option value="LIGHTNING">Lightning Network</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Label
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none text-gray-100"
              placeholder="Primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Handle/Address
            </label>
            <input
              type="text"
              value={publicHandle}
              onChange={(e) => setPublicHandle(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none text-gray-100"
              placeholder={
                type === 'CASH_APP'
                  ? '$yourcashtag'
                  : type === 'VENMO'
                  ? '@yourvenmo'
                  : type === 'BTC'
                  ? 'bc1q...'
                  : 'Handle or address'
              }
            />
          </div>

          <Button type="submit" variant="neon" disabled={loading}>
            {loading ? 'Adding...' : 'Add Payment Method'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
