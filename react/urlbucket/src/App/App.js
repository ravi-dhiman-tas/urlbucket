import React, { Component } from 'react';

// Components
import FromGroup from '../Component/FormGroup';
import { authToken } from '../Actions';

export default class App extends Component {
    componentWillMount() {
        if (!authToken()) {
            return this.props.history.replace('/login');
        }
    }
    render() {
        return (
            <div>
                <FromGroup
                    label="First Name"
                    input={{
                        type: "text",
                        placeholder: "First Name"
                    }}
                />
            </div>
        )
    }
}
