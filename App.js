import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { createStackNavigator } from "react-navigation";
import React from "react";

import CreateRecipeForm from "./components/CreateRecipeForm";
import RecipeList from "./components/RecipeList";
import DetailsScreen from "./components/DetailsScreen";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cjj6o6s7m3p8e0110wb4bzbfk"
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <RootStack />
      </ApolloProvider>
    );
  }
}

const RootStack = createStackNavigator(
  {
    ShowRecipe: RecipeList,
    Detailed: DetailsScreen,
    CreateRecipe: CreateRecipeForm,
    Register: SignUp,
    Login: Login
  },
  {
    initialRouteName: "Register"
  }
);

export default App;
