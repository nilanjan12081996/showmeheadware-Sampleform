import { motion } from "motion/react";
import { Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ColorOption {
  name: string;
  image: string;
}

interface ColorSelectionScreenProps {
  hatSku: string;
  hatImage: string;
  colors: ColorOption[];
  selectedColor: string;
  onChange: (color: string) => void;
}

export function ColorSelectionScreen({
  hatSku,
  hatImage,
  colors,
  selectedColor,
  onChange,
}: ColorSelectionScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Which color would you like for {hatSku}?
        </h2>
        <div className="flex justify-center">
          <div className="w-48 h-48 bg-gray-50 rounded-xl overflow-hidden">
            <ImageWithFallback
              src={hatImage}
              alt={hatSku}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {colors.map((color) => {
          const isSelected = selectedColor === color.name;

          return (
            <button
              key={color.name}
              type="button"
              onClick={() => onChange(color.name)}
              className={`relative rounded-xl border-2 overflow-hidden transition-all ${
                isSelected
                  ? "border-[#D32F2F] ring-2 ring-[#D32F2F] ring-opacity-20"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="aspect-square bg-gray-50">
                <ImageWithFallback
                  src={color.image}
                  alt={color.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 bg-white">
                <p className="text-sm font-medium text-gray-900">{color.name}</p>
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
