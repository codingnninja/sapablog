page('/', () => {
  $render(Blog);
});
page('/blog', () => {
  $render(Profile);
});
page('/publish', () => {
  $render(PostEditor);
})

page();