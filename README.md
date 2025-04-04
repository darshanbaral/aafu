# aafu Theme

**aafu** is a modern, responsive portfolio and blog theme built with [Hugo](https://gohugo.io/) and powered by [Tailwind CSS 4.x](https://tailwindcss.com/).

## 🌍 Live Demo

Experience the theme in action: [aafu.pages.dev](https://aafu.pages.dev/)

---

## 🚀 Installation

### Development Setup

To set up the theme locally for development:

```sh
# Clone the repository
git clone https://github.com/darshanbaral/aafu.git
cd aafu

# Install dependencies
npm install

# Start the development server
hugo server
```

### Deployment

This theme supports search functionality using [Pagefind](https://pagefind.app/). Before deploying, index your content using the following command:

```sh
hugo && npx -y pagefind --site public
```

---

## 🔧 Getting Started

After cloning the repository, customize the theme by modifying the configuration file.

### Configuration (`config.yaml`)

The main configuration file is [`config.yaml`](https://github.com/darshanbaral/aafu/blob/master/config.yaml). Update it according to your preferences.

Key customization options:

- Define which sections appear in the accordion.
- Control the order of sections.
- Choose which section should be expanded by default.

### Customize Profile Image

Replace `profile.jpg` in `static/images` with your own profile picture.

### Theme Modes

The `aafu` theme supports multiple color modes:

- **Light Mode** (`light`)
- **Dark Mode** (`dark`)
- **Auto Mode** (`null` - adjusts based on user’s device settings)

To configure the theme mode, modify the `params.theme.mainTheme` attribute in `config.yaml`.

---

## 🐞 Reporting Issues & Feature Requests

If you encounter any bugs or have feature suggestions, please [open an issue](https://github.com/darshanbaral/aafu/issues/new).

---

Enjoy using **aafu**! 🚀

