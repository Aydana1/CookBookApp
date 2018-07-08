import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import React from "react";

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
      <View>
        <View style={styles.input}>
          <TextInput
            style={{
              borderWidth: 1,
              borderBottomColor: "grey",
              fontSize: 20,
              margin: 10,
              width: 200
            }}
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
            placeholder="email"
          />
          <TextInput
            secureTextEntry
            style={{
              borderWidth: 1,
              borderBottomColor: "grey",
              fontSize: 20,
              margin: 10,
              width: 200
            }}
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
            placeholder="password"
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.signupUser();
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
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
