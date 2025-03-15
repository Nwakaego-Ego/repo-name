export const generateEmbedCode = (code, embedMode) => {
  if (embedMode === "iframe") {
    return `<iframe srcdoc='<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script><script>${code}</script>' width='400' height='400'></iframe>`;
  } else {
    return `<div id='mySketch'></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
<script>
  let sketch = function(p) {
    p.setup = function() {
      p.createCanvas(400, 400);
      p.background(220);
    };
    ${code}
  };
  new p5(sketch, "mySketch");
</script>`;
  }
};
