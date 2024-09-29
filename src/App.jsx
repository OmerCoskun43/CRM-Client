import AppRouter from "./router/AppRouter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navbar />
          <div className="flex-grow ">
            <AppRouter />
          </div>
          <Footer />
          <Toaster />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
