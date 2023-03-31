
import {
    IonPage,
    IonCard,
    IonCardHeader,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar, IonButton, IonGrid, IonSegment, IonCol, IonRow
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

/* Theme variables */
import '../../theme/variables.css';
import './Doctor.css';
import React, {useEffect, useState} from "react";

import {Redirect} from "react-router";
import BackButton from "../BackButton";

// setupIonicReact();

const DoctorHome: React.FC<any> = props => {

    const profile = props.location.state;
    const [profileData, setProfileData] = useState(profile);

    const [activeCases, setActiveCases] = useState<any[]>([]);
    const [activeFollowUps, setActiveFollowUps] = useState<any[]>([]);

    // const [redirect, setRedirect] = useState(false);

    const [useSt, setUseSt] = useState(false);
    const [redirectToPatient,setRedirectToPatient] = useState(false);
    const [redirectToFollowUp,setRedirectToFollowUp] = useState(false);

    const [currCase, setCurrCase] = useState(null);
    const [currFollowUp, setCurrFollowUp] = useState(null);

    const [newPatient,setNewPatient] = useState(false);
    const [oldFollowUps, setOldFollowUps] = useState(false);
    const path = "/"


    const deactivate = (cases:any) => {
        setCurrCase(cases);
        fetch(`http://localhost:9090/api/visits/${cases.visitId}`, {method : 'PUT'})
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                handle();
            })

        setRedirectToPatient(true);

    }

    const handle = () => {
        console.log('Database updated..!');
        

        if (useSt){
            setUseSt(false);
        }
            
        else
            setUseSt(true);
    }

    const pickFollowUp = (followUp:any)=>{
        console.log("picked followup")
        setCurrFollowUp(followUp)
        setRedirectToFollowUp(true)

        fetch(`http://localhost:9090/api/followUps/doctor/end/${followUp.followUpId}`, {method : 'PUT'})
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                handle();
            })

    }

    const handleNewPatientList=()=>{

        setNewPatient(true);
        setOldFollowUps(false);
    }
    const handleOldFollowUpList=()=>{
        setOldFollowUps(true);
        setNewPatient(false);
    }

    useEffect(() => {
        fetch(`http://localhost:9090/api/visits/activeVisits/hospital/${profileData.userData.hospital.hospitalId}`)
            .then((response) => response.json())
            .then((json) => {
                // setUseSt(true);
                setActiveCases(json);
                console.log(json);
                // setUseSt(1);
                console.log(activeCases);
                return json;
            })
    }, []);

    useEffect(() => {
         fetch(`http://localhost:9090/api/visits/activeVisits/hospital/${profileData.userData.hospital.hospitalId}`)
            .then((response) => response.json())
            .then((json) => {
                // setUseSt(true);
                setActiveCases(json);
                // console.log(json);
                // console.log(json.length);
                // setUseSt(1);
                // console.log(activeCases);
                return json;
            })
    },[useSt]);

    useEffect(() => {
        fetch(`http://localhost:9090/api/followUps/doctor/review/${profileData.userData.docInHospId}`)
            .then((response) => response.json())
            .then((json) => {
                // setUseSt(true);
                setActiveFollowUps(json);
                // console.log(json);
                // console.log(json.length);
                // setUseSt(1);
                // console.log(activeCases);
                return json;
            })
    },[]);

    useEffect(() => {
        fetch(`http://localhost:9090/api/followUps/doctor/review/${profileData.userData.docInHospId}`)
            .then((response) => response.json())
            .then((json) => {
                // setUseSt(true);
                setActiveFollowUps(json);
                // console.log(json);
                // console.log(json.length);
                // setUseSt(1);
                // console.log(activeCases);
                return json;
            })
    },[useSt]);

    // if(redirect) {
    //     // setRedirect(false);
    //     return (
    //         <Redirect to={{pathname: '/patient', state: {case: {currCase}}}}/>
    //     );
    // }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>HEALTHCARE SERVICES</b>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonHeader>
                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>DOCTOR</b>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonRow>
                <BackButton path={path} data={profileData.userData}></BackButton>
            </IonRow>
                    {/*<IonGrid>*/}
            <IonContent className='ion-padding'/*class = "content-style"*/>

            <IonRow>
                        <IonCol>
                            <IonButton expand = "full" color="dark" onClick={handleNewPatientList}>New Patient</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton expand = "full" color="dark" onClick={handleOldFollowUpList}>Old followups</IonButton>
                        </IonCol>
                    </IonRow>
                    {/*</IonGrid>*/}

            {newPatient &&
                // <IonHeader>
                    <IonToolbar>
                        <IonTitle class="ion-text-center">
                            <b>ASSIGNED CASES</b>
                        </IonTitle>
                    </IonToolbar>
                // </IonHeader>
            }
            {
                oldFollowUps &&
                // <IonHeader>
                    <IonToolbar>
                        <IonTitle class="ion-text-center">
                            <b>REVIEW OLD FOLLOWUPS</b>
                        </IonTitle>
                    </IonToolbar>
                // </IonHeader>
            }

            {newPatient &&
                <IonContent className='ion-padding'/*class = "content-style"*/>
                    <IonGrid className='ion-text-center ion-margin'>
                        <IonButton onClick={handle}>REFRESH</IonButton>
                        {activeCases.map(cases =>
                            <IonCard class="card-style">
                                <IonCardHeader>
                                    <IonSegment value={cases.visitId} key={cases.visitId}>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol><h5>Patient ID: {cases.patient.patientId}</h5></IonCol>
                                                <IonCol><h5>Patient Name: {cases.patient.fname}</h5></IonCol>
                                                <IonCol>
                                                    <IonButton onClick={() => deactivate(cases)}>PICK</IonButton>

                                                    { redirectToPatient ? <Redirect
                                                        to={{pathname: '/doctorInHospital/patient', state: {currCase,userData:profile.userData}}}/> : null}
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </IonSegment>
                                </IonCardHeader>
                            </IonCard>
                        )}
                    </IonGrid>
                </IonContent>
            }

            {oldFollowUps &&
                <IonContent className='ion-padding'/*class = "content-style"*/>
                    <IonGrid className='ion-text-center ion-margin'>
                        <IonButton onClick={handle}>REFRESH</IonButton>
                        {activeFollowUps.map(followUp =>
                            <IonCard class="card-style">
                                <IonCardHeader>
                                    <IonSegment value={followUp.visit.visitId} key={followUp.visit.visitId}>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol><h5>Patient ID: {followUp.visit.patient.patientId}</h5></IonCol>
                                                <IonCol><h5>Patient Name: {followUp.visit.patient.fname}</h5></IonCol>
                                                <IonCol>
                                                    <IonButton onClick={()=>pickFollowUp(followUp)}>PICK</IonButton>

                                                    {redirectToFollowUp ? <Redirect
                                                        to={{pathname: '/doctorInHospital/oldFollowUp', state: {currFollowUp,userData:profile.userData}}}/> : null}
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </IonSegment>
                                </IonCardHeader>
                            </IonCard>
                        )}
                    </IonGrid>
                </IonContent>
            }

            </IonContent>

        </IonPage>
        
    )
};

export default DoctorHome;