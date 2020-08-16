import React from "react";
import Wizard, {
  WizardPages,
  WizardButtonNext,
  WizardButtonPrev
} from "./Wizard";
import "../styles.css";

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

const App = () => {
  return (
    <Wizard steps={3}>
      <WizardPages className="wizard__content">
        <Page1 />
        <Page2 />
        <Page3 />
      </WizardPages>
      <div className="wizard__buttons">
        <WizardButtonPrev className="wizard__buttons-left" />
        <WizardButtonNext className="wizard__buttons-right" />
      </div>
    </Wizard>
  );
};

export default App;
