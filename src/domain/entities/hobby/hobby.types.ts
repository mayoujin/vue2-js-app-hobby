export interface IHobbyData {
  readonly id: string | null
  readonly hobby: string
}

export interface IHobby extends IHobbyData {
  readonly hash: string
}
