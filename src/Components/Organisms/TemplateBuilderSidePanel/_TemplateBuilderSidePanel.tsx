import React, { useCallback } from 'react';
import clsx from 'clsx';
import {
    Divider,
    Tab,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from '@Reptile/Components/Atoms';
import {
    WidgetMenuActions,
    WidgetStyleContainer,
} from '@Reptile/Components/Molecules';
import {
    GlobalStylesPropertyGenerator,
    WidgetPropertyGenerator,
    WidgetsCollection,
} from '@Reptile/Components/Organisms';
import { controlled } from '@Reptile/Framework';
import { useController } from '@Reptile/Hooks';
import {
    TemplateActionsController,
    WidgetSettingsController,
} from '@Reptile/Store/Controllers';

import './_TemplateBuilderSidePanel.scss';

const WIDGETS_TABS: ['drag', 'edit', 'globalStyles'] = ['drag', 'edit', 'globalStyles'];

const WIDGETS_INDEX = {
    drag: 0,
    edit: 1,
    globalStyles: 2
};

const _TemplateBuilderSidePanel = controlled<
    Reptile.Props.TemplateBuilderSidePanelProps,
    Reptile.Controllers.ITemplateBuilderController
>(({ className, style, controller }) => {
    const widgetSettingsController = useController(
        WidgetSettingsController,
        controller,
        controller
    );
    const templateActionsController = useController(TemplateActionsController);

    const handleWidgetsTabSelect = useCallback(
        (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, idx: number) => {
            controller.mode = WIDGETS_TABS[idx];
        },
        [controller]
    );

    return (
        // <></>
        <div
            className={clsx('rt-template-builder-side-panel', className)}
            style={style}
        >
            <Text size='extra-large' color='dark-gray'>
                Widget Collection
            </Text>
            <Tabs
                selectedTabIndex={() => WIDGETS_INDEX[controller.mode]}
                onSelect={handleWidgetsTabSelect}
                type='raised'
            >
                <Tab label='Widgets' />
                <Tab label='Style' />
                <Tab label='Global Styles' />
            </Tabs>
            <Divider className='header-divider' />
            <TabPanels activeIndex={() => WIDGETS_INDEX[controller.mode]}>
                <TabPanel>
                    <WidgetsCollection controller={controller} />
                </TabPanel>
                <TabPanel>
                    <WidgetStyleContainer>
                        <WidgetPropertyGenerator
                            controller={widgetSettingsController}
                        />
                    </WidgetStyleContainer>
                </TabPanel>
                <TabPanel>
                    <WidgetStyleContainer>
                        <GlobalStylesPropertyGenerator
                            masterStyles={controller.masterStyles}
                            controller={widgetSettingsController}
                        />
                    </WidgetStyleContainer>
                </TabPanel>
            </TabPanels>
            <Divider className='action-divider' />
            <WidgetMenuActions controller={templateActionsController} />
        </div>
    );
});

export default _TemplateBuilderSidePanel;
