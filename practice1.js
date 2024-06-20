// Initialize \\
let canvas;
let context;
let request_id;

// MUSIC \\
let backgroundMusic = new Audio();
let laserSound = new Audio();
let gameOver = new Audio();
let victory_theme = new Audio();


// FPS \\
let fpsInterval = 1000 / 40;
let now;
let then = Date.now();


// Player \\
let playerImage = new Image()
let player = {
    x: 0,
    y: 0,
    width: 32,
    height: 32,
    frameX: 0,
    frameY: 0,
    xChange: 0,
    yChange: 0,
};
// Enemies \\
let enemyImage = new Image();
let enemy = [];
let bossEnemy = [];
let bossEnemyImage = new Image();


// Kills \\
let kill_streak_count = 0;
let kill_streak = document.querySelector("#kills");


// Key init \\ 
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;
let shoot = false;

// Buttons \\
let restart = document.getElementById("restart")
restart.addEventListener("click", init, false);

// Tiles\\
let Collision_Map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
let tilesPerRow = 50;
let tileSize = 16;


document.addEventListener("DOMContentLoaded", init, false);
// INIT \\
function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    player.x = canvas.width / 2.1;
    player.y = canvas.height - 250;

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);

    load_assets([
        { "var": enemyImage, "url": "eyeball.png" },
        { "var": playerImage, "url": "player_sprite.png" },
        { "var": bossEnemyImage, "url": "boss_enemy_sprite.png" },
        { "var": backgroundMusic, "url": "spaceship.wav" },
        { "var": laserSound, "url": "laser.wav" },
        { "var": gameOver, "url": "game_over.mp3" },
        { "var": victory_theme, "url": "Victory.wav" }
    ], draw);
}


// Draw \\
function draw() {
    // Standard
    request_id = window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);

    // Clear Canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let r = 0; r < 50; r += 1) {
        for (let c = 0; c < 50; c += 1) {
            let tile = Collision_Map[r][c];
            if (tile >= 0) {
                let tileRow = Math.floor(tile / tilesPerRow);
                let tileCol = Math.floor(tile % tileRow);
            }
        }
    }

    // MUSIC 
    if (backgroundMusic.paused) {
        load_music();
    }

    // HINTS/GUIDE
    if (kill_streak_count === 20 && !hintDisplayed) {
        hints("10 Enemies killed, They'll try to surround you!", 1700);
        hintDisplayed = true;
    }
    if (kill_streak_count === 30 && !hintDisplayed) {
        hints("30 Enemies killed, They're getting faster!", 1700);
        hintDisplayed = true;

    }
    if (kill_streak_count === 70 && !hintDisplayed) {
        hints("70 Enemies killed, Get Ready for the Boss!", 1700);
        hintDisplayed = true;
    }
    else hintDisplayed = false;


    // ENEMY \\
    // 1.Create Enemy Object
    if (enemy.length < 9) {
        let e = {
            x: randint(0, canvas.width),
            y: 0,
            size: 32,
            frameX: 0,
            frameY: 0,
            xChange: 0,
            yChange: 0,
            speed: 1
        } // Need to put an else here where the monster's will spawn around the canvas 
        enemy.push(e);

        //Enemies get faster/Approach from different sides\\
        if (kill_streak_count > 20) {
            console.log("20 ENEMIES KILLED!, They're trying to surround you, watch your flanks!")
            enemy.length < 12;

            let edge = randint(0, 2); // 0 for top, 1 for left, 2 for right
            if (edge === 0) { // Top edge
                e.x = randint(0, canvas.width); // Random x position within canvas width
                e.y = 0; // Enemy spawns at the top edge of the canvas
            } else if (edge === 1) { // Left edge
                e.x = 0; // Enemy spawns at the left edge of the canvas
                e.y = randint(300, canvas.height); // Random y position within canvas height
            } else { // Right edge
                e.x = canvas.width; // Enemy spawns at the right edge of the canvas
                e.y = randint(300, canvas.height); // Random y position within canvas height
            }

        }
        if (kill_streak_count > 30) {
            console.log("30 ENEMIES KILLED, They're getting faster!")
            e.speed = 1.4;
        }
    }
    // 2.Drawing the enemy
    for (let e of enemy) {
        context.drawImage(enemyImage,
            e.frameX * e.size, e.frameY * e.size, e.size, e.size,
            e.x, e.y, e.size, e.size);
        e.frameX = (e.frameX + 1) % 4;

    }
    // 3.Enemy direction
    for (let e of enemy) {
        e.x += (Math.round(player.x - e.x)) / Math.abs(Math.round(player.x - e.x)) * e.speed || 0
        e.y += (Math.round(player.y - e.y)) / Math.abs(Math.round(player.y - e.y)) * e.speed || 0
    }

    // BOSS ENEMY \\
    // 1.Create bossEnemy Object
    let bossCreated = false;
    if (kill_streak_count > 70 && bossEnemy.length < 1) {
        if (!bossCreated) {
            let boss_e = {
                x: randint(0, canvas.width),
                y: 0,
                size: 100,
                frameX: 0,
                frameY: 0,
                xChange: 0,
                yChange: 0,
                speed: 1,
                hp: 100
            }
            bossEnemy.push(boss_e);
            // show_boss_hp("Boss HP:" + boss_e.hp);

            bossCreated = true;
            console.log(" 30 ENEMIES KILLED,The Boss wants to kill you!")
            console.log("boss_hp:" + boss_e.hp)
        }
        else bossCreated = false;
    }
    // 2.Drawing the enemy
    for (let boss_e of bossEnemy) {
        context.drawImage(bossEnemyImage,
            boss_e.frameX * boss_e.size, boss_e.frameY * boss_e.size, boss_e.size, boss_e.size,
            boss_e.x, boss_e.y, boss_e.size, boss_e.size);
        boss_e.frameX = (boss_e.frameX + 1) % 4;
    }
    // 3.Enemy direction
    for (let boss_e of bossEnemy) {
        boss_e.x += (Math.round(player.x - boss_e.x)) / Math.abs(Math.round(player.x - boss_e.x)) * boss_e.speed || 0
        boss_e.y += (Math.round(player.y - boss_e.y)) / Math.abs(Math.round(player.y - boss_e.y)) * boss_e.speed || 0
    }


    // DRAW PLAYER \\
    context.drawImage(playerImage,
        player.frameX * player.width, player.frameY * player.height, player.width, player.height,
        player.x, player.y, player.width, player.height);
    // ANIMATION \\
    if ((moveLeft || moveRight || moveUp || moveDown) && !(moveLeft && moveRight && moveDown && moveUp)) {
        player.frameX = (player.frameX + 1) % 2;

    }




    //PLAYER\\
    // Handle Key Presses
    if (moveLeft) {
        player.xChange = player.xChange - 1.5; //Old code
        player.frameY = 0;
        // enemy.frameY = 0;
    }
    if (moveRight) {
        player.xChange = player.xChange + 1.5; //Old code
        player.frameY = 1;
        // enemy.frameY = 1
    }
    if (moveUp) {
        player.yChange = player.yChange - 2;// Old code
        player.frameY = 3;
        // enemy.frameY = 0;

    }
    if (moveDown) {
        player.yChange = player.yChange + 2;
        player.frameY = 2;
        // enemy.frameY = 1;
    }
    // Update Player
    player.x += player.xChange;
    player.y += player.yChange;

    // PLayer Physics
    player.xChange = player.xChange * 0.4; // friction
    player.yChange = player.yChange * 0.3; // friction

    // Collisions \\
    // Player Collision with canvas
    //  X-Axis Collision
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    } else if (player.x < 0) {
        player.x = 0;
    }
    //  Y-Axis Collision
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    } else if (player.y < 0) {
        player.y = 0;
    }
    // Player collide with enemies 
    for (let e of enemy) {
        if (player_collision(e)) {
            stop("YOU DIED");
            return;
        }
    }
    // Player collide with boss-enemy 
    for (let boss_e of bossEnemy) {
        if (player_collision_boss(boss_e)) {
            stop("YOU DIED");
            return;
        }
    }
    // Enemies collide with bullets 
    for (let e of enemy) {
        for (let bullet of projectile_array) {
            if (bullet_collision(bullet, e)) {
                for (let i = 0; i < enemy.length; i++) {
                    if (bullet_collision(bullet, enemy[i])) {
                        enemy.splice(i, 1);
                        projectile_array.splice(i, 1);
                        kill_streak_count++;
                        kill_streak.textContent = kill_streak_count;
                        return;
                    }
                }
                return;
            }
        }
    }
    // Boss collides with bullets 
    for (let boss_e of bossEnemy) {
        for (let bullet of projectile_array) {
            if (bullet_collision_boss(bullet, boss_e)) {
                for (let i = 0; i < bossEnemy.length; i++) {
                    if (bullet_collision_boss(bullet, bossEnemy[i])) {
                        boss_e.hp -= 10;
                        show_boss_hp("Boss HP:" + boss_e.hp);
                        console.log("boss_hp:" + boss_e.hp)
                        projectile_array.splice(i, 1);
                        if (boss_e.hp < 10) {
                            bossEnemy.splice(i, 1);
                            kill_streak_count++;
                            kill_streak.textContent = kill_streak_count;
                            console.log("Boss Killed");
                            stop_victory("YOU WIN")
                        }
                        return;
                    }
                }
                return;
            }
        }
    }
}
// BULLETS \\
let projectile_array = [];
let lastFireTime = 0;
function projectile() {
    let currentTime = Date.now();
    if (currentTime - lastFireTime > 200) { 
        let bullet = {
            x: player.x + 13,
            y: player.y,
            size: 7,
            speed: 10,
            moveUp: moveUp,
            moveDown: moveDown,
            moveLeft: moveLeft,
            moveRight: moveRight
        }
        projectile_array.push(bullet);
        load_laser_effect();
        lastFireTime = currentTime; 
    }


}
function drawProjectiles() {
    for (let bullet of projectile_array) {
        // context.fillStyle = "blue";
        //  context.fillRect(bullet.x, bullet.y, bullet.size, bullet.size);
        context.fillStyle = "#CCFFFF";
        context.beginPath();
        context.arc(bullet.x, bullet.y, bullet.size / 2, 0, Math.PI * 2);
        context.fill();

    }
}
document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') { // Check if the pressed key is Space
        projectile(); // Fire a bullet
        console.log(projectile_array + " projectile_test");
    }
});
function animate() {

    // Update projectile positions (loop through projectile_array)
    // BULLET DIRECTIONS \\
    for (let bullet of projectile_array) {
        if (bullet.moveUp) {
            bullet.y -= bullet.speed;
        } else if (bullet.moveDown) {
            bullet.y += bullet.speed;
        } else if (bullet.moveLeft) {
            bullet.x -= bullet.speed;
        } else if (bullet.moveRight) {
            bullet.x += bullet.speed;
        } else {
            bullet.y -= bullet.speed; 
        }
    }
    // DELETES BULLETS FROM ARRAY WHEN THEY HIT CANVAS \\
    // need to do the same thing but for enemies \\ 
    for (let i = projectile_array.length - 1; i >= 0; i--) {
        let bullet = projectile_array[i];
        if (bullet.y + bullet.size > canvas.height || bullet.y < 0) {
            // Remove the bullet from the array
            projectile_array.splice(i, 1);
        } else if (bullet.x + bullet.size > canvas.width || bullet.x < 0) {
            // Remove the bullet from the array
            projectile_array.splice(i, 1);
        }
    }
    drawProjectiles(); // Draw projectiles
    requestAnimationFrame(animate);
}
animate(); // Start the animation loop
// ACTIVATE/DEACTIVATE/ASSETS //
function activate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = true;
    } else if (key === "ArrowUp") {
        moveUp = true;
    } else if (key === "ArrowRight") {
        moveRight = true;
    } else if (key === "ArrowDown") {
        moveDown = true;
    }
}
function deactivate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = false;
    } else if (key === "ArrowUp") {
        moveUp = false;
    } else if (key === "ArrowRight") {
        moveRight = false;
    } else if (key === "ArrowDown") {
        moveDown = false;
    } else if (key === " ") {
        shoot = true;
    }
}
function load_assets(assets, callback) {
    let num_assets = assets.length;
    let loaded = function () {
        console.log("loaded");
        num_assets = num_assets - 1;
        if (num_assets === 0) {
            callback();
        }
    };
    for (let asset of assets) {
        let element = asset.var;
        if (element instanceof HTMLImageElement) {
            console.log("img");
            element.addEventListener("load", loaded, false);
        }
        else if (element instanceof HTMLAudioElement) {
            console.log("audio");
            element.addEventListener("canplaythrough", loaded, false);
        }
        element.src = asset.url;
    }
}
function load_music() {
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
    backgroundMusic.play()
}
function load_laser_effect() {
    laserSound.loop = false;
    laserSound.volume = 0.2;
    laserSound.play()
}
function load_game_over() {
    gameOver.loop = false;
    gameOver.volume = 1;
    gameOver.play();

}
function load_victory_theme(){
    victory_theme.loop = false;
    victory_theme.volume = 1;
    victory_theme.play();

}
/// TIMER \\
let startTime = Date.now();
let timerDisplay = document.querySelector("#timer")
function updateTimer() {
    let currentTime = Date.now(); //  current time
    let elapsedTime = currentTime - startTime; //  elapsed time
    let minutes = Math.floor(elapsedTime / 60000); // Convert milliseconds to minutes
    let seconds = Math.floor((elapsedTime % 60000) / 1000); // Convert milliseconds to seconds

    // Format 
    let formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Update the timer display
    timerDisplay.textContent = formattedTime;

    // if (seconds > 58) {
    //     // console.log("Time passed!")
    //     stop("COLONY SURVIVED");
    // }
}
let timerInterval = setInterval(updateTimer, 1000);
// COllISIONS \\
function player_collision(e) {
    if (player.x + player.width < e.x + 15 ||
        e.x + e.size < player.x + 15 ||
        player.y > e.y + e.size - 30 ||
        e.y > player.y + player.height - 30) {
        return false;
    } else {
        console.log("An Enemy hit you!")
        return true;
    }
}
function player_collision_boss(boss_e) {
    if (player.x + player.width < boss_e.x + 30 ||
        boss_e.x + boss_e.size < player.x + 30 ||
        player.y > boss_e.y + boss_e.size - 50 ||
        boss_e.y > player.y + player.height + 50) {
        return false;
    } else {
        console.log("Boss Enemy hit you!")
        return true;
    }
}
function bullet_collision(bullet, enemy) {
    for (let i = projectile_array.length - 1; i >= 0; i--) {
        if (enemy.x + enemy.size < bullet.x ||
            bullet.x + bullet.size < enemy.x ||
            enemy.y > bullet.y + bullet.size ||
            bullet.y > enemy.y + enemy.size) {
            return false;
        } else {
            console.log("Enemy Dead!")
            return true;
        }
    }
}
function bullet_collision_boss(bullet, bossEnemy) {
    for (let i = projectile_array.length - 1; i >= 0; i--) {
        if (bossEnemy.x + bossEnemy.size < bullet.x ||
            bullet.x + bullet.size < bossEnemy.x ||
            bossEnemy.y > bullet.y + bullet.size ||
            bullet.y > bossEnemy.y + bossEnemy.size) {
            return false;
        } else {
            console.log("Boss hit!")
            return true;
        }
    }
}
function randint(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}
let hintDisplayed = false;
function hints(newHint, duration) {
    let hints = document.querySelector("#hints");
    hints.innerHTML = newHint;

    setTimeout(function () {
        hints.innerHTML = "";
        hintDisplayed = false
    }, duration);
}
function show_boss_hp(hp) {
    let hpDisplay = document.querySelector("#hp");
    hpDisplay.innerHTML = hp
}
function stop(message) {
    window.removeEventListener("keydown", activate, false);
    window.removeEventListener("keyup", deactivate, false);
    window.cancelAnimationFrame(request_id);
    let outcome = document.querySelector("#outcome");
    outcome.innerHTML = message;
    clearInterval(timerInterval);

    if (!backgroundMusic.paused) {
        backgroundMusic.pause();
    }
    load_game_over();

}
function stop_victory(message){
    window.removeEventListener("keydown", activate, false);
    window.removeEventListener("keyup", deactivate, false);
    window.cancelAnimationFrame(request_id);
    let outcome = document.querySelector("#outcome");
    outcome.innerHTML = message;
    clearInterval(timerInterval);

    if (!backgroundMusic.paused) {
        backgroundMusic.pause();
    }
    load_victory_theme();
}
