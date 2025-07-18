import { useState } from 'react';
import { Smartphone, DollarSign, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface MobileMoneyProps {
  amount: number;
  currency?: string;
  description: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const MobileMoney = ({ 
  amount, 
  currency = 'GHS', 
  description, 
  onSuccess, 
  onError 
}: MobileMoneyProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [network, setNetwork] = useState<'mtn' | 'vodafone' | 'airtel'>('mtn');
  const [isProcessing, setIsProcessing] = useState(false);

  const networks = [
    { 
      id: 'mtn' as const, 
      name: 'MTN Mobile Money', 
      code: '*170*', 
      color: 'bg-yellow-500',
      logo: '📱'
    },
    { 
      id: 'vodafone' as const, 
      name: 'Vodafone Cash', 
      code: '*110*', 
      color: 'bg-red-500',
      logo: '💳'
    },
    { 
      id: 'airtel' as const, 
      name: 'AirtelTigo Money', 
      code: '*185*', 
      color: 'bg-green-500',
      logo: '💰'
    }
  ];

  const selectedNetwork = networks.find(n => n.id === network);

  const formatPhoneNumber = (phone: string) => {
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Add Ghana country code if not present
    if (cleaned.length === 10 && cleaned.startsWith('0')) {
      return '233' + cleaned.slice(1);
    } else if (cleaned.length === 9) {
      return '233' + cleaned;
    } else if (cleaned.length === 12 && cleaned.startsWith('233')) {
      return cleaned;
    }
    
    return cleaned;
  };

  const generateUSSDCode = () => {
    if (!selectedNetwork || !phoneNumber) return '';
    
    const formattedPhone = formatPhoneNumber(phoneNumber);
    // For demo purposes - in production this would integrate with actual payment gateway
    return `${selectedNetwork.code}6*1*${formattedPhone}*${amount}#`;
  };

  const handlePayment = async () => {
    if (!phoneNumber) {
      onError?.('Please enter your phone number');
      return;
    }

    setIsProcessing(true);

    try {
      // In production, this would make an actual API call to payment gateway
      // For demo, we'll simulate the USSD process
      const ussdCode = generateUSSDCode();
      
      // Open the dialer with USSD code
      if (window.location.protocol === 'tel:') {
        window.location.href = `tel:${ussdCode}`;
      } else {
        // For web, show instructions
        setTimeout(() => {
          onSuccess?.();
          setIsOpen(false);
          setIsProcessing(false);
        }, 2000);
      }
    } catch (error) {
      setIsProcessing(false);
      onError?.('Payment failed. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Smartphone className="h-4 w-4 mr-2" />
          Pay with Mobile Money
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Mobile Money Payment
          </DialogTitle>
          <DialogDescription>
            Pay {currency} {amount.toFixed(2)} for {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Network Selection */}
          <div>
            <Label className="text-sm font-medium">Select Network</Label>
            <div className="grid grid-cols-1 gap-2 mt-2">
              {networks.map((net) => (
                <Card 
                  key={net.id}
                  className={`cursor-pointer border-2 transition-colors ${
                    network === net.id 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setNetwork(net.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{net.logo}</span>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{net.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Dial {net.code}
                        </p>
                      </div>
                      {network === net.id && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Phone Number Input */}
          <div>
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0241234567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter your {selectedNetwork?.name} number
            </p>
          </div>

          {/* Payment Summary */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="font-semibold">{currency} {amount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Service</span>
                <span className="text-sm">{description}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Network</span>
                <Badge className={selectedNetwork?.color}>
                  {selectedNetwork?.name}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* USSD Instructions */}
          {phoneNumber && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <h4 className="font-medium text-sm mb-2">Payment Instructions:</h4>
                <ol className="text-sm text-muted-foreground space-y-1">
                  <li>1. Dial: <code className="bg-white px-1 rounded">{generateUSSDCode()}</code></li>
                  <li>2. Enter your Mobile Money PIN</li>
                  <li>3. Confirm the payment</li>
                </ol>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={handlePayment}
              disabled={!phoneNumber || isProcessing}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {isProcessing ? (
                'Processing...'
              ) : (
                <>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Pay Now
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MobileMoney;