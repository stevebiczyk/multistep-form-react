import { useState } from "react";
import { useStore } from "../../hooks/useStore";
import { formStore } from "../../services/formStore";

export function PersonalInfoStep() {
  const personalInfo = useStore(formStore, (state) => state.formData.personal);
  const [formData, setFormData] = useState(personalInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formStore.updateState((state) => ({
      ...state,
      formData: {
        ...state.formData,
        personal: formData,
      },
      currentStep: 2, // Move to the next step
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="personal-info-step">
      <h2>Personal Information</h2>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Next
      </button>
    </form>
  );
}
