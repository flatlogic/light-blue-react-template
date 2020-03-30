import { DISMISS_ALERT } from '../actions/alerts';

const defaultState = {
  alertsList: [
    {
      id: 0,
      title: 'Sales Report',
      value: 16,
      color: 'primary',
      footer: 'Calculating x-axis bias... 65%',
    },
    {
      id: 1,
      title: 'Personal Responsibility',
      value: 23,
      color: 'danger',
      footer: 'Provide required notes',
    },
  ],
};

export default function alertsReducer(state = defaultState, action) {
  let index;
  switch (action.type) {
    case DISMISS_ALERT:
      state.alertsList.forEach((alert, alertIndex) => {
        if (alert.id === action.id) {
          index = alertIndex;
        }
      });
      return Object.assign({}, state, {
        alertsList: [
          ...state.alertsList.slice(0, index),
          ...state.alertsList.slice(index + 1),
        ],
      });
    default:
      return state;
  }
}
