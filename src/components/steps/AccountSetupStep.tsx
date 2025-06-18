import { useStore } from "../../hooks/useStore";
import { formStore } from "../../services/formStore";
import { useState } from "react";

export function AccountSetupStep() {
  const accountInfo = useStore(formStore, (state) => state.formData.account);
  const [formData, setFormData] = useState(accountInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    formStore.updateState((state) => ({ ...state, currentStep: 1 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formStore.updateState((state) => ({
      ...state,
      formData: {
        ...state.formData,
        account: formData,
      },
      currentStep: 3,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Account Setup</h2>

      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <div className="step-nav">
        <button type="button" onClick={handleBack}>
          Back
        </button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
}
