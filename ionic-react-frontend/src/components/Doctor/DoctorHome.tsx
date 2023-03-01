
import {
    IonPage,
    IonCard,
    IonCardHeader,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar, IonButton, IonGrid, IonSegment, IonCol, IonRow
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
import './Doctor.css';
import {useEffect, useState} from "react";

// import {Redirect} from "react-router";

// setupIonicReact();

const DoctorHome: React.FC = () => {

    const [activeCases, setActiveCases] = useState<any[]>([]);

    // const [redirect, setRedirect] = useState(false);

    const [useSt, setUseSt] = useState(false);


    const deactivate = (visitId:any) => {
        fetch(`http://localhost:9090/api/visits/${visitId}`, {method : 'PUT'})
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                handle();
            })
        // setRedirect(true);
    }

    const handle = () => {
        console.log('Database updated..!');
        if (useSt)
            setUseSt(false);
        else
            setUseSt(true);
    }

    useEffect(() => {

        fetch(`http://localhost:9090/api/visits/activeVisits/hospital/1000`)
            .then((response) => response.json())
            .then((json) => {
                // setUseSt(true);
                setActiveCases(json);

                console.log(json);
                // setUseSt(1);
                console.log(activeCases);
                return json;
            })
    }, []);

    useEffect(() => {
         fetch(`http://localhost:9090/api/visits/activeVisits/hospital/1000`)
            .then((response) => response.json())
            .then((json) => {
                // setUseSt(true);
                setActiveCases(json);
                console.log(json);
                console.log(json.length);
                // setUseSt(1);
                console.log(activeCases);
                return json;
            })
    },[useSt]);

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>HEALTHCARE SERVICES</b>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonHeader>
                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>DOCTOR</b>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            
            <IonHeader>
                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>ASSIGNED CASES</b>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
                
            <IonContent className='ion-padding'/*class = "content-style"*/>
                <IonGrid className='ion-text-center ion-margin'>
                    <IonButton onClick = {handle}>REFRESH</IonButton>
                        {activeCases.map(cases =>
                            <IonCard class = "card-style">
                                <IonCardHeader>
                                    <IonSegment value = {cases.visitId} key = {cases.visitId}>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol><h5>Patient ID: {cases.patient.patientId}</h5></IonCol>
                                                <IonCol><h5>Patient Name: {cases.patient.fname}</h5></IonCol>   
                                                <IonCol>
                                                    <IonButton onClick = {() => deactivate(cases.visitId)}>PICK</IonButton>
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

export default DoctorHome;