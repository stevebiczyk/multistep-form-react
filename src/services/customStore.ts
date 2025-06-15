type Subscriber<T> = (state: T) => void;
export type Selector<T, U> = (state: T) => U;

export interface Store<T> {
  getState: () => T;
  subscribers: Set<Subscriber<T>>;
  updateState: (updater: (prevState: T) => T) => void;
  subscribe: <U>(
    selector: Selector<T, U>,
    callback: (selectedState: U) => void
  ) => () => void;
}

export function createStore<T>(initialState: T): Store<T> {
  let state: T = initialState;
  const subscribers = new Set<Subscriber<T>>();

  const getState = () => state;

  const updateState = (updater: (prevState: T) => T) => {
    state = updater(state);
    subscribers.forEach((subscriber) => subscriber(state));
  };

  const subscribe = <U>(
    selector: Selector<T, U>,
    callback: (selectedState: U) => void
  ) => {
    let currentSelectedState = selector(state);

    const subscriber = (newState: T) => {
      const newSelectedState = selector(newState);
      if (newSelectedState !== currentSelectedState) {
        currentSelectedState = newSelectedState;
        callback(newSelectedState);
      }
    };

    subscribers.add(subscriber);
    return () => subscribers.delete(subscriber);
  };

  return { getState, subscribers, updateState, subscribe };
}
