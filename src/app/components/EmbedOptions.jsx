const EmbedOptions = ({ embedMode, setEmbedMode }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Embed Mode:</label>
      <select
        className="p-2 border"
        value={embedMode}
        onChange={(e) => setEmbedMode(e.target.value)}
      >
        <option value="iframe">Iframe</option>
        <option value="script">Script</option>
      </select>
    </div>
  );
};

export default EmbedOptions;
