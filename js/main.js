window.onload = function() {  
    "use strict";
    
    var game = new Phaser.Game( 1500, 700, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'dirt', 'assets/dirt.png' );
        //game.load.spritsheet('player','assets/solider.png',72,81);
        game.load.image('player', 'assets/man.PNG');
        game.load.image('bullet','assets/bullet.png');
        game.load.image('a','assets/player.png');
    }
    
    var player;
    var move;
    var bullets;
    var fireRate = 100;
    var nextFire = 0;
    var timer;
    var score=0;
    var scoreText;
    var enemies;

    
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

        enemies=game.add.group();
        enemies.enableBody=true;
        for(var i=0; i<10; i++){
            spawn();
        }

        timer = game.time.create(false);
        timer.loop(1000, spawn, this);
        timer.start();

        scoreText = game.add.text(16, 16, 'score: '+score, { fontSize: '32px', fill: '#000' });
    }

    function spawn(){
        enemies.create(game.rnd.integerInRange(0,game.world.width),game.rnd.integerInRange(0,game.world.height-150),'enemy');
    }
    
    function update() {
        player.body.velocity.x=0;
        player.body.velocity.y=0;
        player.rotation = game.physics.arcade.angleToPointer(player);
        if (move.left.isDown){ 
            player.body.velocity.x -= 250; 
        }else if (move.right.isDown){ 
            player.body.velocity.x += 250;
        }if(move.up.isDown){
            player.body.velocity.y -= 250;
        }else if(move.down.isDown){
            player.body.velocity.y += 250;
        }
        if (game.input.activePointer.isDown){
            fire();
        }
    }

    function fire () {
        if (game.time.now > nextFire && bullets.countDead() > 0){
            nextFire = game.time.now + fireRate;
            var bullet = bullets.getFirstExists(false);
            bullet.reset(player.x, player.y);
            bullet.rotation = game.physics.arcade.moveToPointer(bullet, 1000, game.input.activePointer, 500);
        }
    }

};
