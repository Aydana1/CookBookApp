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

const SIGN_IN = gql`
  mutation signIn($email: AUTH_PROVIDER_EMAIL) {
    signinUser(email: $email) {
      token
      user {
        id
        email
        password
      }
    }
  }
`;

class Login extends React.Component {
  state = {
    id: "",
    email: "",
    password: ""
  };

  signinUser = async () => {
    const { email, password } = this.state;
    await this.props.SIGN_IN({
      variables: {
        email: {
          email,
          password
        }
      }
    });
    this.props.navigation.navigate("ShowRecipe");
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.signinUser();
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

export default graphql(SIGN_IN, { name: "SIGN_IN" })(Login);
