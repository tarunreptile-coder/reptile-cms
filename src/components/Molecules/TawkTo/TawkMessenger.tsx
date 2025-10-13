import React from 'react';
   import  TawkMessengerReact from '@tawk.to/tawk-messenger-react'

   interface TawkToWidgetProps {
    propertyId: string;
    widgetId: string;
}

const TawkMessenger: React.FC<TawkToWidgetProps> = () => {
    const propertyId = '6695075cbecc2fed6924fba3';
    const widgetId = '1i2r29gtb';
    return (
        <div className="TawkToWidget">
            <TawkMessengerReact
                propertyId={propertyId}
                widgetId={widgetId}
            />
        </div>
    );
}

export default TawkMessenger;