// eslint-disable-next-line no-unused-vars
import React from "react";
import { useLastLocation } from 'react-router-last-location';

export function withLastLocation(Component) {
    return function WrappedComponent(props) {
        const lastLocation = useLastLocation();
        return <Component {...props} lastLocation={lastLocation} />;
    }
}
