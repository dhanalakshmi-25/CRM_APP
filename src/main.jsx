import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import store from "./store/index.jsx";
// import MuiXLicense from "./widgets/MuiXLicense";
// import Spinner from "./widgets/spinner/Spinner.tsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <Suspense fallback={<Spinner />}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </Suspense> */}
  </Provider>
);
