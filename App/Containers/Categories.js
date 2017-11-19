import React from "react";
import { connect } from "react-redux";
import { List, ListItem, Container, Header, Title, Button, Left, Right, Body, Icon, Fab, Content } from "native-base";
import { View, Text, Alert, TouchableOpacity, StyleSheet, ListView } from 'react-native'
import { Colors } from '../Themes/'
import styles from './Styles/CategoriesStyles'
import CategoriesModal from '../Components/CategoriesModal'
import CategoriesActions from "../Redux/CategoriesRedux";

const Category = ({ onPress, children, count, title }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.categoriesItem}
  >
    <View style={styles.categoriesItemInner}>
      <View>
        {children}
      </View>
      <Icon style={styles.categoryIcon} name="ios-arrow-forward" />
    </View>
  </TouchableOpacity>
)

class Categories extends React.Component {
  state = {
    modalVisible: false,
    promptVisible: false,
    modalProps: {},
  }

  toggleModalVisible = () => this.setState({ modalVisible: !this.state.modalVisible });

  onEditPress = (category) => {
    this.setState({
      modalProps: {
        title: 'Edit Category',
        item: category,
        onConfirm: this.props.editCategory,
      },
      modalVisible: true,
    });
  };

  onDeletePress = (category, secId, rowId, rowMap) => {
    const alertTitle = `Delete ${category.name}`;
    const alertMsg = `Are you sure you want to delete ${category.name} category?`;
    const alertBtns = [
      { text: 'Cancel', onPress: () => {} },
      { text: 'OK', onPress: () => {
        rowMap[`${secId}${rowId}`].props.closeRow();
        this.props.deleteCategory(category.id);
      }}
    ];
    Alert.alert(alertTitle, alertMsg, alertBtns);
  };

  handleAddModalConfirm = () => {
    this.setState({
      modalProps: {
        title: 'Add Category',
        item: {},
        onConfirm: this.props.saveCategory,
      },
      modalVisible: true,
    });
  }

  _renderItem = (item, i) => {
    const onPress = () => this.props.navigation.navigate("ItemsList", { category: item.name });

    return (
      <Category
        key={i}
        onPress={onPress}
      >
        <Text style={styles.categoryTitle}>{item.name}</Text>
        <Text style={styles.count}>{`${item.items.length} items`}</Text>
      </Category>
    );
  };

  _renderLeftIcon = (category) => (
    <Button style={styles.leftIcon} full onPress={() => this.onEditPress(category)}>
      <Icon active name="md-create" />
    </Button>
  );

  _renderRightIcon = (category, secId, rowId, rowMap) => (
    <Button style={styles.rightIcon} full danger onPress={() => this.onDeletePress(category, secId, rowId, rowMap)}>
      <Icon active name="trash" />
    </Button>
  );

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => {
      return r1.name !== r2.name || r1.description !== r2.description || r1.items.length !== r2.items.length
    }});
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
        <Content style={styles.categoriesContainer}>
          {/*{ this.props.categories.map(this._renderItem) }*/}
          <List
            dataSource={ds.cloneWithRows(this.props.categories)}
            renderRow={this._renderItem}
            renderLeftHiddenRow={this._renderLeftIcon}
            renderRightHiddenRow={this._renderRightIcon}
            leftOpenValue={75}
            rightOpenValue={-75}
            stopLeftSwipe={75}
            stopRightSwipe={-75}
          />
        </Content>

        <Fab
          style={styles.fab}
          onPress={this.handleAddModalConfirm}
        >
          <Icon style={StyleSheet.flatten(styles.fabIcon)} name="md-add">
            <Text style={styles.fabText}>{` Add`}</Text>
          </Icon>
        </Fab>
        <CategoriesModal
          visible={this.state.modalVisible}
          closeModal={this.toggleModalVisible}
          {...this.state.modalProps}
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
    deleteCategory: (id) => dispatch(CategoriesActions.deleteCategory(id)),
    editCategory: (category) => dispatch(CategoriesActions.editCategory(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
