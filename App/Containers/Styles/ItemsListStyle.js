import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  content: {},
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  fab: {
    backgroundColor: Colors.primary,
  },
  borderedRadius: {
    borderRadius: 5,
  },
  item: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderLeftWidth: 5,
    borderLeftColor: Colors.primary,
  },
  itemHeader: {
    marginTop: 5,
    height: 75,
  },
  itemNameContainer:{
    marginBottom: 5,
  },
  itemName: {
    fontSize: Fonts.size.h3,
    fontFamily: Fonts.type.base,
    color: Colors.text,
  },
  itemExpiry: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.text,
    opacity: 0.5,
  },
  savingsContainer: {},
  price: {},
  saved: {
    alignSelf: 'flex-end'
  },
  text: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.text,
  },
  itemRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  itemContentList: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  itemContent: {
    marginBottom: 5,
  }
})
