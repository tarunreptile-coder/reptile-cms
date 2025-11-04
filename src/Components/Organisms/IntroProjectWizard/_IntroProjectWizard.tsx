import React from 'react';
import clsx from 'clsx';
import { controlled } from '@Reptile/Framework';
import {
    GlobeIcon,
    Image,
    SmartphoneIcon,
    Text,
} from '@Reptile/Components/Atoms';
import { ListItem, NewContentButton } from '@Reptile/Components/Molecules';
import ProjectImage from '~/../public/img/create-project.png';

import './_IntroProjectWizard.scss';

const _IntroProjectWizard = controlled<
    Reptile.Props.ProjectWizardProps,
    Reptile.Controllers.IProjectWizardController
>(({ className, style, controller }) => {
    return (
        <div
            className={clsx('rt-intro-project-wizard', className)}
            style={style}
        >
            <Image src={ProjectImage as string} height={200} width={200} />
            <Text size='extra-large' weight='bold' color='black'>
                Get started with your projects
            </Text>
            <Text size='small' color='light-gray'>
                Use &quot;New project&quot; button to create your first project
            </Text>
            <NewContentButton
                disabled={
                    controller.subscriptionStatus
                }
                title='New project'
            >
                {/* <ListItem
                    text='Web Project'
                    leftElement={<GlobeIcon />}
                    onClick={controller.startWebWizard.bind(controller)}
                /> */}
                <ListItem
                    text='App Project'
                    leftElement={<SmartphoneIcon />}
                    onClick={controller.startAppWizard.bind(controller)}
                />
            </NewContentButton>
        </div>
    );
});

export default _IntroProjectWizard;
