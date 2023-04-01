
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
    IonButton, IonSegment, IonRow, IonCol, IonCheckbox, IonLabel, IonAlert
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
import {Redirect} from "react-router";
import React, {useEffect, useState} from "react";
import BackButton from "../../components/BackButton";

// setupIonicReact();

const AssignTasks: React.FC<any> = props => {

    const [followUps, setFollowUps] = useState<any[]>([]);
    const [picked, setPicked] = useState<boolean[]>([false]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertHeader,setAlertHeader] = useState<string>();
    const [alertMessage,setAlertMessage] = useState<string>();
    const [redirect, setRedirect] = useState<boolean>(false);

    const f = props.location.state;
    console.log(f)
    const [profileData, setProfileData] = useState(f.userData);
    const [fieldWorkerDetails,setFieldWorkerDetails] = useState(f.currFieldWorker)
    console.log(profileData)
    const [tasksAssigned, setTasksAssigned] = useState(fieldWorkerDetails.numOfTasksPerDay)
    const path = "/supervisors/fieldWorkersInHospital"
    // console.log(fieldWorkerDetails.currFieldWorker);
    // let count=0;
    const handleSelectFollowUp=(index:any)=>{
        // console.log(index);
        if(picked[index]===true){
            setTasksAssigned(tasksAssigned-1)
            picked[index]=false;
            // count--;
        }

        else{
            setTasksAssigned(tasksAssigned+1)
            picked[index]=true;
            // count++;
        }

    }

    const handleSubmit=async ()=>{
        if(tasksAssigned>5){
            console.log("NOT ALLOWED")
            setAlertHeader("Too many tasks.");
            setAlertMessage("Do not assign more than 5 tasks to a field worker");
            setShowAlert(true);
            return;
        }
        var i=0;
        for(;i<followUps.length;i++){
            if(picked[i]===true){
                const followUpId = followUps[i].followUpId;
                console.log(followUpId)
                const addRecordEndpoint = `http://localhost:9090/api/followUps/${followUpId}/fwInHosp/${fieldWorkerDetails.fwInHospId}`;
                const options = {
                    method: 'PUT',
                }
                fetch(addRecordEndpoint,options)
                    .then(function (response) {
                        console.log(response);
                        if (response['status'] === 200) {
                            console.log("DONE");
                        } else {
                            console.log("ERROR");
                        }
                        return response.json();
                    })



            }
        }
        // .then(async function () {
            console.log(tasksAssigned);
            // console.log(fieldWorkerDetails.currFieldWorker.numOfTasksPerDay);
            fieldWorkerDetails.numOfTasksPerDay=tasksAssigned;
            console.log(JSON.stringify(fieldWorkerDetails));
            const addRecordEndpoint = `http://localhost:9090/api/fieldWorkerInHospital/${fieldWorkerDetails.fwInHospId}`;
            const options = {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fieldWorkerDetails)
            }
            //
            const response = await fetch(addRecordEndpoint, options);
            const result = await response;
            console.log(response);
            if(result['status'] === 200){
                console.log("DONE");
                setShowAlert(true);
                setAlertHeader("Success.")
                setAlertMessage("Tasks assigned successfully.")
                // setShowAlertCaseErr(false);
                setRedirect(true);
            }

            else{
                console.log("ERROR");
                setShowAlert(true);
                setAlertHeader("Error while assigning");
                setRedirect(false);
            }
        // })


    }

    useEffect(() => {
        fetch(`http://localhost:9090/api/followUps/remaining/1`)
            .then((response) => response.json())
            .then((json) => {
                // setUseSt(true);
                setFollowUps(json);
                // console.log(json[0].fwInHospId);
                // setUseSt(1);
                // console.log(fieldWorkers[0]);
                return json;
            })
    }, []);

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
                    <BackButton path={path} data={profileData}></BackButton>
                </IonRow>

                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>ASSIGN TASK</b>
                    </IonTitle>
                </IonToolbar>

                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>SELECT FOLLOWUPS FROM THE BELOW LIST</b>
                    </IonTitle>
                </IonToolbar>

            </IonHeader>

            <IonContent className='ion-padding'/*class = "content-style"*/>
                <IonGrid>
                    <IonCard class="card-style">
                        <IonRow>
                            <IonCol>
                                <h5>Name : {fieldWorkerDetails.fieldWorker.fname}</h5>
                                <h5>Gender : {fieldWorkerDetails.fieldWorker.gender}</h5>
                                <h5>Address : {fieldWorkerDetails.fieldWorker.address}</h5>
                                <h5>Tasks assigned : {tasksAssigned}</h5>
                            </IonCol>
                        </IonRow>
                    </IonCard>
                </IonGrid>
                <IonGrid className='ion-text-center ion-margin'>
                    {followUps.map((followUp,index) =>
                        <IonCard class="card-style">
                            <IonCardHeader>
                                <IonSegment value={followUp.followUpId} key={followUp.followUpId}>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCheckbox onClick={()=>handleSelectFollowUp(index)}></IonCheckbox>
                                            <IonCol><h5>Follow-up Date: {followUp.followUpDate}</h5></IonCol>
                                            <IonCol><h5>Gender: {followUp.visit.patient.gender}</h5></IonCol>
                                            <IonCol><h5>Address: {followUp.visit.patient.address}</h5></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonSegment>
                            </IonCardHeader>
                        </IonCard>
                    )}
                    <IonRow>
                        <IonCol>
                            <IonButton onClick={handleSubmit}>SUBMIT</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={alertHeader}
                    message={alertMessage}
                    buttons={['OK']}
                />
            </IonContent>
            {!showAlert && redirect?<Redirect to={{pathname:'/supervisors/fieldWorkersInHospital',state: { userData: profileData }}}/>
                :null}

        </IonPage>
    )
};

export default AssignTasks;
