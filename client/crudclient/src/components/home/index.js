import React, { Component } from 'react';

export default class Home extends Component {

    componentWillMount() {
        console.log('componentWillMount');
        fetch(`http://localhost:62850/Api/Clients`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer _V8aZgEJVmxu9igchykfPFVXsTV9-ZzIlUU8SnKRFjlOs-CpGJGizS0nIA7_Mrzb1WIuqqKi3NQZaHX_dLOwF1uetCjja_fl3V0okLa1chuw5cO64X8kJgpLFTExAw_CjcDpvCd8J4IWJXhD_-pDOA7MC1anReQiVvrj7GoGdoYNw8PKdHDCs9u8nMD6xBYMh2_o3FiGZLPtrj5BX40-CyXupZdWbZc8n5D1YzV0hqncfvzJN4ScgUh6YBoQdM08s1XAWknbUmyyzaIGPn1ogKQPhuti4Vx73ou1RvaDZjmd2D38YA9o_yNxhhduWtgbMwyauShN-Z5CNOlVSTe7yFcDwstgMQjBr3MoAnqzt54BLqL-xFyJGDcU3PedN76XTYqFJfBsYNsYUTUYS_hho1SJOiIqcrhvwJwNBCczYWTrk54MV0SgoMTXCoF-WW51rN_6QtIGI25d-BqMoveYp4m2xFMriJvgaE6lQKwpJpsbPoD9ATVnOpACe52iu2U8'
            },
        }).then(response => {
            console.log('response', response);
            if (!response.ok) {
                throw new Error(response);
            }

            return response.json();
        }).catch(err => {
            console.error('err', err.message);
        });
    }

    render() {
        return (
            <div>
                Welcome! It's the home view.
            </div>
        );
    }
}