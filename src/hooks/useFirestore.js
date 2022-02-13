import { useEffect , useState } from 'react'
import { collection, onSnapshot , where , query, orderBy } from "firebase/firestore";
import {  db } from '../config/firebase/config'
const useFirestore = (coll , conditions) => {
    const [documents , setDocuments] = useState([])
    useEffect(() => {
        let collectionRef = collection(db , coll);
        let results;
        if(conditions){
            if(!conditions.compareValue || !conditions.compareValue.length){
                return ;
            }
            results = query( collectionRef , 
                where(conditions.fieldName , conditions.operator , conditions.compareValue ), 
                orderBy("createdAt")
                );
        }
        const unsubscribe = onSnapshot( results , (snapshot) => {
            const document = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id : doc.id,
            }))
            setDocuments(document)
        })

        return unsubscribe;
    },[coll,conditions])
    return documents;
}

export default useFirestore