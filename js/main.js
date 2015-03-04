window.onload = function() {  
    "use strict";
    
    var game = new Phaser.Game( 1500, 700, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'dirt', 'assets/dirt-path.png' );
    }
    
    var bouncy;
    
    function create() {
        game.add.tileSprite(0,0,2000,2000,'dirt');
    }
    
    function update() {
        
    }
};
