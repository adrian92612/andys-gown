import { InfoField } from "@/components/global/InfoField";
import { Badge } from "@/components/ui/badge";
import { formatCategory, formatPrice } from "@/lib/utils";
import { Gown } from "@prisma/client";

type Props = {
  gown: Gown;
};

export const GownDetails = ({ gown }: Props) => {
  return (
    <div>
      <h2 className="text-4xl mb-5 text-site-primary">{gown.name}</h2>
      <InfoField
        label="Code"
        value={gown.code}
        className="text-lg"
        valueCn="text-site-text-light/90"
      />
      <InfoField
        label="Price"
        value={formatPrice(gown.price)}
        className="text-lg"
        valueCn="text-site-text-light/90"
      />
      <InfoField
        label="Size"
        value={<Badge variant="gownSize">{gown.size}</Badge>}
        className="text-lg"
        valueCn="text-site-text-light/90"
      />
      <InfoField
        label="Color"
        value={gown.color}
        className="text-lg"
        valueCn="text-site-text-light/90"
      />
      <InfoField
        label="Style"
        value={formatCategory(gown.category)}
        className="text-lg"
        valueCn="text-site-text-light/90"
      />
    </div>
  );
};
