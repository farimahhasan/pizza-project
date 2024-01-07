import { useContext } from "react"
import { DarkModeContext } from "../contexts/DarkModeProvider"

export const useDarkMode = () => {
    const dark = useContext(DarkModeContext)
    return dark
}

