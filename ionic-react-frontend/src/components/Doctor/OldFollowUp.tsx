
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
const OldFollowUp: React.FC<any> = props => {
    const f = props.location.state;
    const [followUpDetails, setFollowUpDetails] = useState(f);
    const [showAlert, setShowAlert] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [showFollowUpOption, setShowFollowUpOption] = useState(false);
    const [followUps, setFollowUps] = useState<any[]>([]);
    const [expanded, setExpanded] = useState<boolean[]>([false]);
    const [currFollowUpExpanded, setCurrFollowUpExpanded] = useState(false);
    const [tasksAssigned, setTasksAssigned] = useState<string>();
    const [save, setSave] = useState(false);
    const followUpDate = useRef<HTMLIonDatetimeElement>(null);

    const currTaskList = followUpDetails.currFollowUp.taskAssignedByDoctor.split("$")
    const currReviewList = followUpDetails.currFollowUp.reviewByFieldWorker.split("$")
    // console.log(followUpDetails.currFollowUp)
    const handleExpandFollowUp = (index:any)=>{
        let newArray = [...expanded];
    if(newArray[index]===true)
        newArray[index]=false;

    else
        newArray[index]=true;
    setExpanded(newArray);
    }

    const handleCurrentFollowupExpand=()=>{
        if(currFollowUpExpanded===true)
            setCurrFollowUpExpanded(false);
        else
            setCurrFollowUpExpanded(true);
    }

    const handleYes = ()=>{
        setShowFollowUpOption(true);
    }


    const handleSubmitFollowUps = async()=>{
        console.log(tasksAssigned)
        // var charCount = tasksAssigned.length + tasksAssigned.match(/\n/gm).length;
        let temp;
        if(tasksAssigned!=null)
            temp = tasksAssigned.replace(/\n/g, "$");
        var changeDateFormat = followUpDate.current!.value;
        console.log(changeDateFormat);
        if(changeDateFormat!=null && typeof(changeDateFormat)=='string')
            changeDateFormat = changeDateFormat.split('T')[0];
        console.log(changeDateFormat);

        // setTasksAssigned(temp);
        let newFollowUp = {
            'followUpDate':changeDateFormat,
            'taskAssignedByDoctor':temp,
            'visit':{'visitId':followUpDetails.currFollowUp.visit.visitId},
            'isActive':1,
            'fieldWorkerInHospital':{'fwInHospId':followUpDetails.currFollowUp.fieldWorkerInHospital.fwInHospId},
            'reviewByFieldWorker':""
        };
        // console.log(newFollowUp)
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

    const handleEndFollowUp =()=>{
                setRedirect(true);
    }

    useEffect(() => {
        fetch(`http://localhost:9090/api/followUps/visit/${followUpDetails.currFollowUp.visit.visitId}`)
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
    },[]);

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
                        <b>FOLLOW-UP DETAILS</b>
                    </IonTitle>
                </IonToolbar>

            </IonHeader>



            <IonContent className='ion-padding'>
                <IonCard>
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
                                                        <h5>Follow-up Date: {followUpDetails.currFollowUp.followUpDate}</h5>
                                                        <h5>Tasks Assigned:</h5>
                                                        {currTaskList.map((task:any)=>
                                                            <IonRow>
                                                                <IonCol>
                                                                    <h6>{task}</h6>
                                                                </IonCol>
                                                            </IonRow>
                                                            )}
                                                        <h5>Reviews:</h5>
                                                        {currReviewList.map((review:any)=>
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
                </IonCard>



                <IonCard>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <h3>Old follow ups</h3>
                            </IonCol>
                        </IonRow>

                        {followUps.map((followUp,index) =>
                            <IonCard class="card-style">
                                <IonCardHeader>
                                    <IonSegment>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol>
                                                    <IonButton onClick={()=>handleExpandFollowUp(index)}>Follow-up {index+1} details</IonButton>
                                                    { expanded[index] &&
                                                        <IonCol>
                                                            <h5>Follow-up Date: {followUp.followUpDate}</h5>
                                                            <h5>Task Assigned: {followUp.taskAssignedByDoctor}</h5>
                                                            <h5>Review: {followUp.reviewByFieldWorker}</h5>
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
                            <IonCol>
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

                        {!showAlert && redirect?<Redirect to='/doctorHome'/>
                            :null}

                    </IonGrid>



                </IonCard>
            </IonContent>

        </IonPage>


    )
};

export default OldFollowUp;
