  export function Publish(){
    const markdownInput = $select('#markdown-input');
    const output = $select("#json-output");

    // Uncomment this if you want to use onclick
    /* if(markdownInput && markdownInput.value === "") {
      $select('#editor-notif[add|textContent=An empty post can\'t be submitted]');
      return "";
    } */

    const parsed = blog.matter(markdownInput.value); 
    const htmlOutput = marked.parse(parsed.body);

    const jsonOutput = {
      frontmatter: parsed.attributes && parsed.attributes,
      html: htmlOutput,
      metadata: {
        wordCount: parsed.body.split(/\s+/).length,
        paragraphCount: parsed.body.split(/\n/).length,
        readTime: Math.ceil(parsed.body.split(/\s+/).length / 250),
        characterCount: parsed.body.length
      }
    };

    blog.startPrivateAuth();
      blog.createOrUpdateData(jsonOutput);
    blog.endPrivateAuth();
    blog.resetTokenInBrowser();
    return "";
  }