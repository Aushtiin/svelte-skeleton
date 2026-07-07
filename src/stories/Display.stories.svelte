<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Box from "../Box.svelte";
  import Skeleton, { SkeletonTheme } from "../index";
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
    highlightColor: { control: "color" },
    count: { control: "number" },
    wrapper: { control: "component" },
  }}
/>

<Template let:args>
  <Skeleton {...args} />
</Template>

<Template id="themed" let:args>
  <SkeletonTheme color={args.color} highlightColor={args.highlightColor}>
    <p>
      <Skeleton count={args.count} />
    </p>
  </SkeletonTheme>
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

<Story
name="custom colors"
args={{
  count: 3,
  color: "#3b2f63",
  highlightColor: "#7a6bb0"
}}
/>

<Story
name="themed"
template="themed"
args={{
  count: 3,
  color: "#202020",
  highlightColor: "#444444"
}}
/>