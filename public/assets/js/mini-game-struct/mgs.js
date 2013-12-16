var Layer = function(game){
    // Default config
    this.config = {
        container: $('<div></div>').appendTo(game.getContainer()),
        game: game
    };
    // Mandatory default config
    this.config.container.css({
        width: '100%',
        height: '100%',
        margin: '0',
        padding: '0',
        position: 'absolute',
        overflow: 'hidden',
        display: 'none'
    });
    // Getters/Setters
    this.getContainer = function(){
        return this.config.container;
    };
    this.getGame = function(){
        return this.config.game;
    };
};

var Game = function(container){
    // Default config
    this.config = {
        container: container,
        subContainer: $('<div id="sub-container"></div>')
    };
    // Mandatory default config
    $('html, body').css({
        width: '100%',
        height: '100%',
        margin: '0',
        padding: '0'
    });
    this.config.container.empty().css({
        width: '100%',
        height: '100%',
        margin: '0',
        padding: '0',
        top: 0,
        left: 0,
        position: 'absolute',
        overflow: 'hidden'
    });
    this.config.container.append(this.config.subContainer);
    this.config.subContainer.css({
        width: '100%',
        height: '100%',
        margin: '0',
        padding: '0',
        position: 'relative',
        overflow: 'hidden'
    });
    // Behaviour definition
    this.createLayer = function(cssConfig){
        var l = new Layer(this);
        l.getContainer().css(cssConfig);
        return l;
    };
    // Getters/Setters
    this.getContainer = function(){
        return this.config.subContainer;
    };
};

var Collision = {
    collides: function(subject, obstacles){
        // Empty?
        if($.isEmptyObject(obstacles)) {
            return false;
        }

        // Check collision with each obstacle
        var a = this.getPosition(subject);
        for (var o in obstacles) {
            var b = this.getPosition(obstacles[o]);
            if(this.intersects(a, b)){
                return obstacles[o];
            }
        }
        return false;
    },
    getPosition: function(element) {
        var p = element.position();
        return {
            left: p.left,
            top: p.top,
            right: p.left + element.outerWidth(),
            bottom: p.top + element.outerHeight()
        };
    },
    intersects: function(a, b) {
        if(a.bottom > b.top && a.top < b.bottom &&
            a.right > b.left && a.left < b.right){
            return true;
        }
        return false;
    }
};