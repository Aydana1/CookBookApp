import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image
} from "react-native";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";

const GET_ALL_RECIPES = gql`
  query {
    allRecipes {
      id
      title
      description
      instructions
      imageUrl
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between"
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
  },
  list: {
    marginTop: 30,
    alignItems: "center"
  },
  flat: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    padding: 10,
    width: 300,
    backgroundColor: "#7FDBFF",
    alignItems: "center"
  }
});

class RecipeList extends React.Component {
  renderItem = ({ item: recipe }) => {
    const IMAGE_URL = recipe.imageUrl;
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.navigation.navigate("Detailed", {
            recipeID: recipe.id
          });
        }}
        style={styles.list}
      >
        <View style={styles.flat}>
          <Text style={{ fontSize: 20, color: "#001f3f" }}>{recipe.title}</Text>
          <Text style={{ fontSize: 20, color: "white" }}>
            {recipe.description}
          </Text>
          {IMAGE_URL && (
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: IMAGE_URL }}
            />
          )}
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <PaperProvider>
        <View style={styles.container}>
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
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate("CreateRecipe")}
            style={styles.button}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Add a new Recipe
            </Text>
          </TouchableHighlight>
        </View>
      </PaperProvider>
    );
  }
}

export default RecipeList;
