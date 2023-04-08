
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
import React, { useEffect, useState, useRef } from "react";

// import Date from "../items/Date";

/* Theme variables */
import '../../theme/variables.css';
import './Doctor.css';
import { Redirect } from "react-router";
import DoctorHome from "./DoctorHome";
import { Route } from "react-router-dom";
import BackButton from "../../components/BackButton";


// setupIonicReact();
const OldFollowUp: React.FC<any> = props => {
    const f = props.location.state;
    const [followUpDetails, setFollowUpDetails] = useState(f.currFollowUp);
    const [profileData, setProfileData] = useState(f.userData);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string>();
    const [alertHeader, setAlertHeader] = useState<string>()
    const [redirect, setRedirect] = useState(false);
    const [showFollowUpOption, setShowFollowUpOption] = useState(false);
    const [followUps, setFollowUps] = useState<any[]>([]);
    const [expanded, setExpanded] = useState<boolean[]>([false]);
    const [currFollowUpExpanded, setCurrFollowUpExpanded] = useState(false);
    const [tasksAssigned, setTasksAssigned] = useState<string>();
    const [save, setSave] = useState(false);
    const followUpDate = useRef<HTMLIonDatetimeElement>(null);

    const currTaskList = followUpDetails.taskAssignedByDoctor.split("$")
    const currReviewList = followUpDetails.reviewByFieldWorker.split("$")

    const [oldTaskList, setOldTaskList] = useState<string[]>([])
    const [oldReviewList, setOldReviewList] = useState<string[]>([])

    const path = "/doctorInHospital"
    // console.log(followUpDetails)
    const handleExpandFollowUp = (index: any) => {
        const tasks = followUps[index].taskAssignedByDoctor.split("$")
        const reviews = followUps[index].reviewByFieldWorker.split("$")
        setOldTaskList(tasks)
        setOldReviewList(reviews)
        console.log(oldTaskList)
        console.log(oldReviewList)
        let newArray = [...expanded];
        if (newArray[index] === true)
            newArray[index] = false;

        else
            newArray[index] = true;
        setExpanded(newArray);
    }

    const handleCurrentFollowupExpand = () => {
        if (currFollowUpExpanded === true)
            setCurrFollowUpExpanded(false);
        else
            setCurrFollowUpExpanded(true);
    }

    const handleYes = () => {
        setShowFollowUpOption(true);
    }


    const handleSubmitFollowUps = async () => {
        if (tasksAssigned == null || followUpDate.current!.value == null) {
            setShowAlert(true);
            setAlertHeader("Unsuccessful");
            setAlertMessage("Please assign some task and follow-up date");
            return;
        }
        let temp;
        if (tasksAssigned != null)
            temp = tasksAssigned.replace(/\n/g, "$");


        var changeDateFormat = followUpDate.current!.value;
        console.log(changeDateFormat);
        if (changeDateFormat != null && typeof (changeDateFormat) == 'string')
            changeDateFormat = changeDateFormat.split('T')[0];
        console.log(changeDateFormat);

        // setTasksAssigned(temp);
        let newFollowUp = {
            'followUpDate': changeDateFormat,
            'taskAssignedByDoctor': temp,
            'visit': { 'visitId': followUpDetails.visit.visitId },
            'isActive': 1,
            'fieldWorkerInHospital': { 'fwInHospId': followUpDetails.fieldWorkerInHospital.fwInHospId },
            'reviewByFieldWorker': ""
        };
        // console.log(newFollowUp)
        console.log(JSON.stringify(newFollowUp));
        const addRecordEndpoint = `http://172.16.132.90:9090/api/followUps/`;
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

    const handleEndFollowUp = () => {
        setRedirect(true);
    }

    useEffect(() => {
        fetch(`http://172.16.132.90:9090/api/followUps/visit/${followUpDetails.visit.visitId}/followUpId/${followUpDetails.followUpId}`)
            .then((response) => response.json())
            .then((json) => {
                // setUseSt(true);
                setFollowUps(json);
                // console.log(json);
                // console.log(json.length);
                // setUseSt(1);
                // console.log(activeCases);
                return json;
            })
    }, []);

    //dynamic task by doctor:

    let count = 1;

    const [mapTask, setMapTask] = useState(['']);

    const addNew = (key:number) => {
        console.log(key);
        let pseudo = mapTask;
        pseudo = [...pseudo, ''];
        setMapTask(pseudo);
        console.log(mapTask);
    }

    const [changeState, setChangeState] = useState(false);

    const deleteIt = (index:number) => {
        let pseudo = mapTask;
        pseudo.splice(index,1);
        setMapTask(pseudo);
        console.log(mapTask);
        console.log("Hi");
        if(changeState)
            setChangeState(false);
        else
        setChangeState(true);
    }

    useEffect(() => {
        console.log(mapTask.length);
    },[changeState]);

    const handleChangeOfTask = (event:any, index:number) => {
        mapTask[index] = event!.target!.value;
        setMapTask(mapTask);
        // console.log(mapTask);
        let assignedTask = "";

        mapTask.map((data) => {
            assignedTask += data;
            assignedTask += '$';
        })
        assignedTask = assignedTask.substring(0,assignedTask.length-1);

        setTasksAssigned(assignedTask);
    }

    return (
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

                <IonRow>
                    <BackButton path={path} data={profileData}></BackButton>
                </IonRow>

                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>FOLLOW-UP DETAILS</b>
                    </IonTitle>
                </IonToolbar>

            </IonHeader>



            <IonContent className='ion-padding'>
                <IonGrid>
                    <IonCard class="card-style">
                        <IonCardHeader>
                            <IonSegment>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol>
                                            <IonButton onClick={handleCurrentFollowupExpand}>Latest Follow-up Details</IonButton>
                                            {
                                                currFollowUpExpanded &&
                                                <IonCol>
                                                    <h5>Follow-up Date: {followUpDetails.followUpDate}</h5>
                                                    <h5>Tasks Assigned:</h5>
                                                    {currTaskList.map((task: any) =>
                                                        <IonRow>
                                                            <IonCol>
                                                                <h6>{task}</h6>
                                                            </IonCol>
                                                        </IonRow>
                                                    )}
                                                    <h5>Reviews:</h5>
                                                    {currReviewList.map((review: any) =>
                                                        <IonRow>
                                                            <IonCol>
                                                                <h6>{review}</h6>
                                                            </IonCol>
                                                        </IonRow>
                                                    )}
                                                </IonCol>
                                            }
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonSegment>
                        </IonCardHeader>
                    </IonCard>
                </IonGrid>



                <IonCard>
                    <IonGrid>
                        <IonRow class="ion-text-center">
                            <IonCol>
                                <h3>Old follow ups</h3>
                            </IonCol>
                        </IonRow>

                        {followUps.map((followUp, index) =>
                            <IonCard class="card-style">
                                <IonCardHeader>
                                    <IonSegment>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol>
                                                    <IonButton onClick={() => handleExpandFollowUp(index)}>Follow-up {index + 1} details</IonButton>
                                                    {expanded[index] &&
                                                        <IonCol>
                                                            <h5>Follow-up Date: {followUp.followUpDate}</h5>
                                                            <h5>Tasks Assigned:</h5>
                                                            {oldTaskList.map((task: any) =>
                                                                <IonRow>
                                                                    <IonCol>
                                                                        <h6>{task}</h6>
                                                                    </IonCol>
                                                                </IonRow>
                                                            )}
                                                            <h5>Reviews:</h5>
                                                            {oldReviewList.map((review: any) =>
                                                                <IonRow>
                                                                    <IonCol>
                                                                        <h6>{review}</h6>
                                                                    </IonCol>
                                                                </IonRow>
                                                            )}
                                                        </IonCol>
                                                    }


                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </IonSegment>
                                </IonCardHeader>
                            </IonCard>
                        )}

                        {
                            !showFollowUpOption &&

                            <IonCol class="ion-text-center">
                                <IonRow>
                                    <IonCol>
                                        <h3>Do you want to add followups for this patient?</h3>
                                    </IonCol>
                                </IonRow>


                                <IonRow>
                                    <IonCol>
                                        <IonButton onClick={handleYes}>Yes</IonButton>
                                        <IonButton onClick={handleEndFollowUp}>End Case</IonButton>
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
                                                
                                                {/* <IonTextarea value={tasksAssigned} onIonChange={(e) => setTasksAssigned(e.detail.value!)}></IonTextarea> */}
                                                {mapTask.map((value: any, index: any) => (
                                                    <IonTextarea key = {index} value={mapTask[index]} onIonChange={(e) => handleChangeOfTask(e, index)}><IonButton onClick={()=> {addNew(index)}}>+</IonButton><IonButton onClick={() => deleteIt(index)}>-</IonButton></IonTextarea>
                                                // <IonTextarea value={tasksAssigned} onIonChange={(e) => setTasksAssigned(e.detail.value!)}></IonTextarea>
                                                 ))}
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

                                <IonRow class="ion-text-center">
                                    <IonCol>
                                        <IonButton onClick={handleSubmitFollowUps}>SUBMIT</IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        }

                        <IonAlert
                            isOpen={showAlert}
                            onDidDismiss={() => setShowAlert(false)}
                            header={alertHeader}
                            message={alertMessage}
                            buttons={['OK']}
                        />

                        {!showAlert && redirect ? <Redirect to={{ pathname: '/doctorInHospital', state: { userData: profileData } }} />
                            : null}

                    </IonGrid>



                </IonCard>
            </IonContent>

        </IonPage>


    )
};

export default OldFollowUp;