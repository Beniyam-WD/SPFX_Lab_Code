export enum actionTypes{
  INCREMENT,
  DECREMENT
}

export interface IAction{
  type:actionTypes;
}

export const increment =():IAction =>{
  return{
    type:actionTypes.INCREMENT
  };
};

export const decrement =():IAction =>{
  return{
    type:actionTypes.DECREMENT
  };
};
