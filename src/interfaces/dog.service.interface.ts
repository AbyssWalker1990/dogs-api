export interface DogsParams {
  page: number
  pageSize: number
  attribute: Attribute
  order: Order
}

export enum Order {
  desc = 'DESC',
  asc = 'ASC'
}

export enum Attribute {
  weight = 'weight',
  tail_length = 'tail_length',
  name = 'name',
  createdAt = 'createdAt'
}


