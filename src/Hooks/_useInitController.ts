import React, { useEffect } from 'react';

const _useInitController = <T extends readonly unknown[]>(controller: Reptile.Controllers.IController<T>, ...args: T) => {
    useEffect(() => {
        void controller.initialize(...args);
    }, [controller, ...args, ...controller.deps]);
}

export default _useInitController;
