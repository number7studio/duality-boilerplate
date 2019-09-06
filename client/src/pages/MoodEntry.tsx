import React from 'react';
import {  Box, RangeInput, Text, Button } from 'grommet';
import { observable } from 'mobx'
import { Observer } from 'mobx-react'


const MoodInput = ({ label }: { label: string }) => {
    const [value, setValue] = React.useState();
    return (
        <Box direction="row" alignContent="center" align="center" pad="medium">
            <Text size="large" style={{ width: "200px" }}>{label}</Text>
            <Box pad="small" fill={true}>
                <RangeInput
                    value={value}
                    min={1}
                    max={5}
                    step={1}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        fetch('http://localhost:3000/moods', {
                            method: 'POST',
                            mode: 'cors', 
                            body: JSON.stringify({moods:[{"mood" : "happiness", "rating": 5}]}), 
                            headers: {'Content-Type': 'application/json'}}).then((res) => res.json()).then(console.log)
                    }} />
            </Box>
        </Box>
    );
}

const save = () => {};

const Header = () => (
    <Box direction="row" >
        <div style={{width:"220px"}}/>
        <Box pad="large" direction="row" fill={true} justify="between">
            <Text>1</Text>
            <Text>2</Text>
            <Text>3</Text>
            <Text>4</Text>
            <Text>5</Text>
        </Box>
    </Box>
)

export default () => (
    <Box>
        <Header></Header>
        <MoodInput label="Happiness" />
        <MoodInput label="Energy" />
        <MoodInput label="Anxiety" />
        <MoodInput label="Irritability" />
        <MoodInput label="Willpower" />
        <Box direction="row"><Button label="Save" onClick={save} /> </Box>
    </Box>
); 
