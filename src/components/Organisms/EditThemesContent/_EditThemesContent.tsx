import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';
import React, { useCallback, useEffect } from 'react';

import {
    EditThemesCard,
    EditThemesConfigurations,
} from '@Reptile/Components/Organisms';
import { ThemesStyleDisplay } from '@Reptile/Components/Molecules';
import { useParams } from 'react-router-dom';

import './_EditThemesContent.scss';

const _EditThemesContent = controlled<
    Reptile.Props.BaseProps,
    Reptile.Controllers.IEditThemesController
>(({ controller }) => {
    useInitController(controller);

    const { entityId } = useParams();

    useEffect(() => {
        void controller.getTheme(entityId);
    }, [controller, entityId]);

    const handleRuleIndex = useCallback(
        (i: number) => {
            controller.ruleId !== i
                ? (controller.ruleId = i)
                : (controller.ruleId = -1);
        },
        [controller]
    );

    const handleMeasureChange = useCallback(
        (_: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
            controller.filterIndex = index;
        },
        [controller]
    );

    const handleSelectorType = useCallback(
        (e: string) => {
            controller.selectorType = e;
        },
        [controller]
    );

    return (
        <div className={'rt-edit-themes'}>
            <EditThemesCard
                rules={controller.theme?.rules}
                filter={controller.filter}
                filterIndex={controller.filterIndex}
                filters={controller.filters}
                ruleId={controller.ruleId}
                handleMeasureChange={handleMeasureChange}
                handleRuleIndex={handleRuleIndex}
                handleSelectorType={handleSelectorType}
            />

            {controller.ruleId !== -1 && controller.ThemeStyles ? (
                <EditThemesConfigurations
                    styleThemes={controller.ThemeStyles}
                    selectorType={controller.selectorType}
                />
            ) : (
                <ThemesStyleDisplay
                    rules={controller.theme?.rules}
                    handleSelectorType={handleSelectorType}
                    selectorType={controller.selectorType}
                />
            )}
        </div>
    );
});
export default _EditThemesContent;
