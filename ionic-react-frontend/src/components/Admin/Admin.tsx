
import {
    IonContent,
    IonGrid,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonPage,
    IonSegment, IonList, IonItem, IonSelect, IonSelectOption, IonLabel, IonInput
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
import './Admin.css';
import {useState} from "react";

// setupIonicReact();

const Admin: React.FC = () => {
    // const patientIdRef = useRef<HTMLIonInputElement>(null);
    const [role, setRole] = useState("");

    const handleChange = (event:any) => {
        setRole(event.target.value);
        // console.log(event.target.value);
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>HEALTH CARE SERVICES</b>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonHeader>
                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>LOGIN PAGE</b>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className='ion-padding'/*class = "content-style"*/>

                <IonGrid className='ion-text-center ion-margin'>

                    <IonList className = "ion-select-style">
                        <IonItem>
                            <IonSelect interface = "action-sheet" placeholder="LOGIN AS" onIonChange={handleChange}>
                                <IonSelectOption value="admin">ADMIN</IonSelectOption>
                                <IonSelectOption value="supervisorHome">SUPERVISOR</IonSelectOption>
                                <IonSelectOption value="doctorHome">DOCTOR</IonSelectOption>
                                <IonSelectOption value="fieldWorker">FIELD WORKER</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                    </IonList>

                    <IonSegment>
                        <form className="ion-padding">
                            <IonItem>
                                <IonLabel position="floating">ID</IonLabel>
                                <IonInput />
                            </IonItem>
                            <IonButton className="ion-margin-top" type="submit" expand="block">
                                GENERATE OTP
                            </IonButton>
                            <IonItem>
                                <IonLabel position="floating">OTP</IonLabel>
                                <IonInput type="password" />
                            </IonItem>
                            <IonButton className="ion-margin-top" expand="block" routerLink = {`./${role}`}>
                                Login
                            </IonButton>
                        </form>
                    </IonSegment>

                    {/*<IonCard class = "card-style">*/}
                    {/*    <IonCardHeader>*/}
                    {/*        <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" routerLink = "./fieldWorkerHome">ADMIN</IonButton></IonCardTitle>*/}
                    {/*    </IonCardHeader>*/}
                    {/*</IonCard>*/}

                    {/*<IonCard class = "card-style">*/}
                    {/*    <IonCardHeader>*/}
                    {/*        <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" routerLink = "./supervisorHome">SUPERVISOR</IonButton></IonCardTitle>*/}
                    {/*    </IonCardHeader>*/}
                    {/*</IonCard>*/}

                    {/*<IonCard class = "card-style">*/}
                    {/*    <IonCardHeader>*/}
                    {/*        <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" routerLink = "./doctorHome">DOCTOR</IonButton></IonCardTitle>*/}
                    {/*    </IonCardHeader>*/}
                    {/*</IonCard>*/}

                    {/*<IonCard class = "card-style">*/}
                    {/*    <IonCardHeader>*/}
                    {/*        <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" routerLink = "./fieldWorkerHome">FIELD WORKER</IonButton></IonCardTitle>*/}
                    {/*    </IonCardHeader>*/}
                    {/*</IonCard>*/}
                </IonGrid>

            </IonContent>
        </IonPage>
    )
};

export default Admin;
