import React from 'react';

import './_BuildAppSettings.scss';
import { reactive } from '@Reptile/Framework';
import {
    AndroidIcon,
    AppleIcon,
    Button,
    DownloadIcon,
    QRCode,
    Text,
} from '@Reptile/Components/Atoms';
import { LOGOS } from '@Reptile/Assets';

const _BuildAppSettings = reactive<Reptile.Props.BuildAppSettings>(
    ({ selectedApp }, {}) => {
        const handleDownload = () => {
            if (selectedApp) {
                // Create an anchor element
                const anchor = document.createElement('a');

                // Set the href attribute to the SDK URL
                anchor.href = selectedApp.appInstallerUrl;

                // Set the download attribute to specify the default file name
                anchor.download = selectedApp.appInstallerUrl;

                anchor.click();
            }
        };

        return (
            <div className='rt-build-app-settings'>
                <div className='build-header'>
                    <Text color={'white'} weight={'bold'} size={'h2'}>
                        {`Build: ${selectedApp.versionName}, (${selectedApp.versionCode})`}
                    </Text>
                </div>
                <Text
                    color={'black'}
                    weight={'bold'}
                    size={'h3'}
                >{`Name: ${selectedApp.packageName}`}</Text>
                <div className='build-download'>
                    <Text color={'white'} weight={'bold'} size={'h4'}>
                        Download Link:
                    </Text>
                    <QRCode
                        width={150}
                        height={150}
                        className='build-qrcode'
                        value={selectedApp.appInstallerUrl}
                        src={LOGOS.SVG_MAIN_LOGO_2023_URL as string}
                    />
                    <Button
                        color='gray'
                        variant='contained'
                        className='build-download'
                        icon={<DownloadIcon />}
                        iconPosition='left'
                        onClick={handleDownload}
                        disabled={!selectedApp?.appInstallerUrl}
                    >
                        Download
                    </Button>
                </div>
                <div className='build-os'>
                    <Text
                        color={'black'}
                        weight={'bold'}
                        size={'h4'}
                        className='os-text'
                    >
                        {`OS: `}
                    </Text>
                    {selectedApp.oS === 'Android' ? (
                        <AndroidIcon className='icon' />
                    ) : (
                        <AppleIcon className='icon' />
                    )}
                </div>
                {selectedApp.endDateTime ? (
                    <Text color={'black'} weight={'bold'} size={'h4'}>
                        {`
                    Published: ${selectedApp.endDateTime
                        .toString()
                        .substring(0, 10)}`}
                    </Text>
                ) : null}
            </div>
        );
    }
);

export default _BuildAppSettings;
