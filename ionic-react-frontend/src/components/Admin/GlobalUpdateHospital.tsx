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

const GlobalUpdateHospital = () => {

    const [showAlertNoSuchId, setShowAlertNoSuchId] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [id, setId] = useState(0);
    const [hospital, setHospital] = useState<any>([]);
    const [openForm, setOpenForm] = useState(false);

    const name = useRef<HTMLIonInputElement>(null)
    const address = useRef<HTMLIonInputElement>(null)
    const registrationDate = useRef<HTMLIonInputElement>(null)

    const updateHospital = async() => {
        let data = {
            'hospitalId': hospital.hospitalId,
            'name': name.current!.value,
            'address': address.current!.value,
            'registrationDate': registrationDate.current!.value
        }
        console.log(JSON.stringify(data))
        const addRecordEndpoint = `http://localhost:9090/api/hospitals/${hospital.hospitalId}`;
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
        fetch(`http://localhost:9090/api/hospitals/${id}`)
           .then(async (response) => {
            if(response['status'] === 200) {
                const data = await response.json();
                setHospital(data)
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
                    <b>ADMIN</b>
                    </IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>UPDATE HOSPITAL</b>
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
                        hospital.length != 0 ? (   
                        <><IonCard class="card-style">
                                <IonGrid className='ion-text-center ion-margin'>
                                    <IonRow className="header-border">
                                        <IonCol>
                                            <IonCardTitle>Hospital Name:</IonCardTitle>
                                            <IonCardTitle><IonInput ref={name} value={hospital.name} class="card-input"></IonInput></IonCardTitle>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow className="header-border">
                                        <IonCol>
                                            <IonCardTitle>Hospital Address: </IonCardTitle>
                                            <IonCardTitle><IonInput ref={address} value={hospital.address} class="card-input"></IonInput></IonCardTitle>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow className="header-border">
                                        <IonCol>
                                            <IonCardTitle>Registration Date: </IonCardTitle>
                                            <IonCardTitle><IonInput ref={registrationDate} value={hospital.registrationDate} class="card-input"></IonInput></IonCardTitle>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCard><IonGrid className='ion-text-center ion-margin'>
                                    <IonButton onClick={updateHospital}>Submit</IonButton>
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

export default GlobalUpdateHospital;