export enum People {
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
  address?: string
  coordinate?: string
  target?: People[]
  problems?: Problem[]
  detail?: string
  solved?: boolean
  date?: Date
}

export const ArticleMock: ArticleProps = {
  address: 'string',
  coordinate: 'string',
  target: [
    People.Child,
    People.OldMan,
  ],
  problems: [
    Problem.Broken,
    Problem.UnderConstruction,
  ],
  detail: 'string',
  solved: true,
  date: new Date(),
}
