import React from "react";

const WizardContext = React.createContext();

export const useWizardContext = () => {
  const context = React.useContext(WizardContext);
  if (!context) {
    throw new Error(
      `Un componente compuesto de Wizard no puede ser renderizado fuera del Wizard padre`
    );
  }
  return context;
};

const reducer = (state, action) => {
  const { steps, activePageIndex } = state;
  switch (action.type) {
    case "NEXT_PAGE":
      const newIndex = activePageIndex + 1;
      if (newIndex < steps) {
        return { ...state, activePageIndex: newIndex };
      }
      return state;
    case "PREV_PAGE":
      if (activePageIndex > 0) {
        return { ...state, activePageIndex: activePageIndex - 1 };
      }
      return state;
    case "SET_STEP_COUNT":
      return { ...state, steps: action.payload };
    default:
      return state;
  }
};
const initialState = {
  activePageIndex: 0,
  steps: 0
};

const Wizard = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const goNextPage = React.useCallback(() => {
    dispatch({ type: "NEXT_PAGE" });
  }, []);

  const goPrevPage = React.useCallback(() => {
    dispatch({ type: "PREV_PAGE" });
  }, []);

  const setSteps = React.useCallback(
    (steps) => {
      dispatch({ type: "SET_STEP_COUNT", payload: steps });
    },
    [dispatch]
  );
  const { activePageIndex, steps } = state;

  const context = {
    activePageIndex,
    steps,
    goNextPage,
    goPrevPage,
    setSteps
  };
  return (
    <WizardContext.Provider value={context}>
      <div className="wizard">{children}</div>
    </WizardContext.Provider>
  );
};

const WizardPages = ({ children, ...props }) => {
  const { setSteps, activePageIndex } = React.useContext(WizardContext);
  const pages = React.Children.toArray(children);

  const steps = React.Children.count(children);

  React.useEffect(() => {
    setSteps(steps);
  }, [steps, setSteps]);

  let currentPage = pages[activePageIndex];
  return <div {...props}>{currentPage}</div>;
};

const WizardButtonPrev = ({ children, as: Comp = "button", ...props }) => {
  const { goPrevPage, activePageIndex } = useWizardContext();

  return activePageIndex === 0 ? null : (
    <Comp {...props} onClick={goPrevPage}>
      {children}
    </Comp>
  );
};

const WizardButtonNext = ({ children, as: Comp = "button", ...props }) => {
  const { goNextPage, activePageIndex, steps } = useWizardContext();

  return activePageIndex < steps - 1 ? (
    <Comp {...props} onClick={goNextPage}>
      {children}
    </Comp>
  ) : null;
};

export const useWizardProgress = () => {
  const { activePageIndex, steps } = useWizardContext();
  return {
    currentIndex: activePageIndex + 1,
    steps
  };
};

export const useWizardButtons = () => {
  const { goNextPage, goPrevPage, activePageIndex, steps } = useWizardContext();
  return {
    goNextPage,
    goPrevPage,
    activePageIndex,
    steps
  };
};

export const useWizardPages = (totalSteps) => {
  const { setSteps, activePageIndex } = useWizardContext();
  React.useEffect(() => {
    setSteps(totalSteps);
  }, [totalSteps, setSteps]);

  return {
    activePageIndex
  };
};

Wizard.Pages = WizardPages;
Wizard.ButtonNext = WizardButtonNext;
Wizard.ButtonPrev = WizardButtonPrev;

export default Wizard;
