import React from "react";
import { connect } from "react-redux";
import { List, ListItem, Container, Header, Title, Button, Left, Right, Body, Icon, Fab } from "native-base";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet  } from 'react-native'
import { Colors } from '../Themes/'
import styles from './Styles/CategoriesStyles'

const MyCard = ({ onPress, children, count, title }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.categoriesItem}
  >
    {children}
  </TouchableOpacity>
)

class Categories extends React.Component {
  _renderItem = (item, i) => {
    const onPress = () => this.props.navigation.navigate("ItemsList", { category: item.title });

    return (
      <MyCard
        key={i}
        onPress={onPress}
      >
        <Text style={styles.categoryTitle}>{item.title}</Text>
        <Text style={styles.count}>{`${item.items.length} items`}</Text>
      </MyCard>
    );
  };

  render() {
    return (
      <Container style={styles.mainContainer}>
        <Header
          style={styles.header}
          androidStatusBarColor={Colors.status}
        >
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name='md-menu' />
            </Button>
          </Left>
          <Body>
            <Title>My Categories</Title>
          </Body>
        </Header>
        <ScrollView contentContainerStyle={styles.categoriesContainer}>
          { this.props.categories.map(this._renderItem) }
        </ScrollView>
        <Fab
          style={styles.fab}
          onPress={() => this.props.navigation.navigate("CreateItem")}
        >
          <Icon style={StyleSheet.flatten(styles.fabIcon)} name="md-add">
            <Text style={styles.fabText}>{` Add`}</Text>
          </Icon>
        </Fab>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories.categories,
  };
};

export default connect(mapStateToProps)(Categories);
