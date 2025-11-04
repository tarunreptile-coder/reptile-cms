import { Card } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';
import React from 'react';

import './_IOSForm.scss';
import { FinishSteps } from '..';
import { FinishActions, InputField } from '@Reptile/Components/Molecules';

const _IOSForm = reactive<Reptile.Props.IOSFormProps>(
    (
        { step, submit, IOS, isDisabled },
        {
            onBackClick,
            onAction,
            onIOSChange,
            navigateToDocs,
            navigateToMail,
        }
    ) => {
        return (
            <Card className={'rt-ios-card'}>
                {step === 3 && (
                    <FinishSteps
                        title={'Account and Name'}
                        navigateToDocs={navigateToDocs}
                        navigateToMail={navigateToMail}
                    >
                        <InputField
                            label={'AppIdentifier'}
                            name={'appIdentifier'}
                            value={IOS.appIdentifier}
                            onChange={onIOSChange}
                        />
                        <InputField
                            label={'AppSpecificId'}
                            name={'appSpecificId'}
                            value={IOS.appSpecificId}
                            onChange={onIOSChange}
                        />
                    </FinishSteps>
                )}
                {step === 4 && (
                    <FinishSteps
                        title={'API keys'}
                        navigateToDocs={navigateToDocs}
                        navigateToMail={navigateToMail}
                    >
                        <InputField
                            label={'ApiKey'}
                            name={'apiKey'}
                            value={IOS.apiKey}
                            onChange={onIOSChange}
                        />
                        <InputField
                            label={'ApiKeyId'}
                            name={'apiKeyId'}
                            value={IOS.apiKeyId}
                            onChange={onIOSChange}
                        />
                    </FinishSteps>
                )}
                {step === 5 && (
                    <FinishSteps
                        title={'Certificate'}
                        navigateToDocs={navigateToDocs}
                        navigateToMail={navigateToMail}
                    >
                        <InputField
                            label={'p12FileName'}
                            name={'p12FileName'}
                            value={IOS.p12FileName}
                            onChange={onIOSChange}
                        />
                        <InputField
                            label={'p12Password'}
                            name={'p12Password'}
                            value={IOS.p12Password}
                            onChange={onIOSChange}
                        />
                    </FinishSteps>
                )}
                {step === 6 && (
                    <FinishSteps
                        title={'Provision'}
                        navigateToDocs={navigateToDocs}
                        navigateToMail={navigateToMail}
                    >
                        <InputField
                            label={'ProvisioningProfile'}
                            name={'provisioningProfile'}
                            value={IOS.provisioningProfile}
                            onChange={onIOSChange}
                        />
                        <InputField
                            label={'PAT'}
                            name={'pat'}
                            value={IOS.pat}
                            onChange={onIOSChange}
                        />
                    </FinishSteps>
                )}

                <FinishActions
                    submit={submit}
                    handleActionClick={onAction}
                    handleBackClick={onBackClick}
                    isDisabled={isDisabled}
                />
            </Card>
        );
    }
);

export default _IOSForm;
