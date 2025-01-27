import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";


import { Button } from "./components/Button";
import { Login } from "./pages/Login";
import { ProductList } from "./pages/ProductList";


import { useAppContext } from "./context";

const App = () => {
  const { session, handleLogout } = useAppContext()  
 
  if (session === undefined) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
  }

  return (         
      <Router>
        <nav className="w-full bg-blue-800 text-white p-4 flex justify-between items-center shadow-md">
          <h1 className="text-xl font-bold">My Products App</h1>
          {session && <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md">Logout</Button>}
        </nav>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Routes>
            <Route path="/login" element={!session ? <Login /> : <Navigate to="/products" />} />
            <Route path="/products" element={session ? <ProductList /> : <Navigate to="/login" />} />
            <Route path="/*" element={<Navigate to={session ? "/products" : "/login"} />} />
          </Routes>
        </div>
      </Router>      
    
  );
};

export default App;
