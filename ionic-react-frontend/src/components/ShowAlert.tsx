import {
    IonButton,
    IonRow,
    IonAlert,
} from '@ionic/react';
import React, {useState} from "react";

// interface alertStruct {
//   alert: boolean,
//   showAlert: typeof useState<boolean>,
//   headAlert: string,
//   msgAlert: string
// }

const ShowAlert: React.FC<any> = ({alert, showAlert, headAlert, msgAlert}) => {
  if(alert)
  return(
      alert ?
      <IonAlert
        isOpen={alert}
        onDidDismiss={() => showAlert(false)}
        header= {`${headAlert}`}
        message= {`${msgAlert}`}
        buttons={['OK']}
      />
      :null
  )
  else return (null)
};

export default ShowAlert;
