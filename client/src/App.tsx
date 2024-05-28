import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";

const NotFound = lazy(() => import("../src/pages/NotFound"));
const Loader = lazy(() => import("../src/pages/Loader"));
const Register = lazy(() => import("../src/pages/Register"));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
