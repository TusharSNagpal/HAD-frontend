
import {
    IonPage,
    IonGrid,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton, IonRow
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

// import Date from "../items/Date";

/* Theme variables */
import '../../theme/variables.css';
import './Supervisor.css';
import {useState} from "react";
import {Redirect} from "react-router";
import BackButton from "../BackButton";

// setupIonicReact();

const Delete: React.FC<any> = props => {
    const profile = props.location.state;
    const [profileData, setProfileData] = useState(profile);
    const [service, setService] = useState("");
    const path = "/supervisors"
    const redirectIt = (pathTo:string) => {
        setService(pathTo);
    }
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
                        <b>SUPERVISOR</b>
                    </IonTitle>
                </IonToolbar>

                <IonRow>
                    <BackButton path={path} data={profileData.userData}></BackButton>
                </IonRow>

                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>DELETE</b>
                    </IonTitle>
                </IonToolbar>



            </IonHeader>

            <IonContent className='ion-padding' /*class = "content-style"*/>
                <IonGrid className='ion-text-center ion-margin'>



                    <IonCard class = "card-style">
                        <IonCardHeader>
                            <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" onClick={() => redirectIt("/supervisors/delete/deleteDoctor")} /*routerLink = "./updateDoctor"*/>DELETE DOCTOR</IonButton></IonCardTitle>
                        </IonCardHeader>
                    </IonCard>

                    <IonCard class = "card-style">
                        <IonCardHeader>
                            <IonCardTitle class = "ion-card-title-style"><IonButton fill = "clear" size = "large" class = "btn" onClick={() => redirectIt("/supervisors/delete/deleteFieldWorker")} /*routerLink = "./updateDoctor"*/>DELETE FIELD WORKER</IonButton></IonCardTitle>
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

export default Delete;
