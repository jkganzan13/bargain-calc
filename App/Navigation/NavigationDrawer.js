import React from "react";
import { DrawerNavigator } from "react-navigation";
import ItemsList from '../Containers/ItemsList'
import CreateItem from '../Containers/CreateItem'
import ListviewExample from "../Containers/ListviewExample";
import DrawerContent from "../Containers/DrawerContent";

import styles from "./Styles/NavigationStyles";

const NavigationDrawer = DrawerNavigator({
    ItemsList: { screen: ItemsList },
    CreateItem: { screen: CreateItem },
    ListviewExample: { screen: ListviewExample },
  },
  {
    initialRouteName: "ListviewExample",
    contentComponent: props => <DrawerContent {...props} />,
  }
);

export default NavigationDrawer;
