import cloneDeep from 'lodash.clonedeep'

export function storeReset({ store }) {
  const initialState = cloneDeep(store.$state)
  store.$reset = () => store.$patch(cloneDeep(initialState))
}
