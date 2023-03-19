import {
    IonPage,
    IonCard,
    IonCardHeader,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar, IonButton, IonGrid, IonSegment, IonCol, IonRow, IonCardTitle
} from '@ionic/react';

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
import {useEffect, useState} from "react";
import { useStorage } from './useStorage';

const FieldWorker: React.FC = () => {
    // const [fups, setFups] = useState<any[]>([]);

    // const [followups, setFollowups] = useState<any[]>([]);

    const [useSt, setUseSt] = useState(false);

    const {followups, addFollowups} = useStorage();

    const handle = () => {
        console.log('Database updated..!');
        if (useSt)
            setUseSt(false);
        else
            setUseSt(true);
    }

    useEffect(() => {
        fetch(`http://localhost:9090/api/followUps/1`)
           .then((response) => response.json())
           .then((json) => {
               console.log(json);
               addFollowups(json);
           })
    }, [useSt]);
    

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>HEALTHCARE SERVICES</b>
                    </IonTitle>
                </IonToolbar>

                <IonToolbar>
                    <IonTitle class="ion-text-center">
                    <b>FieldWorker</b>
                    </IonTitle>
                </IonToolbar>

                <IonHeader>
                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>ASSIGNED FOLLOWUPS</b>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            </IonHeader>
            
            <IonContent className='ion-padding'/*class = "content-style"*/>
                <IonGrid className='ion-text-center ion-margin'>
                <IonButton onClick = {handle}>REFRESH</IonButton>
                        {followups.map(followup =>
                            <IonCard class = "card-style">
                                <IonCardHeader>
                                    <IonSegment value = {followup.follow_ups_id} key = {followup.follow_ups_id}>
                                        <IonGrid>
                                            <IonRow>
                                                {/* <IonCol><h5>Patient ID: {followup.visit.patient.patientId}</h5></IonCol> */}
                                                <IonCol><h5>{followup.visit.patient.fname}</h5></IonCol>   
                                                <IonCol>
                                                    <IonButton>-</IonButton>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </IonSegment>
                                </IonCardHeader>
                            </IonCard>
                        )}
                </IonGrid>
            </IonContent>

        </IonPage>
    )
};

export default FieldWorker; 