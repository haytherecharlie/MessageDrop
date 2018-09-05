import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../../components/atoms/TabBarIcon';
import ComposeScreen from '../../components/views/ComposeScreen';
import DropsScreen from '../../components/views/DropsScreen';
// import SettingsScreen from '../../components/views/SettingsScreen';

const ComposeStack = createStackNavigator({
	Home: ComposeScreen,
});

ComposeStack.navigationOptions = {
	tabBarLabel: 'Compose',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === 'ios'
					? `ios-information-circle${focused ? '' : '-outline'}`
					: 'md-information-circle'
            }
            style={{color: 'red'}}
		/>
	),
};

const DropsStack = createStackNavigator({
	Links: DropsScreen,
});

DropsStack.navigationOptions = {
	tabBarLabel: 'Drops',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
		/>
	),
};

// const SettingsStack = createStackNavigator({
// 	Settings: SettingsScreen,
// });

// SettingsStack.navigationOptions = {
// 	tabBarLabel: 'Settings',
// 	tabBarIcon: ({ focused }) => (
// 		<TabBarIcon
// 			focused={focused}
// 			name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
// 		/>
// 	),
// };

export default createBottomTabNavigator({
	ComposeStack,
	DropsStack,
	// SettingsStack,
});
