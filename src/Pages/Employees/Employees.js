import React from 'react';
import Table from '@/Components/Datatable/Table';

import { NavLink } from 'react-router-dom';


const Employees = () => {
    return (
        <div>
            <NavLink to="/">Home</NavLink>
            <Table />
        </div>
    );
};

export default Employees;