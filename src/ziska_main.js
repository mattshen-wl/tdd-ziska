const { randomIntRange } = require('./math');
const game_engine = require('./ziska_game_engine');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startGameMainLoop() {
  game_engine.initGame({
    playerHealth: 300,
    enemyCount: 2,
    enemyHealth: 100
  });
  while (!game_engine.isGameOver()) {
    const enemyId = game_engine.nextEnemyId();
    if (enemyId == null) {
      break;
    }
    console.log(`Ziska encountered enemy ${enemyId}`);
    game_engine.startFight(enemyId);
    do {
      const playerDmg = randomIntRange(1, 39);
      const enemyDmg = randomIntRange(1, 59);
      game_engine.executeTurn(playerDmg, enemyDmg);
      game_engine.printHeathStatus();
      await sleep(500);
    } while (!game_engine.isFightOver());

    if (game_engine.ziskaWin()) {
      console.log(`Ziska won the fight over enemy ${enemyId}`);
    } else {
      console.log(`Ziska lost the fight to enemy ${enemyId}`);
    }
  } 
  console.log(`********* GAME OVER *********`); 
}

startGameMainLoop().catch(e => console.error(e));
