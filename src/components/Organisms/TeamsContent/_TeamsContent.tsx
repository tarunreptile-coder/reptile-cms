import React, { useEffect } from 'react';
import { AccountsTeam, OrganizationsTeam } from '@Reptile/Components/Organisms';
import { useInitController } from '@Reptile/Hooks';
import { controlled } from '@Reptile/Framework';
import { Box } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';

import './_TeamsContent.scss';
import { ProgressCircle } from '@Reptile/Components/Atoms';

const _TeamsContent = controlled<
    Reptile.Props.AccountProps,
    Reptile.Controllers.ITeamsController
>(({ className, style, controller }) => {
    useInitController(controller);

    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    useEffect(() => {
        void controller.getAllUsers();
    }, [controller]);

    return (
        <div className='rt-teams-content'>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={handleChange}
                            aria-label='lab API tabs example'
                        >
                            <Tab label='Accounts' value='1' />
                            <Tab label='Organization' value='2' />
                        </TabList>
                    </Box>
                    <TabPanel value='1'>
                        <AccountsTeam controller={controller.accounts} />
                    </TabPanel>
                    <TabPanel value='2'>
                        <OrganizationsTeam
                            controller={controller.organizations}
                        />
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    );
});

export default _TeamsContent;
