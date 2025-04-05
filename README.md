# aafu Theme

**aafu** is a modern, responsive portfolio and blog theme built with [Hugo](https://gohugo.io/) and powered by [Tailwind CSS 4.x](https://tailwindcss.com/).

## 🌍 Live Demo

Experience the theme in action: [aafu.pages.dev](https://aafu.pages.dev/)

## 🚀 Installation

### 🧪 Local Development

#### Option 1: Standalone Project

The repository functions as a complete Hugo site out of the box. To run it locally:

```sh
# Clone the repository
git clone https://github.com/darshanbaral/aafu.git
cd aafu

# Install dependencies
npm install

# Start the development server
hugo server
```

#### Option 2: Use as a Hugo Theme

To use `aafu` as a theme within your own Hugo project:

1. Add the theme:

   ```bash
   git submodule add https://github.com/darshanbaral/aafu.git themes/aafu
   ```

2. Copy the following files/folders from `aafu/` to your project root:

   - Files:
     - `config.yaml`
     - `package.json`
     - `tailwind.config.js`
   - Folders:
     - `assets/`
     - `static/`

    The project structure should look something like:

    ```
    your-hugo-project/
    ├── config.yaml
    ├── package.json
    ├── tailwind.config.js    
    ├── assets/
    ├── content/
    ├── static/
    ├── themes/
    │   └── aafu/
    ```

3. Enable the theme by setting the theme in `config.yaml`:

   ```yaml
   theme: aafu
   ```

4. Install dependencies and start development server:

   ```bash
   npm install
   hugo server
   ```

### 🔧 Getting Started

#### Configuration (`config.yaml`)

Customize the theme by modifying the [`config.yaml`](https://github.com/darshanbaral/aafu/blob/master/config.yaml).

Key customization options:

- Define which sections appear in the accordion.
- Control the order of sections.
- Choose which section should be expanded by default.

#### Profile Image

Replace `profile.jpg` in `static/images` with your own profile picture.

#### Theme Modes

To configure the theme mode, modify the `params.theme.mainTheme` attribute in `config.yaml`.

- **Light Mode** (`light`)
- **Dark Mode** (`dark`)
- **Auto Mode** (`null` - adjusts based on user’s device settings)

### 📦 Deployment

This theme supports search functionality using [Pagefind](https://pagefind.app/). Before deploying, index your content using the following command:

```sh
hugo && npx -y pagefind --site public
```

## 🐞 Reporting Issues & Feature Requests

If you encounter any bugs or have feature suggestions, please [open an issue](https://github.com/darshanbaral/aafu/issues/new).

---

Enjoy using **aafu**! 🚀
