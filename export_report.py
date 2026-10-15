"""Build submission-ready copies of the Assignment 1 report.

Produces, from Assignment_1_Report.md:
  * Assignment_1_Report.html  (self-contained, images inlined as base64)
  * Assignment_1_Report.pdf   (headless Edge/Chrome print, keeps CSS styling)
  * Assignment_1_Report.docx  (pandoc, images embedded)

Usage:
    python export_report.py            # build all three
    python export_report.py --html     # only the HTML
"""

import base64
import mimetypes
import re
import subprocess
import sys
import time
from pathlib import Path

import markdown

HERE = Path(__file__).parent.resolve()
SRC = HERE / "Assignment_1_Report.md"
HTML_OUT = HERE / "Assignment_1_Report.html"
PDF_OUT = HERE / "Assignment_1_Report.pdf"
DOCX_OUT = HERE / "Assignment_1_Report.docx"

CSS = """
@page { size: A4; margin: 18mm 15mm; }
body {
  font-family: "Segoe UI", Calibri, Arial, sans-serif;
  font-size: 11.5pt; line-height: 1.55; color: #1a1a1a;
  max-width: 860px; margin: 0 auto; padding: 24px;
}
h1 { font-size: 20pt; border-bottom: 2px solid #333; padding-bottom: 6px; margin-top: 26px; }
h2 { font-size: 15pt; margin-top: 24px; border-bottom: 1px solid #bbb; padding-bottom: 4px; }
h3 { font-size: 12.5pt; margin-top: 18px; }
code { background: #f2f2f2; padding: 1px 5px; border-radius: 3px;
       font-family: Consolas, "Courier New", monospace; font-size: 10pt; }
pre { background: #f6f6f6; padding: 10px; border-radius: 4px; overflow-x: auto; }
table { border-collapse: collapse; width: 100%; margin: 14px 0; font-size: 10pt; }
th, td { border: 1px solid #bbb; padding: 6px 9px; text-align: left; vertical-align: top; }
th { background: #ececec; font-weight: 600; }
tr:nth-child(even) td { background: #fafafa; }
img { max-width: 100%; height: auto; display: block; margin: 14px auto;
      border: 1px solid #ddd; border-radius: 4px; page-break-inside: avoid; }
hr { border: none; border-top: 1px solid #ccc; margin: 22px 0; }
blockquote { border-left: 4px solid #ccc; margin-left: 0; padding-left: 14px; color: #444; }
h1, h2, h3 { page-break-after: avoid; }
table, pre { page-break-inside: avoid; }
"""

BROWSERS = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
]


def embed_images(html: str) -> str:
    """Inline local images as base64 so the output is self-contained."""

    def repl(match):
        src = match.group(1)
        if src.startswith(("http://", "https://", "data:")):
            return match.group(0)
        path = (HERE / src).resolve()
        if not path.exists():
            print(f"  warning: image not found -> {src}")
            return match.group(0)
        mime = mimetypes.guess_type(path.name)[0] or "image/png"
        b64 = base64.b64encode(path.read_bytes()).decode("ascii")
        return f'src="data:{mime};base64,{b64}"'

    return re.sub(r'src="([^"]+)"', repl, html)


def build_html() -> Path:
    text = SRC.read_text(encoding="utf-8")
    body = markdown.markdown(text, extensions=["tables", "fenced_code", "sane_lists"])
    body = embed_images(body)
    html = (
        "<!DOCTYPE html><html><head><meta charset='utf-8'>"
        "<title>NLP Assignment 1 Report</title>"
        f"<style>{CSS}</style></head><body>{body}</body></html>"
    )
    HTML_OUT.write_text(html, encoding="utf-8")
    print(f"HTML  -> {HTML_OUT.name} ({HTML_OUT.stat().st_size / 1024:.0f} KB)")
    return HTML_OUT


def build_pdf() -> None:
    browser = next((b for b in BROWSERS if Path(b).exists()), None)
    if browser is None:
        print("PDF   -> skipped (no Edge/Chrome found)")
        return

    if PDF_OUT.exists():
        PDF_OUT.unlink()

    subprocess.run(
        [
            browser,
            "--headless",
            "--disable-gpu",
            "--no-pdf-header-footer",
            f"--print-to-pdf={PDF_OUT}",
            HTML_OUT.as_uri(),
        ],
        check=False,
        capture_output=True,
        timeout=180,
    )

    # Headless print can return before the file is flushed to disk.
    for _ in range(30):
        if PDF_OUT.exists() and PDF_OUT.stat().st_size > 0:
            break
        time.sleep(1)

    if PDF_OUT.exists():
        print(f"PDF   -> {PDF_OUT.name} ({PDF_OUT.stat().st_size / 1024:.0f} KB)")
    else:
        print("PDF   -> FAILED (browser produced no file)")


def build_docx() -> None:
    import pypandoc

    pypandoc.convert_file(
        str(SRC),
        "docx",
        format="markdown+pipe_tables",
        outputfile=str(DOCX_OUT),
        extra_args=[f"--resource-path={HERE}", "--toc", "--toc-depth=2"],
    )
    print(f"DOCX  -> {DOCX_OUT.name} ({DOCX_OUT.stat().st_size / 1024:.0f} KB)")


def main():
    only_html = "--html" in sys.argv
    build_html()
    if not only_html:
        build_pdf()
        build_docx()


if __name__ == "__main__":
    main()
