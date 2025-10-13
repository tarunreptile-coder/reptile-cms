import React, { useCallback } from 'react';
import clsx from 'clsx';
import {
    Divider,
    ErrorIcon,
    Modal,
    Separator,
    Tab,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from '@Reptile/Components/Atoms';
import {
    AppMenuActions,
    ModalTitle,
    WidgetStyleContainer,
} from '@Reptile/Components/Molecules';
import {
    AddScreenModal,
    AppWidgetsCollection,
    ModalActions,
    ModalContent,
    PreBuiltLoaders,
    WidgetPropertyGenerator,
} from '@Reptile/Components/Organisms';
import { controlled } from '@Reptile/Framework';
import { useController } from '@Reptile/Hooks';
import { WidgetSettingsController } from '@Reptile/Store/Controllers';

import './_AppTemplateBuilderSidePanel.scss';

const WIDGETS_TABS: ['drag', 'edit'] = ['drag', 'edit'];

const WIDGETS_INDEX = {
    drag: 0,
    edit: 1,
};

const _AppTemplateBuilderSidePanel = controlled<
    Reptile.Props.TemplateBuilderSidePanelProps,
    Reptile.Controllers.IAppBuildController
>(({ className, style, controller }) => {
    const widgetSettingsController = useController(
        WidgetSettingsController,
        controller,
        controller
    );

    const handleWidgetsTabSelect = useCallback(
        (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, idx: number) => {
            controller.mode = WIDGETS_TABS[idx];
        },
        [controller]
    );

    const handleModalClick = useCallback(() => {
        controller.screenModal = !controller.screenModal;
    }, [controller]);
    
    const handleErrorModalClick = useCallback(() => {
        controller.showErrorModal = !controller.showErrorModal;
    }, [controller]);

    const handleNameChange = useCallback(
        (name: string) => {
            controller.screenName = name;
        },
        [controller]
    );

    const handleUpdateTemplate = useCallback(() => {
        void controller.updateTemplate();
    }, [controller]);

    const handleResetTemplate = useCallback(() => {
        void controller.resetTemplate();
    }, [controller]);

    const handleSetTemplate = useCallback(() => {
        void controller.setTemplate();
    }, [controller]);

    const isLoadSpinnerScreen = controller.activePage === 'Load Spinner';
    return (
        <div
            className={clsx('rt-template-builder-side-panel', className)}
            style={style}
        >
            <Text size='extra-large' color='dark-gray'>
                {controller.activeWidget?.friendlyName
                    ? controller.activeWidget?.friendlyName
                    : 'Widget Collection'}
            </Text>
            {isLoadSpinnerScreen && (
                <Tabs
                    selectedTabIndex={() => WIDGETS_INDEX[controller.mode]}
                    onSelect={handleWidgetsTabSelect}
                    type='raised'
                >
                    <Tab label='Pre-Built Loaders' />
                    <Tab label='Custom Loader' />
                </Tabs>
            )}
            {!isLoadSpinnerScreen && (
                <>
                    {!(
                        controller.layouts
                            ?.filter((e) => e.name === 'General')[0]
                            .layouts.find((e) => e.name === controller.activePage)
                            ?.name || controller.activePage === 'Splash'
                    ) ? (
                        <Tabs
                            selectedTabIndex={() => WIDGETS_INDEX[controller.mode]}
                            onSelect={handleWidgetsTabSelect}
                            type='raised'
                        >
                            <Tab label='Widgets' />
                            <Tab label='Style' />
                        </Tabs>
                    ) : WIDGETS_INDEX[controller.mode] == 0 ? null : (
                        <Tabs
                            selectedTabIndex={() => WIDGETS_INDEX[controller.mode]}
                            onSelect={handleWidgetsTabSelect}
                            type='raised'
                        >
                            <Tab label='Unselect' />
                        </Tabs>
                    )}
                </>
            )}
            <Divider className='header-divider' />
            {isLoadSpinnerScreen && (
                <TabPanels
                    activeIndex={() => WIDGETS_INDEX[controller.mode]}
                >
                    <TabPanel>
                        <PreBuiltLoaders controller={controller} />
                    </TabPanel>
                    <TabPanel>
                        <WidgetStyleContainer>
                            <WidgetPropertyGenerator
                                isFromAppBuild={true}
                                controller={widgetSettingsController}
                            />
                        </WidgetStyleContainer>
                    </TabPanel>
                </TabPanels>
            )}
            {!isLoadSpinnerScreen && (
                <TabPanels
                    activeIndex={() =>
                        !(
                            controller.layouts
                                ?.filter((e) => e.name === 'General')[0]
                                .layouts.find(
                                    (e) => e.name === controller.activePage
                                )?.name || controller.activePage === 'Splash'
                        )
                            ? WIDGETS_INDEX[controller.mode]
                            : 1
                    }
                >
                    <TabPanel>
                        <AppWidgetsCollection controller={controller} />
                    </TabPanel>
                    <TabPanel>
                        <WidgetStyleContainer>
                            <WidgetPropertyGenerator
                                isFromAppBuild={true}
                                controller={widgetSettingsController}
                            />
                        </WidgetStyleContainer>
                    </TabPanel>
                </TabPanels>
            )}
            <Divider className='action-divider' />
            <AppMenuActions
                onSave={handleUpdateTemplate}
                onReset={handleResetTemplate}
                onModalChange={handleModalClick}
            />

            <Modal visible={() => controller.screenModal}>
                <AddScreenModal
                    title={'Add Screen'}
                    name={() => controller.screenName ?? ''}
                    actionEnabled={!controller.screenName}
                    onCancelClick={handleModalClick}
                    onNameChange={handleNameChange}
                    onSaveClick={handleSetTemplate}
                />
            </Modal>

            <Modal visible={() => controller.showErrorModal}>
            <ModalTitle icon={<ErrorIcon />} title={'Add Required Fields'} />
                <Separator bottom={30} />
                <ModalContent>
                    <ul>
                        {controller.widgetErrors?.map((error, index) => (
                            <li key={index}><Text color={'black'}>{error}</Text></li>
                        ))}
                    </ul>
                </ModalContent>
                <Separator bottom={50} />
                <ModalActions onCancelClick={handleErrorModalClick}/>
            </Modal>
        </div>
    );
});

export default _AppTemplateBuilderSidePanel;
