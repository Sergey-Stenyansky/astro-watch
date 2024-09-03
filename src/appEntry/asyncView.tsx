import { Suspense, lazy, memo, useMemo } from "react";

function AsyncView({ name }: { name: string }) {
  const View = useMemo(() => getAsyncViewComponent(name), [name]);
  return <Suspense fallback={null}>{<View />}</Suspense>;
}

export default memo(AsyncView);

function getAsyncViewComponent(name: string) {
  return lazy(async () => {
    const Component = await import(`../views/${name}/index.tsx`).then((module) => module.default);
    return { default: () => <Component /> };
  });
}
