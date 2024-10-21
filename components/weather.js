import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const weather_options = {
  Clear: {
    iconName: "weather-sunny",
    gradient: ["#FF7300", "#FEF253"],
    title: "Sunny Day",
    description: "Enjoy the clear sky and sunshine!",
    textColor: "#FFD700",
    borderColor: "#FFD700",
  },
  Clouds: {
    iconName: "weather-cloudy",
    gradient: ["#D7D2CC", "#304352"],
    title: "Cloudy",
    description: "A bit gloomy outside, but still nice!",
    textColor: "#D3D3D3",
    borderColor: "#A9A9A9",
  },
  Rain: {
    iconName: "weather-rainy",
    gradient: ["#4C669F", "#3B5998"],
    title: "Rainy",
    description: "Don't forget to take your umbrella!",
    textColor: "#FFFFFF",
    borderColor: "#000000",
  },
  Thunderstorm: {
    iconName: "weather-lightning",
    gradient: ["#373B44", "#4286f4"],
    title: "Thunderstorm",
    description: "Stay inside and stay safe!",
    textColor: "#FFD700",
    borderColor: "#800000",
  },
  Snow: {
    iconName: "weather-snowy",
    gradient: ["#00C6FF", "#0072FF"],
    title: "Snowy",
    description: "It's a winter wonderland out there!",
    textColor: "#FFFFFF",
    borderColor: "#B0E0E6",
  },
  Drizzle: {
    iconName: "weather-rainy",
    gradient: ["#B2C2D2", "#7B7B92"],
    title: "Drizzle",
    description: "A light drizzle is falling, enjoy the fresh air!",
    textColor: "#FFFFFF",
    borderColor: "#A9A9A9",
  },
  Mist: {
    iconName: "weather-fog",
    gradient: ["#B2B2B2", "#7A7A7A"],
    title: "Misty",
    description: "Visibility is low, drive carefully!",
    textColor: "#FFFFFF",
    borderColor: "#C0C0C0",
  },
  Fog: {
    iconName: "weather-fog",
    gradient: ["#B0C4DE", "#4682B4"],
    title: "Foggy",
    description: "Foggy weather, stay safe and warm!",
    textColor: "#FFFFFF",
    borderColor: "#A9A9A9",
  },
  Haze: {
    iconName: "weather-hazy",
    gradient: ["#FFC300", "#FF5733"],
    title: "Hazy",
    description: "Hazy weather, the sun is shining through!",
    textColor: "#FFFFFF",
    borderColor: "#FFA07A",
  },
  Dust: {
    iconName: "weather-windy",
    gradient: ["#F5B7B1", "#AAB7B8"],
    title: "Dusty",
    description: "It's dusty outside, cover your face!",
    textColor: "#FFFFFF",
    borderColor: "#B22222",
  },
  Sand: {
    iconName: "weather-sandstorm",
    gradient: ["#E67E22", "#D35400"],
    title: "Sandstorm",
    description: "Sandstorm conditions, stay indoors!",
    textColor: "#FFFFFF",
    borderColor: "#A65E2E",
  },
  Ash: {
    iconName: "weather-smoke",
    gradient: ["#7D7D7D", "#3C3C3C"],
    title: "Ashfall",
    description: "There is ash in the air, wear a mask!",
    textColor: "#FFFFFF",
    borderColor: "#A9A9A9",
  },
  Squall: {
    iconName: "weather-windy",
    gradient: ["#8B0000", "#FF4500"],
    title: "Squall",
    description: "Strong winds ahead, take cover!",
    textColor: "#FFFFFF",
    borderColor: "#8B0000",
  },
  Tornado: {
    iconName: "weather-tornado",
    gradient: ["#4B0082", "#800080"],
    title: "Tornado Alert",
    description: "Seek shelter immediately!",
    textColor: "#FFFFFF",
    borderColor: "#8B0000",
  },
  Hurricane: {
    iconName: "weather-hurricane",
    gradient: ["#C71585", "#FF1493"],
    title: "Hurricane Warning",
    description: "Evacuate if necessary!",
    textColor: "#FFFFFF",
    borderColor: "#8B0000",
  },
};

export default function Weather({
  weather,
  onCityChange,
  onGetCurrentWeather,
}) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city) {
      onCityChange(city);
      setCity(""); // Clear input field
    } else {
      alert("Please enter a city name.");
    }
  };

  const condition = weather?.weather?.[0]?.main;
  const { gradient, iconName, title, description, textColor, borderColor } =
    weather_options[condition] || {};

  return (
    <LinearGradient
      colors={gradient || ["#D7D2CC", "#304352"]}
      style={styles.container}
    >
            <View
        style={[styles.inputContainer, { borderColor: borderColor || "#FFF" }]}
      >
        <TextInput
          style={[
            styles.input,
            { color: textColor || "#FFF", backgroundColor: "transparent" },
          ]} // Making background transparent
          placeholder="Enter city name"
          placeholderTextColor="#FFF"
          onChangeText={setCity} // Store city name
          value={city} // Show entered city name
        />
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="magnify" size={24} color={textColor || "#FFF"} />
        </TouchableOpacity>
      </View>
      <View style={styles.locationButton}>
        <TouchableOpacity style={styles.button} onPress={onGetCurrentWeather}>
          <Text style={[styles.loation_text, { color: textColor || "#FFF", marginRight: 8,}]}>
            Current weather
          </Text>
          <Icon name="map-marker" size={24} color={textColor || "#FFF"} />
        </TouchableOpacity>
      </View>
      <Icon
        name={iconName}
        size={130}
        color={textColor || "#FFD700"}
        style={styles.icon}
      />
      <Text style={[styles.title, { color: textColor || "#FFF" }]}>
        {title}
      </Text>
      <View style={styles.title_box}>
        <Text style={[styles.city, { color: textColor || "#FFF" }]}>
          {weather?.name}
        </Text>
        <Text style={[styles.temp, { color: textColor || "#FFF" }]}>
          {`${Math.round(weather?.main?.temp)}°C`}
        </Text>
      </View>
      <Text style={[styles.description, { color: textColor || "#FFF" }]}>
        {description}
      </Text>
  
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    loation_text: {
        fontSize: 16,
        fontWeight: "bold",
    },
  container: {
    flex: 1,
    alignItems: "center",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingVertical: "35%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
  },
  input: {
    height: 50,
    width: "90%",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "transparent", // Making input background transparent
  },
  icon: {
    height: 120,
  },
  temp: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  city: {
    fontSize: 32,
    fontWeight: "normal",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    fontWeight: "300",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  title_box: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  locationButton: {
    marginBottom: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center", // Center the content horizontally
    alignItems: "center", // Center the icon vertically
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row", // Ensure the button layout is horizontal
    alignItems: "center", // Center the icon and text vertically
  },
});
