const Preview = ({ code, embedMode }) => {
  return (
    <div className="border p-4 mt-4">
      <h2 className="text-lg font-semibold mb-2">Preview:</h2>
      {embedMode === "iframe" ? (
        <iframe
          srcDoc={`<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script><script>${code}</script>`}
          width="400"
          height="400"
        ></iframe>
      ) : (
        <div id="mySketch"></div>
      )}
    </div>
  );
};

export default Preview;
