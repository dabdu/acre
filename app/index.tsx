import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const OnSearch = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
      );
      setResult(res.data[0].meanings[0].definitions[0].definition);
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
    console.log(result);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 40,
      }}
    >
      {/* Heading */}
      <Text style={{ fontSize: 40, marginBottom: 150 }}>Dictionary</Text>
      {/* Description */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          textAlign: "center",
          lineHeight: 50,
        }}
      >
        {result}
      </Text>
      {/* IF there' and Error */}
      {error && (
        <Text style={{ color: "red", fontWeight: "300", fontSize: 15 }}>
          {error}
        </Text>
      )}
      {/* IF Loading */}
      {error && (
        <Text style={{ fontWeight: "300", fontSize: 15 }}>{"Loading..."}</Text>
      )}
      {/* Input */}
      <TextInput
        style={{
          padding: 15,
          borderRadius: 10,
          backgroundColor: "white",
          borderColor: "gray",
          borderWidth: 1,
          width: "100%",
          marginVertical: 20,
          fontSize: 25,
          fontWeight: "400",
        }}
        onChangeText={(text) => setSearch(text)}
      />
      {/* Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#A9820D",
          paddingVertical: 15,
          width: "100%",
          borderRadius: 10,
          marginVertical: 15,
        }}
        onPress={OnSearch}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            textAlign: "center",
            color: "white",
          }}
        >
          Find the Word
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
