import { React, useState } from "react";

import { authService } from "firebaseInstance";
import AppRouter from "components/Router";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
    return <>
        <AppRouter isLoggedIn={isLoggedIn} />
        <footer>
            &copy; Cwitter {new Date().getFullYear()}
        </footer></>;
}

export default App;
