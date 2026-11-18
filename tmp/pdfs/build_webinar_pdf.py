from pathlib import Path
import re
from xml.sax.saxutils import escape
from html.parser import HTMLParser
import markdown
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, PageBreak,
    LongTable, TableStyle, KeepTogether, Flowable, CondPageBreak,
)
from reportlab.platypus.tableofcontents import TableOfContents
import xml.etree.ElementTree as ET

ROOT=Path('/Users/alextudor/Desktop/Clients/client-stefan-dragan')
SRC=ROOT/'output/webinar-adictii'
OUT=ROOT/'output/pdf/Plan-webinar-si-colaborare-Stefan-Dragan.pdf'
OUT.parent.mkdir(parents=True,exist_ok=True)
FONT=Path('/System/Library/Fonts/Supplemental')
for name,file in [('Body','Arial.ttf'),('BodyBold','Arial Bold.ttf'),('BodyItalic','Arial Italic.ttf'),('BodyBoldItalic','Arial Bold Italic.ttf'),('Display','Georgia.ttf'),('DisplayItalic','Georgia Italic.ttf')]:
    pdfmetrics.registerFont(TTFont(name,str(FONT/file)))
pdfmetrics.registerFontFamily('Body',normal='Body',bold='BodyBold',italic='BodyItalic',boldItalic='BodyBoldItalic')
INK=colors.HexColor('#102F40'); BLUE=colors.HexColor('#286787'); CREAM=colors.HexColor('#F7F1E5'); GOLD=colors.HexColor('#E8D69C'); AMBER=colors.HexColor('#B9804B'); MUTED=colors.HexColor('#526875'); PAPER=colors.HexColor('#F3F5F4')
W,H=A4
styles={
 'body':ParagraphStyle('Body',fontName='Body',fontSize=10.4,leading=15.2,textColor=INK,spaceAfter=8.5),
 'h1':ParagraphStyle('Chapter',fontName='Display',fontSize=25,leading=31,textColor=INK,spaceAfter=18,keepWithNext=True),
 'h2':ParagraphStyle('Section',fontName='BodyBold',fontSize=13.2,leading=18,textColor=INK,spaceBefore=15,spaceAfter=8,keepWithNext=True),
 'h3':ParagraphStyle('Subsection',fontName='BodyBold',fontSize=11.3,leading=15.5,textColor=INK,spaceBefore=11,spaceAfter=6,keepWithNext=True),
 'small':ParagraphStyle('Small',fontName='Body',fontSize=8.5,leading=12,textColor=MUTED,spaceAfter=6),
 'cell':ParagraphStyle('Cell',fontName='Body',fontSize=8.5,leading=11.8,textColor=INK),
 'th':ParagraphStyle('TH',fontName='BodyBold',fontSize=8.5,leading=11.8,textColor=colors.white),
 'list':ParagraphStyle('List',fontName='Body',fontSize=10.4,leading=15.2,textColor=INK,leftIndent=14,firstLineIndent=-12,spaceAfter=7),
 'tag':ParagraphStyle('Tag',fontName='BodyBold',fontSize=9,leading=13,textColor=AMBER,spaceAfter=10),
}
sections=[
 ('01-plan-webinar.md','Planul webinarului','01'),
 ('02-ghid-prezentator.md','Ghidul prezentatorului','02'),
 ('03-propunere-colaborare-mindtale.md','Colaborarea cu Mindtale','03'),
 ('04-fisa-participant.md','Fișa participantului','04'),
 ('05-concept-pentru-partener.md','Conceptul pentru partener','05'),
]
anchors={file:f'chapter-{num}' for file,title,num in sections}
all_urls={}

def clean(text):
    return text.replace('–','-').replace('—','-').replace('\u2011','-').replace('\u00a0',' ')

def inline(el):
    result=escape(clean(el.text or ''))
    for c in el:
        content=inline(c)
        if c.tag in ('strong','b'): part=f'<b>{content}</b>'
        elif c.tag in ('em','i'): part=f'<i>{content}</i>'
        elif c.tag=='code':
            txt=''.join(c.itertext())
            if txt in anchors: part=f'<link href="#{anchors[txt]}" color="#286787">{escape(dict((f,t) for f,t,n in sections)[txt])}</link>'
            else: part=content
        elif c.tag=='a':
            href=c.attrib.get('href','')
            if href.startswith('https://'):
                all_urls.setdefault(href,''.join(c.itertext()))
                part=f'<link href="{escape(href)}" color="#286787">{content}</link>'
            elif href in anchors: part=f'<link href="#{anchors[href]}" color="#286787">{content}</link>'
            else: part=content
        elif c.tag=='br': part='<br/>'
        else: part=content
        result+=part+escape(clean(c.tail or ''))
    return result

class Doc(BaseDocTemplate):
    def __init__(self,*a,**kw):
        super().__init__(*a,**kw)
        self.current_chapter='Plan de webinar și colaborare'
        frame=Frame(48,48,W-96,H-98,id='body',leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0)
        self.addPageTemplates(PageTemplate(id='content',frames=[frame],onPage=self.page_decoration))
    def beforeDocument(self):
        self.current_chapter='Plan de webinar și colaborare'
    def page_decoration(self,c,doc):
        if doc.page==1:return
        c.saveState()
        c.setStrokeColor(colors.HexColor('#DEE5E7'));c.setLineWidth(.5)
        c.line(48,H-32,W-48,H-32)
        c.setFont('Body',8);c.setFillColor(MUTED)
        c.drawString(48,H-23,'ȘTEFAN DRĂGAN  /  WEBINAR ȘI COLABORARE')
        c.drawString(48,26,'Plan de webinar și colaborare')
        c.drawRightString(W-48,26,f'{doc.page:02d}')
        c.restoreState()
    def afterFlowable(self,f):
        if hasattr(f,'bookmark'):
            self.canv.bookmarkPage(f.bookmark)
            self.canv.addOutlineEntry(f.title,f.bookmark,0,False)
            self.notify('TOCEntry',(0,f.title,self.page,f.bookmark))
            self.current_chapter=f.title

class Cover(Flowable):
    def __init__(self): super().__init__(); self.width=W-96;self.height=H-104
    def draw(self):
        c=self.canv
        c.saveState();c.setFillColor(INK);c.rect(-48,-50,W,H,fill=1,stroke=0)
        c.setFillColor(BLUE);c.circle(W-100,H-220,190,fill=1,stroke=0)
        c.setFillColor(INK);c.rect(-48,-50,W,465,fill=1,stroke=0)
        c.setFillColor(GOLD);c.setFont('BodyBold',9);c.drawString(0,697,'PROPUNERE DE DEZVOLTARE  /  NOIEMBRIE 2026')
        def txt(s,y,size=35,font='Display',color=CREAM):
            c.setFont(font,size);c.setFillColor(color);c.drawString(0,y,s)
        txt('Plan de webinar',582)
        txt('și colaborare',537)
        txt('pentru Ștefan Drăgan',486,24,'DisplayItalic',GOLD)
        c.setStrokeColor(AMBER);c.setLineWidth(1.2);c.line(0,442,65,442)
        txt('Când alcoolul devine',389,25)
        txt('răspunsul la stres',354,25)
        for s,y in [('Tema și publicul potrivit',280),('Ghid de prezentare și materiale de sprijin',256),('Propunere de colaborare cu Mindtale',232)]: txt(s,y,11.4,'Body')
        txt('Plan de acțiune pentru Ștefan Drăgan',100,10,'Body')
        txt('Revizuit la 18 noiembrie 2026',79,10,'Body',GOLD)
        txt('Document de lucru  /  Pilot propus, fără dată confirmată',35,9,'Body',GOLD)
        c.restoreState()

def para(text,kind='body'):
    return Paragraph(text,styles[kind])

def convert(md):
    tree=ET.fromstring('<root>'+markdown.markdown(clean(md),extensions=['tables'])+'</root>')
    out=[]
    for el in tree:
        tag=el.tag
        if tag=='h1': continue
        elif tag in ('h2','h3'):
            out.append(para(inline(el),tag))
        elif tag=='p':
            text=inline(el)
            # Convert source-only paths to navigable section references.
            for file,anchor in anchors.items():
                text=text.replace(escape(file),f'<link href="#{anchor}" color="#286787">{escape(dict((f,t) for f,t,n in sections)[file])}</link>')
            if re.fullmatch(r'\.+',el.text or ''):
                out.append(Spacer(1,17))
            else:out.append(para(text))
        elif tag in ('ol','ul'):
            for i,li in enumerate(el.findall('li'),1):
                prefix=f'{i}.' if tag=='ol' else '•'
                out.append(para(prefix+' '+inline(li),'list'))
        elif tag=='table':
            rows=[]
            for ri,tr in enumerate(el.findall('.//tr')):
                rows.append([para(inline(td),'th' if ri==0 else 'cell') for td in tr])
            n=len(rows[0]);width=W-96
            # Wider prose columns; timings remain compact.
            headers=[''.join(td.itertext()).lower() for td in el.findall('.//tr')[0]]
            if n==3 and any('minute' in s or 'durată' in s or 'moment' in s for s in headers): ratios=[.19,.43,.38] if 'durée' not in headers else [.2,.4,.4]
            elif n==5:ratios=[.12,.23,.23,.20,.22]
            elif n==4:ratios=[.16,.26,.30,.28]
            elif n==2:ratios=[.23,.77]
            else:ratios=[1/n]*n
            table=LongTable(rows,colWidths=[width*r for r in ratios],repeatRows=1,hAlign='LEFT')
            table.setStyle(TableStyle([
                ('BACKGROUND',(0,0),(-1,0),INK),('VALIGN',(0,0),(-1,-1),'TOP'),
                ('ROWBACKGROUNDS',(0,1),(-1,-1),[PAPER,colors.white]),
                ('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),
                ('TOPPADDING',(0,0),(-1,-1),6 if n==2 else 9),('BOTTOMPADDING',(0,0),(-1,-1),6 if n==2 else 9),
                ('LINEBELOW',(0,0),(-1,0),.5,INK),('LINEBELOW',(0,1),(-1,-1),.4,colors.HexColor('#DEE5E7')),
            ]))
            out.extend([table,Spacer(1,10)])
    return out

story=[Cover(),PageBreak(),para('Cum folosești documentul','h1')]
story.append(para('Acest PDF reunește planul webinarului, acțiunile lui Ștefan, ghidul prezentatorului și materialele pentru participanți și partener. Cuprinsul și sursele sunt clicabile.'))
story.append(para('<b>Recomandare:</b> un pilot pentru publicul adult, <i>Când alcoolul devine răspunsul la stres</i>, cu o propunere de colaborare către Mindtale.'))
story.append(para('Pentru prima discuție, parcurge planul și propunerea Mindtale. Ghidul este suportul pentru repetiție și dezvoltarea scriptului. Fișa este destinată participanților; conceptul scurt poate fi folosit ca anexă la mesajul către partener.'))
story.append(para('Cuprins','h2'))
toc=TableOfContents();toc.levelStyles=[ParagraphStyle('TOC',fontName='Body',fontSize=11,leading=18,textColor=INK,leftIndent=0,firstLineIndent=0,spaceBefore=8)]
story.append(toc)
story.extend([Spacer(1,20),para('Stadiul propunerii','h2'),para('Document de lucru pregătit la 16 noiembrie 2026 și revizuit la 18 noiembrie 2026. Nu a fost trimis niciun mesaj, nu există o dată rezervată și nu este confirmat un parteneriat. Titulatura, conținutul clinic și condițiile colaborării se aprobă înainte de publicare.')])

for file,title,num in sections:
    base_styles=styles
    if file in ('01-plan-webinar.md','05-concept-pentru-partener.md'):
        styles={k:ParagraphStyle(k+'Compact'+num,parent=v) for k,v in base_styles.items()}
        tight=file=='05-concept-pentru-partener.md'
        for key in ('body','list'):
            styles[key].fontSize=9.8 if tight else 10.2
            styles[key].leading=13 if tight else 14.5
            styles[key].spaceAfter=6 if tight else 7
        styles['h2'].spaceBefore=9 if tight else 12
        styles['h2'].spaceAfter=6
        if tight:
            styles['h2'].fontSize=12
            styles['h2'].leading=16
            styles['cell'].leading=11
    story.append(PageBreak())
    story.append(para(f'SECȚIUNEA {num}','tag'))
    heading=para(title,'h1');heading.bookmark=anchors[file];heading.title=title
    story.append(heading)
    md=(SRC/file).read_text()
    md=md.replace(', după formatarea finală.','.')
    md=md.replace('Ghidul din `02-ghid-prezentator.md`','Secțiunea `02-ghid-prezentator.md`')
    md=md.replace('PDF-ul sau documentul distribuit va fi cel din `04-fisa-participant.md`','Exercițiul este disponibil în secțiunea `04-fisa-participant.md`')
    if file=='04-fisa-participant.md':
        # Dedicated writing space while retaining all exercise questions.
        pass
    story.extend(convert(md))
    styles=base_styles

story.append(PageBreak())
heading=para('Documentare și pași următori','h1');heading.bookmark='documentation';heading.title='Documentare și pași următori';story.append(heading)
readme=(SRC/'README.md').read_text()
readme=readme[readme.index('## Ce există și ce urmează'):]
story.extend(convert(readme))
story.append(para('Surse și pagini consultate','h2'))
for i,(url,label) in enumerate(all_urls.copy().items(),1):
    short=label if not label.startswith('http') else url.split('/')[2]
    story.append(para(f'{i}. <link href="{escape(url)}" color="#286787">{escape(short)}</link>','small'))
story.append(para('Linkurile deschid paginile originale. Verificarea pentru documentarea inițială a fost făcută la 16 noiembrie 2026. Propunerile de format, buget și colaborare sunt recomandări de lucru, nu angajamente ale organizațiilor menționate.','small'))

doc=Doc(str(OUT),pagesize=A4,title='Plan de webinar și colaborare pentru Ștefan Drăgan',author='',subject='Alcool și stres - plan, ghid de prezentare și colaborare Mindtale',leftMargin=48,rightMargin=48,topMargin=50,bottomMargin=48)
doc.multiBuild(story)
print(OUT)
