import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import GlobalStyle from "./GlobalStyles";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
  // </React.StrictMode>
);
