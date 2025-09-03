import useWebSocket from "@/hooks/useWebSocket";

export default function TopBar() {
  const { isConnected } = useWebSocket();
  return (
    <div className="fixed top-0 left-0 right-0 bg-primary text-secondary p-2 text-center z-10">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-bold">Messaging App</h1>
        {isConnected ? (
          <div className="flex flex-row gap-1">
            <p>Status:</p>
            <span className=" bg-green-500 rounded-2xl py-1 px-3 text-sm">
              Connected
            </span>
          </div>
        ) : (
          <div className="flex flex-row gap-1">
            <p>Status:</p>
            <span className=" bg-red-500 rounded-2xl py-1 px-3 text-sm">
              Disconnected
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
