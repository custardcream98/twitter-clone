import React from "react";
import PropTypes from "prop-types";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Auth from "routes/Auth";
import Home from "routes/Home";

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            <Routes>
                {isLoggedIn ?
                    <>
                        <Route path="/" element={<Home />} />
                    </> : <Route path="/" element={<Auth />} />}
            </Routes>
        </Router>
    );
}

AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;