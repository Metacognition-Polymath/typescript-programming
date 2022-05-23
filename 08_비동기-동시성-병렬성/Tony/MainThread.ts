import { fork } from "child_process";

const child = fork("./ChildThread.ts");

child.on("message", (data) =>
  console.info("Child process sent a message", data)
);

child.send({ type: "syn", data: [3] });
