import React from 'react';
import { useNavigate } from 'react-router-dom';

import './_RegisterDescription.scss';

const _RegisterDescription = () => {
    const navigate = useNavigate();

    return (
        <div className='rt-register-description'>
            <div className='flex-container'>
                <div className='about'>
                    <span className='intro-text rt-bold-font'>
                        App-building, <br /> without limits.
                    </span>
                </div>
                <div className='about'>
                    <span className='middle-text rt-light-font'>
                        Start creating in minutes!
                    </span>
                </div>
                <div className='about'>
                    <span className='bottom-text rt-regular-font'>
                        Already have an account?{' '}
                        <span
                            className='rt-link'
                            onClick={() => {
                                navigate('/login');
                            }}
                        >
                            Login
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default _RegisterDescription;
