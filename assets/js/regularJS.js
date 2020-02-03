

/* state -- This is the object where the heroes are stored,
with all of their stats including the health used during the game.


*/
var gameState = {
  userHero: "",
  rivalHero: "",
  heroStats: [
    {
      name: "hero-a",
      type: "fire",
      hp: 39,
      attack: 52,
      defense: 43,
      level: 1,
      img: "https://images.tre-marshall.com/rps-game/superhero-a.svg"
    },

    {
      name: "hero-b",
      type: "earth",
      hp: 45,
      attack: 49,
      defense: 49,
      level: 1,
      img: "https://images.tre-marshall.com/rps-game/superhero-b.svg"
    },

    {
      name: "hero-c",
      type: "water",
      hp: 44,
      attack: 48,
      defense: 65,
      level: 1,
      img: "https://images.tre-marshall.com/rps-game/superhero-c.svg"
    }
  ],

  elements: { // picking essential elements referenced through the game
    heroEl: document
      .querySelector(".select-screen")
      .querySelectorAll(".character"),
    battleScreenEl: document.getElementById("battle-screen"),
    attackBtnsEl: document
      .getElementById("battle-screen")
      .querySelectorAll(".attack")
  },

  init: function() {
    //the initial loop
    var i = 0;
    while (i < gameState.elements.heroEl.length) {
      //add function to all characters on screen select
      gameState.elements.heroEl[i].onclick = function() {
        // current selected hero's name
        var heroName = this.dataset.heroes;

        //elements for images on battle screen
        var player1Img = document
          .querySelector(".player1")
          .getElementsByTagName("img");
        var player2Img = document
          .querySelector(".player2")
          .getElementsByTagName("img");

        // save the current hero
        gameState.userHero = heroName;

        // cpu picks a hero
        gameState.cpuPick();

        // change screen to battle scene
        gameState.elements.battleScreenEl.classList.toggle("active");

        // select data from current user hero
        gameState.currentHero = gameState.heroStats.filter(function(hero) {
          return hero.name == gameState.userHero;
        });
        player1Img[0].src = gameState.currentHero[0].img;

        // select data from current cpu hero
        gameState.currentrivalHero = gameState.heroStats.filter(function(
          hero
        ) {
          return hero.name == gameState.rivalHero;
        });
        player2Img[0].src = gameState.currentrivalHero[0].img;

        // current user and cpu hero initial health
        gameState.currentHero[0].health = gameState.calculateInitialHealth(
          gameState.currentHero
        );
        gameState.currentHero[0].originalHealth = gameState.calculateInitialHealth(
          gameState.currentHero
        );
        gameState.currentrivalHero[0].health = gameState.calculateInitialHealth(
          gameState.currentrivalHero
        );
        gameState.currentrivalHero[0].originalHealth = gameState.calculateInitialHealth(
          gameState.currentrivalHero
        );
        console.log(gameState);
      };

      i++;
    }

    var a = 0;
    while (a < gameState.elements.attackBtnsEl.length) {
      gameState.elements.attackBtnsEl[a].onclick = function() {
        var attackName = this.dataset.attack;
        gameState.currentUserAttack = attackName;

        gameState.play(attackName, gameState.cpuAttack());
      };

      a++;
    }
  },

  cpuAttack: function() {
    var attacks = ["rock", "paper", "scissors"];

    return attacks[gameState.randomNumber(0, 3)];
  },

  calculateInitialHealth: function(user) {
    return 0.2 * Math.sqrt(user[0].level) * user[0].defense * user[0].hp;
  },

  attackMove: function(attack, level, stack, critical, enemy, attacker) {
    console.log(enemy.name + " before: " + enemy.health);
    var attackAmount = attack * level * (stack + critical);
    enemy.health = enemy.health - attackAmount;

    var userHP = document.querySelector('.player1').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside')
    var cpuHP = document.querySelector('.player2').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside')
    if(enemy.owner == 'user') {
      var minusPercent = ((enemy.health * 100) / enemy.originalHealth)
      userHP.style.width = ((minusPercent < 0) ? 0 : minusPercent) + '%'
    } else {
      var minusPercent = ((enemy.health * 100) / enemy.originalHealth)
      cpuHP.style.width = ((minusPercent < 0) ? 0 : minusPercent) + '%'
    }
    gameState.checkWinner(enemy, attacker);
    console.log(enemy.name + " after: " + enemy.health);
  },

  checkWinner: function(enemy, attacker) {
    if (enemy.health <= 0) {
      console.log("HEY WINNERRRRRRR" + attacker.name);
    }
  },

  randomNumber: function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  cpuPick: function() {
    do {
      gameState.rivalHero =
        gameState.elements.heroEl[gameState.randomNumber(0, 3)].dataset.heroes;
      console.log('looping' + gameState.rivalHero)
    }
    while(gameState.userHero == gameState.rivalHero)

  },

  play: function(userAttack, cpuAttack) {
    var currentHero = gameState.currentHero[0];
    var currentrivalHero = gameState.currentrivalHero[0];
    currentHero.owner = 'user'
    currentrivalHero.owner = 'cpu'
    switch (userAttack) {
      case "rock":
        if (cpuAttack == "paper") {
          if (currentHero.health >= 0 && currentrivalHero.health >= 0) {
            // user
            gameState.attackMove(
              currentHero.attack,
              currentHero.level,
              0.8,
              0.5,
              currentrivalHero,
              currentHero
            );
            if (currentrivalHero.health >= 1) {
              // cpu
              gameState.attackMove(
                currentrivalHero.attack,
                currentrivalHero.level,
                0.8,
                2,
                currentHero,
                currentrivalHero
              );
            }
          }
        }
        if (cpuAttack == "scissors") {
          if (currentHero.health >= 0 && currentrivalHero.health >= 0) {
            // user
            gameState.attackMove(
              currentHero.attack,
              currentHero.level,
              0.8,
              2,
              currentrivalHero,
              currentHero
            );
            if (currentrivalHero.health >= 1) {
              // cpu
              gameState.attackMove(
                currentrivalHero.attack,
                currentrivalHero.level,
                0.8,
                0.5,
                currentHero,
                currentrivalHero
              );
            }
          }
        }
        if (cpuAttack == "rock") {
          if (currentHero.health >= 0 && currentrivalHero.health >= 0) {
            // user
            gameState.attackMove(
              currentHero.attack,
              currentHero.level,
              0.8,
              1,
              currentrivalHero,
              currentHero
            );
            if (currentrivalHero.health >= 1) {
              // cpu
              gameState.attackMove(
                currentrivalHero.attack,
                currentrivalHero.level,
                0.8,
                1,
                currentHero,
                currentrivalHero
              );
            }
          }
        }
        break;
      case "paper":
        if (cpuAttack == "paper") {
          if (currentHero.health >= 0 && currentrivalHero.health >= 0) {
            // user
            gameState.attackMove(
              currentHero.attack,
              currentHero.level,
              0.8,
              1,
              currentrivalHero,
              currentHero
            );
            if (currentrivalHero.health >= 1) {
              // cpu
              gameState.attackMove(
                currentrivalHero.attack,
                currentrivalHero.level,
                0.8,
                1,
                currentHero,
                currentrivalHero
              );
            }
          }
        }
        if (cpuAttack == "scissors") {
          if (currentHero.health >= 0 && currentrivalHero.health >= 0) {
            // user
            gameState.attackMove(
              currentHero.attack,
              currentHero.level,
              0.8,
              0.5,
              currentrivalHero,
              currentHero
            );
            if (currentrivalHero.health >= 1) {
              // cpu
              gameState.attackMove(
                currentrivalHero.attack,
                currentrivalHero.level,
                0.8,
                2,
                currentHero,
                currentrivalHero
              );
            }
          }
        }
        if (cpuAttack == "rock") {
          if (currentHero.health >= 0 && currentrivalHero.health >= 0) {
            // user
            gameState.attackMove(
              currentHero.attack,
              currentHero.level,
              0.8,
              2,
              currentrivalHero,
              currentHero
            );
            if (currentrivalHero.health >= 1) {
              // cpu
              gameState.attackMove(
                currentrivalHero.attack,
                currentrivalHero.level,
                0.8,
                0.5,
                currentHero,
                currentrivalHero
              );
            }
          }
        }
        break;
      case "scissors":
        if (cpuAttack == "paper") {
          if (currentHero.health >= 0 && currentrivalHero.health >= 0) {
            // user
            gameState.attackMove(
              currentHero.attack,
              currentHero.level,
              0.8,
              2,
              currentrivalHero,
              currentHero
            );
            if (currentrivalHero.health >= 1) {
              // cpu
              gameState.attackMove(
                currentrivalHero.attack,
                currentrivalHero.level,
                0.8,
                0.5,
                currentHero,
                currentrivalHero
              );
            }
          }
        }
        if (cpuAttack == "scissors") {
          if (currentHero.health >= 0 && currentrivalHero.health >= 0) {
            // user
            gameState.attackMove(
              currentHero.attack,
              currentHero.level,
              0.8,
              1,
              currentrivalHero,
              currentHero
            );
            if (currentrivalHero.health >= 1) {
              // cpu
              gameState.attackMove(
                currentrivalHero.attack,
                currentrivalHero.level,
                0.8,
                1,
                currentHero,
                currentrivalHero
              );
            }
          }
        }
        if (cpuAttack == "rock") {
          if (currentHero.health >= 0 && currentrivalHero.health >= 0) {
            // user
            gameState.attackMove(
              currentHero.attack,
              currentHero.level,
              0.8,
              0.5,
              currentrivalHero,
              currentHero
            );
            if (currentrivalHero.health >= 1) {
              // cpu
              gameState.attackMove(
                currentrivalHero.attack,
                currentrivalHero.level,
                0.8,
                2,
                currentHero,
                currentrivalHero
              );
            }
          }
        }
    }
  }
};

gameState.init()





/* to do:

make a refresh button/notification when it's done?

make hp bars go down according to damage default?

change enemy parameter in attackMove function to hero or something

adjust the fight scene background to just fit

maybe change && statement in the RPS functions to ||?

do a final cleanup of the code

fix health bar overfill

*/
