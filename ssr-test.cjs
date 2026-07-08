// SSR smoke test: compiles the raw .svelte source in SSR mode and renders it,
// which is exactly what SvelteKit does when it resolves the "svelte" exports condition.
require('svelte/register');
const Skeleton = require('./src/Skeleton.svelte').default;
const SkeletonTheme = require('./src/Skeleton-theme.svelte').default;

const out = Skeleton.render({ count: 3, width: 200, height: 20 });
if (!out.html || !out.html.includes('svelte-loader-skeleton')) {
  console.error('FAIL: Skeleton did not render expected markup');
  console.error(out.html);
  process.exit(1);
}

const themed = SkeletonTheme.render({ color: '#222', highlightColor: '#333' });
if (!themed.html || !themed.html.includes('<div')) {
  console.error('FAIL: SkeletonTheme did not render');
  process.exit(1);
}

console.log('PASS: SSR render works');
console.log(out.html.slice(0, 200));
