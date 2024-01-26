import "./styles.css";
import Phaser from "phaser";
import Boot from "./Boot.js";
import GameScene from "./GameScene.js";

const config = {
  type: Phaser.AUTO,
  scale: {
    parent: "game-container",
    zoom: 0.1,
    width: 800,
    height: 600,
    autoCenter: Phaser.DOM.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
  },
  backgroundColor: "#000",
  // backgroundColor: 0x444444,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  scene: [Boot, GameScene],
};

new Phaser.Game(config);
