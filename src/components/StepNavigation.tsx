import { useStore } from "../hooks/useStore";
import { formStore } from "../services/formStore";

export function StepNavigation() {
  const currentStep = useStore(formStore, (state) => state.currentStep);
  const goToStep = (step: number) => {
    formStore.updateState((prevState) => ({
      ...prevState,
      currentStep: step,
    }));
  };

  return (
    <div className="step-navigation">
      {[1, 2, 3].map((step) => (
        <button
          key={step}
          className={`step-button ${currentStep === step ? "active" : ""}`}
          onClick={() => goToStep(step)}
          disabled={currentStep === step}
        >
          Step {step}
        </button>
      ))}
    </div>
  );
}
