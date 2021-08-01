const init = {
  pos: new Array(100).fill({
    red: 0,
    blue: 0,
    green: 0,
    purple: 0,
  }),
  counter: 0,
  gameId: "4RGdu1cfvrQ8htfF37Cx",
  color: 'green',
  nowChal: 'green',
  sixcount : 0
};

export const GameReducer = (state = init, action = {}) => {
  switch (action.type) {
    case 'NEW_GAME':
      return {
        ...state,
        color: action.payload.color ? action.payload.color : state.color,
        gameId: action.payload.gameId,
      }
    case 'NEW_POS':
      let newPos = state.pos;
      newPos[action.payload.pos] = action.payload.color;
      return {
        ...state,
        pos: [...newPos],
      };
    case 'COUNTER':
      return {
        ...state,
        counter: state.counter + 1,
      }
    case 'NOW_CHAL':
      return {
        ...state,
        nowChal: action.color
      }
    case 'COLOR_SET':
      return {
        ...state,
        color: action.payload
      }
    case 'SIX_COUNT' : 
      return {
        ...state,
        sixcount : state.sixcount+1,
      }
    case 'SIX_CRE':
      return {
        ...state,
        sixcount : 0,
      }
    default:
      return state;
  }
};
