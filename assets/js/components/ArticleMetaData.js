export function ArticleMetaData({ metadata, date }){
  return `
    <small class="text-gray-300">
    Word Count: ${ metadata.wordCount }, Read Time: ${ metadata.readTime } min, Published on: ${new Date(date).toLocaleDateString()}
    </small>
  `;
}