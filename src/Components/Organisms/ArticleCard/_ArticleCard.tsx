import React, { useCallback } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { reactive } from '@Reptile/Framework';
import {
    Card,
    Image,
    SettingsIcon,
    Text,
    Trash2Icon,
} from '@Reptile/Components/Atoms';
import { ListItem, ThreeDotMenu } from '@Reptile/Components/Molecules';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import './_ArticleCard.scss';

const _ArticleCard = reactive<Reptile.Props.ContentEntityCardProps>(
    ({ className, entity }, { onClick, onClickDelete, onClickSettings }) => {
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

        const { attributes, listeners, setNodeRef, transform, transition } =
            useSortable({ id: entity.id });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        };

        return (
            <div
                className={clsx('rt-article-card', className)}
                style={style}
                ref={setNodeRef}
                {...attributes}
                {...listeners}
            >
                <Image
                    src={() => entity.imageUrl ?? undefined}
                    form='rounded'
                    width={220}
                    height={160}
                    onClick={handleClick}
                />
                <Card>
                    <ThreeDotMenu
                        title={() => entity.name}
                        dropDirection='up'
                        offset={16}
                    >
                        <ListItem
                            className='rt-article-card-list-item'
                            kind='error'
                            leftElement={<Trash2Icon />}
                            text='Delete'
                            onClick={handleClickDelete}
                        />
                        <ListItem
                            className='rt-article-card-list-item'
                            leftElement={<SettingsIcon />}
                            text='Settings'
                            size='lg'
                            onClick={handleClickSettings}
                        />
                    </ThreeDotMenu>
                    <Text
                        color='light-gray'
                        size='extra-small'
                        weight='regular'
                    >
                        {() =>
                            `Created: ${moment(entity.created).format(
                                'DD/MM/YYYY'
                            )}`
                        }
                    </Text>
                </Card>
            </div>
        );
    }
);

export default _ArticleCard;
