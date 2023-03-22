import { useEffect, useState } from "react";
import {Storage} from '@ionic/storage';

export function useStorage() {
    const[store, setStore]= useState<Storage>();
    const[followups, setFollowups] = useState<any[]>([]);

    useEffect(() => {
        const initStorage =async () => {
            const newStorage = new Storage({
                name : 'followupsDB'
            });
            const store = await newStorage.create();
            setStore(store);

            const storedFollowups = await store.get('my-followups') || []
            setFollowups(storedFollowups);
        }
        initStorage();
    
    }, []);

    
    const addFollowups = async(fups: any) => {
        console.log(fups);
        await store?.set('my-followups', fups)
        const storedFollowups = await store?.get('my-followups') || []
        setFollowups(storedFollowups);
    }

    // const getFollowups = async() => {
    //     const storedFollowups = await store?.get('my-followups') || [];
    //     setFollowups(storedFollowups)
    //     return followups;
    // }

    return {
        followups,
        addFollowups
    }
}