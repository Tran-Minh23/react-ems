import { useFormik } from 'formik';
import * as Yup from "yup";
import React, { useState } from 'react'
import './Login.css';
import userService from '../services/userService';
import Input from '../controls/Input';
import { Link } from 'react-router-dom';
const Register = (props) => {

    const [success, setSuccess] = useState("");
    const [message, setMessage] = useState("");

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

        userService.register(username, password).then(res => {
            if (res.errorCode === 0) {
                setSuccess("ok");
                setMessage("");
            }
            else {
                setMessage(res.message);
                setSuccess("");
            }
        })
    }

    return (
        <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
                <div className="col-sm-8 col-lg-5">
                    <div className="card bg-primary">
                        <div className="card-header text-white">
                            <h4 className="card-title mb-0"><i className="fas fa-th"></i> REGISTER</h4>
                        </div>
                        <div className="card-body bg-white rounded-bottom">
                            {
                                success ?
                                (
                                    <div className="alert alert-info" role="alert">
                                        Successful.
                                    </div>
                                )
                                : (
                                    <p hidden></p>
                                )
                            }
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
                                        <button type="submit" className="btn btn-primary">Register</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer bg-white">
                            <p className="mt-2">Already had an account? <Link to="/login" className="text-decoration-none">Login here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
 
export default Register;