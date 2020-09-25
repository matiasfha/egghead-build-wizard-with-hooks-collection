import React from "react";

const WizardContext = React.createContext();

export const useWizardContext = () => {
  const context = React.useContext(WizardContext);
  if (!context) {
    throw new Error(
      `Un componente compuesto de Wizard no puede ser
       renderizado fuera del Wizard padre`
    );
  }
  return context;
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

const defaultInitialState = {
  activePageIndex: 0,
  steps: 0
};

export const actions = {
  NEXT_PAGE: "NEXT_PAGE",
  PREV_PAGE: "PREV_PAGE",
  SET_STEPS: "SET_STEPS"
};

const defaultReducer = (state, action) => state;

export const wizardReducer = (state, action) => {
  const { activePageIndex } = state;
  switch (action.type) {
    case actions.NEXT_PAGE:
      return { ...state, activePageIndex: activePageIndex + 1 };
    case actions.PREV_PAGE:
      return { ...state, activePageIndex: activePageIndex - 1 };
    case actions.SET_STEPS:
      return { ...state, steps: action.payload };
    default:
      return state;
  }
};

const combineReducers = (...reducers) => (state, action) => {
  return reducers.reduce((acc, nextReducer) => {
    return nextReducer(acc, action);
  }, state);
};

const Wizard = ({ children, reducer = defaultReducer, initialState }) => {
  const [{ activePageIndex, steps }, dispatch] = React.useReducer(
    combineReducers(wizardReducer, reducer),
    {
      ...defaultInitialState,
      ...initialState
    }
  );

  const goNextPage = () => {
    dispatch({ type: actions.NEXT_PAGE });
  };

  const goPrevPage = () => {
    dispatch({ type: actions.PREV_PAGE });
  };

  const setSteps = React.useCallback(
    (n) => {
      dispatch({ type: actions.SET_STEPS, payload: n });
    },
    [dispatch]
  );

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

const WizardPages = (props) => {
  const { activePageIndex, setSteps } = useWizardContext();
  const pages = React.Children.toArray(props.children);
  const steps = React.Children.count(props.children);
  const currentPage = pages[activePageIndex];
  React.useEffect(() => {
    setSteps(steps);
  }, [steps, setSteps]);
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

export const WizardButtonNext = ({
  children,
  as: Comp = "button",
  ...props
}) => {
  const { goNextPage, activePageIndex, steps } = useWizardContext();

  return activePageIndex < steps - 1 ? (
    <Comp {...props} onClick={goNextPage}>
      {children}
    </Comp>
  ) : null;
};

Wizard.Pages = WizardPages;
Wizard.ButtonNext = WizardButtonNext;
Wizard.ButtonPrev = WizardButtonPrev;

export default Wizard;
