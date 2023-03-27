import { IonApp, IonHeader, IonTitle, IonToolbar, setupIonicReact, IonRouterOutlet} from '@ionic/react';
import {IonReactRouter} from "@ionic/react-router";
import {Route} from "react-router-dom";
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
import Register from "./components/Supervisor/Register";
import RegisterFieldWorker from "./components/Supervisor/RegisterFieldWorker";
import Update from "./components/Supervisor/Update";
import UpdateDoctor from "./components/Supervisor/UpdateDoctor";
import UpdatePatient from "./components/Supervisor/UpdatePatient";
import UpdateFieldWorker from "./components/Supervisor/UpdateFieldWorker";

setupIonicReact();

const App: React.FC = () => {

  return (
  <IonApp>
    <IonHeader>
      <IonToolbar color = "primary">
        <IonTitle class="ion-text-center">
          <b>HEALTHCARE SERVICES</b>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path = "/" component={Admin}/>
          <Route path = "/supervisors" component={Supervisor}/>
          <Route path = "/registerDoctor" component={RegisterDoctor}/>
          <Route path = "/updateDoctor" component={UpdateDoctor}/>
          <Route path = "/register" component={Register}/>
          <Route path = "/update" component={Update}/>
          <Route path = "/registerPatient" component={RegisterPatient}/>
          <Route path = "/registerFieldWorker" component={RegisterFieldWorker}/>
          <Route path = "/updatePatient" component={UpdatePatient}/>
          <Route path = "/updateFieldWorker" component={UpdateFieldWorker}/>
          <Route path = "/newCase" component={NewCase}/>
          <Route path = "/doctors" component={DoctorHome}/>
          <Route path = "/fieldWorkers" component={FieldWorker}/>
          <Route path = "/followup" component={FollowUp}/>
          <Route path = "/fieldWorkerHome" component={FWHome}/>
          <Route path = "/fillingRemarks" component={FillingRemarks}/>
        </IonRouterOutlet>
      </IonReactRouter>
  </IonApp>
)};

export default App; 
