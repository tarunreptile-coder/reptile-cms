import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Flipped, spring } from 'react-flip-toolkit';
import {
    Button,
    DownloadIcon,
    PlusIcon,
    Trash2Icon,
} from '@Reptile/Components/Atoms';
import { TextArea, Tooltip } from '@Reptile/Components/Molecules';
import { reactive } from '@Reptile/Framework';

import './_InsertableImage.scss';

const _InsertableImage = reactive<Reptile.Props.InsertableImageProps>(
    (
        { className, style, image, active, size },
        { onSelect, onInsertImage, onDownloadImage, onRemoveImage }
    ) => {
        const root = useRef<HTMLImageElement>(null);
        const [captionText, setCaptionText] = useState('');

        const handleAppear = useCallback(
            (el: HTMLElement) =>
                spring({
                    onUpdate: (val) => {
                        el.style.opacity = `${val as number}`;
                    },
                }),
            []
        );

        const handleDisappear = useCallback(
            (el: HTMLElement, index: number, removeElement: () => void) => {
                spring({
                    config: { overshootClamping: true },
                    onUpdate: (val) => {
                        el.style.opacity = `${1 - (val as number)}`;
                    },
                    delay: index * 50,
                    onComplete: removeElement,
                });

                return () => {
                    el.style.opacity = '';
                    removeElement();
                };
            },
            []
        );

        const handleOptionsAppear = useCallback(
            (el: HTMLElement) =>
                spring({
                    onUpdate: (val) => {
                        el.style.opacity = `${val as number}`;
                        el.style.transform = `translateY(-${
                            (1 - (val as number)) * 100
                        }%)`;
                    },
                }),
            []
        );

        const handleCaptionTextChange = useCallback(
            (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setCaptionText(e.target.value);
            },
            []
        );
        const handleSelect = useCallback(
            (e: React.MouseEvent<HTMLImageElement>) => {
                if (onSelect) {
                    onSelect(e.target as HTMLImageElement);
                }
            },
            [onSelect]
        );
        const handleInsertImage = useCallback(() => {
            if (onSelect && root.current) {
                onSelect(root.current);
            }
            if (onInsertImage) {
                onInsertImage(image, captionText);
            }
        }, [image, captionText, onInsertImage, onSelect]);
        const handleDownloadImage = useCallback(() => {
            if (onDownloadImage) {
                onDownloadImage(image);
            }
        }, [image, onDownloadImage]);
        const handleRemoveImage = useCallback(() => {
            if (onSelect && root.current) {
                onSelect(root.current);
            }
            if (onRemoveImage) {
                onRemoveImage(image);
            }
        }, [image, onRemoveImage, onSelect]);

        useEffect(() => {
            if (active) {
                if (root.current) {
                    // Show caption and the buttons once resize animation is done
                    const timeout = setTimeout(() => {
                        root.current?.scrollIntoView({
                            behavior: 'smooth',
                        });
                    }, 200);
                    return () => clearTimeout(timeout);
                }
            }
            return () => {
                /* Do nothing */
            };
        }, [active]);

        return (
            <Flipped
                flipId={image}
                onAppear={handleAppear}
                onExit={handleDisappear}
                shouldFlip={(p, n) => p === n}
            >
                <div
                    className={clsx('rt-insertable-image-container', {
                        active,
                    })}
                >
                    <Flipped inverseFlipId={image}>
                        <div>
                            <Flipped flipId={`${image}-img`}>
                                <img
                                    ref={root}
                                    className={clsx(
                                        'rt-insertable-image',
                                        `size-${size ?? 'sm'}`,
                                        { active },
                                        className
                                    )}
                                    style={style}
                                    src={image}
                                    onClick={handleSelect}
                                />
                            </Flipped>
                            <div
                                className={clsx('rt-insertable-image-options')}
                            >
                                <Flipped
                                    flipId={`${image}-text`}
                                    delayUntil={`${image}-img`}
                                    stagger='image'
                                    onAppear={handleOptionsAppear}
                                >
                                    {active && (
                                        <div className='option-text'>
                                            <TextArea
                                                label='Caption'
                                                placeholder='No caption...'
                                                value={captionText}
                                                onChange={
                                                    handleCaptionTextChange
                                                }
                                            />
                                        </div>
                                    )}
                                </Flipped>
                                <Flipped
                                    flipId={`${image}-buttons`}
                                    delayUntil={`${image}-text`}
                                    stagger='text'
                                    onAppear={handleOptionsAppear}
                                >
                                    {active && (
                                        <div className='option-buttons'>
                                            <Tooltip title='Insert'>
                                                <Button
                                                    color='gray'
                                                    variant='contained'
                                                    icon={<PlusIcon />}
                                                    onClick={handleInsertImage}
                                                />
                                            </Tooltip>
                                            <Tooltip title='Download'>
                                                <Button
                                                    color='gray'
                                                    variant='contained'
                                                    icon={<DownloadIcon />}
                                                    onClick={
                                                        handleDownloadImage
                                                    }
                                                />
                                            </Tooltip>
                                            <Tooltip title='Delete'>
                                                <Button
                                                    color='error'
                                                    variant='contained'
                                                    icon={<Trash2Icon />}
                                                    onClick={handleRemoveImage}
                                                />
                                            </Tooltip>
                                        </div>
                                    )}
                                </Flipped>
                            </div>
                        </div>
                    </Flipped>
                </div>
            </Flipped>
        );
    }
);

export default _InsertableImage;
