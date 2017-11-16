import React from "react";
import { connect } from "react-redux";
import { List, ListItem, Container, Header, Title, Button, Left, Right, Body, Icon, Fab } from "native-base";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet  } from 'react-native'
import { Colors } from '../Themes/'
import styles from './Styles/CategoriesStyles'
import CategoriesModal from '../Components/CategoriesModal'
import { CATEGORIES_MODAL_ACTIONS } from '../Common/constants'
import CategoriesActions from "../Redux/CategoriesRedux";

const MyCard = ({ onPress, children, count, title }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.categoriesItem}
  >
    <View>
      {children}
    </View>
    <Icon style={styles.categoryIcon} name="ios-arrow-forward" />
  </TouchableOpacity>
)

class Categories extends React.Component {
  state = {
    modalVisible: false,
  }

  toggleModalVisible = () => this.setState({ modalVisible: !this.state.modalVisible })

  handleAddModalConfirm = (category) => {
    this.props.saveCategory(category);
    this.toggleModalVisible();
  }

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
            {/*<Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>*/}
              {/*<Icon name='md-menu' />*/}
            {/*</Button>*/}
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
          onPress={this.toggleModalVisible}
        >
          <Icon style={StyleSheet.flatten(styles.fabIcon)} name="md-add">
            <Text style={styles.fabText}>{` Add`}</Text>
          </Icon>
        </Fab>
        <CategoriesModal
          title="Add Category"
          visible={this.state.modalVisible}
          onConfirm={this.handleAddModalConfirm}
          onCancel={this.toggleModalVisible}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories.categories,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveCategory: (category) => dispatch(CategoriesActions.saveCategory(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
