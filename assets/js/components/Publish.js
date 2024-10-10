export async function Publish() {
  const { default: matter} = await import(blog.links.matter);
  const { highlightPreTagsInMarkdown, replacePreTagsInMarkdwon} = await import(blog.links.htmlParsers);

  const markdownInput = $select("#markdown-input");
  const frontmatterPattern = /^---\s*([\s\S]*?)\s*---/;

  if (!frontmatterPattern.test(markdownInput.value)) {
    $select(`#editor-notif[add|textContent=A proper Markdown string with frontmatter is expected]`);
    return "";
  }

  const parsed = matter(markdownInput.value);
  const codeBlocks = await highlightPreTagsInMarkdown(parsed);
  const highlightedHtmlOutput = replacePreTagsInMarkdwon(parsed.body, codeBlocks);
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

  blog.startPrivateAuth();
    blog.createOrUpdateData(jsonOutput);
  blog.endPrivateAuth();
  return "";
}