export function ArticleMetaData({ metadata, date }){
  return `
    <small class="text-gray-300">
      ${ metadata.wordCount } words, ${ metadata.readTime } min read, Published on: ${new Date(date).toLocaleDateString()}
    </small>
  `;
}