import React, { useCallback } from 'react';
import clsx from 'clsx';
import { Card, SettingsIcon, Trash2Icon } from '@Reptile/Components/Atoms';
import {
    ListItem,
    PublishStatus,
    ThreeDotMenu,
} from '@Reptile/Components/Molecules';
import { reactive } from '@Reptile/Framework';

import './_TemplateCard.scss';

type PlaceholderProps = {
    onClick: () => void;
};

const WebPlaceholder = ({ onClick }: PlaceholderProps) => {
    return (
        <div className='placeholder' onClick={onClick}>
            <div className='web' />
        </div>
    );
};

const AppPlaceholder = ({ onClick }: PlaceholderProps) => {
    return (
        <div className='placeholder' onClick={onClick}>
            <div className='app' />
        </div>
    );
};

const _TemplateCard = reactive<Reptile.Props.ContentEntityCardProps>(
    (
        { style, className, entity },
        { onClick, onClickDelete, onClickSettings }
    ) => {
        const handleClick = useCallback(() => {
            if (onClick) {
                onClick(entity.id);
            }
        }, [entity.id, onClick]);

        const handleClickDelete = useCallback(() => {
            if (onClickDelete) {
                onClickDelete(entity.id);
            }
        }, [entity.id, onClickDelete]);

        const handleClickSettings = useCallback(() => {
            if (onClickSettings) {
                onClickSettings(entity.id);
            }
        }, [entity.id, onClickSettings]);

        return (
            <div className={clsx('rt-template-card', className)} style={style}>
                <AppPlaceholder onClick={handleClick} />
                <Card>
                    <ThreeDotMenu
                        title={() => entity.name}
                        dropDirection='up'
                        offset={16}
                    >
                        <ListItem
                            className='rt-template-card-list-item'
                            kind='error'
                            leftElement={<Trash2Icon />}
                            text='Delete'
                            onClick={handleClickDelete}
                        />
                        <ListItem
                            className='rt-template-card-list-item'
                            leftElement={<SettingsIcon />}
                            text='Settings'
                            size='lg'
                            onClick={handleClickSettings}
                        />
                    </ThreeDotMenu>
                    <PublishStatus status='live' />
                </Card>
            </div>
        );
    }
);

export default _TemplateCard;
