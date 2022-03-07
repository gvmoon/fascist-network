<script>
  import MarqueeTextWidget from "svelte-marquee-text-widget";
  import thoughts from "$lib/database/dist/thoughts.json";
  //import links from '$lib/database/dist/links.json'
  //import attachments from '$lib/database/attachments.js'
  import { get } from "svelte/store";
  import { getNewSelection, selection } from "./stores.js";

  import { onMount } from "svelte";

  //fetch wiki info
  let wiki = [];
  let wikiPages = [];

  //selection store
  let selected;

  selection.subscribe(value => {
    selected = value;
  });

  const BASE_URL =
    "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&explaintext=false&exintro&titles=";

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
</script>

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
      <h3>{wikiPage.title}</h3>
      <p>{wikiPage.extract}</p>
    </div>
  {/each}

  <!-- {#key wiki}
    <p>{  wiki.extract }</p>
{/key} -->
</div>
