import { useEffect, useState } from "react";
import Bottom from "./components/Bottom";
import MainChat from "./components/MainChat";
import TopBar from "./components/TopBar";
import useStoreMessage from "./stores/message";
import useStoreUser from "./stores/user";
import { Card, CardContent } from "./components/ui/card";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { v4 as uuidv4 } from "uuid";
import useWebSocket from "./hooks/useWebSocket";

export default function App() {
  const { messages, setMessages } = useStoreMessage();
  const { message } = useWebSocket();
  const { currentUser, setCurrentUser } = useStoreUser();
  const [name, setName] = useState<string>("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (message != null) {
      setMessages([...messages, message]);
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();

    if (name) {
      setCurrentUser({
        user_id: uuidv4(),
        user_name: name,
        avatar: "",
        created_at: "",
        updated_at: "",
      });
    } else {
      setErrors("Your name is required.");
    }
  };

  if (currentUser == null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-10">
        <Card className="max-w-lg w-full">
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full gap-3"
            >
              <Label>
                What is your name? <span className="text-red-500">*</span>
              </Label>
              <Input
                name="name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setName(e.currentTarget.value);
                  if (e.currentTarget.value != "") {
                    setErrors("");
                  } else {
                    setErrors("Your name is required.");
                  }
                }}
              />
              {errors && (
                <span className="text-sm font-normal text-red-500">
                  {errors}
                </span>
              )}
              <Button type="submit">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-center h-screen w-full">
      <div className="h-full w-full min-w-[320px]">
        <div className="h-full w-full flex flex-col">
          <TopBar />
          <MainChat />
          <Bottom />
        </div>
      </div>
    </div>
  );
}
