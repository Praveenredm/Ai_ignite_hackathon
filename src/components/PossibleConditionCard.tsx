import { Brain } from "lucide-react";

interface Props {
  disease: string;
  confidence: number;
}

const PossibleConditionCard = ({ disease, confidence }: Props) => {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm mt-3">
      <div className="flex items-center gap-2 mb-2">
        <Brain className="text-blue-600" />
        <h3 className="font-semibold text-blue-800">
          Possible Condition
        </h3>
      </div>

      <p className="text-sm text-blue-900">
        <strong>{disease}</strong>
      </p>

      <p className="text-xs text-blue-700 mt-1">
        Confidence: {confidence}%
      </p>
    </div>
  );
};

export default PossibleConditionCard;
