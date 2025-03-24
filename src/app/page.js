"use client";
import { useState, useEffect } from "react";
import Editor from "./components/Editor";
import Preview from "./components/preview/preview";
import Controls from "./components/controls/controls";
import EmbedOptions from "./components/EmbedOptions";
import ErrorBoundary from "./components/ErrorBoundary";
import { generateEmbedCode } from "./utils/generateEmbedCode";
import EmbedGenerator from "./components/EmbedGenerator";
import SketchTypeSelector from "./components/SketchTypeSelector";

const Page = () => {
  const [code, setCode] = useState("");
  const [playMode, setPlayMode] = useState("Stop");
  const [shouldRun, setShouldRun] = useState(false);
  const [embedMode, setEmbedMode] = useState("iframe");
  const [sketchType, setSketchType] = useState("2D");
  const [editable, setEditable] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCode = localStorage.getItem("savedCode") || "";
      setCode(storedCode);
    }
  }, []);

  const handlePlayMode = (mode) => {
    setPlayMode(mode);
    setShouldRun(mode === "Play" || mode === "Autoplay");
  };

  return (
    <ErrorBoundary>
      <div className="p-4">
        <h1 className="text-red-600 text-2xl mb-4">p5.js Sketch Embedder</h1>
        <SketchTypeSelector
          sketchType={sketchType}
          setSketchType={setSketchType}
        />
        <Editor code={code} setCode={setCode} editable={editable} />
        <Controls playMode={playMode} setPlayMode={handlePlayMode} />
        <EmbedOptions embedMode={embedMode} setEmbedMode={setEmbedMode} />
        <Preview
          code={shouldRun ? code : ""}
          embedMode={embedMode}
          sketchType={sketchType}
        />
        <EmbedGenerator code={code} />
        <div className="mt-4">
          <label className="block mb-2 font-semibold">Editable Code:</label>
          <input
            type="checkbox"
            checked={editable}
            onChange={() => setEditable(!editable)}
            className="mr-2"
          />
          Enable Editing
        </div>
        <textarea
          readOnly
          value={generateEmbedCode(code, embedMode)}
          className="w-full mt-4 p-2 border"
        />
      </div>
    </ErrorBoundary>
  );
};

export default Page;

// "use client";
// import { useState, useEffect } from "react";
// import Editor from "./components/editor";
// import Preview from "./components/preview/preview";
// import Controls from "./components/controls/controls";
// import EmbedOptions from "./components/EmbedOptions";
// import ErrorBoundary from "./components/ErrorBoundary";
// import { generateEmbedCode } from "./utils/generateEmbedCode";
// import EmbedGenerator from "./components/EmbedGenerator";

// const Page = () => {
//   const [code, setCode] = useState("");
//   const [playMode, setPlayMode] = useState("Stop");
//   const [shouldRun, setShouldRun] = useState(false);
//   const [embedMode, setEmbedMode] = useState("iframe");

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedCode = localStorage.getItem("savedCode") || "";
//       setCode(storedCode);
//     }
//   }, []);

//   const handlePlayMode = (mode) => {
//     setPlayMode(mode);
//     setShouldRun(mode === "Play" || mode === "Autoplay");
//   };

//   return (
//     <ErrorBoundary>
//       <div className="p-4">
//         <h1 className="text-red-600 text-2xl mb-4">p5.js Sketch Embedder</h1>
//         <Editor code={code} setCode={setCode} />
//         <Controls playMode={playMode} setPlayMode={handlePlayMode} />
//         <EmbedOptions embedMode={embedMode} setEmbedMode={setEmbedMode} />
//         <Preview code={shouldRun ? code : ""} embedMode={embedMode} />
//         <EmbedGenerator code={code} />
//         <textarea
//           readOnly
//           value={generateEmbedCode(code, embedMode)}
//           className="w-full mt-4 p-2 border"
//         />
//       </div>
//     </ErrorBoundary>
//   );
// };

// export default Page;
