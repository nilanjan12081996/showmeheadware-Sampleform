import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Lock, CreditCard, CheckCircle2, AlertCircle } from "lucide-react";

// ─── Stripe type stubs ────────────────────────────────────────────────────────
declare global {
  interface Window {
    Stripe?: (key: string) => StripeInstance;
  }
}
interface StripeInstance {
  elements: (options: object) => StripeElements;
  confirmPayment: (options: {
    elements: StripeElements;
    confirmParams: { return_url?: string };
    redirect: "if_required";
  }) => Promise<{ error?: { message: string }; paymentIntent?: { status: string } }>;
}
interface StripeElements {
  create: (type: string, options?: object) => StripeElement;
  submit: () => Promise<{ error?: { message: string } }>;
}
interface StripeElement {
  mount: (el: HTMLElement) => void;
  on: (event: string, handler: (e: any) => void) => void;
  destroy: () => void;
}
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = "https://customheadwearjava.showmecustomapparel.com/";

interface PaymentScreenProps {
  amountLabel: string;
  /** Called after Stripe confirms payment successfully — parent saves & navigates */
  onPaymentSuccess: () => Promise<void>;
  isSaving: boolean;
  saveError: string | null;
}

export function PaymentScreen({
  amountLabel,
  onPaymentSuccess,
  isSaving,
  saveError,
}: PaymentScreenProps) {
  const [loadingKeys, setLoadingKeys] = useState(true);
  const [stripeReady, setStripeReady] = useState(false);
  const [keyError, setKeyError] = useState<string | null>(null);

  const [cardComplete, setCardComplete] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const stripeRef = useRef<StripeInstance | null>(null);
  const elementsRef = useRef<StripeElements | null>(null);
  const cardElRef = useRef<StripeElement | null>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const clientSecretRef = useRef<string>("");

  // ── Step 1: load Stripe.js from CDN, then fetch publishable key + client secret ──
  useEffect(() => {
    const init = async () => {
      try {
        // Load Stripe.js if not already present
        if (!window.Stripe) {
          await new Promise<void>((resolve, reject) => {
            const s = document.createElement("script");
            s.src = "https://js.stripe.com/v3/";
            s.async = true;
            s.onload = () => resolve();
            s.onerror = () => reject(new Error("Failed to load Stripe.js"));
            document.head.appendChild(s);
          });
        }

        // Fetch publishable key and client secret in parallel
        const [keyRes, secretRes] = await Promise.all([
          fetch(`${BASE_URL}api/stripe/key`),
          fetch(`${BASE_URL}api/stripe/secret`),
        ]);

        if (!keyRes.ok || !secretRes.ok) {
          throw new Error("Failed to fetch Stripe configuration.");
        }

        const keyData    = await keyRes.json();
        const secretData = await secretRes.json();

        const publishableKey = keyData.data?.stripeKey;
        const clientSecret   = secretData.data; // "pi_xxx_secret_xxx"

        if (!publishableKey || !clientSecret) {
          throw new Error("Invalid Stripe configuration received.");
        }

        clientSecretRef.current = clientSecret;

        // Init Stripe with publishable key + client secret in Elements
        const stripe = window.Stripe!(publishableKey);
        stripeRef.current = stripe;

        const elements = stripe.elements({
          clientSecret,
          appearance: {
            theme: "stripe",
            variables: {
              colorPrimary:     "#111827",
              colorBackground:  "#ffffff",
              colorText:        "#111827",
              colorDanger:      "#ef4444",
              fontFamily:       "Inter, system-ui, sans-serif",
              borderRadius:     "12px",
            },
          },
        });
        elementsRef.current = elements;
        setStripeReady(true);
      } catch (err: any) {
        setKeyError(err?.message ?? "Could not load payment form.");
      } finally {
        setLoadingKeys(false);
      }
    };

    init();
  }, []);

  // ── Step 2: mount the Payment Element once Elements is ready ──────────────
  useEffect(() => {
    if (!stripeReady || !elementsRef.current || !mountRef.current) return;
    if (cardElRef.current) return; // already mounted

    const paymentElement = elementsRef.current.create("payment", {
      layout: "tabs",
    });
    paymentElement.mount(mountRef.current);
    cardElRef.current = paymentElement;

    paymentElement.on("change", (e: any) => {
      setCardError(e.error?.message ?? null);
      setCardComplete(e.complete ?? false);
    });

    return () => {
      cardElRef.current?.destroy();
      cardElRef.current = null;
    };
  }, [stripeReady]);

  // ── Pay handler ───────────────────────────────────────────────────────────
  const handlePay = async () => {
    if (!stripeRef.current || !elementsRef.current || !cardComplete) return;
    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Validate form fields first
      const { error: submitError } = await elementsRef.current.submit();
      if (submitError) {
        setPaymentError(submitError.message);
        return;
      }

      // Confirm the PaymentIntent using the client secret
      const { error, paymentIntent } = await stripeRef.current.confirmPayment({
        elements: elementsRef.current,
        confirmParams: {},
        redirect: "if_required",
      });

      if (error) {
        setPaymentError(error.message);
        return;
      }

      if (paymentIntent?.status === "succeeded" || paymentIntent?.status === "processing") {
        // Payment confirmed — let parent call save API then navigate
        await onPaymentSuccess();
      } else {
        setPaymentError("Payment was not completed. Please try again.");
      }
    } catch (err: any) {
      setPaymentError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const busy         = isProcessing || isSaving;
  const combinedError = paymentError || saveError;

  return (
    <motion.div
      key="payment-screen"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-col gap-8"
    >
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
          Complete your order
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          A one-time sample fee of{" "}
          <span className="font-semibold text-gray-800">{amountLabel}</span> covers
          embroidery setup and shipping for your custom sample pack.
        </p>
      </div>

      {/* Order summary */}
      <div className="bg-gray-50 rounded-2xl p-5 flex items-center justify-between border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Custom Sample Pack</p>
            <p className="text-gray-500 text-xs mt-0.5">4 embroidered hats with your logo</p>
          </div>
        </div>
        <p className="text-xl font-bold text-gray-900">{amountLabel}</p>
      </div>

      {/* Stripe Elements mount */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-gray-700">Payment details</label>

        {/* Loading keys / Stripe.js */}
        {loadingKeys && (
          <div className="h-[180px] rounded-2xl border border-gray-200 flex items-center justify-center">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Spinner />
              Loading payment form…
            </div>
          </div>
        )}

        {/* Key / network error */}
        {keyError && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{keyError}</p>
          </div>
        )}

        {/* Payment Element container — always in DOM so Stripe can mount */}
        <div
          ref={mountRef}
          className={`rounded-2xl border border-gray-200 p-4 bg-white transition-all focus-within:border-gray-400 ${
            !stripeReady ? "hidden" : ""
          }`}
        />

        {cardError && (
          <p className="text-sm text-red-600 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {cardError}
          </p>
        )}
      </div>

      {/* Combined error */}
      {combinedError && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{combinedError}</p>
        </div>
      )}

      {/* Pay button */}
      <button
        onClick={handlePay}
        disabled={busy || !cardComplete || !stripeReady || !!keyError}
        className={`
          w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold text-base
          transition-all duration-200
          ${
            busy || !cardComplete || !stripeReady || !!keyError
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.99] shadow-md hover:shadow-lg"
          }
        `}
      >
        {busy ? (
          <>
            <Spinner />
            {isSaving ? "Saving your order…" : "Processing payment…"}
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            Pay {amountLabel} securely
          </>
        )}
      </button>

      {/* Trust badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <Badge icon={<Lock className="w-3.5 h-3.5" />} label="256-bit SSL encryption" />
        <Badge icon={<CheckCircle2 className="w-3.5 h-3.5" />} label="Powered by Stripe" />
        <Badge icon={<CheckCircle2 className="w-3.5 h-3.5" />} label="One-time charge only" />
      </div>
    </motion.div>
  );
}

// ── Small helpers ─────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-400">
      {icon}
      {label}
    </div>
  );
}