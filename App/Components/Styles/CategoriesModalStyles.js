import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dimWhite,
  },
  modal: {
    backgroundColor: Colors.white,
    width: Metrics.screenWidth - 20,
    padding: 10,
  },
  title: {
    ...Fonts.style.h3,
    color: Colors.text,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  btn: {
    width: 75,
    height: 35,
    marginRight: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
  },
  btnText: {
    color: Colors.white,
  },
})
