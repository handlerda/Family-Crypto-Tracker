import React from "react";
import Zabo from "zabo-react-component";
console.log(process.env.REACT_APP_ZABO_CLIENT_ID);
function ZaboPopup() {
  return (
    <Zabo
      clientId={process.env.REACT_APP_ZABO_CLIENT_ID}
      env="sandbox"
      onInit={(team) => console.log("Team", team)}
    />
  );
}

export default ZaboPopup;
