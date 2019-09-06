import React from 'react';
import { observable } from 'mobx';
import { Observer } from 'mobx-react';
import { observer } from 'mobx-react-lite';

class Moods {
    @observable
    public data = {};
    constructor() {
        fetch('http://localhost:3000/moods', {
            method: 'GET',
            mode: 'cors', 
            headers: {'Content-Type': 'application/json'}})
            .then((res) => res.json())
            .then((data) => {
                this.data = data
            })
    }
}

let moods = new Moods(); 



export default observer(() => (
    <div>
        {JSON.stringify(moods.data)}
    </div>
));
