window.onload = function() {  
    "use strict";
    
    var game = new Phaser.Game( 1500, 700, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'dirt', 'assets/dirt.png' );
        //game.load.spritsheet('player','assets/solider.png',72,81);
        game.load.image('player', 'assets/man.PNG');
        game.load.image('bullet','assets/bullet.png');
    }
    
    var player;
    var move;
    var bullets;
    var fireRate = 100;
    var nextFire = 0;

    
    function create() {
        game.add.tileSprite(0,0,2000,2000,'dirt');
        player=game.add.sprite(0,0,'player');
        game.physics.enable(player,Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        player.anchor.setTo(0.5,0.5);
        /*player.animations.add('left', [12,13,14,15,16,17], 10, true);
        player.animations.add('right', [19,20,21,22,23,24], 10, true);
        player.animations.add('up', [7,8,9,10,11], 10, true);
        player.animations.add('down', [1,2,3,4,5], 10, true);*/
        move = game.input.keyboard.createCursorKeys();
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet', 0, false);
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 0.5);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);

    }
    
    function update() {
        player.body.velocity.x=0;
        player.body.velocity.y=0;
        player.rotation = game.physics.arcade.angleToPointer(player);
        if (move.left.isDown){ 
            player.body.velocity.x -= 250; 
            //player.animations.play('left');
            //player.frame = 5;
        }else if (move.right.isDown){ 
            player.body.velocity.x += 250;
            //player.animations.play('right');
            //player.frame = 6;
        }else if(move.up.isDown){
            player.body.velocity.y -= 250;
            //player.animations.play('up');
            //player.frame = 8;
        }else if(move.down.isDown){
            player.body.velocity.y += 250;
            //player.animations.play('down');
            //player.frame = 9;
        }else{
            //player.animations.stop();
            //player.frame = 18;
        }
        if (game.input.activePointer.isDown){
            fire();
        }
    }

    function fire () {
        if (game.time.now > nextFire && bullets.countDead() > 0){
            nextFire = game.time.now + fireRate;
            var bullet = bullets.getFirstExists(false);
            bullet.reset(player.x+50, player.y+35);
            bullet.rotation = game.physics.arcade.moveToPointer(bullet, 1000, game.input.activePointer, 500);
        }
    }

};
