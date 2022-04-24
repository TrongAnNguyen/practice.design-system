const fs = require("fs");
const path = require("path");
const sass = require("node-sass");

const getComponents = () => {
  let allComponents = [];
  const componentTypes = ["atoms", "molecules", "organisms"];
  componentTypes.forEach((type) => {
    const allFiles = fs.readdirSync(`src/${type}`).map((file) => ({
      input: `src/${type}/${file}`,
      output: `src/lib/${file.slice(0, -4) + "css"}`,
    }));
    allComponents = allComponents.concat(allFiles);
  });

  return allComponents;
};

getComponents();
const compile = (pathName, fileName) => {
  const result = sass.renderSync({
    data: fs.readFileSync(path.resolve(pathName)).toString(),
    outputStyle: "expanded",
    outFile: "global.css",
    includePaths: [path.resolve("src")],
  });
  fs.writeFileSync(path.resolve(fileName), result.css.toString());
};

compile("src/global.scss", "src/lib/global.css");
getComponents().forEach(({ input, output }) => compile(input, output));
