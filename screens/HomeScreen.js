import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  StatusBar,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { useDispatch } from "react-redux";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { setOrigin, setDestination } from "../slices/navSlice";
import NavFavourite from "../components/NavFavourite";

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlxdsFnoJyWu6pgum2Aao9RQNqgUxu1j0sg&usqp=CAU",
          }}
        />

        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );

            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          minLength={2}
          debunce={400}
          placeholder="where From"
          styles={{ container: { flex: 0 }, textInput: { fontSize: 18 } }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
        />

        <NavOptions />
        <NavFavourite />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: "blue",
  },
});
