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
    IonRow, IonCol, IonInput, IonDatetime, IonButton, IonAlert
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
import {useRef, useState} from "react";
import {Redirect} from "react-router";

// setupIonicReact();

const RegisterFieldWorker: React.FC<any> = props => {
   // const supId = props.location.state;
    const fwId= useRef<HTMLIonInputElement>(null);
    const hospId= useRef<HTMLIonInputElement>(null);

    const [showAlert, setShowAlert] = useState(false);
    const [showAlertErr, setShowAlertErr] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [displayFieldWorkerId, setDisplayFieldWorkerId] = useState(0);






    const resetAll = () => {
        fwId.current!.value = null;
        hospId.current!.value=null;
    }

    const registerFieldWorker = async() => {

        let data = {
            'hospital': {'hospitalId': hospId.current!.value},
            'fieldWorker': {'fieldWorkerId': fwId.current!.value}

        };
        // console.log(data);
        console.log(JSON.stringify(data));



        const addRecordEndpoint = `http://localhost:9090/api/fieldWorkerInHospital/fwInHosp/${fwId.current!.value}/hospital/${hospId.current!.value}`;
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
                if (data.size !== 0) {
                    setDisplayFieldWorkerId(items.fwInHosp);
                    console.log(displayFieldWorkerId);
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
                        <b>FIELDWORKER REGISTRATION</b>
                    </IonTitle>
                </IonToolbar>

            </IonHeader>

            <IonContent className='ion-padding'/*class = "content-style"*/>
                <IonCard class = "card-style">
                    <IonGrid className='ion-text-center ion-margin' >


                        <IonRow className = "header-border">

                            <IonCol>
                                <IonCardTitle>FieldWorker Id: </IonCardTitle>
                                <IonCardTitle><IonInput ref={fwId} class="card-input" placeholder="Id"></IonInput></IonCardTitle>
                            </IonCol>
                            <IonCol>
                                <IonCardTitle>Hospital Id: </IonCardTitle>
                                <IonCardTitle><IonInput ref={hospId} class="card-input" placeholder="Id"></IonInput></IonCardTitle>
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
                    header= {`FIELDWORKER ID: ${displayFieldWorkerId}`}
                    subHeader="Registration Successful..!"
                    message="Please go to FieldWorker Login Tab to Login..!"
                    buttons={['OK']}
                />

                <IonAlert
                    isOpen={showAlertErr}
                    onDidDismiss={() => setShowAlertErr(false)}
                    header="Alert"
                    subHeader="Registration Unsuccessful..!"
                    message="Please Go to FieldWorker Registration Tab and Register Again!"
                    buttons={['OK']}
                />

                {!showAlert && redirect?<Redirect to='/supervisors' />
                    :null}

            </IonContent>

        </IonPage>    )
};

export default RegisterFieldWorker;