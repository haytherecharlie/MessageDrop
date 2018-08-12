import React from 'react';
import { Text, View, TextInput, TouchableHighlight } from 'react-native';
import styled from 'styled-components';
import { Constants, Location, Permissions } from 'expo'
import { firestore } from '../../lib/config/firebase';
import moment from 'moment';

const Wrapper = styled.View`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Drop = styled.View`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center
	width: 100%;
	padding: 10px;
`;

const Date = styled.Text`
	font-size: 10px;
	color: #888;
	width: 100%;
`;

const DroppedMessage = styled.Text`
	font-size: 17px;
	color: #ff2353;
	width: 100%;
`;

const RefreshButton = styled.TouchableHighlight`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 75%;
	border-radius: 25px;
	background: blue;
	padding: 10px;
	margin: 10px;
`;

const RefreshText = styled.Text`
	color: #fff;
	font-size: 17px;
	font-weight: 600;
`;

export default class App extends React.Component {

	static navigationOptions = {
		title: 'Drops',
	};

	state = {
		errorText: null,
		latitude: "",
		longitude: "",
		drops: {}
	}

	async componentDidMount() {
		await this.getGeoLocation();
		this.getDrops();
	}

	getDrops = async () => {
		const { latitude, longitude } = this.state;
		const areaCode = `?lat=${latitude}&lon=${longitude}`;
		const drops = {};
		const request = await firestore.collection('messages').doc('drops').collection(areaCode).get();
		request.forEach(drop => drops[drop.id] = drop.data());
		await this.setState({ drops });
	}

	renderDrops = () => {
		const { drops } = this.state;
		return Object.keys(drops).map((drop, i) => {
			return (
				<Drop key={i}>
					<Date>{moment(drops[drop].timestamp).format('MMMM Do YYYY, h:mm:ss a')}</Date>
					<DroppedMessage>{drops[drop].message}</DroppedMessage>
				</Drop>
			)
		});
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
		return this.setState({ latitude, longitude });
	}

	statusDenied = () => {
		return this.setState({
			errorText: 'Permission to access location was denied'
		});
	}

	render() {
		return (
			<Wrapper>
				{this.renderDrops()}
				<RefreshButton onPress={this.getDrops}>
					<RefreshText>Refresh</RefreshText>
				</RefreshButton>
			</Wrapper>
		);
	}
};
