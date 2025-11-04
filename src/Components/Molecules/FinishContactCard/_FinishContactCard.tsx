import { Card } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';
import React from 'react';
import { FinishActions } from '..';

const _FinishContactCard = reactive<Reptile.Props.FinishContactCardProps>(
    ({}, { onSelectExisting }) => {
        return (
            <Card className={'rt-finish-questions-card'}>
                <div style={{ margin: 'auto' }}>
                    Contact pagelizard@... for help
                </div>
                <FinishActions handleBackClick={() => onSelectExisting()} />
            </Card>
        );
    }
);

export default _FinishContactCard;
