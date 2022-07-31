import { Fragment } from "react";
import { Provider } from 'react-redux'
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes";
import './assets/index';
import store from "./container/store/store";

function App() {
  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </Fragment>
  );
}

export default App;
