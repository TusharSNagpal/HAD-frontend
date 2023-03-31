import {
    IonContent,
    IonGrid,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonPage,
    IonSegment, IonList, IonItem, IonSelect, IonSelectOption, IonLabel, IonInput, IonCol, IonRow, IonCardHeader, IonCard, IonCardTitle, IonTabBar, IonTabButton, IonAlert, IonDatetime
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
import BackButton from "../BackButton";
import AdminBackButton from "./AdminBackButton";

const path="/admin/globalRegister"
const GlobalRegisterFieldWorker: React.FC = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertErr, setShowAlertErr] = useState(false);

    const fname = useRef<HTMLIonInputElement>(null)
    const lname = useRef<HTMLIonInputElement>(null)
    const gender = useRef<HTMLIonInputElement>(null)
    const dob = useRef<HTMLIonDatetimeElement>(null)
    const phoneNo = useRef<HTMLIonInputElement>(null)
    const address = useRef<HTMLIonInputElement>(null)

    const resetAll = () => {
        fname.current!.value = null;
        lname.current!.value = null;
        gender.current!.value = null;
        dob.current!.reset();
        phoneNo.current!.value = null;
        address.current!.value = null;
    }

    const registerFieldWorker = async () => {
        let data = {
            'fname': fname.current!.value,
            'lname': lname.current!.value,
            'gender': gender.current!.value,
            'dob': dob.current!.value,
            'phoneNo': phoneNo.current!.value,
            'address': address.current!.value
        }
        console.log(JSON.stringify(data))
        const addRecordEndpoint = "http://localhost:9090/api/fieldworkers/";
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
                        <b>REGISTER FIELDWORKER</b>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'/*class = "content-style"*/>
                <IonCard class = "card-style">
                    <IonGrid className='ion-text-center ion-margin' >
                    <IonRow className = "header-border">
                        <IonCol>
                            <IonCardTitle>First Name: </IonCardTitle>
                            <IonCardTitle><IonInput ref={fname} class="card-input" placeholder="Binod"></IonInput></IonCardTitle>
                        </IonCol>
                        <IonCol>
                            <IonCardTitle>Last Name: </IonCardTitle>
                            <IonCardTitle><IonInput ref={lname} class="card-input" placeholder="Modi"></IonInput></IonCardTitle>
                        </IonCol>
                        <IonCol>
                            <IonCardTitle>Gender: </IonCardTitle>
                            <IonCardTitle><IonInput ref={gender} class="card-input" placeholder="M"></IonInput></IonCardTitle>
                        </IonCol>

                        </IonRow>

                        <IonRow className = "header-border">
                        <IonCol><IonCardTitle>Date of Birth: </IonCardTitle></IonCol>
                        <IonCol><IonCardTitle class="ion-card-subtitle-style"><IonDatetime ref={dob} display-format="MM/DD/YYYY" picker-format="MM DD YYYY"></IonDatetime></IonCardTitle></IonCol>
                        </IonRow>

                        <IonRow className = "header-border">
                        <IonCol>
                            <IonCardTitle>Address: </IonCardTitle>
                            <IonCardTitle><IonInput ref={address} class="card-input" placeholder="IIITB- Electronic City Phase 1"></IonInput></IonCardTitle>
                        </IonCol>
                        <IonCol>
                            <IonCardTitle>Phone Number: </IonCardTitle>
                            <IonCardTitle><IonInput ref={phoneNo} class="card-input" type="tel" placeholder="888-888-8888"></IonInput></IonCardTitle>

                        </IonCol>
                        </IonRow>
                        </IonGrid>
                        </IonCard>

                        <IonGrid className='ion-text-center ion-margin'>
                        <IonButton onClick = {registerFieldWorker}>Submit</IonButton>
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
                        message="Please Go to Doctor Registration Tab and Register Again!"
                        buttons={['OK']}
                        />
                </IonContent>          
        </IonPage>
    )
}
export default GlobalRegisterFieldWorker;
