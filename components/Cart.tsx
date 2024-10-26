"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export function Cart() {
  const { cartItems, removeFromCart, placeOrder } = useCart();
  const totalItems = cartItems.reduce(
    (sum: any, item: { quantity: any }) => sum + item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (sum: number, item: { price: number; quantity: number }) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative bg-neutral-700 border-neutral-600 text-neutral-200 hover:bg-neutral-600 hover:text-neutral-100"
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-neutral-500 text-neutral-100 rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-neutral-800 text-neutral-200 border-neutral-700">
        <SheetHeader>
          <SheetTitle className="text-neutral-100">Your Cart</SheetTitle>
          <SheetDescription className="text-neutral-400">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-neutral-200">
                        {item.name}
                      </p>
                      <p className="text-sm text-neutral-400">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="bg-neutral-700 border-neutral-600 text-neutral-200 hover:bg-neutral-600 hover:text-neutral-100"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <div className="border-t border-neutral-700 pt-4">
                  <p className="font-bold text-neutral-100">
                    Total: ${totalPrice.toFixed(2)}
                  </p>
                </div>
                <Button
                  className="w-full bg-neutral-600 text-neutral-100 hover:bg-neutral-500"
                  onClick={async () => {
                    const orders = await placeOrder(cartItems);
                  }}
                >
                  Checkout
                </Button>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
