import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Judges from '../containers/Judges';
import Core from '../containers/Core';
import Ip from '../containers/Ip';
import Blacklist from '../containers/Blacklist';

import '../../public/styles/Settings.postcss';

const Settings = () => (
    <div className="settings no-select">
        <Tabs>
            <TabList>
                <Tab>Core</Tab>
                <Tab>Judges</Tab>
                <Tab>Ip</Tab>
                <Tab>Blacklist</Tab>
            </TabList>
            <TabPanel>
                <Core />
            </TabPanel>
            <TabPanel>
                <Judges />
            </TabPanel>
            <TabPanel>
                <Ip />
            </TabPanel>
            <TabPanel>
                <Blacklist />
            </TabPanel>
        </Tabs>
    </div>
);

export default Settings;
