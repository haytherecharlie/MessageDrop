import React from 'react';
import { Keyboard, Text, View, TouchableHighlight } from 'react-native';
import styled from 'styled-components';
import { Constants, Location, Permissions } from 'expo'
import moment from 'moment';
import { firestore } from '../../lib/config/firebase';
import MapView, { Marker, Circle } from 'react-native-maps';
import DropMap from '../atoms/DropMap';
import MessageForm from '../molecules/MessageForm';

const Wrapper = styled.View`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
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

export default class App extends React.Component {

    static navigationOptions = {
        title: 'MessageDrop',
    };

    state = {
        errorText: null,
        position: {
            lat: null,
            lng: null,
            time: null,
            mapData: null
        }
    }

    componentDidMount() {
        return this.getGeoLocation();
    }

    getGeoLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        return status === 'granted' ? this.statusGranted() : this.statusDenied();
    }

    statusGranted = async () => {
        let mapData = await Location.getCurrentPositionAsync({});
        return this.setState({
            position: {
                lat: Math.round(mapData.coords.latitude * 100) / 100,
                lng: Math.round(mapData.coords.longitude * 100) / 100,
                time: mapData.timestamp,
                mapData
            }
        });
    }

    statusDenied = () => {
        return this.setState({ errorText: 'Permission to access location was denied' });
    }

    drawMap = () => {
        if (this.state.position.lat) {
            return (
                <DropMap lat={this.state.position.lat} lng={this.state.position.lng} >
                    <Marker coordinate={this.state.position.mapData.coords} title="Your Location" description="This is where you currently are." />
                    <Circle center={{ latitude: this.state.position.mapData.coords.latitude, longitude: this.state.position.mapData.coords.longitude }} radius={500} strokeColor='#ff2353' fillColor='rgba(255,255,255,0.6)' />
                </DropMap>
            );
        }
        return null;
    }

    render() {
        return (
            <Wrapper>
                {this.drawMap()}
                <Date>{moment(this.state.position.time).format('MMMM Do YYYY, h:mm:ss a')}</Date>
                <LatLon>Lat: {this.state.position.lat}</LatLon>
                <LatLon>Lon: {this.state.position.lng}</LatLon>
                <Text>{this.state.errorText}</Text>
                <MessageForm position={this.state.position} />
            </Wrapper>
        );
    }
};
