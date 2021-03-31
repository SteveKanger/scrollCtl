import initialState from './initialState'

const reducer = (action, state = initialState) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
      }
    case 'SET_OPTIONS':
      return {
        ...state,
        options: action.payload,
      }
    case 'SET_SCROLL':
      return {
        ...state,
        scroll: action.payload,
      }
    case 'SET_DELTA':
      return {
        ...state,
        delta: action.payload,
      }
    case 'SET_LIMIT':
      return {
        ...state,
        limit: action.payload,
      }
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

export default reducer
