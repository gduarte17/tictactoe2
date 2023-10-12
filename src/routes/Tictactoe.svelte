<script>
  // JogoDaVelha.svelte
  import { onMount } from "svelte";
  import { io } from "socket.io-client";

  let board = Array(9).fill("");
  let currentPlayer = "X";
  const socket = io("http://localhost:3000"); // Substitua pelo seu servidor real

  function makeMove(index) {
    if (board[index] === "") {
      board[index] = currentPlayer;
      socket.emit("makeMove", index); // Enviar movimento para o servidor
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }

  socket.on("updateBoard", (updatedBoard) => {
    board = updatedBoard;
  });

  onMount(() => {
    // Lógica para inicializar o jogo
    // ...
  });
</script>

<main>
  <h1>Jogo da Velha</h1>
  <div class="game">
    <div class="tictactoe-grid">
      {#each board as cell, index (index)}
        <div class="cell border-{index}" on:click={() => makeMove(index)}>
          {cell}
        </div>
      {/each}
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    margin-bottom: 60px;
  }
  .cell {
    width: 75px;
    height: 75px;
    text-align: center;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .game {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
  }

  .tictactoe-grid {
    display: grid;
    grid-template: 32% 32% 32% / 32% 32% 32%;
    /* gap: 5px; */
  }

  .border-3,
  .border-4,
  .border-5,
  .border-6,
  .border-7,
  .border-8 {
    border-top: 3px solid #fff;
  }

  .border-0,
  .border-1,
  .border-3,
  .border-4,
  .border-6,
  .border-7 {
    border-right: 3px solid #fff;
  }

  .border-0,
  .border-1,
  .border-2,
  .border-3,
  .border-4,
  .border-5 {
    border-bottom: 3px solid #fff;
  }

  .border-1,
  .border-2,
  .border-4,
  .border-5,
  .border-7,
  .border-8 {
    border-left: 3px solid #fff;
  }
</style>
