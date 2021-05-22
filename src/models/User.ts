import { v4 as uuid } from 'uuid'

export interface UserProps {
  key?: string
  id?: string
  email?: string
  count?: number
}

export const UserMock: UserProps = {
  key: uuid(),
  id: 'dino',
  email: 'dino@dino.com',
  count: 3,
}
