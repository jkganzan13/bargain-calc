import R from 'ramda'
import Immutable from 'seamless-immutable'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/CategoriesRedux'

const getTestState = () => Immutable({
  categories: [{
    id: '123',
    name: "TestCat",
    description: "new category description",
    items: [],
  }],
});

test('deleteCategory', () => {
  const TEST_STATE = getTestState();
  const idToDelete = '123'
  const state = reducer(TEST_STATE, Actions.deleteCategory(idToDelete))

  expect(state.categories).toEqual([])
})

test('editCategory', () => {
  const TEST_STATE = getTestState();
  const idToDelete = '123'
  const category = {
    id: '123',
    name: "TestCat2",
    description: "testDesc",
  }
  const state = reducer(TEST_STATE, Actions.editCategory(category))
  const expected = [{
    ...category,
    items: [],
  }]
  expect(state.categories).toEqual(expected)
})

test('saveCategory', () => {
  const newCategory = {
    name: "New Category",
    description: "new category description"
  };
  const state = reducer(INITIAL_STATE, Actions.saveCategory(newCategory))

  const savedCategory = state.categories.find(R.propEq('name', newCategory.name));
  expect(savedCategory).toHaveProperty('id');
  expect(savedCategory.name).toEqual('New Category');
  expect(savedCategory.description).toEqual('new category description');
})

test('saveItem', () => {
  const item = {
    category: 'TestCat',
    name: 'TestItem',
    originalPrice: 2,
    salePrice: 1,
    saleExpiry: '27-Oct-2017',
    savings: 1,
  };

  const TEST_STATE = getTestState();

  const state = reducer(TEST_STATE, Actions.saveItem(item))

  const items = state.categories[0].items;
  const savedItem = items.find(R.propEq('name', item.name));

  expect(items.length).toEqual(1);
  expect(savedItem).toHaveProperty('id');
  expect(savedItem.category).toEqual('TestCat');
  expect(savedItem.name).toEqual('TestItem');
  expect(savedItem.originalPrice).toEqual(2);
  expect(savedItem.salePrice).toEqual(1);
  expect(savedItem.saleExpiry).toEqual('27-Oct-2017');
  expect(savedItem.savings).toEqual(1);
})
