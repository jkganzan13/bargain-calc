import R from 'ramda'
import uuid from 'uuid/v1'
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveCategory: ['category'],
  deleteCategory: ['id'],
  editCategory: ['category'],
  saveItem: ['item'],
})

export const CategoriesTypes = Types
export default Creators

/* ------------- Initial State ------------- */
/**
 * Example categories item
 * {
 *   id: 1,
 *   title: 'Grocery',
 *   description: 'Short description here',
 *   items: [],
 * }
 */
export const INITIAL_STATE = Immutable({
  categories: [],
});

/* ------------- Reducers ------------- */

// request the data from an api
export const saveCategory = (state, { category }) => {
  const newCategory = {
    id: `category_${uuid()}`,
    name: category.name,
    description: category.description,
    items: [],
  };
  return state.merge({ categories: [...state.categories, newCategory] })
};

export const deleteCategory = (state, { id }) => {
  const notId = R.complement(R.propEq('id', id));
  return state.merge({ categories: state.categories.filter(notId) })
};

export const editCategory = (state, { category }) => {
  const updateCategory = (c) => {
    if(c.id !== category.id) return c;
    return {
      ...c,
      ...category,
    }
  };
  return state.merge({ categories: state.categories.map(updateCategory) })
};

export const saveItem = (state, { item }) => {
  const updatedCategories = state.categories.map((category) => {
    if(category.name !== item.category) {
      return category;
    }

    return {
      ...category,
      items: [...category.items, { ...item, id: `item_${uuid()}` }]
    }
  });

  return state.merge({ categories: updatedCategories })
};


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_CATEGORY]: saveCategory,
  [Types.DELETE_CATEGORY]: deleteCategory,
  [Types.EDIT_CATEGORY]: editCategory,
  [Types.SAVE_ITEM]: saveItem,
})
