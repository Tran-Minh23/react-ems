
import { useFormik } from 'formik';
import * as Yup from "yup";
import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import Input from '../controls/Input';
import departmentService from '../services/departmentService';
import { toast } from 'react-toastify';
const Department = (props) => {
    const [departments, setDepartments] = useState([]);
    const [id, setId] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [delModalShow, setDelModalShow] = useState(false);

    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);
    const handleDelModalShow = () => setDelModalShow(true);
    const handleDelModalClose = () => setDelModalShow(false);

    const formik = useFormik({
        initialValues: {
            departmentName: "",
        },
        validationSchema: Yup.object({
            departmentName: Yup.string().required("Required").min(2, "Must be 2 characters or more"),
        }),
        onSubmit: (values) => {
            saveDepartment(values);
        },
    });

    const getAllDepartments = () => {
        departmentService.list().then(res => {
            setDepartments(res.data);
        });
    };

    const saveDepartment = (values) => {
        const data = {
            departmentName: values.departmentName
        }

        if(id === 0) {
            departmentService.add(data).then(res => {
                getAllDepartments();
                handleModalClose();
                toast.success("Add Successful!");
            })
        }
        else {
            departmentService.edit(id, data).then(res => {
                getAllDepartments();
                handleModalClose();
                toast.success("Update Successful!");
            }) 
        }
    }

    const clickAddHandler = () => {
        setId(0);
        formik.setFieldValue("departmentName", "");
        formik.resetForm();
        handleModalShow();
    }

    const deleteHandler = (e, id) => {
        e.preventDefault();
        setId(id);
        handleDelModalShow();
    }

    const clickDelete = () => {
        departmentService.delete(id).then(res => {
            if (res.errorCode === 0) {
                toast.warning("Delete Successful!");
                getAllDepartments();
                handleDelModalClose();
            }
            else {
                toast.error("Delete failed!");
            }
        })
        handleModalClose();
    }

    const edithandler = (e, id) => {
        e.preventDefault();
        formik.resetForm();
        departmentService.getById(id).then(res => {
            formik.setFieldValue("departmentName", res.data.departmentName);
            setId(id);
            handleModalShow();
        })
    }

    useEffect(() => {
        getAllDepartments();
    }, []);

        return (
            <>
                <div className="container mt-4">
                    <div className="card border-primary bt-5px">
                        <div className="card-header">
                            <div className="row">
                                <div className="col">
                                    <h3 className="card-title">Department <small className="text-muted">list</small></h3>
                                </div>
                                <div className="col-auto">
                                    <button onClick={clickAddHandler} type="button" className="btn btn-primary"><i className="fas fa-plus"></i> Add</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover mb-0 border-primary">
                                    <thead className="table-primary border-primary">
                                        <tr>
                                            <th style={{width: "60px"}} className="text-center">#</th>
                                            <th>Department Name</th>
                                            <th style={{width: "100px"}} className="text-center"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {departments.map((department, inx) => {
                                            return(
                                                <tr>
                                                    <th className="text-center" key={department.id}>{inx + 1}</th>
                                                    <td>{department.departmentName}</td>
                                                    <td className="text-center">
                                                        <a href="/#"><i onClick={(e) => edithandler(e, department.id)} className="fas fa-edit text-primary"></i></a>
                                                        <a href="/#" className="ms-2"><i onClick={(e) => deleteHandler(e, department.id)} className="fas fa-trash-alt text-danger"></i></a>
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

                {/*Modal for create and edit department*/}
                <Modal show={modalShow} onHide={handleModalClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>{id > 0 ? "Edit" : "Add"} Department</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={formik.handleSubmit}>
                        <Modal.Body>
                            <Input id="txtDepartment" label="Department name" type="text" labelSize="4"
                                frmField={formik.getFieldProps("departmentName")}
                                err = {formik.touched.departmentName && formik.errors.departmentName}
                                errMessage={formik.errors.departmentName}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" variant="secondary" onClick={handleModalClose}>Close</Button>
                            <Button type="submit" disabled={!formik.dirty || !formik.isValid} variant="primary">Save</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                
                {/*Modal for delete department*/}
                <Modal show={delModalShow} onHide={handleModalClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer className="text-center">
                        <Button type="button" variant="secondary" onClick={handleDelModalClose}>Close</Button>
                        <Button type="button" onClick={clickDelete} variant="danger">Delete anyway</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
}
 
export default Department;