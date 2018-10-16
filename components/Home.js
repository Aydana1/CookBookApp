import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Version can be specified in package.json
import { TabNavigator, TabBarBottom } from "react-navigation"; // Version can be specified in package.json
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Text
} from "react-native";
import { Query } from "react-apollo";
import gql from "graphql-tag";
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

import FavRecipes from "./components/FavRecipes";
import Profile from "./components/Profile";

// const GET_ALL_USERS = gql`
//   query getOneUser($id: ID!) {
//     User(id: $id) {
//       email
//       favRecipes {
//         id
//         title
//         description
//         imageUrl
//       }
//     }
//   }
// `;

// class FavRecipes extends React.Component {
//   renderItem = ({ item: recipe }) => {
//     //console.log("recipe ", recipe);
//     const IMAGE_URL = recipe.imageUrl;
//     return (
//       <Card>
//         <CardContent>
//           <Title>{recipe.title}</Title>
//           <Paragraph>{recipe.description}</Paragraph>
//         </CardContent>
//         <CardCover source={{ uri: IMAGE_URL }} />
//       </Card>
//     );
//   };

//   render() {
//     const user = this.props.navigation.state.params.user;
//     console.log("USER:: ", user);
//     const id = user.id;
//     return (
//       <PaperProvider>
//         <ScrollView>
//           <Query query={GET_ALL_USERS} variables={{ id }}>
//             {({ loading, data, error, refetch }) => {
//               if (this.props.navigation.getParam("refetch", false)) {
//                 refetch();
//               }

//               return loading ? (
//                 <ActivityIndicator />
//               ) : (
//                 <FlatList
//                   keyExtractor={item => item.id}
//                   data={data ? data.User.favRecipes : []}
//                   //pull to refresh
//                   renderItem={this.renderItem}
//                 />
//               );
//             }}
//           </Query>
//         </ScrollView>
//       </PaperProvider>
//     );
//   }
// }

class Home extends React.Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <TabNavigator />
      </PaperProvider>
    );
  }
}

export default TabNavigator(
  {
    FavRecipes: { screen: FavRecipes },
    ShowRecipe: { screen: ShowRecipe }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "FavRecipes") {
          iconName = `ios-information-circle${focused ? "" : "-outline"}`;
        } else if (routeName === "ShowRecipe") {
          iconName = `ios-options${focused ? "" : "-outline"}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    },
    animationEnabled: false,
    swipeEnabled: false
  }
);
