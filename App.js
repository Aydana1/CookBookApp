import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import CreateRecipeForm from "./components/CreateRecipeForm";
import RecipeList from "./components/RecipeList";
import DetailsScreen from "./components/DetailsScreen";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import FavRecipes from "./components/FavRecipes";
import Profile from "./components/Profile";
import Home from "./components/Home";

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cjj6o6s7m3p8e0110wb4bzbfk"
});

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f"
  }
};

class App extends React.Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <ApolloProvider client={client}>
          <RootStack />
        </ApolloProvider>
      </PaperProvider>
    );
  }
}

const RootStack = createStackNavigator(
  {
    ShowRecipe: RecipeList,
    Detailed: DetailsScreen,
    CreateRecipe: CreateRecipeForm,
    Register: SignUp,
    Login: Login,
    Profile: Profile,
    FavRecipes: FavRecipes,
    Home: Home
  },
  {
    initialRouteName: "Login"
  }
);

// const TabBar = createBottomTabNavigator({
//   FavRecipes: FavRecipes,
//   ShowRecipe: RecipeList
// });

export default App;
