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
          <Route exact path = "/supervisorHome" component={Supervisor}/>
          <Route exact path = "/registerDoctor" component={RegisterDoctor}/>
          <Route exact path = "/registerPatient" component={RegisterPatient}/>
          <Route exact path = "/newCase" component={NewCase}/>
          <Route exact path = "/doctorHome" component={DoctorHome}/>
          <Route exact path = "/fieldWorker" component={FieldWorker}/>
          <Route exact path = "/followup" component={FollowUp}/>
          <Route exact path = "/fieldWorkerHome" component={FWHome}/>
          <Route exact path = "/fillingRemarks" component={FillingRemarks}/>
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
  </IonApp>
)};

export default App; 
