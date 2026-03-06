import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export function ThankYouScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6 py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="flex justify-center"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
      </motion.div>

      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-gray-900">
          Thank You!
        </h1>
        <p className="text-xl text-gray-600">
          Your response has been received
        </p>
      </div>

      <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-2xl p-6">
        <p className="text-gray-700">
          Our team will review your request and prepare your sample pack shortly.
          You'll receive a confirmation email with tracking information once your
          samples ship.
        </p>
      </div>
    </motion.div>
  );
}
