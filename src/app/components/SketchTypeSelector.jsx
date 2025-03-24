const SketchTypeSelector = ({ sketchType, setSketchType }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Sketch Type:</label>
      <select
        className="p-2 border"
        value={sketchType}
        onChange={(e) => setSketchType(e.target.value)}
      >
        <option value="2D">2D</option>
        <option value="3D">3D</option>
        <option value="Sound">Sound</option>
        <option value="Video">Video</option>
        <option value="DOM">DOM</option>
        <option value="Multiple">Multiple Sketches</option>
      </select>
    </div>
  );
};

export default SketchTypeSelector;
