window.onload = function() {  
    "use strict";
    
    var game = new Phaser.Game( 1500, 700, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'dirt', 'assets/dirt.png' );
        game.load.spritesheet('player','assets/solider.png',65,80);
    }
    
    var player;
    var move;
    
    function create() {
        game.add.tileSprite(0,0,2000,2000,'dirt');
        player=game.add.sprite(0,0,'player');
        game.physics.enable(player,Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        player.animations.add('left', [15,16,17,18,19,20], 10, true);
        player.animations.add('right', [22,23,24,25,26,27], 10, true);
        player.animations.add('up', [8,9,10,11,12,13], 10, true);
        player.animations.add('down', [1,2,3,4,5,6], 10, true);
        move = game.input.keyboard.createCursorKeys();
    }
    
    function update() {
        player.body.velocity.x=0;
        player.body.velocity.y=0;
        if (move.left.isDown){ 
            player.body.velocity.x -= 250; 
            player.animations.play('left');
        }else if (move.right.isDown){ 
            player.body.velocity.x += 250;
            player.animations.play('right');
        }else if(move.up.isDown){
            player.body.velocity.y -= 250;
            player.animations.play('up');
        }else if(move.down.isDown){
            player.body.velocity.y += 250;
            player.animations.play('down');
        }
    }
};
