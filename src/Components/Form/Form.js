import React, { useState } from 'react';
import { Modal } from '@dimss/oc-p14-modal';
import './Form.css'

import { states } from '@/Assets/Data/states';
import { departements } from '@/Assets/Data/departements';

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { format } from 'date-fns';

import { useDispatch } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const dispatch = useDispatch()
    const [modalShown, toggleModal] = useState(false);

    const navigate = useNavigate();

    const initialValues = {
        firstname: "",
        lastname: "",
        birth: "",
        startdate: "",
        street: "",
        state: "",
        city: "",
        department: "",
        zipcode: ""
    };

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required("Veuillez entrer un prénom"),
        lastname: Yup.string().required("Veuillez entrer un nom"),
        birth: Yup.string().required("Veuillez entrer une date de naissance"),
        startdate: Yup.string().required("Veuillez entrer une date de début"),
        street: Yup.string().required("Veuillez entrer une adresse"),
        state: Yup.string().required("Veuillez sélectionner un état"),
        city: Yup.string().required("Veuillez entrer une adresse"),
        department: Yup.string().required("Veuillez sélectionner une section"),
        zipcode: Yup.number().required("Veuillez entrer un code postal"),
    });


    const formatDateToISO = (date, timeZone) => {
        return format(new Date(date), 'dd-MM-yyyy', { timeZone });
    };

    const onSubmit = (e) => {

        const timeZone = 'Europe/Paris';

        let newEmployee = {
            firstname: e.firstname,
            lastname: e.lastname,
            birth: formatDateToISO(e.birth, timeZone),
            startdate: formatDateToISO(e.startdate, timeZone),
            street: e.street,
            state: e.state,
            city: e.city,
            department: e.department,
            zipcode: e.zipcode
        }

        console.log(newEmployee)
        dispatch({ type: "Employees/addEmployee", payload: { newEmployee } })

        toggleModal(!modalShown);

        setTimeout(() => navigate('/employees'), 3000)
    };

    return (
        <div >

            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form autoComplete='off' className='form'>
                    <fieldset className='create'>
                        <legend>Create an Employee</legend>

                        <div className='identity'>
                            <div className="input-wrapper">
                                <label htmlFor="firstname">First Name</label>
                                <Field className="wrapper-padding" name="firstname" type="text" placeholder="First Name" autoComplete="off"></Field>
                                <ErrorMessage name="firstname" component="p" className='errorMessage' />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="lastname">Last Name</label>
                                <Field className="wrapper-padding" name="lastname" type="text" placeholder="Last Name" autoComplete="off"></Field>
                                <ErrorMessage name="lastname" component="p" className='errorMessage' />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="birth">Date of Birth</label>
                                <Field className="wrapper-padding" name="birth" type="text" placeholder="Date of Birth" autoComplete="off">
                                    {({ field, form }) => (
                                        <DatePicker dateFormat="dd/MM/yyyy" className="wrapper-padding" placeholderText="Date of Birth" id="birth" {...field} selected={field.value} onChange={(date) => form.setFieldValue(field.name, date)} />
                                    )}
                                </Field>
                                <ErrorMessage name="birth" component="p" className='errorMessage' />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="startdate">Start Date</label>
                                <Field className="wrapper-padding" name="startdate" type="text" placeholder="Start Date" autoComplete="off">
                                    {({ field, form }) => (
                                        <DatePicker dateFormat="dd/MM/yyyy" className="wrapper-padding" placeholderText="Start Date" id="startdate" {...field} selected={field.value} onChange={(date) => form.setFieldValue(field.name, date)} />
                                    )}
                                </Field>
                                <ErrorMessage name="startdate" component="p" className='errorMessage' />
                            </div>
                        </div>

                        <fieldset className='address'>
                            <legend>Address</legend>
                            <div className="input-wrapper">
                                <label htmlFor="street">Street</label>
                                <Field className="wrapper-padding" name="street" type="text" placeholder="Street" autoComplete="off"></Field>
                                <ErrorMessage name="street" component="p" className='errorMessage' />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="state">State</label>
                                <Field as='select' name="state">
                                    <option disabled value="">Choose state</option>
                                    {
                                        states.map((option, index) => {
                                            return (
                                                <option key={option.name + index} value={option.abbreviation}>{option.name}</option>
                                            )
                                        })
                                    }
                                </Field>
                                <ErrorMessage name="state" component="p" className='errorMessage' />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="city">City</label>
                                <Field className="wrapper-padding" name="city" type="text" placeholder="City" autoComplete="off"></Field>
                                <ErrorMessage name="city" component="p" className='errorMessage' />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="department">Department</label>
                                <Field as='select' name="department">
                                    <option disabled value="">Choose a department</option>
                                    {
                                        departements.map((option, index) => {
                                            return (
                                                <option key={option + index} value={option}>{option}</option>
                                            )
                                        })
                                    }
                                </Field>
                                <ErrorMessage name="department" component="p" className='errorMessage' />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="zipcode">Zip Code</label>
                                <Field className="wrapper-padding" name="zipcode" type="text" placeholder="Zip Code" autoComplete="off"></Field>
                                <ErrorMessage name="zipcode" component="p" className='errorMessage' />
                            </div>
                        </fieldset>
                    </fieldset>
                    <button className="save-button" type='submit'>Save</button>
                </Form>
            </Formik>
            <Modal
                shown={modalShown}
                close={() => {
                    toggleModal(false);
                }}
                children={<h1>Employee created</h1>}
            />
        </div>





    );
}

export default Create;