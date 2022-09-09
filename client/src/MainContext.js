import { createContext } from "react";

const MainContext = createContext({
  contextRefresh: false,
  setContextRefresh: () => {},
});

export default MainContext;
