import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import Styled from 'styled-components';
import { firestore } from '../../lib/config/firebase';

const SubmitButton = Styled.TouchableHighlight`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 75%;
	border-radius: 25px;
	background: blue;
	padding: 10px;
	margin: 10px 0 0 0;
`;

const SubmitText = Styled.Text`
	color: #fff;
	font-size: 17px;
	font-weight: 600;
`;

class MessageSubmit extends React.Component {

    state = {
        buttonText: "Drop Message"
    }

    submitMessageDrop = async () => {
        const { timestamp, latitude, longitude, message } = this.props;
        const areaCode = `?lat=${latitude}&lon=${longitude}`;
        this.props.reset();
        this.setState({ buttonText: "sending..." }, async () => {
            await firestore.collection('messages').doc('drops').collection(areaCode).doc(`${timestamp}`).set({
                timestamp, latitude, longitude, message
            });
            return this.setState({ buttonText: "Drop Message" });
        })
    }

    render() {
        return (
            <SubmitButton onPress={this.submitMessageDrop}>
                <SubmitText>{this.state.buttonText}</SubmitText>
            </SubmitButton>
        )
    }
}

export default MessageSubmit;