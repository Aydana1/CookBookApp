import {
  Image,
  Alert,
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import { Permissions, ImagePicker } from "expo";
import {
  Button,
  TextInput,
  TouchableRipple,
  DefaultTheme,
  Provider as PaperProvider
} from "react-native-paper";

const IMG_URL = "https://api.graph.cool/file/v1/cjj6o6s7m3p8e0110wb4bzbfk";

const SIGN_UP = gql`
  mutation signUp(
    $profileImageUrl: String
    $authProvider: AuthProviderSignupData!
  ) {
    createUser(profileImageUrl: $profileImageUrl, authProvider: $authProvider) {
      id
      email
      password
      profileImageUrl
    }
  }
`;

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    profileImageUrl: ""
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
    this.setState({
      profileImageUrl: jsonRes.url
    });
  };

  signupUser = async () => {
    const { email, password, profileImageUrl } = this.state;
    await this.props.SIGN_UP({
      variables: {
        authProvider: {
          email: {
            email,
            password,
            profileImageUrl
          }
        }
      }
    });
    this.props.navigation.navigate("Login");
  };

  render() {
    console.log("entered!");
    return (
      <PaperProvider>
        <React.Fragment>
          <TextInput
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
            placeholder="email"
          />
          <TextInput
            secureTextEntry
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
            placeholder="password"
          />

          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                backgroundColor: "#dddddd"
              }}
              source={{ uri: this.state.profileImageUrl }}
            />
          </View>
          <Button color="#0074D9" compact onPress={this.handleUploadButton}>
            Choose a photo
          </Button>

          <Button color="#0074D9" raised onPress={() => this.signupUser()}>
            Sign up
          </Button>

          <Button
            color="#85144b"
            raised
            onPress={() => this.props.navigation.navigate("Login")}
          >
            Sign in
          </Button>
        </React.Fragment>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    margin: 15,
    padding: 40
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
  }
});

export default graphql(SIGN_UP, { name: "SIGN_UP" })(SignUp);
