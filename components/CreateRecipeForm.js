import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import { Permissions, ImagePicker } from "expo";

const IMG_URL = "https://api.graph.cool/file/v1/cjj6o6s7m3p8e0110wb4bzbfk";

const createPostMutation = gql`
  mutation($description: String!, $title: String!, $imageUrl: String) {
    createRecipe(
      description: $description
      title: $title
      imageUrl: $imageUrl
    ) {
      id
      title
      description
      imageUrl
    }
  }
`;

class CreateRecipeForm extends React.Component {
  state = {
    title: "",
    description: "",
    imageUrl: ""
  };

  handleUploadButton = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const photo = await ImagePicker.launchImageLibraryAsync();
    console.log("photo: ", photo);

    let formData = new FormData();
    formData.append("data", {
      uri: photo.uri,
      name: "img.png",
      type: "multipart/form-data"
    });

    const res = await fetch(IMG_URL, {
      method: "POST",
      body: formData
    });

    const jsonRes = await res.json();
    const imgID = jsonRes.id;
    console.log("ID: " + imgID);
    this.setState({
      imageUrl: jsonRes.url
    });
    console.log("JSON: " + jsonRes.url);
  };

  createPost = async () => {
    const { title, description, imageUrl } = this.state;
    await this.props.createPostMutation({
      variables: { title, description, imageUrl }
    });
    this.props.navigation.navigate("ShowRecipe", { refetch: true });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.view}>
          <View style={styles.input}>
            <TextInput
              style={{
                borderWidth: 1,
                borderBottomColor: "grey",
                fontSize: 20,
                margin: 10,
                width: 200
              }}
              value={this.state.title}
              onChangeText={text => this.setState({ title: text })}
              placeholder="Title"
            />
            <TextInput
              style={{
                borderWidth: 1,
                borderBottomColor: "grey",
                fontSize: 20,
                margin: 10
              }}
              value={this.state.description}
              onChangeText={text => this.setState({ description: text })}
              placeholder="Description"
            />
          </View>
          <Image
            style={{ width: 300, height: 300, backgroundColor: "#dddddd" }}
            source={{ uri: this.state.imageUrl }}
          />

          <TouchableOpacity
            onPress={this.handleUploadButton}
            style={styles.button2}
          >
            <Text style={{ textAlign: "center" }}>Choose a photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.createPost();
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    margin: 15,
    padding: 40
  },
  photoPlaceholder: {
    backgroundColor: "rgba(42,126,211,.1)",
    height: 80,
    width: 80
  },
  button: {
    marginTop: 100,
    padding: 10,
    borderRadius: 10,
    width: 200,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 60,
    backgroundColor: "#39CCCC"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  button2: {
    marginTop: 100,
    padding: 10,
    borderRadius: 10,
    width: 200,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 60,
    backgroundColor: "#39CCCC"
  },
  contentContainer: {
    paddingVertical: 20
  }
});

export default graphql(createPostMutation, { name: "createPostMutation" })(
  CreateRecipeForm
);
