export function ReadMore({status, articleId, action}){
  $select(
    `#article-${articleId}>.content[${action}|class=truncate-multiline]`
  );

  const props = {
    status: !status, 
    articleId, 
    action: status ? 'add' : 'remove'
  };

  return `
    <div id="read-more-${articleId}">
      <small class="cursor-pointer" onclick="$render(ReadMore, ${props})"> ${status ? 'show less ←' : 'read more →'}</small>  
    </div>
  `;
}
