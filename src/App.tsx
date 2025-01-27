import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import { Button } from "./components/Button";
import { Login } from "./pages/Login";
import { ProductList } from "./pages/ProductList";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";

const App = () => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

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
