export enum ActionTypes {
    loadGames = 'LOAD_GAMES',
    loadGamesSuccess = 'LOAD_GAMES_SUCCESS',
    loadGamesFailure = 'LOAD_GAMES_FAILURE',
}

export interface GamesProps {
    id: number;
    type: string;
    color: string;
    description: string;
    range: number;
    price: number;
    minCartValue: number;
    maxNumber: number;
}

export interface GamesItem {
    games: GamesProps,
}

export interface GamesState {
    games: GamesProps[];
    error: boolean;
}