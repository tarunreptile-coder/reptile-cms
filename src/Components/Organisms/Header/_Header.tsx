import React, { useCallback } from 'react';
import clsx from 'clsx';
import {
    Button,
    Image,
    StatusLight,
    ZapIcon,
    Text,
} from '@Reptile/Components/Atoms';
import { LOGOS } from '@Reptile/Assets';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

import './_Header.scss';

const _Header = controlled<
    Reptile.Props.HeaderProps,
    Reptile.Controllers.IHeaderController
>(({ className, style, controller }) => {
    useInitController(controller);

    const handleHomeClick = useCallback(() => {
        void controller.navigateToHome();
    }, [controller]);

    const handleContentClick = useCallback(() => {
        void controller.navigateToContent();
    }, [controller]);

    const handleDesignClick = useCallback(() => {
        void controller.navigateToDesign();
    }, [controller]);

    const handlePrototypeClick = useCallback(() => {
        void controller.navigateToPrototype();
    }, [controller]);

    const handleAppBuildClick = useCallback(() => {
        void controller.navigateToAppBuild();
    }, [controller]);

    const handleUpgradeClick = useCallback(() => {
        void controller.navigateToPlan();
    }, [controller]);

    const handleSettingsClick = useCallback(() => {
        void controller.navigateToSettings();
    }, [controller]);

    const handleFinishClick = useCallback(() => {
        void controller.navigateToFinish();
    }, [controller]);

    return (
        <div className={clsx('rt-header', className)} style={style}>
            <div className='logo-container'>
                <div className='rt-home-logo' onClick={handleHomeClick}>
                    <Image
                        src={LOGOS.SVG_MAIN_LOGO_URL as string}
                        height='auto'
                        width='auto'
                    />
                </div>
                
                {controller.mode !== 'none' && (
                    <>
                        <Button
                            onClick={handleContentClick}
                            variant={() =>
                                controller.mode === 'content'
                                    ? 'outlined'
                                    : 'link'
                            }
                            color={() =>
                                controller.mode === 'content'
                                    ? 'primary'
                                    : 'gray'
                            }
                            icon={() =>
                                controller.mode === 'content' ? (
                                    <StatusLight status='green' />
                                ) : undefined
                            }
                            disabled={() => controller.loading}
                        >
                            <Text
                                color={() =>
                                    controller.mode === 'content'
                                        ? undefined
                                        : 'gray'
                                }
                            >
                                Content
                            </Text>
                        </Button>
                        <Button
                            onClick={handleDesignClick}
                            variant={() =>
                                controller.mode === 'design'
                                    ? 'outlined'
                                    : 'link'
                            }
                            color={() =>
                                controller.mode === 'design'
                                    ? 'primary'
                                    : 'gray'
                            }
                            icon={() =>
                                controller.mode === 'design' ? (
                                    <StatusLight status='green' />
                                ) : undefined
                            }
                            disabled={() => controller.loading}
                        >
                            <Text
                                color={() =>
                                    controller.mode === 'design'
                                        ? undefined
                                        : 'gray'
                                }
                            >
                                Design
                            </Text>
                        </Button>
                        {controller.mode === 'content' ? null : (
                            <>
                                <Button
                                    onClick={handleAppBuildClick}
                                    variant={() =>
                                        controller.mode === 'app-build'
                                            ? 'outlined'
                                            : 'link'
                                    }
                                    color={() =>
                                        controller.mode === 'app-build'
                                            ? 'primary'
                                            : 'gray'
                                    }
                                    icon={() =>
                                        controller.mode === 'app-build' ? (
                                            <StatusLight status='green' />
                                        ) : undefined
                                    }
                                    disabled={() => controller.loading}
                                >
                                    <Text
                                        color={() =>
                                            controller.mode === 'app-build'
                                                ? undefined
                                                : 'gray'
                                        }
                                    >
                                        App Build
                                    </Text>
                                </Button>
                                <Button
                                    onClick={handlePrototypeClick}
                                    variant={() =>
                                        controller.mode === 'prototype'
                                            ? 'outlined'
                                            : 'link'
                                    }
                                    color={() =>
                                        controller.mode === 'prototype'
                                            ? 'primary'
                                            : 'gray'
                                    }
                                    icon={() =>
                                        controller.mode === 'prototype' ? (
                                            <StatusLight status='green' />
                                        ) : undefined
                                    }
                                    disabled={() => controller.loading}
                                >
                                    <Text
                                        className='prototype-build'
                                        color={() =>
                                            controller.mode === 'prototype'
                                                ? undefined
                                                : 'gray'
                                        }
                                    >
                                        Prototype
                                    </Text>
                                </Button>

                                {controller.superUser && (
                                    <Button
                                        onClick={handleFinishClick}
                                        variant={() =>
                                            controller.mode === 'finish'
                                                ? 'outlined'
                                                : 'link'
                                        }
                                        color={() =>
                                            controller.mode === 'finish'
                                                ? 'primary'
                                                : 'gray'
                                        }
                                        icon={() =>
                                            controller.mode === 'finish' ? (
                                                <StatusLight status='green' />
                                            ) : undefined
                                        }
                                        disabled={() => controller.loading || controller.isFinishDisabled}
                                    >
                                        <Text
                                            className='prototype-finish'
                                            color={() =>
                                                controller.mode === 'finish'
                                                    ? undefined
                                                    : 'gray'
                                            }
                                        >
                                            Finish
                                        </Text>
                                    </Button>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
            <div className='user-container'>
                <Button
                    onClick={handleUpgradeClick}
                    color='gray'
                    icon={<ZapIcon />}
                    className="upgrade-btn"
                >
                    <Text color='gray'>Upgrade now</Text>
                </Button>
                <Image
                    onClick={handleSettingsClick}
                    src={() => controller.avatarUrl}
                    form='circle'
                    height={40}
                    width={40}
                    loading={() => controller.loading}
                />
            </div>
        </div>
    );
});

export default _Header;
