
import {
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonInput,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCardSubtitle,
    IonDatetime,
    IonButton, IonAlert
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

// import Alert from "../../items/Alert";
// import { useNavigate } from 'react-router-dom';

/* Theme variables */
import '../../theme/variables.css';
import {useRef, useState} from "react";
import { Redirect } from 'react-router';

// setupIonicReact();

const RegisterPatient: React.FC = () => {

    // const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false);
    const [showAlertErr, setShowAlertErr] = useState(false);

    const [redirect, setRedirect] = useState(false);

    const supervisorId = useRef<HTMLIonInputElement>(null);
    const fname = useRef<HTMLIonInputElement>(null);
    const lname = useRef<HTMLIonInputElement>(null);
    const gender = useRef<HTMLIonInputElement>(null);
    const dob = useRef<HTMLIonDatetimeElement>(null);
    const address = useRef<HTMLIonInputElement>(null);
    const phoneNo = useRef<HTMLIonInputElement>(null);

    const resetAll = () => {
        supervisorId.current!.value = null;
        dob.current!.reset();
        fname.current!.value = null;
        lname.current!.value = null;
        gender.current!.value = null;
        address.current!.value = null;
        phoneNo.current!.value = null;
    }

    const registerPatient = async() => {
        let data = {'hospital':{'hospitalId': 1}, 'supervisor':{'supervisorId': supervisorId.current!.value}, 'fname' : fname.current!.value, 'lname' : lname.current!.value, 'gender' : gender.current!.value, 'address': address.current!.value, 'phoneNo': phoneNo.current!.value, 'dob': dob.current!.value};
        console.log(JSON.stringify(data));
        const addRecordEndpoint = "http://localhost:9090/api/patients/";
        const options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(addRecordEndpoint, options);
        const result = await response;
        console.log(response);
        if(result['status'] === 200){
            console.log("DONE");
            setShowAlert(true);
            setShowAlertErr(false);
            setRedirect(true);
            resetAll();

        }

        else{
            console.log("ERROR");
            setShowAlert(false);
            setShowAlertErr(true);
            setRedirect(false);
        }
    }

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
                        <b>PATIENT REGISTRATION</b>
                    </IonTitle>
                </IonToolbar>

            </IonHeader>

            <IonContent class = "content-style">

                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle>Supervisor ID: </IonCardTitle>
                        <IonCardSubtitle><IonInput ref = {supervisorId} class = "card-input" type="number" placeholder="1234"></IonInput></IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>

                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle>First Name: </IonCardTitle>
                        <IonCardSubtitle><IonInput ref = {fname} class = "card-input" placeholder="Narendra"></IonInput></IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>

                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle>Last Name: </IonCardTitle>
                        <IonCardSubtitle><IonInput ref = {lname} class = "card-input" placeholder="Modi"></IonInput></IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>

                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle>Gender: </IonCardTitle>
                        <IonCardSubtitle><IonInput ref = {gender} class = "card-input" placeholder="M"></IonInput></IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>

                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle>Date of Birth: </IonCardTitle>
                        <IonCardSubtitle class = "ion-card-subtitle-style"><IonDatetime ref = {dob} display-format="MM/DD/YYYY" picker-format="MM DD YYYY"></IonDatetime></IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>

                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle>Address: </IonCardTitle>
                        <IonCardSubtitle><IonInput ref = {address} class = "card-input" placeholder="IIITB- Electronic City Phase 1"></IonInput></IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>

                <IonCard class = "card-style">
                    <IonCardHeader>
                        <IonCardTitle>Phone Number: </IonCardTitle>
                        <IonCardSubtitle><IonInput ref = {phoneNo} class = "card-input" type="tel" placeholder="888-888-8888"></IonInput></IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>

                <IonButton onClick = {registerPatient}>Submit</IonButton>

                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header="Alert"
                    subHeader="Registration Successful..!"
                    message="Please go to Patient Login Tab to Login..!"
                    buttons={['OK']}
                />

                <IonAlert
                    isOpen={showAlertErr}
                    onDidDismiss={() => setShowAlertErr(false)}
                    header="Alert"
                    subHeader="Registration Unsuccessful..!"
                    message="Please Go to Patient Registration Tab and Register Again!"
                    buttons={['OK']}
                />

                {!showAlert && redirect?<Redirect to='/' />
                    :null}


            </IonContent>

        </IonPage>
    )
};

export default RegisterPatient;
