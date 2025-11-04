import React from 'react';
import { WysiwygTemplate } from '@Reptile/Components/Templates';
import {
    ContentImages,
    ContentSettings,
    ContentStyles,
    Header,
    HelpSettings,
    TextEditor,
    TreeView,
} from '@Reptile/Components/Organisms';
import {
    Breadcrumbs,
    ContentActions,
    SettingsMenuTitle,
} from '@Reptile/Components/Molecules';
import { Page } from '@Reptile/Components/Atoms';
import { useController } from '@Reptile/Hooks';
import {
    ArticleActionsController,
    ArticleEditorController,
    ArticleImagesController,
    ArticleSettingsController,
    ArticleStylesController,
    CmsBreadcrumbsController,
    CmsHeaderController,
    HelpSettingsController,
} from '@Reptile/Store/Controllers';
import { useUiState } from '@Reptile/Contexts';
import { HELPMENU } from '@Reptile/Constants/helpMenu';

const _Wysiwyg = () => {
    const headerController = useController(CmsHeaderController);
    const breadcrumbsController = useController(CmsBreadcrumbsController);
    const textEditorController = useController(ArticleEditorController);
    const contentSettingsController = useController(ArticleSettingsController);
    const contentImagesController = useController(
        ArticleImagesController,
        textEditorController
    );
    const contentStylesController = useController(
        ArticleStylesController,
        textEditorController
    );
    const contentActionsController = useController(ArticleActionsController);
    const treeViewController = useUiState().treeView;
    const helpSettingsController = useController(HelpSettingsController);

    return (
        <Page>
            <WysiwygTemplate
                header={<Header controller={headerController} />}
                treeView={<TreeView controller={treeViewController} />}
                navigationBar={
                    <Breadcrumbs controller={breadcrumbsController} />
                }
                content={<TextEditor controller={textEditorController} />}
                sidebarTitle={<SettingsMenuTitle />}
                sidebarTabs={[
                    {
                        title: 'Settings',
                        element: (
                            <ContentSettings
                                controller={contentSettingsController}
                            />
                        ),
                    },
                    {
                        title: 'Images',
                        element: (
                            <ContentImages
                                controller={contentImagesController}
                            />
                        ),
                    },
                    {
                        title: 'Styles',
                        element: (
                            <ContentStyles
                                controller={contentStylesController}
                            />
                        ),
                    },
                ]}
                sidebarActions={
                    <ContentActions controller={contentActionsController} />
                }
                helpMenu={
                    <HelpSettings
                        controller={helpSettingsController}
                        helpMenu={HELPMENU.wysiwig}
                    />
                }
            />
        </Page>
    );
};

export default _Wysiwyg;
