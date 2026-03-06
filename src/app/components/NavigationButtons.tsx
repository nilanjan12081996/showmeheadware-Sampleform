import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext: () => void;
  canGoNext: boolean;
  isFirstStep: boolean;
  isLastStep?: boolean;
  nextLabel?: string;
}

export function NavigationButtons({
  onBack,
  onNext,
  canGoNext,
  isFirstStep,
  isLastStep,
  nextLabel = "Next",
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between items-center gap-4 mt-8">
      {!isFirstStep && onBack ? (
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      ) : (
        <div />
      )}

      <Button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
        className="gap-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-8"
      >
        {nextLabel}
        {!isLastStep && <ArrowRight className="w-4 h-4" />}
      </Button>
    </div>
  );
}
