import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import MapView from 'react-native-maps';

const MapWrapper = styled(({ component, ...props }) => React.cloneElement(component, props))`
	height: 100%;
	width: 100%;
	background: green;
	position: absolute;
`;

class DropMap extends React.Component {

	state = {
		initialRegion: null
	}

	componentDidMount() {
		this.getDelta(this.props.lat, this.props.lng, 2000);
	}

	getDelta(latitude, longitude, distance): Coordinates {
		const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
		const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
		const longitudeDelta = distance / (oneDegreeOfLatitudeInMeters * Math.cos(latitude * (Math.PI / 180)));
		const initialRegion = { latitude, longitude, latitudeDelta, longitudeDelta }
		return this.setState({ initialRegion });
	}

	render() {
		return (
			<MapWrapper component={<MapView initialRegion={this.state.initialRegion} />} >
				{this.props.children}
			</MapWrapper>
		)
	}
}

export default DropMap;
