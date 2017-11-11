import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
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
  itemRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  itemHeader: {
    marginTop: 5,
    height: 50,
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
