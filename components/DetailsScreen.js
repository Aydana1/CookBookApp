import { ActivityIndicator, FlatList, Text, View, Image } from "react-native";
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
  TextInput,
  TouchableRipple,
  DefaultTheme,
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

class DetailsScreen extends React.Component {
  renderItem = ({ item: recipe }) => {
    const IMAGE_URL = recipe.imageUrl;
    const recipeID = this.props.navigation.state.params.recipeID;
    if (recipe.id === recipeID) {
      return (
        <Card>
          <CardContent>
            <Title>{recipe.title}</Title>
            <Paragraph>{recipe.description}</Paragraph>
          </CardContent>
          <CardCover source={{ uri: IMAGE_URL }} />
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

export default DetailsScreen;
