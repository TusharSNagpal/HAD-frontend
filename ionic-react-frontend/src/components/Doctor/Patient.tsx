
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
    IonRow,
    IonCol,
    IonCardContent,
    IonInput,
    IonLabel,
    IonItem,
    IonTextarea,
    IonButton,
    IonAlert, IonDatetime, IonSegment
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
import {useEffect, useState, useRef} from "react";

// import Date from "../items/Date";

/* Theme variables */
import '../../theme/variables.css';
import './Doctor.css';
import {Redirect} from "react-router";
import DoctorHome from "./DoctorHome";
import {Route} from "react-router-dom";




// setupIonicReact();
const Patient: React.FC<any> = props => {
    const v = props.location.state;
    const [visitDetails, setVisitDetails] = useState(v);
    const [showAlert, setShowAlert] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [showFollowUpOption, setShowFollowUpOption] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string>();
    const [alertHeader, setAlertHeader] = useState<string>()
    const [prescription, setPrescription] = useState<string>();
    const [symptoms, setSymptoms] = useState<string>();
    const [tasksAssigned, setTasksAssigned] = useState<string>();
    const followUpDate = useRef<HTMLIonDatetimeElement>(null);


    //  useEffect(() => {
    //
    //      // setPatientDetails(props.location.state.case.patient)
    // },[]);

    const submitDetails = async()=>{

        if(symptoms==null || prescription==null){
            setShowAlert(true);
            setAlertHeader("Unsuccessful");
            setAlertMessage("Please fill the symptoms and prescription");
            return;
        }

        visitDetails.currCase.symptoms = symptoms;
        visitDetails.currCase.prescription = prescription;
        // console.log(JSON.stringify(visitDetails.currCase));
        const addRecordEndpoint = `http://localhost:9090/api/visits/visited/${visitDetails.currCase.visitId}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(visitDetails.currCase)
        }

        await fetch(addRecordEndpoint, options)
            .then(function (response) {
                console.log(response);
                if (response['status'] === 200) {
                    console.log("DONE");
                } else {
                    console.log("ERROR");
                }
                return response.json();
            })
            .then(function (data) {
                const items = data;
                console.log(items);
                if (data.size != 0) {

                    setShowAlert(true);
                    setAlertHeader("Details submitted successfully")
                    setAlertMessage("Add followups if required")
                    setShowFollowUpOption(true)
                    // setRedirect(true);
                    // resetAll();
                } else {
                    setShowAlert(true);
                    setAlertHeader("Alert");
                    setAlertMessage("Unsuccessful");
                }

                return items;
            })
    }

    const handleSubmitFollowUps = async()=>{
        if(tasksAssigned==null || followUpDate.current!.value==null){
            setShowAlert(true);
            setAlertHeader("Unsuccessful");
            setAlertMessage("Please assign some task and follow-up date");
            return;
        }
        // var charCount = tasksAssigned.length + tasksAssigned.match(/\n/gm).length;
        let temp;
        if(tasksAssigned!=null)
            temp = tasksAssigned.replace(/\n/g, "$");
        var changeDateFormat = followUpDate.current!.value;
        console.log(changeDateFormat);
        if(changeDateFormat!=null && typeof(changeDateFormat)=='string')
            changeDateFormat = changeDateFormat.split('T')[0];
        console.log(changeDateFormat);

        console.log(temp);
        let newFollowUp = {
            'followUpDate':changeDateFormat,
            'taskAssignedByDoctor':temp,
            'visit':{'visitId':visitDetails.currCase.visitId},
            'isActive':1,
            'fieldWorkerInHospital':{'fwInHospId':-1},
            'reviewByFieldWorker':""
        };
        console.log(newFollowUp)
        console.log(JSON.stringify(newFollowUp));
        const addRecordEndpoint = `http://localhost:9090/api/followUps/`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFollowUp)
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

                setRedirect(true);

                return items;
            })


    }


    const handleYes = ()=>{
        setShowFollowUpOption(true);
    }

    const handleNo = ()=>{
        setRedirect(true)
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
                        <b>DOCTOR</b>
                    </IonTitle>
                </IonToolbar>

                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>PATIENT DETAILS AND PRESCRIPTION</b>
                    </IonTitle>
                </IonToolbar>

            </IonHeader>

            <IonContent className='ion-padding'>
                <IonCard class = "card-style">
                    <IonGrid className='ion-text-center ion-margin'>
                        <IonRow>
                            <IonCol>
                                <h2>Name : {visitDetails.currCase.patient.fname} {visitDetails.currCase.patient.lname}</h2>
                                <h2>Gender : {visitDetails.currCase.patient.gender}</h2>
                                <h2>Age : {visitDetails.currCase.patient.age}</h2>
                            </IonCol>

                        </IonRow>

                        <IonRow>
                            <IonCol>
                                <IonCard>
                                    <IonItem>
                                        <IonLabel position="floating">SYMPTOMS</IonLabel>
                                        <IonTextarea value={symptoms} onIonChange={(e) => setSymptoms(e.detail.value!)}></IonTextarea>
                                    </IonItem>
                                </IonCard>
                            </IonCol>

                            <IonCol>
                                <IonCard>
                                    <IonItem>
                                        <IonLabel position="floating">PRESCRIPTION</IonLabel>
                                        <IonTextarea value={prescription} onIonChange={(e) => setPrescription(e.detail.value!)}></IonTextarea>
                                    </IonItem>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        {
                            !showFollowUpOption &&
                            <IonRow>
                                <IonCol>
                                    <IonButton onClick={submitDetails}>SUBMIT</IonButton>
                                </IonCol>
                            </IonRow>
                        }


                        { showFollowUpOption &&
                            <IonCol>
                                <IonRow>
                                    <IonCol>
                                        <h3>Do you want to add followups for this patient?</h3>
                                    </IonCol>
                                </IonRow>


                                <IonRow>
                                    <IonCol>
                                        <IonButton onClick={handleYes}>Yes</IonButton>
                                        <IonButton onClick={handleNo}>No</IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        }
                        {showFollowUpOption &&
                            <IonCol>
                                <IonRow>
                                    <IonCol>
                                        <IonCard>
                                            <IonItem>
                                                <IonLabel class="ion-text-center" position="floating">ADD FOLLOW UP INSTRUCTIONS FOR THE FIELD WORKER</IonLabel>
                                                <IonTextarea value={tasksAssigned} onIonChange={(e) => setTasksAssigned(e.detail.value!)}></IonTextarea>
                                            </IonItem>
                                        </IonCard>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonCardTitle>Follow-up Date: </IonCardTitle>
                                    </IonCol>
                                    {/*</IonRow>*/}
                                    {/*<IonRow>*/}
                                    <IonCol>
                                        <IonCardTitle class="ion-card-subtitle-style">
                                            <IonDatetime ref={followUpDate} display-format="MM/DD/YYYY" picker-format="MM DD YYYY"></IonDatetime>
                                        </IonCardTitle>
                                    </IonCol>
                                </IonRow>

                                <IonRow>
                                    <IonCol>
                                        <IonButton onClick={handleSubmitFollowUps}>SUBMIT</IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        }

                    </IonGrid>
                </IonCard>
            </IonContent>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header= {alertHeader}
                message={alertMessage}
                buttons={['OK']}
            />

            {!showAlert && redirect?<Redirect to='/doctors'/>
                :null}
        </IonPage>


    )
};

export default Patient;