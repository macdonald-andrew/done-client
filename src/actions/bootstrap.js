
import { fetchUser } from './auth'

export const BOOTSTRAP_START = 'BOOTSTRAP_START'
export const BOOTSTRAP_FINISH = 'BOOTSTRAP_FINISH'

export const bootstrap = () => (dispatch, getState) => {
  if (getState().bootstrap.isBootstrapping) {
    return Promise.resolve()
  }

  dispatch({ type: BOOTSTRAP_START })

  return Promise.resolve(getState().auth.user)
    .then(user => {
      if (!user) {
        return dispatch(fetchUser())
      }
    })
    .then(() => {
      if (getState().auth.user) {
        return Promise.all([
          // dispatch other action creators needed
        ]).then(() =>
          dispatch({
            type: BOOTSTRAP_FINISH,
            isDataLoaded: true
          })
        )
      }

      return dispatch({ type: BOOTSTRAP_FINISH })
    })
}