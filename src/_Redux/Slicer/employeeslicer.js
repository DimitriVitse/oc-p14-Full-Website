import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    employeesList: [

    ],
}

export const employeeSlice = createSlice({
    name: "Employees",
    initialState,
    reducers: {
        addEmployee: (state, action) => {
            state.employeesList.push(action.payload.newEmployee)
        },
    },
}

)