import useWebSocket from "@/hooks/useWebSocket";
import { Button } from "./ui/button";

export default function TopBar() {
  const { status, reconnect } = useWebSocket();

  const Connected = () => {
    return (
      <span className=" bg-green-500 rounded-2xl py-1 px-3 text-sm">
        Connected
      </span>
    );
  };

  const Connecting = () => {
    return (
      <span className=" bg-orange-500 rounded-2xl py-1 px-3 text-sm">
        Connecting...
      </span>
    );
  };

  const Disconnected = () => {
    return (
      <span className=" bg-red-500 rounded-2xl py-1 px-3 text-sm">
        Disconnected
      </span>
    );
  };
  return (
    <div className="fixed top-0 left-0 right-0 bg-primary text-secondary p-2 text-center z-10">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-bold">Messaging App</h1>
        <div className="flex flex-row gap-1 items-center">
          <p>Status:</p>
          {status == "disconnected" ? (
            <Button onClick={reconnect} className="cursor-pointer">
              <Disconnected />
            </Button>
          ) : status == "connecting" ? (
            <Connecting />
          ) : (
            <Connected />
          )}
        </div>
      </div>
    </div>
  );
}
