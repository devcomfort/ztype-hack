// @ts-check

/**
 * @todo 다음 단계로 이동하는 함수
 * @todo 총알 속도 지정
 * @todo speedFactor를 통한 전체 속도 조작
 * @todo speed 요소를 통한 개별 엔티티 속도 조작
 */

const ZTypeHandler = () => {
  const Entity = {
    /**
     * 엔티티 정보 반환 (마지막 요소는 플레이어 요소)
     * @returns
     */
    allEntities: () => ig.game.entities,
    /**
     * 플레이어 정보 가져오기
     * @returns
     */
    player: () => ig.game.player,

    /**
     * 적대적 엔티티 정보 반환
     * @returns
     */
    allHostiles: () =>
      Object.values(ig.game.targets).reduce((acc, cur) => [...acc, ...cur]),
  };

  const Player = {
    /**
     * 궁 개수 지정
     * @param {number} cnt
     * @returns
     */
    setEmp: (cnt) => (ig.game.emps = cnt),
    /** 궁 개수 */
    getEmp: () => ig.game.emps,
  };

  const Game = {
    /**
     * 몹 스폰 시간 간격 조작
     * @param {number} time 스폰 시간 지정
     * @returns
     */
    setSpawnRate: (time) => (ig.game.wave.spawnWait = time),
    /**
     * 몹 스폰 시간 간격
     * @returns
     */
    getSpawnRate: () => ig.game.wave.spawnWait,
  };

  const toAllHostiles = {
    /**
     * 모든 엔티티 스피트 지정
     * @param {number} speed
     */
    setAllSpeed: (speed) => {
      Entity.allHostiles().forEach((target) => {
        target.speed = speed;
      });
    },
  };

  const skills = {
    /** 궁 실행 함수 */
    launchEMP: () => ig.game.entities.at(-1).spawnEMP(),
    stunGun: () => toAllHostiles.setAllSpeed(0),
    killAll: function () {
      this.stunGun();
      const { x, y } = ig.game.player.pos;
      Entity.allHostiles().forEach((target) => {
        target.pos.x = x;
        target.pos.y = y - 50;
      });
    },
    autoShot: function () {
      const expectedKeys = ig.game.keyboard.expectedKeys;
      if (expectedKeys.length > 0) {
        ig.game.shoot(expectedKeys[0]);
      }
    },
    /**
     * 자동 사격
     * @param {number} shot_per_sec
     * @returns
     */
    autoShower: function (shot_per_sec = 0) {
      const id = setInterval(this.autoShot, shot_per_sec);
      return {
        clear: () => clearInterval(id),
      };
    },
  };

  return {
    Player,
    Game,
    Entity,
    skills,
  };
};
