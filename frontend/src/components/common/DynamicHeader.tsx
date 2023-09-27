import dynamic from "next/dynamic";

const ConnectBtn = dynamic(() => import("./Header"), {
  ssr: false,
});

export const Header = () => {
  return (
    <>
      <ConnectBtn />
    </>
  );
};
