import { IonPage, IonContent, IonButton, IonLabel, IonItem, IonInput, IonSegment, IonHeader, IonTitle, IonToolbar, setupIonicReact, IonRouterOutlet } from '@ionic/react';
import {PDFGenerator} from "@awesome-cordova-plugins/pdf-generator";
// import { IonReactRouter } from "@ionic/react-router";
// import { Route } from "react-router-dom";
import { Redirect } from 'react-router';
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
import '../../theme/variables.css';
import './FieldWorker.css';
import FillingRemarks from './FillingRemarks';
import { useRef, useState, useEffect, Component } from 'react';
import { useReactToPrint } from 'react-to-print';

// import { useStorage } from '../../hooks/useStorage';

// setupIonicReact();

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

const Prescription: React.FC = () => {
    const pdfDownload = () => {
        console.log("print");
        const docDef = {
          content: [
            'Bulleted list example:',
            {
              ul: [
                'Item 1',
                'Item 2',
                'Item 3',
                { text: 'Item 4', bold: true },
              ]
            },
        
            'Numbered list example:',
            {
              ol: [
                'Item 1',
                'Item 2',
                'Item 3'
              ]
            }
          ]
        
        };
    
        pdfMake.createPdf(docDef).download();
      }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle class="ion-text-center">
                        <b>HEALTHCARE SERVICES</b>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonHeader>
                <IonToolbar>
                    <IonTitle class="ion-text-center">
                        <b>FIELD WORKER</b>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonButton onClick = {()=>pdfDownload()}>Print</IonButton>
            </IonContent>
        </IonPage>
    )
};

export default Prescription;