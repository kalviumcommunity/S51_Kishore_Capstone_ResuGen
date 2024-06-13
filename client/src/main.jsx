import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Redux/Store.js";
// import { ResumeProvider } from "./Context";
// import WebFont from 'webfontloader';
import ResumeBuilderMain from "./ResumeBuilderMain.jsx"



ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
