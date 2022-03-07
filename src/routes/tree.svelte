<script>
  import TreeChart from "@carbon/charts-svelte/src/TreeChart.svelte";
  import "carbon-components/css/carbon-components.min.css";
  import links from "$lib/database/dist/links.json";
  import * as d3 from "d3";

  const linkData = links.map(link => ({
    parent: link.ThoughtIdA,
    child: link.ThoughtIdB
  }));

  //values = FileAttachment("values@1.json").json()

  //export interface BaseChartOptions {
  /**
   * Optionally specify a title for the chart
   */
  //title?: string;
  /**
   * boolean to disable animations (enabled by default)
   */
  //animations?: boolean;
  /**
   * boolean to prevent the container from resizing
   */
  //resizable?: boolean;
  /**
   * Optionally specify a width for the chart
   */
  //width?: string;
  /**
   * Optionally specify a height for the chart
   */
  //height?: string;
  /**
   * tooltip configuration
   */
  //tooltip?: TooltipOptions;
  /**
   * legend configuration
   */
  //legend?: LegendOptions;
  /**
   * toolbar configurations
   */
  //toolbar?: ToolbarOptions;
  /**
   * Optional function to determine whether is filled based on datasetLabel, label, and/or data
   */
  //getIsFilled?: (
  //datasetLabel: any,
  //label?: any,
  //data?: any,
  //defaultFilled?: boolean
  //) => boolean;
  /**
   * Optional function to generate the fill color based on datasetLabel, label, and/or data
   */
  //getFillColor?: (
  //group: string,
  //label?: string,
  //data?: any,
  //defaultFillColor?: string
  //) => string;
  /**
   * Optional function to generate the stroke color based on datasetLabel, label, and/or data
   * (note) - not all chart types support the stroke color (e.g. wordcloud)
   */
  //getStrokeColor?: (
  //group: string,
  //label?: any,
  //data?: any,
  //defaultStrokeColor?: string
  //) => string;
  /**
   * stylesheet options
   */
  //style?: {
  /**
   * optional prefixing string for css classes (defaults to 'cc')
   */
  //prefix?: string;
  //};
  /**
   * options related to charting data
   */
  //data?: {
  /**
   * identifier for data groups
   */
  //groupMapsTo?: string;
  /**
   * used to simulate data loading in skeleton way
   */
  //loading?: boolean;
  /**
   * options related to pre-selected data groups
   * Remains empty if every legend item is active or dataset doesn't have the data groups.
   */
  //selectedGroups?: string[];
  //};
  /**
   * options related to color scales
   */
  //color?: {
  /**
   * e.g. { 'Dataset 1': 'blue' }
   */
  //scale?: object;
  /**
   * use a carbon dataviz preset color palette
   * put the index (selection of which variant)
   */
  //pairing?: {
  /**
   * the number of color variants in the palette (defaults to using the number of data groups in the given data)
   */
  //numberOfVariants?: number;
  /**
   * the option number of the color paring
   */
  //option?: number;
  //};
  /*
   * options related to gradient
   * e.g. { enabled: true }
   */
  //gradient?: {
  //enabled?: boolean;
  /**
   * hex color array
   * e.g. ['#fff', '#000', ...]
   */
  //colors?: Array<String>;
  //};
  //};
</script>

<style>
  .chart :global(div) {
    font: 10px sans-serif;
    background-color: steelblue;
    text-align: right;
    padding: 3px;
    margin: 1px;
    color: white;
  }
</style>

<TreeChart data={linkData} options={{ height: 200, width: 200 }} />

<div class="chart" />
