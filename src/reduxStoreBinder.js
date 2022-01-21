import { store } from './index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export const actionCreatorBinder = actionCreator => {
    const { dispatch } = store
    return bindActionCreators( { actionCreator }, dispatch)
}

export const getStoreState = () => store ? store.getState() : null

export const connectComponent = (component, storeFn = () => {}, actions = {}) => connect(storeFn, dispatch => bindActionCreators(actions, dispatch))(component)