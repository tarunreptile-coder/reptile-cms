import React from 'react';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';
import { GLOBALSTYLES } from '@Reptile/Assets';

import './_GlobalStyleDisplay.scss';

const _GlobalStyleDisplay = controlled<
    Reptile.Props.GlobalStyleProps,
    Reptile.Controllers.IGlobalStyleController
>(({ controller }) => {
    useInitController(controller);
    return (
        // <div style={{ zIndex: '0' }} className='custm_width'>
        <div className='device_preview_layout'>
            <div className='design-container'>
                {/* <div className='mobile-template'> */}
                <img className='iphone-x' src={GLOBALSTYLES.IPHONE as string} />
                {controller.screenSelect.selectedOption === 'Splash Screen' && (
                    <>
                        <img
                            style={{
                                backgroundColor: `${
                                    !controller.color.colorString
                                        ? controller.splashScreenColor ??
                                          '#000000'
                                        : controller.color.colorString
                                }`,
                            }}
                            className='screen'
                            src={GLOBALSTYLES.SPLASH as string}
                        />
                        <div className='logo'><div style={{width:'147px'}}> <img style={{width:'100%'}} src={controller.logo} /></div></div>
                       
                    </>
                )}
                {controller.screenSelect.selectedOption === 'Home' && (
                    <img
                        style={{
                            backgroundColor: `${
                                !controller.color.colorString
                                    ? controller.homeScreenColor ?? '#000000'
                                    : controller.color.colorString
                            }`,
                        }}
                        src={GLOBALSTYLES.HOME as string}
                        className='screen'
                    />
                )}
                {controller.screenSelect.selectedOption === 'Settings' && (
                    <img
                        style={{
                            backgroundColor: `${
                                !controller.color.colorString
                                    ? controller.settingScreenColor ?? '#000000'
                                    : controller.color.colorString
                            }`,
                        }}
                        src={GLOBALSTYLES.SETTINGS as string}
                        className='screen'
                    />
                )}
                {controller.screenSelect.selectedOption === 'Help' && (
                    <img
                        style={{
                            backgroundColor: `${
                                !controller.color.colorString
                                    ? controller.helpScreenColor ?? '#000000'
                                    : controller.color.colorString
                            }`,
                        }}
                        src={GLOBALSTYLES.HELP as string}
                        className='screen'
                    />
                )}
                {controller.screenSelect.selectedOption === 'Search' && (
                    <img
                        style={{
                            backgroundColor: `${
                                !controller.color.colorString
                                    ? controller.searchScreenColor ?? '#000000'
                                    : controller.color.colorString
                            }`,
                        }}
                        src={GLOBALSTYLES.SEARCH as string}
                        className='screen'
                    />
                )}
                {controller.screenSelect.selectedOption === 'Bookmark' && (
                    <img
                        style={{
                            backgroundColor: `${
                                !controller.color.colorString
                                    ? controller.bookmarkScreenColor ??
                                      '#000000'
                                    : controller.color.colorString
                            }`,
                        }}
                        src={GLOBALSTYLES.BOOKMARK as string}
                        className='screen'
                    />
                )}
            </div>
        </div>
        // </div>
        // </div>
    );
});

export default _GlobalStyleDisplay;
