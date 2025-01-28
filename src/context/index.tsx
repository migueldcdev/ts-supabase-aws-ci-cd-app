import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Session } from "@supabase/supabase-js";

type Data = {
  email: string;
  password: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
};

type Context = {
  session: Session | null | undefined;
  products: Product[] | undefined;
  handleLogout: () => void;
  handleLogin: (data: Data) => void;
  fetchProducts: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
};

export const appContext = createContext<Context | null>(null);

export const AppContext = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);

  async function fetchSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setSession(session);
  }

  async function fetchProducts() {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  }

  async function addProduct(product: { name: string; price: number }) {
    if (products != undefined) {
      const { data, error } = await supabase
        .from("products")
        .insert([product])
        .select();

      if (error) {
        console.error(error);
        alert("Error adding product: " + error.message);
      } else if (data) {
        setProducts((prev) => [...prev, ...data]);
      }
    }
  }

  async function deleteProduct(id: number) {
    await supabase.from("products").delete().eq("id", id);
    setProducts(products.filter((product) => product.id !== id));
  }

  async function updateProduct(product: Product) {
    const { id, name, price } = product;

    const { error } = await supabase
      .from("products")
      .update({ name, price })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Error updating product: " + error.message);
    } else {
      setProducts(
        products.map((item) => (item.id === id ? { ...product } : item)),
      );
    }
  }

  useEffect(() => {
    fetchSession();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleLogin = async (data: Data) => {
    // todo: handle errors
    await supabase.auth.signInWithPassword(data);
  };

  return (
    <appContext.Provider
      value={{
        session,
        products,
        handleLogout,
        handleLogin,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(appContext);
  if (!context) {
    throw new Error("useAppContext must be used within a user provider");
  }

  return context;
};
