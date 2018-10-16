import { Image, Text, View, StyleSheet } from "react-native";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import {
  Button,
  TextInput,
  Provider as PaperProvider
} from "react-native-paper";

const SIGN_IN = gql`
  mutation signIn($email: AUTH_PROVIDER_EMAIL) {
    signinUser(email: $email) {
      token
      user {
        id
        email
        password
        favRecipes {
          id
          title
          description
          ingredients
          instructions
        }
      }
    }
  }
`;

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  signinUser = async () => {
    const { email, password } = this.state;

    try {
      const data = await this.props.SIGN_IN({
        variables: {
          email: {
            email,
            password
          }
        }
      });
      const user = data.data.signinUser.user;
      this.props.navigation.navigate("Home", { user });
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  render() {
    return (
      <PaperProvider>
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

        <Button color="#85144b" raised onPress={() => this.signinUser()}>
          Sign in
        </Button>
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

export default graphql(SIGN_IN, { name: "SIGN_IN" })(Login);
