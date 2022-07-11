import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './pages/AppRoutes';

const Root = () => {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
};

export default Root;
