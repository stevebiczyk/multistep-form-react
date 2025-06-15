import { createStore } from "./customStore";

export type FormState = {
  formData: {
    personal: {
      firstName: string;
      lastName: string;
      email: string;
    };
    account: {
      username: string;
      password: string;
    };
    preferences: {
      newsletter: boolean;
      notifications: boolean;
    };
  };
  errors: Record<string, string>;
};

const initialState: FormState = {
  formData: {
    personal: {
      firstName: "",
      lastName: "",
      email: "",
    },
    account: {
      username: "",
      password: "",
    },
    preferences: {
      newsletter: true,
      notifications: false,
    },
  },
  errors: {},
};

export const formStore = createStore<FormState>(initialState);
