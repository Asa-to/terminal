import type { V2_MetaFunction } from "@remix-run/node";
import { Terminal } from "~/component/terminal";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="w-screen my-auto h-screen">
      <Terminal userName="asato" />
    </div>
  );
}
