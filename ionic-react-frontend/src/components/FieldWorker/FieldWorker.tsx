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
import { useStorageFollowUp } from './useStorageFollowUp';
import { Redirect } from 'react-router';

const FieldWorker: React.FC<any> = props => {
    
    const [useSt, setUseSt] = useState(false);
    const [redirect,setRedirect] = useState(false);
    const [currFollowup, setCurrFollowup] = useState(null);

    const fwid = props.location.state.id.id;
    const {followups, addFollowups} = useStorageFollowUp();

    const review = (followup : any) => {
        setCurrFollowup(followup);
        setRedirect(true);
    }

    const handle = () => {
        console.log('Database updated..!');
        if (useSt)
            setUseSt(false);
        else
            setUseSt(true);
    }

    useEffect(() => {
        fetch(`http://localhost:9090/api/followUps/${fwid}`)
           .then((response) => response.json())
           .then((json) => {
               console.log("data fetched");
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
                <IonButton onClick = {handle}>DOWNLOAD</IonButton>
                        {followups.filter(followup => followup.isActive == 1).map(followup =>
                            <IonCard class = "card-style">
                                <IonCardHeader>
                                    <IonSegment value = {followup.follow_ups_id} key = {followup.follow_ups_id}>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol><h5>{followup.visit.patient.fname}</h5></IonCol>   
                                                <IonCol>
                                                    <IonButton onClick={() => review(followup)}>PICK</IonButton>
                                                    {redirect ? <Redirect from = '/fieldworkers' to={{ pathname: './followup', state: { fup: {currFollowup} } }} />:null}
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