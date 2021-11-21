import { useFormik } from 'formik';
import * as Yup from "yup";
import React, {Fragment, useEffect, useState } from 'react'
import { Form, Modal, Row, Button, Dropdown } from 'react-bootstrap';
import Input from '../controls/Input';
import departmentService from '../services/departmentService';
import employeeService from '../services/employeeService';
import { toast } from 'react-toastify';

const Employee = (props) => {

    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [id, setId] = useState(0);
    const [departId, setDepartid] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [delModalShow, setDelModalShow] = useState(false);

    const handleModalShow = () => setModalShow(true);
    const handleModalClose = () => setModalShow(false);
    const handleDelModalShow = () => setDelModalShow(true);
    const handleDelModalClose = () => setDelModalShow(false);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            gender: "Male",
            phoneNumber: "",
            email: "",
            address: "",
            department: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("Required").min(2, "Must be 2 characters or more"),
            lastName: Yup.string().required("Required").min(2, "Must be 2 characters or more"),
            phoneNumber: Yup.string().required("Required").min(10, "Must be 10 numbers or more"),
            email: Yup.string().required("Required").min(5, "Must be 5 numbers or more"),
            address: Yup.string().required("Required").min(5, "Must be 5 characters or more"),
            department: Yup.string().required("Department is required"),
        }),
        onSubmit: (values) => {
            saveEmployee(values);
        },
    });

    const getAllEmployees = () => {
        employeeService.list().then(res => {
            setEmployees(res.data);
        })
    }

    const getAllEmployeesByDepartment = (departmentId) => {
        employeeService.listByDepartment(departmentId).then(res => {
            setEmployees(res.data);
        });
    }

    const getAllDepartments = () => {
        departmentService.list().then(res => {
            setDepartments(res.data);
        })
    }

    const saveEmployee = (values) => {
        const data = {
            firstName: values.firstName,
            lastName: values.lastName,
            gender: values.gender,
            phone: values.phoneNumber,
            email: values.email,
            address: values.address,
            departmentId: parseInt(values.department),
        }

        if (id === 0) {
            employeeService.add(data).then(res => {
                if (departId > 0) {
                    getAllEmployeesByDepartment(departId);
                }
                else {
                    getAllEmployees();
                }
                handleModalClose();
                toast.success("Add Successful!");
            })
        }
        else {
            employeeService.edit(id, data).then(res => {
                if (departId > 0) {
                    getAllEmployeesByDepartment(departId);
                }
                else {
                    getAllEmployees();
                }
                handleModalClose();
                toast.success("Update Successful!");
            });
        }
    }

    const clickAddHandler = () => {
        setId(0);
        formik.resetForm();
        handleModalShow();
    }

    const edithandler = (e, id) => {
        e.preventDefault();
        formik.resetForm();
        employeeService.getById(id).then(res => {
            formik.setFieldValue("firstName", res.data.firstName);
            formik.setFieldValue("lastName", res.data.lastName);
            formik.setFieldValue("gender", res.data.gender);
            formik.setFieldValue("phoneNumber", res.data.phone);
            formik.setFieldValue("email", res.data.email);
            formik.setFieldValue("address", res.data.address);
            formik.setFieldValue("department", res.data.department.id);
            setId(id);
            handleModalShow();
        })
    }

    const deleteHandler = (e, id) => {
        e.preventDefault();
        setId(id);
        handleDelModalShow();
    }

    const clickDelete = () => {
        employeeService.delete(id).then(res => {
            if (res.errorCode === 0) {
                toast.warning("Delete Successful!");

                if (departId > 0) {
                    getAllEmployeesByDepartment(departId);
                }
                else {
                    getAllEmployees();
                }  
                handleDelModalClose();
            }
            else {
                toast.error("Delete failed!");
            }
        })
        handleModalClose();
    }

    const showEmployeesByDepartment = (e, departmentId) => {
        if (departmentId === 0) {
            setDepartid(0);
            getAllEmployees();
        }
        else {
            setDepartid(departmentId);
            getAllEmployeesByDepartment(departmentId);
        }
    }

    useEffect(() => {
        getAllEmployees();
        getAllDepartments();
    }, []);

    return (
        <Fragment>
            <div className="container mt-4">
                <div className="card border-primary bt-5px">
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h3 className="card-title">Employee <small className="text-muted">list</small></h3>
                            </div>
                            <div className="col-auto">
                                <button type="button" className="btn btn-primary" 
                                    onClick={clickAddHandler}><i className="fas fa-plus"></i> Add
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row py-4">
                            <div className="col">
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-select">
                                        List Employees By
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu variant="dark">
                                        <Dropdown.Item onClick={(e) => showEmployeesByDepartment(e, 0)}>All</Dropdown.Item>
                                        {departments.map((department, idx) => {
                                            return (
                                                <Dropdown.Item onClick={(e) => showEmployeesByDepartment(e, department.id)}>{department.departmentName}</Dropdown.Item>
                                            )
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover mb-0 border-primary">
                                <thead className="table-primary border-primary">
                                    <tr className="text-center">
                                        <th style={{width: "60px"}}>#</th>
                                        <th>Full name</th>
                                        <th style={{width: "50px"}}>Gender</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                        <th style={{width: "200px"}}>Department</th>
                                        <th style={{width: "100px"}}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((employee, idx) => {
                                        return(
                                            <tr className="text-center">
                                                <th key={employee.id}>{idx + 1}</th>
                                                <td>{employee.lastName} {employee.firstName}</td>
                                                {(employee.gender === "Male" 
                                                    ? <td><i className="fas fa-male text-primary fa-lg"></i></td>
                                                    : <td><i className="fas fa-female text-warning fa-lg"></i></td>)
                                                }
                                                <td style={{width: "150px"}}>{employee.phone}</td>
                                                <td style={{width: "200px"}}>{employee.email}</td>
                                                <td style={{width: "200px"}}>{employee.address}</td>
                                                <td>{employee.department.departmentName}</td>
                                                <td>
                                                    <a href="/#">
                                                        <i onClick={(e) => edithandler(e, employee.id)} className="fas fa-edit text-primary"></i></a>
                                                    <a href="/#" className="ms-2">
                                                        <i onClick={(e) => deleteHandler(e, employee.id)} className="fas fa-trash-alt text-danger"></i></a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/*Modal*/}
            <Modal size="md" show={modalShow} onHide={handleModalClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{id > 0 ? "Edit" : "Add"} Employee</Modal.Title>
                </Modal.Header>
                <form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <Input id="txtFirstName" label="First name" type="text"
                            frmField={formik.getFieldProps("firstName")}
                            err = {formik.touched.firstName && formik.errors.firstName}
                            errMessage={formik.errors.firstName}/>

                        <Input id="txtLastName" label="Last name" type="text"
                            frmField={formik.getFieldProps("lastName")}
                            err = {formik.touched.lastName && formik.errors.lastName}
                            errMessage={formik.errors.lastName}/>

                        <div key="inline-radio" className="row mb-3">
                            <Form.Label column sm="3">Gender</Form.Label>
                            
                            <div className="col mt-2">
                                <Form.Check inline label="Male" name="gender" type="radio" id="male" defaultChecked={(formik.getFieldProps("gender").value === "Male") ? true : false}
                                onChange={() => formik.setFieldValue("gender", "Male")}
                                />
                                <Form.Check className="ms-3" inline label="Female" name="gender" type="radio" id="female" defaultChecked={(formik.getFieldProps("gender").value === "Female") ? true : false}
                                onChange={() => formik.setFieldValue("gender", "Female")}/>
                            </div>
                        </div>

                        <Input style={{marginTop: "10px"}} id="txtPhone" label="Phone number" type="text"
                            frmField={formik.getFieldProps("phoneNumber")}
                            err = {formik.touched.phoneNumber && formik.errors.phoneNumber}
                            errMessage={formik.errors.phoneNumber}/>

                        <Input id="txtEmail" label="Email" type="email"
                            frmField={formik.getFieldProps("email")}
                            err = {formik.touched.email && formik.errors.email}
                            errMessage={formik.errors.email}/>

                        <Input id="txtAddress" label="Address" type="text"
                            frmField={formik.getFieldProps("address")}
                            err = {formik.touched.address && formik.errors.address}
                            errMessage={formik.errors.address}/>

                        <Form.Group as={Row} controlId="formDepartment">
                            <Form.Label column sm="3">Department</Form.Label>
                            <Form.Select className="col-5 ms-2" 
                                style={{width: "50%"}}
                                onChange={(value) => formik.setFieldValue("department", value.target.value)}>
                            
                                <option value="">Choose...</option>
                                {departments.map((department, idx) => {
                                    return (
                                        <option 
                                            selected={formik.getFieldProps("department").value === department.id ? true : false} 
                                            value={department.id}>{department.departmentName}
                                        </option>
                                    )
                                })}
                                
                            </Form.Select>
                        </Form.Group>
                                {formik.errors.department &&
                                formik.touched.department &&
                                <div className="input-feedback text-danger mt-2 offset-sm-3">
                                    {formik.errors.department}
                                </div>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" variant="secondary" onClick={handleModalClose}>Close</Button>
                        <Button type="submit" variant="primary">Save</Button>
                    </Modal.Footer>                 
                </form>                  
            </Modal>

            <Modal show={delModalShow} onHide={handleDelModalClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer className="text-center">
                        <Button type="button" variant="secondary" onClick={handleDelModalClose}>Close</Button>
                        <Button type="button" onClick={clickDelete} variant="danger">Delete anyway</Button>
                    </Modal.Footer>
            </Modal>
        </Fragment>
    );
}
 
export default Employee;