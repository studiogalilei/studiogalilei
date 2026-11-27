#!/usr/bin/env python3
"""Le schermate d'esempio dei settori: HTML vero, fotografato con Chrome (1440x900).
Dati inventati e coerenti, aziende di fantasia. Uso: python3 gen.py [slug ...]"""
import pathlib, subprocess, sys
QUI = pathlib.Path(__file__).parent
IC = {
 "grid":'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
 "list":'<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
 "cog":'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
 "check":'<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.8 2.8L16 9.5"/>',
 "box":'<path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9"/>',
 "chart":'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
 "users":'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.1-5.5 6.5-5.5s5.900 1.900 6.500 5.500M16 4.800a3.500 3.500 0 0 1 0 6.400M18 14.800c2 .700 3.200 2.400 3.600 5.200"/>',
 "truck":'<path d="M2.500 6h11v10h-11zM13.500 9.500h4l3 3.500v3h-7z"/><circle cx="7" cy="17.500" r="1.800"/><circle cx="17" cy="17.500" r="1.800"/>',
 "file":'<path d="M6 2.500h8l4.500 4.500v14.500H6z"/><path d="M14 2.500V7h4.500M9 12.500h6M9 16.500h6"/>',
 "cal":'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 2.500v4M16 2.500v4"/>',
 "alert":'<path d="M12 3.500 22 20H2z"/><path d="M12 10v4.500M12 17.500h.01"/>',
 "layers":'<path d="m12 3 9.500 5L12 13 2.500 8z"/><path d="m2.500 12.500 9.500 5 9.500-5M2.500 16.500l9.500 5 9.500-5"/>',
 "tag":'<path d="M3 12.500V3.500h9l9 9-9 9z"/><circle cx="7.800" cy="8.300" r="1.300"/>',
 "shield":'<path d="M12 2.500 20 6v6c0 4.500-3.200 8-8 9.500-4.800-1.500-8-5-8-9.500V6z"/>',
 "wrench":'<path d="M14.500 6.500a4.500 4.500 0 0 0 5.800 5.800L11 21.500 7.500 18l9.300-9.300"/><path d="M14.500 6.500 17 4"/>',
 "bell":'<path d="M6 16.500V11a6 6 0 0 1 12 0v5.500l1.500 2h-15z"/><path d="M10 21h4"/>',
 "search":'<circle cx="11" cy="11" r="6.500"/><path d="m16 16 4.500 4.500"/>',
 "down":'<path d="m6 9 6 6 6-6"/>',
 "pulse":'<path d="M2.500 12h4l2.500-7 4 14 2.500-7h6"/>',
}
def ic(n): return f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.700" stroke-linecap="round" stroke-linejoin="round">{IC[n]}</svg>'
def nav(items, on):
    return "".join(f'<a class="{"on" if n==on else ""}">{ic(i)}{n}{f"<b>{b}</b>" if b else ""}</a>' for n,i,b in items)
def chip(t,k="ok"): return f'<span class="chip c-{k}">{t}</span>'
def bar(p,col=None,w=None): return f'<div class="bar"{f" style=width:{w}px" if w else ""}><i style="width:{p}%{f";background:{col}" if col else ""}"></i></div>'
_KI=["chart","layers","check","box","pulse","file","users","cal"]
_kn=[0]
def kpi(l,v,d="",cls="mu",i=None):
    _kn[0]+=1
    return f'<div class="card kpi"><u>{ic(i or _KI[_kn[0]%len(_KI)])}</u><small>{l}</small><strong>{v}</strong><em class="{cls}">{d}</em></div>'
def spark(vals,w=260,h=64,col="var(--acc)"):
    mn,mx=min(vals),max(vals); pts=[(i*w/(len(vals)-1), h-4-(v-mn)/(mx-mn or 1)*(h-10)) for i,v in enumerate(vals)]
    d="M"+" L".join(f"{x:.1f},{y:.1f}" for x,y in pts)
    return f'<svg viewBox="0 0 {w} {h}" width="100%" height="{h}" preserveAspectRatio="none"><path d="{d} L{w},{h} L0,{h}Z" fill="{col}" opacity=".09"/><path d="{d}" fill="none" stroke="{col}" stroke-width="1.800" vector-effect="non-scaling-stroke"/></svg>'
def tabs(items, on): return '<div class="tabs">'+"".join(f'<span class="{"on" if x==on else ""}">{x}</span>' for x in items)+'</div>'
def filters(items, on, cerca="Cerca"): return '<div class="filters">'+"".join(f'<span class="{"on" if x==on else ""}">{x}</span>' for x in items)+f'<em>{ic("search")}{cerca}</em></div>'
def foot(txt, pag="1"): return f'<div class="foot">{txt}<span class="sp"></span>Pagina <b>{pag}</b></div>'
def page(slug, theme, brand, mark, navs, on, who, role, crumb, pills, body, extra_css="", ws="Workspace", avvisi=2, fonts=""):
    return f'''<!doctype html><html lang="it"><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Cormorant+Garamond:wght@500;600&family=Space+Grotesk:wght@500;600;700{fonts}&display=swap" rel="stylesheet"><link rel="stylesheet" href="../base.css"><style>:root{{{theme}}}{extra_css}</style></head><body><div class="app">
<aside class="side"><div class="brand">{mark}</div><div class="ws">{ws}</div><nav class="nav">{navs}</nav><div class="me"><span class="av">{"".join(w[0] for w in who.split()[:2])}</span><div><b style="font-weight:600">{who}</b><small>{role}</small></div>{ic("down")}</div></aside>
<div class="main"><header class="top">{pills}<div class="bell">{ic("bell")}{f"<i>{avvisi}</i>" if avvisi else ""}</div></header><div class="body">{body}</div></div></div></body></html>'''
PAGES = {}
def reg(slug): 
    def d(f): PAGES[slug]=f; return f
    return d
exec((QUI/"pagine.py").read_text())
def shoot(slug):
    out=QUI/"out"; html=out/f"{slug}.html"; png=out/f"{slug}.png"
    html.write_text(PAGES[slug]())
    subprocess.run(["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome","--headless=new","--disable-gpu","--hide-scrollbars","--force-device-scale-factor=2","--window-size=1440,900","--virtual-time-budget=6000",f"--screenshot={png}",f"file://{html}"],capture_output=True)
    dest=QUI.parent/"public/images/settori"; dest.mkdir(exist_ok=True)
    subprocess.run(["cwebp","-quiet","-q","84","-resize","1800","0",str(png),"-o",str(dest/f"{slug}.webp")])
    print("ok",slug)
for s in (sys.argv[1:] or PAGES): shoot(s)
