const fs = require('fs');
const Babel = require('@babel/standalone');

const html = fs.readFileSync('ScoreShield.html', 'utf8');
const match = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);

if (match && match[1]) {
  try {
    Babel.transform(match[1], { presets: ['react'] });
    console.log("No syntax errors found by Babel.");
  } catch (err) {
    console.error("Syntax Error:", err.message);
  }
} else {
  console.log("Could not find script block");
}
