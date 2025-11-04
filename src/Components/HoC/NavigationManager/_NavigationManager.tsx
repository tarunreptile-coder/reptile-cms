import React from 'react';
import { reactive } from '@Reptile/Framework';
import { useNavigate, useParams } from 'react-router-dom';
import { useUiState } from '@Reptile/Contexts';
import { useInitController } from '@Reptile/Hooks';

const _NavigationManager = reactive<React.PropsWithChildren>(({
    children,
}) => {
    const params = useParams();
    const navigate = useNavigate();
    const uiState = useUiState();

    useInitController(uiState.navigation, params, navigate);

    return (
        <>
            {children}
        </>
    )
});

export default _NavigationManager;
