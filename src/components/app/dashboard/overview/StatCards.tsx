import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  label: string;
  value: string | number;
};

export const StatCard = ({ label, value }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>{value}</CardContent>
    </Card>
  );
};
