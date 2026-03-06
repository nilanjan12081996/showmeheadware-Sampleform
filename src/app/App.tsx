// import { useState, useEffect } from "react";
// import { AnimatePresence } from "motion/react";
// import { ProgressBar } from "./components/ProgressBar";
// import { NavigationButtons } from "./components/NavigationButtons";
// import { WelcomeScreen } from "./components/WelcomeScreen";
// import { SingleSelectScreen } from "./components/SingleSelectScreen";
// import { MultiSelectScreen } from "./components/MultiSelectScreen";
// import { TextInputScreen } from "./components/TextInputScreen";
// import { ContactScreen } from "./components/ContactScreen";
// import { AddressScreen } from "./components/AddressScreen";
// import { FileUploadScreen } from "./components/FileUploadScreen";
// import { HatSelectionScreen } from "./components/HatSelectionScreen";
// import { ColorSelectionScreen } from "./components/ColorSelectionScreen";
// import { ThankYouScreen } from "./components/ThankYouScreen";

// // Suppress browser extension errors (MetaMask, etc.)
// if (typeof window !== "undefined") {
//   const originalError = console.error;
//   console.error = (...args: any[]) => {
//     const errorString = args.join(" ");
//     // Filter out MetaMask and other extension errors
//     if (
//       errorString.includes("MetaMask") ||
//       errorString.includes("chrome-extension://") ||
//       errorString.includes("Failed to connect")
//     ) {
//       return;
//     }
//     originalError.apply(console, args);
//   };

//   // Suppress unhandled promise rejections from extensions
//   window.addEventListener("unhandledrejection", (event) => {
//     if (
//       event.reason?.message?.includes("MetaMask") ||
//       event.reason?.stack?.includes("chrome-extension://")
//     ) {
//       event.preventDefault();
//     }
//   });
// }

// interface FormData {
//   industry: string;
//   industryOther: string;
//   primaryUse: string[];
//   teamSize: string;
//   frustrations: string[];
//   whySamples: string[];
//   deliveryTiming: string;
//   orderingFrequency: string;
//   budgetApproval: string;
//   brandApproach: string[];
//   website: string;
//   contact: {
//     firstName: string;
//     lastName: string;
//     phone: string;
//     email: string;
//     company: string;
//   };
//   address: {
//     address: string;
//     address2: string;
//     city: string;
//     state: string;
//     zip: string;
//     country: string;
//   };
//   logo: File | null;
//   selectedHats: string[];
//   hatColors: Record<string, string>;
// }

// const HATS = [
//   { sku: "i7041", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNlYmFsbCUyMGNhcCUyMHdoaXRlJTIwbWluaW1hbHxlbnwxfHx8fDE3NzI3MTI3MDN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
//   { sku: "i7256", image: "https://images.unsplash.com/photo-1699347416106-f146d3dd2058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFuaWUlMjB3aW50ZXIlMjBoYXQlMjBibHVlfGVufDF8fHx8MTc3MjcxMjcwNXww&ixlib=rb-4.1.0&q=80&w=1080" },
//   { sku: "i8501", image: "https://images.unsplash.com/photo-1759479113447-eeac404f9008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWNrZXQlMjBoYXQlMjBvdXRkb29yJTIwdGFufGVufDF8fHx8MTc3MjcxMjcwNXww&ixlib=rb-4.1.0&q=80&w=1080" },
//   { sku: "i8502", image: "https://images.unsplash.com/photo-1626872640220-e5f4454198b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWQlMjBoYXQlMjBuYXZ5JTIwY2FzdWFsfGVufDF8fHx8MTc3MjcxMjcwNXww&ixlib=rb-4.1.0&q=80&w=1080" },
//   { sku: "i8503", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXR0ZWQlMjBjYXAlMjBzcG9ydHMlMjBncmV5fGVufDF8fHx8MTc3MjcxMjcwNnww&ixlib=rb-4.1.0&q=80&w=1080" },
//   { sku: "i8504", image: "https://images.unsplash.com/photo-1582735142555-dfe7455f7dc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbGF0JTIwYnJpbSUyMGNhcCUyMHN0cmVldHdlYXJ8ZW58MXx8fHwxNzcyNzEyNzA3fDA&ixlib=rb-4.1.0&q=80&w=1080" },
//   { sku: "i8505", image: "https://images.unsplash.com/photo-1661944914235-1f21947213d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1vJTIwY2Ftb3VmbGFnZSUyMGhhdCUyMGh1bnRpbmd8ZW58MXx8fHwxNzcyNzEyNzA3fDA&ixlib=rb-4.1.0&q=80&w=1080" },
//   { sku: "i8508", image: "https://images.unsplash.com/photo-1758472437161-f04301da821b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FwJTIwcmV0cm8lMjBzdHlsZXxlbnwxfHx8fDE3NzI3MTI3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
//   { sku: "i8525", image: "https://images.unsplash.com/photo-1689732844443-8e50b1efac70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xmJTIwaGF0JTIwd2hpdGUlMjBwcmVtaXVtfGVufDF8fHx8MTc3MjcxMjcwOXww&ixlib=rb-4.1.0&q=80&w=1080" },
//   { sku: "i8530", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNlYmFsbCUyMGNhcCUyMHdoaXRlJTIwbWluaW1hbHxlbnwxfHx8fDE3NzI3MTI3MDN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
//   { sku: "i3038", image: "https://images.unsplash.com/photo-1699347416106-f146d3dd2058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFuaWUlMjB3aW50ZXIlMjBoYXQlMjBibHVlfGVufDF8fHx8MTc3MjcxMjcwNXww&ixlib=rb-4.1.0&q=80&w=1080" },
//   { sku: "i3057", image: "https://images.unsplash.com/photo-1759479113447-eeac404f9008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWNrZXQlMjBoYXQlMjBvdXRkb29yJTIwdGFufGVufDF8fHx8MTc3MjcxMjcwNXww&ixlib=rb-4.1.0&q=80&w=1080" },
//   { sku: "i3056", image: "https://images.unsplash.com/photo-1626872640220-e5f4454198b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWQlMjBoYXQlMjBuYXZ5JTIwY2FzdWFsfGVufDF8fHx8MTc3MjcxMjcwNXww&ixlib=rb-4.1.0&q=80&w=1080" },
//   { sku: "i5054", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXR0ZWQlMjBjYXAlMjBzcG9ydHMlMjBncmV5fGVufDF8fHx8MTc3MjcxMjcwNnww&ixlib=rb-4.1.0&q=80&w=1080" },
// ];

// const COLOR_OPTIONS = [
//   { name: "Black", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNlYmFsbCUyMGNhcCUyMHdoaXRlJTIwbWluaW1hbHxlbnwxfHx8fDE3NzI3MTI3MDN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
//   { name: "White", image: "https://images.unsplash.com/photo-1699347416106-f146d3dd2058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFuaWUlMjB3aW50ZXIlMjBoYXQlMjBibHVlfGVufDF8fHx8MTc3MjcxMjcwNXww&ixlib=rb-4.1.0&q=80&w=1080" },
//   { name: "Navy", image: "https://images.unsplash.com/photo-1626872640220-e5f4454198b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWQlMjBoYXQlMjBuYXZ5JTIwY2FzdWFsfGVufDF8fHx8MTc3MjcxMjcwNXww&ixlib=rb-4.1.0&q=80&w=1080" },
//   { name: "Red", image: "https://images.unsplash.com/photo-1759479113447-eeac404f9008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWNrZXQlMjBoYXQlMjBvdXRkb29yJTIwdGFufGVufDF8fHx8MTc3MjcxMjcwNXww&ixlib=rb-4.1.0&q=80&w=1080" },
//   { name: "Grey", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXR0ZWQlMjBjYXAlMjBzcG9ydHMlMjBncmV5fGVufDF8fHx8MTc3MjcxMjcwNnww&ixlib=rb-4.1.0&q=80&w=1080" },
//   { name: "Khaki", image: "https://images.unsplash.com/photo-1582735142555-dfe7455f7dc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbGF0JTIwYnJpbSUyMGNhcCUyMHN0cmVldHdlYXJ8ZW58MXx8fHwxNzcyNzEyNzA3fDA&ixlib=rb-4.1.0&q=80&w=1080" },
// ];

// export default function App() {
//   const [currentStep, setCurrentStep] = useState(0);
//   // const [hats, setHats] = useState<{ sku: string; image: string }[]>([]);
// const [loadingHats, setLoadingHats] = useState(false);
// const BASE_URL = "https://customheadwearjava.showmecustomapparel.com/";

// // useEffect(() => {
// //   const fetchHats = async () => {
// //     try {
// //       const response = await fetch(
// //         "https://customheadwearjava.showmecustomapparel.com/api/hat/list"
// //       );

// //       const data = await response.json();

// //       console.log("API HATS:", data);

// //       const formattedHats = data.map((hat: any) => {
// //         // 👇 pick first image that is NOT hatColorId 0
// //         const firstImage =
// //           hat.images.find((img: any) => img.hatColorId !== 0) ||
// //           hat.images[0];

// //         return {
// //           sku: hat.name,
// //           image: firstImage
// //             ? BASE_URL + firstImage.imageUrl
// //             : "",
// //         };
// //       });

// //       setHats(formattedHats);
// //     } catch (error) {
// //       console.error("Error fetching hats:", error);
// //     }
// //   };

// //   fetchHats();
// // }, []);

  


// interface HatImage {
//   hatColorId: number;
//   imageUrl: string;
// }

// interface HatColor {
//   id: number;
//   name: string;
// }

// interface Hat {
//   sku: string;
//   image: string;
//   colors: HatColor[];
//   images: HatImage[];
// }

// const [hats, setHats] = useState<Hat[]>([]);




// useEffect(() => {
//   const fetchHats = async () => {
//     try {
//       const response = await fetch(
//         "https://customheadwearjava.showmecustomapparel.com/api/hat/list"
//       );

//       const data = await response.json();

//       const formattedHats = data.map((hat: any) => {
//         const firstImage =
//           hat.images.find((img: any) => img.hatColorId !== 0) ||
//           hat.images[0];

//         return {
//           sku: hat.name,
//           image: firstImage
//             ? BASE_URL + firstImage.imageUrl
//             : "",
//           colors: hat.colors,
//           images: hat.images,
//         };
//       });

//       setHats(formattedHats);
//     } catch (error) {
//       console.error("Error fetching hats:", error);
//     }
//   };

//   fetchHats();
// }, []);




// const [formData, setFormData] = useState<FormData>({
//     industry: "",
//     industryOther: "",
//     primaryUse: [],
//     teamSize: "",
//     frustrations: [],
//     whySamples: [],
//     deliveryTiming: "",
//     orderingFrequency: "",
//     budgetApproval: "",
//     brandApproach: [],
//     website: "",
//     contact: {
//       firstName: "",
//       lastName: "",
//       phone: "",
//       email: "",
//       company: "",
//     },
//     address: {
//       address: "",
//       address2: "",
//       city: "",
//       state: "",
//       zip: "",
//       country: "",
//     },
//     logo: null,
//     selectedHats: [],
//     hatColors: {},
//   });

//   const totalSteps = 17;

//   const canProgress = () => {
//     switch (currentStep) {
//       case 1:
//         return formData.industry !== "";
//       case 2:
//         return formData.primaryUse.length > 0;
//       case 3:
//         return formData.teamSize !== "";
//       case 4:
//         return formData.frustrations.length > 0;
//       case 5:
//         return formData.whySamples.length > 0;
//       case 6:
//         return formData.deliveryTiming !== "";
//       case 7:
//         return formData.orderingFrequency !== "";
//       case 8:
//         return formData.budgetApproval !== "";
//       case 9:
//         return formData.brandApproach.length > 0;
//       case 10:
//         return formData.website !== "";
//       case 11:
//         return (
//           formData.contact.firstName !== "" &&
//           formData.contact.email !== "" &&
//           formData.contact.company !== ""
//         );
//       case 12:
//         return formData.address.address !== "" && formData.address.city !== "";
//       case 13:
//         return formData.logo !== null;
//       case 14:
//         return formData.selectedHats.length === 4;
//       default:
//         if (currentStep >= 15 && currentStep < 15 + formData.selectedHats.length) {
//           const hatIndex = currentStep - 15;
//           const hatSku = formData.selectedHats[hatIndex];
//           return formData.hatColors[hatSku] !== undefined && formData.hatColors[hatSku] !== "";
//         }
//         return true;
//     }
//   };

//   // const handleNext = () => {
//   //   if (canProgress()) {
//   //     if (currentStep === 14) {
//   //       setCurrentStep(15);
//   //     } else if (currentStep >= 15 && currentStep < 14 + formData.selectedHats.length) {
//   //       setCurrentStep(currentStep + 1);
//   //     } else if (currentStep < totalSteps - 1) {
//   //       setCurrentStep(currentStep + 1);
//   //     }
//   //   }
//   // };


//   const handleNext = () => {
//   if (!canProgress()) return;

//   const finalStep = 15 + formData.selectedHats.length;

//   // ✅ If user is on last step → log JSON
//   if (currentStep === finalStep - 1) {
//     console.log("FINAL FORM JSON:", JSON.stringify(formData, null, 2));
//     setCurrentStep(finalStep);
//     return;
//   }

//   // Normal step progression
//   if (currentStep === 14) {
//     setCurrentStep(15);
//   } else if (currentStep >= 15 && currentStep < 14 + formData.selectedHats.length) {
//     setCurrentStep(currentStep + 1);
//   } else {
//     setCurrentStep(currentStep + 1);
//   }
// };

//   const handleBack = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleStart = () => {
//     setCurrentStep(1);
//   };

//   const renderStep = () => {
//     if (currentStep === 0) {
//       return <WelcomeScreen onStart={handleStart} />;
//     }

//     if (currentStep === 1) {
//       return (
//         <SingleSelectScreen
//           question="What industry best describes your organization?"
//           options={[
//             { value: "construction", label: "Construction/Trade" },
//             { value: "hospitality", label: "Hospitality" },
//             { value: "professional", label: "Professional Services" },
//             { value: "school", label: "School/Sports Team" },
//             { value: "agriculture", label: "Agriculture" },
//             { value: "outdoor", label: "Outdoor (Hunting/Fishing)" },
//             { value: "gym", label: "Gym/Fitness" },
//             { value: "nonprofit", label: "Nonprofit" },
//             { value: "church", label: "Church" },
//             { value: "event", label: "Event/Festival" },
//             { value: "retail", label: "Retail/Ecommerce" },
//             { value: "manufacturing", label: "Manufacturing/Industrial" },
//             { value: "corporate", label: "Corporate Office" },
//             { value: "other", label: "Other", showTextField: true },
//           ]}
//           value={formData.industry}
//           onChange={(value) => setFormData({ ...formData, industry: value })}
//           otherValue={formData.industryOther}
//           onOtherChange={(value) => setFormData({ ...formData, industryOther: value })}
//         />
//       );
//     }

//     if (currentStep === 2) {
//       return (
//         <MultiSelectScreen
//           question="What will you primarily use these hats for?"
//           options={[
//             { value: "uniforms", label: "Employee / Staff Uniforms" },
//             { value: "merchandise", label: "Merchandise to Sell" },
//             { value: "promotional", label: "Promotional Giveaways" },
//             { value: "gifts", label: "Client / Customer Gifts" },
//             { value: "events", label: "Event or Trade Show Use" },
//             { value: "branding", label: "Team / Company Branding" },
//             { value: "fundraiser", label: "Fundraiser" },
//             { value: "not_sure", label: "Not Sure Yet" },
//           ]}
//           values={formData.primaryUse}
//           onChange={(values) => setFormData({ ...formData, primaryUse: values })}
//         />
//       );
//     }

//     if (currentStep === 3) {
//       return (
//         <SingleSelectScreen
//           question="How many people are on your team?"
//           options={[
//             { value: "1-5", label: "1-5" },
//             { value: "6-15", label: "6-15" },
//             { value: "16-25", label: "16-25" },
//             { value: "26-50", label: "26-50" },
//             { value: "50+", label: "50+" },
//           ]}
//           value={formData.teamSize}
//           onChange={(value) => setFormData({ ...formData, teamSize: value })}
//         />
//       );
//     }

//     if (currentStep === 4) {
//       return (
//         <MultiSelectScreen
//           question="What's your biggest frustration with branded headwear so far?"
//           options={[
//             { value: "quality", label: "Quality never matches expectations" },
//             { value: "logo", label: "Logo accuracy issues" },
//             { value: "lead_times", label: "Lead times too long" },
//             { value: "pricing", label: "Pricing inconsistent" },
//             { value: "communication", label: "Supplier communication issues" },
//             { value: "minimums", label: "Minimum order quantities too high" },
//             { value: "never_ordered", label: "Never ordered before" },
//             { value: "no_issues", label: "No major issues" },
//           ]}
//           values={formData.frustrations}
//           onChange={(values) => setFormData({ ...formData, frustrations: values })}
//         />
//       );
//     }

//     if (currentStep === 5) {
//       return (
//         <MultiSelectScreen
//           question="What prompted you to request samples?"
//           options={[
//             { value: "season", label: "Preparing for season/event" },
//             { value: "restocking", label: "Restocking merch program" },
//             { value: "expanding", label: "Expanding merch program" },
//             { value: "first_time", label: "Trying headwear for first time" },
//             { value: "switching", label: "Switching supplier" },
//             { value: "comparing", label: "Comparing vendors" },
//             { value: "quality_check", label: "Checking quality before bulk order" },
//             { value: "quarter", label: "Preparing for order this quarter" },
//           ]}
//           values={formData.whySamples}
//           onChange={(values) => setFormData({ ...formData, whySamples: values })}
//         />
//       );
//     }

//     if (currentStep === 6) {
//       return (
//         <SingleSelectScreen
//           question="When would you ideally like your first bulk order delivered?"
//           options={[
//             { value: "2_weeks", label: "Within 2 weeks" },
//             { value: "2-6_weeks", label: "2-6 weeks" },
//             { value: "2-3_months", label: "2-3 months" },
//             { value: "exploring", label: "Just exploring options" },
//           ]}
//           value={formData.deliveryTiming}
//           onChange={(value) => setFormData({ ...formData, deliveryTiming: value })}
//         />
//       );
//     }

//     if (currentStep === 7) {
//       return (
//         <SingleSelectScreen
//           question="How often do you order branded apparel?"
//           options={[
//             { value: "first_time", label: "First time" },
//             { value: "1-2", label: "1-2 times per year" },
//             { value: "3-5", label: "3-5 times per year" },
//             { value: "6+", label: "6+ times per year" },
//           ]}
//           value={formData.orderingFrequency}
//           onChange={(value) => setFormData({ ...formData, orderingFrequency: value })}
//         />
//       );
//     }

//     if (currentStep === 8) {
//       return (
//         <SingleSelectScreen
//           question="Do you have budget approved for branded headwear this year?"
//           options={[
//             { value: "confirmed", label: "Budget confirmed" },
//             { value: "pending", label: "Budget pending approval" },
//             { value: "planning", label: "Still planning" },
//             { value: "exploring", label: "Just exploring options" },
//           ]}
//           value={formData.budgetApproval}
//           onChange={(value) => setFormData({ ...formData, budgetApproval: value })}
//         />
//       );
//     }

//     if (currentStep === 9) {
//       return (
//         <MultiSelectScreen
//           question="Which statement best describes your approach to branded apparel?"
//           options={[
//             { value: "premium", label: "We invest in premium pieces" },
//             { value: "quality_over_quantity", label: "Quality over quantity" },
//             { value: "fair_price", label: "Solid quality at fair price" },
//             { value: "fast", label: "Fast turnaround most important" },
//             { value: "cost", label: "Lowest cost focus" },
//           ]}
//           values={formData.brandApproach}
//           onChange={(values) => setFormData({ ...formData, brandApproach: values })}
//         />
//       );
//     }

//     if (currentStep === 10) {
//       return (
//         <TextInputScreen
//           question="Company website or social media page"
//           value={formData.website}
//           onChange={(value) => setFormData({ ...formData, website: value })}
//           placeholder="https://"
//           type="url"
//         />
//       );
//     }

//     if (currentStep === 11) {
//       return (
//         <ContactScreen
//           values={formData.contact}
//           onChange={(contact) => setFormData({ ...formData, contact })}
//         />
//       );
//     }

//     if (currentStep === 12) {
//       return (
//         <AddressScreen
//           values={formData.address}
//           onChange={(address) => setFormData({ ...formData, address })}
//         />
//       );
//     }

//     if (currentStep === 13) {
//       return (
//         <FileUploadScreen
//           question="Upload the logo you want embroidered on your sample hats"
//           file={formData.logo}
//           onChange={(file) => setFormData({ ...formData, logo: file })}
//         />
//       );
//     }

//     if (currentStep === 14) {
//       return (
//         <HatSelectionScreen
//           hats={hats}
//           selectedHats={formData.selectedHats}
//           onChange={(hats) => setFormData({ ...formData, selectedHats: hats })}
//           maxSelection={4}
//         />
//       );
//     }

//     if (currentStep >= 15 && currentStep < 15 + formData.selectedHats.length) {
//       const hatIndex = currentStep - 15;
//       const hatSku = formData.selectedHats[hatIndex];
//       // const hat = HATS.find((h) => h.sku === hatSku);
//       const hat = hats.find((h) => h.sku === hatSku);

//       if (!hat) return null;

//       return (
//         // <ColorSelectionScreen
//         //   hatSku={hatSku}
//         //   hatImage={hat.image}
//         //   colors={COLOR_OPTIONS}
//         //   selectedColor={formData.hatColors[hatSku] || ""}
//         //   onChange={(color) =>
//         //     setFormData({
//         //       ...formData,
//         //       hatColors: { ...formData.hatColors, [hatSku]: color },
//         //     })
//         //   }
//         // />

//         <ColorSelectionScreen
//   hatSku={hatSku}
//   hatImage={
//     formData.hatColors[hatSku]
//       ? BASE_URL +
//         hat.images.find(
//           (img) =>
//             img.hatColorId ===
//             hat.colors.find((c) => c.name === formData.hatColors[hatSku])?.id
//         )?.imageUrl
//       : hat.image
//   }
//   colors={hat.colors.map((color) => {
//     const imageForColor =
//       hat.images.find((img) => img.hatColorId === color.id);

//     return {
//       name: color.name,
//       image: imageForColor
//         ? BASE_URL + imageForColor.imageUrl
//         : hat.image,
//     };
//   })}
//   selectedColor={formData.hatColors[hatSku] || ""}
//   onChange={(color) =>
//     setFormData({
//       ...formData,
//       hatColors: { ...formData.hatColors, [hatSku]: color },
//     })
//   }
// />
//       );
//     }

//     if (currentStep === 15 + formData.selectedHats.length) {
//       return <ThankYouScreen />;
//     }

//     return null;
//   };

//   const isFirstStep = currentStep === 0;
//   const isLastStep = currentStep === 15 + formData.selectedHats.length;
//   const showProgress = currentStep > 0 && !isLastStep;
//   const showNavigation = currentStep > 0 && !isLastStep;

//   return (
//     <div className="min-h-screen bg-[#F8F9FB] py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         {showProgress && (
//           <div className="mb-8">
//             <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
//           </div>
//         )}

//         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
//           <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

//           {showNavigation && (
//             <NavigationButtons
//               onBack={handleBack}
//               onNext={handleNext}
//               canGoNext={canProgress()}
//               isFirstStep={isFirstStep}
//               isLastStep={isLastStep}
//               nextLabel={
//                 currentStep === 14 + formData.selectedHats.length ? "Submit" : "Next"
//               }
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import { AnimatePresence } from "motion/react";
// import { ProgressBar } from "./components/ProgressBar";
// import { NavigationButtons } from "./components/NavigationButtons";
// import { WelcomeScreen } from "./components/WelcomeScreen";
// import { SingleSelectScreen } from "./components/SingleSelectScreen";
// import { MultiSelectScreen } from "./components/MultiSelectScreen";
// import { TextInputScreen } from "./components/TextInputScreen";
// import { ContactScreen } from "./components/ContactScreen";
// import { AddressScreen } from "./components/AddressScreen";
// import { FileUploadScreen } from "./components/FileUploadScreen";
// import { HatSelectionScreen } from "./components/HatSelectionScreen";
// import { ColorSelectionScreen } from "./components/ColorSelectionScreen";
// import { SizeSelectionScreen } from "./components/SizeSelectionScreen";
// import { ThankYouScreen } from "./components/ThankYouScreen";

// if (typeof window !== "undefined") {
//   const originalError = console.error;
//   console.error = (...args: any[]) => {
//     const errorString = args.join(" ");
//     if (
//       errorString.includes("MetaMask") ||
//       errorString.includes("chrome-extension://") ||
//       errorString.includes("Failed to connect")
//     ) {
//       return;
//     }
//     originalError.apply(console, args);
//   };

//   window.addEventListener("unhandledrejection", (event) => {
//     if (
//       event.reason?.message?.includes("MetaMask") ||
//       event.reason?.stack?.includes("chrome-extension://")
//     ) {
//       event.preventDefault();
//     }
//   });
// }

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface Variant {
//   id: number;
//   isActive: boolean | null;
//   sizeLabel: string;
//   supplierSku: string | null;
//   variantName: string;
// }

// interface HatColor {
//   id: number;
//   name: string;
//   variants: Variant[];
// }

// interface HatImage {
//   hatColorId: number;
//   id: number;
//   imageUrl: string;
// }

// interface Hat {
//   id: number;
//   sku: string;
//   image: string;
//   colors: HatColor[];
//   images: HatImage[];
// }

// interface FormData {
//   industry: string;
//   industryOther: string;
//   primaryUse: string[];
//   teamSize: string;
//   frustrations: string[];
//   whySamples: string[];
//   deliveryTiming: string;
//   orderingFrequency: string;
//   budgetApproval: string;
//   brandApproach: string[];
//   website: string;
//   contact: {
//     firstName: string;
//     lastName: string;
//     phone: string;
//     email: string;
//     company: string;
//   };
//   address: {
//     address: string;
//     address2: string;
//     city: string;
//     state: string;
//     zip: string;
//     country: string;
//   };
//   logo: File | null;
//   logoUrl: string;
//   selectedHats: string[];
//   hatColors: Record<string, string>;
//   hatSizes: Record<string, string>; // per-hat size, keyed by SKU
// }

// // ─── Constants ────────────────────────────────────────────────────────────────

// const BASE_URL = "https://customheadwearjava.showmecustomapparel.com/";
// const SAVE_URL = `${BASE_URL}api/leads/save`;

// // ─── Step layout ──────────────────────────────────────────────────────────────
// //
// // Steps 0        : Welcome
// // Steps 1–14     : Survey / contact / address / logo / hat selection
// // Steps 15..18   : Color selection — one per selected hat (up to 4)
// // Steps 19..     : Size selection — one per hat whose chosen color has variants
// // Last step      : Thank You
// //
// // ─────────────────────────────────────────────────────────────────────────────

// const COLOR_STEPS_START = 15;

// export default function App() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [hats, setHats] = useState<Hat[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchHats = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}api/hat/list`);
//         const data = await response.json();

//         const formattedHats = data.map((hat: any) => {
//           const firstImage =
//             hat.images.find((img: any) => img.hatColorId !== 0) ||
//             hat.images[0];

//           return {
//             id: hat.id,
//             sku: hat.name,
//             image: firstImage ? "https://adminapi.showmecustomapparel.com/" + firstImage.imageUrl : "",
//             colors: hat.colors,
//             images: hat.images,
//           };
//         });

//         setHats(formattedHats);
//       } catch (error) {
//         console.error("Error fetching hats:", error);
//       }
//     };

//     fetchHats();
//   }, []);

//   const [formData, setFormData] = useState<FormData>({
//     industry: "",
//     industryOther: "",
//     primaryUse: [],
//     teamSize: "",
//     frustrations: [],
//     whySamples: [],
//     deliveryTiming: "",
//     orderingFrequency: "",
//     budgetApproval: "",
//     brandApproach: [],
//     website: "",
//     contact: { firstName: "", lastName: "", phone: "", email: "", company: "" },
//     address: {
//       address: "",
//       address2: "",
//       city: "",
//       state: "",
//       zip: "",
//       country: "United States",
//     },
//     logo: null,
//     logoUrl: "",
//     selectedHats: [],
//     hatColors: {},
//     hatSizes: {},
//   });

//   const totalSteps = 17;

//   // ── Helpers ───────────────────────────────────────────────────────────────
//   const resolveHatImage = (hat: Hat, chosenColorName: string) => {
//     if (!chosenColorName) return hat.image;
//     const colorId = hat.colors.find((c) => c.name === chosenColorName)?.id;
//     if (!colorId) return hat.image;
//     const img = hat.images.find((i) => i.hatColorId === colorId);
//     return img ? "https://adminapi.showmecustomapparel.com/" + img.imageUrl : hat.image;
//   };

//   const getVariantsForColor = (hat: Hat, chosenColorName: string): Variant[] => {
//     if (!chosenColorName) return [];
//     const color = hat.colors.find((c) => c.name === chosenColorName);
//     return color?.variants ?? [];
//   };

//   // ── Derive which hats have sizes available given current color choices ─────
//   // Returns SKUs (in selection order) whose chosen color has ≥1 variant.
//   const getSkusWithSizes = (): string[] => {
//     return formData.selectedHats.filter((sku) => {
//       const hat = hats.find((h) => h.sku === sku);
//       if (!hat) return false;
//       const variants = getVariantsForColor(hat, formData.hatColors[sku]);
//       return variants.length > 0;
//     });
//   };

//   // ── Computed step boundaries ──────────────────────────────────────────────
//   const numHats = formData.selectedHats.length;
//   const colorStepsEnd = COLOR_STEPS_START + numHats;   // first step after all color screens
//   const skusWithSizes = getSkusWithSizes();
//   const numSizeSteps = skusWithSizes.length;
//   const sizeStepsStart = colorStepsEnd;
//   const thankYouStep = sizeStepsStart + numSizeSteps;

//   // ── Submit ────────────────────────────────────────────────────────────────
//   const submitForm = async () => {
//     setIsSubmitting(true);
//     setSubmitError(null);

//     const payload = {
//       industry: formData.industry,
//       industryOther: formData.industryOther,
//       primaryUse: formData.primaryUse,
//       teamSize: formData.teamSize,
//       frustrations: formData.frustrations,
//       whySamples: formData.whySamples,
//       deliveryTiming: formData.deliveryTiming,
//       orderingFrequency: formData.orderingFrequency,
//       budgetApproval: formData.budgetApproval,
//       brandApproach: formData.brandApproach,
//       website: formData.website,
//       contact: formData.contact,
//       address: formData.address,
//       logo: formData.logoUrl ? { url: formData.logoUrl } : {},
//       selectedHats: formData.selectedHats,
//       hatColors: formData.hatColors,
//       hatSizes: formData.hatSizes,
//     };

//     console.log("Submitting payload:", JSON.stringify(payload, null, 2));

//     try {
//       const response = await fetch(SAVE_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errText = await response.text();
//         throw new Error(`Server error ${response.status}: ${errText}`);
//       }

//       setCurrentStep(thankYouStep);
//     } catch (err: any) {
//       console.error("Submit failed:", err);
//       setSubmitError(err?.message ?? "Something went wrong. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ── canProgress ───────────────────────────────────────────────────────────
//   const canProgress = (): boolean => {
//     switch (currentStep) {
//       case 1:  return formData.industry !== "";
//       case 2:  return formData.primaryUse.length > 0;
//       case 3:  return formData.teamSize !== "";
//       case 4:  return formData.frustrations.length > 0;
//       case 5:  return formData.whySamples.length > 0;
//       case 6:  return formData.deliveryTiming !== "";
//       case 7:  return formData.orderingFrequency !== "";
//       case 8:  return formData.budgetApproval !== "";
//       case 9:  return formData.brandApproach.length > 0;
//       case 10: return formData.website !== "";
//       case 11:
//         return (
//           formData.contact.firstName !== "" &&
//           formData.contact.email !== "" &&
//           formData.contact.company !== ""
//         );
//       case 12:
//         return (
//           formData.address.address !== "" && formData.address.city !== ""
//         );
//       case 13: return formData.logo !== null && formData.logoUrl !== "";
//       case 14: return formData.selectedHats.length === 4;
//       default:
//         // Color steps
//         if (currentStep >= COLOR_STEPS_START && currentStep < colorStepsEnd) {
//           const sku = formData.selectedHats[currentStep - COLOR_STEPS_START];
//           return !!formData.hatColors[sku];
//         }
//         // Size steps
//         if (currentStep >= sizeStepsStart && currentStep < thankYouStep) {
//           const sku = skusWithSizes[currentStep - sizeStepsStart];
//           return !!formData.hatSizes[sku];
//         }
//         return true;
//     }
//   };

//   // ── Navigation ────────────────────────────────────────────────────────────
//   const handleNext = () => {
//     if (!canProgress()) return;

//     // Determine if this is the very last data-entry step before Thank You
//     const isLastColorStep = currentStep === colorStepsEnd - 1;
//     const isLastSizeStep =
//       currentStep >= sizeStepsStart && currentStep === thankYouStep - 1;

//     if (isLastSizeStep || (isLastColorStep && numSizeSteps === 0)) {
//       submitForm();
//       return;
//     }

//     setCurrentStep((s) => s + 1);
//   };

//   const handleBack = () => {
//     if (currentStep > 0) setCurrentStep((s) => s - 1);
//   };

//   const handleStart = () => setCurrentStep(1);

//   // ── Decide Next button label ───────────────────────────────────────────────
//   const isLastColorStep = currentStep === colorStepsEnd - 1 && numHats > 0;
//   const isLastSizeStep =
//     currentStep >= sizeStepsStart && currentStep === thankYouStep - 1;
//   const isSubmitStep =
//     (isLastSizeStep) || (isLastColorStep && numSizeSteps === 0);

//   const isThankYou = currentStep === thankYouStep;
//   const showProgress = currentStep > 0 && !isThankYou;
//   const showNavigation = currentStep > 0 && !isThankYou;

//   // ── Render ────────────────────────────────────────────────────────────────
//   const renderStep = () => {
//     if (currentStep === 0) return <WelcomeScreen onStart={handleStart} />;

//     if (currentStep === 1)
//       return (
//         <SingleSelectScreen
//           question="What industry best describes your organization?"
//           options={[
//             { value: "construction", label: "Construction/Trade" },
//             { value: "hospitality", label: "Hospitality" },
//             { value: "professional", label: "Professional Services" },
//             { value: "school", label: "School/Sports Team" },
//             { value: "agriculture", label: "Agriculture" },
//             { value: "outdoor", label: "Outdoor (Hunting/Fishing)" },
//             { value: "gym", label: "Gym/Fitness" },
//             { value: "nonprofit", label: "Nonprofit" },
//             { value: "church", label: "Church" },
//             { value: "event", label: "Event/Festival" },
//             { value: "retail", label: "Retail/Ecommerce" },
//             { value: "manufacturing", label: "Manufacturing/Industrial" },
//             { value: "corporate", label: "Corporate Office" },
//             { value: "other", label: "Other", showTextField: true },
//           ]}
//           value={formData.industry}
//           onChange={(v) => setFormData({ ...formData, industry: v })}
//           otherValue={formData.industryOther}
//           onOtherChange={(v) => setFormData({ ...formData, industryOther: v })}
//         />
//       );

//     if (currentStep === 2)
//       return (
//         <MultiSelectScreen
//           question="What will you primarily use these hats for?"
//           options={[
//             { value: "uniforms", label: "Employee / Staff Uniforms" },
//             { value: "merchandise", label: "Merchandise to Sell" },
//             { value: "promotional", label: "Promotional Giveaways" },
//             { value: "gifts", label: "Client / Customer Gifts" },
//             { value: "events", label: "Event or Trade Show Use" },
//             { value: "branding", label: "Team / Company Branding" },
//             { value: "fundraiser", label: "Fundraiser" },
//             { value: "not_sure", label: "Not Sure Yet" },
//           ]}
//           values={formData.primaryUse}
//           onChange={(v) => setFormData({ ...formData, primaryUse: v })}
//         />
//       );

//     if (currentStep === 3)
//       return (
//         <SingleSelectScreen
//           question="How many people are on your team?"
//           options={[
//             { value: "1-5", label: "1-5" },
//             { value: "6-15", label: "6-15" },
//             { value: "16-25", label: "16-25" },
//             { value: "26-50", label: "26-50" },
//             { value: "50+", label: "50+" },
//           ]}
//           value={formData.teamSize}
//           onChange={(v) => setFormData({ ...formData, teamSize: v })}
//         />
//       );

//     if (currentStep === 4)
//       return (
//         <MultiSelectScreen
//           question="What's your biggest frustration with branded headwear so far?"
//           options={[
//             { value: "quality", label: "Quality never matches expectations" },
//             { value: "logo", label: "Logo accuracy issues" },
//             { value: "lead_times", label: "Lead times too long" },
//             { value: "pricing", label: "Pricing inconsistent" },
//             { value: "communication", label: "Supplier communication issues" },
//             { value: "minimums", label: "Minimum order quantities too high" },
//             { value: "never_ordered", label: "Never ordered before" },
//             { value: "no_issues", label: "No major issues" },
//           ]}
//           values={formData.frustrations}
//           onChange={(v) => setFormData({ ...formData, frustrations: v })}
//         />
//       );

//     if (currentStep === 5)
//       return (
//         <MultiSelectScreen
//           question="What prompted you to request samples?"
//           options={[
//             { value: "season", label: "Preparing for season/event" },
//             { value: "restocking", label: "Restocking merch program" },
//             { value: "expanding", label: "Expanding merch program" },
//             { value: "first_time", label: "Trying headwear for first time" },
//             { value: "switching", label: "Switching supplier" },
//             { value: "comparing", label: "Comparing vendors" },
//             { value: "quality_check", label: "Checking quality before bulk order" },
//             { value: "quarter", label: "Preparing for order this quarter" },
//           ]}
//           values={formData.whySamples}
//           onChange={(v) => setFormData({ ...formData, whySamples: v })}
//         />
//       );

//     if (currentStep === 6)
//       return (
//         <SingleSelectScreen
//           question="When would you ideally like your first bulk order delivered?"
//           options={[
//             { value: "2_weeks", label: "Within 2 weeks" },
//             { value: "2-6_weeks", label: "2-6 weeks" },
//             { value: "2-3_months", label: "2-3 months" },
//             { value: "exploring", label: "Just exploring options" },
//           ]}
//           value={formData.deliveryTiming}
//           onChange={(v) => setFormData({ ...formData, deliveryTiming: v })}
//         />
//       );

//     if (currentStep === 7)
//       return (
//         <SingleSelectScreen
//           question="How often do you order branded apparel?"
//           options={[
//             { value: "first_time", label: "First time" },
//             { value: "1-2", label: "1-2 times per year" },
//             { value: "3-5", label: "3-5 times per year" },
//             { value: "6+", label: "6+ times per year" },
//           ]}
//           value={formData.orderingFrequency}
//           onChange={(v) => setFormData({ ...formData, orderingFrequency: v })}
//         />
//       );

//     if (currentStep === 8)
//       return (
//         <SingleSelectScreen
//           question="Do you have budget approved for branded headwear this year?"
//           options={[
//             { value: "confirmed", label: "Budget confirmed" },
//             { value: "pending", label: "Budget pending approval" },
//             { value: "planning", label: "Still planning" },
//             { value: "exploring", label: "Just exploring options" },
//           ]}
//           value={formData.budgetApproval}
//           onChange={(v) => setFormData({ ...formData, budgetApproval: v })}
//         />
//       );

//     if (currentStep === 9)
//       return (
//         <MultiSelectScreen
//           question="Which statement best describes your approach to branded apparel?"
//           options={[
//             { value: "premium", label: "We invest in premium pieces" },
//             { value: "quality_over_quantity", label: "Quality over quantity" },
//             { value: "fair_price", label: "Solid quality at fair price" },
//             { value: "fast", label: "Fast turnaround most important" },
//             { value: "cost", label: "Lowest cost focus" },
//           ]}
//           values={formData.brandApproach}
//           onChange={(v) => setFormData({ ...formData, brandApproach: v })}
//         />
//       );

//     if (currentStep === 10)
//       return (
//         <TextInputScreen
//           question="Company website or social media page"
//           value={formData.website}
//           onChange={(v) => setFormData({ ...formData, website: v })}
//           placeholder="https://"
//           type="url"
//         />
//       );

//     if (currentStep === 11)
//       return (
//         <ContactScreen
//           values={formData.contact}
//           onChange={(contact) => setFormData({ ...formData, contact })}
//         />
//       );

//     if (currentStep === 12)
//       return (
//         <AddressScreen
//           values={formData.address}
//           onChange={(address) => setFormData({ ...formData, address })}
//         />
//       );

//     if (currentStep === 13)
//       return (
//         <FileUploadScreen
//           question="Upload the logo you want embroidered on your sample hats"
//           file={formData.logo}
//           logoUrl={formData.logoUrl}
//           onChange={(file, logoUrl) =>
//             setFormData({ ...formData, logo: file, logoUrl })
//           }
//         />
//       );

//     if (currentStep === 14)
//       return (
//         <HatSelectionScreen
//           hats={hats}
//           selectedHats={formData.selectedHats}
//           onChange={(selected) =>
//             setFormData({ ...formData, selectedHats: selected })
//           }
//           maxSelection={4}
//         />
//       );

//     // ── Color steps ───────────────────────────────────────────────────────────
//     if (currentStep >= COLOR_STEPS_START && currentStep < colorStepsEnd) {
//       const hatIndex = currentStep - COLOR_STEPS_START;
//       const hatSku = formData.selectedHats[hatIndex];
//       const hat = hats.find((h) => h.sku === hatSku);
//       if (!hat) return null;

//       return (
//         <ColorSelectionScreen
//           hatSku={hatSku}
//           hatImage={resolveHatImage(hat, formData.hatColors[hatSku])}
//           colors={hat.colors.map((color) => {
//             const imgEntry = hat.images.find(
//               (img) => img.hatColorId === color.id
//             );
//             return {
//               name: color.name,
//               image: imgEntry ? "https://adminapi.showmecustomapparel.com/" + imgEntry.imageUrl : hat.image,
//             };
//           })}
//           selectedColor={formData.hatColors[hatSku] || ""}
//           onChange={(color) =>
//             setFormData((prev) => ({
//               ...prev,
//               hatColors: { ...prev.hatColors, [hatSku]: color },
//               // Clear this hat's size whenever its color changes
//               hatSizes: { ...prev.hatSizes, [hatSku]: "" },
//             }))
//           }
//         />
//       );
//     }

//     // ── Size steps — one per hat with available sizes ─────────────────────────
//     if (currentStep >= sizeStepsStart && currentStep < thankYouStep) {
//       const sizeIndex = currentStep - sizeStepsStart;
//       const sku = skusWithSizes[sizeIndex];
//       const hat = hats.find((h) => h.sku === sku);
//       if (!hat) return null;

//       const chosenColor = formData.hatColors[sku];
//       const variants = getVariantsForColor(hat, chosenColor);

//       return (
//         <SizeSelectionScreen
//           hatSku={sku}
//           hatImage={resolveHatImage(hat, chosenColor)}
//           variants={variants}
//           selectedSize={formData.hatSizes[sku] || ""}
//           onChange={(size) =>
//             setFormData((prev) => ({
//               ...prev,
//               hatSizes: { ...prev.hatSizes, [sku]: size },
//             }))
//           }
//           hatNumber={sizeIndex + 1}
//           totalHatsWithSizes={numSizeSteps}
//         />
//       );
//     }

//     // ── Thank You ─────────────────────────────────────────────────────────────
//     if (currentStep === thankYouStep) return <ThankYouScreen />;

//     return null;
//   };

//   return (
//     <div className="min-h-screen bg-[#F8F9FB] py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         {showProgress && (
//           <div className="mb-8">
//             <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
//           </div>
//         )}

//         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
//           {submitError && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
//               {submitError}
//             </div>
//           )}

//           <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

//           {showNavigation && (
//             <NavigationButtons
//               onBack={handleBack}
//               onNext={handleNext}
//               canGoNext={canProgress()}
//               isFirstStep={currentStep === 0}
//               isLastStep={isThankYou}
//               nextLabel={
//                 isSubmitStep
//                   ? isSubmitting
//                     ? "Submitting…"
//                     : "Submit"
//                   : "Next"
//               }
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }






import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { ProgressBar } from "./components/ProgressBar";
import { NavigationButtons } from "./components/NavigationButtons";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { SingleSelectScreen } from "./components/SingleSelectScreen";
import { MultiSelectScreen } from "./components/MultiSelectScreen";
import { TextInputScreen } from "./components/TextInputScreen";
import { ContactScreen } from "./components/ContactScreen";
import { AddressScreen } from "./components/AddressScreen";
import { FileUploadScreen } from "./components/FileUploadScreen";
import { HatSelectionScreen } from "./components/HatSelectionScreen";
import { ColorSelectionScreen } from "./components/ColorSelectionScreen";
import { SizeSelectionScreen } from "./components/SizeSelectionScreen";
import { PaymentScreen } from "./components/PaymentScreen";
import { ThankYouScreen } from "./components/ThankYouScreen";

if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    const msg = args.join(" ");
    if (
      msg.includes("MetaMask") ||
      msg.includes("chrome-extension://") ||
      msg.includes("Failed to connect")
    )
      return;
    originalError.apply(console, args);
  };
  window.addEventListener("unhandledrejection", (e) => {
    if (
      e.reason?.message?.includes("MetaMask") ||
      e.reason?.stack?.includes("chrome-extension://")
    )
      e.preventDefault();
  });
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Variant {
  id: number;
  isActive: boolean | null;
  sizeLabel: string;
  supplierSku: string | null;
  variantName: string;
}

interface HatColor {
  id: number;
  name: string;
  variants: Variant[];
}

interface HatImage {
  hatColorId: number;
  id: number;
  imageUrl: string;
}

interface Hat {
  id: number;
  sku: string;
  image: string;
  colors: HatColor[];
  images: HatImage[];
}

interface FormData {
  industry: string;
  industryOther: string;
  primaryUse: string[];
  teamSize: string;
  frustrations: string[];
  whySamples: string[];
  deliveryTiming: string;
  orderingFrequency: string;
  budgetApproval: string;
  brandApproach: string[];
  website: string;
  contact: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    company: string;
  };
  address: {
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  logo: File | null;
  logoUrl: string;
  selectedHats: string[];
  hatColors: Record<string, string>;
  hatSizes: Record<string, string>;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BASE_URL = "https://customheadwearjava.showmecustomapparel.com/";
const IMG_URL  = "https://adminapi.showmecustomapparel.com/";
const SAVE_URL = `${BASE_URL}api/leads/save`;

const SAMPLE_AMOUNT_LABEL = "$10.00";

// ─── Step layout ──────────────────────────────────────────────────────────────
//
// 0        : Welcome
// 1–14     : Survey / contact / address / logo / hat selection
// 15–18    : Color selection (one per selected hat)
// 19–N     : Size selection (one per hat whose chosen color has variants)
// N+1      : Payment (Stripe — fetches keys from API, confirms PaymentIntent)
// N+2      : Thank You
//
// ─────────────────────────────────────────────────────────────────────────────

const COLOR_STEPS_START = 15;

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [hats, setHats] = useState<Hat[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHats = async () => {
      try {
        const res  = await fetch(`${BASE_URL}api/hat/list`);
        const data = await res.json();
        setHats(
          data.map((hat: any) => {
            const firstImage =
              hat.images.find((img: any) => img.hatColorId !== 0) || hat.images[0];
            return {
              id:     hat.id,
              sku:    hat.name,
              image:  firstImage ? IMG_URL + firstImage.imageUrl : "",
              colors: hat.colors,
              images: hat.images,
            };
          })
        );
      } catch (err) {
        console.error("Error fetching hats:", err);
      }
    };
    fetchHats();
  }, []);

  const [formData, setFormData] = useState<FormData>({
    industry: "",
    industryOther: "",
    primaryUse: [],
    teamSize: "",
    frustrations: [],
    whySamples: [],
    deliveryTiming: "",
    orderingFrequency: "",
    budgetApproval: "",
    brandApproach: [],
    website: "",
    contact: { firstName: "", lastName: "", phone: "", email: "", company: "" },
    address: { address: "", address2: "", city: "", state: "", zip: "", country: "United States" },
    logo: null,
    logoUrl: "",
    selectedHats: [],
    hatColors: {},
    hatSizes: {},
  });

  const totalSteps = 17;

  // ── Helpers ───────────────────────────────────────────────────────────────
  const resolveHatImage = (hat: Hat, color: string) => {
    if (!color) return hat.image;
    const colorId = hat.colors.find((c) => c.name === color)?.id;
    if (!colorId) return hat.image;
    const img = hat.images.find((i) => i.hatColorId === colorId);
    return img ? IMG_URL + img.imageUrl : hat.image;
  };

  const getVariantsForColor = (hat: Hat, color: string): Variant[] => {
    if (!color) return [];
    return hat.colors.find((c) => c.name === color)?.variants ?? [];
  };

  const getSkusWithSizes = (): string[] =>
    formData.selectedHats.filter((sku) => {
      const hat = hats.find((h) => h.sku === sku);
      if (!hat) return false;
      return getVariantsForColor(hat, formData.hatColors[sku]).length > 0;
    });

  // ── Computed step indices ─────────────────────────────────────────────────
  const numHats        = formData.selectedHats.length;
  const colorStepsEnd  = COLOR_STEPS_START + numHats;
  const skusWithSizes  = getSkusWithSizes();
  const numSizeSteps   = skusWithSizes.length;
  const sizeStepsStart = colorStepsEnd;
  const paymentStep    = sizeStepsStart + numSizeSteps;
  const thankYouStep   = paymentStep + 1;

  // ── Save API — called only after Stripe payment succeeds ──────────────────
  const submitForm = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      industry:          formData.industry,
      industryOther:     formData.industryOther,
      primaryUse:        formData.primaryUse,
      teamSize:          formData.teamSize,
      frustrations:      formData.frustrations,
      whySamples:        formData.whySamples,
      deliveryTiming:    formData.deliveryTiming,
      orderingFrequency: formData.orderingFrequency,
      budgetApproval:    formData.budgetApproval,
      brandApproach:     formData.brandApproach,
      website:           formData.website,
      contact:           formData.contact,
      address:           formData.address,
      logo:              formData.logoUrl ? { url: formData.logoUrl } : {},
      selectedHats:      formData.selectedHats,
      hatColors:         formData.hatColors,
      hatSizes:          formData.hatSizes,
    };

    console.log("Submitting payload:", JSON.stringify(payload, null, 2));

    const res = await fetch(SAVE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Server error ${res.status}: ${text}`);
    }

    setCurrentStep(thankYouStep);
  };

  // Called by PaymentScreen once Stripe has confirmed the PaymentIntent
  const handlePaymentSuccess = async () => {
    try {
      await submitForm();
    } catch (err: any) {
      console.error("Save failed:", err);
      setSubmitError(err?.message ?? "Something went wrong saving your order.");
      throw err; // re-throw so PaymentScreen clears its own loading state
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── canProgress ───────────────────────────────────────────────────────────
  const canProgress = (): boolean => {
    switch (currentStep) {
      case 1:  return formData.industry !== "";
      case 2:  return formData.primaryUse.length > 0;
      case 3:  return formData.teamSize !== "";
      case 4:  return formData.frustrations.length > 0;
      case 5:  return formData.whySamples.length > 0;
      case 6:  return formData.deliveryTiming !== "";
      case 7:  return formData.orderingFrequency !== "";
      case 8:  return formData.budgetApproval !== "";
      case 9:  return formData.brandApproach.length > 0;
      case 10: return formData.website !== "";
      case 11:
        return (
          formData.contact.firstName !== "" &&
          formData.contact.email    !== "" &&
          formData.contact.company  !== ""
        );
      case 12:
        return formData.address.address !== "" && formData.address.city !== "";
      case 13: return formData.logo !== null && formData.logoUrl !== "";
      case 14: return formData.selectedHats.length === 4;
      default:
        if (currentStep >= COLOR_STEPS_START && currentStep < colorStepsEnd) {
          const sku = formData.selectedHats[currentStep - COLOR_STEPS_START];
          return !!formData.hatColors[sku];
        }
        if (currentStep >= sizeStepsStart && currentStep < paymentStep) {
          const sku = skusWithSizes[currentStep - sizeStepsStart];
          return !!formData.hatSizes[sku];
        }
        return true;
    }
  };

  // ── Navigation ────────────────────────────────────────────────────────────
  const handleNext  = () => { if (canProgress()) setCurrentStep((s) => s + 1); };
  const handleBack  = () => { if (currentStep > 0) setCurrentStep((s) => s - 1); };
  const handleStart = () => setCurrentStep(1);

  const isThankYou    = currentStep === thankYouStep;
  const isPaymentStep = currentStep === paymentStep;
  // Hide shared nav on payment step (PaymentScreen owns its CTA) and thank-you
  const showProgress   = currentStep > 0 && !isThankYou;
  const showNavigation = currentStep > 0 && !isThankYou && !isPaymentStep;

  // ── Render ────────────────────────────────────────────────────────────────
  const renderStep = () => {
    if (currentStep === 0) return <WelcomeScreen onStart={handleStart} />;

    if (currentStep === 1)
      return (
        <SingleSelectScreen
          question="What industry best describes your organization?"
          options={[
            { value: "construction",  label: "Construction/Trade" },
            { value: "hospitality",   label: "Hospitality" },
            { value: "professional",  label: "Professional Services" },
            { value: "school",        label: "School/Sports Team" },
            { value: "agriculture",   label: "Agriculture" },
            { value: "outdoor",       label: "Outdoor (Hunting/Fishing)" },
            { value: "gym",           label: "Gym/Fitness" },
            { value: "nonprofit",     label: "Nonprofit" },
            { value: "church",        label: "Church" },
            { value: "event",         label: "Event/Festival" },
            { value: "retail",        label: "Retail/Ecommerce" },
            { value: "manufacturing", label: "Manufacturing/Industrial" },
            { value: "corporate",     label: "Corporate Office" },
            { value: "other",         label: "Other", showTextField: true },
          ]}
          value={formData.industry}
          onChange={(v) => setFormData({ ...formData, industry: v })}
          otherValue={formData.industryOther}
          onOtherChange={(v) => setFormData({ ...formData, industryOther: v })}
        />
      );

    if (currentStep === 2)
      return (
        <MultiSelectScreen
          question="What will you primarily use these hats for?"
          options={[
            { value: "uniforms",    label: "Employee / Staff Uniforms" },
            { value: "merchandise", label: "Merchandise to Sell" },
            { value: "promotional", label: "Promotional Giveaways" },
            { value: "gifts",       label: "Client / Customer Gifts" },
            { value: "events",      label: "Event or Trade Show Use" },
            { value: "branding",    label: "Team / Company Branding" },
            { value: "fundraiser",  label: "Fundraiser" },
            { value: "not_sure",    label: "Not Sure Yet" },
          ]}
          values={formData.primaryUse}
          onChange={(v) => setFormData({ ...formData, primaryUse: v })}
        />
      );

    if (currentStep === 3)
      return (
        <SingleSelectScreen
          question="How many people are on your team?"
          options={[
            { value: "1-5",   label: "1-5" },
            { value: "6-15",  label: "6-15" },
            { value: "16-25", label: "16-25" },
            { value: "26-50", label: "26-50" },
            { value: "50+",   label: "50+" },
          ]}
          value={formData.teamSize}
          onChange={(v) => setFormData({ ...formData, teamSize: v })}
        />
      );

    if (currentStep === 4)
      return (
        <MultiSelectScreen
          question="What's your biggest frustration with branded headwear so far?"
          options={[
            { value: "quality",       label: "Quality never matches expectations" },
            { value: "logo",          label: "Logo accuracy issues" },
            { value: "lead_times",    label: "Lead times too long" },
            { value: "pricing",       label: "Pricing inconsistent" },
            { value: "communication", label: "Supplier communication issues" },
            { value: "minimums",      label: "Minimum order quantities too high" },
            { value: "never_ordered", label: "Never ordered before" },
            { value: "no_issues",     label: "No major issues" },
          ]}
          values={formData.frustrations}
          onChange={(v) => setFormData({ ...formData, frustrations: v })}
        />
      );

    if (currentStep === 5)
      return (
        <MultiSelectScreen
          question="What prompted you to request samples?"
          options={[
            { value: "season",        label: "Preparing for season/event" },
            { value: "restocking",    label: "Restocking merch program" },
            { value: "expanding",     label: "Expanding merch program" },
            { value: "first_time",    label: "Trying headwear for first time" },
            { value: "switching",     label: "Switching supplier" },
            { value: "comparing",     label: "Comparing vendors" },
            { value: "quality_check", label: "Checking quality before bulk order" },
            { value: "quarter",       label: "Preparing for order this quarter" },
          ]}
          values={formData.whySamples}
          onChange={(v) => setFormData({ ...formData, whySamples: v })}
        />
      );

    if (currentStep === 6)
      return (
        <SingleSelectScreen
          question="When would you ideally like your first bulk order delivered?"
          options={[
            { value: "2_weeks",    label: "Within 2 weeks" },
            { value: "2-6_weeks",  label: "2-6 weeks" },
            { value: "2-3_months", label: "2-3 months" },
            { value: "exploring",  label: "Just exploring options" },
          ]}
          value={formData.deliveryTiming}
          onChange={(v) => setFormData({ ...formData, deliveryTiming: v })}
        />
      );

    if (currentStep === 7)
      return (
        <SingleSelectScreen
          question="How often do you order branded apparel?"
          options={[
            { value: "first_time", label: "First time" },
            { value: "1-2",        label: "1-2 times per year" },
            { value: "3-5",        label: "3-5 times per year" },
            { value: "6+",         label: "6+ times per year" },
          ]}
          value={formData.orderingFrequency}
          onChange={(v) => setFormData({ ...formData, orderingFrequency: v })}
        />
      );

    if (currentStep === 8)
      return (
        <SingleSelectScreen
          question="Do you have budget approved for branded headwear this year?"
          options={[
            { value: "confirmed", label: "Budget confirmed" },
            { value: "pending",   label: "Budget pending approval" },
            { value: "planning",  label: "Still planning" },
            { value: "exploring", label: "Just exploring options" },
          ]}
          value={formData.budgetApproval}
          onChange={(v) => setFormData({ ...formData, budgetApproval: v })}
        />
      );

    if (currentStep === 9)
      return (
        <MultiSelectScreen
          question="Which statement best describes your approach to branded apparel?"
          options={[
            { value: "premium",               label: "We invest in premium pieces" },
            { value: "quality_over_quantity",  label: "Quality over quantity" },
            { value: "fair_price",            label: "Solid quality at fair price" },
            { value: "fast",                  label: "Fast turnaround most important" },
            { value: "cost",                  label: "Lowest cost focus" },
          ]}
          values={formData.brandApproach}
          onChange={(v) => setFormData({ ...formData, brandApproach: v })}
        />
      );

    if (currentStep === 10)
      return (
        <TextInputScreen
          question="Company website or social media page"
          value={formData.website}
          onChange={(v) => setFormData({ ...formData, website: v })}
          placeholder="https://"
          type="url"
        />
      );

    if (currentStep === 11)
      return (
        <ContactScreen
          values={formData.contact}
          onChange={(contact) => setFormData({ ...formData, contact })}
        />
      );

    if (currentStep === 12)
      return (
        <AddressScreen
          values={formData.address}
          onChange={(address) => setFormData({ ...formData, address })}
        />
      );

    if (currentStep === 13)
      return (
        <FileUploadScreen
          question="Upload the logo you want embroidered on your sample hats"
          file={formData.logo}
          logoUrl={formData.logoUrl}
          onChange={(file, logoUrl) =>
            setFormData({ ...formData, logo: file, logoUrl })
          }
        />
      );

    if (currentStep === 14)
      return (
        <HatSelectionScreen
          hats={hats}
          selectedHats={formData.selectedHats}
          onChange={(selected) =>
            setFormData({ ...formData, selectedHats: selected })
          }
          maxSelection={4}
        />
      );

    // ── Color steps ───────────────────────────────────────────────────────────
    if (currentStep >= COLOR_STEPS_START && currentStep < colorStepsEnd) {
      const hatIndex = currentStep - COLOR_STEPS_START;
      const hatSku   = formData.selectedHats[hatIndex];
      const hat      = hats.find((h) => h.sku === hatSku);
      if (!hat) return null;

      return (
        <ColorSelectionScreen
          hatSku={hatSku}
          hatImage={resolveHatImage(hat, formData.hatColors[hatSku])}
          colors={hat.colors.map((color) => {
            const imgEntry = hat.images.find((img) => img.hatColorId === color.id);
            return {
              name:  color.name,
              image: imgEntry ? IMG_URL + imgEntry.imageUrl : hat.image,
            };
          })}
          selectedColor={formData.hatColors[hatSku] || ""}
          onChange={(color) =>
            setFormData((prev) => ({
              ...prev,
              hatColors: { ...prev.hatColors, [hatSku]: color },
              hatSizes:  { ...prev.hatSizes,  [hatSku]: "" },
            }))
          }
        />
      );
    }

    // ── Size steps ────────────────────────────────────────────────────────────
    if (currentStep >= sizeStepsStart && currentStep < paymentStep) {
      const sizeIndex   = currentStep - sizeStepsStart;
      const sku         = skusWithSizes[sizeIndex];
      const hat         = hats.find((h) => h.sku === sku);
      if (!hat) return null;

      const chosenColor = formData.hatColors[sku];
      const variants    = getVariantsForColor(hat, chosenColor);

      return (
        <SizeSelectionScreen
          hatSku={sku}
          hatImage={resolveHatImage(hat, chosenColor)}
          variants={variants}
          selectedSize={formData.hatSizes[sku] || ""}
          onChange={(size) =>
            setFormData((prev) => ({
              ...prev,
              hatSizes: { ...prev.hatSizes, [sku]: size },
            }))
          }
          hatNumber={sizeIndex + 1}
          totalHatsWithSizes={numSizeSteps}
        />
      );
    }

    // ── Payment step ──────────────────────────────────────────────────────────
    if (currentStep === paymentStep)
      return (
        <PaymentScreen
          amountLabel={SAMPLE_AMOUNT_LABEL}
          onPaymentSuccess={handlePaymentSuccess}
          isSaving={isSubmitting}
          saveError={submitError}
        />
      );

    // ── Thank You ─────────────────────────────────────────────────────────────
    if (currentStep === thankYouStep) return <ThankYouScreen />;

    return null;
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {showProgress && (
          <div className="mb-8">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

          {/* Shared nav (hidden on payment + thank-you) */}
          {showNavigation && (
            <NavigationButtons
              onBack={handleBack}
              onNext={handleNext}
              canGoNext={canProgress()}
              isFirstStep={currentStep === 0}
              isLastStep={isThankYou}
              nextLabel="Next"
            />
          )}

          {/* Back link only on payment step */}
          {isPaymentStep && (
            <div className="mt-8">
              <button
                onClick={handleBack}
                disabled={isSubmitting}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors disabled:opacity-40"
              >
                ← Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



















