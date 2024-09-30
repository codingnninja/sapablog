export function ReadMore({status, articleId}){
  $select(
    `#article-${articleId}>.content[toggle|class=truncate-multiline]`
  );

const props = {status: !status, articleId};

return `
  <div id="read-more-${articleId}">
    <small class="cursor-pointer" onclick="$render(ReadMore, ${props})"> ${status ? 'show less <--' : 'read more -->'}</small>  
  </div>
`;
}
