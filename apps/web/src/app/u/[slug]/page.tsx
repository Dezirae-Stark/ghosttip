/**
 * Public Tip Page
 * Displays creator's tip profile with payment methods
 */

import { notFound } from 'next/navigation';
import { Logo, Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from '@ghosttip/ui';
import { getPaymentMethodInfo } from '@ghosttip/shared';
import QRCode from 'qrcode.react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getTipProfile(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/tip-profiles/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Failed to fetch tip profile:', error);
    return null;
  }
}

export default async function TipPage({ params }: { params: { slug: string } }) {
  const profile = await getTipProfile(params.slug);

  if (!profile) {
    notFound();
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Logo size={60} className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gradient-cyan-magenta mb-2">
            {profile.displayName}
          </h1>
          {profile.bio && (
            <p className="text-gray-400">{profile.bio}</p>
          )}
        </div>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Send a Tip</CardTitle>
            <CardDescription>
              Choose your preferred payment method
            </CardDescription>
          </CardHeader>
          <CardContent>
            {profile.paymentMethods.length === 0 ? (
              <p className="text-center text-gray-400 py-8">
                No payment methods available yet
              </p>
            ) : (
              <div className="space-y-3">
                {profile.paymentMethods.map((method: any) => (
                  <PaymentMethodCard key={method.id} method={method} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            Powered by <span className="text-cyan-400">GhostTip</span> - Anonymous Tipping Platform
          </p>
        </div>
      </div>
    </main>
  );
}

function PaymentMethodCard({ method }: { method: any }) {
  const info = getPaymentMethodInfo(method.type);
  const isCrypto = ['BTC', 'ETH', 'XMR', 'LIGHTNING'].includes(method.type);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show a subtle notification (could be enhanced with toast)
    alert('Copied to clipboard!');
  };

  const openPaymentLink = (type: string, handle: string) => {
    let url = '';

    switch (type) {
      case 'CASH_APP':
        url = `https://cash.app/${handle.replace('$', '')}`;
        break;
      case 'VENMO':
        url = `https://venmo.com/${handle.replace('@', '')}`;
        break;
      case 'PAYPAL':
        url = handle.startsWith('http') ? handle : `https://paypal.me/${handle}`;
        break;
      default:
        return;
    }

    window.open(url, '_blank');
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-700 hover:border-cyan-500/50 hover:shadow-glow-cyan transition-all">
      <div className="flex items-center gap-3 flex-1">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
          style={{ backgroundColor: `${info.color}20` }}
        >
          {method.type === 'BTC' && '₿'}
          {method.type === 'ETH' && 'Ξ'}
          {method.type === 'XMR' && 'ɱ'}
          {method.type === 'LIGHTNING' && '⚡'}
          {method.type === 'CASH_APP' && '$'}
          {method.type === 'VENMO' && 'V'}
          {method.type === 'PAYPAL' && 'P'}
          {method.type === 'OTHER' && '•'}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-gray-200">{info.name}</div>
          <div className="text-sm text-gray-400 font-mono break-all">
            {isCrypto && method.publicHandle.length > 30
              ? `${method.publicHandle.slice(0, 20)}...${method.publicHandle.slice(-10)}`
              : method.publicHandle}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isCrypto ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(method.publicHandle)}
            >
              Copy
            </Button>
            <QRCodeModal address={method.publicHandle} type={method.type} />
          </>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={() => openPaymentLink(method.type, method.publicHandle)}
          >
            Pay
          </Button>
        )}
      </div>
    </div>
  );
}

// QR Code Modal for crypto addresses
'use client';
function QRCodeModal({ address, type }: { address: string; type: string }) {
  const [showQR, setShowQR] = React.useState(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setShowQR(true)}>
        QR
      </Button>

      {showQR && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowQR(false)}
        >
          <div
            className="bg-gray-900 border border-cyan-500/50 rounded-lg p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gradient-cyan-magenta mb-4 text-center">
              Scan to Pay
            </h3>

            <div className="bg-white p-4 rounded-lg mb-4">
              <QRCode
                value={address}
                size={256}
                level="H"
                includeMargin
                className="w-full h-auto"
              />
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">{type} Address:</p>
              <code className="text-xs text-cyan-400 bg-gray-800 px-2 py-1 rounded block break-all">
                {address}
              </code>
            </div>

            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => setShowQR(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

import React from 'react';
