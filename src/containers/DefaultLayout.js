import React from 'react'
import { Navigate, Route, Routes } from 'react-router';
import Home from '../pages/Home';
import Department from '../pages/Department';
import Employee from '../pages/Employee';
import Header from './Header';
import { connect } from 'react-redux';

const DefaultLayout = (props) => {
    const {isLoggedIn} = props;
    return (
        <>
            <Header/>
            {
                !isLoggedIn ? <Navigate to="/login" /> :
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/department" element={<Department />} />
                    <Route path="/employee" element={<Employee />} />   
                </Routes>
            }
        </>
    );
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
});

export default connect (mapStateToProps)(DefaultLayout);