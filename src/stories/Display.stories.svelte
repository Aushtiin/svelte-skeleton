<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Box from "../Box.svelte";
  import Skeleton from "../index";
</script>

<Meta
  title="Skeleton"
  component={Skeleton}
  argTypes={{
    class: { control: "text" },
    width: { control: "number" },
    duration: { control: "number" },
    height: { control: "number" },
    circle: { control: "boolean" },
    color: { control: "color" },
    count: { control: "number" },
    wrapper: { control: "component" },
  }}
/>

<Template let:args>
  <Skeleton {...args} />
</Template>

<Story
  name="count 2"
  args={{
    count: 2,
    wrapper: Box,
  }}
/>

<Story
name = "profile pic"
args= {{
  height: 200,
  width: 200,
  circle: true
}}
/>

<Story 
name="side bar"
args={{
  height: 500,
  width: 250
}}
/>