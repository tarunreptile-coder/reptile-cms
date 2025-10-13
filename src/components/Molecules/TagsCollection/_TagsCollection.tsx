import React, { useCallback } from 'react';
import clsx from 'clsx';
import { Button, Chip, PlusIcon } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';

import './_TagsCollection.scss';

const _TagsCollection = reactive<Reptile.Props.TagsCollectionProps>(
    (
        { className, style, editable, tags },
        { disabled, onTagAdd, onTagRemove, onTagUpdate }
    ) => {
        const handleTag = useCallback(() => {
            if (onTagAdd) {
                onTagAdd('');
            }
        }, [onTagAdd]);

        return (
            <div
                className={clsx('rt-tags-collection', className)}
                style={style}
            >
                {!!editable && (
                    <Button
                        icon={<PlusIcon />}
                        iconPosition='left'
                        color='primary'
                        variant='link'
                        onClick={handleTag}
                        disabled={disabled}
                    >
                        Add a tag
                    </Button>
                )}
                <div className='tags-container'>
                    {(tags ?? []).map((tag, idx) => (
                        <Chip
                            key={idx}
                            value={tag}
                            editable={editable}
                            disabled={disabled}
                            onChange={(event) => {
                                if (onTagUpdate) {
                                    onTagUpdate(idx, event.target.value);
                                }
                            }}
                            onEmptyBlur={() => {
                                if (onTagRemove) {
                                    onTagRemove(idx);
                                }
                            }}
                            onClose={() => {
                                if (onTagRemove) {
                                    onTagRemove(idx);
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }
);

export default _TagsCollection;
