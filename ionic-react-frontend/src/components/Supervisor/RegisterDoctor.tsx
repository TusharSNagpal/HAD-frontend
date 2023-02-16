
import { IonPage, IonCard, IonCardHeader, IonCardTitle, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, IonCardSubtitle, IonDatetime} from '@ionic/react';

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

// setupIonicReact();

const RegisterDoctor: React.FC = () => {
    return(
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonTitle class="ion-text-center">
                <b>SUPERVISOR</b>
                </IonTitle>
            </IonToolbar>

            <IonToolbar>
                <IonTitle class="ion-text-center">
                <b>DOCTOR REGISTRATION</b>
                </IonTitle>
            </IonToolbar>

            </IonHeader>
            
            <IonContent class = "content-style">
                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle>First Name: </IonCardTitle>
                        <IonCardSubtitle><IonInput class = "card-input" placeholder="Narendra"></IonInput></IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>

                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle>Last Name: </IonCardTitle>
                        <IonCardSubtitle><IonInput class = "card-input" placeholder="Modi"></IonInput></IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>

                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle>Gender: </IonCardTitle>
                        <IonCardSubtitle><IonInput class = "card-input" placeholder="M"></IonInput></IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>

                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle>Date of Birth: </IonCardTitle>
                        <IonCardSubtitle class = "ion-card-subtitle-style"><IonDatetime display-format="MM/DD/YYYY" picker-format="MM DD YYYY" text-center></IonDatetime></IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>

                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle>Address: </IonCardTitle>
                        <IonCardSubtitle><IonInput class = "card-input" placeholder="IIITB- Electronic City Phase 1"></IonInput></IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>

                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle>Phone Number: </IonCardTitle>
                        <IonCardSubtitle><IonInput class = "card-input" type="tel" placeholder="888-888-8888"></IonInput></IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>
            </IonContent>

        </IonPage>
    )
};

export default RegisterDoctor; 
