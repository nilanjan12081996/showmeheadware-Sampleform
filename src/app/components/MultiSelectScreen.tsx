import { motion } from "motion/react";
import { Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectScreenProps {
  question: string;
  options: Option[];
  values: string[];
  onChange: (values: string[]) => void;
}

export function MultiSelectScreen({
  question,
  options,
  values,
  onChange,
}: MultiSelectScreenProps) {
  const toggleValue = (value: string) => {
    if (values.includes(value)) {
      onChange(values.filter((v) => v !== value));
    } else {
      onChange([...values, value]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">{question}</h2>
        <p className="text-sm text-gray-500">Select all that apply</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => {
          const isSelected = values.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleValue(option.value)}
              className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all ${
                isSelected
                  ? "border-[#D32F2F] bg-red-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-900 font-medium">{option.label}</span>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[#D32F2F] flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
