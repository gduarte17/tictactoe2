<script>
  // JogoDaVelha.svelte
  import { onMount } from "svelte";
  import { io } from "socket.io-client";

  let board = Array(9).fill("");
  export let currentPlayer;
  const socket = io("http://localhost:3000"); // Substitua pelo seu servidor real

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function sent_whereNext(value) {
    dispatch("whereNext_Updated", value);
  }

  let winner = ""; // Armazena o vencedor (X, O, ou null)

  function makeMove(index) {
    console.log("makeMove");
    if (board[index] || winner) return; // Verifica se a célula já foi preenchida ou se já existe um vencedor

    board[index] = currentPlayer;
    socket.emit("makeMove", index);
    sent_whereNext(index.toString());

    checkWinner();

    // if (board[index] === "") {
    //   console.log("makeMove - if called");
    //   board[index] = currentPlayer;
    //   socket.emit("makeMove", index); // Enviar movimento para o servidor
    //   currentPlayer = currentPlayer === "X" ? "O" : "X";
    // }
  }

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Linhas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Colunas
      [0, 4, 8],
      [2, 4, 6], // Diagonais
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = board[a]; // Definir o vencedor
        return;
      }
    }

    // Verifica se o tabuleiro está cheio (empate)
    if (!board.includes("")) {
      winner = "Empate";
    }
  }

  socket.on("updateBoard", (updatedBoard) => {
    board = updatedBoard;
  });

  onMount(() => {
    // Lógica para inicializar o jogo
    // ...
  });

  export let megaIndex;
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
