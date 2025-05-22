export enum ETodos {
  EMPTY_DISHWASHER = 'EMPTY_DISHWASHER',
  EMPTY_TRASH = 'EMPTY_TRASH',
  EMPTY_REFRIGERATOR = 'EMPTY_REFRIGERATOR',
}

export interface ITodoItem {
  id: string;
  type: ETodos;
  name: string;
}
