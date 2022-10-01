export const legalMoveIsKillable = (input: App.LegalMove): input is App.KillableOpponent => {
  return 'movesTo' in input;
};
