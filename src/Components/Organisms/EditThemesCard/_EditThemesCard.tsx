import { Card, Text } from '@Reptile/Components/Atoms';
import { ThemesFilter } from '@Reptile/Components/Molecules';
import { reactive } from '@Reptile/Framework';
import React from 'react';

import './_EditThemesCard.scss';
import { CssService } from '@Reptile/Services';

const _EditThemesCard = reactive<Reptile.Props.EditThemesCard>(
    (
        { rules, ruleId, filter, filters, filterIndex },
        { handleMeasureChange, handleRuleIndex, handleSelectorType }
    ) => {
        return (
            <Card className='rt-edit-themes-card'>
                <div className='filter-container'>
                    <Text
                        weight={'semibold'}
                        color={'black'}
                        className={'filter-text'}
                    >
                        Filter:
                    </Text>
                    <ThemesFilter
                        className={'filter'}
                        filter={filter}
                        filterIndex={filterIndex}
                        filters={filters}
                        handleMeasureChange={handleMeasureChange}
                    />
                </div>
                <div id='scrollbar' className='edit-themes-container'>
                    {rules &&
                        rules
                            .filter((style) => {
                                return filter === 'both'
                                    ? style
                                    : style.styleType === filter;
                            })
                            .map((style, i) => {
                                return style.selectorName ? (
                                    <li className='edit-themes-list' key={i}>
                                        <div
                                            className='edit-theme-selector'
                                            onClick={() => {
                                                handleRuleIndex(
                                                    rules.findIndex(
                                                        (rule) =>
                                                            rule.name ===
                                                            style.name
                                                    )
                                                ),
                                                    handleSelectorType(
                                                        style.styleType
                                                    );
                                            }}
                                        >
                                            {style.selectorName}
                                        </div>
                                        <div
                                            style={{
                                                display:
                                                    rules[ruleId]?.name ==
                                                    style.name
                                                        ? 'block'
                                                        : 'none',
                                                borderBottom:
                                                    '1px solid #678898',
                                                borderTop: '1px solid #6f42c1',
                                                width: '100%',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {style.styleType === 'image' ? (
                                                <div>
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipiscing elit.
                                                    Cras pellentesque metus in
                                                    rutrum eleifend. Etiam nec
                                                    aliquam turpis. Integer nunc
                                                    nisl, volutpat et semper
                                                    eget, rhoncus eget sapien.
                                                    Phasellus lobortis ligula et
                                                    neque viverra venenatis. Sed
                                                    est diam, iaculis nec nibh
                                                    non, dapibus accumsan dui.
                                                    In dapibus sodales
                                                    ultricies. Nam imperdiet
                                                    nibh non gravida rhoncus.
                                                    Orci varius natoque
                                                    penatibus et magnis dis
                                                    parturient montes, nascetur
                                                    ridiculus mus.
                                                    <div
                                                        style={CssService.getInlineJsStyle(
                                                            style.declarations
                                                        )}
                                                    >
                                                        <div className='template-image' />
                                                    </div>
                                                    Donec imperdiet, eros eget
                                                    laoreet facilisis, leo
                                                    tortor posuere nisi, sit
                                                    amet blandit mi quam ut
                                                    enim. Proin lobortis ex
                                                    odio, sed pellentesque
                                                    turpis imperdiet in.
                                                    Pellentesque in aliquam
                                                    tortor, vel convallis purus.
                                                    Ut lobortis enim sit amet
                                                    porta elementum. Sed
                                                    placerat consectetur ipsum,
                                                    non faucibus magna lacinia
                                                    et. Proin tellus ligula,
                                                    ornare at velit id,
                                                    facilisis molestie dui.
                                                    Phasellus volutpat quis
                                                    purus eget malesuada. Nunc
                                                    et neque vel dui pharetra
                                                    egestas. Pellentesque id
                                                    vestibulum tellus. Praesent
                                                    pharetra, sem vel pulvinar
                                                    rutrum, felis neque
                                                    consectetur mauris,
                                                    ullamcorper elementum sem
                                                    ante a urna. Mauris varius
                                                    nisi in eros dignissim,
                                                    vitae varius ante rutrum.
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipiscing elit.
                                                    Cras pellentesque metus in
                                                    rutrum eleifend. Etiam nec
                                                    aliquam turpis. Integer nunc
                                                    nisl, volutpat et semper
                                                    eget, rhoncus eget sapien.
                                                    Phasellus lobortis ligula et
                                                    neque viverra venenatis.
                                                </div>
                                            ) : null}

                                            {style.styleType === 'text' ? (
                                                <div
                                                    style={CssService.getInlineJsStyle(
                                                        style.declarations
                                                    )}
                                                >
                                                    The quick brown fox jumps
                                                    over the lazy dog
                                                </div>
                                            ) : null}
                                        </div>
                                    </li>
                                ) : undefined;
                            })}
                </div>
            </Card>
        );
    }
);
export default _EditThemesCard;
