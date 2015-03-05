window.onload = function() {  
    "use strict";
    
    var game = new Phaser.Game( 1500, 700, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'dirt', 'assets/dirt.png' );
        game.load.spritesheet('player','assets/solider.png',72,81);
    }
    
    var player;
    var move;
    
    function create() {
        game.add.tileSprite(0,0,2000,2000,'dirt');
        player=game.add.sprite(0,0,'player');
        game.physics.enable(player,Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        player.animations.add('left', [13,14,15,16,17,18], 10, true);
        player.animations.add('right', [19,20,21,22,23,24], 10, true);
        player.animations.add('up', [7], 10, true);
        player.animations.add('down', [1], 10, true);
        move = game.input.keyboard.createCursorKeys();
    }
    
    function update() {
        player.body.velocity.x=0;
        player.body.velocity.y=0;
        if (move.left.isDown){ 
            player.body.velocity.x -= 250; 
            player.animations.play('left');
            //player.frame = 5;
        }else if (move.right.isDown){ 
            player.body.velocity.x += 250;
            player.animations.play('right');
            //player.frame = 6;
        }else if(move.up.isDown){
            player.body.velocity.y -= 250;
            player.animations.play('up');
            //player.frame = 8;
        }else if(move.down.isDown){
            player.body.velocity.y += 250;
            player.animations.play('down');
            //player.frame = 9;
        }else{
            player.animations.stop();
            player.frame = 0;
        }
    }
};
