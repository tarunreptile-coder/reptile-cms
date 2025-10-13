import React, { useCallback, useEffect } from 'react';
import {
    AccountBilling,
    EditAccount,
    EditProfile,
    MyAccountContent,
} from '@Reptile/Components/Organisms';
import { Card, Separator } from '@Reptile/Components/Atoms';
import { useInitController } from '@Reptile/Hooks';
import { controlled } from '@Reptile/Framework';

import './_AccountSettings.scss';

const _AccountSettingsContent = controlled<
    Reptile.Props.AccountProps,
    Reptile.Controllers.IAccountSettingsController
>(({ className, style, controller }) => {
    useInitController(controller);

    const handleModal = () => {
        controller.modal = !controller.modal;
    };

    const handleUpload = (file: File | null) => {
        if (file) {
            void controller.imageUpload(file);
        }
    };

    const handlePayment = () => {
        controller.navigateToPlan();
    };

    const handleFirstNameChange = useCallback(
        (newName: string) => {
            controller.firstName = newName;
        },
        [controller]
    );

    const handleLastNameChange = useCallback(
        (newName: string) => {
            controller.lastName = newName;
        },
        [controller]
    );

    const handleUsernameChange = useCallback(
        (newName: string) => {
            controller.username = newName;
        },
        [controller]
    );

    const handleEmailChange = useCallback(
        (newName: string) => {
            controller.email = newName;
        },
        [controller]
    );

    useEffect(() => {
        void controller.getCurrentUser();
        void controller.getFreeTrialStatus();
    }, [controller]);

    return (
        <div className='rt-account-settings'>
            <MyAccountContent>
                <EditProfile
                    avatarUrl={controller.avatarUrl}
                    usersPlan={controller.usersPlan}
                    modal={controller.modal}
                    usersFreeTrial={
                        !controller.trialStatus
                            ? controller.usersFreeTrial
                            : undefined
                    }
                    actionEnabled={controller.status}
                    handleModal={handleModal}
                    imageUpload={handleUpload}
                    makePayment={handlePayment}
                />
                <Separator bottom={40} />
                <EditAccount
                    firstName={controller.firstName}
                    lastName={controller.lastName}
                    username={controller.username}
                    email={controller.email}
                    actionEnabled={controller.status}
                    onFirstNameChange={handleFirstNameChange}
                    onLastNameChange={handleLastNameChange}
                    onUsernameChange={handleUsernameChange}
                    onEmailChange={handleEmailChange}
                    editDetails={() => void controller.editDetails()}
                />
                <Separator bottom={40} />
                <AccountBilling
                    editBoltOns={() => controller.editBoltOns()}
                    billingHistoryNavigate={() =>
                        controller.billingHistoryNavigate()
                    }
                    sendEmail={() => controller.sendEmail()}
                />
            </MyAccountContent>
        </div>
    );
});

export default _AccountSettingsContent;
