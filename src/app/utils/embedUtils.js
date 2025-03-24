export const convertToInstanceMode = (code) => {
  return code
    .replace(/\bfunction\s+setup\s*\(\)/, "p.setup = function()")
    .replace(/\bfunction\s+draw\s*\(\)/, "p.draw = function()")
    .replace(/\bcreateCanvas\b/g, "p.createCanvas")
    .replace(/\bbackground\b/g, "p.background")
    .replace(/\bellipse\b/g, "p.ellipse")
    .replace(/\bfill\b/g, "p.fill")
    .replace(/\bwidth\b/g, "p.width")
    .replace(/\bheight\b/g, "p.height")
    .replace(/\blet\s+(\w+)\s*=\s*(.*?);/g, "p.$1 = $2;")
    .replace(/\bvar\s+(\w+)\s*=\s*(.*?);/g, "p.$1 = $2;")
    .replace(/\bconst\s+(\w+)\s*=\s*(.*?);/g, "p.$1 = $2;");
};

export const generateEmbedCode = (code, embedMode) => {
  if (embedMode === "iframe") {
    return `<iframe srcdoc='<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script><script>${code}</script>' width='400' height='400'></iframe>`;
  } else if (embedMode === "global") {
    return `<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
<script>
${code}
</script>`;
  } else {
    return `<div id='mySketch'></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
<script>
  let sketch = function(p) {
    ${convertToInstanceMode(code)}
  };
  new p5(sketch, "mySketch");
</script>`;
  }
};
