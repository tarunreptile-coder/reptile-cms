import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { reactive } from '@Reptile/Framework';
import { ROLES } from '@Reptile/Constants/Constants';

const _AdminUserRoutes = reactive(() => {
    return localStorage.getItem('role') === ROLES[1].value ||
        localStorage.getItem('role') === ROLES[2].value ? (
        <Outlet />
    ) : (
        <Navigate to='/content' />
    );
});

export default _AdminUserRoutes;
