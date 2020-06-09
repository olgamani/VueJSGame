new Vue({
el: '#app',
data: {
playerHealth: 100,
partnerHealth: 100,
gameIsRunning: false,
superHeal: 10,
turns: []
},
methods: {
startGame: function() {
    this.gameIsRunning = true;
    this.playerHealth = 100;
    this.partnerHealth = 100;
    this.turns = [];
},
attack: function() {
    var playerDamage =  this.calculateDamage(3, 10);
    this.playerHealth = this.playerHealth - playerDamage;

    var partnerDamage = this.calculateDamage(5, 12);
    this.partnerHealth = this.partnerHealth - partnerDamage;

    this.logText(playerDamage, partnerDamage)
    this.checkWin();
},
specialAttack: function() {
    var playerDamage =  this.calculateDamage(15, 30);
    this.playerHealth = this.playerHealth - playerDamage;

    var partnerDamage = this.calculateDamage(10, 20);
    this.partnerHealth = this.partnerHealth - partnerDamage;
    
    this.logText(playerDamage, partnerDamage)
    this.checkWin();

},
heal: function()  {
    if(this.playerHealth >= 90) {
        this.playerHealth = 100;
        if( this.partnerHealth >= 90) {
            this.partnerHealth = 100;
        }  else {
            this.partnerHealth = this.partnerHealth + this.superHeal;
        }
    } else if( this.partnerHealth >= 90) {
        this.partnerHealth = 100;
        if( this.playerHealth >= 90) {
            this.playerHealth = 100;
        }  else {
            this.playerHealth = this.playerHealth + this.superHeal;
        }
    } 
    else {
        this.playerHealth = this.playerHealth + this.superHeal;
        this.partnerHealth = this.partnerHealth + this.superHeal;
    }
},
giveUp: function() {
    this.gameIsRunning = false;

},
calculateDamage: function(min, max) {
    return Math.max(Math.floor(Math.random() * max) + 1, min);
},
checkWin: function(){
    if(this.playerHealth <= 0) {
        if(confirm('You Won! New Game?')) {
            this.playerHealth = 100;
            this.partnerHealth = 100;
            this.startGame();
            return true;

        } else {
            this.playerHealth = 0;
            this.partnerHealth = 0;
            this.gameIsRunning = false;
            return true;
        }   
    } else if(this.partnerHealth <= 0) {
        if(confirm('You Lost! New Game?')) {
            this.playerHealth = 100;
            this.partnerHealth = 100;
            this.startGame();
            return true;

        } else {
            this.playerHealth = 0;
            this.partnerHealth = 0;
            this.gameIsRunning = false;
            return true;
        }
    }
    return false;
},
logText: function(playerDamage, partnerDamage) {
    // player attack
    this.turns.unshift({
        isPlayer: true,
        text: 'You attack Partner for ' + partnerDamage

    });

    // partner attack
    this.turns.unshift({
        isPlayer: false,
        text: 'Partner attacks you for ' + playerDamage 

    });
   
}
}
});