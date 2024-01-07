import { createContext, useEffect, useState } from "react";


export const DarkModeContext = createContext()

const DarkModeProvider = ({ children }) => {

  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode"))
  console.log(darkMode)
  useEffect(() => {
   
    if(darkMode==="light"){
      localStorage.setItem("darkMode" , "light")
    }else if(darkMode==="dark") {
      localStorage.setItem('darkMode', "dark")
    }

  }, [darkMode])

  const toggleDarkMode = (text) => {
    setDarkMode(text) 
   }


  return (
    <DarkModeContext.Provider value={[darkMode, toggleDarkMode]}>
      {children}
    </DarkModeContext.Provider>
  );
};


export default DarkModeProvider;