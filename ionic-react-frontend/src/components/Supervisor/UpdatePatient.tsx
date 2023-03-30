import {
    IonContent,
    IonGrid,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonPage,
    IonSegment, IonList, IonItem, IonSelect, IonSelectOption, IonLabel, IonInput, IonCol, IonRow, IonCardHeader, IonCard, IonCardTitle, IonTabBar, IonTabButton, IonAlert, IonDatetime
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
import React, { useEffect, useRef, useState } from 'react';

const UpdatePatient= () => {
    const [showAlertNoSuchId, setShowAlertNoSuchId] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [id, setId] = useState(0);
    const [doctor, setDoctor] = useState<any>([]);
    const [openForm, setOpenForm] = useState(false);
    const supId =useRef<HTMLIonInputElement>(null)
    const hospId= useRef<HTMLIonInputElement>(null)
    const fname = useRef<HTMLIonInputElement>(null);
    const lname = useRef<HTMLIonInputElement>(null);
    const gender = useRef<HTMLIonInputElement>(null);
    const dob = useRef<HTMLIonDatetimeElement>(null);
    const address = useRef<HTMLIonInputElement>(null);
    const phoneNo = useRef<HTMLIonInputElement>(null);
    const patient_id=useRef<HTMLIonInputElement>(null);


    const resetAll = () => {
        // supervisorId.current!.value = null;
        dob.current!.reset();
        patient_id.current!.value=null;
        fname.current!.value = null;
        lname.current!.value = null;
        gender.current!.value = null;
        address.current!.value = null;
        phoneNo.current!.value = null;
    }



    const updateDoctor = async() => {
        let data = {


            'hospitalId': {'hospitalId': hospId.current!.value},
            'supId': {'supervisorId': supId.current!.value},
            'patientId': patient_id.current!.value,
            'fname': fname.current!.value,
            'lname': lname.current!.value,
            'gender': gender.current!.value,
            'address': address.current!.value,
            'phoneNo': phoneNo.current!.value,
            'dob': dob.current!.value

        }
        console.log(JSON.stringify(data))
        const addRecordEndpoint = `http://localhost:9090/api/patients/${patient_id.current!.value}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        await fetch(addRecordEndpoint, options)
            .then(function (response) {
                console.log(response);
                if (response['status'] === 200) {
                    console.log("DONE");
                    setShowAlert(true)
                } else {
                    console.log("ERROR");
                    console.log(response)
                }
                return response.json();
            })
    }

    const handle = () => {
        if(openForm) setOpenForm(false);
        else setOpenForm(true);
    }

    useEffect(() => {
        fetch(`http://localhost:9090/api/patients/${id}`)
            .then(async (response) => {
                if(response['status'] === 200) {
                    const data = await response.json();
                    setDoctor(data)
                    console.log(data)
                }
                else if(id !== 0) setShowAlertNoSuchId(true);
            })
    },[openForm]);

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>HEALTH CARE SERVICES</b>
                    </IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>SUPERVISOR</b>
                    </IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>UPDATE PATIENT</b>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'/*class = "content-style"*/>

                <IonGrid className='ion-text-center ion-margin'>
                    <IonSegment>
                        <form className="ion-padding">
                            <IonItem>
                                <IonLabel position="floating">ID</IonLabel>
                                <IonInput onIonInput={(e: any) => setId(e.target.value)}/>
                            </IonItem>
                            <IonButton className="ion-margin-top" expand="block" onClick={handle}>
                                Search
                            </IonButton>


                            <IonAlert
                                isOpen={showAlertNoSuchId}
                                onDidDismiss={() => setShowAlertNoSuchId(false)}
                                subHeader="ID NOT FOUND..!"
                                message="!!UNSUCCESSFUL..!"
                                buttons={['OK']}
                            />
                        </form>
                    </IonSegment>
                    {
                        doctor.length != 0 ? (
                            <><IonCard class="card-style">
                                <IonGrid className='ion-text-center ion-margin'>
                                    <IonRow className = "header-border">
                                        <IonCol>
                                            <IonCardTitle>Patient Id: </IonCardTitle>
                                            <IonCardTitle><IonInput ref={patient_id} class="card-input" placeholder="Id"></IonInput></IonCardTitle>
                                        </IonCol>
                                        <IonCol>
                                            <IonCardTitle>Hospital Id: </IonCardTitle>
                                            <IonCardTitle><IonInput ref={hospId} class="card-input" placeholder="Id"></IonInput></IonCardTitle>
                                        </IonCol>

                                        <IonCol>
                                            <IonCardTitle>Supervisor Id: </IonCardTitle>
                                            <IonCardTitle><IonInput ref={supId} class="card-input" placeholder="Id"></IonInput></IonCardTitle>
                                        </IonCol>
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
                                    <IonButton onClick={updateDoctor}>Submit</IonButton>
                                </IonGrid>

                                <IonAlert
                                    isOpen={showAlert}
                                    onDidDismiss={() => setShowAlertNoSuchId(false)}
                                    subHeader="DATA UPDATED SUCCESSFULLY..!"
                                    buttons={['OK']}
                                /> </>
                        ) : null
                    }
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default UpdatePatient;