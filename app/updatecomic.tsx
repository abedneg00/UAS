import { Button, Icon, Image } from "@rneui/base";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  LogBox,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useValidation } from "react-simple-form-validator";
import RNPickerSelect from "react-native-picker-select";
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from "expo-image-picker";

export default function UpdateKomik() {
  const state = {
    selectedDelGenre: "",
    imageUri: "https://ubaya.xyz/blank.png",
    image64: "",
  };
  const [movieId, setMovieId] = useState("1");
  const [komikDetails, setKomikDetails] = useState({
    title: "",
    description: "",
    runtime: "",
    release_date: "",
    homepage: "",
    url: "",
    genres: null,
    actors: null,
    scenes: null,
  });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releasedate, setReleaseDate] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const params = useLocalSearchParams;
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  const refRBSheet = useRef();
  const [imageUri, setImageUri] = useState("");
  const [scenes, setScenes] = useState(null);

  const fetchkomikDetails = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "id=" + movieId + "&mid=" + movieId,
    };
    try {
      const response = await fetch(
        "https://ubaya.xyz/react/160421142/detailmovie.php",
        options
      );
      const resjson = await response.json();
      setKomikDetails(resjson.data);
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
    }
  };

  useEffect(() => {
    if (params.movieid) {
      setMovieId(params.movieid.toString());
    }
  }, [params.movieid]);

  useEffect(() => {
    if (movieId) {
      fetchkomikDetails();
    }
  }, [movieId, triggerRefresh]);

  useEffect(() => {
    if (komikDetails) {
      setTitle(komikDetails.title || "");
      setDescription(komikDetails.description || "");
      setRuntime(komikDetails.runtime || "");
      setReleaseDate(komikDetails.release_date || "");
      setHomepage(komikDetails.homepage || "");
      setImageUrl(komikDetails.url || "");
      setGenres(komikDetails.genres);
      setScenes(komikDetails.scenes);
    }
  }, [komikDetails]);

  useEffect(() => {
    const addMovieGenre = async () => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "movie_id=" + movieId + "&genre_id=" + selectedGenre,
      };
      try {
        const response = await fetch(
          "https://ubaya.xyz/react/160421142/addmoviegenre.php",
          options
        );
        response.json().then(async (resjson) => {
          console.log(resjson);
          setTriggerRefresh((prev) => !prev);
        });
      } catch (error) {
        console.error("Failed to add movie genres:", error);
      }
    };
  });

  const { isFieldInError, getErrorsInField, isFormValid } = useValidation({
    fieldsRules: {
      title: { required: true },
      description: { required: true, minlength: 50 },
      runtime: { required: true, numbers: true },
      releasedate: { required: true, date: true },
      homepage: { required: true, website: true },
      url: { required: true },
    },
    state: { title, description, runtime, releasedate, homepage, url },
  });

  const renderTitleErrors = () => {
    if (isFieldInError("title")) {
      return getErrorsInField("title").map((errorMessage, index) => (
        <Text key={index} style={styles.errorText}>
          {errorMessage}
        </Text>
      ));
    }
    return null;
  };

  const renderdescriptionErrors = () => {
    if (isFieldInError("description")) {
      return getErrorsInField("description").map((errorMessage, index) => (
        <Text key={index} style={styles.errorText}>
          {errorMessage}
        </Text>
      ));
    }
    return null;
  };

  const renderRuntimeErrors = () => {
    if (isFieldInError("runtime")) {
      return getErrorsInField("runtime").map((errorMessage, index) => (
        <Text key={index} style={styles.errorText}>
          {errorMessage}
        </Text>
      ));
    }
    return null;
  };

  const renderDateErrors = () => {
    if (isFieldInError("releasedate")) {
      return getErrorsInField("releasedate").map((errorMessage, index) => (
        <Text key={index} style={styles.errorText}>
          {errorMessage}
        </Text>
      ));
    }
    return null;
  };

  const renderHomepageErrors = () => {
    if (isFieldInError("homepage")) {
      return getErrorsInField("homepage").map((errorMessage, index) => (
        <Text key={index} style={styles.errorText}>
          {errorMessage}
        </Text>
      ));
    }
    return null;
  };

  const renderUrlErrors = () => {
    if (isFieldInError("url")) {
      return getErrorsInField("url").map((errorMessage, index) => (
        <Text key={index} style={styles.errorText}>
          {errorMessage}
        </Text>
      ));
    }
    return null;
  };

  const renderPoster = () => {
    if (url != "") {
      return (
        <Image
          style={{ width: 300, height: 400 }}
          resizeMode="contain"
          source={{ uri: url }}
        />
      );
    }
    return null;
  };

  const renderButtonSubmit = () => {
    if (isFormValid) {
      return (
        <Button title="Submit" onPress={submitData} style={{ marginTop: 10 }} />
      );
    }
    return null;
  };

  const submitData = () => {
    const options = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body:
        "title=" +
        title +
        "&homepage=" +
        homepage +
        "&description=" +
        description +
        "&release_date=" +
        releasedate +
        "&runtime=" +
        runtime +
        "&url=" +
        url +
        "&id=" +
        movieId,
    };
    try {
      fetch("https://ubaya.xyz/react/160421142/updatemovie.php", options)
        .then((response) => response.json())
        .then((resjson) => {
          console.log(resjson);
          if (resjson.result === "success") {
            alert(title + " Updated");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovieGenre = async (gid: number) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "movie_id=" + movieId + "&genre_id=" + gid,
    };
    try {
      const response = await fetch(
        "https://ubaya.xyz/react/160421142/deletemoviegenre.php",
        options
      );
      response.json().then(async (resjson) => {
        console.log(resjson);
        setTriggerRefresh((prev) => !prev);
      });
    } catch (error) {
      console.error("Failed to delete movie genres:", error);
    }
  };

  const renderComboBox = () => {
    return (
      <View style={{ marginVertical: 10 }}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedGenre(value)}
          items={pilihanGenres}
          placeholder={{ label: "Select an option", value: null }}
        />
      </View>
    );
  };

  const imgGaleri = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const imgKamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaType,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  useEffect(() => {}, [imageUri]);

  const renderImageUri = () => {
    if (imageUri != "") {
      return (
        <View>
          <Image
            style={{ width: 300, height: 400 }}
            resizeMode="contain"
            source={{ uri: imageUri }}
          />
          <Button title="Upload" onPress={uploadScene} />
        </View>
      );
    }
    return null;
  };

  const uploadScene = async () => {
    const data = new FormData();
    data.append("id", movieId); // Add movie_id

    // Convert image URI into a Blob and append to FormData
    const response = await fetch(imageUri);
    const blob = await response.blob();
    data.append("image", blob, "scene.png"); // Append Blob with a custom file name

    // Set options for fetch
    const options = {
      method: "POST",
      body: data, // Attach FormData
      headers: {
        // No need for 'Content-Type'; FormData sets it automatically
      },
    };

    try {
      fetch("https://ubaya.xyz/react/160421142/uploadscene.php", options)
        .then((response) => response.json())
        .then((resjson) => {
          console.log(resjson);
          if (resjson.result === "success") alert("sukses");
          setTriggerRefresh((prev) => !prev);
          setImageUri("");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteScene = async (sceneUri: string) => {
    console.log(sceneUri);
    const data = new FormData();
    data.append("uri", sceneUri);

    const options = {
      method: "POST",
      body: data,
      headers: {
        // No need for 'Content-Type'; FormData sets it automatically
      },
    };

    try {
      fetch("https://ubaya.xyz/react/160421142/deletescene.php", options)
        .then((response) => response.json())
        .then((resjson) => {
          console.log(resjson);
          if (resjson.result === "success") alert("sukses");
          setTriggerRefresh((prev) => !prev);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={setTitle}
        value={title}
      />
      {renderTitleErrors()}

      <Text>description</Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={styles.input2}
        onChangeText={setDescription}
        value={description}
      />
      {renderdescriptionErrors()}

      <Text>Runtime</Text>
      <TextInput
        style={styles.input}
        placeholder="0"
        onChangeText={setRuntime}
        value={runtime}
      />
      {renderRuntimeErrors()}

      <Text>Release Date</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        onChangeText={setReleaseDate}
        value={releasedate}
      />
      {renderDateErrors()}

      <Text>Homepage</Text>
      <TextInput
        style={styles.input}
        placeholder="www.example.com"
        onChangeText={setHomepage}
        value={homepage}
      />
      {renderHomepageErrors()}

      <Text>URL Poster</Text>
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        onChangeText={setImageUrl}
        value={url}
      />
      {renderUrlErrors()}
      {renderPoster()}

      {renderButtonSubmit()}

      <Text>Genre:</Text>
      <FlatList
        data={genres}
        keyExtractor={(item) => item.genre_name}
        renderItem={({ item }) => (
          <View>
            <Text>{item.genre_name}</Text>
            <Button
              buttonStyle={{ backgroundColor: "rgba(214, 61, 57, 1)" }}
              icon={{
                name: "trash",
                type: "font-awesome",
                size: 15,
                color: "white",
              }}
              onPress={() => deleteMovieGenre(item.genre_id)}
            />
          </View>
        )}
      />
      {renderComboBox()}

      <Text>Scenes:</Text>
      <FlatList
        data={scenes}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View>
            <ImageBackground
              style={{ width: 300, height: 200 }}
              resizeMode="contain"
              source={{ uri: "https://ubaya.xyz/react/160421142/" + item }}
            >
              <Button
                icon={{ name: "trash", size: 30, color: "white" }}
                onPress={() => deleteScene(item)}
              />
            </ImageBackground>
          </View>
        )}
      ></FlatList>
      <Button title="Pick Scene" onPress={() => refRBSheet.current.open()} />
      {renderImageUri()}

      <RBSheet
        ref={refRBSheet}
        height={100}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <View style={styles.viewRow}>
          <Button
            style={{ margin: 5 }}
            title={"Camera"}
            icon={{ name: "camera", size: 17, color: "white" }}
            onPress={imgKamera}
          />
          <Button
            style={{ margin: 5 }}
            title="Gallery"
            icon={{ name: "folder", size: 17, color: "white" }}
            onPress={imgGaleri}
          />
        </View>
      </RBSheet>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    height: 40,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  input2: {
    height: 100,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  errorText: { color: "red", fontSize: 12, marginBottom: 10 },
  viewRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
  },
});
