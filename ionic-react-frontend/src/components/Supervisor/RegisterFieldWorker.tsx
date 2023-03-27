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
    const supId = props.location.state;
    const [supervisorId, setSupervisorId] = useState(supId);

    // const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false);
    const [showAlertErr, setShowAlertErr] = useState(false);

    const [redirect, setRedirect] = useState(false);

    const [displayFieldWorkerId, setDisplayFieldWorkerId] = useState(0);

    const [hospitalId, setHospitalId] = useState(0);
    const [showAlertNoSuchId, setShowAlertNoSuchId] = useState(false);

    // const supervisorId = useRef<HTMLIonInputElement>(null);
    const fname= useRef<HTMLIonInputElement>(null);
    const lname = useRef<HTMLIonInputElement>(null);
    const gender = useRef<HTMLIonInputElement>(null);
    const dob = useRef<HTMLIonDatetimeElement>(null);
    const address = useRef<HTMLIonInputElement>(null);
    const phoneNo = useRef<HTMLIonInputElement>(null);

    const resetAll = () => {
        // supervisorId.current!.value = null;
        dob.current!.reset();
        fname.current!.value = null;
        lname.current!.value = null;
        gender.current!.value = null;
        address.current!.value = null;
        phoneNo.current!.value = null;
    }

    const registerFieldWorker = async() => {
        fetch(`http://localhost:9090/api/supervisors/${supervisorId.userId}`)
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
                    return items.hospital.hospitalId;
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

                            'fname': fname.current!.value,
                            'lname': lname.current!.value,
                            'gender': gender.current!.value,
                            'address': address.current!.value,
                            'phoneNo': phoneNo.current!.value,
                            'dob': dob.current!.value
                        };
                        console.log(JSON.stringify(data));
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
                            })
                            .then(function (data) {
                                console.log(data);
                                const items = data;
                                if (data.size !== 0) {
                                    setDisplayFieldWorkerId(items.fwId);
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
                        <b>FIELDWORKER REGISTRATION</b>
                    </IonTitle>
                </IonToolbar>

            </IonHeader>

            <IonContent className='ion-padding'/*class = "content-style"*/>
                <IonCard class = "card-style">
                    <IonGrid className='ion-text-center ion-margin' >
                        {/* <IonRow className = "header-border">
                            <IonCol>
                                <IonCardTitle>Supervisor ID: </IonCardTitle>
                                <IonCardTitle ><IonInput ref = {supervisorId} class = "card-input" type="number" placeholder="1234"></IonInput></IonCardTitle>
                            </IonCol>
                        </IonRow>
                        <IonAlert
                            isOpen={showAlertNoSuchId}
                            onDidDismiss={() => setShowAlertNoSuchId(false)}
                            header= "No such supervisor ID found please try again..!"
                            subHeader="ID NOT FOUND..!"
                            message="!!UNSUCCESSFUL..!"
                            buttons={['OK']}
                            /> */}

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
