# Sapablog

Quickly create your own blog with just Github and JavaScript.

## Set up sapabase.js

Sapabase is already set up. You only need to edit the following in `script.js`.

```js
auth({
  username: "your-github-username",
  reponame: "your-blog-repository",
  folder: "article",
  Octokit,
});
```

Check [Sapabase docs]() for more inforamtion.

- Get github token

You will be asked to enter your github token whenever you want to post an articles. Click [get github token](https://github.com/settings/tokens) and follow the image below to set it up.

![token generation demo](assets/media/images/sapablog%20token%20generation%20demo.gif)

## Install vscode extension

- Install `leet-html` for syntax highlighting.
- Install `Auto complete tag` to automatically add close tag and rename paired tag.
