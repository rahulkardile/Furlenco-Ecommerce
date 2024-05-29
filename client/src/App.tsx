import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Loader from "./pages/Loader";
import Private from "./utils/Private";

const NotFound = lazy(() => import("./pages/NotFound"));
// const Private = lazy(() => import("./utils/Private"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<Private />}>
            <Route path="/cart" element={<Cart />} />
          </Route>

        </Routes>
      </Suspense>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
