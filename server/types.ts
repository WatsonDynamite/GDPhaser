export type Message = { user: string; message: string };

export type GameState = {
  player1: null | string;
  player2: null | string;
  field: {
    player1grid: any[];
    player2grid: any[];
  };
};
