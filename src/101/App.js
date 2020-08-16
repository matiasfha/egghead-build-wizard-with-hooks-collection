import React from "react";
import Wizard from "./Wizard";

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
    <Wizard>
      <Page1 />
      <Page2 />
      <Page3 />
    </Wizard>
  );
};

export default App;
