import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  picker: {
    flex: 1,
  },
  savingsContainer: {
    ...ApplicationStyles.flexRowContainer,
    height: 44,
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  screenSection: {
    backgroundColor: Colors.white,
    elevation: 5,
  },
  inputContainer: {
    marginLeft: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
  savings: {
    paddingLeft: 5,
  },
  saveBtn: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: Colors.primary,
    elevation: 5,
  },
  saveBtnText: {
  },
  label: {
    width: 130,
    color: Colors.text,
    fontSize: 16,
  },
  datepicker: {
    flex: 1,
  },
  dateInput: {
    borderWidth: 0,
  },
})
