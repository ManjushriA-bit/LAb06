import { useState } from "react";

function App() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");

  function generate() {
    if (idea.trim() === "") return;

    const output = `
Business Model:
This startup is based on "${idea}" and connects users via an online platform.

Key Features:
- Simple UI
- Fast performance
- Easy access

Revenue Model:
- Subscription
- Ads
- Commission
    `;

    setResult(output);
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Startup Idea Generator</h1>

      <input
        type="text"
        placeholder="Enter your idea"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        style={{ padding: "10px", width: "250px" }}
      />

      <br /><br />

      <button onClick={generate} style={{ padding: "10px 20px" }}>
        Generate
      </button>

      <pre style={{ marginTop: "20px", textAlign: "left" }}>
        {result}
      </pre>
    </div>
  );
}

export default App;