import React from 'react';
import { Text, View, TextInput, TouchableHighlight } from 'react-native';
import styled from 'styled-components';
import { Constants, Location, Permissions } from 'expo'
import moment from 'moment';
import { firestore } from '../../lib/config/firebase';

const Wrapper = styled.View`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Date = styled.Text`
	font-size: 17px;
	color: #ff2353;
	margin: 10px;
`;

const LatLon = styled.Text`
	font-size: 17px;
	color: orange;
`;

const Input = styled.TextInput`
	border: 1px solid #000;
	width: 100%;
	padding: 10px;
	font-size: 17px;
`;

const Submit = styled.TouchableHighlight`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 75%;
	border-radius: 25px;
	background: blue;
	padding: 10px;
	margin: 10px;
`;

const SubmitText = styled.Text`
	color: #fff;
	font-size: 17px;
	font-weight: 600;
`;

export default class App extends React.Component {

	static navigationOptions = {
		title: 'Compose',
	};

	state = {
		errorText: null,
		message: "",
		timestamp: null,
		latitude: null,
		longitude: null
	}

	componentDidMount() {
		return this.getGeoLocation();
	}

	getGeoLocation = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		return status === 'granted'
			? this.statusGranted()
			: this.statusDenied();
	}

	statusGranted = async () => {
		let location = await Location.getCurrentPositionAsync({});
		let latitude = Math.round(location.coords.latitude * 100) / 100;
		let longitude = Math.round(location.coords.longitude * 100) / 100;
		let timestamp = location.timestamp;
		return this.setState({ timestamp, latitude, longitude });
	}

	statusDenied = () => {
		return this.setState({
			errorText: 'Permission to access location was denied'
		});
	}

	handleTextChange = message => {
		return this.setState({ message })
	}

	submitMessageDrop = () => {
		const { timestamp, latitude, longitude, message } = this.state;
		const areaCode = `?lat=${latitude}&lon=${longitude}`;
		firestore.collection('messages').doc('drops').collection(areaCode).doc().set({
			timestamp, latitude, longitude, message
		});
		return this.setState({ message: "" })

	}

	render() {
		return (
			<Wrapper>
				<Date>{moment(this.state.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</Date>
				<LatLon>Lat: {this.state.latitude}</LatLon>
				<LatLon>Lon: {this.state.longitude}</LatLon>
				<Text>{this.state.errorText}</Text>
				<Input
					value={this.state.message}
					multiline={true}
					placeholder='Say something...'
					onChangeText={this.handleTextChange}
					underlineColorAndroid='transparent'
				/>
				<Submit onPress={this.submitMessageDrop}>
					<SubmitText>Drop Message</SubmitText>
				</Submit>
			</Wrapper>
		);
	}
};
