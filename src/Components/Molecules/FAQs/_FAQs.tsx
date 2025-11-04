import React, { useState } from 'react';
import { Text } from '@Reptile/Components/Atoms';

import './_FAQs.scss';
import { reactive } from '@Reptile/Framework';

const _FAQs = reactive<Reptile.Props.FAQsProps>(({ FAQs }, {}) => {
    const [selected, setSelected] = useState<number | undefined>(undefined);

    return (
        <div className='rt-faqs'>
            <Text>FAQs</Text>
            {FAQs.map((e, i) => {
                const isSelected = i === selected;

                return (
                    <div className='faq-container' key={i}>
                        <div
                            className='question'
                            onClick={() =>
                                setSelected(isSelected ? undefined : i)
                            }
                        >
                            {e.question}
                        </div>
                        {isSelected && <div>{e.answer}</div>}
                    </div>
                );
            })}
        </div>
    );
});

export default _FAQs;
