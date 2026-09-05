import { useState } from "react";
import { Header } from "./components/Header";
import { Input } from "./components/Input";

function App() {
  const [text, setText] = useState<string>("");

  return (
    <main className="min-h-screen bg-bg text-ink p-4">
      <Header />
      <Input text={text} setText={setText} />
    </main>
  );
}

export default App;
