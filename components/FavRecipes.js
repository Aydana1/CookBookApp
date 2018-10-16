import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Query } from "react-apollo";
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
import { ScrollView } from "../node_modules/react-native-gesture-handler";

const GET_ALL_USERS = gql`
  query getOneUser($id: ID!) {
    User(id: $id) {
      email
      favRecipes {
        id
        title
        description
        imageUrl
      }
    }
  }
`;

class FavRecipes extends React.Component {
  renderItem = ({ item: recipe }) => {
    //console.log("recipe ", recipe);
    const IMAGE_URL = recipe.imageUrl;
    return (
      <Card>
        <CardContent>
          <Title>{recipe.title}</Title>
          <Paragraph>{recipe.description}</Paragraph>
        </CardContent>
        <CardCover source={{ uri: IMAGE_URL }} />
      </Card>
    );
  };

  render() {
    const user = this.props.navigation.state.params.user;
    console.log("USER:: ", user);
    const id = user.id;
    return (
      <PaperProvider>
        <ScrollView>
          <Query query={GET_ALL_USERS} variables={{ id }}>
            {
              ({ loading, data, error, refetch }) => {
              if (this.props.navigation.getParam("refetch", false)) {
                refetch();
              }

              return loading ? (
                <ActivityIndicator />
              ) : (
                <FlatList
                  keyExtractor={item => item.id}
                  data={data ? data.User.favRecipes : []}
                  //pull to refresh
                  renderItem={this.renderItem}
                />
              );
              }
            }
          </Query>
        </ScrollView>
      </PaperProvider>
    );
  }
}

export default FavRecipes;
