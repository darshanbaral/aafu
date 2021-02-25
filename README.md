# aafu Theme

The aafu Theme is a responsive portfolio with blog.

## Live Demo
[Click here](https://aafudemo.netlify.com/) for live demo.

## Installation

Inside the folder of your Hugo site run:

    $ cd themes
    $ git clone https://github.com/darshanbaral/aafu.git

For more information read the official [setup guide](//gohugo.io/overview/installing/) of Hugo.

## Getting started

After installing the aafu Theme successfully, modify the `config.toml` as you wish to generate your online resume.

### The config file

You'll find a file called [`config.toml`](//github.com/darshanbaral/aafu/blob/master/exampleSite/config.toml). Copy the `config.toml`to the root folder of your Hugo site and customize it per your need.

Note that the sections to be displayed in the accordion, the order of the sections, and the section that should be expanded at the beginning can be specifed in the `config.toml`.

### Add your photo

Go to `static/images` and replace the `profile.jpg` with your own file.

### Theme Colors

The `aafu` theme provides four different theme colors - `light`, `dark`, `ocean`, and `pinkish`. These can be specified in the `config.toml`

```
    [params.theme]
        # Available themes are 'light', 'dark', `ocean`, and 'pinkish'
        mainTheme = "light"
```    

## Reporting Issues

If you have discovered a bug or have a feature request, [create an issue](https://github.com/darshanbaral/aafu/issues/new).
