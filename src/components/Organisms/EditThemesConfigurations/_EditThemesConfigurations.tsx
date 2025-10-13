import { Text } from '@Reptile/Components/Atoms';
import {
    AlignmentProperty,
    ColorProperty,
    DisplayProperty,
    FontFamilyProperty,
    FontStyleProperty,
    SizeProperty,
    SpacingProperty,
} from '@Reptile/Components/Molecules';
import { reactive } from '@Reptile/Framework';
import React from 'react';

import './_EditThemesConfigurations.scss';

const _EditThemesConfigurations =
    reactive<Reptile.Props.EditThemesConfigurations>(({ styleThemes, selectorType }, {}) => {
        
        return (
            <div className='rt-themes-configurations'>
                <Text size='large' color='black' weight='semibold'>
                    Style Configurations
                </Text>

                {selectorType ===
                    'text' && (
                    <div
                        id='scrollbar'
                        className='themes-configurations-container'
                    >
                        <FontFamilyProperty
                            controller={styleThemes.fontFamily}
                        />
                        <ColorProperty controller={styleThemes.fontColor} />
                        <ColorProperty
                            controller={styleThemes.backgroundColor}
                        />
                        <AlignmentProperty controller={styleThemes.align} />
                        <FontStyleProperty controller={styleThemes.fontStyle} />
                        <SizeProperty controller={styleThemes.textSize} />
                        <SpacingProperty controller={styleThemes.padding} />
                        <DisplayProperty
                            controller={styleThemes.display}
                        />
                    </div>
                )}

                {selectorType ===
                    'image' && (
                    <div
                        id='scrollbar'
                        className='themes-configurations-container'
                    >
                        <AlignmentProperty controller={styleThemes.float} />
                        <SizeProperty controller={styleThemes.width}/>
                        <SpacingProperty controller={styleThemes.padding} />
                        <SpacingProperty controller={styleThemes.margin} />
                    </div>
                )}
            </div>
        );
    });
export default _EditThemesConfigurations;
