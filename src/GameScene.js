import Phaser from "phaser";
import Dungeon from "@mikewesthad/dungeon";
import TILES from "./TileMapping.js";
import LevelMap from "./LevelMap.js"
import Player from "./Player.js"
import TileMap from "../assets/colored_packed.png"
import TransparentTileMap from "../assets/colored-transparent_packed.png"

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
    });
    this.level = 0;
  }

  preload() {
    const spriteConfig = { frameWidth: 14, frameHeight: 14, margin: 1, spacing: 2 }

    this.load.image("tiles", TileMap);
    this.load.spritesheet("characters", TransparentTileMap, spriteConfig);
  }

  create() {
    this.level++;
    this.hasPlayerReachedStairs = false;

    // Generate a random world with a few extra options:
    //  - Rooms should only have odd number dimensions so that they have a center tile.
    //  - Doors should be at least 2 tiles away from corners, so that we can place a corner tile on
    //    either side of the door location
    this.dungeon = new Dungeon({
      width: 50,
      height: 50,
      doorPadding: 3,
      rooms: {
        width: { min: 7, max: 15, onlyOdd: true },
        height: { min: 7, max: 15, onlyOdd: true },
      },
    });
    // this.dungeon.drawToConsole();

    // Creating a blank tilemap with dimensions matching the dungeon
    const mapConfig = {
      tileWidth: 14,
      tileHeight: 14,
      width: this.dungeon.width,
      height: this.dungeon.height,
    }

    const tilesetConfig = {
      tilesetName: "tiles",
      key: null,
      tileWidth: 14,
      tileHeight: 14,
      tileMargin: 1,
      tileSpacing: 2,
      // gid: null
    }

    this.map = new LevelMap(this, mapConfig, tilesetConfig)
    // this.map = this.initMap();

    // this.tileset = this.map.addTilesetImage("tiles", null, 14, 14, 1, 2);

    // this.initLayers();
    // this.fillGroundLayer();

    // Separate out the rooms into:
    //  - The starting room (index = 0)
    //  - A random room to be designated as the end room (with stairs and nothing else)
    //  - An array of 90% of the remaining rooms, for placing random stuff (leaving 10% empty)
    const rooms = this.dungeon.rooms.slice();
    const startRoom = rooms.shift();
    const endRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
    const otherRooms = Phaser.Utils.Array.Shuffle(rooms).slice(
      0,
      rooms.length * 0.9
    );

    // this.cameras.main.setBounds(
    //   0,
    //   0,
    //   this.map.widthInPixels,
    //   this.map.heightInPixels
    // );

    // const cursors = this.input.keyboard.createCursorKeys();

    // const controlConfig = {
    //   camera: this.cameras.main,
    //   left: cursors.left,
    //   right: cursors.right,
    //   up: cursors.up,
    //   down: cursors.down,
    //   zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
    //   zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
    //   acceleration: 0.06,
    //   drag: 0.0005,
    //   maxSpeed: 1.0,
    // };

    // this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
    //   controlConfig
    // );
    const playerRoom = startRoom;
    const x = this.map.tileToWorldX(playerRoom.centerX);
    const y = this.map.tileToWorldY(playerRoom.centerY);

    this.player = new Player(this, x, y, 'characters', 25);
    // Watch the player and tilemap layers for collisions, for the duration of the scene:
    this.map.groundLayer.setCollisionByExclusion([-1, 0, 1, 2, 3, 4])
    // this.map.setCollisionByExclusion([-1])
    // this.map.setCollisionBetween(1, 99, true, true, this.map.groundLayer)
    this.physics.add.collider(this.player, this.map.groundLayer);
    // this.map.setCollisionBetween(1, 99, true)
    // this.physics.add.collider(this.player.sprite, this.map.stuffLayer);

    const camera = this.cameras.main;
    camera.setZoom(3)
    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    camera.startFollow(this.player);

  }

  update(time, delta) {
    // this.controls.update(delta);
    this.player.update();

  }


  initMap() {
    return this.make.tilemap({
      tileWidth: 14,
      tileHeight: 14,
      width: this.dungeon.width,
      height: this.dungeon.height,
    });
  }

  initLayers() {
    const map = this.map;
    const tileset = this.tileset;

    this.groundLayer = map
      .createBlankLayer("Ground", tileset)
      .fill(TILES.BLANK);

    this.stuffLayer = map.createBlankLayer("Stuff", tileset);
    // const shadowLayer = map
    //   .createBlankLayer("Shadow", tileset)
    //   .fill(TILES.BLANK);
  }

  fillGroundLayer() {
    // Use the array of rooms generated to place tiles in the map
    // Note: using an arrow function here so that "this" still refers to our scene
    this.dungeon.rooms.forEach((room) => {
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
}

export default GameScene;
