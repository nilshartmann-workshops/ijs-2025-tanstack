import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

export default function DevtoolsPanel() {
  return (
    <TanStackDevtools
      config={{
        position: "bottom-right",
      }}
      plugins={[
        // {
        //   name: "Tanstack Router",
        //   render: <TanStackRouterDevtoolsPanel />,
        // },
        {
          name: "Tanstack Query",
          render: <ReactQueryDevtoolsPanel />,
        },
      ]}
    />
  );
}
