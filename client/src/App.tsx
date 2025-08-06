import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider  } from "react-router-dom"
import RootLayout from "./components/RootLayout"
import Home from "./pages/Home";
import About from "./pages/About";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Forms/Login";
import Register from "./pages/Forms/Register";
import Cart from "./pages/Cart";
import Favorite from "./pages/Favorite";
import CategoryPage from "./pages/CategoryPage";
import SearchResult from "./pages/SearchResult";
import RequiredAuth from "./components/RequiredAuth";
import ProfileLayout from "./components/ProfileLayout";
import AccountPage from "./pages/Profile/AccountPage";
import PasswordPage from "./pages/Profile/PasswordPage";
import useAuth from "./hooks/useAuth";

function App() {
  const {authUser} = useAuth();
    // if (isLoading || error) return null;
    const router = createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/:productId" element={<ProductPage />} />
            <Route path="/search" element={<SearchResult />} />
            <Route
              path="/cart"
              element={
                <RequiredAuth>
                  <Cart />
                </RequiredAuth>
              }
            />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/category/:category" element={<CategoryPage />} />
          </Route>
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/register"
            element={!authUser ? <Register /> : <Navigate to={"/"} />}
          />

          <Route
            path="/profile"
            element={authUser ? <ProfileLayout /> : <Navigate to="/" />}
          >
            <Route index element={<AccountPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="password" element={<PasswordPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )
    );

  return <RouterProvider router={router} />
}

export default App
