import { motion } from "motion/react";
import { Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Hat {
  sku: string;
  image: string;
}

interface HatSelectionScreenProps {
  hats: Hat[];
  selectedHats: string[];
  onChange: (hats: string[]) => void;
  maxSelection: number;
}

export function HatSelectionScreen({
  hats,
  selectedHats,
  onChange,
  maxSelection,
}: HatSelectionScreenProps) {
  const toggleHat = (sku: string) => {
    if (selectedHats.includes(sku)) {
      onChange(selectedHats.filter((s) => s !== sku));
    } else {
      if (selectedHats.length < maxSelection) {
        onChange([...selectedHats, sku]);
      }
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
        <h2 className="text-2xl font-semibold text-gray-900">
          Choose up to {maxSelection} hats for your free samples
        </h2>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Select your favorite styles</p>
          <div className="text-sm font-medium">
            <span
              className={selectedHats.length === maxSelection ? "text-[#D32F2F]" : "text-gray-600"}
            >
              Selected {selectedHats.length} / {maxSelection}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {hats.map((hat) => {
          const isSelected = selectedHats.includes(hat.sku);
          const isDisabled = !isSelected && selectedHats.length >= maxSelection;

          return (
            <button
              key={hat.sku}
              type="button"
              onClick={() => !isDisabled && toggleHat(hat.sku)}
              disabled={isDisabled}
              className={`relative rounded-xl border-2 overflow-hidden transition-all ${
                isSelected
                  ? "border-[#D32F2F] ring-2 ring-[#D32F2F] ring-opacity-20"
                  : isDisabled
                  ? "border-gray-200 opacity-50 cursor-not-allowed"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="aspect-square bg-gray-50">
                <ImageWithFallback
                  src={hat.image}
                  alt={hat.sku}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 bg-white">
                <p className="text-sm font-medium text-gray-900">{hat.sku}</p>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-[#D32F2F] rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
