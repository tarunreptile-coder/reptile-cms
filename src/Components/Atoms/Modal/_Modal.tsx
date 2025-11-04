import React, { useCallback, useRef } from 'react';
import clsx from 'clsx';
import { Portal } from '@Reptile/Components/Atoms';
import { useOutsideClick } from '~/Hooks';

import './_Modal.scss';
import { reactive } from '@Reptile/Framework';

const _Modal = reactive<Reptile.Props.ModalProps>(
    ({ className, children }, { style, visible, onClose }) => {
        const ref = useRef<HTMLDivElement>(null);
        const handleClose = useCallback(() => {
            if (onClose) {
                onClose();
            }
        }, [onClose]);
        useOutsideClick(ref, handleClose);

        return (
            <Portal
                className={clsx('rt-modal', 'rt-blurred-background', className)}
                style={style}
                active={visible}
            >
                <div className='modal-container' ref={ref}>
                    {children}
                </div>
            </Portal>
        );
    }
);

export default _Modal;
