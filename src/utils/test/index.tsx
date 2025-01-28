import React, { ReactElement } from "react";
import { render } from "@testing-library/react";
import { Context, appContext } from "../../context";

type ProviderProps = {
  children: React.ReactNode;
  customContext: Context;
};

const Provider = ({ children, customContext }: ProviderProps) => {
  return (
    <appContext.Provider value={customContext}>{children}</appContext.Provider>
  );
};

const customRender = (ui: ReactElement, customContext: Context) =>
  render(ui, {
    wrapper: ({ children }) => (
      <Provider customContext={customContext}>{children}</Provider>
    ),
  });

export * from "@testing-library/react";
export { customRender as render };
