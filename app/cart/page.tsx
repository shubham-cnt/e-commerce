"use client";

import Link from "next/link";
import { useCartStore } from "../../stores/cart";
import { useAuthStore } from "../..//stores/auth";
import AuthGuard from "../authGuard";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  const { isAuthenticated } = useAuthStore();

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: number) => {
    removeItem(itemId);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert("Please sign in to proceed to checkout.");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty. Add some items before checking out.");
      return;
    }

    alert(
      "Proceeding to checkout! This would integrate with your payment processor.",
    );
    // In a real app, you would redirect to checkout page
  };

  const handleContinueShopping = () => {
    window.history.back();
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Shopping Cart
                </h1>
                <p className="text-lg text-gray-600">
                  Review your items and proceed to checkout
                </p>
              </div>

              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                >
                  Clear Cart
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {items.length === 0 ? (
              // Empty Cart State
              <div className="text-center py-16">
                <svg
                  className="w-24 h-24 text-gray-400 mx-auto mb-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Your cart is empty
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Looks like you haven't added any items to your cart yet. Start
                  shopping to find amazing products!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleContinueShopping}
                    className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-8 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Home
                  </button>
                  <Link
                    href="/products"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  >
                    Browse Products
                  </Link>
                </div>
              </div>
            ) : (
              // Cart with Items
              <div className="p-6">
                {/* Cart Summary Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Cart Items ({getTotalItems()})
                    </h2>
                    <span className="text-lg font-bold text-gray-900">
                      Total: ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 border-b border-gray-200 pb-6 last:border-b-0"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-gray-600">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3 mt-3">
                          <span className="text-sm font-medium text-gray-700">
                            Quantity:
                          </span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="text-lg font-medium text-gray-900 min-w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-2"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div className="space-y-3">
                    {/* Subtotal */}
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold text-gray-900">
                        ${getTotalPrice().toFixed(2)}
                      </span>
                    </div>

                    {/* Shipping Estimate */}
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-semibold text-green-600">FREE</span>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between text-xl border-t border-gray-200 pt-3">
                      <span className="font-bold text-gray-900">Total:</span>
                      <span className="font-bold text-gray-900">
                        ${getTotalPrice().toFixed(2)}
                      </span>
                    </div>

                    {/* Checkout Button */}
                    <div className="pt-4">
                      <button
                        onClick={handleCheckout}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 text-lg"
                      >
                        Proceed to Checkout
                      </button>
                    </div>

                    {/* Continue Shopping */}
                    <div className="text-center pt-4">
                      <button
                        onClick={handleContinueShopping}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      >
                        ← Continue Shopping
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Trust Badges */}
          {items.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <svg
                  className="w-8 h-8 text-green-600 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Free Shipping
                </h3>
                <p className="text-sm text-gray-600">On all orders over $50</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <svg
                  className="w-8 h-8 text-green-600 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <h3 className="font-semibold text-gray-900 mb-1">
                  30-Day Returns
                </h3>
                <p className="text-sm text-gray-600">Hassle-free returns</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <svg
                  className="w-8 h-8 text-green-600 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Secure Payment
                </h3>
                <p className="text-sm text-gray-600">Your data is protected</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
