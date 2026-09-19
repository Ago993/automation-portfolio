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
  "https://ago993.github.io/listinodiff-demo/"
]) assert.ok(html.includes(url),url+" missing");

const external=[...html.matchAll(/<a[^>]+target="_blank"[^>]*>/g)].map(x=>x[0]);
assert.ok(external.length>=4);
external.forEach(tag=>assert.ok(/rel="[^"]*noreferrer/.test(tag),"Missing noreferrer: "+tag));

assert.ok(!/innerHTML|outerHTML|insertAdjacentHTML|document\.write|\beval\s*\(|new Function/.test(app));
assert.ok(app.includes("prefers-reduced-motion"));
assert.ok(css.includes("@media(prefers-reduced-motion:reduce)"));
assert.ok(css.includes("@media(max-width:600px)"));
assert.ok(html.includes('id="heroStage"'));
assert.ok(html.includes('id="showcaseStage"'));
assert.ok(html.includes('id="copyBriefBtn"'));

console.log("OK - portfolio static/security tests passed");
