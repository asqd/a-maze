import Phaser from "phaser";
import TILES from "./TileMapping.js";

class LevelMap extends Phaser.Tilemaps.Tilemap {
  constructor(scene, config, tilesetConfig) {
    super(scene, new Phaser.Tilemaps.MapData(config));

    if (!this.isObjectEmpty(tilesetConfig)) {
      this.addTileset(tilesetConfig.tilesetName);
      this.addTilesetImage(
        tilesetConfig.tilesetName,
        tilesetConfig.key,
        tilesetConfig.tileWidth,
        tilesetConfig.tileHeight,
        tilesetConfig.tileMargin,
        tilesetConfig.tileSpacing,
        tilesetConfig.gid
      );
      this.initLayers();
      this.fillGroundLayer()
    }
  }
  
  addTileset(name) {
    this.tilesetName = name;
  }
  
  initLayers() {
    this.groundLayer = this.createBlankLayer("Ground", this.tilesetName).fill(
      TILES.BLANK
    );

    this.stuffLayer = this.createBlankLayer("Stuff", this.tilesetName);
  }

  fillGroundLayer() {
    // Use the array of rooms generated to place tiles in the map
    // Note: using an arrow function here so that "this" still refers to our scene
    this.scene.dungeon.rooms.forEach((room) => {
      const { x, y, width, height, left, right, top, bottom } = room;

      // Fill the floor with mostly clean tiles
      this.groundLayer.weightedRandomize(
        TILES.FLOOR,
        x + 1,
        y + 1,
        width - 2,
        height - 2
      );

      // Place the room corners tiles
      this.groundLayer.putTileAt(TILES.WALL.TOP_LEFT, left, top);
      this.groundLayer.putTileAt(TILES.WALL.TOP_RIGHT, right, top);
      this.groundLayer.putTileAt(TILES.WALL.BOTTOM_RIGHT, right, bottom);
      this.groundLayer.putTileAt(TILES.WALL.BOTTOM_LEFT, left, bottom);

      // Fill the walls with mostly clean tiles
      this.groundLayer.weightedRandomize(
        TILES.WALL.TOP,
        left + 1,
        top,
        width - 2,
        1
      );
      this.groundLayer.weightedRandomize(
        TILES.WALL.BOTTOM,
        left + 1,
        bottom,
        width - 2,
        1
      );
      this.groundLayer.weightedRandomize(
        TILES.WALL.LEFT,
        left,
        top + 1,
        1,
        height - 2
      );
      this.groundLayer.weightedRandomize(
        TILES.WALL.RIGHT,
        right,
        top + 1,
        1,
        height - 2
      );

      // Dungeons have rooms that are connected with doors. Each door has an x & y relative to the
      // room's location
      const doors = room.getDoorLocations();
      for (let i = 0; i < doors.length; i++) {
        if (doors[i].y === 0) {
          this.groundLayer.putTilesAt(
            TILES.DOOR.TOP,
            x + doors[i].x - 1,
            y + doors[i].y
          );
        } else if (doors[i].y === room.height - 1) {
          this.groundLayer.putTilesAt(
            TILES.DOOR.BOTTOM,
            x + doors[i].x - 1,
            y + doors[i].y
          );
        } else if (doors[i].x === 0) {
          this.groundLayer.putTilesAt(
            TILES.DOOR.LEFT,
            x + doors[i].x,
            y + doors[i].y - 1
          );
        } else if (doors[i].x === room.width - 1) {
          this.groundLayer.putTilesAt(
            TILES.DOOR.RIGHT,
            x + doors[i].x,
            y + doors[i].y - 1
          );
        }
      }
    });
  }

  isObjectEmpty(objectName) {
    return (
      objectName &&
      Object.keys(objectName).length === 0 &&
      objectName.constructor === Object
    );
  }
}

export default LevelMap;
