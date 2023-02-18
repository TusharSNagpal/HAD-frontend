
import {
    IonPage,
    IonCard,
    IonCardHeader,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar
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
import {useEffect, useState} from "react";
// import {Redirect} from "react-router";

// setupIonicReact();

const DoctorHome: React.FC = () => {

    const [activeCases, setActiveCases] = useState<any[]>([]);

    useEffect(() => {
        fetch(`http://localhost:9090/api/visits/activeVisits/hospital/1`)
            .then((response) => response.json())
            .then((json) => {
                setActiveCases(json);
                console.log(json);
                console.log(activeCases);
            })
    },[]);

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
                        <b>DOCTOR</b>
                    </IonTitle>
                </IonToolbar>

                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>ASSIGNED CASES</b>
                    </IonTitle>
                </IonToolbar>

            </IonHeader>

            <IonContent class = "content-style">
                    {activeCases.map(cases =>
                        <IonCard class = "card-style">
                            <IonCardHeader>
                                <li className= "no-style" value = {cases.patient.patientId} key = {cases.patient.patientId}><div>Patient ID: {cases.patient.patientId}  </div>  <div>Patient Name: {cases.patient.fname}  </div></li>
                            </IonCardHeader>
                        </IonCard>
                    )}
            </IonContent>

        </IonPage>
    )
};

export default DoctorHome;