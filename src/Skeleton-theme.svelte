<script>
  import createEmotion from "@emotion/css/create-instance";

  const { css } = createEmotion({ key: "some-key" });
  import { defaultBaseColor, defaultHighlightColor } from "./Skeleton.svelte";

  export let color = defaultBaseColor;
  export let highlightColor = defaultHighlightColor;

  const themeStyles = css`
    .loading-skeleton {
      background-color: ${color};
      background-image: linear-gradient(
        90deg,
        ${color},
        ${highlightColor},
        ${color}
      );
    }
  `;
</script>

<div class={themeStyles}>
  <slot />
</div>
