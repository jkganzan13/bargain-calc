import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/CategoriesRedux'

test('saveCategory', (t) => {
  const newCategory = "New Category";
  const state = reducer(INITIAL_STATE, Actions.saveCategory(newCategory))

  const expected = [
    ...INITIAL_STATE.categories,
    {
      title: newCategory,
      items: [],
    }
  ];
  expect(state.categories).toEqual(expected)
  t()
})

test('saveItem', (t) => {
  const item = {
    category: 'Grocery',
    name: 'TestItem',
    originalPrice: 2,
    salePrice: 1,
    saleExpiry: '27-Oct-2017',
    savings: 1
  };
  const state = reducer(INITIAL_STATE, Actions.saveItem(item))

  const expected = [item];
  expect(state.categories[0].items).toEqual(expected)
  t()
})
