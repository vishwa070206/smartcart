import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useBudgetStore } from '../../store/budgetStore';
import { formatCurrency } from '../../utils/formatters';

export function CartDrawer() {
  const navigate = useNavigate();
  const { cart, isCartDrawerOpen, closeCartDrawer, updateQuantity, removeFromCart, getCartTotal, getCartMrpTotal, getCartDiscount } = useCartStore();
  const { budgetLimit, isBudgetModeEnabled } = useBudgetStore();

  if (!isCartDrawerOpen) return null;

  const total = getCartTotal();
  const mrpTotal = getCartMrpTotal();
  const discount = getCartDiscount();
  const isBudgetExceeded = isBudgetModeEnabled && total > budgetLimit;
  const excessAmount = total - budgetLimit;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCartDrawer}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 border-b border-[#E9E9EB] flex items-center justify-between bg-[#FFFBFC]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#FF3F6C]" />
              <h2 className="font-extrabold text-base text-[#282C3F]">Shopping Cart ({cart.length})</h2>
            </div>
            <button
              onClick={closeCartDrawer}
              className="p-1.5 text-[#696E79] hover:text-[#282C3F] rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Budget Assistance Banner */}
          {isBudgetModeEnabled && (
            <div className={`p-3 text-xs font-medium border-b ${isBudgetExceeded ? 'bg-[#FFF3E0] border-[#F5A623] text-[#E65100]' : 'bg-[#E0F2F1] border-[#00897B] text-[#004D40]'}`}>
              <div className="flex items-center justify-between font-bold mb-1">
                <span>Budget Assistance</span>
                <span>Limit: {formatCurrency(budgetLimit)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Cart Total: {formatCurrency(total)}</span>
                {isBudgetExceeded ? (
                  <span className="font-extrabold text-[#D32F2F]">Exceeded by {formatCurrency(excessAmount)}</span>
                ) : (
                  <span className="font-bold text-[#00897B]">Remaining: {formatCurrency(budgetLimit - total)}</span>
                )}
              </div>
              {isBudgetExceeded && (
                <div className="mt-2 pt-2 border-t border-[#F5A623]/30 text-[11px] font-semibold flex items-center gap-1.5 text-[#D32F2F]">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>Tip: Switch to Fortune Atta or Amul Toned Milk to stay within budget!</span>
                </div>
              )}
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#696E79] mx-auto stroke-1" />
                <p className="text-sm font-semibold text-[#696E79]">Your cart is currently empty</p>
                <button
                  onClick={closeCartDrawer}
                  className="inline-block bg-[#FF3F6C] text-white text-xs font-bold py-2 px-4 rounded-lg shadow-sm hover:bg-[#D81B4E]"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-2.5 bg-white border border-[#E9E9EB] rounded-xl hover:border-[#FF3F6C]/30 transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-contain bg-[#FFFBFC] p-1 rounded-lg border border-gray-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-bold text-[#282C3F] truncate">{product.name}</h4>
                    <div className="text-[11px] text-[#696E79]">{product.variant}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-[#282C3F]">{formatCurrency(product.price)}</span>
                      {product.mrp > product.price && (
                        <span className="text-[10px] text-[#696E79] line-through">{formatCurrency(product.mrp)}</span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-[#696E79] hover:text-[#D32F2F] p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center border border-[#E9E9EB] rounded-lg overflow-hidden bg-[#FFFBFC]">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="px-2 py-1 text-[#282C3F] hover:bg-gray-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-[#282C3F]">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="px-2 py-1 text-[#282C3F] hover:bg-gray-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-[#E9E9EB] bg-[#FFFBFC] space-y-3">
              <div className="space-y-1.5 text-xs text-[#696E79]">
                <div className="flex justify-between">
                  <span>Item Total (MRP)</span>
                  <span>{formatCurrency(mrpTotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#00897B] font-bold">
                    <span>SmartMart Discount Savings</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-extrabold text-base text-[#282C3F] pt-2 border-t border-[#E9E9EB]">
                  <span>Total Amount</span>
                  <span className="text-[#FF3F6C]">{formatCurrency(total)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  closeCartDrawer();
                  navigate('/checkout');
                }}
                className="w-full bg-[#FF3F6C] hover:bg-[#D81B4E] text-white py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#696E79] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00897B]" />
                <span>Verified Supermarket Guarantee &amp; Safe Payment</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
