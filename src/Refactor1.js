import React from "react";
import "./styles.css";

const WizardContext = React.createContext();

const Wizard = ({ children, steps }) => {
  const [activePageIndex, setActivePageIndex] = React.useState(0);

  const goNextPage = () => {
    setActivePageIndex((index) => index + 1);
  };

  const goPrevPage = () => {
    setActivePageIndex((index) => index - 1);
  };

  const context = {
    activePageIndex,
    steps,
    goNextPage,
    goPrevPage
  };
  return (
    <WizardContext.Provider value={context}>
      <div className="wizard">{children}</div>
    </WizardContext.Provider>
  );
};

const WizardPages = ({ children, ...props }) => {
  const { activePageIndex } = React.useContext(WizardContext);
  const pages = React.Children.toArray(children);
  const currentPage = pages[activePageIndex];

  return <div {...props}>{currentPage}</div>;
};

const ButtonPrev = ({ ...props }) => {
  const { activePageIndex, goPrevPage } = React.useContext(WizardContext);
  return activePageIndex > 0 ? (
    <button type="button" onClick={goPrevPage} {...props}>
      Atras
    </button>
  ) : null;
};
const ButtonNext = ({ ...props }) => {
  const { activePageIndex, goNextPage, steps } = React.useContext(
    WizardContext
  );
  console.log(steps);
  return activePageIndex < steps - 1 ? (
    <button type="button" onClick={goNextPage} {...props}>
      Siguiente
    </button>
  ) : null;
};
const Page1 = () => (
  <div>
    <h1>Pagina 1</h1>
  </div>
);

const Page2 = () => (
  <div>
    <h1>Pagina 2</h1>
  </div>
);
const Page3 = () => (
  <div>
    <h1>Pagina 3</h1>
  </div>
);

export const App = () => {
  return (
    <Wizard steps={3} className="wizard__content">
      <WizardPages className="wizard__content">
        <Page1 />
        <Page2 />
        <Page3 />
      </WizardPages>
      <div className="wizard__buttons">
        <ButtonPrev className="wizard__buttons-left" />
        <ButtonNext className="wizard__buttons-right" />
      </div>
    </Wizard>
  );
};

export default App;
