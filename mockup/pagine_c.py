# Schermate dei settori: chimica e materiali, media e comunicazione, Pubblica Amministrazione, studi professionali.
# Eseguito da gen.py nello stesso namespace di pagine.py (usa reg, page, nav, chip, bar, ic, IC, LOGO, _logo).

IC.update({
 "c_flask":'<path d="M9.500 3h5M10.500 3v6L4.500 19a1.500 1.500 0 0 0 1.300 2.200h12.400a1.500 1.500 0 0 0 1.300-2.200L13.500 9V3"/><path d="M7.500 15h9"/>',
 "c_lock":'<rect x="5" y="10.500" width="14" height="10" rx="2"/><path d="M8 10.500V7.500a4 4 0 0 1 8 0v3"/>',
 "c_leaf":'<path d="M5 19c0-9 5-14 15-14 0 10-5 15-14 14"/><path d="M5 19c3-5 6-8 10-10"/>',
 "c_pen":'<path d="M4 20l1-4.500L16.500 4l3.500 3.500L8.500 19z"/><path d="M14 6.500l3.500 3.500"/>',
 "c_img":'<rect x="3" y="4.500" width="18" height="15" rx="2"/><circle cx="8.500" cy="9.500" r="1.600"/><path d="m4 17 5-4.500 3.500 3 3-2.500 4.500 4"/>',
 "c_send":'<path d="M21 3.500 10.500 14M21 3.500l-6.500 17-4-6.500-6.500-4z"/>',
 "c_key":'<circle cx="8" cy="15" r="4"/><path d="m11 12 8.500-8.500M16 6.500l2.500 2.500M13.500 9l2 2"/>',
 "c_inbox":'<path d="M3 13.500 6 4.500h12l3 9v6H3z"/><path d="M3 13.500h5.500l1 2.500h5l1-2.500H21"/>',
 "c_clock":'<circle cx="12" cy="12" r="9"/><path d="M12 7v5.500l3.500 2"/>',
 "c_euro":'<path d="M18 6.500a7 7 0 1 0 0 11M4.500 10.500h9M4.500 13.500h8"/>',
 "c_folder":'<path d="M3 6.500h6.500l2 2.500H21v10.500H3z"/>',
 "c_home":'<path d="M3.500 11 12 4l8.500 7v9.500h-5.500v-6h-6v6H3.500z"/>',
 "c_plus":'<path d="M12 5v14M5 12h14"/>',
})

def _c_doc(theme, css, body, fonts=""):
    return ('<!doctype html><html lang="it"><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Cormorant+Garamond:wght@500;600&family=Space+Grotesk:wght@500;600;700'
            + fonts + '&display=swap" rel="stylesheet"><link rel="stylesheet" href="../base.css"><style>:root{' + theme + '}' + css + '</style></head><body>' + body + '</body></html>')

def _c_n(x, d=0):
    """Numero all'italiana: 1.206,3"""
    s = f"{x:,.{d}f}"
    return s.replace(",", "§").replace(".", ",").replace("§", ".")

# ── Chimica e materiali: formula, lotto e sicurezza ──────────────────────────
_C_VB_SYM = '<svg viewBox="0 0 34 34"><path d="M17 2 30 9.500v15L17 32 4 24.500v-15z" fill="none" stroke="{c}" stroke-width="2"/><path d="M17 9c3.600 4.600 5.400 7.600 5.400 10.200a5.400 5.400 0 0 1-10.800 0C11.600 16.600 13.400 13.600 17 9z" fill="{c}"/><path d="M4 9.500 17 17M30 9.500 17 17" stroke="{c}" stroke-width="1.200" opacity=".45"/></svg>'
LOGO.update({
 "c_vb": _logo(_C_VB_SYM.replace("{c}", "#0b6e75"),
   '<b style="font-family:Space Grotesk;font-weight:700;font-size:16px;letter-spacing:.02em;color:#0d2b30;white-space:nowrap">CASTELBRENTA<br><span style="font-size:9.500px;font-weight:500;letter-spacing:.24em;color:#5d7a7e">VERNICI INDUSTRIALI</span></b>'),
})

def _c_ghs(k):
    g = {
     "fiamma": '<path d="M20 30c-4.500 0-7-2.800-7-6.400 0-3.400 2.600-5 3.600-8.600 2 1.400 2.800 3 2.800 4.600 1.200-2 1.400-4.600.600-7.600 4.400 2.600 7 6.800 7 11.200 0 4-2.800 6.800-7 6.800z" fill="#111"/>',
     "escl": '<path d="M18 11h4l-.800 12h-2.400z" fill="#111"/><circle cx="20" cy="27.500" r="2.200" fill="#111"/>',
     "ambiente": '<path d="M9 28h22" stroke="#111" stroke-width="1.600"/><path d="M14 28V15M14 19l-3-3M14 22l3-3M14 17l2.500-2.500" stroke="#111" stroke-width="1.500" fill="none"/><path d="M19 25c2.500-2.600 6-2.600 8.500 0-2.500 2.200-6 2.200-8.500 0zM27.500 25l2.500-1.800v3.600z" fill="#111"/>',
    }[k]
    return f'<svg viewBox="0 0 40 40" class="ghs"><path d="M20 2.500 37.500 20 20 37.500 2.500 20z" fill="#fff" stroke="#d3261c" stroke-width="2.600" stroke-linejoin="round"/>{g}</svg>'

@reg("chimica-materiali")
def _c_chimica():
    lotto_teorico = 1200.0
    comp = [  # codice, componente, funzione, % in peso, pesato kg, lotto materia prima, colore, solvente
        ("MP-1104", "Resina epossidica liquida BPA", "Legante", 38.50, 462.2, "R-26-3381", "#0b6e75", False),
        ("MP-2210", "Biossido di titanio rutilo", "Pigmento", 18.00, 216.0, "T-26-0917", "#3c98a0", False),
        ("MP-2305", "Solfato di bario", "Carica", 14.50, 174.1, "B-26-1402", "#7fbcc1", False),
        ("MP-2318", "Talco micronizzato", "Carica", 7.30, 87.5, "K-26-0655", "#b4d8db", False),
        ("MP-3102", "Xilene", "Solvente", 9.50, 114.0, "X-26-2210", "#d98a1f", True),
        ("MP-3140", "1-metossi-2-propanolo", "Solvente", 5.00, 60.1, "P-26-0871", "#ecb866", True),
        ("MP-1190", "Diluente reattivo C12-C14", "Diluente", 4.00, 48.0, "D-26-0339", "#5b6f8f", False),
        ("MP-4021", "Additivo disperdente", "Additivo", 1.60, 19.2, "A-26-1175", "#8c9ab3", False),
        ("MP-4077", "Addensante reologico", "Additivo", 1.10, 13.2, "A-26-0984", "#b3bdcf", False),
        ("MP-5003", "Paste coloranti nero e giallo", "Colore", 0.50, 6.0, "C-26-0412", "#2f3a40", False),
    ]
    tot_pct = sum(c[3] for c in comp)
    assert abs(tot_pct - 100) < 1e-9
    tot_pes = sum(c[4] for c in comp)
    corr = 6.0                                   # aggiunta di xilene per rientrare in viscosità
    carico = tot_pes + corr
    solv = sum(c[4] for c in comp if c[7]) + corr
    secco = (carico - solv) / carico * 100
    dens = 1.45
    cov = solv / carico * dens * 1000
    latte, kg_latta = 59, 20
    conf = latte * kg_latta
    resa = conf / carico * 100
    righe = "".join(
        f'<tr><td class="mono">{a}</td><td><i class="sq" style="background:{col}"></i>{b}</td><td class="mu">{f}</td><td class="r"><b>{_c_n(p,2)}</b></td><td class="r mono">{_c_n(p*lotto_teorico/100,1)}</td><td class="r mono">{_c_n(w,1)}</td><td class="mono mu">{l}</td></tr>'
        for a,b,f,p,w,l,col,_ in comp)
    stack = "".join(f'<i style="width:{p}%;background:{col}"></i>' for _,_,_,p,_,_,col,_ in comp)
    gruppi = {}
    for c in comp: gruppi[c[2]] = gruppi.get(c[2], 0) + c[3]
    ordine = [("Legante","#0b6e75"),("Pigmento","#3c98a0"),("Carica","#7fbcc1"),("Solvente","#d98a1f"),("Diluente","#5b6f8f"),("Additivo","#8c9ab3"),("Colore","#2f3a40")]
    leg = "".join(f'<span><i class="sq" style="background:{col}"></i>{g} <b>{_c_n(gruppi[g],1)}%</b></span>' for g,col in ordine)

    versioni = [
        ("v7", "In vigore", "ok", "12 nov 2026", "G. Dalla Costa", "Talco da 6,0 a 7,3%, solfato di bario da 15,8 a 14,5%", "3 lotti"),
        ("v6", "Sostituita", "mu", "3 mar 2026", "G. Dalla Costa", "Disperdente MP-4015 sostituito con MP-4021", "41 lotti"),
        ("v5", "Archiviata", "mu", "18 set 2025", "E. Pontarollo", "Xilene da 11,0 a 9,5%, metossipropanolo da 3,5 a 5,0%", "28 lotti"),
    ]
    vers = "".join(f'<div class="ver"><b class="mono vn{" on" if k=="ok" else ""}">{v}</b><div><div class="row"><b>{nota}</b></div><div class="sm">{d}, {chi}, {n}</div></div>{chip(st,k)}</div>' for v,st,k,d,chi,nota,n in versioni)

    accessi = [("24 nov, 16:02", "G. Dalla Costa", "Ricerca e sviluppo", "consultazione"), ("24 nov, 14:31", "E. Pontarollo", "Direzione tecnica", "autorizzazione correzione L-26-1147"), ("24 nov, 07:38", "M. Tessaro", "Produzione", "sole quantità di pesata")]
    acc = "".join(f'<div class="ar"><span class="mono">{a}</span><b>{b}</b><span>{c}</span><span class="mu">{d}</span></div>' for a,b,c,d in accessi)
    def gauge(v, mn, mx):
        if mn is not None and mx is not None: a, b, pos = 20, 80, 20 + (v-mn)/(mx-mn)*60
        elif mx is not None: a, b, pos = 0, 80, v/mx*80
        else: a, b, pos = 20, 100, min(94, 20 + (v-mn)/(mn*0.5)*80)
        return f'<div class="gg"><u style="left:{a}%;width:{b-a}%"></u><s style="left:{pos:.0f}%"></s></div>'
    ctrl = [  # parametro, metodo, unità, min, max, valore, decimali
        ("Viscosità a 25 °C", "MI-014", "cP", 2800, 3600, 3320, 0),
        ("Densità 20 °C", "ISO 2811", "kg/l", 1.42, 1.48, dens, 2),
        ("Residuo secco", "ISO 3251", "%", 84.0, 87.0, round(secco,1), 1),
        ("Finezza di macinazione", "ISO 1524", "µm", None, 20, 15, 0),
        ("Brillantezza 60°", "ISO 2813", "GU", 85, None, 91, 0),
        ("Colore, ΔE su RAL 7035", "MI-022", "", None, 1.0, 0.6, 1),
        ("Punto di infiammabilità", "ISO 3679", "°C", 23, None, 27, 0),
    ]
    def ok(v, mn, mx): return (mn is None or v >= mn) and (mx is None or v <= mx)
    conformi = sum(ok(v,mn,mx) for _,_,_,mn,mx,v,_ in ctrl)
    def spec(mn, mx, d, u):
        t = f"da {_c_n(mn,d)} a {_c_n(mx,d)}" if mn is not None and mx is not None else (f"massimo {_c_n(mx,d)}" if mx is not None else f"minimo {_c_n(mn,d)}")
        return f"{t} {u}".strip()
    rc = "".join(
        f'<div class="lr"><div><b>{p}</b><div class="sm">{spec(mn,mx,d,u)}, <span class="mono">{m}</span></div></div>{gauge(v,mn,mx)}<b class="mono val">{_c_n(v,d)}</b>{chip("Conforme","ok") if ok(v,mn,mx) else chip("Fuori","bad")}</div>'
        for p,m,u,mn,mx,v,d in ctrl)
    corre = [
        ("14:10", "Viscosità 3.740 cP, sopra il massimo di 3.600", "bad"),
        ("14:35", f"Aggiunta xilene {_c_n(corr,1)} kg ({_c_n(corr/tot_pes*100,1)}% sul pesato), autorizzata", "warn"),
        ("15:20", "Ricontrollo 3.320 cP, conforme. Lotto al filtraggio", "ok"),
    ]
    cr = "".join(f'<div class="cr"><span class="mono">{h}</span><i class="d-{k}"></i><span>{t}</span></div>' for h,t,k in corre)

    frasi = [("H226","Liquido e vapori infiammabili"),("H315","Provoca irritazione cutanea"),("H317","Può provocare reazione allergica cutanea"),("H319","Provoca grave irritazione oculare"),("H411","Tossico per gli organismi acquatici, lunga durata")]
    fr = "".join(f'<div class="hf"><b class="mono">{a}</b><span>{b}</span></div>' for a,b in frasi)
    docs = [("Scheda di sicurezza", "rev. 7.0, 13 nov 2026", "Allineata", "ok"), ("Etichetta CLP 20 kg", "rev. 7, 13 nov 2026", "Allineata", "ok"), ("Notifica UFI", "inviata il 16 nov 2026", "Allineata", "ok"), ("Scheda tecnica", "rev. 5, riporta la v6", "Da aggiornare", "warn")]
    allineati = sum(1 for d in docs if d[3]=="ok")
    dc = "".join(f'<div class="dc"><div><b>{a}</b><div class="sm">{b}</div></div>{chip(c,k)}</div>' for a,b,c,k in docs)
    scad = [("27 nov","ven","Registro rifiuti, 2 scarichi CER 08 01 11* da annotare","warn"),("30 nov","lun","Piano gestione solventi, consuntivo di novembre","info"),("15 dic","mar","SDS FRM-0388, nuova classificazione fornitore","info"),("31 gen","dom","Bilancio annuale dei solventi 2026","mu")]
    sc = "".join(f'<div class="sc"><div class="dt"><b>{a}</b><span>{g}</span></div><span>{t}</span><i class="d-{k}"></i></div>' for a,g,t,k in scad)

    rail = "".join(f'<a class="{"on" if on else ""}">{ic(i)}{"<b>"+b+"</b>" if b else ""}</a>' for i,on,b in [("c_flask",True,""),("layers",False,""),("box",False,""),("check",False,""),("shield",False,"1"),("c_leaf",False,"4"),("chart",False,"")])
    body = f'''<div class="cx">
<aside class="rail"><div class="sym">{_C_VB_SYM.replace("{c}", "#7fd6da")}</div>{rail}<span class="sp"></span><a>{ic("cog")}</a><span class="av">GD</span></aside>
<div class="cm">
<header class="ctop"><div class="brand">{LOGO["c_vb"]}</div><div class="crumb">Formule / Smalti epossidici / <b>FRM-0412</b></div>{tabs(["Composizione","Lotti","Sicurezza","Prove di laboratorio","Accessi"],"Composizione")}<span class="sp"></span><span class="pill">Stabilimento di Borgo Brenta</span><span class="pill">{ic("c_lock")}Ricerca e sviluppo</span></header>
<div class="cb">
<div class="h"><div><div class="eyebrow">Formula FRM-0412, componente A</div><h1>Smalto epossidico bicomponente, grigio RAL 7035</h1></div><div class="act">{chip("Versione 7 in vigore","ok")}{chip("Formula riservata, 4 utenti","mu")}<button class="btn">Confronta versioni</button><button class="btn p">Nuova versione</button></div></div>
<div class="cols">
<div class="col">
<div class="card"><div class="ct">Composizione v7<span>lotto standard {_c_n(lotto_teorico)} kg</span></div>
<table class="tf"><tr><th>Codice</th><th>Componente</th><th>Funzione</th><th class="r">% peso</th><th class="r">Teorico kg</th><th class="r">Pesato kg</th><th>Lotto MP</th></tr>{righe}
<tr class="tot"><td></td><td><b>Totale</b></td><td></td><td class="r"><b>{_c_n(tot_pct,2)}</b></td><td class="r mono"><b>{_c_n(lotto_teorico,1)}</b></td><td class="r mono"><b>{_c_n(tot_pes,1)}</b></td><td class="sm">10 lotti MP</td></tr></table>
<div class="stack">{stack}</div><div class="leg">{leg}</div></div>
<div class="card grow"><div class="ct">Versioni<span>ogni modifica è firmata e motivata</span></div>{vers}
<div class="acc"><div class="sm" style="margin-bottom:4px">{ic("c_lock")}Ultimi accessi alla formula completa</div>{acc}</div></div>
</div>
<div class="col">
<div class="card"><div class="ct">Lotto L-26-1147<span>{chip("In filtraggio","info")}</span></div>
<div class="lk"><div><small>Ordine</small><b class="mono">OP-5531</b></div><div><small>Dispersore</small><b>D2, 1.500 l</b></div><div><small>Inizio</small><b>24 nov, 07:40</b></div><div><small>Operatore</small><b>M. Tessaro</b></div></div></div>
<div class="card"><div class="ct">Controlli di laboratorio<span>{conformi} conformi su {len(ctrl)}, 24 nov 15:20</span></div>
<div class="lh"><span>Parametro e specifica</span><span>Posizione</span><span>Valore</span><span>Esito</span></div>{rc}</div>
<div class="card grow"><div class="ct">Correzioni e resa<span>1 correzione</span></div>{cr}
<div class="rs"><div><small>Carico totale</small><b>{_c_n(carico,1)} kg</b></div><div><small>Confezionato</small><b>{_c_n(conf)} kg</b><em>{latte} latte, {kg_latta} kg</em></div><div><small>Resa</small><b>{_c_n(resa,1)}%</b><em>attesa 97,0%</em></div><div><small>COV</small><b>{_c_n(cov)} g/l</b><em>limite 500 g/l</em></div></div></div>
</div>
<div class="col">
<div class="card"><div class="ct">Classificazione CLP<span>dalla formula v7</span></div>
<div class="row" style="gap:8px">{_c_ghs("fiamma")}{_c_ghs("escl")}{_c_ghs("ambiente")}<div style="margin-left:6px"><small class="sm">Avvertenza</small><b style="display:block;font-size:15px;font-weight:600">Attenzione</b></div></div>
<div style="margin-top:8px">{fr}</div></div>
<div class="card"><div class="ct">Documenti collegati<span>{allineati} su {len(docs)} allineati</span></div>{dc}</div>
<div class="card grow"><div class="ct">Scadenze ambientali<span>prossimi 70 giorni</span></div>{sc}</div>
</div>
</div></div></div></div>'''
    css = '''
.cx{display:grid;grid-template-columns:60px 1fr;grid-template-rows:900px;height:900px}
.rail{background:#0c2a2e;display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 0}
.rail .sym svg{width:30px;height:30px;margin-bottom:14px}
.rail a{width:40px;height:40px;border-radius:10px;display:grid;place-items:center;color:#8fb3b6;position:relative}
.rail a svg{width:18px;height:18px}
.rail a.on{background:#17474c;color:#fff;box-shadow:inset 3px 0 0 #7fd6da}
.rail a b{position:absolute;top:3px;right:3px;min-width:15px;height:15px;border-radius:8px;background:#d98a1f;color:#fff;font-size:9.500px;display:grid;place-items:center;font-weight:700}
.rail .av{background:#17474c;color:#cfeef0;margin-top:6px}
.cm{display:flex;flex-direction:column;min-width:0;min-height:0;overflow:hidden}
.ctop{height:56px;background:var(--card);border-bottom:1px solid var(--line);display:flex;align-items:center;gap:12px;padding:0 20px;flex:none}
.ctop .brand{padding:0 8px 0 0}.ctop .brand svg{height:28px}
.ctop .crumb{margin-right:6px;white-space:nowrap}.ctop .pill svg{width:14px;height:14px}
.cb{padding:14px 20px 16px;display:flex;flex-direction:column;gap:12px;flex:1;min-height:0}
.cols{display:grid;grid-template-columns:606px 1fr 292px;gap:12px;flex:1;min-height:0}
.col{display:flex;flex-direction:column;gap:12px;min-height:0;min-width:0}
.card{padding:12px 14px}.card.grow{flex:1;min-height:0;overflow:hidden}
.ct{margin-bottom:8px}
td{padding:5px 10px 5px 0;font-size:12px}th{padding:6px 10px 6px 0;font-size:11px}td.r,th.r{padding-right:10px}td .mono,td.mono{font-size:11.500px}
th:first-child,td:first-child{padding-left:8px}th:last-child,td:last-child{padding-right:8px}
td b{font-weight:600}
.sq{display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:7px}
.tot td{border-top:1.500px solid var(--ink);border-bottom:0}
.stack{display:flex;height:10px;border-radius:5px;overflow:hidden;margin-top:6px;gap:1px}.stack i{display:block}
.leg{display:flex;flex-wrap:wrap;gap:3px 12px;margin-top:8px;font-size:11.500px;color:var(--mut)}.leg b{color:var(--ink);font-weight:600}.leg .sq{margin-right:5px}
.ver{display:grid;grid-template-columns:34px 1fr auto;gap:10px;align-items:center;padding:4px 0;border-bottom:1px solid var(--line)}.ver:last-child{border:0}
.ver b{font-weight:600}.vn{height:26px;border-radius:7px;border:1px solid var(--line);display:grid;place-items:center;color:var(--mut)}.vn.on{background:var(--acc);border-color:var(--acc);color:#fff}
.lk{display:grid;grid-template-columns:repeat(4,auto);justify-content:space-between;gap:10px}.lk small,.rs small{display:block;color:var(--mut);font-size:11px}.lk b{font-weight:600}
.gg{position:relative;width:66px;height:6px;border-radius:3px;background:#e9eef0}.gg u{position:absolute;top:0;bottom:0;background:#bfe3d5;border-radius:3px}.gg s{position:absolute;top:-3px;width:3px;height:12px;border-radius:2px;background:var(--ink);margin-left:-1px}
.lh,.lr{display:grid;grid-template-columns:1fr 66px 46px 74px;gap:10px;align-items:center}
.lh{background:var(--bg);border-radius:8px;padding:6px 8px;font-size:11px;color:var(--mut)}.lh span:nth-child(n+3){text-align:right}
.lr{padding:5px 8px;border-bottom:1px solid var(--line)}.lr:last-child{border:0;padding-bottom:0}.lr b{font-weight:600}.lr .val{text-align:right}.lr .chip{justify-self:end}.lr .sm{font-size:11px}.lr .sm .mono{font-size:10.500px}
.acc{margin-top:5px;padding-top:7px;border-top:1px solid var(--line)}.acc .sm{display:flex;align-items:center;gap:6px}.acc svg{width:13px;height:13px}
.ar{display:grid;grid-template-columns:92px 104px 118px 1fr;gap:8px;font-size:11.500px;padding:2.500px 0}.ar b{font-weight:600}.ar .mono{font-size:11px;color:var(--mut)}.ar span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cr{display:grid;grid-template-columns:40px 9px 1fr;gap:9px;align-items:center;padding:4px 0;font-size:12px}.cr .mono{color:var(--mut)}
.d-ok,.d-warn,.d-bad,.d-info,.d-mu{width:8px;height:8px;border-radius:50%;flex:none}.d-ok{background:var(--ok)}.d-warn{background:#d98a1f}.d-bad{background:var(--bad)}.d-info{background:var(--acc)}.d-mu{background:#b8c2c4}
.rs{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:10px;padding-top:10px;border-top:1px solid var(--line)}.rs b{display:block;font-size:16px;font-weight:600;color:var(--strong)}.rs em{font-style:normal;font-size:11px;color:var(--mut)}
.ghs{width:46px;height:46px;flex:none}
.hf{display:grid;grid-template-columns:40px 1fr;gap:8px;padding:3px 0;font-size:12px;line-height:1.35}.hf b{font-weight:500;color:var(--strong)}
.dc{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 0;border-bottom:1px solid var(--line)}.dc:last-child{border:0;padding-bottom:0}.dc b{font-weight:600}
.sc{display:grid;grid-template-columns:48px 1fr 8px;gap:10px;align-items:center;padding:7px 0;border-bottom:1px solid var(--line);font-size:12px;line-height:1.35}.sc:last-child{border:0}
.sc .dt b{display:block;font-weight:600}.sc .dt span{color:var(--mut);font-size:11px}
'''
    return _c_doc("--acc:#0b6e75;--acc-soft:#e1f1f2;--bg:#f2f6f6;--line:#dfe7e8;--strong:#0d2b30;--ink:#172a2d;--mut:#637a7d;--info:#0b6e75;--info-bg:#e1f1f2", css, body)


# ── Media e comunicazione: piano editoriale a colonne, diritti, archivio ─────
_C_LM_SYM = '<svg viewBox="0 0 30 34"><path d="M13 3h4M10 9h10M7 15h16M4 21h22" stroke="#e2512f" stroke-width="3.400" stroke-linecap="round"/><path d="M15 26v6" stroke="{c}" stroke-width="3.400" stroke-linecap="round"/></svg>'
LOGO.update({
 "c_lm": _logo(_C_LM_SYM.replace("{c}", "#f4f1ea"),
   '<b style="font-family:Fraunces,serif;font-weight:700;font-size:21px;letter-spacing:-.01em;color:#f8f5ee;white-space:nowrap">Larice<span style="font-family:Poppins;font-size:9.500px;font-weight:500;letter-spacing:.28em;color:#b3ab9b;margin-left:7px">MEDIA</span></b>'),
})

@reg("media-comunicazione")
def _c_media():
    import datetime as _dt
    oggi = _dt.date(2026, 11, 25)
    sez = {"Cronaca":"#c8371f","Economia":"#1f5fa8","Cultura":"#7a4aa0","Sport":"#1d7f54","Territorio":"#a8741a","Video":"#33312c","Newsletter":"#0f7c86"}
    # sezione, titolo, autore, canali, quando, nota, tipo di nota, avanzamento (fatto, previsto) oppure None, uscita oggi
    col = [
     ("In scrittura", "#8d8676", [
        ("Economia","Distretto dell'occhiale, gli ordini tornano a salire","L. Bressan",["Sito","Newsletter"],"oggi 17:00","",None,(640,900),False),
        ("Cronaca","Nuovo ponte sul Soligo, il cantiere parte a gennaio","M. Zorzi",["Sito","App"],"oggi 18:30","",None,(310,700),False),
        ("Cultura","Intervista alla direttrice del Teatro Accademia","A. Fregonese",["Sito"],"gio 26","Trascrizione pronta, 42 min","ai",None,False),
        ("Territorio","Guida ai mercatini di dicembre in pedemontana","S. Pilotto",["Sito","Social"],"ven 27","",None,(180,1200),False),
        ("Sport","Volley, la vigilia del derby","D. Carniel",["Sito","App"],"sab 28","",None,None,False),
     ]),
     ("In revisione", "#c98a12", [
        ("Cronaca","Bilancio comunale, cosa cambia per le famiglie","E. Tonon",["Sito","Newsletter"],"oggi 16:00","Seconda lettura, P. Marcon","rev",None,False),
        ("Video","Dentro la cartiera che ricicla tutta l'acqua","G. Sartor",["Sito","Social"],"oggi 17:30","3 min 40 s, sottotitoli da rivedere","ai",None,False),
        ("Economia","Prosecco, export a +6% nei primi nove mesi","L. Bressan",["Sito"],"gio 26","2 commenti aperti","rev",None,False),
        ("Cultura","I libri della settimana","A. Fregonese",["Newsletter"],"ven 27","3 titoli proposti da rivedere","ai",None,False),
     ]),
     ("Approvato", "#1f5fa8", [
        ("Territorio","Piste ciclabili, la mappa dei nuovi tratti","S. Pilotto",["Sito","App"],"gio 26","Mappe: licenza in scadenza il 23 dic","warn",None,False),
        ("Sport","Calcio dilettanti, il punto dopo la 12ª giornata","D. Carniel",["Sito"],"gio 26","",None,None,False),
        ("Cronaca","Sanità, apre il nuovo punto prelievi a Villa Soligo","M. Zorzi",["Sito","App","Social"],"ven 27","",None,None,False),
        ("Economia","Fiera del mobile, trenta aziende del distretto in vetrina","L. Bressan",["Sito","Newsletter"],"ven 27","",None,None,False),
     ]),
     ("Programmato", "#7a4aa0", [
        ("Economia","Bonus energia, la guida per le imprese","L. Bressan",["Sito","Social"],"oggi 17:00","",None,None,True),
        ("Newsletter","La sera, edizione del 25 novembre","Redazione",["Newsletter"],"oggi 18:30","14.280 iscritti","mu",None,True),
        ("Cultura","Mostre, cosa vedere nel fine settimana","A. Fregonese",["Sito","App"],"gio 26, 07:00","",None,None,False),
        ("Video","Il cantiere della tangenziale visto dal drone","G. Sartor",["Sito","Social"],"gio 26, 12:00","Musica: licenza fino al 4 dic","warn",None,False),
     ]),
     ("Pubblicato oggi", "#1d7f54", [
        ("Newsletter","Il mattino, edizione del 25 novembre","Redazione",["Newsletter"],"06:45","Aperture 41%","mu",None,True),
        ("Cronaca","Maltempo, riaperta la provinciale dopo la frana","M. Zorzi",["Sito","App","Social"],"07:12","8.420 letture","mu",None,True),
        ("Economia","Artigiani, 120 assunzioni nel legno arredo","L. Bressan",["Sito","Newsletter"],"08:30","3.115 letture","mu",None,True),
        ("Sport","Basket, vittoria in trasferta al supplementare","D. Carniel",["Sito","App"],"09:05","2.640 letture","mu",None,True),
        ("Territorio","Scuole, il calendario degli open day","S. Pilotto",["Sito"],"10:40","1.980 letture","mu",None,True),
     ]),
    ]
    def card(c, fatto):
        s_, t, a, ch, q, nota, k, av, _ = c
        ini = "".join(w[0] for w in a.replace(".", "").split()[:2]) if a != "Redazione" else "R"
        extra = ""
        if av: extra = f'<div class="pr"><div class="bar"><i style="width:{round(av[0]/av[1]*100)}%"></i></div><span>{_c_n(av[0])} di {_c_n(av[1])} parole</span></div>'
        elif nota: extra = f'<div class="nt n-{k}">{"<em>AI</em>" if k=="ai" else ""}{nota}</div>'
        return (f'<div class="kc{" done" if fatto else ""}"><div class="row"><span class="sz" style="color:{sez[s_]}"><i style="background:{sez[s_]}"></i>{s_}</span><span class="sp"></span><span class="q">{q}</span></div>'
                f'<h3>{t}</h3>{extra}<div class="row ft"><span class="avm">{ini}</span><span class="au">{a}</span><span class="sp"></span>{"".join(f"<u>{x}</u>" for x in ch)}</div></div>')
    board = "".join(f'<div class="lane"><div class="lh"><i style="background:{cc}"></i><b>{n}</b><span>{len(cs)}</span><span class="sp"></span>{ic("c_plus") if i==0 else ""}</div>{"".join(card(c, n.startswith("Pubblicato")) for c in cs)}</div>' for i,(n,cc,cs) in enumerate(col))
    tutte = [c for _,_,cs in col for c in cs]
    n_tot = len(tutte); n_pub = len(col[4][2]); n_sera = sum(1 for c in col[3][2] if c[8])
    canali = ["Sito","Newsletter","App","Social"]
    usc = {x: (sum(1 for c in col[4][2] if x in c[3]), sum(1 for c in col[3][2] if c[8] and x in c[3])) for x in canali}
    mx = max(a+b for a,b in usc.values())
    cb = "".join(f'<div class="cn"><span>{x}</span><div class="cbar"><i style="width:{a/mx*100:.0f}%"></i><s style="width:{b/mx*100:.0f}%"></s></div><b>{a}</b><em>+{b}</em></div>' for x,(a,b) in usc.items())
    diritti = [  # asset, fornitore, uso consentito, scadenza, contenuti che lo usano, sfondo
        ("Archivio storico cartiera, 24 foto","Fondo fotografico Brandolin","Sito e app",_dt.date(2026,11,28),2,"linear-gradient(135deg,#8a7f6c,#3d382f)"),
        ("Brano «Aria aperta» per video","Suonoteca Altamarca","Sito e social",_dt.date(2026,12,4),1,"linear-gradient(135deg,#7a4aa0,#2c2140)"),
        ("Ritratti Teatro Accademia, 8 foto","R. Dal Bianco, fotografo","Solo sito",_dt.date(2026,12,15),1,"linear-gradient(135deg,#c8371f,#5a1c12)"),
        ("Cartografia piste ciclabili","Geomappe Triveneto","Sito e app",_dt.date(2026,12,23),1,"linear-gradient(135deg,#1d7f54,#11382a)"),
    ]
    mesi = ["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"]
    def dr(a, f, uso, sc, n, bg):
        g = (sc - oggi).days
        k = "bad" if g <= 7 else ("warn" if g <= 14 else "mu")
        return f'<div class="dr"><i style="background:{bg}"></i><div><b>{a}</b><small>{f}</small><small>{uso}, in {n} {"contenuto" if n==1 else "contenuti"}</small></div><div class="dd"><span class="chip c-{k}">{g} giorni</span><small>{sc.day} {mesi[sc.month-1]}</small></div></div>'
    dl = "".join(dr(*d) for d in diritti)
    asset = [("FOTO","frana, strada, cantiere","linear-gradient(160deg,#9a8f7d,#4a4338)"),("VIDEO","drone, tangenziale","linear-gradient(160deg,#5f7f93,#1f3340)"),("FOTO","teatro, ritratto","linear-gradient(160deg,#b0553f,#40170f)"),
             ("AUDIO","intervista, 42 min","linear-gradient(160deg,#6c5a86,#261d36)"),("FOTO","basket, palazzetto","linear-gradient(160deg,#3f8f6c,#143325)"),("FOTO","mercatini, piazza","linear-gradient(160deg,#c59a45,#5a4113)")]
    th = "".join(f'<div class="as" style="background:{bg}"><em>{t}</em><span>{tg}</span></div>' for t,tg,bg in asset)
    menu = [("Piano editoriale",""),("Redazione",""),("Archivio",""),("Diritti",str(len(diritti))),("Distribuzione",""),("Collaboratori","")]
    mn = "".join(f'<a class="{"on" if i==0 else ""}">{n}{"<b>"+b+"</b>" if b else ""}</a>' for i,(n,b) in enumerate(menu))
    body = f"""<div class="mx">
<header class="mtop"><div class="brand">{LOGO["c_lm"]}</div><nav>{mn}</nav><span class="sp"></span><div class="msearch">{ic("search")}Cerca in archivio<kbd>/</kbd></div><div class="mbell">{ic("bell")}<i>3</i></div><span class="av">PM</span><div class="who"><b>Paola Marcon</b><small>Caporedattrice</small></div></header>
<div class="msub"><div><div class="eyebrow">La Gazzetta del Montello</div><h1>Piano editoriale, settimana 48</h1></div>{tabs(["Bacheca","Calendario","Elenco"],"Bacheca")}<div class="fl"><span class="on">Tutte le sezioni</span><span>Cronaca</span><span>Economia</span><span>Cultura</span></div><span class="sp"></span><span class="sm"><b>mer 25 nov, {n_tot} contenuti nel piano</b><br>{n_pub} pubblicati oggi, {n_sera} in uscita entro stasera</span><button class="btn p">{ic("c_plus")}Nuovo contenuto</button></div>
<div class="mbody"><div class="board">{board}</div>
<aside class="mside">
<div class="card"><div class="ct">Diritti in scadenza<span>entro 30 giorni</span></div>{dl}</div>
<div class="card"><div class="ct">Uscite di oggi<span>pubblicate, in coda</span></div>{cb}</div>
<div class="card grow"><div class="ct">Archivio, ultimi caricati<span>184.320 asset</span></div><div class="asg">{th}</div><div class="sm" style="margin-top:8px">Etichette proposte, da confermare</div></div>
</aside></div></div>"""
    css = """
body{background:var(--bg)}
.mx{display:grid;grid-template-columns:1440px;grid-template-rows:54px 66px 780px;height:900px}.mx>*{min-width:0}
.mtop{background:#1b1a17;color:#d9d3c6;display:flex;align-items:center;gap:14px;padding:0 22px}
.mtop .brand{padding:0 14px 0 0}.mtop .brand svg{height:26px}
.mtop nav{display:flex;gap:2px;height:100%}
.mtop nav a{display:flex;align-items:center;gap:7px;padding:0 13px;font-weight:500;color:#b9b2a3;border-bottom:2px solid transparent;border-top:2px solid transparent}
.mtop nav a.on{color:#fff;border-bottom-color:#e2512f}
.mtop nav b{background:#e2512f;color:#fff;border-radius:9px;font-size:10.500px;padding:0 6px;font-weight:600}
.msearch{width:270px;height:32px;border-radius:8px;background:#2a2824;display:flex;align-items:center;gap:8px;padding:0 10px;color:#958e80}
.msearch svg{width:14px;height:14px}.msearch kbd{margin-left:auto;font:inherit;font-size:11px;border:1px solid #45423b;border-radius:4px;padding:0 6px}
.mbell{position:relative;width:32px;height:32px;display:grid;place-items:center;color:#d9d3c6}.mbell svg{width:17px;height:17px}.mbell i{position:absolute;top:0;right:0;min-width:15px;height:15px;border-radius:8px;background:#e2512f;color:#fff;font-size:9.500px;font-style:normal;font-weight:700;display:grid;place-items:center}
.mtop .av{background:#3a372f;color:#f4f1ea}.who b{display:block;font-weight:600;color:#f4f1ea;line-height:1.2}.who small{color:#958e80;font-size:11px}
.msub{display:flex;align-items:center;gap:14px;padding:0 22px;background:var(--card);border-bottom:1px solid var(--line)}
.msub h1{font-family:Fraunces,serif;font-size:21px;font-weight:600;letter-spacing:-.01em;color:var(--strong);line-height:1.15;white-space:nowrap}
.eyebrow{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--acc);font-weight:600}
.fl{display:flex;gap:2px}.fl span{white-space:nowrap;padding:5px 9px;border-radius:7px;color:var(--mut);font-size:12px}.fl span.on{background:var(--acc-soft);color:var(--acc);font-weight:600}
.msub .btn svg{width:13px;height:13px}.msub .sm{text-align:right;line-height:1.35;font-size:11.500px;white-space:nowrap}.msub .sm b{color:var(--ink);font-weight:600}.msub .btn{white-space:nowrap}.msub .eyebrow{white-space:nowrap}.msearch{white-space:nowrap}
.mbody{display:grid;grid-template-columns:1fr 292px;gap:10px;padding:12px 18px 14px;min-height:0}
.board{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;min-height:0}
.lane{background:#ebe6db;border-radius:12px;padding:7px;display:flex;flex-direction:column;gap:7px;min-width:0;overflow:hidden}
.lh{display:flex;align-items:center;gap:7px;padding:3px 4px 2px}.lh i{width:8px;height:8px;border-radius:50%}.lh b{font-weight:600;color:var(--strong)}.lh span{color:var(--mut);font-size:11.500px;font-weight:600}.lh svg{width:14px;height:14px;color:var(--mut)}
.kc{background:var(--card);border:1px solid var(--line);border-radius:9px;padding:9px 9px 8px;box-shadow:0 1px 1px #2a25180d}
.kc.done{background:#fbfaf6}
.sz{display:inline-flex;align-items:center;gap:5px;font-size:9.500px;font-weight:700;letter-spacing:.1em;text-transform:uppercase}.sz i{width:3px;height:10px;border-radius:2px}
.q{font-size:11px;color:var(--mut);white-space:nowrap}
.kc h3{font-family:Fraunces,serif;font-size:14px;font-weight:600;line-height:1.22;color:var(--strong);margin:5px 0 6px;letter-spacing:-.005em}
.pr{display:flex;align-items:center;gap:7px;margin-bottom:7px}.pr .bar{flex:1;height:4px;min-width:30px;background:#ece8de}.pr span{font-size:10.500px;color:var(--mut);white-space:nowrap}
.nt{font-size:11px;line-height:1.3;margin-bottom:7px;color:var(--mut);display:flex;gap:5px;align-items:baseline}
.nt em{font-style:normal;font-size:9px;font-weight:700;letter-spacing:.06em;border:1px solid #cfc8b8;border-radius:4px;padding:0 4px;color:#6b6557;flex:none}
.n-warn{color:var(--warn);font-weight:500}.n-rev{color:#8a6410}
.ft{gap:4px}.au{min-width:0;overflow:hidden;text-overflow:ellipsis}.ft u{flex:none}.avm{width:18px;height:18px;border-radius:50%;background:#ece8de;color:#5d574a;font-size:8.500px;font-weight:700;display:grid;place-items:center;flex:none}
.au{font-size:11px;color:var(--ink);white-space:nowrap}
.ft u{text-decoration:none;font-size:9.500px;font-weight:600;color:#6b6557;background:#f1ede4;border-radius:4px;padding:1px 4px}
.mside{display:flex;flex-direction:column;gap:10px;min-height:0}.mside .card{padding:12px 14px}.mside .grow{flex:1;min-height:0;overflow:hidden}
.mside .ct{margin-bottom:6px}
.dr{display:grid;grid-template-columns:34px 1fr auto;gap:9px;padding:8px 0;border-bottom:1px solid var(--line);align-items:start}.dr:last-child{border:0;padding-bottom:0}
.dr>i{width:34px;height:34px;border-radius:6px;display:block;margin-top:2px}
.dr b{font-weight:600;font-size:12px;line-height:1.25;display:block;color:var(--strong)}.dr small{display:block;color:var(--mut);font-size:11px;line-height:1.35}
.dd{text-align:right}.dd .chip{height:20px;font-size:11px}
.cn{display:grid;grid-template-columns:70px 1fr 14px 20px;gap:8px;align-items:center;padding:4px 0}.cn b{font-weight:600;text-align:right}.cn em{font-style:normal;color:var(--mut);font-size:11.500px}
.cbar{display:flex;height:8px;gap:2px}.cbar i{background:var(--strong);border-radius:3px;display:block}.cbar s{background:repeating-linear-gradient(135deg,#c9c1b0 0 3px,#e6e0d3 3px 6px);border-radius:3px;display:block}
.asg{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.as{height:62px;border-radius:7px;position:relative;overflow:hidden;color:#fff}
.as em{position:absolute;top:5px;left:5px;font-style:normal;font-size:8.500px;font-weight:700;letter-spacing:.08em;background:#0007;border-radius:3px;padding:1px 4px}
.as span{position:absolute;left:5px;right:5px;bottom:4px;font-size:9.500px;line-height:1.2;opacity:.92}
"""
    return _c_doc("--acc:#c8371f;--acc-soft:#f8e6e1;--bg:#f4f1ea;--card:#fff;--line:#e4dfd3;--strong:#1b1a17;--ink:#2a2824;--mut:#7d7667;--warn:#a8590b;--warn-bg:#fbeed6;--bad:#b3261a;--bad-bg:#fbe4e0", css, body, "&family=Fraunces:opsz,wght@9..144,600;9..144,700")


# ── Pubblica Amministrazione: scrivania delle pratiche di un comune ──────────
LOGO.update({
 "c_bsv": _logo('<svg viewBox="0 0 30 36"><path d="M6 2h3v2.500h3V2h6v2.500h3V2h3v5H6z" fill="#e3c98a"/><path d="M3 9h24v12c0 7-5 11.500-12 13.500C8 32.500 3 28 3 21z" fill="#f4f7fb" stroke="#e3c98a" stroke-width="1.600"/><path d="M11.500 22v-8h-1.200v-2.600h2v1.200h1.600v-1.200h2.200v1.200h1.600v-1.200h2v2.600h-1.200v8z" fill="#17324d"/><path d="M14 22v-3a1 1 0 0 1 2 0v3z" fill="#f4f7fb"/><path d="M6 25.500c1.500-1.200 3-1.200 4.500 0s3 1.200 4.500 0 3-1.200 4.500 0 3 1.200 4.500 0" fill="none" stroke="#2f6fb5" stroke-width="1.700" stroke-linecap="round"/></svg>',
   '<span style="font-family:Titillium Web;font-size:10.500px;letter-spacing:.14em;text-transform:uppercase;color:#a9bdd1;font-weight:600;display:block">Comune di</span><b style="font-family:Titillium Web;font-weight:700;font-size:17px;color:#fff;white-space:nowrap">Borgo San Vito</b>'),
})

@reg("pubblica-amministrazione")
def _c_pa():
    import datetime as _dt
    oggi = _dt.date(2026, 11, 25)
    mesi = ["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"]
    gsett = ["lun","mar","mer","gio","ven","sab","dom"]
    def dm(d): return f"{d.day} {mesi[d.month-1]}"
    D = _dt.date
    # protocollo, data, procedimento, oggetto, richiedente, accesso, responsabile, stato, termine in giorni, sospesa dal
    pr = [
        ("0018442", D(2026,10,28), "Certificato di destinazione urbanistica", "Foglio 12, mappali 318 e 321", "Studio tecnico Zanin", "SPID", "geom. D. Sandri", "In istruttoria", 30, None),
        ("0018615", D(2026,10,30), "SCIA edilizia", "Ristrutturazione interna, via Roma 41", "B. T., privato", "CIE", "arch. L. Moretto", "In istruttoria", 30, None),
        ("0018871", D(2026,11,4), "Agibilità, segnalazione certificata", "Bifamiliare, via dei Tigli 7", "Edilcasa Sile srl", "SPID", "ing. C. Favaro", "Verifica completezza", 30, None),
        ("0019204", D(2026,11,10), "Occupazione di suolo pubblico", "Ponteggio, piazza del Mercato 3", "Condominio Le Robinie", "SPID", "geom. D. Sandri", "Parere richiesto", 30, None),
        ("0019377", D(2026,11,12), "Accesso agli atti edilizi", "Pratica edilizia 114 del 1998", "M. G., privato", "CIE", "geom. D. Sandri", "In istruttoria", 30, None),
        ("0019630", D(2026,11,17), "CILA", "Manutenzione straordinaria, via Piave 22", "A. R., privato", "SPID", "arch. L. Moretto", "Verifica completezza", 30, None),
        ("0017980", D(2026,10,19), "Autorizzazione paesaggistica semplificata", "Rifacimento copertura, via dei Molini 14", "F. D., privato", "SPID", "arch. L. Moretto", "In istruttoria", 60, None),
        ("0019811", D(2026,11,19), "Passo carrabile", "Nuovo accesso, via Cal di Mezzo 9", "Officina Baldan snc", "SPID", "ing. C. Favaro", "Parere richiesto", 30, None),
        ("0016920", D(2026,10,5), "Permesso di costruire", "Ampliamento capannone, via Artigianato 18", "Tessitura Grappa spa", "SPID", "ing. C. Favaro", "Integrazioni richieste", 90, D(2026,11,13)),
        ("0019902", D(2026,11,20), "Autorizzazione insegna di esercizio", "Insegna luminosa, corso Garibaldi 56", "Forneria Dal Molin", "CIE", "", "Da assegnare", 60, None),
    ]
    def rim(r):
        fine = r[9] or oggi
        return r[8] - (fine - r[1]).days
    pr.sort(key=rim)
    stile = {"In istruttoria":"info","Verifica completezza":"mu","Parere richiesto":"pu","Integrazioni richieste":"warn","Da assegnare":"dk"}
    SEL = "0017980"
    def riga(r):
        n, d, proc, ogg, rich, acc, resp, st, term, sosp = r
        g = rim(r); usati = term - g
        colr = "var(--bad)" if g <= 7 else ("var(--warn)" if g <= 15 else "var(--acc)")
        if sosp: tt = f'<b>{g} giorni</b><small>su {term}, sospeso dal {dm(sosp)}</small>'; colr = "#9aa7b5"
        else: tt = f'<b style="color:{colr if g<=7 else "inherit"}">{g} giorni</b><small>su {term}, entro il {dm(d+_dt.timedelta(days=term))}</small>'
        return (f'<tr class="{"sel" if n==SEL else ""}"><td><b class="mono">{n}</b><small>{gsett[d.weekday()]} {dm(d)}</small></td><td><b>{proc}</b><small>{ogg}</small></td><td>{rich}<small>accesso {acc}</small></td>'
                f'<td><span class="chip c-{stile[st]}">{st}</span><small>{resp or "proposto: SUAP"}</small></td><td class="tm">{tt}<div class="bar"><i style="width:{usati/term*100:.0f}%;background:{colr}"></i></div></td></tr>')
    righe = "".join(riga(r) for r in pr)
    conta = {}
    for r in pr: conta[r[7]] = conta.get(r[7], 0) + 1
    in_scad = sum(1 for r in pr if not r[9] and rim(r) <= 7)
    segc = {"In istruttoria":"var(--acc)","Verifica completezza":"#8a97a6","Parere richiesto":"#7557b8","Integrazioni richieste":"#c98112","Da assegnare":"#17324d"}
    seg = "".join(f'<div class="sg"><i style="background:{segc[k]}"></i><span>{k}</span><b>{conta[k]}</b></div>' for k in segc)
    segbar = "".join(f'<i style="flex:{conta[k]};background:{segc[k]}"></i>' for k in segc)

    s_ = next(r for r in pr if r[0] == SEL)
    g = rim(s_); usati = s_[8] - g; scad = s_[1] + _dt.timedelta(days=s_[8])
    passi = [
        ("Istanza presentata online", "19 ott, 09:14", "Accesso con SPID, 7 allegati", "ok"),
        ("Protocollazione automatica", "19 ott, 09:14", "Protocollo generale n. 0017980", "ok"),
        ("Diritti di segreteria", "19 ott, 09:21", "64,00 € pagati con pagoPA", "ok"),
        ("Assegnazione all'ufficio", "20 ott, 08:40", "Smistamento proposto, confermato da M. Bortolin", "ok"),
        ("Verifica di completezza", "23 ott, 11:05", "Documentazione completa", "ok"),
        ("Istruttoria tecnica", "dal 26 ott", "arch. L. Moretto, relazione in stesura", "now"),
        ("Commissione locale per il paesaggio", "gio 3 dic", "Seduta n. 11, iscritta all'ordine del giorno", "todo"),
        ("Provvedimento del responsabile", f"entro {gsett[scad.weekday()]} {dm(scad)}", "Firma digitale del dirigente", "todo"),
        ("Comunicazione al cittadino", "", "Area personale e posta certificata", "todo"),
    ]
    fatti = sum(1 for x in passi if x[3] == "ok")
    it = "".join(f'<div class="ps {k}"><i>{ic("check") if k=="ok" else ""}</i><div><div class="row"><b>{a}</b><span class="sp"></span><span class="mono">{b}</span></div><small>{c}</small></div></div>' for a,b,c,k in passi)
    body = f"""<div class="h"><div><div class="eyebrow">Sportello unico per l'edilizia</div><h1>Scrivania delle pratiche</h1></div><div class="act"><button class="btn">Esporta registro</button><button class="btn p">Nuova protocollazione</button></div></div>
<div class="card strip"><div class="sgs">{seg}<div class="sg tot"><span>Sulla scrivania</span><b>{len(pr)}</b></div><div class="sg al"><span>Scadono entro 7 giorni</span><b>{in_scad}</b></div></div><div class="sbar">{segbar}</div></div>
<div class="g" style="grid-template-columns:1fr 380px;flex:1;min-height:0">
<div class="card lst"><div class="filters" style="margin-bottom:8px"><span class="on">Tutte</span><span>Assegnate a me</span><span>Da assegnare</span><span>Sospese</span><span class="ord">Ordinate per giorni rimasti</span><em>{ic("search")}Cerca protocollo</em></div>
<table><tr><th>Protocollo</th><th>Procedimento</th><th>Richiedente</th><th>Stato e responsabile</th><th>Termine di legge</th></tr>{righe}</table></div>
<div class="card det"><div class="row"><span class="mono pn">Prot. 2026/{s_[0]}</span><span class="sp"></span><span class="chip c-info">{s_[7]}</span></div>
<h2>{s_[2]}</h2><p class="sm">{s_[3]}. Richiedente {s_[4]}, presentata {gsett[s_[1].weekday()]} {dm(s_[1])} 2026</p>
<div class="tl"><div class="row"><span>Termine di {s_[8]} giorni</span><span class="sp"></span><b>{g} giorni rimasti</b></div><div class="bar"><i style="width:{usati/s_[8]*100:.0f}%"></i></div><div class="row sm"><span>{usati} trascorsi</span><span class="sp"></span><span>scade {gsett[scad.weekday()]} {dm(scad)} 2026</span></div></div>
<div class="ct" style="margin:10px 0 4px">Iter della pratica<span>{fatti} passi su {len(passi)}</span></div><div class="iter">{it}</div>
<div class="row dact"><button class="btn">7 allegati</button><button class="btn">Integrazioni</button><span class="sp"></span><button class="btn p">Apri istruttoria</button></div></div></div>"""
    n = nav([("Scrivania","c_inbox",str(len(pr))),("Protocollo","file",""),("Istanze online","c_send",""),("Pagamenti","c_euro",""),("Atti e provvedimenti","c_pen",""),("Cittadini e imprese","users",""),("Statistiche","chart","")],"Scrivania")
    css = """
body{font-family:'Titillium Web',Poppins,sans-serif;font-size:13.500px}.app{grid-template-columns:212px 1fr;grid-template-rows:900px}.main{min-height:0}.bell{color:var(--strong)}.body{padding:18px 22px}
.side{border-right:0}.brand{padding-bottom:10px}.brand svg{height:38px}.brand span{line-height:1.1}
.ws{color:#8fb0d1}.nav a{font-size:13.500px;font-weight:600}.nav a.on{background:#234a70;color:#fff;box-shadow:inset 3px 0 0 #e3c98a}
.nav b{background:#2b5279;color:#d5e2ef}.nav a.on b{background:#e3c98a;color:#17324d}
.me{border-top-color:#2b4a69}.me b{color:#fff}.me small{color:#9fb5cb}.me .av{background:#234a70;color:#fff}.me svg{color:#9fb5cb}
.tabs span{font-weight:600}.pill{font-weight:600}.btn{font-weight:600;border-radius:4px}.chip{border-radius:4px;font-size:12px}.card{border-radius:6px}.tabs,.tabs span{border-radius:5px}
.h h1{font-size:23px;font-weight:700}.h .eyebrow{font-size:11px}
.c-pu{background:#eee9f8;color:#5b3fa0}.c-dk{background:#17324d;color:#fff}.c-mu{background:#e9edf2;color:#4a5a6b}
.strip{padding:10px 16px 12px}.sgs{display:flex;align-items:center}.sg{display:flex;align-items:center;gap:8px;padding-right:16px;margin-right:16px;border-right:1px solid var(--line);white-space:nowrap}
.sg i{width:9px;height:9px;border-radius:2px}.sg b{font-size:19px;font-weight:700;color:var(--strong)}.sg span{color:var(--ink);font-weight:600;font-size:13px}
.sg.tot{margin-left:auto;border-right:1px solid var(--line)}.sg.al{border:0;margin:0;padding:0}.sg.al b,.sg.al span{color:var(--bad)}
.sbar{display:flex;gap:2px;height:5px;margin-top:9px}.sbar i{display:block;border-radius:2px}
.lst{padding:12px 14px;overflow:hidden}.filters span{font-size:13px;font-weight:600}.filters .ord{margin-left:8px;color:var(--mut);font-weight:400;border-left:1px solid var(--line);border-radius:0;padding-left:14px}.filters em{width:190px;margin-left:auto;border-radius:4px;white-space:nowrap}
th{font-size:12px;font-weight:600;border-radius:0!important}td{padding:6.500px 10px 6.500px 0;line-height:1.3;vertical-align:middle;font-size:13px}td .chip{margin-bottom:2px}
td b{font-weight:600;color:var(--strong)}td small{display:block;color:var(--mut);font-size:12px}td .mono{font-size:12px}
tr.sel td{background:#eaf2fb}tr.sel td:first-child{box-shadow:inset 3px 0 0 var(--acc)}
.tm{width:136px}.tm .bar{margin-top:4px;height:4px}
.det{padding:14px 16px;display:flex;flex-direction:column;border-top:3px solid var(--acc)}
.pn{color:var(--mut)}.det h2{font-size:18px;font-weight:700;color:var(--strong);margin:6px 0 2px;line-height:1.2}.det .sm{font-size:12.500px;line-height:1.4}
.tl{background:var(--bg);border-radius:5px;padding:9px 11px;margin-top:10px}.tl b{font-weight:700;color:var(--strong)}.tl .bar{margin:6px 0 4px}
.iter{position:relative}.ps{display:grid;grid-template-columns:20px 1fr;gap:10px;padding:4.500px 0;position:relative}
.ps::before{content:'';position:absolute;left:9.500px;top:22px;bottom:-6px;width:1.500px;background:var(--line)}.ps:last-child::before{display:none}.ps.ok::before{background:var(--acc)}
.ps i{width:20px;height:20px;border-radius:50%;border:1.500px solid #c3cdd8;background:#fff;display:grid;place-items:center;margin-top:1px;z-index:1}
.ps.ok i{background:var(--acc);border-color:var(--acc);color:#fff}.ps i svg{width:13px;height:13px}.ps i svg circle{display:none}
.ps.now i{border-color:var(--acc);box-shadow:0 0 0 3px #d3e4f7}.ps.now i::after{content:'';width:8px;height:8px;border-radius:50%;background:var(--acc)}
.ps b{font-weight:600;color:var(--strong);font-size:13px}.ps.todo b{color:var(--mut);font-weight:600}.ps small{color:var(--mut);font-size:12px;display:block;line-height:1.3}.ps .mono{font-size:11px;color:var(--mut)}
.dact .btn{white-space:nowrap}.dact{margin-top:auto;padding-top:10px;border-top:1px solid var(--line);gap:8px}
"""
    return page("pa", "--acc:#0066cc;--acc-soft:#e3eefa;--bg:#f2f5f8;--line:#dde3ea;--strong:#17324d;--ink:#1f2d3d;--mut:#5c6f82;--side:#17324d;--side-ink:#c9d6e3;--info:#0059b3;--info-bg:#e3eefa;--warn:#995c00;--warn-bg:#fdf0d9", "", LOGO["c_bsv"], n, "Scrivania", "Laura Moretto", "Istruttore tecnico", "",
        tabs(["Le mie pratiche","Ufficio","Scadenze","Archivio"],"Ufficio")+'<span class="pill">Settore Edilizia e territorio</span><span class="pill"><i class="dot"></i>Protocollo allineato, 25 nov 10:32</span>', body, css, ws="Sportello pratiche", avvisi=in_scad, fonts="&family=Titillium+Web:wght@400;600;700")


# ── Studi professionali: settimana, incarichi, ore e portale clienti ─────────
LOGO.update({
 "c_tb": _logo('<svg viewBox="0 0 32 32"><rect x="2.500" y="2.500" width="27" height="27" rx="3" fill="#4a3aa7"/><path d="M8 24V8h16" fill="none" stroke="#fff" stroke-width="2.400" stroke-linecap="square"/><path d="M8 13.500a10.500 10.500 0 0 1 10.500 10.500" fill="none" stroke="#c9bff5" stroke-width="2"/><path d="M8 24 24 8" stroke="#c9bff5" stroke-width="1.400"/><circle cx="8" cy="24" r="2.300" fill="#fff"/></svg>',
   '<b style="font-family:Manrope;font-weight:800;font-size:15.500px;letter-spacing:-.02em;color:#221b4d;white-space:nowrap">Tessari Bonfanti<br><span style="font-size:8.500px;font-weight:600;letter-spacing:.12em;color:#766f96">INGEGNERIA E ARCHITETTURA</span></b>'),
})

@reg("studi-professionali")
def _c_studio():
    import datetime as _dt
    oggi = _dt.date(2026, 11, 25)
    mesi = ["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"]
    gnome = ["Lunedì","Martedì","Mercoledì","Giovedì","Venerdì"]
    costo_h = 48
    # codice, incarico, cliente, responsabile, fase, n. fase su 5, ore previste, ore registrate, avanzamento %, compenso
    inc = [
        ("26-031","Direzione lavori scuola primaria","Comune di Pieve Alta","E. Tessari","Direzione lavori",4,620,498,82,58000),
        ("26-044","Progetto esecutivo capannone logistico","Trasporti Vendramin srl","G. Bonfanti","Esecutivo",3,480,352,60,41500),
        ("26-052","Adeguamento sismico palazzina uffici","Immobiliare Ca' Lunga","G. Bonfanti","Definitivo",2,340,121,40,29800),
        ("26-058","Pratica antincendio magazzino","Cartotecnica Sile spa","M. Dal Pos","Deposito",4,120,96,85,9600),
        ("26-063","Ristrutturazione villa bifamiliare","Fam. D. R.","S. Girardi","Autorizzazioni",2,260,88,35,22400),
        ("26-067","Collaudo statico passerella ciclabile","Unione montana del Cesen","E. Tessari","Collaudo",5,90,84,95,8200),
        ("26-071","Diagnosi energetica stabilimento","Fonderie Rosada","L. Fabris","Rilievo",1,150,34,24,13500),
        ("26-074","Piano di sicurezza di cantiere","Edil Piavesella","M. Dal Pos","Prima emissione",1,70,12,18,5900),
    ]
    def proj(r): return round(r[7] / (r[8] / 100))
    def marg(r): return (1 - proj(r) * costo_h / r[9]) * 100
    oltre = [r for r in inc if proj(r) > r[6]]
    def riga(r):
        c, t, cl, resp, fase, nf, prev, reg_, av, comp = r
        pj = proj(r); over = pj > prev
        steps = "".join(f'<i class="{"d" if i < nf else ("c" if i == nf else "")}"></i>' for i in range(1, 6))
        return (f'<tr><td><div class="row" style="gap:8px"><span class="mono cd">{c}</span><b>{t}</b></div><small>{cl}, {resp}</small></td>'
                f'<td><div class="fs">{steps}</div><small>{fase}, {nf} di 5</small></td>'
                f'<td><div class="row" style="gap:8px"><div class="bar" style="flex:1"><i style="width:{min(100, reg_/prev*100):.0f}%;background:{"var(--bad)" if over else "var(--acc)"}"></i></div><b class="pc">{reg_/prev*100:.0f}%</b></div><small>{reg_} di {prev} h, lavoro al {av}%</small></td>'
                f'<td class="r"><b style="color:{"var(--bad)" if over else "inherit"}">{pj} h</b><small>{"+" if pj-prev>0 else "-"}{abs(pj-prev)} h</small></td>'
                f'<td class="r"><b>{_c_n(comp)} €</b><small>costo {_c_n(pj*costo_h)} €</small></td><td class="r"><b class="mg{" lo" if marg(r) < 35 else ""}">{marg(r):.0f}%</b></td></tr>')
    righe = "".join(riga(r) for r in inc)
    t_prev = sum(r[6] for r in inc); t_reg = sum(r[7] for r in inc); t_comp = sum(r[9] for r in inc); t_pj = sum(proj(r) for r in inc)
    t_marg = (1 - t_pj * costo_h / t_comp) * 100
    tot = (f'<tr class="tot"><td><b>{len(inc)} incarichi aperti</b></td><td></td><td><b>{_c_n(t_reg)} di {_c_n(t_prev)} h</b></td><td class="r"><b>{_c_n(t_pj)} h</b></td><td class="r"><b>{_c_n(t_comp)} €</b></td><td class="r"><b>{t_marg:.0f}%</b></td></tr>')

    # giorno (0 = lunedì 23), cliente, adempimento, incarico, stato
    sca = [
        (0,"Comune di Pieve Alta","Stato di avanzamento n. 4, contabilità","26-031","ok"),
        (0,"Fonderie Rosada","Sopralluogo e rilievi in stabilimento","26-071","ok"),
        (1,"Cartotecnica Sile spa","Deposito SCIA antincendio","26-058","ok"),
        (1,"Immobiliare Ca' Lunga","Invio modello di calcolo al verificatore","26-052","ok"),
        (2,"Trasporti Vendramin srl","Tavole strutturali, rev. C","26-044","now"),
        (2,"Fam. D. R.","Integrazioni alla pratica edilizia","26-063","todo"),
        (2,"Comune di Pieve Alta","Riunione di cantiere, ore 15:00","26-031","todo"),
        (3,"Unione montana del Cesen","Certificato di collaudo statico","26-067","todo"),
        (3,"Immobiliare Ca' Lunga","Relazione di calcolo al cliente","26-052","todo"),
        (4,"Edil Piavesella","Piano di sicurezza, prima emissione","26-074","todo"),
        (4,"Studio","Fatture di fine mese, 4 fasi concluse","","todo"),
    ]
    chiuse = sum(1 for x in sca if x[4] == "ok"); aperte = len(sca) - chiuse
    lun = _dt.date(2026, 11, 23)
    def giorno(i):
        d = lun + _dt.timedelta(days=i); it = [x for x in sca if x[0] == i]
        ev = "".join(f'<div class="ev {k}"><i></i><div><b>{ad}</b><small>{cl}{"<span class=mono>"+cd+"</span>" if cd else ""}</small></div></div>' for _,cl,ad,cd,k in it)
        return f'<div class="day{" today" if d == oggi else ""}"><div class="dh"><b>{gnome[i]} {d.day}</b>{"<em>oggi</em>" if d == oggi else ""}<span class="sp"></span><span>{len(it)}</span></div>{ev}</div>'
    sett = "".join(giorno(i) for i in range(5))

    atteso = 24  # lunedì, martedì e mercoledì
    ts = [("E. Tessari",22.5),("G. Bonfanti",24.0),("M. Dal Pos",19.0),("S. Girardi",24.5),("L. Fabris",16.0)]
    t_ts = sum(h for _,h in ts)
    tsr = "".join(f'<div class="tr"><span>{n}</span><div class="bar"><i style="width:{min(100,h/atteso*100):.0f}%;background:{"#d0871e" if h < atteso-6 else "var(--acc)"}"></i></div><b>{_c_n(h,1)} h</b></div>' for n,h in ts)
    doc = [
        ("Fam. D. R.","Atto di proprietà e visura catastale","26-063",_dt.date(2026,11,12),2),
        ("Immobiliare Ca' Lunga","Relazione geologica del 2019","26-052",_dt.date(2026,11,16),1),
        ("Trasporti Vendramin srl","Layout scaffalature firmato","26-044",_dt.date(2026,11,18),1),
        ("Fonderie Rosada","Bollette di energia 2024 e 2025","26-071",_dt.date(2026,11,20),0),
        ("Edil Piavesella","Cronoprogramma dei lavori","26-074",_dt.date(2026,11,23),0),
    ]
    def dr(cl, d, cd, q, sol):
        g = (oggi - q).days
        return f'<div class="dc"><div><b>{d}</b><small>{cl}, dal {q.day} {mesi[q.month-1]}{", "+str(sol)+(" sollecito" if sol==1 else " solleciti") if sol else ""}</small></div><span class="chip c-{"bad" if g>=10 else ("warn" if g>=7 else "mu")}">{g} giorni</span></div>'
    dcs = "".join(dr(*x) for x in doc)
    body = f"""<div class="h"><div><div class="eyebrow">Settimana 48, dal 23 al 27 novembre 2026</div><h1>Scadenze e incarichi dello studio</h1></div><div class="act">{chip(f"{len(oltre)} incarico oltre il budget di ore","bad")}<button class="btn">Registra ore</button><button class="btn p">Nuovo incarico</button></div></div>
<div class="card wk"><div class="ct">Scadenze della settimana<span>{len(sca)} in agenda, {chiuse} chiuse, {aperte} da chiudere</span></div><div class="days">{sett}</div></div>
<div class="g" style="grid-template-columns:1fr 306px;flex:1;min-height:0">
<div class="card inc"><div class="ct">Incarichi aperti<span>costo orario medio {costo_h} €, proiezione dalle ore registrate</span></div>
<table><tr><th>Incarico e cliente</th><th>Fase</th><th>Ore su preventivo</th><th class="r">Proiezione</th><th class="r">Compenso</th><th class="r">Margine</th></tr>{righe}{tot}</table></div>
<div class="g" style="grid-template-rows:auto 1fr;min-height:0">
<div class="card"><div class="ct">Ore da lunedì a oggi<span>{_c_n(t_ts,1)} di {atteso*len(ts)} h</span></div>{tsr}</div>
<div class="card" style="overflow:hidden"><div class="ct">Documenti attesi dai clienti<span>{len(doc)} nel portale</span></div>{dcs}</div>
</div></div>"""
    n = nav([("Settimana","cal",str(aperte)),("Incarichi","c_folder",str(len(inc))),("Timesheet","c_clock",""),("Documenti","file",""),("Portale clienti","users",str(len(doc))),("Fatturazione","c_euro","4"),("Archivio progetti","layers","")],"Settimana")
    css = """
body{font-family:Manrope,Poppins,sans-serif;font-size:12.500px}.app{grid-template-rows:900px}.main{min-height:0}td.r,th.r{padding-left:8px}.ct{white-space:nowrap}.brand svg{height:32px}.brand{padding-bottom:10px}
.h h1{font-weight:700;letter-spacing:-.02em}.ct{font-weight:700}.ct span{font-weight:500}.nav a{font-weight:600}.btn{font-weight:700}.chip{font-weight:700}
.wk{padding:12px 14px 12px}.days{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.day{background:var(--bg);border-radius:9px;padding:8px 9px;border:1px solid transparent;min-width:0}.day.today{background:#fff;border-color:var(--acc);box-shadow:0 0 0 3px var(--acc-soft)}
.dh{display:flex;align-items:center;gap:6px;margin-bottom:5px}.dh b{font-weight:700;color:var(--strong)}.dh em{font-style:normal;font-size:10px;font-weight:700;background:var(--acc);color:#fff;border-radius:4px;padding:0 5px}.dh span{color:var(--mut);font-weight:600}
.ev{display:grid;grid-template-columns:8px 1fr;gap:7px;padding:4px 0;border-top:1px solid var(--line)}.ev i{width:8px;height:8px;border-radius:50%;margin-top:4px;border:1.500px solid #b9b4cf;background:#fff}
.ev.ok i{background:var(--ok);border-color:var(--ok)}.ev.now i{background:#d0871e;border-color:#d0871e}
.ev b{display:block;font-weight:600;font-size:12px;line-height:1.25;color:var(--strong)}.ev.ok b{color:var(--mut);text-decoration:line-through;text-decoration-color:#c3bfd6}
.ev small{display:flex;gap:6px;color:var(--mut);font-size:11px;white-space:nowrap}.ev small .mono{font-size:10.500px;margin-left:auto}
.inc{padding:12px 14px;overflow:hidden}td{padding:6.500px 8px 6.500px 0;line-height:1.3}td small{display:block;color:var(--mut);font-size:11px;margin-top:1px}td b{font-weight:700;color:var(--strong)}
th{font-weight:600}.cd{font-size:10.500px;color:var(--acc);background:var(--acc-soft);border-radius:4px;padding:1px 5px}
.fs{display:flex;gap:3px;margin-bottom:3px}.fs i{width:16px;height:5px;border-radius:2px;background:#e4e1ee}.fs i.d{background:#b3a8e6}.fs i.c{background:var(--acc)}
.pc{width:34px;text-align:right}.mg{color:var(--ok)}.mg.lo{color:var(--bad)}
.tot td{border-top:1.500px solid var(--strong);border-bottom:0;padding-top:8px}
.tr{display:grid;grid-template-columns:84px 1fr 50px;gap:10px;align-items:center;padding:3px 0}.tr b{text-align:right;font-weight:700}.tr span{font-weight:500}
.dc{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 0;border-bottom:1px solid var(--line)}.dc:last-child{border:0}
.dc b{display:block;font-weight:700;font-size:12px;color:var(--strong);line-height:1.3}.dc small{color:var(--mut);font-size:11px;display:block;line-height:1.35}
"""
    return page("studio", "--acc:#4a3aa7;--acc-soft:#ece9f9;--bg:#f5f4f9;--line:#e4e1ee;--strong:#221b4d;--ink:#2a2547;--mut:#6f6a88;--info:#4a3aa7;--info-bg:#ece9f9", "", LOGO["c_tb"], n, "Settimana", "Elena Tessari", "Socia, ingegnere", "",
        tabs(["Settimana","Mese","Per cliente","Per responsabile"],"Settimana")+'<span class="pill">Tutto lo studio, 5 persone</span><span class="pill"><i class="dot"></i>Timesheet aggiornati a oggi, 12:40</span>', body, css, ws="Studio e incarichi", avvisi=len(oltre), fonts="&family=Manrope:wght@500;600;700;800")
