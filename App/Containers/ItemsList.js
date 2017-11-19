import React, { Component } from 'react'
import { BackHandler, StyleSheet } from 'react-native'
import { Content, List, ListItem, Text, View, Container, Header, Title, Button, Left, Right, Body, Icon, Fab } from 'native-base'
import { connect } from 'react-redux'
import Accordion from 'react-native-collapsible/Accordion';
import { Colors } from '../Themes/'


// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

const Savings = ({ price }) => (
  <View style={styles.savingsContainer}>
    <Text style={styles.itemName}>${price}</Text>
    <Text style={[styles.itemExpiry, styles.saved]}>saved</Text>
  </View>
);

const ItemName = ({ name, expiry }) => (
  <View style={styles.itemNameContainer}>
    <Text style={styles.itemName}>{name}</Text>
    <Text style={styles.itemExpiry}>expires {expiry}</Text>
  </View>
)

// Styles
import styles from './Styles/ItemsListStyle'

class ItemsList extends Component {
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }

  _renderHeader = item => (
    <View style={[styles.item, styles.itemRow, styles.itemHeader]}>
      <ItemName name={item.name} expiry={item.saleExpiry} />
      <Savings price={item.savings} />
    </View>
  )

  _renderContent = item => (
    <View style={[styles.item, styles.borderedRadius, styles.itemContentList]}>
      <View style={[styles.itemRow, styles.itemContent]}>
        <Text style={styles.text}>{`Original Price:`}</Text>
        <Text style={styles.text}>${item.originalPrice}</Text>
      </View>
      <View style={[styles.itemRow, styles.itemContent]}>
        <Text style={styles.text}>{`Sale Price:`}</Text>
        <Text style={styles.text}>${item.salePrice}</Text>
      </View>
      <View style={[styles.itemRow]}>
      </View>
    </View>
  )

  render () {
    const category = this.props.navigation.state.params.category;
    const { items } = this.props.categories.find(c => c.name === category);

    return (
      <Container style={styles.mainContainer}>
        <Header
          style={styles.header}
          androidStatusBarColor={Colors.status}
        >
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="md-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{category}</Title>
          </Body>
        </Header>
        <Content style={styles.content}>
          {
            items.length
              ? <Accordion
                  sections={items}
                  renderHeader={this._renderHeader}
                  renderContent={this._renderContent}
                  underlayColor="transparent"
                />
              : <Text style={styles.text}>No items</Text>
          }
        </Content>
        <Fab
          style={styles.fab}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate("CreateItem")}
        >
          <Icon name="md-add" />
        </Fab>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList)
