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
  TextInput,
  TouchableRipple,
  DefaultTheme,
  Provider as PaperProvider
} from "react-native-paper";
import { ScrollView } from "../node_modules/react-native-gesture-handler";

const GET_ALL_RECIPES = gql`
  query {
    allRecipes {
      id
      title
      description
      instructions
      imageUrl
      ingredients
    }
  }
`;

const styles = StyleSheet.create({
  button: {
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 80,
    width: 50,
    height: 50,
    borderRadius: 40,
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "#39CCCC",
    marginLeft: 20
  }
});

class RecipeList extends React.Component {
  renderItem = ({ item: recipe }) => {
    const IMAGE_URL = recipe.imageUrl;
    return (
      <Card>
        <CardContent>
          <Title>{recipe.title}</Title>
          <Paragraph>{recipe.description}</Paragraph>
        </CardContent>
        <CardCover source={{ uri: IMAGE_URL }} />
        <CardActions>
          <Button
            onPress={() => {
              this.props.navigation.navigate("Detailed", {
                recipeID: recipe.id
              });
            }}
          >
            See more
          </Button>
        </CardActions>
      </Card>
    );
  };

  render() {
    return (
      <PaperProvider>
        <ScrollView>
          <Query query={GET_ALL_RECIPES}>
            {({ loading, data, error, refetch }) => {
              if (this.props.navigation.getParam("refetch", false)) {
                refetch();
              }
              return loading ? (
                <ActivityIndicator />
              ) : (
                <FlatList
                  keyExtractor={item => item.id}
                  data={data ? data.allRecipes : []}
                  renderItem={this.renderItem}
                />
              );
            }}
          </Query>

          <Button
            style={styles.button}
            color="white"
            compact
            onPress={() => this.props.navigation.navigate("CreateRecipe")}
          >
            +
          </Button>
        </ScrollView>
      </PaperProvider>
    );
  }
}

export default RecipeList;
