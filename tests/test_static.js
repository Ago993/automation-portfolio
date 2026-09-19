const assert=require("assert");
const fs=require("fs");
const path=require("path");

const root=path.join(__dirname,"..");
const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
const app=fs.readFileSync(path.join(root,"app.js"),"utf8");
const css=fs.readFileSync(path.join(root,"styles.css"),"utf8");

assert.ok(/Content-Security-Policy/.test(html));
assert.ok(/script-src 'self'/.test(html));
assert.ok(/object-src 'none'/.test(html));

const ids=[...html.matchAll(/id="([^"]+)"/g)].map(x=>x[1]);
assert.equal(new Set(ids).size,ids.length,"Duplicate HTML ids found");

for(const url of [
  "https://ago993.github.io/quoteflow-demo/",
  "https://ago993.github.io/reportflow-demo/",
  "https://ago993.github.io/listinodiff-demo/",
  "https://ago993.github.io/importflow-demo/",
  "https://ago993.github.io/reconcileflow-demo/"
]) assert.ok(html.includes(url),url+" missing");

const external=[...html.matchAll(/<a[^>]+target="_blank"[^>]*>/g)].map(x=>x[0]);
assert.ok(external.length>=5);
external.forEach(tag=>assert.ok(/rel="[^"]*noreferrer/.test(tag),"Missing noreferrer: "+tag));

assert.ok(!/innerHTML|outerHTML|insertAdjacentHTML|document\.write|\beval\s*\(|new Function/.test(app));
assert.ok(app.includes("prefers-reduced-motion"));
assert.ok(css.includes("@media(prefers-reduced-motion:reduce)"));
assert.ok(css.includes("@media(max-width:600px)"));
assert.ok(html.includes('id="heroStage"'));
assert.ok(html.includes('id="showcaseStage"'));
assert.ok(html.includes('id="copyBriefBtn"'));
assert.ok(html.includes("<strong>5</strong><span>demo live</span>"));
assert.equal((html.match(/class="project-tab(?: |")/g)||[]).length,5);
assert.equal((html.match(/class="project-slide(?: |")/g)||[]).length,5);

const servicePage="https://www.linkedin.com/services/page/400b8534729aa38235/";
const linkedinProfile="https://www.linkedin.com/in/agostino-piccolella-7766a31bb/";
assert.ok(html.includes(servicePage),"LinkedIn Service Page link missing");
assert.ok(html.includes(linkedinProfile),"LinkedIn profile link missing");
assert.ok(css.includes("overflow-x:clip"),"Horizontal overflow clipping missing");
assert.ok(css.includes("touch-action:pan-y"),"Vertical-only touch panning safeguard missing");
assert.ok(css.includes(".ambient{display:none}"),"Mobile ambient overflow safeguard missing");
assert.ok(css.includes(".hero-visual{overflow:hidden"),"Mobile 3D hero clipping missing");

console.log("OK - portfolio static/security/mobile tests passed");
