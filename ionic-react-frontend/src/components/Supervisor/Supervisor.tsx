
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonRouterOutlet, setupIonicReact, IonPage, IonCardSubtitle} from '@ionic/react';
import {IonReactRouter} from "@ionic/react-router";
import {Route} from "react-router-dom";

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

import RegisterDoctor from "./RegisterDoctor"

/* Theme variables */
import '../theme/variables.css';

// setupIonicReact();

const Supervisor: React.FC = () => {
    return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
            <IonTitle class="ion-text-center">
            <b>SUPERVISOR</b>
            </IonTitle>
        </IonToolbar>
        </IonHeader>

        <IonContent class = "content-style">

            <IonCard class = "card-style">
                <IonCardHeader>
                    <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" routerLink = "./registerDoctor">ASSIGN TASKS TO FIELD WORKER</IonButton></IonCardTitle>
                </IonCardHeader>
            </IonCard>

            <IonCard class = "card-style">
                <IonCardHeader>
                    <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" routerLink = "./registerDoctor">NEW CASE</IonButton></IonCardTitle>
                </IonCardHeader>
            </IonCard>

            <IonCard class = "card-style">
                <IonCardHeader>
                    <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" routerLink = "./registerDoctor">REGISTER DOCTOR</IonButton></IonCardTitle>
                </IonCardHeader>
            </IonCard>

            <IonCard class = "card-style">
                <IonCardHeader>
                    <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" routerLink = "./registerDoctor">REGISTER FIELD WORKER</IonButton></IonCardTitle>
                </IonCardHeader>
            </IonCard>

            <IonCard class = "card-style">
                <IonCardHeader>
                    <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" routerLink = "./registerDoctor">REGISTER PATIENT</IonButton></IonCardTitle>
                </IonCardHeader>
            </IonCard>

        </IonContent>
    </IonPage>
)
};

export default Supervisor; 
