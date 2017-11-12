import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  categoryTitle0: {
    fontSize: 36,
    color: '#3498db',
  },
  categoryTitle1: {
    fontSize: 36,
    color: '#2ecc71'
  },
  categoryTitle2: {
    fontSize: 36,
    color: '#f1c40f'
  },
  categoryTitle3: {
    fontSize: 36,
    color: '#9b59b6'
  },
  categoryCount: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
    width: 64,
    alignItems: 'center',
    marginTop: 5,
  },
  categoryCountText: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  categoriesContainer: {
    ...ApplicationStyles.flexRowContainer,
    padding: 10,
    paddingLeft: 0,
    paddingBottom: 0,
  },
  categoriesItem: {
    width: (Metrics.screenWidth - 30) / 2,
    height: (Metrics.screenHeight - Metrics.navBarHeight - 55) / 2,
    elevation: 5,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginLeft: 10,
    borderRadius: 10,
  }
})
