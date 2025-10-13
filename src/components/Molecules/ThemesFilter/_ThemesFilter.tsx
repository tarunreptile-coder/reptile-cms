import { reactive } from '@Reptile/Framework';
import React from 'react';
import { DropdownInput, ListItem } from '@Reptile/Components/Molecules';

const _ThemesFilter = reactive<Reptile.Props.ThemesFilterProps>(
    ({ filter, filters, filterIndex, className }, { handleMeasureChange }) => {
        const displayName = filter.charAt(0).toUpperCase() + filter.slice(1);

        return (
            <DropdownInput
                name='measure-dropdown'
                label={displayName}
                value={displayName}
                selectedIndex={() => filterIndex}
                onChange={handleMeasureChange}
                className={className}
            >
                {() =>
                    filters.map((filter, idx) => (
                        <ListItem
                            key={idx}
                            text={
                                filter.charAt(0).toUpperCase() + filter.slice(1)
                            }
                        />
                    ))
                }
            </DropdownInput>
        );
    }
);
export default _ThemesFilter;
