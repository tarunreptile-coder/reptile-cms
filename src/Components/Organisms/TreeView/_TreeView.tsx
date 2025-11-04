import React, { useCallback } from 'react';
import clsx from 'clsx';

import { Button, Text, TreeNodeList } from '@Reptile/Components/Atoms';
import { TreeNode } from '@Reptile/Components/Molecules';
import { reactive, controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';
import * as Icons from '@Reptile/Components/Atoms/Icons/_Icons';

import './_TreeView.scss';

type TreeNodeProps = {
    ids: string[];
    onNodeClick: (id: string) => void;
    onNodeDrop: (id: string) => void;
    isExpanded: (id: string) => boolean;
    getChildrenIds: (id?: string) => string[];
    getNodeProps: (itemId: string) => Reptile.Props.TreeNode;
    nodeClass?: string;
    nodeListClass?: string;
};

const TreeNodes = reactive<TreeNodeProps>(
    (
        { ids, nodeClass, nodeListClass },
        { onNodeClick, onNodeDrop, getChildrenIds, getNodeProps, isExpanded }
    ) => {
        return (
            <>
                {ids.map((id) => (
                    <TreeNode
                        id={id}
                        key={id}
                        className={nodeClass}
                        nodeListClassName={nodeListClass}
                        isExpanded={isExpanded}
                        onClick={onNodeClick}
                        onDrop={onNodeDrop}
                        getChildrenIds={getChildrenIds}
                        getNodeProps={getNodeProps}
                    />
                ))}
            </>
        );
    }
);

const _TreeView = controlled<
    Reptile.Props.TreeViewProps,
    Reptile.Controllers.ITreeViewController
>(
    ({
        style,
        className,
        titleClassName,
        controller,
        nodeClass,
        nodeListClass,
        title,
    }) => {
        useInitController(controller);

        const handleNodeDrop = useCallback((id: string) => {
            // if (onNodeDrop) {
            //     onNodeDrop(node, e);
            // }
        }, []);

        return (
            <div className={clsx('rt-tree-view', className)} style={style}>
                <div className='rt-tree-view-scroll'>
                    {title && (
                        <Text
                            size='medium'
                            color='dark-gray'
                            weight='medium'
                            className={clsx(
                                'rt-tree-view-title',
                                titleClassName
                            )}
                        >
                            {title}
                        </Text>
                    )}
                    <TreeNodeList className={nodeListClass}>
                        <TreeNodes
                            ids={controller.getChildrenIds()}
                            onNodeClick={controller.click.bind(controller)}
                            onNodeDrop={handleNodeDrop}
                            nodeClass={nodeClass}
                            nodeListClass={nodeListClass}
                            getChildrenIds={controller.getChildrenIds.bind(
                                controller
                            )}
                            getNodeProps={controller.getNodeProps.bind(
                                controller
                            )}
                            isExpanded={controller.isExpanded.bind(controller)}
                        />
                    </TreeNodeList>
                </div>
                {controller.minimise ? (
                    <div
                        className='rt-minimise-container'
                        onClick={() =>
                            controller.minimise && controller.minimise()
                        }
                    >
                        <Icons.ChevronsRightIcon
                            className={`tree-view-arrow ${
                                controller.isActive ? 'open' : ''
                            }`}
                        />
                    </div>
                ) : null}
            </div>
        );
    }
);

export default _TreeView;
