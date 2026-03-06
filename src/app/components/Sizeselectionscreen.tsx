// import { motion } from "motion/react";

// interface Variant {
//   id: number;
//   sizeLabel: string;
//   variantName: string;
//   isActive: boolean | null;
//   supplierSku: string | null;
// }

// interface SizeSelectionScreenProps {
//   hatSku: string;
//   hatImage: string;
//   variants: Variant[];       // dynamic sizes from the selected color's variants
//   selectedSize: string;
//   onChange: (size: string) => void;
// }

// export function SizeSelectionScreen({
//   hatSku,
//   hatImage,
//   variants,
//   selectedSize,
//   onChange,
// }: SizeSelectionScreenProps) {
//   return (
//     <motion.div
//       key="size-selection"
//       initial={{ opacity: 0, x: 40 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -40 }}
//       transition={{ duration: 0.3, ease: "easeInOut" }}
//       className="flex flex-col gap-8"
//     >
//       {/* Header */}
//       <div className="flex flex-col gap-1">
//         <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
//           SKU: {hatSku}
//         </p>
//         <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
//           Choose your size
//         </h2>
//         <p className="text-gray-500 text-sm mt-1">
//           Select the size you'd like for this sample hat.
//         </p>
//       </div>

//       <div className="flex flex-col md:flex-row gap-8 items-start">
//         {/* Hat preview */}
//         <div className="w-full md:w-56 shrink-0">
//           <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm aspect-square bg-gray-50">
//             <img
//               src={hatImage}
//               alt={`Hat ${hatSku}`}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>

//         {/* Size options — built from variants */}
//         <div className="flex flex-col gap-3 w-full">
//           {variants.map((variant, i) => {
//             const isSelected = selectedSize === variant.sizeLabel;
//             return (
//               <motion.button
//                 key={variant.id}
//                 initial={{ opacity: 0, y: 12 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.07, duration: 0.25 }}
//                 onClick={() => onChange(variant.sizeLabel)}
//                 className={`
//                   w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border-2
//                   transition-all duration-200 text-left group cursor-pointer
//                   ${
//                     isSelected
//                       ? "border-gray-900 bg-gray-900 text-white shadow-md"
//                       : "border-gray-200 bg-white text-gray-800 hover:border-gray-400 hover:shadow-sm"
//                   }
//                 `}
//               >
//                 <div className="flex items-center gap-4">
//                   {/* Radio indicator */}
//                   <div
//                     className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
//                       ${
//                         isSelected
//                           ? "border-white"
//                           : "border-gray-300 group-hover:border-gray-500"
//                       }`}
//                   >
//                     {isSelected && (
//                       <motion.div
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         className="w-2.5 h-2.5 rounded-full bg-white"
//                       />
//                     )}
//                   </div>

//                   {/* Size label */}
//                   <p
//                     className={`font-bold text-lg leading-none ${
//                       isSelected ? "text-white" : "text-gray-900"
//                     }`}
//                   >
//                     {variant.sizeLabel}
//                   </p>
//                 </div>

//                 {/* Variant name badge */}
//                 <span
//                   className={`text-sm font-medium px-3 py-1 rounded-full shrink-0
//                     ${
//                       isSelected
//                         ? "bg-white/20 text-white"
//                         : "bg-gray-100 text-gray-500"
//                     }`}
//                 >
//                   {variant.variantName}
//                 </span>
//               </motion.button>
//             );
//           })}
//         </div>
//       </div>
//     </motion.div>
//   );
// }






import { motion } from "motion/react";

interface Variant {
  id: number;
  sizeLabel: string;
  variantName: string;
  isActive: boolean | null;
  supplierSku: string | null;
}

interface SizeSelectionScreenProps {
  hatSku: string;
  hatImage: string;
  variants: Variant[];
  selectedSize: string;
  onChange: (size: string) => void;
  hatNumber: number;          // e.g. 1, 2, 3
  totalHatsWithSizes: number; // total hats that have size options
}

export function SizeSelectionScreen({
  hatSku,
  hatImage,
  variants,
  selectedSize,
  onChange,
  hatNumber,
  totalHatsWithSizes,
}: SizeSelectionScreenProps) {
  return (
    <motion.div
      key={`size-selection-${hatSku}`}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-col gap-8"
    >
      {/* Header */}
      <div className="flex flex-col gap-1">
        {/* Hat counter pill */}
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
            Hat {hatNumber} of {totalHatsWithSizes}
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            SKU: {hatSku}
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
          Choose your size
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Select the size you'd like for this sample hat.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Hat preview */}
        <div className="w-full md:w-56 shrink-0">
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm aspect-square bg-gray-50">
            <img
              src={hatImage}
              alt={`Hat ${hatSku}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Size options */}
        <div className="flex flex-col gap-3 w-full">
          {variants.map((variant, i) => {
            const isSelected = selectedSize === variant.sizeLabel;
            return (
              <motion.button
                key={variant.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.25 }}
                onClick={() => onChange(variant.sizeLabel)}
                className={`
                  w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border-2
                  transition-all duration-200 text-left group cursor-pointer
                  ${
                    isSelected
                      ? "border-gray-900 bg-gray-900 text-white shadow-md"
                      : "border-gray-200 bg-white text-gray-800 hover:border-gray-400 hover:shadow-sm"
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  {/* Radio indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                      ${
                        isSelected
                          ? "border-white"
                          : "border-gray-300 group-hover:border-gray-500"
                      }`}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2.5 h-2.5 rounded-full bg-white"
                      />
                    )}
                  </div>

                  {/* Size label */}
                  <p
                    className={`font-bold text-lg leading-none ${
                      isSelected ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {variant.sizeLabel}
                  </p>
                </div>

                {/* Variant name badge */}
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full shrink-0
                    ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                >
                  {variant.variantName}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}