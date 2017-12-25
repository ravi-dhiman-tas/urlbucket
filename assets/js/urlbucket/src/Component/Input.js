import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

export default class Input extends Component {
    render() {
        return (
            <input
                className={css(Style.input)}
                {...this.props}
            />
        )
    }
}

const Style = StyleSheet.create({
    input:  {
        display: 'block',
        fontWeight: 400,
        width: '100%',
        fontSize: 25,
        border: '1px solid #f3f3f3',
        color: '#545454',
        padding: '8px 18px',
        outline: 'none',
        ':focus': {
            borderColor: '#949494'
        }
    }
});