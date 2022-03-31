<script>
  import thoughts from "$lib/database/dist/thoughts.json";
  import MeterChart from "$lib/node_modules/@carbon/charts-svelte/src/MeterChart.svelte";
  import { getNewSelection, selection } from "./stores.js";

  import "@carbon/charts/styles.min.css";
  //import "carbon-components/css/carbon-components.min.css";

  const thoughtCounts = {};

  thoughts.forEach(thought => {
    const id = thought.TypeId;

    if (!thoughtCounts[id]) {
      thoughtCounts[id] = 0;
    }

    thoughtCounts[id]++;
  });

  const thoughtData = Object.entries(thoughtCounts).map(([group, value]) => ({
    group,
    value
  }));

  let selected;

  selection.subscribe(value => {
    selected = value;
  });

  async function handleClick() {
    // const nameWithoutSpaces = selected.Name.replaceAll(" ", "+")
    // console.log("nameWithoutSpaces", nameWithoutSpaces);
    const encodedName = encodeURIComponent(selected.Name);
    console.log("encodedName", encodedName);
    const url = `${BASE_URL}${encodedName}`;
    console.log("url", url);

    const response = await fetch(url);
    const responseJson = (await response.json()) || { query: { pages: {} } };

    wikiPages = Object.values(responseJson.query.pages);
  }

  import MarqueeTextWidget from "svelte-marquee-text-widget";
  //import links from '$lib/database/dist/links.json'
  //import attachments from '$lib/database/attachments.js'
  import { get } from "svelte/store";

  import { onMount } from "svelte";

  //fetch wiki info
  let wiki = [];
  let wikiPages = [];

  const BASE_URL =
    "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&explaintext=false&exintro&titles=";

</script>

<style>
  .category {
    overflow-x: auto;
    overflow-y: hidden;
    -ms-text-overflow: clip;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    white-space: nowrap;
  }
</style>

<!--all items-->
<div class="category">
  <ul>
    {#each thoughts as thought}
      <button on:click={() => getNewSelection(thought)} on:click={handleClick}>
        {thought.Name}
      </button>
    {/each}
  </ul>
</div>

<!--all ideologies-->
<div class="category">
  <ul>
    {#each thoughts as thought}
      {#if thought.TypeId == '709d6d60-467b-4e7e-8477-8fc17a00e695'}
        <button on:click={() => getNewSelection(thought)} on:click={handleClick}>
          {thought.Name}
        </button>
      {/if}
    {/each}
  </ul>
</div>

<!--all organizations-->
<div class="category">
  <ul>
    {#each thoughts as thought}
      {#if thought.TypeId == '562165bf-44e4-4f29-a84f-c6119270d481'}
        <button on:click={() => getNewSelection(thought)} on:click={handleClick}>
          {thought.Name}
        </button>
      {/if}
    {/each}
  </ul>
</div>

<!--all governments-->
<div class="category">
  <ul>
    {#each thoughts as thought}
      {#if thought.TypeId == '3595ecca-9dd8-49f0-913d-06b2efb814fc'}
        <button on:click={() => getNewSelection(thought)} on:click={handleClick}>
          {thought.Name}
        </button>
      {/if}
    {/each}
  </ul>
</div>

<!--all universities-->
<div class="category">
  <ul>
    {#each thoughts as thought}
      {#if thought.TypeId == '7b79e690-faaf-404a-982c-fad8b35868f2'}
        <button on:click={() => getNewSelection(thought)} on:click={handleClick}>
          {thought.Name}
        </button>
      {/if}
    {/each}
  </ul>
</div>

<!--all churches-->
<div class="category">
  <ul>
    {#each thoughts as thought}
      {#if thought.TypeId == '9dbd97af-4986-41ae-8ebd-d87a8be0a4ab'}
        <button on:click={() => getNewSelection(thought)} on:click={handleClick}>
          {thought.Name}
        </button>
      {/if}
    {/each}
  </ul>
</div>

<!--all events-->
<div class="category">
  <ul>
    {#each thoughts as thought}
      {#if thought.TypeId == 'd7771b72-cc7a-4436-b92d-89ed8ddad9a4'}
        <button on:click={() => getNewSelection(thought)} on:click={handleClick}>
          {thought.Name}
        </button>
      {/if}
    {/each}
  </ul>
</div>

<!--all media-->
<div class="category">
  <ul>
    {#each thoughts as thought}
      {#if thought.TypeId == '49b42c3b-1a74-46c6-b1d7-ab7c7969a8b9'}
        <button on:click={() => getNewSelection(thought)} on:click={handleClick}>
          {thought.Name}
        </button>
      {/if}
    {/each}
  </ul>
</div>

<!--all persons-->
<div class="category">
  <ul>
    {#each thoughts as thought}
      {#if thought.TypeId == 'd266c2fe-63cc-464a-9427-dc4cd7c1ef41'}
        <button on:click={() => getNewSelection(thought)} on:click={handleClick}>
          {thought.Name}
        </button>
      {/if}
    {/each}
  </ul>
</div>



<div class="info">
  <!-- marquee text appears on button click-->
  <MarqueeTextWidget duration={30} repeat={10}>
    <h1 class="marquee" on:click={handleClick}>
      {selected && selected.Name}&nbsp;&nbsp;
    </h1>
  </MarqueeTextWidget>

  <!--image pulled from wikipedia on button click-->
  <!--<img src="wikipedia.org/{selected.Link"></img>-->

  <!--hyperlinks to wikipedia etc-->
  <ul>
    <!--<li><a href="{selected.Id}">{selected.Id}</a></li>-->
  </ul>

  <!--text pulled from wikipedia on button click-->
  {#each wikiPages as wikiPage}
    <div>
      <!--<h3>{wikiPage.title}</h3>-->
      <p>{wikiPage.extract}</p>
    </div>
  {/each}

  <!-- {#key wiki}
    <p>{  wiki.extract }</p>
{/key} -->
</div>