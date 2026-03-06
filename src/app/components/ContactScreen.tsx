import { motion } from "motion/react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface ContactData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
}

interface ContactScreenProps {
  values: ContactData;
  onChange: (values: ContactData) => void;
}

export function ContactScreen({ values, onChange }: ContactScreenProps) {
  const handleChange = (field: keyof ContactData, value: string) => {
    onChange({ ...values, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name <span className="text-[#D32F2F]">*</span>
          </Label>
          <Input
            id="firstName"
            type="text"
            value={values.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            placeholder="John"
            className="py-6"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            value={values.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            placeholder="Smith"
            className="py-6"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-[#D32F2F]">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@company.com"
            className="py-6"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={values.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="(555) 123-4567"
            className="py-6"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="company">
            Company Name <span className="text-[#D32F2F]">*</span>
          </Label>
          <Input
            id="company"
            type="text"
            value={values.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="Your Company Inc."
            className="py-6"
          />
        </div>
      </div>
    </motion.div>
  );
}
