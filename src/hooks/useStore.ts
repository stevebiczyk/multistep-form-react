import { useState, useEffect } from "react";
import type { Selector } from "../services/customStore";
import type { Store } from "../services/customStore";

function useStore<T, U>(store: Store<T>, selector: Selector<T, U>): U {
  const [selectedState, setSelectedState] = useState<U>(
    selector(store.getState())
  );

  useEffect(() => {
    return store.subscribe(selector, setSelectedState);
  }, [store, selector]);

  return selectedState;
}
export { useStore };
