import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Metrics, Colors } from '../../Themes/'

const CARD_STYLE = {
  width: (Metrics.screenWidth - 30) / 2,
  height: (Metrics.screenHeight - Metrics.navBarHeight - 55) / 2,
  elevation: 5,
  backgroundColor: Colors.white,
  alignItems: 'center',
  justifyContent: 'space-around',
  marginBottom: 10,
  marginLeft: 10,
  borderRadius: 10,
};

const CARD_CONTAINER = {
  ...ApplicationStyles.flexRowContainer,
  padding: 10,
  paddingLeft: 0,
  paddingBottom: 0,
}

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  categoryTitle: {
    ...Fonts.style.h1,
  },
  count: {
    ...Fonts.style.description,
    marginTop: 10,
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
    ...ApplicationStyles.flexColContainer,
    padding: 10,
  },
  categoriesItem: {
    elevation: 5,
    marginBottom: 10,
    padding: 20,
    backgroundColor: Colors.white,
  },
  fab: {
    backgroundColor: Colors.primary,
    right: (Metrics.screenWidth / 2) - 75,
    width: 100,
    height: 30,
  },
  fabIcon: {
    fontSize: Fonts.size.regular,
  },
  fabText: {
    paddingLeft: 20,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.ralewayMed,
  }
})
