/*
 * Rules:
 * The end of each level must be the beginning of the next one
*/

const emojis = {
    '-': ' ',
    'O': '🌎',
    'G': '🌌',
    'X': '🛸',
    'L': '🌕',
    'I': '🪐',
    'PLAYER': '🚀',
    'SHIP_COLLISION': '💥',
    'GAME_OVER': '👽',
    'WIN': '🌟',
    'HEART': '💙'
  };

  const maps = [];
maps.push(`
  LXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
  `);
maps.push(`
  G-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);