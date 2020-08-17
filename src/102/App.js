import React from "react";
import Wizard from "./Wizard";
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
      <Wizard.Pages className="wizard__content">
        <Page1 />
        <Page2 />
        <Page3 />
      </Wizard.Pages>
      <div className="wizard__buttons">
        <Wizard.ButtonPrev className="wizard__buttons-left" />
        <Wizard.ButtonNext className="wizard__buttons-right" />
      </div>
    </Wizard>
  );
};

export default App;
