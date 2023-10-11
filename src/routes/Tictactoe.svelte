<script>
    let board = Array(9).fill(null);
    let currentPlayer = 'X';
  
    function makeMove(index) {
      if (board[index] === null) {
        board[index] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
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
  