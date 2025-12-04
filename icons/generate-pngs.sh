#!/bin/bash
# This script converts the SVG icon to PNG at different sizes
# Requires: rsvg-convert (from librsvg) or ImageMagick

# Check if rsvg-convert is available
if command -v rsvg-convert &> /dev/null; then
    echo "Using rsvg-convert..."
    rsvg-convert -w 48 -h 48 icon.svg -o icon-48.png
    rsvg-convert -w 96 -h 96 icon.svg -o icon-96.png
    rsvg-convert -w 128 -h 128 icon.svg -o icon-128.png
    echo "Icons generated successfully!"
elif command -v convert &> /dev/null; then
    echo "Using ImageMagick convert..."
    convert -background none -resize 48x48 icon.svg icon-48.png
    convert -background none -resize 96x96 icon.svg icon-96.png
    convert -background none -resize 128x128 icon.svg icon-128.png
    echo "Icons generated successfully!"
else
    echo "Error: Neither rsvg-convert nor ImageMagick convert found."
    echo "Please install one of the following:"
    echo "  - librsvg: brew install librsvg"
    echo "  - ImageMagick: brew install imagemagick"
    exit 1
fi
