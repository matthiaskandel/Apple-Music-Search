# Search in Apple Music

A Safari extension that adds a context menu option to search selected text in the **Apple Music desktop app** (not the web version).

Perfect for when you're reading album reviews, music blogs, or any web content and want to quickly find artists, albums, or tracks in your Apple Music app.

## Features

- 🎵 Right-click any selected text and choose "Search in Apple Music"
- 🚀 Opens directly in the Apple Music desktop app (not web)
- ✨ Clean, simple, and fast
- 🎨 Beautiful loading screen while opening the app

## Screenshots

When you select text (like an artist name or album) and right-click:

```
[Your selected text] → Right-click → "Search in Apple Music" → Opens in Music.app
```

## Installation

### Prerequisites

- macOS with Safari 14 or later
- Apple Music desktop app installed

### Steps

1. **Clone or download this repository**

   ```bash
   git clone https://github.com/yourusername/Apple-Music-Search.git
   cd Apple-Music-Search
   ```

2. **Generate the icon files (optional but recommended)**

   Choose one of these methods:

   **Method A: Using Homebrew (recommended)**
   ```bash
   brew install librsvg
   cd icons
   ./generate-pngs.sh
   ```

   **Method B: Online converter**
   - Go to https://cloudconvert.com/svg-to-png
   - Upload `icons/icon.svg`
   - Convert to PNG at sizes: 48x48, 96x96, and 128x128
   - Save as `icon-48.png`, `icon-96.png`, and `icon-128.png` in the `icons` folder

   **Method C: Skip for now**
   - The extension will work without icons during development/testing

3. **Enable Safari extension development**

   - Open Safari
   - Go to Safari → Preferences → Advanced
   - Check "Show Develop menu in menu bar"

4. **Load the extension**

   - In Safari, go to Develop → Allow Unsigned Extensions (you'll need to do this each time you restart Safari)
   - Go to Safari → Preferences → Extensions
   - Click the "+" button in the bottom left
   - Navigate to the folder containing this extension and select it
   - Enable the "Search in Apple Music" extension

   **Alternative method using xcrun** (for Safari 17+):
   ```bash
   xcrun safari-web-extension-converter /path/to/Apple-Music-Search
   ```
   This will create an Xcode project that you can build and run.

5. **Grant permissions**

   - When prompted, grant the extension permission to run on websites
   - You can configure this per-site or allow on all websites

## Usage

1. Browse to any website in Safari
2. Select any text (artist name, album title, song name, etc.)
3. Right-click (or Control+click) on the selected text
4. Choose "Search in Apple Music" from the context menu
5. The Apple Music desktop app will open with search results

## How It Works

The extension uses:
- **Context Menus API**: Adds the right-click menu option
- **Apple Music URL Scheme**: Opens the Music app using `music://search?term=<query>`
- **Service Worker**: Background script that handles the menu clicks
- **Temporary tab**: Creates a brief redirect page that triggers the Music app and then closes

## Development

### Project Structure

```
Apple-Music-Search/
├── manifest.json           # Extension configuration
├── background.js           # Context menu handler and search logic
├── icons/                  # Extension icons
│   ├── icon.svg           # Source SVG icon
│   ├── icon-48.png        # 48x48 PNG icon
│   ├── icon-96.png        # 96x96 PNG icon
│   ├── icon-128.png       # 128x128 PNG icon
│   └── generate-pngs.sh   # Script to generate PNGs from SVG
├── scripts/
│   └── generate-icons.js  # Node.js icon generation helper
└── package.json           # NPM configuration
```

### Modifying the Extension

1. Make changes to `background.js` or `manifest.json`
2. In Safari, go to Develop → Reload All Extensions
3. Test your changes

### Debugging

- Open Safari → Develop → Web Extension Background Pages → Search in Apple Music
- This opens the console for the extension's background script
- Use `console.log()` in `background.js` to debug

## Customization

### Change the menu item text

Edit `background.js`, line 5:
```javascript
title: "Search in Apple Music",  // Change this to your preferred text
```

### Adjust the loading screen

Edit the `redirectHtml` variable in `background.js` to customize:
- Colors and styling (CSS section)
- Displayed message
- Auto-close timing (currently 2 seconds)

### Search in a different app

Replace the `musicUrl` in `background.js`:
```javascript
const musicUrl = `music://search?term=${searchQuery}`;  // Change to another URL scheme
```

Other music app URL schemes:
- Spotify: `spotify:search:${searchQuery}`
- YouTube Music: `https://music.youtube.com/search?q=${searchQuery}`

## Troubleshooting

### Extension doesn't appear in Safari

- Make sure you've enabled "Allow Unsigned Extensions" in the Develop menu
- Check that the extension is enabled in Safari → Preferences → Extensions
- Try restarting Safari

### Music app doesn't open

- Verify that the Music app is installed (it comes pre-installed on macOS)
- Check that the app isn't restricted by security settings
- Try clicking the "click here" link in the loading screen

### Context menu doesn't show

- Make sure you've selected some text first
- Check that the extension has permission for the current website
- Look for errors in the extension console (Develop → Web Extension Background Pages)

## Privacy

This extension:
- ✅ Only activates when you explicitly use the context menu
- ✅ Only accesses text you've selected
- ✅ Does not collect, store, or transmit any data
- ✅ Runs entirely locally on your device
- ✅ Does not require any external servers or APIs

## License

MIT License - feel free to modify and distribute as you wish.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## Acknowledgments

Built for music lovers who want seamless integration between web browsing and Apple Music.

---

**Note**: This extension is not affiliated with or endorsed by Apple Inc. Apple Music and Safari are trademarks of Apple Inc.
