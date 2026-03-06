import { motion } from "motion/react";
import { useState } from "react";
import { Check } from "lucide-react";
import { Input } from "./ui/input";

interface Option {
  value: string;
  label: string;
  showTextField?: boolean;
}

interface SingleSelectScreenProps {
  question: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

export function SingleSelectScreen({
  question,
  options,
  value,
  onChange,
  otherValue,
  onOtherChange,
}: SingleSelectScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900">{question}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => (
          <div key={option.value}>
            <button
              type="button"
              onClick={() => onChange(option.value)}
              className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all ${
                value === option.value
                  ? "border-[#D32F2F] bg-red-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-900 font-medium">{option.label}</span>
                {value === option.value && (
                  <div className="w-5 h-5 rounded-full bg-[#D32F2F] flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            </button>
            {option.showTextField && value === option.value && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3"
              >
                <Input
                  type="text"
                  placeholder="Please specify..."
                  value={otherValue || ""}
                  onChange={(e) => onOtherChange?.(e.target.value)}
                  className="w-full"
                />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
