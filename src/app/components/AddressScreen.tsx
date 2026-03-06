import { motion } from "motion/react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface AddressData {
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface AddressScreenProps {
  values: AddressData;
  onChange: (values: AddressData) => void;
}

export function AddressScreen({ values, onChange }: AddressScreenProps) {
  const handleChange = (field: keyof AddressData, value: string) => {
    onChange({ ...values, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900">
        Where should we send your sample pack?
      </h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            type="text"
            value={values.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="123 Main Street"
            className="py-6"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address2">Address Line 2</Label>
          <Input
            id="address2"
            type="text"
            value={values.address2}
            onChange={(e) => handleChange("address2", e.target.value)}
            placeholder="Suite 100"
            className="py-6"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              type="text"
              value={values.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Los Angeles"
              className="py-6"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State / Province</Label>
            <Input
              id="state"
              type="text"
              value={values.state}
              onChange={(e) => handleChange("state", e.target.value)}
              placeholder="CA"
              className="py-6"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="zip">ZIP Code</Label>
            <Input
              id="zip"
              type="text"
              value={values.zip}
              onChange={(e) => handleChange("zip", e.target.value)}
              placeholder="90001"
              className="py-6"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              type="text"
              // value={values.country}
              // onChange={(e) => handleChange("country", e.target.value)}
              value="United States"
              readOnly
              placeholder="United States"
              className="py-6"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
