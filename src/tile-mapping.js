const TILE_MAPPING = {
  BLANK: 0,
  WALL: {
    TOP_LEFT: 784,
    TOP_RIGHT: 786,
    BOTTOM_RIGHT: 884,
    BOTTOM_LEFT: 882,
    TOP: [{ index: 785, weight: 1 }],
    LEFT: [{ index: 833, weight: 1 }],
    RIGHT: [{ index: 835, weight: 1 }],
    BOTTOM: [{ index: 883, weight: 1 }],
  },
  FLOOR: [
    // { index: 0, weight: 1 },
    { index: [1, 2], weight: 2 },
    { index: [3, 4], weight: 5 },
  ],
  POT: [
    { index: 690, weight: 1 },
    { index: 691, weight: 1 },
  ],
  DOOR: {
    TOP: [837, 0, 836],
    // prettier-ignore
    LEFT: [
        [837],
        [0],
        [788] // угол
      ],
    BOTTOM: [788, 0, 787],
    // prettier-ignore
    RIGHT: [
        [836],
        [0],
        [787]
      ],
  },
  CHEST: 304,
  STAIRS: 297,
  // prettier-ignore
  TOWER: [
      [933],
      [934]
    ],
};

export default TILE_MAPPING;
