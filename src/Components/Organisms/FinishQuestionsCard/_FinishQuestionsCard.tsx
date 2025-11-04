import { Button, Card, Text } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';
import React from 'react';

import './_FinishQuestionsCard.scss';
import { FinishActions } from '@Reptile/Components/Molecules';

const _FinishCard = reactive<Reptile.Props.FinishCardProps>(
    ({ button1, button2, title }, { onBackClick }) => {

        return (
            <Card className={'rt-finish-questions-card'}>
                    <>
                        <Text
                            color={'black'}
                            size={'h1'}
                            weight={'bold'}
                            className={'finish-questions-header'}
                        >
                            {title}
                        </Text>
                        <div className='finish-questions-buttons'>
                            <Button
                                onClick={() => button1.action()}
                                size={'xl'}
                                color={'primary'}
                                variant={'outlined'}
                            >
                                <Text
                                    color={'black'}
                                    size={'large'}
                                    weight={'bold'}
                                >
                                    {button1.name}
                                </Text>
                            </Button>
                            <Button
                                onClick={() => button2.action()}
                                size={'xl'}
                                color={'primary'}
                                variant={'outlined'}
                                disabled={button2?.disabled}
                            >
                                <Text
                                    color={'black'}
                                    size={'large'}
                                    weight={'bold'}
                                >
                                    {button2.name}
                                </Text>
                            </Button>
                        </div>
                    </>
               
                {onBackClick && <FinishActions handleBackClick={onBackClick} />}
            </Card>
        );
    }
);

export default _FinishCard;
