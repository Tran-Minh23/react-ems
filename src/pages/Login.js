import { useFormik } from 'formik';
import * as Yup from "yup";
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Input from '../controls/Input';
import userService from '../services/userService';
import './Login.css';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import ActionTypes from '../store/actions';
const Login = (props) => {
    const {onUserLogin} = props;
    const [message, setMessage] = useState([]);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Required").min(3, "Must be 3 characters or more"),
            password: Yup.string().required("Required").min(3, "Must be 3 characters or more"),
        }),
        onSubmit: (values) => {
            formSubmitHandler(values);
        },
    });

    const formSubmitHandler = (values) => {
        const username = values.username;
        const password = values.password;
        userService.login(username, password).then(res => {
            if (res.errorCode > 0) {
                setMessage(res.message);
            }
            else {
                setMessage("");
                onUserLogin(res.token);
                navigate("/home");
            }
        })
    }

    return (
        <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
                <div className="col-sm-8 col-lg-5">
                    <div className="card bg-primary">
                        <div className="card-header text-white">
                            <h4 className="card-title mb-0"><i className="fas fa-th"></i> Login</h4>
                        </div>
                        <div className="card-body bg-white rounded-bottom">
                            <p className="text-danger text-center">{message}</p>
                            <form onSubmit={formik.handleSubmit}>
                                <Input id="txtUserName" name="userName" label="Username" type="text"
                                    frmField={formik.getFieldProps("username")}
                                    err = {formik.touched.username && formik.errors.username}
                                    errMessage={formik.errors.username}
                                />
                                <Input id="txtPassword" name="password" label="Password" type="password" 
                                    frmField={formik.getFieldProps("password")}
                                    err = {formik.touched.password && formik.errors.password}
                                    errMessage={formik.errors.password}
                                />
                                <div className="row">
                                    <div className="offset-sm-3 col-auto">
                                        <button type="submit" className="btn btn-primary">Sign in</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer bg-white">
                            <p className="mt-2">You don't have account? <Link to="/register" className="text-decoration-none">Register here</Link>
                            </p>         
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    onUserLogin: (token) => {
        dispatch({
            type: ActionTypes.LOGIN_USER,
            token
        })
    }
});
 
export default connect(null, mapDispatchToProps)(Login);