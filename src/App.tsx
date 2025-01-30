import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { Login } from "./components/Login";
import { ProductList } from "./components/ProductList";

import { useAppContext } from "./context";

import { FaSignOutAlt } from "react-icons/fa";

const App = () => {
  const { session, handleLogout } = useAppContext();

  if (session === undefined) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <nav className="w-full bg-slate-300 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold text-slate-600">My Products App</h1>
        {session && (
          <button
            onClick={handleLogout}
            className="bg-slate-500 px-2 py-2 text-white rounded-md hover:cursor-pointer hover:bg-slate-600"
          >
            <FaSignOutAlt />
          </button>
        )}
      </nav>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Routes>
          <Route
            path="/login"
            element={!session ? <Login /> : <Navigate to="/products" />}
          />
          <Route
            path="/products"
            element={session ? <ProductList /> : <Navigate to="/login" />}
          />
          <Route
            path="/*"
            element={<Navigate to={session ? "/products" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
