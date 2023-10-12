<script>
  // let board = Array(9).fill(null);
  // let currentPlayer = 'X';

  // function makeMove(index) {
  //   if (board[index] === null) {
  //     board[index] = currentPlayer;
  //     currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  //   }
  // }

  // JogoDaVelha.svelte
  import { onMount } from "svelte";
  import { io } from "socket.io-client";

  let board = Array(9).fill(null);
  let currentPlayer = "X";
  const socket = io("http://localhost:3000"); // Substitua pelo seu servidor real

  function makeMove(index) {
    if (board[index] === null) {
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
  <div class="board">
    {#each board as cell, index (index)}
      <div class="cell" on:click={() => makeMove(index)}>
        {cell}
      </div>
    {/each}
  </div>
</main>

<style>
  /* Estilize seu tabuleiro aqui */
</style>
