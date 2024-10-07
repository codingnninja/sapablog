export async function Publish() {
  const { default: matter} = await import(blog.links.matter);
  const { matchPreTags, replacePreTags} = await import(blog.links.htmlParsers);

  const markdownInput = $select("#markdown-input");
  const frontmatterPattern = /^---\s*([\s\S]*?)\s*---/;

  if (!frontmatterPattern.test(markdownInput.value)) {
    const errString =
    "A proper Markdown string with frontmatter is expected";
    $select(`#editor-notif[add|textContent=${errString}]`);
    return "";
  }

  const parsed = matter(markdownInput.value);
  const codeBlocks = await matchPreTags(parsed);
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

  blog.startPrivateAuth();
    blog.createOrUpdateData(jsonOutput);
  blog.endPrivateAuth();
  return "";
}