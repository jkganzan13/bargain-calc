import React from "react";
import { DrawerNavigator } from "react-navigation";
import ItemsList from '../Containers/ItemsList'
import CreateItem from '../Containers/CreateItem'
import Categories from "../Containers/Categories";
import DrawerContent from "../Containers/DrawerContent";

import styles from "./Styles/NavigationStyles";

const NavigationDrawer = DrawerNavigator({
    ItemsList: { screen: ItemsList },
    CreateItem: { screen: CreateItem },
    Categories: { screen: Categories },
  },
  {
    initialRouteName: "Categories",
    contentComponent: props => <DrawerContent {...props} />,
  }
);

export default NavigationDrawer;
