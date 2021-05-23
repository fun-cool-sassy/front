import React from 'react'
import { v4 as uuid } from 'uuid'

import Image from './images/mockImage.png'

/* export enum People {
  WheelChair = 'wheelChair',
  OldMan = 'oldMan',
  Child = 'child',
  Others = 'Others',
}

export enum Problem {
  Broken = 'broken',
  Obstacles = 'obstacles',
  Uninstalled = 'uninstalled',
  UnderConstruction = 'underConstruction',
}

export interface ArticleProps {
  key?: string
  address?: string
  coordinate?: string
  target?: People[]
  problems?: Problem[]
  detail?: string
  solved?: boolean
  date?: Date
} */

export const ArticleMock = {
  id: uuid(),
  ownerId: 'dino',
  address: 'soongsil',
  latitude: 0,
  longitude: 0,
  contentId: uuid(),
  targets: [
    'child',
    'oldMan',
  ],
  problems: [
    'a',
    'b',
  ],
  detail: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor #incididunt ero labore et dolore magna aliqua. ....',
  resolved: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const MockImage = ({src}) => (
  <>
  <img src={src} alt="img"/>
  </>
)
