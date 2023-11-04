import { configureStore } from "@reduxjs/toolkit";

import { employeeSlice } from "@/_Redux/Slicer/employeeslicer.js";

export const store = configureStore({
    reducer: {
        Employees: employeeSlice.reducer,
    }
})