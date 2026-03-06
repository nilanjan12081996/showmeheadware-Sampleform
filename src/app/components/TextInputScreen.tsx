import { motion } from "motion/react";
import { Input } from "./ui/input";

interface TextInputScreenProps {
  question: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

export function TextInputScreen({
  question,
  value,
  onChange,
  placeholder = "",
  type = "text",
}: TextInputScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900">{question}</h2>

      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-lg py-6 px-4"
      />
    </motion.div>
  );
}
