import React, { useState } from "react";

import Google_Login_Button from "./components/Google_Login_Button/Google_Login_Button";
import Google_Form_Event from "./components/Google_Form_Event/Google_Form_Event";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {/* <Google_logo/> */}
      {!isLoggedIn ? (<Google_Login_Button onLoginSuccess={handleLoginSuccess} />) : (<Google_Form_Event />)}
    </div>
  );
}

export default App;
