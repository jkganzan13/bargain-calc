import R from 'ramda'
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveCategory: ['category'],
  saveItem: ['item'],
})

export const CategoriesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  categories: [
    {
      title: 'Grocery',
      description: 'Short description here',
      items: [],
    },
    {
      title: 'Fashion',
      description: 'Short description here',
      items: [],
    },
    {
      title: 'Tech',
      description: 'Short description here',
      items: [],
    },
    {
      title: 'Health',
      description: 'Short description here',
      items: [],
    },
  ],
  selectedCategory: '',
})

/* ------------- Reducers ------------- */

// request the data from an api
export const saveCategory = (state, { category }) => {
  const newCategory = {
    title: category,
    items: [],
  }
  return state.merge({ categories: [...state.categories, newCategory] })
};

export const saveItem = (state, { item }) => {
  const updatedCategories = state.categories.map((category) => {
    if(category.title !== item.category) {
      return category;
    }

    return {
      ...category,
      items: [...category.items, item]
    }
  });

  return state.merge({ categories: updatedCategories })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_CATEGORY]: saveCategory,
  [Types.SAVE_ITEM]: saveItem,
})
