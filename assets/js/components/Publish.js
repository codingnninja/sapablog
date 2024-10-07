export async function Publish() {

  function matchPreTags(parsed, blog) {
    
    const parser = new DOMParser();
    const htmlString = marked.parse(parsed.body);
    const doc = parser.parseFromString(htmlString, "text/html");
    const preTags = doc.querySelectorAll("pre");

    // Return the Promise
    return Promise.all(
      Array.from(preTags).map((pre) => {
        const codeElement = pre.querySelector("code");
        return blog.codeToHtml(codeElement.innerText, {
          lang: parsed.frontmatter.lang ? parsed.frontmatter.lang : "js",
          theme: parsed.frontmatter.theme ? parsed.frontmatter.theme : "rose-pine",
          transformers: [blog.transformerRenderWhitespace()],
        });
      })
    );
  }

  function replacePreTags(htmlString, preTagsArray) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const preTags = doc.querySelectorAll("pre");

    preTags.forEach((pre, index) => {
      if (index < preTagsArray.length) {
        const newPreTag = doc.createElement("div");
        newPreTag.innerHTML = preTagsArray[index];
        pre.replaceWith(newPreTag.firstElementChild);
      }
    });

    return doc.body.innerHTML;
  }

  const markdownInput = $select("#markdown-input");
  const frontmatterPattern = /^---[\s\S]*?---/;
  const errString =
    "A proper Markdown string with frontmatter is expected";

  if (!frontmatterPattern.test(markdownInput.value)) {
    $select(`#editor-notif[add|textContent=${errString}]`);
    return "";
  }

  const parsed = blog.matter(markdownInput.value);
  const codeBlocks = await matchPreTags(parsed, blog);
  const highlightedHtmlOutput = replacePreTags(parsed.body, codeBlocks);

  const jsonOutput = {
    frontmatter: parsed.attributes && parsed.attributes,
    html: highlightedHtmlOutput,
    metadata: {
      wordCount: parsed.body.split(/\s+/).length,
      paragraphCount: parsed.body.split(/\n/).length,
      readTime: Math.ceil(parsed.body.split(/\s+/).length / 250),
      characterCount: parsed.body.length,
    },
  };

  blog.createOrUpdateData(jsonOutput);
  return "";
}