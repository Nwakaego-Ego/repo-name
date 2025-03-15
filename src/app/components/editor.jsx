const Editor = ({ code, setCode }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Code Editor:</label>
      <textarea
        className="w-full h-60 p-2 border"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    </div>
  );
};

export default Editor;
