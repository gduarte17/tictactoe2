<script>
  export let name;

  import MegaTictactoe from "./routes/Mega_Tictactoe.svelte";
</script>

<main>
  <h1>Tic Tac Toe 2</h1>
  <MegaTictactoe />
  <!-- <h1>Hello {name}!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p> -->
</main>

<style>
  main {
    width: 100%;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  /* @media (min-width: 640px) {
    main {
      max-width: none;
    }
  } */
</style>
