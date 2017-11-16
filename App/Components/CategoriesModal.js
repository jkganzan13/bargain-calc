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
    description: '',
  }

  handleStateChange = key => value => this.setState({ [key]: value })

  handleSubmit = () => {
    if (!this.state.title) {
      return this.setState({ error: true })
    }
    const category = R.pickAll(CATEGORY_KEYS, this.state);
    this.props.onConfirm(category)
  }

  render() {
    const { visible, onCancel, title } = this.props;
    const { error, category, description } = this;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={onCancel}
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
                value={category}
                fixedLabel={false}
                keyboardType="default"
                returnKeyType="next"
                autoCorrect
                onChangeText={this.handleStateChange('title')}
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
                value={description}
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
              <Button style={styles.btn} onPress={onCancel}>
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
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default CategoriesModal
