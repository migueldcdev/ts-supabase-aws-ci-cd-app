import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Session } from "@supabase/supabase-js";

type Context = {
    session: Session | null | undefined;
    handleLogout: () => void
}

export const appContext = createContext<Context | null>(null)

export const AppContext = ({ children }: { children: React.ReactNode }) => {

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
    return (
        <appContext.Provider value={{session, handleLogout}}>
            {children}
        </appContext.Provider>
    )

}

export const useAppContext = () => {
    const context = useContext(appContext)
    if (!context) {
        throw new Error("useAppContext must be used within a user provider");
    }

    return context;
}