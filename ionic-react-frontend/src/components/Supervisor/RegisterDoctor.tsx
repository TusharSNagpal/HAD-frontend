
import { IonPage, IonGrid, IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/react';

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
                        <b>HEALTHCARE SERVICES</b>
                    </IonTitle>
                </IonToolbar>

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
            
            <IonContent className='ion-padding' /*class = "content-style"*/>
                <IonGrid className='ion-text-center ion-margin'>
                    <IonCard class = "card-style">
                        <IonCardHeader>
                            <IonCardTitle>THIS PAGE IS UNDER DEVELOPMENT..! </IonCardTitle>
                        </IonCardHeader>
                    </IonCard>
                </IonGrid>
            </IonContent>

        </IonPage>
    )
};

export default RegisterDoctor; 
