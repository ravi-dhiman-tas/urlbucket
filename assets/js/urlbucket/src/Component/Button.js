import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

export default class Button extends Component {
    render() {
        return (
            <button className={css(Style.button)} {...this.props}>
                {this.props.children}
            </button>
        )
    }
}

const Style = StyleSheet.create({
    button: {
        display: 'block',
        fontWeight: 400,
        width: '100%',
        fontSize: 25,
        textAlign: 'center',
        padding: '8px 18px',
        border: 0,
        borderRadius: 0,
        background: '#545454',
        color: '#fff',
        ':disabled': {
            pointerEvent: 'none',
            opacity: 0.6
        }
    }
})