// headings trigger a new slide
// headings with a caret (e.g., '##^ foo`) trigger a new vertical slide
module.exports = (markdown, options) => {
  return new Promise((resolve, reject) => {
      const regexp = /^\[(image-\d+)\]:\t(http.*)/gm
      let result = regexp.exec(markdown);
      while(result != null) {
          markdown = markdown.replace("![][" + result[1] + "]", "![](" + result[2] + ")")
          result = regexp.exec(markdown);
      }
      return resolve(
      markdown
        .split('\n')
        .map((line, index) => {
          return line
              .replace('<!-- n -->', '\n\nNote: ')
              .replace('<!-- ნ -->', 'Note: ')
              .replace(/^## /, '\n---\n# ')
              .replace(/^### /, '\n----\n## ')
              .replace(/^#### /, '\n----\n### ')
          // if (!/^#/.test(line) || index === 0) return line;
          // const is_vertical = /#\^/.test(line);
          // return (is_vertical ? '\n----\n\n' : '\n---\n\n') + line.replace('#^', '#');
        })
        .join('\n')
    );
  });
};
