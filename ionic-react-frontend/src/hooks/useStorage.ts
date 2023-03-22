// Implementing custom hook
import { useEffect, useState } from "react";
import { Storage } from "@ionic/storage";

const REMARKS_KEY = 'followup-remarks';

export interface FollowUpRemarks {
    urgentFlag: boolean;
    isActive: number;
    taskAssignedByDoctor: string;
    reviewByFieldWorker: string;
    created: number;
    status: number;
    id: string;
}

export function useStorage() {
    const [store, setStore] = useState<Storage>();
    const [remarks, setRemarks] = useState<FollowUpRemarks[]>([]);

    useEffect(()=>{
        const initStorage = async () => {
            const newStore = new Storage({
                name: 'hadDB'
            });
            
            const store = await newStore.create();
            setStore(store);

            const storedRemarks = await store.get(REMARKS_KEY) || [];
            setRemarks(storedRemarks);
        }
        initStorage();
    }, []);

    const addRemark = async (urgentFlag: boolean,
                            isActive: number,
                            taskAssignedByDoctor: string,
                            reviewByFieldWorker: string) => 
    {
        const newRemark = {
            urgentFlag,
            isActive,
            taskAssignedByDoctor,
            reviewByFieldWorker,
            created: new Date().getTime(),
            status: 0,
            id: ''+new Date().getTime()
        }
        // console.log(updatedRemarks);
        // setRemarks(updatedRemarks);
        // console.log(remarks[remarks.length-1])

        const updatedRemarks = [...remarks, newRemark];
        await store?.set(REMARKS_KEY, updatedRemarks);
        const storedFollowups = await store?.get(REMARKS_KEY) || []
        setRemarks(storedFollowups);
    }

    return {
        remarks, addRemark
    }
}