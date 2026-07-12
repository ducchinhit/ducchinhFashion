"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getProduct } from "@/data/products";

export interface CartLine {
  slug: string;
  size: string;
  quantity: number;
}

export interface CartLineWithProduct extends CartLine {
  product: NonNullable<ReturnType<typeof getProduct>>;
  lineTotal: number;
}

interface CartContextValue {
  lines: CartLine[];
  linesWithProducts: CartLineWithProduct[];
  itemCount: number;
  subtotal: number;
  addItem: (slug: string, size: string, quantity?: number) => void;
  removeItem: (slug: string, size: string) => void;
  updateQuantity: (slug: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "duc-chinh-cart";

let cachedLines: CartLine[] = [];
let initialized = false;
const listeners = new Set<() => void>();
const EMPTY_LINES: CartLine[] = [];

function readStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStorage(lines: CartLine[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // storage unavailable (private mode, quota, etc.) — cart stays in-memory only
  }
}

function setLines(next: CartLine[]) {
  cachedLines = next;
  writeStorage(next);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): CartLine[] {
  if (!initialized) {
    cachedLines = readStorage();
    initialized = true;
  }
  return cachedLines;
}

function getServerSnapshot(): CartLine[] {
  return EMPTY_LINES;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addItem = useCallback((slug: string, size: string, quantity = 1) => {
    const current = getSnapshot();
    const existing = current.find((l) => l.slug === slug && l.size === size);
    const next = existing
      ? current.map((l) =>
          l.slug === slug && l.size === size ? { ...l, quantity: l.quantity + quantity } : l
        )
      : [...current, { slug, size, quantity }];
    setLines(next);
  }, []);

  const removeItem = useCallback((slug: string, size: string) => {
    const current = getSnapshot();
    setLines(current.filter((l) => !(l.slug === slug && l.size === size)));
  }, []);

  const updateQuantity = useCallback((slug: string, size: string, quantity: number) => {
    const current = getSnapshot();
    const next =
      quantity <= 0
        ? current.filter((l) => !(l.slug === slug && l.size === size))
        : current.map((l) => (l.slug === slug && l.size === size ? { ...l, quantity } : l));
    setLines(next);
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const linesWithProducts = useMemo<CartLineWithProduct[]>(() => {
    return lines
      .map((line) => {
        const product = getProduct(line.slug);
        if (!product) return null;
        return { ...line, product, lineTotal: product.price * line.quantity };
      })
      .filter((l): l is CartLineWithProduct => l !== null);
  }, [lines]);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const subtotal = useMemo(
    () => linesWithProducts.reduce((sum, l) => sum + l.lineTotal, 0),
    [linesWithProducts]
  );

  const value: CartContextValue = {
    lines,
    linesWithProducts,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
