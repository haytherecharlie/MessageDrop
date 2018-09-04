import React from 'react';
import { View } from 'react-native';
import Styled from 'styled-components';
import MessageInput from '../atoms/MessageInput';
import MessageSubmit from '../atoms/MessageSubmit';

const Form = Styled.View`
    background: rgba(255,255,255,0.9);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

class MessageForm extends React.Component {

    state = {
        message: ""
    }

    render() {
        return (
            <Form>
                <MessageInput message={this.state.message} change={message => this.setState({ message })} />
                <MessageSubmit
                    timestamp={this.props.position.timestamp}
                    latitude={this.props.position.latitude}
                    longitude={this.props.position.longitude}
                    message={this.state.message}
                    reset={() => this.setState({ message: "" })}
                />
            </Form>
        )
    }
}

export default MessageForm;