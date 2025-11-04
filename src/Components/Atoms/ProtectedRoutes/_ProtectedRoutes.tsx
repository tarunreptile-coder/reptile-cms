import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { reactive } from '@Reptile/Framework';
import { useDomain } from '@Reptile/Contexts';

const _ProtectedRoutes = reactive(() => {
    const store = useDomain();
    return store.auth.shouldAuthenticate ? <Navigate to="/login" /> : <Outlet />;
});

export default _ProtectedRoutes;
