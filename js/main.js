window.onload = function() {  
    "use strict";
    
    var game = new Phaser.Game( 1500, 700, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'dirt', 'assets/dirt.png' );
        game.load.spritesheet('player','assets/solider.png',65,80);
    }
    
    var player;
    
    function create() {
        game.add.tileSprite(0,0,2000,2000,'dirt');
        player=game.add.sprite(0,0,'player');
        game.physics.enable(player,Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
    }
    
    function update() {
        
    }
};
