import React from 'react';
import styled from 'styled-components'
import propTypes from 'prop-types';

const InputBase = styled.input`
    width: 100%;
    padding: 15px;
    font-size: 14px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.contrastText};
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: ${({ theme }) => theme.borderRadius};
    outline: 0;
    margin-bottom: 25px;
`

export default function Input({ onChange, placeholder }) {
    return(
        <div>
            <InputBase onChange={ onChange } placeholder={placeholder}/>
        </div>
    )
}

Input.defaultProps = {
    value: '',
}

Input.propTypes = {
    onChange: propTypes.func.isRequired,
    placeholder: propTypes.string.isRequired,
    name: propTypes.string,
    value: propTypes.string,
}