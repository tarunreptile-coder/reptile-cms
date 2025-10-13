import { Button, Text } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';
import React from 'react';

import './_ThemesStyleDisplay.scss';
import { CssService } from '@Reptile/Services';

const _ThemesStyleDisplay = reactive<Reptile.Props.ThemeStyleDisplayProps>(
    ({ rules, selectorType }, { handleSelectorType }) => {
        return (
            <div className='rt-themes-style-display'>
                <Text size='large' color='black' weight='semibold'>
                    Style Settings
                </Text>
                <div className='filter-tabs'>
                    <Button
                        className={'text-button'}
                        color={'primary'}
                        variant={
                            selectorType === 'text' ? 'contained' : 'outlined'
                        }
                        onClick={() => {
                            handleSelectorType('text');
                        }}
                    >
                        Text
                    </Button>
                    <Button
                        className={'image-button'}
                        color={'primary'}
                        variant={
                            selectorType === 'image' ? 'contained' : 'outlined'
                        }
                        onClick={() => {
                            handleSelectorType('image');
                        }}
                    >
                        Image
                    </Button>
                </div>
                <div id='scrollbar' className='themes-style-container'>
                    {rules &&
                        rules
                            .filter((style) => {
                                return style.styleType === selectorType;
                            })
                            .map((style, i) => {
                                return style.selectorName ? (
                                    <div className='style-container'>
                                        <div 
                                            style={CssService.getInlineJsStyle(
                                                style.declarations
                                            )}
                                            className='article-style'
                                            key={i}
                                        >
                                            <div className='ellipsis'>
                                                {style.selectorName}
                                            </div>
                                        </div>
                                    </div>
                                ) : null;
                            })}
                </div>
            </div>
        );
    }
);
export default _ThemesStyleDisplay;
