import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList
} from "react-native";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import { Permissions, ImagePicker } from "expo";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardCover,
  Title,
  Paragraph,
  TextInput,
  TouchableRipple,
  DefaultTheme,
  Provider as PaperProvider
} from "react-native-paper";

const IMG_URL = "https://api.graph.cool/file/v1/cjj6o6s7m3p8e0110wb4bzbfk";

const createPostMutation = gql`
  mutation(
    $description: String!
    $title: String!
    $imageUrl: String
    $ingredients: [String!]
    $instructions: [String!]
  ) {
    createRecipe(
      description: $description
      title: $title
      imageUrl: $imageUrl
      ingredients: $ingredients
      instructions: $instructions
    ) {
      id
      title
      description
      imageUrl
      ingredients
      instructions
    }
  }
`;

class CreateRecipeForm extends React.Component {
  state = {
    title: "",
    description: "",
    imageUrl: "",
    ingredient: "",
    ingredients: [],
    instruction: "",
    instructions: []
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
    const {
      title,
      description,
      imageUrl,
      ingredients,
      instructions
    } = this.state;
    await this.props.createPostMutation({
      variables: { title, description, imageUrl, ingredients, instructions }
    });
    this.props.navigation.navigate("ShowRecipe", { refetch: true });
  };

  renderItem = ({ item }) => {
    return <Text>{item}</Text>;
  };

  renderItem2 = ({ item }) => {
    return <Text>{item}</Text>;
  };

  render() {
    return (
      <PaperProvider>
        <ScrollView>
          <TextInput
            value={this.state.title}
            onChangeText={text => this.setState({ title: text })}
            placeholder="Title"
          />
          <TextInput
            value={this.state.description}
            onChangeText={text => this.setState({ description: text })}
            placeholder="Description"
          />
          <TextInput
            value={this.state.ingredient}
            onChangeText={text => {
              this.setState({ ingredient: text });
            }}
            placeholder="Ingredients"
          />

          <FlatList
            data={this.state.ingredients}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
          />

          <Button
            style={styles.button}
            color="white"
            compact
            onPress={() => {
              this.setState({
                ingredients: [...this.state.ingredients, this.state.ingredient]
              });
            }}
          >
            +
          </Button>

          <TextInput
            value={this.state.instruction}
            onChangeText={text => {
              this.setState({ instruction: text });
            }}
            placeholder="Instructions"
          />

          <FlatList
            data={this.state.instructions}
            keyExtractor={item => item.id}
            renderItem={this.renderItem2}
          />

          <Button
            style={styles.button}
            color="white"
            compact
            onPress={() => {
              this.setState({
                ingredients: [
                  ...this.state.instructions,
                  this.state.instruction
                ]
              });
            }}
          >
            +
          </Button>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={{
                width: 200,
                height: 200,
                backgroundColor: "#dddddd"
              }}
              source={{ uri: this.state.imageUrl }}
              placeholder={require("../images/food.jpg")}
            />
          </View>

          <Button color="#0074D9" compact onPress={this.handleUploadButton}>
            Choose a photo
          </Button>

          <Button
            color="#0074D9"
            raised
            onPress={() => {
              this.createPost();
            }}
          >
            Submit
          </Button>
        </ScrollView>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 50,
    width: 50,
    height: 50,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 60,
    backgroundColor: "#39CCCC"
  }
});

export default graphql(createPostMutation, { name: "createPostMutation" })(
  CreateRecipeForm
);
