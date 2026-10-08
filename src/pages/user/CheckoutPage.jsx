import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ShieldCheck, MapPin, CreditCard, Truck, ArrowRight, AlertTriangle } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useBudgetStore } from '../../store/budgetStore';
import { orderApi } from '../../services/order.api';
import { formatCurrency } from '../../utils/formatters';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, getCartTotal, getCartMrpTotal, getCartDiscount, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { budgetLimit, isBudgetModeEnabled } = useBudgetStore();

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isPlacing, setIsPlacing] = useState(false);

  const total = getCartTotal();
  const mrpTotal = getCartMrpTotal();
  const discount = getCartDiscount();
  const deliveryFee = total > 500 ? 0 : 40;
  const finalTotal = total + deliveryFee;

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    try {
      const res = await orderApi.createOrder({
        items: cart.map((i) => ({ ...i.product, qty: i.quantity })),
        total: finalTotal,
        paymentMethod,
        deliveryAddress: user?.addresses[0]?.line1 + ', ' + user?.addresses[0]?.city
      });
      clearCart();
      navigate('/order-success', { state: { order: res.data } });
    } catch (e) {
      setIsPlacing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#282C3F]">Your cart is empty</h2>
        <button onClick={() => navigate('/products')} className="bg-[#FF3F6C] text-white px-6 py-2.5 rounded-xl font-bold text-xs">
          Return to Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Checkout Steps Progress Bar */}
      <div className="flex items-center justify-center gap-4 max-w-xl mx-auto text-xs font-bold">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#FF3F6C]' : 'text-gray-400'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${step >= 1 ? 'bg-[#FF3F6C] text-white' : 'bg-gray-200'}`}>1</div>
          <span>Address</span>
        </div>
        <div className="w-8 h-0.5 bg-gray-200" />
        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#FF3F6C]' : 'text-gray-400'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${step >= 2 ? 'bg-[#FF3F6C] text-white' : 'bg-gray-200'}`}>2</div>
          <span>Delivery</span>
        </div>
        <div className="w-8 h-0.5 bg-gray-200" />
        <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#FF3F6C]' : 'text-gray-400'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${step >= 3 ? 'bg-[#FF3F6C] text-white' : 'bg-gray-200'}`}>3</div>
          <span>Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Step Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* STEP 1: ADDRESS */}
          {step === 1 && (
            <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E9E9EB] pb-3">
                <MapPin className="w-5 h-5 text-[#FF3F6C]" />
                <h3 className="font-extrabold text-base text-[#282C3F]">Select Delivery Address</h3>
              </div>
              <div className="border-2 border-[#FF3F6C] bg-[#FFF0F4]/30 rounded-xl p-4 space-y-2">
                <div className="flex justify-between font-bold text-xs">
                  <span>{user?.addresses[0]?.name} ({user?.addresses[0]?.title})</span>
                  <span className="text-[#FF3F6C]">DEFAULT</span>
                </div>
                <p className="text-xs text-[#696E79]">
                  {user?.addresses[0]?.line1}, {user?.addresses[0]?.line2}, {user?.addresses[0]?.city} - {user?.addresses[0]?.pincode}
                </p>
                <div className="text-xs font-bold text-[#282C3F]">Phone: {user?.phone}</div>
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full bg-[#FF3F6C] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <span>CONTINUE TO DELIVERY SLOT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: DELIVERY SLOT */}
          {step === 2 && (
            <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E9E9EB] pb-3">
                <Truck className="w-5 h-5 text-[#FF3F6C]" />
                <h3 className="font-extrabold text-base text-[#282C3F]">Select Supermarket Delivery Slot</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="border-2 border-[#FF3F6C] bg-[#FFF0F4]/40 p-4 rounded-xl text-xs space-y-1 font-semibold">
                  <div className="font-bold text-[#FF3F6C]">⚡ Express 4-Hour Delivery</div>
                  <div className="text-[#282C3F]">Delivered Today by 06:00 PM</div>
                  <div className="text-[#00897B] font-bold">Free for orders above ₹500</div>
                </div>
                <div className="border border-[#E9E9EB] p-4 rounded-xl text-xs space-y-1 font-semibold text-gray-500">
                  <div className="font-bold text-gray-700">Morning Slot (Tomorrow)</div>
                  <div>07:00 AM - 10:00 AM</div>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(1)} className="border border-[#E9E9EB] px-4 py-3 rounded-xl text-xs font-bold">
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-[#FF3F6C] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>CONTINUE TO PAYMENT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 3 && (
            <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E9E9EB] pb-3">
                <CreditCard className="w-5 h-5 text-[#FF3F6C]" />
                <h3 className="font-extrabold text-base text-[#282C3F]">Select Payment Option</h3>
              </div>

              <div className="space-y-2 text-xs">
                {['UPI (Google Pay / PhonePe / Paytm)', 'Credit / Debit Card', 'Net Banking', 'Cash / Pay on Delivery'].map((opt, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer font-bold ${
                      paymentMethod === opt ? 'border-[#FF3F6C] bg-[#FFF0F4]/30 text-[#FF3F6C]' : 'border-[#E9E9EB] text-[#282C3F]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === opt}
                        onChange={() => setPaymentMethod(opt)}
                        className="accent-[#FF3F6C]"
                      />
                      <span>{opt}</span>
                    </div>
                  </label>
                ))}
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isPlacing}
                className="w-full bg-[#FF3F6C] hover:bg-[#D81B4E] text-white py-3.5 rounded-xl font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                {isPlacing ? 'PLACING SUPERMARKET ORDER...' : `PLACE ORDER · ${formatCurrency(finalTotal)}`}
              </button>
            </div>
          )}

        </div>

        {/* Order Summary Right Side */}
        <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4 h-fit shadow-xs">
          <h3 className="font-extrabold text-base text-[#282C3F] border-b border-[#E9E9EB] pb-2">
            Order Summary ({cart.length} Items)
          </h3>

          <div className="max-h-48 overflow-y-auto space-y-2 divide-y divide-gray-100">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="pt-2 flex items-center justify-between text-xs">
                <div className="truncate max-w-[180px]">
                  <div className="font-bold text-[#282C3F] truncate">{product.name}</div>
                  <div className="text-[10px] text-[#696E79]">Qty: {quantity}</div>
                </div>
                <div className="font-extrabold text-[#282C3F]">{formatCurrency(product.price * quantity)}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#E9E9EB] pt-3 space-y-1.5 text-xs text-[#696E79]">
            <div className="flex justify-between">
              <span>Subtotal (MRP)</span>
              <span>{formatCurrency(mrpTotal)}</span>
            </div>
            <div className="flex justify-between text-[#00897B] font-bold">
              <span>Savings</span>
              <span>-{formatCurrency(discount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? <span className="text-[#00897B] font-bold">FREE</span> : formatCurrency(deliveryFee)}</span>
            </div>
            <div className="flex justify-between font-extrabold text-base text-[#282C3F] pt-2 border-t border-[#E9E9EB]">
              <span>Final Total</span>
              <span className="text-[#FF3F6C]">{formatCurrency(finalTotal)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
