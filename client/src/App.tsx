import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Loader from "./pages/Loader";
import { AdminAccess } from "./utils/Private";

const NotFound = lazy(() => import("./pages/NotFound"));
const Private = lazy(() => import("./utils/Private"));
const Address = lazy(() => import("./pages/Address"));
const Register = lazy(() => import("./pages/Register"));
const Create = lazy(() => import("./pages/Create"));
const Summery = lazy(() => import("./pages/Summery"));
const Profile = lazy(() => import("./pages/Profile"));
const Contact = lazy(() => import("./pages/Contact"));
const Order = lazy(() => import("./pages/Order"));
const ProductPage = lazy(() => import("./pages/ProductPage"));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<Private />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/address" element={<Address />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/summary" element={<Summery />} />

            <Route element={<AdminAccess />}>
              <Route path="/create" element={<Create />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
