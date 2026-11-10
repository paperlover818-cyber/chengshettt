from pathlib import Path
import re
from xml.sax.saxutils import escape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Preformatted

root = Path(__file__).resolve().parent
pdfmetrics.registerFont(TTFont('STSong-Light', '/System/Library/Fonts/STHeiti Medium.ttc'))
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='CNTitle', fontName='STSong-Light', fontSize=18, leading=25, alignment=TA_CENTER, spaceAfter=14))
styles.add(ParagraphStyle(name='CNHeading', fontName='STSong-Light', fontSize=13, leading=19, textColor=colors.HexColor('#215b50'), spaceBefore=10, spaceAfter=5, keepWithNext=True))
styles.add(ParagraphStyle(name='CNBody', fontName='STSong-Light', fontSize=9.5, leading=15, spaceAfter=5, wordWrap='CJK'))
styles.add(ParagraphStyle(name='CNCode', fontName='STSong-Light', fontSize=8, leading=11, leftIndent=8, backColor=colors.HexColor('#f1f5f3'), spaceBefore=4, spaceAfter=7))
def inline(s):
    return escape(s).replace('**', '').replace('`', '')
story=[]
code=[]
inside=False
for line in (root/'期中复习知识点.md').read_text(encoding='utf-8').splitlines():
    if line.startswith('```'):
        if inside:
            story.append(Preformatted('\n'.join(code), styles['CNCode']))
            code=[]
        inside=not inside
    elif inside:
        code.append(line)
    elif line.startswith('# '):
        story.append(Paragraph(inline(line[2:]), styles['CNTitle']))
    elif line.startswith('## ') or line.startswith('### '):
        story.append(Paragraph(inline(line.lstrip('# ')), styles['CNHeading']))
    elif line.strip() and not re.match(r'^\|\s*-',line):
        story.append(Paragraph(inline(line.replace('|', '  ')), styles['CNBody']))
    else:
        story.append(Spacer(1, 2))
def page(canvas, doc):
    canvas.setFont('STSong-Light', 8)
    canvas.setFillColor(colors.grey)
    canvas.drawRightString(190*mm, 13*mm, str(doc.page))
out=root/'期中复习手册.pdf'
SimpleDocTemplate(str(out), pagesize=(210*mm,297*mm), leftMargin=20*mm, rightMargin=20*mm, topMargin=17*mm, bottomMargin=20*mm, title='C语言程序设计期中复习').build(story,onFirstPage=page,onLaterPages=page)
