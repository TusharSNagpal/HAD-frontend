
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
    IonButton, IonAlert, IonGrid, IonRow
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
import React, {useRef, useState} from "react";
import {Redirect} from "react-router";
import BackButton from "../../components/BackButton";
import { API_PATIENT, API_VIS } from '../../api/Api';
import Cookie from 'universal-cookie'
import AlertLoggedOut from '../../components/AlertLoggedOut';

// setupIonicReact();

const NewCase:React.FC<any> = props=> {
    const cookie = new Cookie();
    const patientIdRef = useRef<HTMLIonInputElement>(null);
    const profile = props.location.state;
    const [profileData, setProfileData] = useState(profile);

    const [loginSuccess, setLoginSuccess] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertErr, setShowAlertErr] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [auth, setAuth] = useState(true);
    const [showAlertCase, setShowAlertCase] = useState(false);
    const [showAlertCaseErr, setShowAlertCaseErr] = useState(false);
    const path="/supervisors"

    const loginPatient = async() => {
        const response = await fetch(`${API_PATIENT}${patientIdRef.current!.value}`, {headers: {Authorization: 'Bearer '+cookie.get("jwt")}})
        const result = await response;
        console.log(response);
        if(result['status'] === 200){
            console.log("DONE");
            setLoginSuccess(true);
            setShowAlert(true);
            setShowAlertErr(false);
        } else if(response['status'] === 401) setAuth(false);
        else{
            console.log("ERROR");
            setLoginSuccess(false);
            setShowAlert(false);
            setShowAlertErr(true);
        }
    }

    const createCase = async() => {
        fetch(`${API_PATIENT}${patientIdRef.current!.value}`, {headers: {Authorization: 'Bearer '+cookie.get("jwt")}})
            .then(function (response) {
                console.log(response);
                if (response['status'] === 200) {
                    console.log("DONE");
                } else if(response['status'] === 401) setAuth(false)
                else {
                    console.log("ERROR");
                }
                return response.json();
            })
            .then(function (data) {
                    console.log(data);
                    const items = data;
                    console.log(items.success);
                    return items.hospital.hospitalId;
                }
            )
            .then(async function (hospitalId) {
                let data = {'hospital':{'hospitalId': hospitalId}, 'patient':{'patientId': patientIdRef.current!.value}};
                console.log(JSON.stringify(data));
                const addRecordEndpoint = `${API_VIS}`;
                const options = {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ cookie.get("jwt")
                    },
                    body: JSON.stringify(data)
                }

                const response = await fetch(addRecordEndpoint, options);
                const result = await response;
                console.log(response);
                if(result['status'] === 200){
                    console.log("DONE");
                    setShowAlertCase(true);
                    setShowAlertCaseErr(false);
                    setRedirect(true);
                }
                else if(response['status'] === 401) setAuth(false)
                else{
                    console.log("ERROR");
                    setShowAlertCaseErr(true);
                    setShowAlertCase(false);
                    setRedirect(false);
                }
            })
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
                        <b>NEW CASE</b>
                    </IonTitle>
                </IonToolbar>

            </IonHeader>

            <IonContent className='ion-padding'/*class = "content-style"*/>
                <IonGrid className='ion-text-center ion-margin'>
                    <IonCard class = "card-style">
                        <IonCardHeader>
                            <IonCardTitle>PATIENT ID: </IonCardTitle>
                            <IonCardTitle><IonInput ref = {patientIdRef} class = "card-input" type = "number" placeholder="1234"></IonInput></IonCardTitle>
                        </IonCardHeader>
                    </IonCard>

                    <IonButton onClick = {loginPatient}>Submit</IonButton>

                    <IonAlert
                        isOpen={showAlert}
                        onDidDismiss={() => setShowAlert(false)}
                        header="Alert"
                        subHeader="REGISTERED PATIENT ID FOUND..!"
                        message="PLEASE CLICK ON CREATE CASE BUTTON..!"
                        buttons={['OK']}
                    />

                    <IonAlert
                        isOpen={showAlertErr}
                        onDidDismiss={() => setShowAlertErr(false)}
                        header="Alert"
                        subHeader="No such ID FOUND..!"
                        message="Please try entering correct ID again!"
                        buttons={['OK']}
                    />

                    {!showAlert && loginSuccess?
                        <IonButton onClick = {createCase}>Create Case</IonButton>
                        :null}
                    
                    <IonAlert
                        isOpen={showAlertCase}
                        onDidDismiss={() => setShowAlertCase(false)}
                        header="Alert"
                        subHeader="CASE CREATED SUCCESSFULLY..!"
                        message="Please wait for your appointment with DOCTOR..!"
                        buttons={['OK']}
                    />

                    <IonAlert
                        isOpen={showAlertCaseErr}
                        onDidDismiss={() => setShowAlertCaseErr(false)}
                        header="Alert"
                        subHeader="!! CASE NOT CREATED..!"
                        message="There is some issue while creating CASE. Kindly contact developer..!"
                        buttons={['OK']}
                    />
                </IonGrid>
                {
                    !auth ? 
                    <AlertLoggedOut auth = {auth} setAuth = {setAuth}></AlertLoggedOut>
                    :null
                }
                {!showAlertCase && redirect ?
                    <Redirect to={{ pathname: '/supervisors', state: { userData: profileData?.userData } }} />
                :null}
                
            </IonContent>

        </IonPage>
    )
};

export default NewCase;