import React from 'react';
import Button from './Button';
import Box from './Box';
import { Anchor } from 'grommet';
import { Add } from 'grommet-icons';


interface Props {
    title: string,
    manageRoute?: string,
    quickAddRoute?: string,
}


export default (props: Props) => (
    <Box 
        justify="between" 
        alignSelf="stretch" 
        direction="row" 
        align="center" 
        alignContent="center"
        pad="small">
        <Anchor 
            href={props.manageRoute}> 
            <Button label={props.title}/>
        </Anchor>
        <Anchor 
            href={props.quickAddRoute}> 
            <Button primary icon={
                    <Add color='white'/>
                } ></Button>
        </Anchor>
    </Box>
);
