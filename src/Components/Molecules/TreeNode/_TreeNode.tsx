import React, { useCallback, useRef, useState } from 'react';
import clsx from 'clsx';

import { reactive } from '@Reptile/Framework';
import {
    ClickableIcon,
    Collapse,
    FeaturedIcon,
    ProgressCircle,
    Text,
} from '@Reptile/Components/Atoms';
import * as Icons from '@Reptile/Components/Atoms/Icons/_Icons';

import './_TreeNode.scss';

const getIcon = (icon?: string) => {
    const iconName = icon
        ? `${icon
              .split('-')
              .map((s) => `${s[0].toUpperCase()}${s.slice(1)}`)
              .join('')}Icon`
        : undefined;
    return iconName
        ? (Icons[iconName as never] as React.FunctionComponent)
        : undefined;
};

const _TreeNode = reactive<Reptile.Props.TreeNodeProps>(
    (
        { className, nodeListClassName, style, id },
        { getChildrenIds, getNodeProps, isExpanded, onClick, onDrop }
    ) => {
        const {
            label,
            icon,
            selectable,
            selected,
            actions,
            loading,
            isActive,
        } = getNodeProps(id);
        const Icon = getIcon(icon);

        const handleClick = useCallback(
            (e: React.MouseEvent) => {
                if (onClick) {
                    onClick(id);
                }
            },
            [onClick, id]
        );

        const handleDrop = useCallback(
            (e: React.MouseEvent) => {
                if (onDrop) {
                    onDrop(id);
                }
            },
            [id, onDrop]
        );

        const children = getChildrenIds(id);
        const [hover, setHover] = useState(false);
        const delayTimerRef = useRef<NodeJS.Timeout>();

        function handleMouseEnter() {
            delayTimerRef.current = setTimeout(() => {
                if (isActive) {
                    setHover(true);
                }
            }, 1000);
        }

        function handleMouseLeave() {
            clearTimeout(delayTimerRef.current);
            if (isActive) {
                setHover(false);
            }
        }

        return (
            <>
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    onDrop={handleDrop}
                    className={clsx([
                        'rt-tree-node',
                        isActive && 'active',
                        hover && 'fit',
                        { selected },
                    ])}
                    style={style}
                >
                    <div className={clsx(['rt-tree-node-content', className])}>
                        {Icon && <Icon />}
                        {!isActive && (
                            <Text
                                className='rt-node-text'
                                color='gray'
                                weight='medium'
                                size='medium'
                            >
                                {label}
                            </Text>
                        )}
                        {hover && (
                            <div className='tree-node-label'>
                                <Text
                                    className='rt-node-text'
                                    color='gray'
                                    weight='medium'
                                    size='medium'
                                >
                                    {label}
                                </Text>
                            </div>
                        )}
                    </div>
                    <div className='rt-tree-node-actions'>
                        {actions.map((action) => {
                            const ActionIcon = getIcon(action.icon);
                            const handleAction = useCallback(
                                (e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    action.command(id);
                                },
                                [action]
                            );
                            if (action.visible) {
                                return (
                                    <ClickableIcon
                                        key={`${id}-action`}
                                        icon={
                                            <FeaturedIcon
                                                icon={
                                                    ActionIcon && <ActionIcon />
                                                }
                                                color={action.color}
                                            />
                                        }
                                        onClick={handleAction}
                                    />
                                );
                            }
                            return null;
                        })}
                        {!isActive && (
                            <>
                                {loading ? (
                                    <ProgressCircle size='xxs' />
                                ) : (
                                    !selectable && (
                                        <Icons.ChevronRightIcon
                                            className={clsx([
                                                'rt-caret-icon',
                                                { ['open']: isExpanded(id) },
                                            ])}
                                        />
                                    )
                                )}
                            </>
                        )}
                    </div>
                </div>
                <Collapse
                    in={isExpanded(id) && !!children.length}
                    className={clsx('rt-tree-node-list', nodeListClassName)}
                    unmountOnExit
                >
                    {children.map((id) => (
                        <_TreeNode
                            key={id}
                            id={id}
                            className={className}
                            isExpanded={isExpanded}
                            getChildrenIds={getChildrenIds}
                            getNodeProps={getNodeProps}
                            onDrop={onDrop}
                            onClick={onClick}
                            style={style}
                            nodeListClassName={nodeListClassName}
                        />
                    ))}
                </Collapse>
            </>
        );
    }
) as (props: Reptile.Props.TreeNodeProps) => React.ReactElement;

export default _TreeNode;
