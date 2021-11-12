import { createContext } from "react"
import { useState } from "react"

export const StateContext = createContext();

function StateProvider({ children }) {

    const [state, setState] = useState("")


    return (
        <StateContext.Provider value={{ state, setState }}>
            {children}
        </StateContext.Provider>
    )
}

export { StateProvider }
