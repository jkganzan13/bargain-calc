import React, { Component } from 'react'
import R from 'ramda'
import PropTypes from 'prop-types';
import { Modal, Text, View } from 'react-native'
import { Item, Label, Input, Button, Icon } from 'native-base'
import styles from './Styles/CategoriesModalStyles'
import { CATEGORY_KEYS } from '../Common/constants'

class CategoriesModal extends Component {
  state = {
    error: false,
    title: '',
    item: {
      title: '',
      description: '',
    }
  };

  componentWillReceiveProps = (props) => {
    this.setState({
      ...props,
    })
  };

  handleStateChange = key => value => this.setState({ item: {
    ...this.state.item,
    [key]: value }
  });

  handleSubmit = () => {
    this.props.closeModal();
    if (!this.state.item.name) {
      return this.setState({ error: true })
    }
    const category = R.pickAll(CATEGORY_KEYS, this.state.item);
    this.props.onConfirm(category)
  }

  render() {
    const { visible, closeModal, title } = this.props;
    const { error, item } = this.state;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={closeModal}
      >
        <View style={styles.container}>
          <View style={styles.modal}>
            <Text style={styles.title}>{title}</Text>

            <Item
              floatingLabel
              style={styles.inputContainer}
              error={error}
            >
              <Label style={styles.label}>Name</Label>
              <Input
                ref="category"
                value={item.name}
                fixedLabel={false}
                keyboardType="default"
                returnKeyType="next"
                autoCorrect
                onChangeText={this.handleStateChange('name')}
                underlineColorAndroid="transparent"
              />
              { error && <Icon name='md-close-circle' /> }
            </Item>

            <Item
              style={styles.inputContainer}
              floatingLabel
            >
              <Label style={styles.label}>Description</Label>
              <Input
                ref="description"
                value={item.description}
                fixedLabel={false}
                keyboardType="default"
                returnKeyType="next"
                autoCorrect
                onChangeText={this.handleStateChange('description')}
                underlineColorAndroid="transparent"
                multiline={true}
                numberOfLines={2}
              />
            </Item>

            <View style={styles.btnContainer}>
              <Button style={styles.btn} onPress={this.handleSubmit}>
                <Text style={styles.btnText}>Save</Text>
              </Button>
              <Button style={styles.btn} onPress={closeModal}>
                <Text style={styles.btnText}>Cancel</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

CategoriesModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  title: PropTypes.string,
  item: PropTypes.object,

};

export default CategoriesModal
