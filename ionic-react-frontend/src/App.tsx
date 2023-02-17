
import { IonApp, IonHeader, IonTitle, IonToolbar, setupIonicReact, IonRouterOutlet} from '@ionic/react';
import {IonReactRouter} from "@ionic/react-router";
import {Route} from "react-router-dom";

import Supervisor from "./components/Supervisor/Supervisor";
import RegisterDoctor from './components/Supervisor/RegisterDoctor';
import RegisterPatient from "./components/Supervisor/RegisterPatient";

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

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonHeader>
      <IonToolbar>
        <IonTitle class="ion-text-center">
          <b>HEALTHCARE SERVICES</b>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path = "/" component={Admin}/>
          <Route path = "/supervisorHome" component={Supervisor}/>
          <Route path = "/registerDoctor" component={RegisterDoctor}/>
          <Route path = "/registerPatient" component={RegisterPatient}/>
          <Route path = "/newCase" component={NewCase}/>
          <Route path = "/doctorHome" component={DoctorHome}/>
        </IonRouterOutlet>
      </IonReactRouter>
  </IonApp>
);

export default App; 
