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

const Wizard = ({ children, steps }) => {
  const [activePageIndex, setActivePageIndex] = React.useState(0);

  const goNextPage = React.useCallback(() => {
    setActivePageIndex((index) => index + 1);
  }, []);

  const goPrevPage = React.useCallback(() => {
    setActivePageIndex((index) => index - 1);
  }, []);

  const context = {
    activePageIndex,
    goNextPage,
    goPrevPage,
    steps
  };

  return (
    <WizardContext.Provider value={context}>
      <div className="wizard">{children}</div>
    </WizardContext.Provider>
  );
};

const WizardPages = (props) => {
  const { activePageIndex } = useWizardContext();
  const pages = React.Children.toArray(props.children);
  const currentPage = pages[activePageIndex];
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
