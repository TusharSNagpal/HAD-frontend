import {
    IonContent,
    IonGrid,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonPage,
    IonSegment, IonList, IonItem, IonSelect, IonSelectOption, IonLabel, IonInput, IonCol, IonRow, IonCardHeader, IonCard, IonCardTitle, IonTabBar, IonTabButton, IonAlert
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
import React, { useRef, useState } from 'react';
import BackButton from "../../components/BackButton";
import AdminBackButton from "../../components/AdminBackButton";

const path = "/admin/globalRegister"
const GlobalRegisterHospital: React.FC = () => {

    const [showAlert, setShowAlert] = useState(false);
    const [showAlertErr, setShowAlertErr] = useState(false);

    const name = useRef<HTMLIonInputElement>(null)
    const address = useRef<HTMLIonInputElement>(null)

    const resetAll = () => {
        name.current!.value = null;
        address.current!.value = null;
    }

    const registerHospital = async() => {
        let data = {
            'name': name.current!.value,
            'address': address.current!.value
        }
        console.log(JSON.stringify(data))
        const addRecordEndpoint = `http://172.16.132.90:9090/api/hospitals/`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        await fetch(addRecordEndpoint, options)
            .then(function (response) {
                console.log(response);
                if (response['status'] === 201) {
                    console.log("DONE");
                } else {
                    console.log("ERROR");
                }
                return response.json();
            }).then(function (data) {
                console.log(data);
                const items = data;
                if (data.size !== 0) {
                setShowAlert(true);
                setShowAlertErr(false);
                resetAll();
                } else {
                    setShowAlert(false);
                    setShowAlertErr(true);
                }

                return items;
            })

    }

    return(
        <IonPage>
             <IonHeader>
                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>HEALTH CARE SERVICES</b>
                    </IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <IonTitle class="ion-text-center">
                    <b>ADMIN</b>
                    </IonTitle>
                </IonToolbar>
                 <IonRow>
                     <AdminBackButton path={path}/>
                 </IonRow>
                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>REGISTER HOPSITAL</b>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className='ion-padding'>
                <IonCard class = "card-style">
                    <IonGrid className='ion-text-center ion-margin' >
                        <IonRow className = "header-border">
                            <IonCol>
                                <IonCardTitle>Hospital Name:</IonCardTitle>
                                <IonCardTitle><IonInput ref={name} class="card-input"></IonInput></IonCardTitle>
                            </IonCol>
                        </IonRow>
                        <IonRow className = "header-border">
                            <IonCol>
                                <IonCardTitle>Hospital Address: </IonCardTitle>
                                <IonCardTitle><IonInput ref={address} class="card-input"></IonInput></IonCardTitle>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>
                <IonGrid className='ion-text-center ion-margin'>
                    <IonButton onClick = {registerHospital}>Submit</IonButton>
                </IonGrid>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    subHeader="Registration Successful..!"
                    buttons={['OK']}
                />

                <IonAlert
                    isOpen={showAlertErr}
                    onDidDismiss={() => setShowAlertErr(false)}
                    header="Alert"
                    subHeader="Registration Unsuccessful..!"
                    message="Please Go to Hospital Tab and Register Again!"
                    buttons={['OK']}
                />
            </IonContent>
        </IonPage>
    )
}
export default GlobalRegisterHospital;
