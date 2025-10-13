import React from 'react';
import genric from '~/Assets/_Generic';
import { reactive } from '@Reptile/Framework';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import './_Prototype.scss';
import { Button, Notification } from '@Reptile/Components/Atoms';
import { MESSAGES } from '@Reptile/Constants/Constants';

const _Prototype = reactive<Reptile.Props.PrototypeProps>(
    ({ className, style, pin }, {}) => {
        const copyText = () => {
            if (pin) {
                void navigator.clipboard.writeText(pin);
                Notification.success({
                    description: MESSAGES.SUCCESS_PINCODE_COPIED.message,
                });
            }
        };

        return (
            <>
                <div className='share_box_title'>
                    <h1>Prototype</h1>
                    <p>
                        Prototype and test your app before submitting to stores.
                        Download the Reptile App on the App or Google Play store
                        and test away. You can share your app with a client to
                        get a sign off.
                    </p>
                </div>

                <div className='apps_img'>
                    <span className='app_store_img'>
                        <a
                            href='https://apps.apple.com/us/app/reptileapp/id1519013158'
                            rel='noreferrer'
                            target='_blank'
                        >
                            <img src={genric.APPSTORE as string} width='120' />
                        </a>
                    </span>
                    <span className='app_store_img'>
                        <a
                            href='https://play.google.com/store/apps/details?id=com.pagelizard.reptile'
                            rel='noreferrer'
                            target='_blank'
                        >
                            <img src={genric.PLAYSTORE as string} width='135' />
                        </a>
                    </span>
                </div>
                <div className='share_text_box_content'>
                    <input
                        className='share_text_box'
                        type='text'
                        id='message'
                        name='message'
                        readOnly={true}
                        value={pin}
                    />
                    <Button
                        icon={<FileCopyOutlinedIcon />}
                        onClick={copyText}
                    />
                </div>
            </>
        );
    }
);

export default _Prototype;
