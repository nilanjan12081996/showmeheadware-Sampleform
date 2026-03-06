// import { motion } from "motion/react";
// import { Button } from "./ui/button";
// import { ArrowRight, Check } from "lucide-react";

// interface WelcomeScreenProps {
//   onStart: () => void;
// }

// export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       className="text-center space-y-6"
//     >
//       <div className="w-16 h-16 bg-[#D32F2F] rounded-2xl flex items-center justify-center mx-auto">
//         <span className="text-white font-bold text-2xl">SM</span>
//       </div>

//       <div className="space-y-3">
//         <h1 className="text-4xl font-bold text-gray-900">
//           Let's Build Your Sample Pack
//         </h1>
//         <p className="text-xl text-[#D32F2F] font-semibold">
//           Show Me Custom Headwear
//         </p>
//       </div>

//       <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 text-left max-w-xl mx-auto">
//         <div className="flex items-start gap-3">
//           <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
//             <Check className="w-3 h-3 text-green-600" />
//           </div>
//           <p className="text-gray-700">Two minutes to complete</p>
//         </div>
//         <div className="flex items-start gap-3">
//           <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
//             <Check className="w-3 h-3 text-green-600" />
//           </div>
//           <p className="text-gray-700">Choose 4 hat styles and colors</p>
//         </div>
//         <div className="flex items-start gap-3">
//           <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
//             <Check className="w-3 h-3 text-green-600" />
//           </div>
//           <p className="text-gray-700">
//             We embroider your top 3 choices and hold the 4th as backup
//           </p>
//         </div>
//         <div className="flex items-start gap-3">
//           <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
//             <Check className="w-3 h-3 text-green-600" />
//           </div>
//           <p className="text-gray-700">
//             Love what you see? Your sample order will be credited toward your
//             first full order
//           </p>
//         </div>
//       </div>

//       <Button
//         onClick={onStart}
//         className="gap-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-8 py-6 text-lg mt-8"
//       >
//         Select My Samples
//         <ArrowRight className="w-5 h-5" />
//       </Button>
//     </motion.div>
//   );
// }


import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight, Check } from "lucide-react";
import logo from "../../assets/logo.png";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-xl mx-auto text-center space-y-8"
    >
      {/* Logo Section */}
      <div className="flex justify-center">
        <img 
          src={logo} 
          alt="Show Me Custom Headwear" 
          className="h-50 w-auto" 
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Let's Build Your Sample Pack</h1>
        <p className="text-lg text-gray-600">
          Two minutes to fill this out. A few days until premium embroidered hats 
          with your logo are at your door.
        </p>
      </div>

      {/* Primary Value Prop */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-left space-y-4">
        <p className="font-semibold text-gray-900">How it works:</p>
        <div className="flex items-start gap-3">
          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-gray-700">Pick 4 styles and choose your colors.</p>
        </div>
        <div className="flex items-start gap-3">
          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-gray-700">We embroider your top 3 and hold the 4th as a backup to ensure we always get you what you need.</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-100 mt-4">
          <p className="text-sm font-medium text-red-800">
            Love what you see? We'll credit your $10 toward your first bulk order.
          </p>
        </div>
      </div>

      {/* Important Details */}
      <div className="text-left space-y-3 bg-gray-50 p-6 rounded-2xl">
        <h3 className="font-semibold text-gray-900 mb-2">A couple things before you dive in:</h3>
        <div className="space-y-3 text-sm text-gray-600">
          <p className="flex gap-2"><span>🧢</span> All samples ship to one address with your logo embroidered front and center</p>
          <p className="flex gap-2"><span>🧢</span> If a color is out of stock we'll substitute from your backup selection automatically</p>
          <p className="flex gap-2"><span>🧢</span> Current lead time is 7–12 business days — we'll keep you posted every step of the way</p>
        </div>
        <div>
        <p className="font-bold">Let's see what we can build for you. 👇</p> 
        </div>
      </div>

      <Button
        onClick={onStart}
        className="w-full gap-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white py-6 text-lg shadow-lg shadow-red-900/20"
      >
       Select My Samples!
      </Button>
    </motion.div>
  );
}
