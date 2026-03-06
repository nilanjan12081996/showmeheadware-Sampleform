// import { motion } from "motion/react";
// import { Upload, File, X } from "lucide-react";
// import { useState, useRef } from "react";

// interface FileUploadScreenProps {
//   question: string;
//   file: File | null;
//   onChange: (file: File | null) => void;
// }

// export function FileUploadScreen({
//   question,
//   file,
//   onChange,
// }: FileUploadScreenProps) {
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile) {
//       onChange(droppedFile);
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile) {
//       onChange(selectedFile);
//     }
//   };

//   const handleClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleRemove = () => {
//     onChange(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       className="space-y-6"
//     >
//       <h2 className="text-2xl font-semibold text-gray-900">{question}</h2>

//       <div
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         onClick={handleClick}
//         className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
//           isDragging
//             ? "border-[#D32F2F] bg-red-50"
//             : "border-gray-300 hover:border-gray-400 bg-white"
//         }`}
//       >
//         <input
//           ref={fileInputRef}
//           type="file"
//           onChange={handleFileChange}
//           accept=".png,.jpg,.jpeg,.svg,.ai,.pdf"
//           className="hidden"
//         />

//         {!file ? (
//           <div className="space-y-4">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
//               <Upload className="w-8 h-8 text-gray-400" />
//             </div>
//             <div className="space-y-2">
//               <p className="text-gray-900 font-medium">
//                 Click to upload or drag and drop
//               </p>
//               <p className="text-sm text-gray-500">
//                 PNG, JPG, SVG, AI, or PDF (max. 10MB)
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="flex items-center justify-center gap-4">
//             <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-lg">
//               <File className="w-5 h-5 text-gray-600" />
//               <span className="text-gray-900 font-medium">{file.name}</span>
//             </div>
//             <button
//               type="button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleRemove();
//               }}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <X className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// }



import { motion } from "motion/react";
import { Upload, File, X, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

const BASE_URL = "https://customheadwearjava.showmecustomapparel.com/";
const IMAGE_UPLOAD_URL = `${BASE_URL}api/leads/image-upload`;

interface FileUploadScreenProps {
  question: string;
  file: File | null;
  logoUrl: string;                          // the URL returned by the upload API
  onChange: (file: File | null, logoUrl: string) => void;
}

export function FileUploadScreen({
  question,
  file,
  logoUrl,
  onChange,
}: FileUploadScreenProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (selectedFile: File) => {
    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(IMAGE_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Upload failed (${response.status}): ${errText}`);
      }

      const data = await response.json();

      if (!data.status || !data.url) {
        throw new Error(data.message ?? "Upload failed. Please try again.");
      }

      // Pass both the File object (for display) and the returned URL (for payload)
      onChange(selectedFile, data.url);
    } catch (err: any) {
      console.error("Image upload error:", err);
      setUploadError(err?.message ?? "Upload failed. Please try again.");
      onChange(null, "");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) uploadFile(droppedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) uploadFile(selectedFile);
  };

  const handleClick = () => {
    if (!isUploading) fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onChange(null, "");
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900">{question}</h2>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all
          ${isUploading ? "cursor-wait" : "cursor-pointer"}
          ${
            isDragging
              ? "border-[#D32F2F] bg-red-50"
              : "border-gray-300 hover:border-gray-400 bg-white"
          }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept=".png,.jpg,.jpeg,.svg,.ai,.pdf"
          className="hidden"
        />

        {/* Uploading state */}
        {isUploading && (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
            </div>
            <p className="text-gray-600 font-medium">Uploading...</p>
          </div>
        )}

        {/* File selected & uploaded */}
        {!isUploading && file && logoUrl && (
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-lg">
              <File className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900 font-medium">{file.name}</span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isUploading && !file && (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <div className="space-y-2">
              <p className="text-gray-900 font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG, SVG, AI, or PDF (max. 10MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Upload error */}
      {uploadError && (
        <p className="text-sm text-red-600 mt-2">{uploadError}</p>
      )}

      {/* Show stored URL for confirmation (optional, can remove) */}
      {logoUrl && (
        <p className="text-xs text-gray-400 truncate">Uploaded: {logoUrl}</p>
      )}
    </motion.div>
  );
}
