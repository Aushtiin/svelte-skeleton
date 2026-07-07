const { render } = require("@testing-library/svelte");
const Skeleton = require("../src/Skeleton.svelte").default;
const SkeletonTheme = require("../src/Skeleton-theme.svelte").default;

const injectedCss = () =>
  Array.from(document.querySelectorAll("style"))
    .map((s) => s.textContent)
    .join("\n");

describe("Skeleton", () => {
  it("renders one line by default", () => {
    const { container } = render(Skeleton);
    expect(container.querySelectorAll(".svelte-loader-skeleton")).toHaveLength(1);
  });

  it("renders `count` lines", () => {
    const { container } = render(Skeleton, { count: 4 });
    expect(container.querySelectorAll(".svelte-loader-skeleton")).toHaveLength(4);
  });

  it("applies width, height and circle as inline styles", () => {
    const { container } = render(Skeleton, { width: 50, height: 50, circle: true });
    const el = container.querySelector(".svelte-loader-skeleton");
    expect(el.style.width).toBe("50px");
    expect(el.style.height).toBe("50px");
    expect(el.style.borderRadius).toBe("50%");
  });

  it("appends a custom class", () => {
    const { container } = render(Skeleton, { class: "foobar" });
    expect(container.querySelector(".svelte-loader-skeleton.foobar")).not.toBeNull();
  });

  it("uses default colors when none are given", () => {
    render(Skeleton);
    expect(injectedCss()).toContain("background-color:#eee");
  });

  it("uses custom color and highlightColor", () => {
    render(Skeleton, { color: "#123456", highlightColor: "#abcdef" });
    const css = injectedCss();
    expect(css).toContain("background-color:#123456");
    expect(css).toContain("#abcdef");
  });
});

describe("SkeletonTheme", () => {
  it("emits a rule targeting the skeleton class with the theme colors", () => {
    render(SkeletonTheme, { color: "#202020", highlightColor: "#444444" });
    const match = injectedCss().match(/\.svelte-loader-skeleton\{[^}]*\}/);
    expect(match).not.toBeNull();
    expect(match[0]).toContain("#202020");
    expect(match[0]).toContain("#444444");
  });
});
