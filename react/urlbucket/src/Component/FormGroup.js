import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Input from './Input';
import GenHash from '../Utils';

export default class FormGroup extends Component {
    render() {
        let id = 'f_control_' + GenHash();
        if (this.props.input && this.props.input.id) {
            id = this.props.input.id;
        }
        return (
            <div className={css(Style.fmGroup)}>
                {!this.props.noLabel &&
                    <label htmlFor={id} className={css(Style.label)}>
                        {this.props.label}
                    </label>
                }
                <Input
                    id={id}
                    {...this.props.input}
                />
                {this.props.hasError &&
                    <div className={css(Style.fmError) + ' text-danger'}>
                        {this.props.formError}
                    </div>
                }
            </div>
        )
    }
}

const Style = StyleSheet.create({
    fmGroup: {
        marginBottom: 24
    },
    label: {
        fontSize: 12,
        textTransform: 'uppercase',
        fontWeight: 500,
        color: '#A6A6A6'
    },
    fmError: {
        fontSize: 12,
        marginTop: 5
    }
})