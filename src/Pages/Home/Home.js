import React from 'react';
import Form from '@/Components/Form/Form';
import { NavLink } from 'react-router-dom';
import './Home.css'


const Home = () => {
    return (
        <main>
            <NavLink className='viewemployees' to="/employees">View Current Employees</NavLink>
            <Form />
        </main>
    );
};

export default Home;