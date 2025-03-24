import { useState } from "react";
import { generateEmbedCode } from "../utils/embedUtils";

const EmbedGenerator = ({ code }) => {
  const [mode, setMode] = useState("instance"); // "global" or "instance"
  const [copied, setCopied] = useState(false);

  const embedCode = generateEmbedCode(code, mode);

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        value={embedCode}
        rows="10"
        cols="50"
        className="w-full p-2 border"
      />
      <button
        className="mt-2 p-2 bg-blue-500 text-white rounded"
        onClick={handleCopy}
      >
        {copied ? "Copied!" : "Copy Code"}
      </button>
    </div>
  );
};

export default EmbedGenerator;

// import { useState } from "react";

// const EmbedGenerator = ({ code }) => {
//   const [mode, setMode] = useState("instance"); // "global" or "instance"
//   const [copied, setCopied] = useState(false);

//   // Global Mode: Uses standard p5.js global functions
//   const globalCode = `<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
// <script>
// ${code}
// </script>`;

//   // Instance Mode: Wraps user code in p5.js instance mode
//   const instanceCode = `<div id="mySketch"></div>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
// <script>
//   let sketch = function(p) {
//     ${convertToInstanceMode(code)}
//   };

//   new p5(sketch, "mySketch");
// </script>`;

//   const handleCopy = () => {
//     navigator.clipboard.writeText(
//       mode === "instance" ? instanceCode : globalCode
//     );
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="border p-4 mt-4">
//       <h2 className="text-lg font-semibold">Choose Embedding Mode</h2>
//       <label>
//         <input
//           type="radio"
//           value="instance"
//           checked={mode === "instance"}
//           onChange={() => setMode("instance")}
//         />
//         Instance Mode (Recommended)
//       </label>
//       <br />
//       <label>
//         <input
//           type="radio"
//           value="global"
//           checked={mode === "global"}
//           onChange={() => setMode("global")}
//         />
//         Global Mode (Simpler)
//       </label>
//       <br />
//       <h3 className="font-semibold mt-2">Generated Embed Code</h3>
//       <textarea
//         readOnly
//         value={mode === "instance" ? instanceCode : globalCode}
//         rows="10"
//         cols="50"
//         className="w-full p-2 border"
//       />
//       <button
//         className="mt-2 p-2 bg-blue-500 text-white rounded"
//         onClick={handleCopy}
//       >
//         {copied ? "Copied!" : "Copy Code"}
//       </button>
//     </div>
//   );
// };

// const convertToInstanceMode = (code) => {
//   return code
//     .replace(/\bfunction\s+setup\s*\(\)/, "p.setup = function()")
//     .replace(/\bfunction\s+draw\s*\(\)/, "p.draw = function()")
//     .replace(/\bcreateCanvas\b/g, "p.createCanvas")
//     .replace(/\bbackground\b/g, "p.background")
//     .replace(/\bellipse\b/g, "p.ellipse")
//     .replace(/\bfill\b/g, "p.fill")
//     .replace(/\bwidth\b/g, "p.width")
//     .replace(/\bheight\b/g, "p.height")
//     .replace(/\blet\s+(\w+)\s*=\s*(.*?);/g, "p.$1 = $2;") // Convert global variables to instance mode
//     .replace(/\bvar\s+(\w+)\s*=\s*(.*?);/g, "p.$1 = $2;")
//     .replace(/\bconst\s+(\w+)\s*=\s*(.*?);/g, "p.$1 = $2;");
// };

// export default EmbedGenerator;
