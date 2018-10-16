import { ActivityIndicator, FlatList, Text, View, Image } from "react-native";
import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardCover,
  Title,
  Paragraph,
  Provider as PaperProvider
} from "react-native-paper";

const GET_USER = gql`
  query getOneUser($id: ID!) {
    User(id: $id) {
      email
      profileImageUrl
      favRecipes {
        id
        title
      }
    }
  }
`;

class Profile extends React.Component {
  render() {
    const { user } = this.props.navigation.state.params;
    const userID = user.id;
    console.log("ID= ", userID);
    return (
      <PaperProvider>
        <Query query={GET_USER} variables={{ id: userID }}>
          {({ loading, data, error }) =>
            loading ? <ActivityIndicator /> : <Text>{data.User.email}</Text>
          }
        </Query>
      </PaperProvider>
    );
  }
}

export default Profile;
