import Phaser from "phaser";
import TILES from "./tile-mapping.js";

class LevelMap extends Phaser.Tilemaps.Tilemap {
  constructor(scene, config, tilesetConfig) {
    super(scene, new Phaser.Tilemaps.MapData(config));

    if (this.isObjectEmpty(tilesetConfig)) {
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

  isObjectEmpty(objectName) {
    return (
      objectName &&
      Object.keys(objectName).length === 0 &&
      objectName.constructor === Object
    );
  }
}

export default LevelMap;
