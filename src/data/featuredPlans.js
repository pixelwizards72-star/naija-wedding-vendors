export const FEATURED_PLANS = [
  {
    id: "monthly",
    name: "1 Month Spotlight",
    durationMonths: 1,
    priceNGN: 15000,
    priceUSD: 10,
    badge: null,
    popular: false,
    description: "Great for seasonal event promotions & quick visibility boost."
  },
  {
    id: "quarterly",
    name: "3 Months Spotlight",
    durationMonths: 3,
    priceNGN: 40000,
    priceUSD: 25,
    savingsLabel: "Save 11%",
    badge: "Popular",
    popular: true,
    description: "Ideal for wedding season & steady client inquiries."
  },
  {
    id: "semi_annual",
    name: "6 Months Spotlight",
    durationMonths: 6,
    priceNGN: 75000,
    priceUSD: 50,
    savingsLabel: "Save 17%",
    badge: "High Growth",
    popular: false,
    description: "Maximum exposure across major Nigerian cities for half a year."
  },
  {
    id: "annual",
    name: "1 Year VIP Partner",
    durationMonths: 12,
    priceNGN: 130000,
    priceUSD: 85,
    savingsLabel: "Save 28%",
    badge: "Best Value",
    popular: false,
    description: "Top priority homepage ranking, VIP trust badge & full year promotion."
  }
];

export const PAYMENT_GATEWAYS = [
  {
    id: "paystack",
    name: "Paystack",
    type: "local_card",
    currency: "NGN",
    description: "Naira Cards (Mastercard/Visa/Verve), Bank Transfer & USSD",
    badge: "Fastest in Nigeria",
    color: "bg-emerald-600 text-white",
    icon: "https://paystack.com/favicon.png"
  },
  {
    id: "flutterwave",
    name: "Flutterwave",
    type: "local_global",
    currency: "NGN / USD",
    description: "African & Global Bank Cards, Mobile Money, Bank Account",
    badge: "Pan-African",
    color: "bg-amber-500 text-slate-900",
    icon: "https://flutterwave.com/favicon.ico"
  },
  {
    id: "stripe",
    name: "Stripe",
    type: "card",
    currency: "USD",
    description: "International Credit/Debit Cards, Apple Pay & Google Pay",
    badge: "Global Cards",
    color: "bg-indigo-600 text-white",
    icon: "https://stripe.com/favicon.ico"
  },
  {
    id: "paypal",
    name: "PayPal",
    type: "wallet",
    currency: "USD",
    description: "PayPal Wallet Balance, International Debit or Credit Cards",
    badge: "Worldwide",
    color: "bg-blue-600 text-white",
    icon: "https://www.paypalobjects.com/webstatic/icon/favicon.ico"
  },
  {
    id: "usdt",
    name: "USDT (Tether Crypto)",
    type: "crypto",
    currency: "USDT",
    description: "Web3 Wallet Pay / Direct USDT TRC20 or ERC20 Transfer",
    badge: "Web3 Crypto",
    color: "bg-teal-600 text-white",
    icon: "https://tether.to/favicon.ico",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    trc20Address: "TYDzsYWaWwLQUVscLXBR2EPgeM5TPgB24z"
  }
];
