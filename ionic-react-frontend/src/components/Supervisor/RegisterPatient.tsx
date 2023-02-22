
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

    const [displayPatientId, setDisplayPatientId] = useState(0);

    // const [hospitalId, setHospitalId] = useState(0);
    const [showAlertNoSuchId, setShowAlertNoSuchId] = useState(false);

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

    // const getHospitalId = async() => {
    //
    // }

    const registerPatient = async() => {
        fetch(`http://localhost:9090/api/supervisors/${supervisorId.current!.value}`)
            .then(function(response){
                console.log(response);
                if(response['status'] === 200){
                    console.log("DONE");
                }
                else{
                    console.log("ERROR");
                }
                return response.json();
            })
            .then(function(data){
                    console.log(data);
                    const items  = data;
                    console.log(items.success);
                    if(items.success === false) {
                       return -1;
                    }
                    setShowAlertNoSuchId(false);
                    return items.hospitalId.hospitalId;
                }
            )
            .then( async function (hospitalId){
                if(hospitalId === -1){
                    setShowAlertNoSuchId(true);
                }
                else {
                    setShowAlertNoSuchId(false);

                    console.log(hospitalId);

                    let data = {
                        'hospital': {'hospitalId': hospitalId},
                        'supervisor': {'supervisorId': supervisorId.current!.value},
                        'fname': fname.current!.value,
                        'lname': lname.current!.value,
                        'gender': gender.current!.value,
                        'address': address.current!.value,
                        'phoneNo': phoneNo.current!.value,
                        'dob': dob.current!.value
                    };
                    console.log(JSON.stringify(data));
                    const addRecordEndpoint = "http://localhost:9090/api/patients/";
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
                        })
                        .then(function (data) {
                            console.log(data);
                            const items = data;
                            if (data.size != 0) {
                                setDisplayPatientId(items.patientId);
                                // console.log(displayPatientId);
                                setShowAlert(true);
                                setShowAlertErr(false);
                                setRedirect(true);
                                resetAll();
                            } else {
                                setShowAlert(false);
                                setShowAlertErr(true);
                                setRedirect(false);
                            }

                            return items;
                        })
                }
                }
    )
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

                <IonAlert
                    isOpen={showAlertNoSuchId}
                    onDidDismiss={() => setShowAlertNoSuchId(false)}
                    header= "No such supervisor ID found please try again..!"
                    subHeader="ID NOT FOUND..!"
                    message="!!UNSUCCESSFUL..!"
                    buttons={['OK']}
                />

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
                    header= {`PATIENT ID: ${displayPatientId}`}
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

                {!showAlert && redirect?<Redirect to='/supervisorHome' />
                    :null}

            </IonContent>

        </IonPage>
    )
};

export default RegisterPatient;
