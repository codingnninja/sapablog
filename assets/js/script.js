import { Articles } from './components/Articles.js';
import { Blog } from './components/Blog.js';
import { Header } from './components/Header.js';
import { Profile } from './components/Profile.js';
import { PostEditor } from './components/PostEditor.js';
import { Publish } from './components/Publish.js';
import { formToJSON } from './utils/formToJson.js';

import { Octokit } from "https://cdn.jsdelivr.net/npm/@octokit/rest@20.0.1/+esm";
import {
  auth,
  loadData,
  createOrUpdateData,
  startPrivateAuth,
  endPrivateAuth,
  resetTokenInBrowser
} from "./lib/sapabase@01.0.5.min.js";

import {
  $render,
  $register,
  $select,
} from "./lib/render@0.0.19.min.js";

import matter from 'https://cdn.jsdelivr.net/npm/front-matter@4.0.2/+esm'
import { transformerRenderWhitespace } from "https://cdn.jsdelivr.net/npm/@shikijs/transformers@1.21.0/+esm";
import { codeToHtml } from 'https://esm.sh/shiki@1.0.0';


marked.setOptions({
  gfm: true,
});

const blog = {
  loadData,
  createOrUpdateData,
  matter,
  startPrivateAuth,
  endPrivateAuth,
  resetTokenInBrowser,
  codeToHtml,
  transformerRenderWhitespace,
  formToJSON,
};

globalThis["blog"] = blog;

/* Public authentication and loading of data */
auth({
  username: "codingnninja",
  reponame: "bloguard",
  folder: "user",
  Octokit,
  token:'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'
});

$register(Blog, Articles, Profile, PostEditor, Publish, Header);
$render(Blog);

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



