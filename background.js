// Create context menu item when extension is installed or updated
browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: "search-apple-music",
    title: "Search in Apple Music",
    contexts: ["selection"]
  });
});

// Handle context menu clicks
browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "search-apple-music" && info.selectionText) {
    const searchQuery = encodeURIComponent(info.selectionText.trim());

    // Apple Music URL scheme for searching
    // The music:// URL scheme opens the Music app on macOS
    const musicUrl = `music://search?term=${searchQuery}`;

    // Create a data URL that redirects to the music:// scheme
    // This works around Safari's restrictions on opening custom URL schemes
    const redirectHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Opening Apple Music...</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            .container {
              text-align: center;
              padding: 2rem;
            }
            .spinner {
              border: 4px solid rgba(255, 255, 255, 0.3);
              border-radius: 50%;
              border-top: 4px solid white;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
              margin: 0 auto 1rem;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            a {
              color: white;
              text-decoration: underline;
              cursor: pointer;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="spinner"></div>
            <h2>Opening Apple Music...</h2>
            <p>Searching for: <strong>${info.selectionText.trim()}</strong></p>
            <p><small>If the app doesn't open, <a href="${musicUrl}">click here</a></small></p>
          </div>
          <script>
            // Attempt to open the Music app
            window.location.href = "${musicUrl}";

            // Close the tab after a short delay
            setTimeout(() => {
              window.close();
            }, 2000);
          </script>
        </body>
      </html>
    `;

    const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(redirectHtml)}`;

    // Open the redirect page in a new tab
    browser.tabs.create({ url: dataUrl });
  }
});
