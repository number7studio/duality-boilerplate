import React from 'react';
import Homerow from '../components/Homerow';
import { Box, Button } from 'grommet';

export const Home: React.FC = () =>{
    return (
        <Box direction="column" justify="center" pad="small">
            <Homerow manageRoute="/food" title="Food" />
            <Homerow manageRoute="/mood" quickAddRoute="/mood/" title="Mood" />
            <Homerow title="Sleep" />
            <Homerow title="Drink" />
            <Homerow title="Socialization" />
            <Homerow title="Meditation" />
            <Homerow title="Drugs" />
        </Box>
    )
}
