import { StartClient } from "@tanstack/react-start";
import { hydrateRoot } from "react-dom/client";

import { createRouter } from "./router";

const router = createRouter();

const Client = () => {
  return <StartClient router={router} />;
};

hydrateRoot(document, <Client />);

export default Client;
