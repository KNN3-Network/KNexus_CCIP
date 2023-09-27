import { useEffect } from "react";

import { Router, useRouter } from "next/router";

import { PageScrollTrace, PageViewTrace } from "lib/trace";

let scrollIndex = 0;
export function Trace() {
  const router = useRouter();

  useEffect(() => {
    scrollIndex = 0;

    const pathName = router.pathname.replace("/", "");

    PageViewTrace(pathName);
    window.addEventListener("scroll", (e) => {
      if (document.documentElement.scrollTop > 100 && scrollIndex == 0) {
        scrollIndex++;
        PageScrollTrace(pathName);
      }
    });
  }, [router]);

  return <></>;
}
