import React from 'react';
import { TextInput, Keyboard } from 'react-native';
import Styled from 'styled-components';

const Input = Styled.TextInput`
	border: 1px solid #000;
	width: 100%;
	padding: 10px;
	font-size: 17px;
`;

class MessageInput extends React.Component {
    render() {
        return (
            <Input
                value={this.props.message}
                multiline={false}
                placeholder='Say something...'
                onChangeText={this.props.change}
                underlineColorAndroid='transparent'
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
            />
        )
    }
}

export default MessageInput;