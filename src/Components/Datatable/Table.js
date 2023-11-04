import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { employeeSelector } from '@/_Redux/Selector/employeeselector';

const Table = () => {


    const { employeesList } = useSelector(employeeSelector);
    const [searchText, setSearchText] = useState('');


    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'firstname', headerName: 'First Name', width: 150, editable: true },
        { field: 'lastname', headerName: 'Last Name', width: 150, editable: true },
        { field: 'startdate', headerName: 'Start Date', width: 150, editable: true },
        { field: 'department', headerName: 'Department', width: 150, editable: true },
        { field: 'birth', headerName: 'Date of Birth', width: 150, editable: true },
        { field: 'street', headerName: 'Street', width: 150, editable: true },
        { field: 'city', headerName: 'City', width: 150, editable: true },
        { field: 'state', headerName: 'State', width: 150, editable: true },
        { field: 'zipcode', headerName: 'Zip Code', width: 150, editable: true },
    ];

    const filteredRows = employeesList.filter(e =>
        e.firstname.toLowerCase().includes(searchText.toLowerCase()) ||
        e.lastname.toLowerCase().includes(searchText.toLowerCase()) ||
        e.department.toLowerCase().includes(searchText.toLowerCase()) ||
        e.street.toLowerCase().includes(searchText.toLowerCase()) ||
        e.city.toLowerCase().includes(searchText.toLowerCase()) ||
        e.state.toLowerCase().includes(searchText.toLowerCase()) ||
        e.zipcode.includes(searchText) ||
        e.birth.includes(searchText) ||
        e.startdate.includes(searchText)
    );

    const rows = filteredRows.map((e, index) => ({
        id: index,
        firstname: e.firstname,
        lastname: e.lastname,
        startdate: e.startdate,
        department: e.department,
        birth: e.birth,
        street: e.street,
        city: e.city,
        state: e.state,
        zipcode: e.zipcode
    }));

    return (
        <div>
            <Box sx={{ marginRight: 2, display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                <TextField label="Rechercher" variant="outlined" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            </Box>
            <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10, 25, 50, 100]} disableRowSelectionOnClick />
            </Box>
        </div>
    );
};

export default Table;