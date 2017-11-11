import React, { Component } from 'react'
import { BackHandler, View } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Text,
  Title,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Picker,
} from 'native-base';
import { connect } from 'react-redux'
import CategoriesActions from "../Redux/CategoriesRedux";
import DatePicker from 'react-native-datepicker';
import { Colors } from '../Themes/'


// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CreateItemStyle'


const PickerItem = ({ style, label, onChangePicker, selectedValue, options }) => (
  <Item inlineLabel style={style}>
    <Label style={styles.label}>{label}</Label>
    <Picker
      iosHeader="Select category"
      placeholder="Select category"
      mode="dropdown"
      selectedValue={selectedValue}
      onValueChange={onChangePicker}
      style={styles.picker}
    >
      {
        options.map((c, i) => (
          <Item key={i} label={c.title} value={c.title} />
        ))
      }
    </Picker>
  </Item>
);

class CreateItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      category: props.categories[0] && props.categories[0].title,
      name: '',
      originalPrice: '',
      salePrice: '',
      saleExpiry: '',
      error: false,
    }

    this.handleStateChange = this.handleStateChange.bind(this)
  }
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }

  handleStateChange = key => value => {
    this.setState({ [key]: value })
  }

  handlePriceChange = key => value => {
    const price = parseInt(value.replace('$',''));
    this.handleStateChange(key)(price || '');
  }

  handleSave = () => {
    if(!this.state.name) {
      return this.setState({ error: true })
    }
    const item = {
      ...this.state,
      savings: this.calculateSavings(),
    };
    delete item.error;
    console.log(item)
    this.props.saveItem(item);
    this.props.navigation.goBack();
  }

  calculateSavings = () => (this.state.originalPrice - this.state.salePrice).toFixed(2);

  render () {
    const {
      category,
      name,
      originalPrice,
      salePrice,
      saleExpiry,
    } = this.state;
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
            <Title>Create Item</Title>
          </Body>
        </Header>
        <Content style={styles.content}>
          <Form style={styles.screenSection}>
            <PickerItem
              label="Category"
              onChangePicker={this.handleStateChange('category')}
              selectedValue={category}
              options={this.props.categories}
              style={styles.inputContainer}
            />
            <Item
              inlineLabel
              error={this.state.error}
              style={styles.inputContainer}
            >
              <Label style={styles.label}>Name</Label>
              <Input
                ref="name"
                value={name}
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect
                onChangeText={this.handleStateChange('name')}
                underlineColorAndroid="transparent"
              />
              { this.state.error && <Icon name='md-close-circle' /> }
            </Item>
            <Item inlineLabel style={styles.inputContainer}>
              <Label style={styles.label}>Original Price</Label>
              <Input
                ref="originalPrice"
                value={`$ ${originalPrice}`}
                keyboardType="numbers-and-punctuation"
                returnKeyType="next"
                autoCapitalize="none"
                onChangeText={this.handlePriceChange('originalPrice')}
                underlineColorAndroid="transparent"
              />
            </Item>
            <Item inlineLabel style={styles.inputContainer}>
              <Label style={styles.label}>Sale Price</Label>
              <Input
                ref="salePrice"
                value={`$ ${salePrice}`}
                keyboardType="numbers-and-punctuation"
                returnKeyType="next"
                autoCapitalize="none"
                onChangeText={this.handlePriceChange('salePrice')}
                underlineColorAndroid="transparent"
              />
            </Item>
            <Item inlineLabel style={styles.inputContainer}>
              <Label style={styles.label}>Sale Expiry</Label>
              <DatePicker
                style={styles.datepicker}
                date={saleExpiry}
                mode="date"
                placeholder="Select Date"
                format="DD-MMM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={this.handleStateChange('saleExpiry')}
                showIcon={false}
                customStyles={{
                  dateInput: styles.dateInput,
                }}
              />
            </Item>
          </Form>
          <View style={[styles.screenSection, styles.savingsContainer]}>
            <Text style={styles.label}>Savings</Text>
            <Text style={styles.savings}>$ {this.calculateSavings()}</Text>
          </View>
          <Button style={styles.saveBtn} onPress={this.handleSave}>
            <Text style={styles.saveBtnText}>Save</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories.categories,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveItem: (item) => dispatch(CategoriesActions.saveItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateItem)
