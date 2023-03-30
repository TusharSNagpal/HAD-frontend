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

const RegisterDoctor: React.FC<any> = props => {
     const supId = props.location.state;
     const docId= useRef<HTMLIonInputElement>(null);
     const hospId= useRef<HTMLIonInputElement>(null);
     const [supervisorId, setSupervisorId] = useState(supId);
     //onst [doctorId,setDoctorId] = useState(docId);
     const [showAlert, setShowAlert] = useState(false);
     const [showAlertErr, setShowAlertErr] = useState(false);
     const [redirect, setRedirect] = useState(false);
     const [displayDoctorId, setDisplayDoctorId] = useState(0);
     // const [hospitalId, setHospitalId] = useState(0);
     const [showAlertNoSuchId, setShowAlertNoSuchId] = useState(false);


     //const docId= useRef<HTMLIonInputElement>(null);


    const resetAll = () => {
        docId.current!.value = null;
                           }

    const registerDoctor = async() => {
        // fetch(`http://localhost:9090/api/supervisors/${supervisorId.userId}`)
        //     .then(function(response){
        //         console.log(response);
        //         if(response['status'] === 200){
        //             console.log("DONE");
        //         }
        //         else{
        //             console.log("ERROR");
        //         }
        //         return response.json();
        //     })
        //     .then(function(data){
        //             console.log(data);
        //             const items  = data;
        //             console.log(items.success);
        //             if(items.success === false) {
        //                 return -1;
        //             }
        //             setShowAlertNoSuchId(false);
        //             return items.hospital.hospitalId;
        //         }
        //     )
        //     .then( async function (hospitalId){
        //             if(hospitalId === -1){
        //                 setShowAlertNoSuchId(true);
        //             }
        //             else {
        //                 setShowAlertNoSuchId(false);
        //
        //                 console.log(hospitalId);

                        let data = {
                            'hospital': {'hospitalId': hospId.current!.value},
                            'doctor': {'doctorId': docId.current!.value}

                        };
                        // console.log(data);
                        console.log(JSON.stringify(data));



                        const addRecordEndpoint = `http://localhost:9090/api/doctorInHospital/docInHosp/${docId.current!.value}/hospital/${hospId.current!.value}`;
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
                                    setDisplayDoctorId(items.docInHospId);
                                    console.log(displayDoctorId);
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
                        <b>DOCTOR REGISTRATION</b>
                    </IonTitle>
                </IonToolbar>

            </IonHeader>

            <IonContent className='ion-padding'/*class = "content-style"*/>
                <IonCard class = "card-style">
                    <IonGrid className='ion-text-center ion-margin' >


                        <IonRow className = "header-border">

                            <IonCol>
                                <IonCardTitle>Doctor Id: </IonCardTitle>
                                <IonCardTitle><IonInput ref={docId} class="card-input" placeholder="Id"></IonInput></IonCardTitle>
                            </IonCol>
                            <IonCol>
                                <IonCardTitle>Hospital Id: </IonCardTitle>
                                <IonCardTitle><IonInput ref={hospId} class="card-input" placeholder="Id"></IonInput></IonCardTitle>
                            </IonCol>

                        </IonRow>
                    </IonGrid>
                </IonCard>

                <IonGrid className='ion-text-center ion-margin'>
                    <IonButton onClick = {registerDoctor}>Submit</IonButton>
                </IonGrid>

                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header= {`DOCTOR ID: ${displayDoctorId}`}
                    subHeader="Registration Successful..!"
                    message="Please go to Doctor Login Tab to Login..!"
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

                {!showAlert && redirect?<Redirect to='/supervisors' />
                    :null}

            </IonContent>

        </IonPage>    )
};

export default RegisterDoctor; 
