import { useState, useEffect } from "react";

import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) =>{

    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)
    const [load, setLoad] = useState(null)

    //deal with memorie leak
    const [cancelled, setCancelled] = useState(false)

    useEffect(() =>{

        async function loadDocument(){
            if(cancelled) return

            setLoad(true)

            try {
                const docRef = await doc(db, docCollection, id)
                const docSnap = await getDoc(docRef)
                setDocument(docSnap.data())

                setLoad(false)

            } catch (error) {
                setError(error.message)
                console.log(error.message)
                setLoad(false)
            }

        }

        loadDocument()

    }, [docCollection, id, cancelled])

    useEffect(()=>{
        return () => setCancelled(true)
    },[])

    return { document, load, error }
}