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

const GET_RECIPE = gql`
  {
    allRecipes {
      id
      title
      description
      instructions
      ingredients
      imageUrl
    }
  }
`;

const favouritesMutation = gql`
  mutation updateUser($id: ID!, $favRecipesIds: [ID!]) {
    updateUser(id: $id, favRecipesIds: $favRecipesIds) {
      id
      favRecipes {
        id
      }
    }
  }
`;

const deleteMutation = gql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;

class DetailsScreen extends React.Component {
  state = {
    favRecipesIds: [],
    isFavourite: false
  };

  deleteRecipe = async () => {
    const recipeID = this.props.navigation.state.params.recipeID;
    console.log("recipeid: ", recipeID);
    try {
      await this.props.deleteMutation({
        variables: {
          id: recipeID
        }
      });
      this.props.navigation.navigate("ShowRecipe");
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  shareRecipe = () => {
    console.log("clicked");
  };

  addToFavourites = async () => {
    const { user, recipeID } = this.props.navigation.state.params;
    const oldRecipesIds = user.favRecipes.map(recipe => recipe.id);
    const favRecipesIds = [...oldRecipesIds, recipeID];
    try {
      const result = await this.props.favouritesMutation({
        variables: {
          id: user.id,
          favRecipesIds
        }
      });
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  renderItem = ({ item: recipe }) => {
    const recipeID = this.props.navigation.state.params.recipeID;
    const IMAGE_URL = recipe.imageUrl;
    if (recipe.id === recipeID) {
      return (
        <Card>
          <CardContent>
            <Title>{recipe.title}</Title>
            <Paragraph>{recipe.description}</Paragraph>
            <Paragraph>{recipe.ingredients.join(",")}</Paragraph>
            <Paragraph>{recipe.instructions.join("; ")}</Paragraph>
          </CardContent>
          <CardActions>
            <Button onPress={this.deleteRecipe}>Delete</Button>
            <Button onPress={this.addToFavourites}>Add to Favourites</Button>
          </CardActions>
          <CardCover source={{ uri: IMAGE_URL }} />
          <CardActions>
            <Button
              icon={require("../images/share.png")}
              onPress={this.shareRecipe}
            />
          </CardActions>
        </Card>
      );
    }
  };

  render() {
    const recipeID = this.props.navigation.state.params.recipeID;
    return (
      <PaperProvider>
        <Query query={GET_RECIPE}>
          {({ loading, data, error }) =>
            loading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                keyExtractor={item => item.id}
                data={data ? data.allRecipes : []}
                renderItem={this.renderItem}
              />
            )
          }
        </Query>
      </PaperProvider>
    );
  }
}

export default graphql(
  favouritesMutation,
  { name: "favouritesMutation" },
  deleteMutation,
  { name: "deleteMutation" }
)(DetailsScreen);
