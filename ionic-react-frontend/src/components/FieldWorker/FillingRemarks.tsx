import { IonPage, IonCardTitle, IonCard, IonGrid, IonRow, IonCol, IonCardHeader, IonButton, IonLabel, IonItem, IonInput, IonSegment, IonHeader, IonTitle, IonToolbar, setupIonicReact, IonRouterOutlet, IonContent } from '@ionic/react';
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Link } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import '../../theme/variables.css';
import './FieldWorker.css';

import { useStorageFillingRemarks } from '../../hooks/useStorageFillingRemarks';
import { useStorageFollowUp } from './useStorageFollowUp';

import { useEffect, useState } from 'react';
import { Network } from "@capacitor/network";

// setupIonicReact();

interface PatientId {
    patientId: any;
}

const FillingRemarks: React.FC<any> = props => {
    const followUpRow = props.location.state;
    const [followUpCurr, setFollowUpCurr] = useState(followUpRow.userData.userData);
    const [redirect, setRedirect] = useState(false);

    const [assigned, setAssigned] = useState({} as any);
    // const s = "BLOOD PRESSURE $ FEVER $ HEALTH RATE $ TEMPERATURE";
    const [s,setS] = useState(followUpCurr.fup.currFollowup.taskAssignedByDoctor);

    // const [on, setOn] = useState(false);
    // const [off, setOff] = useState(false);

    const [save, setSave] = useState(false);

    let temp = {} as any;
    let output = s.split('$');
    const [out, setOut] = useState<string[]>(output);
    const [final, setFinal] = useState('');

    out!.map(data => (
        temp = { ...temp, [data]: '' }
    ))

    // OFFLINE START..!
    const { remarks, addRemark } = useStorageFillingRemarks();
    const { followups, addFollowups, updateFollowUp } = useStorageFollowUp();

    const [task, setTask] = useState('');
    // console.log(output);

    // await new Promise(accept => {setTask(st); console.log(assigned);});

    // console.log(temp);

    const saveRemarks = () => {
        let st = "";
        // await new Promise(accept => {setFinal('')});

        Object.keys(assigned).forEach(async function (key) {
            // console.log(temp[key]);
            // st = final;
            st += '$';
            st += assigned[key];

            // setTask(st);
            // await new Promise(accept => {setTask(st); });
            // setFinal(st);
        });
        setTask(st);
        setSave(true);
    }

    const fillForm = async () => {
        console.log(assigned);
        console.log(task);

        const connection = await Network.getStatus();

        if(connection.connected){ //if internet is ON (ONLINE): We will directly update details on server.. also, even if it is active but api failed we will push the data in ionic storage

            let data = {
                'reviewByFieldWorker': task
            };

            const addRecordEndpoint = `http://172.16.132.90:9090/api/followUps/fieldWorker/${followUpCurr.fup.currFollowup.followUpId}`;
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }

            fetch(addRecordEndpoint, options)
                .then(async function (response) {
                    console.log(response);
                    if (response['status'] === 200) {
                        console.log("DONE");
                        // console.log(task);
                    } 
                    else {
                        console.log("ERROR");
                        await addRemark(false, 2, s, task, followUpCurr.fup.newF.followUpId);
                        await updateFollowUp(followUpCurr.fup.currFollowup.followUpId);
                    }
                })
        } //if the internet is not on(OFFLINE): We will directly push in ionic storage..
        else {
            await addRemark(false, 2, s, task, followUpCurr.fup.currFollowup.followUpId);
            await updateFollowUp(followUpCurr.fup.currFollowup.followUpId);
        }
        setRedirect(true);
    }
    // OFFLINE END..!

    // setOut(output);

    const handleFormChange = (event: any, key: string) => {
        // console.log(event.target.value);
        // console.log(key);
        temp[key[0]] = event.target.value;
        setAssigned({ ...assigned, [key]: temp[key[0]] });
        setSave(false);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle class="ion-text-center">
                        <b>HEALTHCARE SERVICES</b>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonHeader>
                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>FIELD WORKER</b>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className='ion-padding ion-text-center'/*class = "content-style"*/>
                <IonCard class="card-style">
                    <IonGrid className='ion-text-center ion-margin' >
                        <IonRow>
                            <IonCol className="header-border">
                                <IonHeader>
                                    <IonToolbar color="primary">
                                        <IonTitle class="ion-text-center">
                                            <b>ASSIGNED BY DOCTOR</b>
                                        </IonTitle>
                                    </IonToolbar>
                                </IonHeader>
                                <form className="ion-padding">
                                    {Object.entries(temp).map((key: any, value: any) => (
                                        <IonItem key={key}>
                                            {key != '0' ?
                                                <IonLabel position='floating'>{key}</IonLabel>
                                                :
                                                <IonLabel>TASKS:</IonLabel>}
                                            {key != '0' ?
                                                <IonInput onIonChange={event => handleFormChange(event, key)} />
                                                : null}
                                        </IonItem>
                                    ))}
                                </form>
                            </IonCol>
                            <IonCol className="header-border">
                                <IonHeader>
                                    <IonToolbar color="primary">
                                        <IonTitle class="ion-text-center">
                                            <b>MANDATORY CHECKUP</b>
                                        </IonTitle>
                                    </IonToolbar>
                                </IonHeader>
                                <form className="ion-padding">
                                    {out!.map(assign =>
                                        <IonItem>
                                            <IonLabel position='floating'>{assign}</IonLabel>
                                            <IonInput />
                                        </IonItem>
                                    )}
                                </form>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>

                <IonButton className="ion-margin-top" onClick={() => { saveRemarks(); }}>
                    SAVE
                </IonButton>

                {save ?
                    <IonButton className="ion-margin-top" onClick={() => { fillForm(); }}>
                        Fill Remarks
                    </IonButton>
                    : null}

                {redirect ?
                    <Redirect to={{ pathname: "/fieldWorkerInHospital", state: { userData: followUpCurr.userData.profileData } }}/>
                    :null}

            </IonContent>
        </IonPage>
    )
};

export default FillingRemarks;