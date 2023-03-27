
import {
    IonContent,
    IonGrid,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonPage
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

// import RegisterDoctor from "./RegisterDoctor"

/* Theme variables */
import '../../theme/variables.css';
import './Supervisor.css';
// setupIonicReact();

import { useState, useEffect } from "react";
import { Redirect } from 'react-router';

const Supervisor: React.FC<any> = props => {
    const supId = props.location.state;
    const [supervisorId, setSupervisorId] = useState(supId);
    const [service, setService] = useState("");
    
    const redirectIt = (pathTo:string) => {
        setService(pathTo);
    }

    // useEffect(() => {
    //     console.log("Suphome");
    //     console.log(supId.userId);
    // })

    return (
    <IonPage>
        <IonHeader>

            <IonToolbar>
                <IonTitle class="ion-text-center">
                    <b>HEALTHCARE SERVICES</b>
                </IonTitle>
            </IonToolbar>

            <IonToolbar>
                <IonTitle class="ion-text-center">
                <b>SUPERVISOR</b>
                </IonTitle>
            </IonToolbar>

        </IonHeader>

        <IonContent className='ion-padding'/*class = "content-style"*/>

            <IonGrid className='ion-text-center ion-margin ion-padding'>

                {/*<IonSegment>*/}
                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" onClick={() => redirectIt("./registerDoctor")} /*routerLink = "./registerDoctor"*/>REGISTER DOCTOR</IonButton></IonCardTitle>
                    </IonCardHeader>
                </IonCard>

                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" onClick={() => redirectIt("./registerDoctor")} /*routerLink = "./registerDoctor"*/>REGISTER FIELD WORKER</IonButton></IonCardTitle>
                    </IonCardHeader>
                </IonCard>

                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" onClick={() => redirectIt("./registerPatient")}/*routerLink = "./registerPatient"*/>REGISTER PATIENT</IonButton></IonCardTitle>
                    </IonCardHeader>
                </IonCard>

                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" onClick={() => redirectIt("./registerDoctor")} /*routerLink = "./registerDoctor"*/>ASSIGN TASKS TO FIELD WORKER</IonButton></IonCardTitle>
                    </IonCardHeader>
                </IonCard>

                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" onClick={() => redirectIt("./newCase")} /*routerLink = "./newCase"*/>NEW CASE</IonButton></IonCardTitle>
                    </IonCardHeader>
                </IonCard>
            </IonGrid>

            {service !== "" ?
                <Redirect to={{ pathname: `${service}`, state: { userId: supervisorId.userId } }}/>
            :null}

        </IonContent>
    </IonPage>
)
};

export default Supervisor; 
