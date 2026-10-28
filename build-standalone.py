#!/usr/bin/env python3
"""Bundle the local HyperFrames composition and player into one offline HTML file."""
from pathlib import Path
import json
import re

root = Path(__file__).resolve().parent
source = (root / 'index.html').read_text()

def inline_script(match):
    path = root / match.group(1)
    return '<script>' + path.read_text().replace('</script', '<\\/script') + '</script>'

def inline_css(match):
    return '<style>' + (root / match.group(1)).read_text() + '</style>'

source = re.sub(r'<script\s+src="([^"]+)"\s*></script>', inline_script, source)
source = re.sub(r'<link\s+rel="stylesheet"\s+href="([^"]+)"\s*/?>', inline_css, source)
player = (root / 'preview.html').read_text()
player = player.replace('src="index.html"', '')
# Assign only after the load listener has been registered. All composition assets are inline.
inline = json.dumps(source, ensure_ascii=False).replace('</', '<\\/')
player = player.replace('</script></body>', '\nframe.srcdoc=' + inline + ';\n</script></body>')
player = re.sub(r'<a href="reference/contact-sheet.jpg"[^>]*>.*?</a>', '', player)
(root / 'faker-five-star-intro.html').write_text(player)
print(root / 'faker-five-star-intro.html')
