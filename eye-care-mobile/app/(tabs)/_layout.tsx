import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import projectColors from "../colors";
import { StyleSheet } from "react-native";

export default function _layout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "white",
				tabBarActiveBackgroundColor: projectColors.blueBlackHover,
				tabBarStyle: styles.navBarContainer,
				tabBarItemStyle: styles.navBarItems,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Accueil",
					tabBarIcon: ({ color }) => (
						<FontAwesome size={24} name="home" color={color} />
					),
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="articles"
				options={{
					title: "Articles",
					tabBarIcon: ({ color }) => (
						<FontAwesome name="newspaper-o" size={20} color={color} />
					),
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="test"
				options={{
					title: "Tests",
					tabBarIcon: ({ color }) => (
						<FontAwesome name="list-alt" size={20} color={color} />
					),
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<FontAwesome size={20} name="user" color={color} />
					),
					headerShown: false,
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	navBarContainer: {
		backgroundColor: projectColors.blueBlack,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},

	navBarItems: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
});
