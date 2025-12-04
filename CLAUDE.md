# CLAUDE.md - AI Assistant Guide for Apple-Music-Search

## Project Overview

**Apple-Music-Search** is a macOS utility that enables searching any text (e.g., from Safari) directly in the Apple Music Desktop application. This project aims to provide seamless integration between text selection across the system and Apple Music search functionality.

### Project Status
- **Current State**: Initial repository setup
- **Stage**: Pre-development / Planning
- **Primary Platform**: macOS
- **Target Application**: Apple Music Desktop

---

## Repository Structure

```
Apple-Music-Search/
├── README.md           # Project description
├── CLAUDE.md          # This file - AI assistant guide
└── .git/              # Git version control
```

### Expected Future Structure

As the project develops, the structure will likely evolve to include:

```
Apple-Music-Search/
├── src/               # Source code
│   ├── swift/        # Swift implementation (if native app)
│   ├── js/           # JavaScript/TypeScript (if Electron/web-based)
│   └── automation/   # AppleScript or JXA scripts
├── tests/            # Test files
├── docs/             # Additional documentation
├── scripts/          # Build and automation scripts
├── resources/        # Assets, icons, plists
├── .gitignore        # Git ignore rules
├── package.json      # If Node.js/Electron based
├── Podfile           # If using CocoaPods
├── *.xcodeproj       # If Xcode project
└── LICENSE           # Project license
```

---

## Technology Stack Considerations

### Possible Implementation Approaches

1. **Native macOS App (Swift/SwiftUI)**
   - Uses Apple's native frameworks
   - Better system integration
   - Can use AppleEvents and ScriptingBridge
   - Requires Xcode development

2. **Automation Script (AppleScript/JXA)**
   - Lightweight solution
   - Uses macOS automation
   - Can be triggered via keyboard shortcuts
   - Quick to implement

3. **Status Bar App (Swift + AppleScript)**
   - Lives in menu bar
   - Monitors clipboard/selection
   - Sends commands to Apple Music

4. **Browser Extension + Native Helper**
   - Safari extension for text selection
   - Native helper app for Music integration
   - Best UX for Safari integration

---

## Development Workflows

### Git Workflow

- **Main Branch**: `main` (default branch for releases)
- **Feature Branches**: `claude/claude-md-*` pattern for AI-assisted development
- **Current Development Branch**: `claude/claude-md-mirpvq7z2fqebmsd-016SMUfP8QF5gHfwX8wTYLgR`

#### Git Commands Reference
```bash
# Fetch latest changes
git fetch origin

# Create feature branch
git checkout -b feature/branch-name

# Commit changes
git add .
git commit -m "Descriptive commit message"

# Push to remote (use -u for first push)
git push -u origin branch-name
```

### Commit Message Conventions

Follow conventional commits format:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks
- `build:` Build system changes

Example: `feat: add text selection monitoring service`

---

## Key Conventions for AI Assistants

### Code Style Guidelines

#### Swift (if applicable)
- Use Swift 5+ modern syntax
- Follow Apple's Swift API Design Guidelines
- Use SwiftLint for code consistency
- Prefer struct over class when appropriate
- Use descriptive variable names
- Add comments for complex logic only

#### JavaScript/TypeScript (if applicable)
- Use ES6+ syntax
- Prefer `const` over `let`, avoid `var`
- Use TypeScript for type safety
- Follow Airbnb or Standard style guide
- Use async/await over callbacks

#### AppleScript/JXA (if applicable)
- Use clear, descriptive variable names
- Add comments explaining Apple Music commands
- Handle errors gracefully
- Test with Apple Music in various states

### File Naming Conventions
- Use descriptive, lowercase names with hyphens: `apple-music-controller.js`
- Swift files: PascalCase for classes: `MusicSearchService.swift`
- Test files: `*.test.js` or `*Tests.swift`
- Configuration: Use standard names (`.eslintrc`, `Package.swift`)

### Code Organization
- Separate concerns: UI, business logic, system integration
- Keep files focused and under 300 lines when possible
- Use meaningful directory structure
- Extract reusable utilities into separate modules

---

## Apple Music Integration

### AppleScript/JXA Approach

Apple Music can be controlled via AppleScript:

```applescript
tell application "Music"
    search playlist 1 for "search term"
end tell
```

JavaScript for Automation (JXA) equivalent:
```javascript
const Music = Application('Music');
Music.search(Music.playlists[0], {for: 'search term'});
```

### Key APIs and Tools

1. **ScriptingBridge** (Swift)
   - Bridge to AppleScript functionality
   - Type-safe interface to scriptable apps

2. **NSAppleScript** (Swift/Objective-C)
   - Execute AppleScript from native code
   - Handle results and errors

3. **AppleEvents**
   - Low-level inter-app communication
   - Most flexible but complex

4. **URL Schemes**
   - `music://` URL scheme for Apple Music
   - Limited functionality but simple

---

## Testing Strategy

### Types of Tests

1. **Unit Tests**
   - Test individual functions and classes
   - Mock Apple Music interactions
   - Fast and reliable

2. **Integration Tests**
   - Test actual Apple Music communication
   - Requires Music app to be installed
   - May be slower but more realistic

3. **Manual Testing Checklist**
   - [ ] Test with Music app closed
   - [ ] Test with Music app open
   - [ ] Test with active playback
   - [ ] Test with various text selections
   - [ ] Test error handling (no network, etc.)
   - [ ] Test on different macOS versions

### Testing Commands
```bash
# Swift tests (if Xcode project)
swift test
# or
xcodebuild test -scheme YourScheme

# Node.js tests (if applicable)
npm test

# Manual AppleScript test
osascript your-script.scpt
```

---

## Security and Privacy Considerations

1. **Permissions**
   - App may need Accessibility permissions
   - May need Automation permissions for Apple Music
   - Request minimal necessary permissions

2. **Data Handling**
   - Don't store search history unless explicitly needed
   - Don't transmit user data externally
   - Handle text selection data securely

3. **Sandboxing**
   - If distributing via Mac App Store, must be sandboxed
   - Requires specific entitlements for AppleEvents
   - Test thoroughly with sandbox enabled

---

## Build and Distribution

### Development Build
```bash
# Swift/Xcode
xcodebuild -scheme YourScheme -configuration Debug

# Node.js/Electron
npm run build
```

### Distribution Options

1. **Direct Download**
   - Build and package as .app or .dmg
   - Host on GitHub releases
   - No signing required for personal use

2. **Mac App Store**
   - Requires Apple Developer account ($99/year)
   - Must follow App Store guidelines
   - Strict sandboxing requirements
   - Review process

3. **Homebrew Cask**
   - Package for Homebrew
   - Easy installation for developers
   - Good for open-source tools

---

## Debugging Tips

### AppleScript/JXA Debugging
- Use Script Editor.app for testing
- Enable "Event Log" to see sent events
- Test commands directly before integration

### Native App Debugging
- Use Xcode debugger and breakpoints
- Check Console.app for system logs
- Use `print()` or `NSLog()` for debugging
- Instruments.app for performance profiling

### Common Issues
1. **"Music got an error: Not authorized"**
   - Check System Preferences > Security & Privacy > Automation
   - Enable your app to control Music

2. **Text selection not detected**
   - Check Accessibility permissions
   - Verify event monitoring code

3. **Music app unresponsive**
   - Add timeout to AppleScript commands
   - Handle errors gracefully
   - Consider async execution

---

## Dependencies Management

### Swift Package Manager (if applicable)
```swift
// Package.swift
dependencies: [
    .package(url: "https://github.com/...", from: "1.0.0")
]
```

### CocoaPods (if applicable)
```ruby
# Podfile
pod 'SomeDependency', '~> 1.0'
```

### npm (if applicable)
```json
{
  "dependencies": {
    "some-package": "^1.0.0"
  }
}
```

---

## Contributing Guidelines

### For AI Assistants

1. **Read Before Writing**
   - Always read existing files before modifying
   - Understand current patterns and conventions
   - Maintain consistency with existing code

2. **Minimize Changes**
   - Only implement what's requested
   - Don't add "nice-to-have" features
   - Don't refactor unless asked
   - Keep it simple

3. **Security First**
   - Validate inputs
   - Handle errors gracefully
   - Avoid command injection vulnerabilities
   - Follow principle of least privilege

4. **Test Your Changes**
   - Write tests for new functionality
   - Verify existing tests still pass
   - Manual test on actual system when possible

5. **Documentation**
   - Update README.md if user-facing changes
   - Add code comments for complex logic
   - Update this CLAUDE.md if workflows change

### Code Review Checklist

Before committing, verify:
- [ ] Code follows project conventions
- [ ] No security vulnerabilities introduced
- [ ] Error handling is appropriate
- [ ] No unnecessary dependencies added
- [ ] Documentation is updated
- [ ] Code is tested (automated or manual)
- [ ] No debugging code left in (console.log, print statements)
- [ ] Commit message is clear and descriptive

---

## Useful Resources

### Documentation
- [Apple Music API Documentation](https://developer.apple.com/documentation/applemusicapi)
- [AppleScript Language Guide](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/)
- [Swift Programming Language](https://docs.swift.org/swift-book/)
- [macOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/macos)

### Tools
- **Script Editor**: Built-in AppleScript IDE (`/Applications/Utilities/Script Editor.app`)
- **Xcode**: Apple's IDE for Swift/Objective-C development
- **Console.app**: View system logs and debugging output
- **Instruments**: Performance profiling tool

### Community
- [Swift Forums](https://forums.swift.org/)
- [Stack Overflow - AppleScript](https://stackoverflow.com/questions/tagged/applescript)
- [Stack Overflow - macOS](https://stackoverflow.com/questions/tagged/macos)

---

## Project Roadmap Ideas

As an AI assistant, consider these potential features when the user asks about extending the project:

### Phase 1: MVP (Minimum Viable Product)
1. Basic text selection from Safari
2. Search in Apple Music
3. Simple keyboard shortcut trigger

### Phase 2: Enhanced Features
1. Support text from any application
2. Multiple search modes (song, artist, album)
3. Configuration interface
4. Status bar app

### Phase 3: Advanced Features
1. Browser extension for better integration
2. Custom search filters
3. Playlist creation from selections
4. Search history

---

## Notes for AI Development

### When Starting a New Feature

1. Determine the implementation approach (native, script, hybrid)
2. Create appropriate directory structure
3. Set up necessary configuration files
4. Implement core functionality
5. Add error handling
6. Write tests
7. Update documentation

### When Debugging Issues

1. Reproduce the issue
2. Check system logs
3. Verify permissions
4. Test AppleScript commands separately
5. Add detailed logging
6. Test edge cases

### When Optimizing

1. Profile before optimizing
2. Focus on user-facing performance
3. Avoid premature optimization
4. Consider battery impact on macOS
5. Test memory usage

---

## Version History

- **v0.1.0** (Current) - Initial repository setup
  - Created README.md
  - Created CLAUDE.md
  - Established project structure

---

## Contact and Support

For questions or issues:
- Check GitHub Issues
- Review Apple Developer documentation
- Consult macOS development forums

---

**Last Updated**: 2025-12-04
**Project Status**: Early Development
**Target macOS Version**: 12.0+ (Monterey and later recommended)
