# 📝 AI README Generator

Struggling to write compelling READMEs? This AI-powered tool analyzes your GitHub repository, automatically suggests content, and provides an intuitive drag-and-drop editor to build a professional README.md. Create beautiful, comprehensive documentation in a fraction of the time and get your project the attention it deserves.

![License](https://img.shields.io/badge/License-MIT-green)

- 🤖 **AI-Powered Content**: Leverages Google's Generative AI to automatically draft sections like descriptions, features, and usage instructions based on your code.
- 🔗 **Direct GitHub Integration**: Simply pick your repository, and the tool analyzes your `package.json` and file structure to bootstrap your README.
- 🖐️ **Interactive Drag & Drop Editor**: Effortlessly reorder, edit, and customize every section of your README with a slick, sortable interface built with `@dnd-kit`.
- ⚡ **Live Markdown Preview**: See your Markdown rendered in real-time as you build, including complex elements like Mermaid diagrams.
- 🎨 **Modern & Fast UI**: Built with React 19, Vite, and Tailwind CSS for a blazing-fast and beautiful user experience, enhanced with Framer Motion animations.
- 📤 **One-Click Export**: Generate and copy the final Markdown or download the `.md` file with a single click.

- ⚛️ **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion
- 🧠 **AI & Services**: Google Generative AI (Gemini), Firebase
- 🧩 **Core Libraries**: @dnd-kit, React Markdown, Mermaid.js, Lucide React

```javascript
## 🛠️ How to Use

Using the deployed application is the easiest way to get started!

1.  🌐 **Visit the Live App**: Navigate to the [deployed application URL](https://misiix9.github.io/readmegenerator).
2.  🔍 **Select a Repository**: Connect your GitHub account and choose the repository you want to generate a README for.
3.  ✨ **Customize**: Use the drag-and-drop interface to reorder sections. Click on any section to edit the AI-generated content.
4.  📋 **Export**: Once you're happy with the result, use the **Export Menu** to copy the raw Markdown to your clipboard or download the `README.md` file directly.
```

This README was made only with this tool.

## 🔐 Firebase + GitHub Auth Setup

This app requires Firebase web config values at build time for GitHub login.

1. Create a Firebase project and add a **Web app**.
2. Copy config values from Firebase Console → **Project settings** → **General** → **Your apps**.
3. Create a local `.env` file from `.env.example` and fill:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
4. In Firebase Console → **Authentication** → **Sign-in method**, enable **GitHub** provider.
5. In GitHub → **Settings** → **Developer settings** → **OAuth Apps**, create an OAuth app and copy Client ID/Secret into Firebase GitHub provider settings.
6. In Firebase Authentication → **Settings** → **Authorized domains**, add your deployment domain.

### GitHub Pages secrets

For GitHub Actions deployment, add these repository secrets with the same names:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
