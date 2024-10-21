import { useEffect, useState } from "react";
import { Alert, StatusBar, StyleSheet, View } from "react-native";
import Loader from "./components/loader";
import Weather from "./components/weather";
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "b344f6ac532d17769cec04971a932005";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("");

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
      await fetchWeatherByLocation(latitude, longitude);
    } catch (error) {
      Alert.alert("Error getting location");
    }
  };

  const fetchWeatherByLocation = async (latitude, longitude) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      setWeather(data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Error fetching weather data");
    }
  };

  const getWeatherByCity = async (city) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Error fetching weather data");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Weather 
        weather={weather} 
        onCityChange={(city) => {
          setCity(city);
          getWeatherByCity(city);
        }}
        onGetCurrentWeather={getLocation} // Added this line
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
