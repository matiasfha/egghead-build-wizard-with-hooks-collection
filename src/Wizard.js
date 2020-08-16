import React from "react";

const WizardContext = React.createContext();

const reducer = (state, action) => {
  const { steps, currentIndex } = state;
  switch (action.type) {
    case "NEXT_PAGE":
      const newIndex = currentIndex + 1;
      if (newIndex < steps) {
        return { ...state, currentIndex: newIndex };
      }
      return state;
    case "PREV_PAGE":
      if (currentIndex > 0) {
        return { ...state, currentIndex: currentIndex - 1 };
      }
      return state;
    case "SET_STEP_COUNT":
      return { ...state, steps: action.payload };
    default:
      return state;
  }
};
const initialState = {
  currentIndex: 0,
  steps: 0
};
const Wizard = ({ children, ...props }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const nextPage = () => {
    dispatch({ type: "NEXT_PAGE" });
  };
  const prevPage = () => {
    dispatch({ type: "PREV_PAGE" });
  };

  const context = {
    currentIndex: state.currentIndex,
    steps: state.steps,
    nextPage,
    prevPage,
    dispatch
  };
  return (
    <WizardContext.Provider value={context}>
      <div {...props}>{children}</div>
    </WizardContext.Provider>
  );
};

export const WizardButtonPrev = ({
  children,
  as: Comp = "button",
  ...props
}) => {
  const { currentIndex, prevPage } = React.useContext(WizardContext);

  return currentIndex === 0 ? null : (
    <Comp {...props} onClick={prevPage}>
      {children}
    </Comp>
  );
};

export const WizardButtonNext = ({
  children,
  as: Comp = "button",
  ...props
}) => {
  const { currentIndex, steps, nextPage } = React.useContext(WizardContext);

  return currentIndex < steps - 1 ? (
    <Comp {...props} onClick={nextPage}>
      {children}
    </Comp>
  ) : null;
};

export const WizardPages = ({ children, ...props }) => {
  const { dispatch, currentIndex } = React.useContext(WizardContext);
  const pages = React.Children.toArray(children);

  const steps = React.Children.count(children);
  React.useEffect(() => {
    dispatch({ type: "SET_STEP_COUNT", payload: steps });
  }, [dispatch, steps]);

  let currentPage = pages[currentIndex];
  return <div {...props}>{currentPage}</div>;
};

export const useWizardProgress = () => {
  const { currentIndex, steps } = React.useContext(WizardContext);
  return {
    currentIndex: currentIndex + 1,
    steps
  };
};

export const useWizardButtons = () => {
  const { nextPage, prevPage } = React.useContext(WizardContext);
  return {
    nextPage,
    prevPage
  };
};

export const useWizardPages = ({ totalSteps }) => {
  const { dispatch, currentIndex } = React.useContext(WizardContext);
  React.useEffect(() => {
    dispatch({ type: "SET_STEP_COUNT", payload: totalSteps });
  }, [dispatch, totalSteps]);

  return {
    currentIndex
  };
};
export default Wizard;
