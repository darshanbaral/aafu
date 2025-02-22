# aafu Theme

The aafu Theme is a responsive portfolio with blog based on [Tailwind 4.x](https://tailwindcss.com/).

## Demo

[Click here](https://aafu.pages.dev/) for live demo.

## Installation

### Development

```shell
git clone https://github.com/darshanbaral/aafu.git
cd aafu
npm install
hugo server
```

### Deployment

This theme employs earch using [Pagefind](https://pagefind.app/). Run following commands to index content when deploying.

```shell
hugo; npx -y pagefind --site public
```

## Getting started

After cloning the aafu repo, modify the `config.yaml` as you wish.

### The config file

You'll find a file called [`config.yaml`](//github.com/darshanbaral/aafu/blob/master/config.yaml). Customize it per your need.

Note that the sections to be displayed in the accordion, the order of the sections, and the section that should be expanded at the beginning can be specifed in the `config.yaml`.

### Add your photo

Go to `static/images` and replace the `profile.jpg` with your own file.

### Theme Colors

The `aafu` theme can be set to `light`, `dark`, or `null` mode by using `params.theme.mainTheme` attribute. When `null` is chosen, either `light` or `dark` will be chosen based on device settings.

## Reporting Issues

If you have discovered a bug or have a feature request, [create an issue](https://github.com/darshanbaral/aafu/issues/new).
