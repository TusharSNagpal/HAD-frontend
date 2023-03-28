import { IonApp, IonAlert, IonHeader, IonTitle, IonToolbar, setupIonicReact, IonRouterOutlet } from '@ionic/react';
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
import AdminHome from './components/Admin/AdminHome';
import GlobalRegister from './components/Admin/GlobalRegister';
import { register } from './serviceWorkerRegistration';
import GlobalRegisterHospital from './components/Admin/GlobalRegisterHospital';
import GlobalRegisterSupervisor from './components/Admin/GlobalRegisterSupervisor';
import GlobalRegisterFieldWorker from './components/Admin/GlobalRegisterFieldWorker';
import GlobalRegisterDoctor from './components/Admin/GlobalRegisterDoctor';
import GlobalUpdate from './components/Admin/GlobalUpdate';
import GlobalUpdateHospital from './components/Admin/GlobalUpdateHospital';
import GlobalUpdateSupervisor from './components/Admin/GlobalUpdateSupervisor';
import GlobalUpdateDoctor from './components/Admin/GlobalUpdateDoctor';
import GlobalUpdateFieldWorker from './components/Admin/GlobalUpdateFieldWorker';


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

  const syncStart = async() => {
    let flag = 1;
    let connection = await Network.getStatus();
    getRemarks().then(async offlineData => {
      console.log(offlineData);
        while (connection.connected && offlineData!.length > 0 && flag === 1) {
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
          <Route exact path = "/" component={Admin}/>
          <Route exact path = "/supervisors" component={Supervisor}/>
          <Route path = "/registerDoctor" component={RegisterDoctor}/>
          <Route path = "/registerPatient" component={RegisterPatient}/>
          <Route path = "/newCase" component={NewCase}/>
          <Route path = "/doctors" component={DoctorHome}/>
          <Route path = "/fieldWorkers" component={FieldWorker}/>
          <Route path = "/followup" component={FollowUp}/>
          <Route path = "/fieldWorkerHome" component={FWHome}/>
          <Route path = "/fillingRemarks" component={FillingRemarks}/>
          <Route exact path = "/admin" component={AdminHome} />
          <Route exact path = "/globalRegister" component={GlobalRegister} />
          <Route exact path = "/globalRegister/globalRegisterHospital" component={GlobalRegisterHospital} />
          <Route exact path = "/globalRegister/globalRegisterSupervisor" component={GlobalRegisterSupervisor} />
          <Route exact path = "/globalRegister/globalRegisterDoctor" component={GlobalRegisterDoctor} />
          <Route exact path = "/globalRegister/globalRegisterFieldWorker" component={GlobalRegisterFieldWorker} />
          <Route exact path = "/globalUpdate" component={GlobalUpdate} />
          <Route exact path = "/globalUpdate/globalUpdateHospital" component={GlobalUpdateHospital} />
          <Route exact path = "/globalUpdate/globalUpdateSupervisor" component={GlobalUpdateSupervisor} />
          <Route exact path = "/globalUpdate/globalUpdateDoctor" component={GlobalUpdateDoctor} />
          <Route exact path = "/globalUpdate/globalUpdateFieldWorker" component={GlobalUpdateFieldWorker} />
        </IonRouterOutlet>
      </IonReactRouter>

      <IonAlert
                    isOpen={offlineAlert}
                    onDidDismiss={() => setOfflineAlert(false)}
                    header= {"CONNECTION LOST..!"}
                    subHeader="Please connect to Internet for Sync"
                    buttons={['OK']}
                />
      <IonAlert
                    isOpen={onlineAlert}
                    onDidDismiss={() => setOnlineAlert(false)}
                    header= {"CONNECTION IS BACK"}
                    subHeader="CONNECTED"
                    buttons={['OK']}
                />
    </IonApp>
  )
};

export default App; 
