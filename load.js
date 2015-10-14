var loadState = {
	preload: function() {
		var loadingLabel = game.add.text(400, 800, 'Loading...', {font: '64px Ariel', fill: 'white'});
		
		// Loading Assets
		game.load.image('sky', 'assets/sky.png');
	    game.load.image('ground', 'assets/platform.png');
	    game.load.atlasJSONHash('sheet_small', 'assets/maps/sheet_small.png', 'assets/maps/sheet_small.json');
	    game.load.image('bullet4', 'assets/bullet4.png');
	    game.load.image('rude', 'assets/rude.png');
	    game.load.image('rock', 'assets/maps/rock.png');
	    game.load.spritesheet('player', 'assets/player_sheet.png', 32, 32, 14);
	    game.load.image('gorilla', 'assets/Gorilla_1.png');
	    game.load.image('grass', 'assets/maps/grass_small.png');
	    game.load.image('health_25', 'assets/health_25.png');
	    game.load.image('health_50', 'assets/health_50.png');
	    game.load.image('health_75', 'assets/health_75.png');
	    game.load.image('gun_0', 'assets/gun_0.png');
	    game.load.image('gun_1', 'assets/gun_1.png');
	    game.load.image('gun_2', 'assets/gun_2.png');
	    game.load.image('header', 'assets/header1.png');
	    game.load.image('tree1', 'assets/tree_assets/tree1.png');
	    game.load.image('tree2', 'assets/tree_assets/tree2.png');
	    game.load.image('rock1', 'assets/rock1.png');
	    game.load.image('rock2', 'assets/rock2.png');
	    game.load.image('healthbar', 'assets/health_bar.png');
	    game.load.image('healthbar_bg', 'assets/health_bar_background.png');
	    game.load.image('ammo_circle', 'assets/ammo_circle.png');
	    game.load.image('heart', 'assets/heart.png');
	    game.load.image('respawn', 'assets/respawn.png');
	    game.load.image('menu_background', 'assets/start_menu.png');
	    game.load.image('level_exit', 'assets/level_exit.png');
	    //game.renderer.renderSession.roundPixels = true;
	},

	create: function() {
		game.state.start('menu');
	}
};

function load_level1() {
    game.state.start('level1');
}

function reload() {
    if (stashed_check) {
        reloadText.text = 'RELOADING';
    }
    if (game.time.now > stashed + 5000) {
        ammo = 200;
        ammoText.text = ammo;
        stashed_check = false;
        reloadText.text = '';
    }
}

function collide() {
    health -= 10;
    healthText.text = health;
}

function enemy_collide(g1, g2) {
    g1.body.bounce.y = 1;
    g1.body.bounce.x = 1;
}

function collide2(x, y) {
    y.health--;
    x.kill(true);
    if (y.health <= 0){
       y.kill(true);
    }
}

function c_Health(player, collider) {
    health += collider.collide();
    if (health > 100) {
        health = 100;
    }
    healthText.text = health;
}

function c_Gun(player, collider) {
    reloadText.text = '';
    guns.forEach(function(gun) {
        gun.kill(true);
    });
    ammo = 200;
    ammoText.text = ammo;
    current_weapon = collider.collide();
}

function collisionHandler(player, collider) {
    collider.collide();
}

function create_item(group, type) {
    var item = create_powerup(type, group, current_weapon);
    if (type == 'health') {
        health_count++;    
    }
    return item;
}

function respawn_player() {
    respawn_button.visible = false;
    lives--;
    health = 100;
    healthText.text = health;
    if (lives > 0) {
        if (lives == 2) {
            life3.destroy();
        }
        else {
            life2.destroy();
        }
        //player.kill(false);
    }
    else {
        gameoverText = game.add.text(300, 300, 'GAME OVER', { fontSize: '120px', fill: '#000' });
        gameoverText.fixedToCamera = true;
    }
}