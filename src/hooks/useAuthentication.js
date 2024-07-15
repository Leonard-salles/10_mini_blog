import { db } from "../firebase/config"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth"
import { useState, useEffect } from "react"


export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [load, setLoad] = useState(null)
    const [cancelled, setCancelled] = useState(false)

    //cleanup
    //deal with memory liquid

    const auth = getAuth()

    function checkIfIsCancelled(){
        if(cancelled){
            return
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoad(true)
        setError(null)
        try {
            const {user} = await createUserWithEmailAndPassword(auth, data.email, data.password)

            await updateProfile(user, {displayName: data.displayName})
            
            setLoad(false)
            return user

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)
            
            let systemErrorMessage

            if(error.message.includes("Password")){
                systemErrorMessage = "A senha deve conter no minimo 6 caracteres."
            }else if(error.message.includes("email-aready")){
                systemErrorMessage = "Usuario com e-mail ja cadastrado."
            }else{
                systemErrorMessage = "Ocorreu um erro. Por favor tente mais tarde"
            }
            setError(systemErrorMessage)
            setLoad(false)
        }

       
    }

    // logout 

    const logout = () => {
        checkIfIsCancelled()

        signOut(auth)
    }

    // login

    const login = async(data) => {
        checkIfIsCancelled()

        setLoad(true)
        setError(false)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoad(false)
        
        } catch (error) {
            let systemErrorMessage

            if(error.message.includes("user-not-found")){
                systemErrorMessage = "Usuario nao encontrado"
            }else if(error.message.includes("wrong-password")){
                systemErrorMessage = "senha incorreta."
            } else{
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde"
            }

            setError(systemErrorMessage)
            setLoad(false)
        }

    }

    useEffect(()=> {
        return ()=> setCancelled(true)
    }, [])

    return { auth, createUser, error, load, logout, login }
}