import dynamic from "next/dynamic";

export default function Home() {
  const Demo = dynamic(() => import("components/Home"), {
    ssr: false,
  });

  return (
    <>
      <Demo />
    </>
  );
}
