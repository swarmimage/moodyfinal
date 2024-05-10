import { createContext, useEffect } from "react"
import useLocalStorage from "react-use-localstorage";

const SavedContext = createContext();

const SavedProvider = ({ children }) => {

    const [SavedLocal, setSavedLocal] = useLocalStorage("saved",[]);

    const handleSaved = (item) => {
        setSavedLocal(JSON.stringify([{ ...item, saved: true }, ...SavedLocal]))
    }

    const contextValues = { SavedLocal, handleSaved };

    return <SavedContext.Provider value={contextValues}>
        {children}
    </SavedContext.Provider>
}

export { SavedContext, SavedProvider };