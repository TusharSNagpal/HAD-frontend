
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
    IonPage, IonRow
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
import BackButton from "../BackButton";

const Supervisor: React.FC<any> = props => {
    const profile = props.location.state;
    const [profileData, setProfileData] = useState(profile);
    const [service, setService] = useState("");
    const path="/"

    const redirectIt = (pathTo:string) => {
        setService(pathTo);
    }
    
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
            <IonRow>
                <BackButton path={path} data={profileData.userData}></BackButton>
            </IonRow>

        </IonHeader>

        <IonContent className='ion-padding'/*class = "content-style"*/>

            <IonGrid className='ion-text-center ion-margin ion-padding'>

                {/*<IonSegment>*/}


                <IonCard class = "card-style">
                <IonCardHeader>
                    <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" onClick={() => redirectIt("/supervisors/register")} /*routerLink = "./registerDoctor"*/>REGISTER</IonButton></IonCardTitle>
                </IonCardHeader>
                </IonCard>

                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" onClick={() => redirectIt("/supervisors/updatePatient")} /*routerLink = "./registerDoctor"*/>UPDATE PATIENT</IonButton></IonCardTitle>
                    </IonCardHeader>
                </IonCard>

                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" onClick={() => redirectIt("/supervisors/delete")} /*routerLink = "./registerDoctor"*/>DELETE</IonButton></IonCardTitle>
                    </IonCardHeader>
                </IonCard>


                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" onClick={()=>redirectIt("/supervisors/fieldWorkersInHospital")}>ASSIGN TASKS TO FIELD WORKER</IonButton></IonCardTitle>
                    </IonCardHeader>
                </IonCard>

                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" onClick={() => redirectIt("/supervisors/newCase")} /*routerLink = "./newCase"*/>NEW CASE</IonButton></IonCardTitle>
                    </IonCardHeader>
                </IonCard>
            </IonGrid>

            {service !== "" ?
                <Redirect to={{ pathname: `${service}`, state: { userData: profileData.userData } }}/>
            :null}

        </IonContent>
    </IonPage>
)
};

export default Supervisor; 
