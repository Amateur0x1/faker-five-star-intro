#!/usr/bin/env python3
"""Bundle the local HyperFrames composition and player into one offline HTML file."""
from pathlib import Path
import base64
import json
import re

root = Path(__file__).resolve().parent
source = (root / 'index.html').read_text()

def inline_script(match):
    path = root / match.group(1)
    return '<script>' + path.read_text().replace('</script', '<\\/script') + '</script>'

def inline_css(match):
    return '<style>' + (root / match.group(1)).read_text() + '</style>'

def inline_audio(match):
    prefix, rel_path, suffix = match.group(1), match.group(2), match.group(3)
    data = base64.b64encode((root / rel_path).read_bytes()).decode('ascii')
    return f'{prefix}data:audio/mpeg;base64,{data}{suffix}'

source = re.sub(r'<script\s+src="([^"]+)"\s*></script>', inline_script, source)
source = re.sub(r'<link\s+rel="stylesheet"\s+href="([^"]+)"\s*/?>', inline_css, source)
source = re.sub(r'(<audio\b[^>]*\bsrc=")([^"]+)(")', inline_audio, source)
player = (root / 'preview.html').read_text()
player = player.replace('src="index.html"', '')
# Assign only after the load listener has been registered. All composition assets are inline.
inline = json.dumps(source, ensure_ascii=False).replace('</', '<\\/').replace('data-composition-id', 'data-composition-\\u0069d')
player = player.replace('</script></body>', '\nframe.srcdoc=' + inline + ';\n</script></body>')
player = re.sub(r'<a href="reference/contact-sheet.jpg"[^>]*>.*?</a>', '', player)
(root / 'faker-five-star-intro.html').write_text(player)
print(root / 'faker-five-star-intro.html')
