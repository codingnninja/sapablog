import { ReadMore } from './ReadMore.js'
import { $register } from '../lib/render@0.0.19.min.js';

export async function Articles() {
  const page = $select(`#article-page`);
  const nextPage = page ? Number(page.value) + 1 : 1;
  const articles = await blog.loadData(nextPage);
  console.log(articles);

  if(page){
    page.value = nextPage; 
  }

  return `
    <input type="hidden" value="${nextPage}" id="article-page">
    <div id="articles" data-append="#articles">
      ${
        !articles.status
          ? articles.map((article) => {
            return `
              <div 
                id="article-${article.id}" 
                class="article mb-4" 
              >
                <h1 class="text-2xl font-bold pt-4 mb-3 break-words">${article.frontmatter.title}</h1>
          
                <div class="tags flex flex-wrap mb-5">
                  ${article.frontmatter.tags
                    .split(',')
                    .map((tag) => `<div class="tag bg-gray-200 py-1 px-3 rounded-full mr-2 mb-2 text-sm">${tag}</div>`)
                    .join('')}
                </div>
                <div class="created_at text-gray-500 mb-2">
                  Published on: ${new Date(article.createdAt).toLocaleDateString()}
                </div>
                <div 
                  class="markdown-body content truncate-multiline overflow-hidden text-ellipsis cursor-pointer" 
                >
                  ${article.html}
                </div>
              </div>
              <ReadMore status="false" articleId=${article.id} />
            `;}).join('') : "<div>No more articles. Check back later.</div>"
      }
    </div>

    <button type="button" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onclick="$render(Articles)">Load more...</button>
  `;
}

$register(ReadMore);