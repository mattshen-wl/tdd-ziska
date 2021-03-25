const { randomIntRange } = require('./math');

const defaultState = {
  player: {
    health: 100
  },
  enemies: [{
    id: 0,
    health: 100
  }, {
    id: 1,
    health: 100,
    inFight: false
  }]
};

let state = {};

function initGame(params = defaultState) {
  state = {
    ...state,
    player: {
      health: params.playerHealth
    },
    enemies: [...Array(params.enemyCount).keys()].map((id) => ({
      id,
      health: params.enemyHealth,
      inFight: false
    }))
  };
  return state;
}

function startFight(enemyId) {
  state.enemies[enemyId].inFight = true;
}

function nextEnemyId() {
  const availableEnemies = state.enemies.filter((o) => o.inFight === false);
  return availableEnemies[randomIntRange(0, availableEnemies.length)].id;
}

function playerAttack(dmg) {
  const enemy = state.enemies.find((o) => o.inFight === true);
  enemy.health -= dmg;
  if (enemy.health < 1) {
    enemy.inFight = false;
  }
  console.log(`ziska caused ${dmg} damage to enemy ${enemy.id}`);
}

function enemyAttack(dmg) {
  const enemy = state.enemies.find((o) => o.inFight === true);
  if (enemy != null) {
    state.player.health -= dmg;
    console.log(`enemy ${enemy.id} caused ${dmg} damage to ziska`);
  }
}

function executeTurn(playerDmg, enemyDmg) {
  // ziska attack
  playerAttack(playerDmg);
  // enemy attack
  enemyAttack(enemyDmg);
}

function currentEnemy() {
  return state.enemies.find((o) => o.inFight === true);
}

function isFightOver() {
  const ce = currentEnemy();
  return state.player.health < 1 || ce == null;
}

function isGameOver() {
  return state.player.health < 1 || state.enemies.filter((o) => o.health > 0).length === 0;
}

function ziskaWin() {
  return state.player.health > 0;
}

function printHeathStatus() {
  const ce = currentEnemy();
  console.log(`health status => ziska: ${state.player.health}, enemy ${(ce || {}).health || 0}`);
}

module.exports = {
  initGame,
  isGameOver,
  startFight,
  isFightOver,
  executeTurn,
  currentEnemy,
  nextEnemyId,
  ziskaWin,
  printHeathStatus
};
