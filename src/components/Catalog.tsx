/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CartItem, SeashellConfig, ShellType, TetherType, AccentMetal, NFCMode } from "../types";
import { Plus, Minus, Trash2, ShoppingBag, X, Check, Lock, Star } from "lucide-react";

interface CatalogProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  scrollToSection: (id: string) => void;
}

export default function Catalog({ cart, setCart, isCartOpen, setIsCartOpen, scrollToSection }: CatalogProps) {
  // Checkout simulator states
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"form" | "loading" | "success">("form");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const products = [
    {
      id: "prod-keychain-original",
      name: "The Original Seashell NFC Keychain",
      price: 25,
      description: "Authentic Atlantic scallop shell embedded with high-performance rewritable NFC chip. Sealed inside marine protective resin.",
      badge: "In Stock",
      status: "active",
      stars: 5,
      reviews: 148,
      imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "prod-anklet-cowrie",
      name: "Tidal Braided Anklet with Pacific Cowrie",
      price: 28,
      description: "Adjustable waterproof marine braided cord with an authentic cowrie shell. Preloaded with social & contact payload chips.",
      badge: "Pre-order Drop",
      status: "preorder",
      stars: 5,
      reviews: 32,
      imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "prod-necklace-conch",
      name: "Sea-Winds Braided Rope Necklace",
      price: 32,
      description: "Polished conch shell embedded with ICE medical NFC tag on an eco-friendly tan hemp braided rope. 100% waterproof.",
      badge: "Pre-order Drop",
      status: "preorder",
      stars: 4.8,
      reviews: 19,
      imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "prod-luggage-nautilus",
      name: "Nautilus Leather Luggage Tag",
      price: 30,
      description: "Large hand-shaped seashell with full-grain Italian leather strap. Designed to secure beach backpacks, suitcases, or camera cases.",
      badge: "Pre-order Drop",
      status: "preorder",
      stars: 5,
      reviews: 14,
      imageUrl: "https://images.unsplash.com/photo-1590156221122-c241e7f3900c?auto=format&fit=crop&w=300&q=80",
    }
  ];

  const handleAddToCartDirect = (product: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1
      }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (itemId: string, diff: number) => {
    setCart((prev) => {
      return prev.map(item => {
        if (item.id === itemId) {
          const newQty = item.quantity + diff;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter(item => item.id !== itemId));
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleOpenCheckout = () => {
    if (cart.length === 0) return;
    setPaymentStep("form");
    setIsCheckingOut(true);
  };

  const handleProcessSimulatedPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !cardNumber) return;

    setPaymentStep("loading");
    // Simulate marine transaction clearance
    setTimeout(() => {
      setPaymentStep("success");
      // Audio chime success
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.15); // E5
        osc.frequency.setValueAtTime(987.77, audioCtx.currentTime + 0.3); // B5
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.45);
      } catch (e) {}
    }, 2500);
  };

  const handleCompleteSuccessCheckout = () => {
    setCart([]);
    setIsCartOpen(false);
    setIsCheckingOut(false);
  };

  return (
    <section className="bg-gradient-to-b from-sky-50/20 via-white to-teal-50/30 py-16 lg:py-24" id="catalog-section">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Title */}
        <div className="mx-auto max-w-2xl text-center space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 font-mono">Oceanic Boutique</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-teal-950">
            Smart Beach Accessories Store
          </h2>
          <p className="text-sm text-teal-900/70">
            Order our customizable signature NFC keychain today, or sign up to pre-order our upcoming beachwear drop accessories.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <div 
              key={p.id} 
              className="group bg-white rounded-2xl border border-teal-100/50 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
              id={`product-card-${p.id}`}
            >
              
              {/* Product Image & Badge */}
              <div className="relative aspect-square overflow-hidden bg-slate-50">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Float badge */}
                <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full text-white shadow-xs ${
                  p.status === "active" ? "bg-teal-600" : "bg-sky-600"
                }`}>
                  {p.badge}
                </span>
              </div>

              {/* Specs & description */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                    <span className="text-[10px] text-teal-900/60 font-semibold ml-1">({p.reviews})</span>
                  </div>
                  
                  <h3 className="text-xs sm:text-sm font-bold text-teal-950 leading-snug line-clamp-2">
                    {p.name}
                  </h3>
                  
                  <p className="text-[11px] sm:text-xs text-teal-900/60 leading-relaxed font-normal">
                    {p.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-teal-100/30 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-mono font-bold text-teal-950">
                    ${p.price}.00
                  </span>

                  {p.status === "active" ? (
                    <button
                      onClick={() => handleAddToCartDirect(p)}
                      className="rounded-lg bg-teal-50 hover:bg-teal-100 px-3 py-1.5 text-[11px] font-bold text-teal-800 transition-colors cursor-pointer"
                      id={`buy-button-${p.id}`}
                    >
                      Buy Instantly
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToCartDirect(p)}
                      className="rounded-lg bg-sky-50 hover:bg-sky-100 px-3 py-1.5 text-[11px] font-bold text-sky-800 transition-colors cursor-pointer"
                      id={`preorder-button-${p.id}`}
                    >
                      Pre-order
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* FLYOUT SHOPPING CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true" id="shopping-cart-drawer">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" onClick={() => setIsCartOpen(false)} />
          
          <div className="fixed inset-y-0 right-0 max-w-full pl-10 flex">
            <div className="w-screen max-w-md transform transition-all">
              <div className="h-full flex flex-col bg-white shadow-2xl overflow-y-scroll border-l border-teal-100/50">
                
                {/* Header */}
                <div className="px-5 py-5 border-b border-teal-100/35 flex items-center justify-between bg-linear-to-r from-teal-50/50 to-sky-50/40">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-teal-700" />
                    <h3 className="text-sm sm:text-base font-bold text-teal-950">Your Seashore Cart</h3>
                  </div>
                  <button onClick={() => setIsCartOpen(false)} className="p-1 text-teal-900 hover:bg-teal-50 rounded-lg">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Body List */}
                <div className="flex-1 px-5 py-4 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-20 space-y-4">
                      <span className="text-4xl">🐚</span>
                      <div>
                        <h4 className="font-bold text-teal-950 text-sm">Your ocean basket is empty</h4>
                        <p className="text-xs text-teal-900/60 mt-1 max-w-xs mx-auto">
                          Choose our customizable seashell keychain above or preorder our tidal wearables to secure your things.
                        </p>
                      </div>
                      <button
                        onClick={() => { setIsCartOpen(false); scrollToSection("customizer-section"); }}
                        className="rounded-full bg-teal-600 hover:bg-teal-700 px-5 py-2.5 text-xs font-bold text-white transition-all cursor-pointer"
                      >
                        Start Designing
                      </button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex gap-4 p-3 rounded-xl border border-teal-50 bg-teal-50/10 items-start justify-between">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-14 w-14 rounded-lg object-cover bg-slate-100 shrink-0 border border-teal-100/40"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="text-xs font-bold text-teal-950 leading-snug line-clamp-2">
                            {item.name}
                          </h4>
                          
                          {item.config && (
                            <div className="text-[10px] text-teal-600 font-semibold uppercase tracking-wider space-y-0.5">
                              <span className="block">🐚 Shell: {item.config.shellType}</span>
                              <span className="block">📿 Tether: {item.config.tetherType}</span>
                              {item.config.engravingText && <span className="block text-emerald-600">✍️ Engraving: "{item.config.engravingText}"</span>}
                            </div>
                          )}

                          <div className="flex items-center gap-3 pt-1">
                            <div className="flex items-center border border-teal-200/60 rounded-lg overflow-hidden bg-white">
                              <button onClick={() => handleUpdateQty(item.id, -1)} className="p-1 hover:bg-teal-50 text-teal-900">
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-2.5 text-xs font-bold font-mono text-teal-950">{item.quantity}</span>
                              <button onClick={() => handleUpdateQty(item.id, 1)} className="p-1 hover:bg-teal-50 text-teal-900">
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            
                            <button onClick={() => handleRemoveItem(item.id)} className="text-slate-400 hover:text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold font-mono text-teal-950 block">
                            ${item.price * item.quantity}.00
                          </span>
                          <span className="text-[10px] text-teal-600 font-mono">
                            ${item.price} each
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer calculations & checkout trigger */}
                {cart.length > 0 && (
                  <div className="px-5 py-5 border-t border-teal-100/40 bg-slate-50 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-teal-950/70 font-semibold">
                        <span>Items Subtotal:</span>
                        <span className="font-mono text-teal-950">${cartSubtotal}.00</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-teal-950/70 font-semibold">
                        <span>Eco-friendly Shipping:</span>
                        <span className="text-emerald-600 font-bold uppercase font-mono text-[10px]">Free Drop</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-teal-950 font-bold pt-1.5 border-t border-teal-100/30">
                        <span>Grand Total:</span>
                        <span className="font-mono text-teal-700 text-base font-extrabold">${cartSubtotal}.00</span>
                      </div>
                    </div>

                    <button
                      onClick={handleOpenCheckout}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 py-3 text-sm font-bold text-white shadow-md transition-all cursor-pointer"
                      id="cart-checkout-button"
                    >
                      <Lock className="h-4.5 w-4.5" />
                      <span>Secure Sea Checkout</span>
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT PAYMENT SIMULATOR MODAL */}
      {isCheckingOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs" id="checkout-modal-overlay">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-teal-100 overflow-hidden p-6 relative">
            
            <button 
              onClick={() => setIsCheckingOut(false)} 
              disabled={paymentStep === "loading"}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>

            {paymentStep === "form" && (
              <form onSubmit={handleProcessSimulatedPayment} className="space-y-4">
                <div className="text-center space-y-1 pb-2 border-b border-teal-100/30">
                  <span className="text-3xl">🌊</span>
                  <h4 className="text-base font-bold text-teal-950">Oceanic Secure Payment</h4>
                  <p className="text-xs text-teal-900/60 leading-normal">
                    You are checkout purchasing <span className="font-bold text-teal-950">{cart.length} accessory items</span> for <span className="font-extrabold text-teal-700">${cartSubtotal}.00</span>.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-teal-900 uppercase tracking-wide mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Taylor Beachcomber"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-teal-100 focus:outline-hidden focus:border-teal-500 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-teal-900 uppercase tracking-wide mb-1">Shipping Email</label>
                    <input
                      type="email"
                      required
                      placeholder="taylor@beachtravel.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-teal-100 focus:outline-hidden focus:border-teal-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-teal-900 uppercase tracking-wide mb-1">Test Card Number</label>
                    <input
                      type="text"
                      required
                      placeholder="4242 •••• •••• 4242"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, ""))}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-teal-100 focus:outline-hidden focus:border-teal-500 font-mono"
                    />
                    <span className="text-[9px] text-teal-600/70 font-semibold uppercase mt-1 block">
                      Demo Mode: You can type any numbers to simulate payment clearance safely.
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-teal-600 hover:bg-teal-700 py-3 text-xs sm:text-sm font-bold text-white transition-all cursor-pointer shadow-md mt-2"
                >
                  <Lock className="h-4 w-4" />
                  <span>Authorize Secure Charge</span>
                </button>
              </form>
            )}

            {paymentStep === "loading" && (
              <div className="text-center py-12 space-y-4" id="checkout-loading-screen">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 mx-auto border border-teal-100 animate-spin">
                  <div className="h-8 w-8 rounded-full border-4 border-teal-600 border-t-transparent" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-teal-950 text-sm">Validating Sea-Tokens...</h4>
                  <p className="text-xs text-teal-900/60 max-w-[240px] mx-auto leading-relaxed">
                    Clearing marine eco-payment gates securely. Do not close this panel.
                  </p>
                </div>
              </div>
            )}

            {paymentStep === "success" && (
              <div className="text-center py-8 space-y-4" id="checkout-success-screen">
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl shadow-inner border border-emerald-200">
                  <Check className="h-6 w-6" />
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-bold text-teal-950 text-sm">Seashell Order Complete!</h4>
                  <p className="text-xs text-teal-950/70 max-w-[280px] mx-auto leading-relaxed">
                    A beach confirmation summary has been sent to <span className="font-bold font-mono text-teal-900">{customerEmail}</span>. Thank you for riding the waves with us!
                  </p>
                </div>

                <button
                  onClick={handleCompleteSuccessCheckout}
                  className="rounded-full bg-teal-600 hover:bg-teal-700 px-6 py-2 text-xs font-bold text-white transition-all cursor-pointer shadow-sm"
                >
                  Return to Beach
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
