<script>
  //import "@carbon/charts/styles.min.css";
  //import "carbon-components/css/carbon-components.min.css";

  import { ForceGraph } from "$lib/src/ForceGraph";
  import thoughts from "$lib/database/dist/thoughts.json";
  import links from "$lib/database/dist/links.json";
  //import attachments from '$lib/database/attachments.js'

  import { afterUpdate, beforeUpdate, onMount } from "svelte";

  import { amp, browser, dev, mode, prerendering } from "$app/env";

  import {
    disableScrollHandling,
    goto,
    invalidate,
    prefetch,
    prefetchRoutes,
    beforeNavigate,
    afterNavigate
  } from "$app/navigation";

  import { base, assets } from "$app/paths";

  import { getStores, navigating, page, session } from "$app/stores";

  import _ from "lodash";

  import Box from "./box.svelte";
  import Circle from "./circle.svelte";
  import Filter from "./filter.svelte";
  import Info from "./info.svelte";
  import Network from "./network.svelte";
  import Timeline from "./timeline.svelte";
  import Tree from "./tree.svelte";

  import Search from "carbon-components-svelte/src/Search/Search.svelte";
  let expanded = false;

  import RadioButtonGroup from "carbon-components-svelte/src/RadioButtonGroup/RadioButtonGroup.svelte";
  import RadioButton from "carbon-components-svelte/src/RadioButton/RadioButton.svelte";

  let selection;

  function handleMessage(event) {
    alert(event.detail.text);
  }

  //function checkType(TypeId) {
  //return TypeID == d266c2fe-63cc-464a-9427-dc4cd7c1ef41;
  //}

  //function displayPeople() {
  //	thoughts = thoughts.filter(checkType);
  //}

  //function displayAll() {
  //	thoughts = thoughtsBackup;
  //}

  onMount(() => {
    console.log("the component has mounted");

    //take first 100 thoughts
    //const limitedThoughts = thoughts.slice(0, 500);
    //const thoughtsById = limitedThoughts.reduce((acc, thought) => {
    //  acc[thought.Id] = thought;
    //  return acc;
    //}, {});

    // take random 500 thoughts
    const shuffledThoughts = thoughts.sort(() => 0.5 - Math.random());
    const limitedThoughts = shuffledThoughts.slice(0, 1000);
    const thoughtsById = limitedThoughts.reduce((acc, thought) => {
      acc[thought.Id] = thought;
      return acc;
    }, {});


    const thoughtIds = new Set(Object.keys(thoughtsById));
    const linksToThoughts = links.filter(link => {
      return thoughtIds.has(link.ThoughtIdA) && thoughtIds.has(link.ThoughtIdB);
    });

    const graph = {
      nodes: limitedThoughts.map(thought => ({
        id: thought.Name,
        group: thought.TypeId
      })),
      links: linksToThoughts.map(link => ({
        source: thoughtsById[link.ThoughtIdA].Name,
        target: thoughtsById[link.ThoughtIdB].Name,
        value: 10
      }))
    };

    console.log(graph);

    // select an svg element with d3, will function as canvas for graph


    const chart = ForceGraph(graph, {
      nodeId: d => d.id,
      nodeGroup: d => d.group,
      nodeTitle: d => `${d.id}\n${d.group}`,
      linkStrokeWidth: l => Math.sqrt(l.value),
      height: window.innerHeight,
      width: window.innerWidth,
      invalidation: new Promise(resolve => resolve())
    });

    document.getElementById("fdg").appendChild(chart);
    console.log("chart", chart);
  });

  afterUpdate(() => {
    console.log("the component just updated");
  });
</script>

<style>
  @font-face {
    font-family: "FinancierDisplay";
    font-style: bold;
    font-weight: 700;
    src: url("/font/FinancierDisplay-Bold.otf");
  }

  @font-face {
    font-family: "FinancierText";
    font-style: normal;
    font-weight: 400;
    src: url("/font/FinancierText-Regular.otf");
  }

  :global(h1) {
    font-family: "FinancierDisplay";
  }

  :global(body) {
    /* this will apply to <body> */
    background-color: #060707;
    color: #ffffff;
    font-family: "FinancierText";
    height: 100%;
    scrollbar-color: #151515 #060707;
    scrollbar-width: thin;
  }

  :global(button) {
    /* this will apply to all <strong> elements, in any
			 component, that are inside <div> elements belonging
			 to this component */
    background-color: #252525;
    border: none;
    color: #ffffff;
    margin-right: 0.25rem;
    margin-top: 0.5rem;
  }

  div:global(.info) {
    /* this will apply to all <p> elements belonging to this 
			 component with a class of red, even if class="red" does
			 not initially appear in the markup, and is instead 
			 added at runtime. This is useful when the class 
			 of the element is dynamically applied, for instance 
			 when updating the element's classList property directly. */
    position: fixed;
    bottom: 0;
    margin: 1rem;
  }

</style>

<div id="fdg" />

<!--index and filter-->
<Filter />

<!--Selected thought information-->
<Info />
