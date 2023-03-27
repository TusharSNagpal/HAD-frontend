import { IonApp, IonHeader, IonTitle, IonToolbar, setupIonicReact, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import React from "react";

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
import './theme/variables.css';
import NewCase from "./components/Supervisor/NewCase";
import DoctorHome from "./components/Doctor/DoctorHome";
import Admin from "./components/Admin/Admin";
import Supervisor from "./components/Supervisor/Supervisor";
import RegisterDoctor from './components/Supervisor/RegisterDoctor';
import RegisterPatient from "./components/Supervisor/RegisterPatient";
import FWHome from './components/FieldWorker/FWHome';
import FillingRemarks from './components/FieldWorker/FillingRemarks';
import FieldWorker from './components/FieldWorker/FieldWorker';
import FollowUp from './components/FollowUp/FollowUp';

import { useState, useEffect } from 'react';
import { Network } from "@capacitor/network";

import { useStorageFillingRemarks } from './hooks/useStorageFillingRemarks';

setupIonicReact();

const App: React.FC = () => {

  const [on, setOn] = useState(false);
  const [off, setOff] = useState(false);

  const [offlineAlert, setOfflineAlert] = useState(false);
  const [onlineAlert, setOnlineAlert] = useState(false);

  // const [offlineData, setOfflineData] = useState([]);

  const { remarks, addRemark, getRemarks, updateRemarks } = useStorageFillingRemarks();

  const syncStart = () => {
    let flag = 1;
    getRemarks().then(async offlineData => {
      console.log(offlineData);
        while (on && offlineData!.length > 0 && flag === 1) {
          // console.log(offlineData[0]['reviewByFieldWorker']);
          // updateRemarks(offlineData);  
          // count--;
          // console.log(offlineData[0]['reviewByFieldWorker']);
          let data = {
            'reviewByFieldWorker': offlineData[0]['reviewByFieldWorker']
          };

          const addRecordEndpoint = `http://localhost:9090/api/followUps/fieldWorker/${offlineData[0]['followUpId']}`;
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
                  // console.log(task);
                  offlineData.shift();
                  updateRemarks(offlineData);
                } else {
                  console.log("ERROR");
                  flag = 0;
                }
              })
        }
      }
    )
  }

  const status = (status: any) => {
      console.log('Network status changed', status);
      if (status.connected === true) {
        setOn(true);
        setOff(false);
        setOnlineAlert(true);
        setOfflineAlert(false);
        // syncStart();
      }
      else {
        setOn(false);
        setOff(true);
        setOfflineAlert(true);
        setOnlineAlert(false);
      }
  }

  useEffect(() => {
    syncStart();
  }, [on, off])

  Network.addListener('networkStatusChange', status);
  
  // Network.addListener('networkStatusChange', status);

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle class="ion-text-center">
            <b>HEALTHCARE SERVICES</b>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" component={Admin} />
          <Route path="/supervisors" component={Supervisor} />
          <Route path="/registerDoctor" component={RegisterDoctor} />
          <Route path="/registerPatient" component={RegisterPatient} />
          <Route path="/newCase" component={NewCase} />
          <Route path="/doctors" component={DoctorHome} />
          <Route path="/fieldWorkers" component={FieldWorker} />
          <Route path="/followup" component={FollowUp} />
          <Route path="/fieldWorkerHome" component={FWHome} />
          <Route path="/fillingRemarks" component={FillingRemarks} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

export default App; 
