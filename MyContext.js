import React, { useState } from "react";
import { useContext } from "react";

const MyContext = React.createContext([]);
const UpdateContext = React.createContext((files) => {});

export function useMy() {
  return useContext(MyContext);
}

export function useUpdate() {
  return useContext(UpdateContext);
}

export function MyContextProvider({ children }) {
  const [files, setFiles] = useState();

  return (
    <MyContext.Provider value={files}>
      <UpdateContext.Provider value={setFiles}>
        {children}
      </UpdateContext.Provider>
    </MyContext.Provider>
  );
}
