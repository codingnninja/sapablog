export async function matchPreTags(parsed) { 
    const { codeToHtml } = await import(blog.links.shiki);
    const { transformerRenderWhitespace } = await import(blog.links.spaceTransformer);
    const parser = new DOMParser();
    const htmlString = marked.parse(parsed.body);
    const doc = parser.parseFromString(htmlString, "text/html");
    const preTags = doc.querySelectorAll("pre");

    // Return the Promise
    return Promise.all(
      Array.from(preTags).map((pre) => {
        const codeElement = pre.querySelector("code");
        return codeToHtml(codeElement.innerText, {
          lang: parsed.frontmatter.lang ? parsed.frontmatter.lang : "js",
          theme: parsed.frontmatter.theme ? parsed.frontmatter.theme : "rose-pine",
          transformers: [transformerRenderWhitespace()],
        });
      })
    );
  }

  export function replacePreTags(htmlString, preTagsArray) {
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