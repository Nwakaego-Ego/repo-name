import { useState } from "react";

const EmbedGenerator = ({ code }) => {
  const [mode, setMode] = useState("instance"); // "global" or "instance"

  // Global Mode: Uses standard p5.js global functions
  const globalCode = `<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
<script>
${code}
</script>`;

  // Instance Mode: Wraps user code in p5.js instance mode
  const instanceCode = `<div id="mySketch"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
<script>
  let sketch = function(p) {
    ${convertToInstanceMode(code)}
  };

  new p5(sketch, "mySketch");
</script>`;

  return (
    <div className="border p-4 mt-4">
      <h2 className="text-lg font-semibold">Choose Embedding Mode</h2>
      <label>
        <input
          type="radio"
          value="instance"
          checked={mode === "instance"}
          onChange={() => setMode("instance")}
        />
        Instance Mode (Recommended)
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="global"
          checked={mode === "global"}
          onChange={() => setMode("global")}
        />
        Global Mode (Simpler)
      </label>
      <br />
      <h3 className="font-semibold mt-2">Generated Embed Code</h3>
      <textarea
        readOnly
        value={mode === "instance" ? instanceCode : globalCode}
        rows="10"
        cols="50"
        className="w-full p-2 border"
      />
    </div>
  );
};

const convertToInstanceMode = (code) => {
  return (
    code
      .replace(/\bfunction\s+setup\s*\(\)/, "p.setup = function()") // Convert setup()
      .replace(/\bfunction\s+draw\s*\(\)/, "p.draw = function()") // Convert draw()
      .replace(/\bcreateCanvas\b/g, "p.createCanvas") // Prefix p5 functions with p.
      .replace(/\bbackground\b/g, "p.background")
      .replace(/\bellipse\b/g, "p.ellipse")
      .replace(/\bfill\b/g, "p.fill")
      .replace(/\bwidth\b/g, "p.width")
      .replace(/\bheight\b/g, "p.height")
      // Only replace global variables (not local ones inside functions)
      .replace(/\blet\s+(\w+)\s*=/g, (match, varName) => {
        return `p.${varName} =`;
      })
      // Ensure function-scoped variables remain unchanged
      .replace(
        /p\.(setup|draw)\s*=\s*function\(\)\s*{([^}]+)}/g,
        (match, fnName, fnBody) => {
          return `p.${fnName} = function() {${fnBody.replace(
            /\bp\.(\w+)\b/g,
            "$1"
          )}}`;
        }
      )
  );
};

// Helper function to convert global mode code to instance mode
// const convertToInstanceMode = (code) => {
//   return code
//     .replace(/\bfunction\s+setup\s*\(\)/, "p.setup = function()") // Convert setup()
//     .replace(/\bfunction\s+draw\s*\(\)/, "p.draw = function()") // Convert draw()
//     .replace(/\bcreateCanvas\b/g, "p.createCanvas") // Prefix p5 functions with p.
//     .replace(/\bbackground\b/g, "p.background")
//     .replace(/\bellipse\b/g, "p.ellipse")
//     .replace(/\bfill\b/g, "p.fill")
//     .replace(/\bwidth\b/g, "p.width")
//     .replace(/\bheight\b/g, "p.height")
//     .replace(/\blet\s+(\w+)\s*=/g, "p.$1 ="); // Convert global variables to instance mode
// };

export default EmbedGenerator;
