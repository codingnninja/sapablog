import { $render } from "./lib/render@0.0.19.min";

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