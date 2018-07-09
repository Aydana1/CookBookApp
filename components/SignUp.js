import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import {
  Button,
  TextInput,
  TouchableRipple,
  DefaultTheme,
  Provider as PaperProvider
} from "react-native-paper";

const SIGN_UP = gql`
  mutation signUp($authProvider: AuthProviderSignupData!) {
    createUser(authProvider: $authProvider) {
      id
      email
      password
    }
  }
`;

class SignUp extends React.Component {
  state = {
    email: "",
    password: ""
  };

  signupUser = async () => {
    const { email, password } = this.state;
    await this.props.SIGN_UP({
      variables: {
        authProvider: {
          email: {
            email,
            password
          }
        }
      }
    });
    this.props.navigation.navigate("Login");
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
