import { reactive } from '@Reptile/Framework';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';

const QRCode = reactive<Reptile.Props.QRCodeProps>(
    ({ value, src, className, height, width }, {}) => {
        return (
            <QRCodeSVG
            width={width ?? 100}
            height={height ?? 100}
                className={className}
                value={value}
                imageSettings={{
                    src: src,
                    height: 25,
                    width: 25,
                    excavate: false,
                }}
            />
        );
    }
);

export default QRCode;
