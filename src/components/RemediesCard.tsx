import { HeartPulse } from "lucide-react";

interface Props {
  remedies: string[];
}

const RemediesCard = ({ remedies }: Props) => {
  if (!remedies || remedies.length === 0) return null;

  return (
    <div className="rounded-xl border border-green-300 bg-green-50 p-4 mt-3">
      <div className="flex items-center gap-2 mb-2">
        <HeartPulse className="text-green-600" />
        <h3 className="font-semibold text-green-800">
          Home Care & Remedies
        </h3>
      </div>

      <ul className="list-disc pl-5 text-green-900 text-sm space-y-1">
        {remedies.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
};

export default RemediesCard;
