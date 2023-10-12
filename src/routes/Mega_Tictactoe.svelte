<script>
  import Tictactoe from "src/routes/Tictactoe.svelte";

  let board = Array(9); //.fill(TicTacToe); // Representa o estado do tabuleiro
  let currentPlayer = "X"; // Inicia com o jogador X
  let whereNext = "";
  let isActive = true;
  /**
   * @type {string | null}
   */
  let winner = ""; // Armazena o vencedor (X, O, ou null)

  // Função whereNext
  /**
   * @param {{ detail: any; }} event
   */
  function define_whereNext(event) {
    whereNext = event.detail;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
  /**
   * @param {{toString: () => string;}} elementIndex
   * @param {string} WN_Value
   */
  function define_isActive(WN_Value, elementIndex) {
    if (WN_Value != "") {
      elementIndex == WN_Value ? (isActive = true) : (isActive = false);
      console.log(isActive, WN_Value, elementIndex);
      return isActive;
    } else if (WN_Value == "") {
      isActive = true;
      console.log(WN_Value);
      return isActive;
    }
  }

  // Função para reiniciar o jogo
  function resetGame() {
    board = Array(9).fill("");
    currentPlayer = "X";
    winner = "";
  }
</script>

<!-- A interface do jogo -->
<div class="mega-game">
  <div class="mega-tictactoe-grid">
    {#each board as ticGame, index}
      <div
        class="{define_isActive(whereNext, index.toString())
          ? 'active'
          : 'inactive'} border-{index}"
      >
        <Tictactoe
          {currentPlayer}
          on:whereNext_Updated={define_whereNext}
          megaIndex={index}
        />
      </div>
    {/each}
  </div>
  {#if winner}
    <p>{winner === "Empate" ? "Empate!" : `Vencedor: ${winner}`}</p>
    <button on:click={resetGame}>Reiniciar</button>
  {/if}
</div>

<style>
  .mega-game {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
  }

  .mega-tictactoe-grid {
    display: grid;
    grid-template: 32% 32% 32% / 32% 32% 32%;
  }

  .mega-tictactoe-grid > div {
    padding: 30px;
  }

  .border-3,
  .border-4,
  .border-5,
  .border-6,
  .border-7,
  .border-8 {
    border-top: 4px solid #fff;
  }

  .border-0,
  .border-1,
  .border-3,
  .border-4,
  .border-6,
  .border-7 {
    border-right: 4px solid #fff;
  }

  .border-0,
  .border-1,
  .border-2,
  .border-3,
  .border-4,
  .border-5 {
    border-bottom: 4px solid #fff;
  }

  .border-1,
  .border-2,
  .border-4,
  .border-5,
  .border-7,
  .border-8 {
    border-left: 4px solid #fff;
  }

  .active {
    /* background-color: red; */
  }

  .inactive {
    pointer-events: none;
    opacity: 0.4;
  }
</style>
