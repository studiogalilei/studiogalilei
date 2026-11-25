# Schermate dei settori: edilizia, logistica, retail, e-commerce, servizi alle imprese.
# Eseguito da gen.py nello stesso namespace di pagine.py (usa reg, page, nav, chip, bar, ic, IC, LOGO, _logo).
import datetime as _a_dt

IC.update({
 "phone":'<rect x="7" y="2.500" width="10" height="19" rx="2.200"/><path d="M11 18.300h2"/>',
 "crane":'<path d="M6 21V4h3l11 4H6M9 4v4M17 8v4M15.500 12h3v3h-3zM3 21h8"/>',
 "euro":'<path d="M18 6.500a7 7 0 1 0 0 11M4 10.500h9M4 13.500h9"/>',
 "clock":'<circle cx="12" cy="12" r="9"/><path d="M12 7v5.300l3.500 2"/>',
 "pin":'<path d="M12 21.500c-4.500-5-7-8.300-7-11.500a7 7 0 0 1 14 0c0 3.200-2.500 6.500-7 11.500z"/><circle cx="12" cy="10" r="2.500"/>',
 "store":'<path d="M4 10v10.500h16V10M2.500 10 5 3.500h14l2.500 6.500a3.200 3.200 0 0 1-6.300 0 3.200 3.200 0 0 1-6.400 0 3.200 3.200 0 0 1-6.300 0zM9.500 20.500v-6h5v6"/>',
 "cart":'<path d="M2.500 3.500h3l2.500 12h10.500l2-8.500H7"/><circle cx="9.500" cy="19.500" r="1.500"/><circle cx="17" cy="19.500" r="1.500"/>',
 "sync":'<path d="M20 5.500v5h-5M4 18.500v-5h5"/><path d="M5.500 9.500a7 7 0 0 1 12.700-1.800l1.800 2.800M18.500 14.500a7 7 0 0 1-12.700 1.800L4 13.500"/>',
 "back":'<path d="M9 7 4 12l5 5"/><path d="M4 12h10a6 6 0 0 1 0 12"/>',
 "arrow":'<path d="M4 12h15m-5-5 5 5-5 5"/>',
 "swap":'<path d="M4 8h15l-4-4M20 16H5l4 4"/>',
 "scan":'<path d="M3.500 8V4.500H7M17 4.500h3.500V8M20.500 16v3.500H17M7 19.500H3.500V16M7.500 9v6M11 9v6M14 9v6M17 9v6"/>',
 "brief":'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4.500h6V7M3 12.500h18"/>',
 "percent":'<path d="m5 19 14-14"/><circle cx="7" cy="7" r="2.500"/><circle cx="17" cy="17" r="2.500"/>',
 "route":'<circle cx="6" cy="18" r="2.500"/><circle cx="18" cy="6" r="2.500"/><path d="M8.500 18H15a3.500 3.500 0 0 0 0-7H9a3.500 3.500 0 0 1 0-7h6.500"/>',
 "spark":'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.500 2.500M15.500 15.500 18 18M6 18l2.500-2.500M15.500 8.500 18 6"/>',
})

_A_MESI = ["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"]
def _a_n(v): return format(int(round(v)), ",").replace(",", ".")
def _a_pc(v, d=1): return f"{v:.{d}f}".replace(".", ",")
def _a_d(d): return f"{d.day} {_A_MESI[d.month-1]}"
def _a_sg(v): return ("+" if v > 0 else "-" if v < 0 else "") + _a_n(abs(v))
_A_OGGI = _a_dt.date(2026, 11, 25)
def _a_head(theme, css, fonts=""):
    return f'''<!doctype html><html lang="it"><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Cormorant+Garamond:wght@500;600&family=Space+Grotesk:wght@500;600;700{fonts}&display=swap" rel="stylesheet"><link rel="stylesheet" href="../base.css"><style>:root{{{theme}}}{css}</style></head>'''

LOGO.update({
 "a_vs": _logo('<svg viewBox="0 0 34 32"><path d="M3 27V13l7-4v18zM12 27V5l9 4v18z" fill="#b4541a"/><path d="M23 27V14l8 3v10z" fill="#3a332d"/><path d="M1 30.500h32" stroke="#3a332d" stroke-width="1.800" stroke-linecap="round"/><path d="M15 12h3M15 16.500h3M15 21h3" stroke="#fff" stroke-width="1.600" stroke-linecap="round"/></svg>',
   '<b style="font-family:Space Grotesk;font-weight:700;font-size:17px;letter-spacing:.04em;color:#2b2622">VALSILE<br><span style="font-size:9px;font-weight:600;letter-spacing:.3em;color:#8a7f73">COSTRUZIONI</span></b>'),
})

# ── Edilizia: scheda commessa, capitoli con costi e cronoprogramma ───────────
@reg("edilizia-costruzioni")
def _a_edil():
    D = _a_dt.date
    contratto = 2_480_000
    inizio, fine = D(2026, 4, 27), D(2027, 4, 25)
    # capitolo, preventivo, avanzamento %, costo reale, dal, al
    cap = [
        ("01", "Scavi e fondazioni", 186_000, 100, 194_300, D(2026,4,27), D(2026,6,26)),
        ("02", "Strutture in c.a.", 612_000, 85, 531_800, D(2026,6,15), D(2026,12,18)),
        ("03", "Murature e tamponamenti", 248_000, 60, 143_900, D(2026,9,14), D(2027,1,29)),
        ("04", "Copertura e lattonerie", 164_000, 20, 31_200, D(2026,11,9), D(2027,1,22)),
        ("05", "Impianti meccanici ed elettrici", 398_000, 15, 66_400, D(2026,10,26), D(2027,3,12)),
        ("06", "Serramenti", 172_000, 0, 0, D(2027,1,11), D(2027,2,26)),
        ("07", "Finiture interne", 236_000, 0, 0, D(2027,2,1), D(2027,4,9)),
        ("08", "Sistemazioni esterne", 92_000, 0, 0, D(2027,3,15), D(2027,4,23)),
    ]
    prev = sum(c[2] for c in cap)
    matur = sum(c[2]*c[3]/100 for c in cap)
    reale = sum(c[4] for c in cap)
    scost = reale - matur
    avanz = matur/prev*100
    afinire = prev + scost
    marg = (contratto - afinire)/contratto*100
    marg0 = (contratto - prev)/contratto*100
    sett = (_A_OGGI - inizio).days//7 + 1
    sett_tot = ((fine - inizio).days + 1)//7
    tot = (fine - inizio).days
    W = 240
    def px(d): return round((d - inizio).days/tot*W, 1)
    mesi = []
    y, m = 2026, 5
    while D(y, m, 1) < fine:
        mesi.append(D(y, m, 1)); m += 1
        if m > 12: y, m = y+1, 1
    griglia = "".join(f'<i class="gl" style="left:{px(d)}px"></i>' for d in mesi)
    oggi = f'<i class="og" style="left:{px(_A_OGGI)}px"></i>'
    testa = "".join(f'<span style="left:{px(d)+6}px">{_A_MESI[d.month-1][0].upper()}</span>' for d in mesi)
    righe = ""
    for cod, nome, p, av, r, d1, d2 in cap:
        mt = p*av/100; sc = r - mt
        stato = "fatto" if av == 100 else "corso" if av else "poi"
        gb = f'<div class="gt">{griglia}{oggi}<div class="gb {stato}" style="left:{px(d1)}px;width:{px(d2)-px(d1)}px"><i style="width:{av}%"></i></div><em style="{f"left:{px(d2)+5}px" if px(d2) < W-34 else f"left:{px(d1)-30}px;width:27px;text-align:right"}">{av}%</em></div>'
        righe += f'<tr><td><span class="mono mu">{cod}</span>&nbsp; <b>{nome}</b></td><td class="r">{_a_n(p)}</td><td class="r">{_a_n(mt) if av else "0"}</td><td class="r">{_a_n(r)}</td><td class="r" style="font-weight:600;color:{"var(--bad)" if sc > 0 else "var(--ok)" if sc < 0 else "var(--mut)"}">{_a_sg(sc) if av else "0"}</td><td class="gc">{gb}</td></tr>'
    righe += f'<tr class="tot"><td><b>Totale commessa</b></td><td class="r">{_a_n(prev)}</td><td class="r">{_a_n(matur)}</td><td class="r">{_a_n(reale)}</td><td class="r" style="color:var(--bad)">{_a_sg(scost)}</td><td class="gc"><span class="sm">Oggi {_a_d(_A_OGGI)}, fine lavori {_a_d(D(2027,4,23))} 2027</span></td></tr>'
    # SAL
    sal = [("SAL 1", "27 apr - 30 giu", 248_000, "Incassato", "ok", "14 ago"),
           ("SAL 2", "1 lug - 31 ago", 297_600, "Incassato", "ok", "9 ott"),
           ("SAL 3", "1 set - 31 ott", 372_000, "Fatturato", "info", "scade 30 nov")]
    emessi = sum(s[2] for s in sal)
    valore = avanz/100*contratto
    bozza = valore - emessi
    rs = "".join(f'<tr><td><b>{a}</b></td><td>{b}</td><td class="r">{_a_n(c)}</td><td class="r">{_a_pc(c/contratto*100)}%</td><td>{chip(d,k)}</td><td class="r sm">{e}</td></tr>' for a,b,c,d,k,e in sal)
    rs += f'<tr><td><b>SAL 4</b></td><td>1 nov - 25 nov</td><td class="r">{_a_n(bozza)}</td><td class="r">{_a_pc(bozza/contratto*100)}%</td><td>{chip("Bozza","warn")}</td><td class="r sm">da emettere</td></tr>'
    rs += f'<tr class="tot"><td colspan="2"><b>Totale maturato</b></td><td class="r">{_a_n(emessi+bozza)}</td><td class="r">{_a_pc((emessi+bozza)/contratto*100)}%</td><td colspan="2" class="r sm">di cui emessi {_a_n(emessi)}</td></tr>'
    # documenti dei subappaltatori
    docs = [("Carpenteria Fregona snc", "DURC", D(2026,11,20)),
            ("Elettroimpianti Piavon srl", "DURC", D(2026,11,28)),
            ("Termoidraulica Dal Col srl", "Polizza RCT", D(2026,12,12)),
            ("Ponteggi Sartor snc", "DURC", D(2027,1,14)),
            ("Coperture Nordest srl", "Idoneità tecnica", D(2027,2,2))]
    def dstato(d):
        g = (d - _A_OGGI).days
        if g < 0: return chip("Accesso sospeso", "bad")
        if g <= 30: return chip(f"Scade tra {g} giorni", "warn")
        return chip("Valido", "ok")
    da_sist = sum(1 for d in docs if (d[2]-_A_OGGI).days <= 30)
    rd = "".join(f'<div class="dc"><div><b>{a}</b><small>{b}, {"scaduto il" if c < _A_OGGI else "valido fino al"} {_a_d(c)}{"" if c.year == 2026 else " 2027"}</small></div>{dstato(c)}</div>' for a,b,c in docs)
    # rapportino
    pres = [("Valsile, squadra Tonon", 5), ("Ponteggi Sartor", 2)]
    operai = sum(n for _, n in pres); ore = operai*8
    rap = f'''<div class="card rp"><div class="ct">{ic("phone")}Rapportino di oggi<span>ricevuto alle 12:48</span></div>
<div class="row sm" style="margin-bottom:8px"><span class="av" style="width:24px;height:24px;font-size:10px">GT</span><span style="color:var(--ink);white-space:nowrap">G. Tonon, capocantiere</span><span class="sp"></span><span style="white-space:nowrap">dal telefono</span></div>
<div class="lav">Getto solaio piano secondo, corpo B</div>
<dl class="kv"><dt>Presenze</dt><dd>{operai} operai, {ore} ore</dd>{"".join(f'<dt class="sub">{a}</dt><dd class="sub">{n} operai, {n*8} h</dd>' for a,n in pres)}
<dt>Mezzi</dt><dd>Gru 8 h, autopompa 3 h</dd>
<dt>Calcestruzzo C25/30</dt><dd>38 m³ <span class="mono mu">DDT 5512</span></dd>
<dt>Acciaio B450C</dt><dd>2.140 kg <span class="mono mu">DDT 5507</span></dd></dl>
<hr><div class="row"><i class="ph" style="background:linear-gradient(135deg,#b9b2a8,#8d867c)"></i><i class="ph" style="background:linear-gradient(135deg,#a8a39b,#6f6a62)"></i><i class="ph" style="background:linear-gradient(135deg,#c9c0b3,#9b9287)"></i><i class="ph" style="background:linear-gradient(135deg,#8f8a82,#5e5952)"></i><span class="sp"></span>{chip("2 bolle lette","ok")}</div></div>'''
    band = f'''<div class="card band">
<div><small>Importo di contratto</small><strong>{_a_n(contratto)} €</strong><em>costi a preventivo {_a_n(prev)} €</em></div>
<div><small>Avanzamento lavori</small><strong>{_a_pc(avanz)}%</strong>{bar(round(avanz))}</div>
<div><small>Costi sostenuti</small><strong>{_a_n(reale)} €</strong><em style="color:var(--bad)">{_a_sg(scost)} € sul maturato ({_a_sg(1) [0]}{_a_pc(scost/matur*100)}%)</em></div>
<div><small>SAL emessi</small><strong>{_a_n(emessi)} €</strong><em>3 SAL, {_a_pc(emessi/contratto*100)}% del contratto</em></div>
<div><small>Margine a finire</small><strong>{_a_pc(marg)}%</strong><em>{_a_n(contratto-afinire)} €, a preventivo {_a_pc(marg0)}%</em></div></div>'''
    body = f'''<div class="h"><div><div class="eyebrow">Commessa C-2614, residenziale</div><h1>Residenza Le Magnolie, 12 alloggi</h1><p>Silea (TV), via dei Tigli 18. Committente Immobiliare Colfiorito srl, direttore tecnico ing. P. Zorzi</p></div><div class="act">{chip(f"In corso, settimana {sett} di {sett_tot}","info")}<button class="btn">Esporta contabilità</button><button class="btn p">Emetti SAL 4</button></div></div>
{band}
<div class="g" style="grid-template-columns:1fr 340px;flex:1;min-height:0">
<div class="g" style="grid-template-rows:auto 1fr;min-height:0">
<div class="card"><div class="ct">Capitoli: preventivo, costi reali e cronoprogramma<span>importi in euro, costi aggiornati oggi alle 12:48</span></div>
<table class="cp"><tr><th>Capitolo</th><th class="r">Preventivo</th><th class="r">Maturato</th><th class="r">Costo reale</th><th class="r">Scostamento</th><th class="gc"><div class="gh">{testa}</div></th></tr>{righe}</table></div>
<div class="g" style="grid-template-columns:1.45fr 1fr;min-height:0">
<div class="card"><div class="ct">Stati di avanzamento<span>emessi {_a_n(emessi)} € su {_a_n(valore)} € maturati</span></div>
<table class="sl"><tr><th>SAL</th><th>Periodo</th><th class="r">Importo</th><th class="r">Quota</th><th>Stato</th><th class="r">Incasso</th></tr>{rs}</table></div>
<div class="card"><div class="ct">{ic("spark")}Riepilogo settimanale<span>dai dati</span></div>
<ul class="rs"><li><b>Costi.</b> Strutture in c.a. sopra il maturato di {_a_n(531_800-612_000*0.85)} €: due noleggi di autopompa non previsti.</li><li><b>Tempi.</b> Impianti al 15% dopo 30 giorni su 137, in ritardo di circa una settimana.</li><li><b>Da decidere.</b> DURC di Carpenteria Fregona scaduto il 20 nov: squadra ferma fino al rinnovo.</li></ul><div class="sm" style="margin-top:10px">Prossimo invio alla direzione lunedì 30 nov</div></div></div></div>
<div class="g" style="grid-template-rows:auto 1fr;min-height:0">{rap}
<div class="card"><div class="ct">Documenti subappaltatori<span>{da_sist} da sistemare</span></div>{rd}</div></div></div>'''
    n = nav([("Commesse","brief","9"),("Cantieri","crane",""),("Rapportini","phone",""),("Contabilità e SAL","euro","1"),("Subappaltatori","users",str(da_sist)),("Documenti","file",""),("Mezzi","truck","")],"Commesse")
    css = '''.band{display:grid;grid-template-columns:repeat(5,1fr);padding:10px 0}.h .eyebrow{margin-bottom:0}.band>div{padding:0 18px;border-left:1px solid var(--line)}.band>div:first-child{border:0}.band small{display:block;color:var(--mut);font-size:11.5px}.band strong{display:block;font-size:21px;font-weight:600;letter-spacing:-.02em;color:var(--strong);margin:1px 0 2px}.band em{font-style:normal;font-size:11.5px;color:var(--mut)}.band .bar{margin-top:9px}
.ct svg{width:15px;height:15px;color:var(--acc)}
.cp td:first-child,.cp th:first-child{padding-left:12px!important}.cp td{padding:4px 8px 4px 0}.cp th{padding-right:8px}.cp td.r,.cp th.r{padding-right:8px}.cp td b{font-weight:550}.cp .gc{width:262px;padding:0 12px 0 6px}.gh,.gt{position:relative;width:240px;height:16px}.gh span{position:absolute;top:0;font-size:10.5px;color:var(--mut)}
.gl,.og{position:absolute;top:-8px;bottom:-8px;width:1px;background:var(--line)}.og{background:var(--bad);width:1.500px;z-index:2}
.gb{position:absolute;top:2px;height:12px;border-radius:4px;background:#e9e2d8;overflow:hidden;z-index:1}.gb i{display:block;height:100%;background:var(--acc)}.gb.fatto i{background:#7d8f6b}.gb.poi{background:#ece8e2;border:1px dashed #cfc7bb}
.gt em{position:absolute;top:0;font-style:normal;font-size:10.5px;color:var(--mut);z-index:3;background:var(--card);padding:0 2px}
.tot td{background:var(--bg);font-weight:600}.tot td:first-child{border-radius:8px 0 0 8px}.tot td:last-child{border-radius:0 8px 8px 0}.tot .sm{font-weight:450}
.sl td:first-child,.sl th:first-child{padding-left:12px!important}.sl td{padding:4px 8px 4px 0}.sl td.r,.sl th.r{padding-right:8px}.sl td:last-child,.sl th:last-child{padding-right:12px}.sl td b{font-weight:600}
.rs{list-style:none;display:flex;flex-direction:column;gap:9px}.rs li{font-size:12px;line-height:1.5;padding-left:11px;border-left:2px solid var(--acc-soft)}.rs b{font-weight:600;color:var(--strong)}
.rp .lav{background:var(--acc-soft);color:var(--strong);border-radius:8px;padding:7px 10px;font-weight:600;margin-bottom:9px}.rp .kv{gap:3px 12px}.rp hr{margin:8px 0}.rs li{font-size:11.800px}.rp .sub{font-size:11.5px;color:var(--mut);font-weight:450}.rp dt.sub{padding-left:10px}.ph{width:38px;height:30px;border-radius:6px;flex:none}
.dc{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--line)}.dc:last-child{border:0}.dc div{flex:1;min-width:0}.dc b{font-weight:550;display:block}.dc small{color:var(--mut);font-size:11.5px}'''
    return page("edil","--strong:#2b2622;--ink:#2f2a26;--acc:#b4541a;--acc-soft:#f6e9df;--bg:#f6f4f1;--line:#e8e3dc;--info:#8a4a1c;--info-bg:#f6e9df","",LOGO["a_vs"],n,"Commesse","Paolo Zorzi","Direttore tecnico","",
        tabs(["Quadro","Contabilità","SAL","Rapportini","Documenti","Subappaltatori"],"Quadro")+'<span class="pill">Cantiere Silea</span><span class="pill"><i class="dot"></i>Rapportino di oggi ricevuto</span>',body,css,ws="Commesse e cantieri",avvisi=3)

# ── Logistica: uscite di oggi, ondate di prelievo, mappa corridoi, partenze ──
_A_BR_SVG = '<svg viewBox="0 0 34 32"><path d="M4 9.500 14 4l10 5.500L14 15z" fill="#f2b434"/><path d="M4 15.500 14 21l10-5.500" fill="none" stroke="#f2b434" stroke-width="2.400" stroke-linejoin="round"/><path d="M4 21.500 14 27l10-5.500" fill="none" stroke="#8b9aa3" stroke-width="2.400" stroke-linejoin="round"/><path d="M25 12.500h6.500m-3-3.500 3.500 3.500-3.500 3.500" fill="none" stroke="#e6ecef" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round"/></svg>'
LOGO.update({"a_br": _logo(_A_BR_SVG, '<b style="font-family:Space Grotesk;font-weight:700;font-size:17px;letter-spacing:-.01em;color:#eef3f5">brentella<span style="font-weight:500;color:#f2b434"> logistica</span></b>')})

@reg("logistica-trasporti")
def _a_logi():
    # ondata, zona, righe prelevate, righe totali, ordini, operatore
    ond = [("W-2511-01","Corridoi A-B",86,86,22,"M. Bortolin"),
           ("W-2511-02","Corridoi C-D",124,124,31,"S. Pavan"),
           ("W-2511-03","Corridoi E-F",97,112,28,"L. Cescon"),
           ("W-2511-04","Corridoi A-D",41,98,24,"D. Zanatta"),
           ("W-2511-05","Corridoi G-H",0,73,19,""),
           ("W-2511-06","Urgenti",0,29,8,"")]
    r_fatte = sum(o[2] for o in ond); r_tot = sum(o[3] for o in ond); ordini = sum(o[4] for o in ond)
    def ost(f, t): return ("Chiusa","ok") if f == t else ("In corso","warn") if f else ("In coda","mu")
    lo = ""
    for cod, zona, f, t, no, op in ond:
        st, k = ost(f, t)
        lo += f'<div class="wv{" sel" if cod.endswith("04") else ""}"><div class="row"><b class="mono">{cod}</b><span class="sp"></span>{chip(st,k)}</div><div class="row sm"><span>{zona}, {no} ordini</span><span class="sp"></span><span>{op or "da assegnare"}</span></div><div class="row">{bar(round(f/t*100), "var(--ok)" if f == t else None)}<span class="mono q">{f}/{t}</span></div></div>'
    # corriere, cut-off (minuti dalle 00), inizio allestimento, colli pronti, colli totali, ordini, banchina
    cor = [("Lagunare Espressi", 15*60+30, 12*60+30, 148, 186, 58, 1),
           ("Tre Cime Trasporti", 16*60+30, 13*60, 61, 142, 41, 2),
           ("Ritiro cliente", 17*60, 14*60, 6, 6, 6, 4),
           ("Postumia Corriere", 18*60, 14*60+15, 12, 96, 27, 3)]
    assert sum(c[5] for c in cor) == ordini
    c_pr = sum(c[3] for c in cor); c_tot = sum(c[4] for c in cor)
    ora = 14*60+36
    T0, T1 = 12*60, 19*60
    def tx(m): return round((m - T0)/(T1 - T0)*100, 2)
    def hm(m): return f"{m//60}:{m%60:02d}"
    assi = "".join(f'<span style="left:{tx(h*60)}%">{h}:00</span>' for h in range(12, 20))
    lc = ""
    for nome, cut, ini, p, t, no, ban in cor:
        manca = cut - ora
        lc += f'<div class="cr"><div class="cn"><b>{nome}</b><small>Banchina {ban}, {no} ordini</small></div><div class="tl"><div class="tb" style="left:{tx(ini)}%;width:{tx(cut)-tx(ini)}%"><i style="width:{round(p/t*100)}%"></i></div><u style="left:{tx(cut)}%">{hm(cut)}</u></div><div class="cq"><b class="mono">{p}/{t}</b><small>colli, tra {manca//60} h {manca%60:02d}</small></div></div>' if manca >= 60 else f'<div class="cr"><div class="cn"><b>{nome}</b><small>Banchina {ban}, {no} ordini</small></div><div class="tl"><div class="tb urg" style="left:{tx(ini)}%;width:{tx(cut)-tx(ini)}%"><i style="width:{round(p/t*100)}%"></i></div><u style="left:{tx(cut)}%">{hm(cut)}</u></div><div class="cq"><b class="mono">{p}/{t}</b><small style="color:var(--warn)">colli, tra {manca} min</small></div></div>'
    prossimo = min(c[1] for c in cor if c[1] > ora)
    # mappa: 8 file di scaffali, 26 campate, corridoi di prelievo tra le coppie
    NC, CW, CH = 26, 24, 19
    ys = {"A":0, "B":41, "C":61, "D":102, "E":122, "F":163, "G":183, "H":224}
    occ = ["#1c272d", "#1f3c40", "#2a5d60", "#3d8f8b"]
    fermate = {("A",3):1, ("B",6):2, ("A",9):3, ("B",11):4, ("A",15):5, ("B",18):6, ("A",22):7,
               ("D",24):8, ("C",20):9, ("D",17):10, ("C",13):11, ("D",10):12, ("C",7):13, ("D",2):14}
    nf = len(fermate); fatte = 6
    diff = {("F",14), ("F",21)}
    celle = ""
    for fl, y in ys.items():
        celle += f'<text x="8" y="{y+14}" class="fl">{fl}</text>'
        for c in range(1, NC+1):
            x = 20 + (c-1)*CW
            v = (c*7 + ord(fl)*13 + (c*c) % 5) % 4
            if (fl, c) in fermate:
                n = fermate[(fl, c)]
                st = "f1" if n <= fatte else "f2" if n == fatte+1 else "f3"
                celle += f'<rect x="{x}" y="{y}" width="{CW-2}" height="{CH}" rx="3" class="{st}"/><text x="{x+11}" y="{y+13.500}" class="fn {st}t">{n}</text>'
            else:
                celle += f'<rect x="{x}" y="{y}" width="{CW-2}" height="{CH}" rx="3" fill="{occ[v]}"{' class="df"' if (fl,c) in diff else ""}/>'
    def cx(c): return 20 + (c-1)*CW + 11
    y1, y2 = 30, 91
    xa = cx(22)
    perc = f'<path d="M4,{y1} H{xa}" class="pd"/><path d="M{xa},{y1} H{cx(26)+16} V{y2} H4" class="pp"/><circle cx="{xa}" cy="{y1}" r="5" class="pc"/>'
    camp = "".join(f'<text x="{cx(c)}" y="258" class="cl">{c:02d}</text>' for c in (1,5,10,15,20,26))
    mappa = f'<svg viewBox="0 0 {20+NC*CW+18} 262" width="100%" class="mp">{celle}{perc}{camp}</svg>'
    m_ott, m_arr = 212, 348
    # tracking
    trk = [("14:31","SP-48213","Ferramenta Bisol, Conegliano","Consegnata","ok","firma R. Bisol, 1 foto"),
           ("14:18","SP-48207","Officina Marcon, Oderzo","Consegnata","ok","firma A. Marcon"),
           ("14:02","SP-48198","Colorificio Sernaglia, Pieve di Soligo","In consegna","info","prevista entro le 15:10"),
           ("13:47","SP-48176","Bar Centrale, Vittorio Veneto","Mancata consegna","bad","chiuso, riconsegna 26 nov"),
           ("13:20","SP-48165","Vivai Da Ros, Susegana","Consegnata","ok","firma G. Da Ros, 2 foto"),
           ("13:05","SP-48152","Carrozzeria Fadalto, Cordignano","Consegnata","ok","firma L. Fadalto")]
    lt = "".join(f'<div class="tk"><span class="mono">{a}</span><div><div class="row"><b class="mono">{b}</b><span class="sp"></span>{chip(d,k)}</div><div>{c}</div><small>{e}</small></div></div>' for a,b,c,d,k,e in trk)
    cons, sped = 96, 118
    ub, dif = 312, 2
    railI = [("grid",0),("scan",0),("truck",1),("layers",0),("route",0),("check",0),("chart",0)]
    rail = "".join(f'<a class="{"on" if on else ""}">{ic(i)}</a>' for i, on in railI)
    tb = "".join(f'<span class="{"on" if x == "Uscite" else ""}">{x}</span>' for x in ["Uscite","Ricevimento","Giacenze","Inventario","Spedizioni","Resi"])
    css = '''.lapp{display:grid;grid-template-columns:60px 1fr;height:900px}.lapp>div{min-width:0}.ltop span{white-space:nowrap}
.rail{background:#0b0f12;border-right:1px solid var(--line);display:flex;flex-direction:column;align-items:center;padding:14px 0;gap:6px}.rail .lg svg{width:32px;height:30px;margin-bottom:14px}
.rail a{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;color:var(--mut)}.rail a svg{width:18px;height:18px}.rail a.on{background:var(--acc-soft);color:var(--acc);box-shadow:inset 2px 0 0 var(--acc)}
.rail .av{margin-top:auto;background:#1d272d;color:var(--ink)}
.ltop{height:54px;display:flex;align-items:center;gap:12px;padding:0 20px;border-bottom:1px solid var(--line);background:#11171b}.ltop .wm{display:flex;margin-right:10px}
.lt{display:flex;gap:2px;height:54px}.lt span{display:flex;align-items:center;padding:0 12px;color:var(--mut);font-weight:500;border-bottom:2px solid transparent}.lt span.on{color:var(--ink);border-color:var(--acc);font-weight:600}
.pill{background:#171e22;border-color:var(--line)}.ck{font-family:"JetBrains Mono";font-size:12px;color:var(--mut)}
.lbody{padding:16px 20px;display:flex;flex-direction:column;gap:12px;height:846px}
.lh{display:flex;align-items:center;gap:26px}.lh h1{font-family:"Space Grotesk";font-size:21px;font-weight:600;letter-spacing:-.02em;white-space:nowrap}.lh p{color:var(--mut);font-size:12px}
.stt{display:flex;gap:0;margin-left:auto}.stt div{padding:0 20px;border-left:1px solid var(--line)}.stt small{display:block;color:var(--mut);font-size:11px}.stt b{font-family:"Space Grotesk";font-size:19px;font-weight:600;letter-spacing:-.01em}.stt b span{font-size:12px;color:var(--mut);font-weight:500;font-family:Poppins}
.cols{display:grid;grid-template-columns:300px 1fr 312px;gap:12px;flex:1;min-height:0}.col{display:flex;flex-direction:column;gap:12px;min-height:0;min-width:0}
.card{box-shadow:none;border-radius:11px;padding:12px 14px}.ct{margin-bottom:8px}
.chip{height:20px;font-size:11px}.c-mu{background:#222c32;color:#9fb0b9}.bar{background:#243037}
.row svg{width:14px;height:14px;flex:none;color:var(--acc)}.lg2 span{white-space:nowrap}.iv span,.iv b{white-space:nowrap}.wv{padding:9px 10px;border:1px solid var(--line);border-radius:9px;margin-bottom:7px;display:flex;flex-direction:column;gap:4px}.wv:last-child{margin:0}.wv.sel{border-color:var(--acc);background:#1d2118}.wv .q{font-size:11px;width:52px;text-align:right;color:var(--mut)}.wv b{font-size:12px;font-weight:500}
.mp{display:block}.mp .fl{fill:#8b9aa3;font:600 11px Poppins;text-anchor:middle}.mp .cl{fill:#6b7a83;font:10px "JetBrains Mono";text-anchor:middle}
.mp .f1{fill:#f2b434}.mp .f2{fill:#fff3d1;stroke:#f2b434;stroke-width:2}.mp .f3{fill:#2d2716;stroke:#f2b434;stroke-width:1.200}.mp .fn{font:700 10.500px Poppins;text-anchor:middle}.mp .f1t,.mp .f2t{fill:#1b1503}.mp .f3t{fill:#f2b434}
.mp .df{stroke:#ff7b6b;stroke-width:1.600}.mp .pd{stroke:#f2b434;stroke-width:2;fill:none}.mp .pp{stroke:#f2b434;stroke-width:1.600;fill:none;stroke-dasharray:4 4;opacity:.75}.mp .pc{fill:#fff3d1;stroke:#f2b434;stroke-width:2}
.lg2{display:flex;align-items:center;gap:14px;color:var(--mut);font-size:11.500px;margin-top:8px}.lg2 i{display:inline-block;width:11px;height:11px;border-radius:3px;margin-right:5px;vertical-align:-1px}
.ax{position:relative;height:16px;margin:0 118px 4px 150px;font:10.500px "JetBrains Mono";color:var(--mut)}.ax span{position:absolute;transform:translateX(-50%)}
.cr{display:grid;grid-template-columns:150px 1fr 118px;align-items:center;padding:11px 0;border-top:1px solid var(--line)}.cn b{font-weight:600;display:block}.cr small{color:var(--mut);font-size:11px;display:block}
.tl{position:relative;height:26px;background:repeating-linear-gradient(90deg,transparent 0,transparent calc(100%/7 - 1px),#222c32 calc(100%/7 - 1px),#222c32 calc(100%/7))}
.tb{position:absolute;top:7px;height:12px;border-radius:4px;background:#26333a;overflow:hidden}.tb i{display:block;height:100%;background:#3d8f8b}.tb.urg i{background:var(--acc)}
.tl u{position:absolute;top:1px;bottom:1px;border-left:2px solid var(--ink);padding-left:5px;font:500 10.500px "JetBrains Mono";text-decoration:none;color:var(--ink);line-height:24px}
.now{position:absolute;top:22px;bottom:0;width:1.500px;background:var(--bad);z-index:3}.now em{position:absolute;bottom:-17px;left:-22px;width:44px;text-align:center;font:500 10.500px "JetBrains Mono";font-style:normal;color:#11171b;background:var(--bad);border-radius:4px}
.cq{text-align:right}.cq b{font-size:12.500px}
.tk{display:grid;grid-template-columns:38px 1fr;gap:8px;padding:6px 0;border-top:1px solid var(--line);font-size:12px}.tk:first-of-type{border:0;padding-top:0}.tk>span{color:var(--mut);font-size:11px;padding-top:2px}.tk b{font-weight:500;font-size:12px}.tk small{color:var(--mut);font-size:11px}
.iv{display:grid;grid-template-columns:1fr auto auto;gap:5px 14px;font-size:12px}.iv span{color:var(--mut)}.iv b{font-weight:500;text-align:right}'''
    nowp = tx(ora)
    body = f'''<div class="lh"><div><h1>Uscite di oggi</h1><p>mercoledì 25 novembre, turno 2</p></div>
<div class="stt"><div><small>Ordini da spedire</small><b>{ordini}</b></div><div><small>Righe prelevate</small><b>{r_fatte} <span>di {r_tot}, {_a_pc(r_fatte/r_tot*100)}%</span></b></div><div><small>Colli pronti in banchina</small><b>{c_pr} <span>di {c_tot}</span></b></div><div><small>Prossimo cut-off</small><b style="color:var(--acc)">{hm(prossimo)} <span>tra {prossimo-ora} min</span></b></div></div></div>
<div class="cols">
<div class="col"><div class="card" style="flex:1"><div class="ct">Ondate di prelievo<span>{sum(1 for o in ond if o[2]==o[3])} chiuse su {len(ond)}</span></div>{lo}</div>
<div class="card"><div class="ct">Ricevimento<span>3 arrivi oggi</span></div><div class="iv"><span>Ferriera Valbelluna</span><b>18 bancali</b>{chip("Stoccato","ok")}<span>Minuterie Rossetto</span><b>6 bancali</b>{chip("Controllo","warn")}<span>Utensili Pedemonte</span><b>11 bancali</b>{chip("Ore 16:00","mu")}</div><div class="sm" style="margin-top:8px;font-size:11.500px">2 documenti di trasporto letti in automatico</div></div></div>
<div class="col"><div class="card"><div class="ct">Mappa dei corridoi, percorso di <span class="mono" style="margin:0;color:var(--acc);font-size:12.500px">W-2511-04</span><span>fermata {fatte+1} di {nf}, D. Zanatta</span></div>{mappa}
<div class="lg2"><span><i style="background:{occ[0]}"></i>vuota</span><span><i style="background:{occ[3]}"></i>piena</span><span><i style="background:#f2b434"></i>prelievo</span><span><i style="background:{occ[1]};outline:1.500px solid #ff7b6b"></i>differenza</span><span class="sp"></span><span style="color:var(--ink)">Percorso {m_ott} m, in ordine d'arrivo {m_arr} m, <b style="color:var(--ok);font-weight:600">-{round((1-m_ott/m_arr)*100)}%</b></span></div></div>
<div class="card" style="flex:1;position:relative"><div class="ct">Partenze per corriere<span>{c_pr} colli pronti su {c_tot}, {ordini} ordini</span></div>
<div style="position:relative"><div class="ax">{assi}</div><div style="position:absolute;left:150px;right:118px;top:0;bottom:0;pointer-events:none"><div class="now" style="left:{nowp}%;top:17px"><em>{hm(ora)}</em></div></div>{lc}</div><div class="row sm" style="margin-top:24px;font-size:11.500px">{ic("sync")}<span>Etichette e ritiri scambiati con i corrieri, ultimo invio alle 14:30</span></div></div></div>
<div class="col"><div class="card" style="flex:1"><div class="ct">Prove di consegna<span>{cons} su {sped} consegnate</span></div>{bar(round(cons/sped*100),"var(--ok)")}<div style="height:10px"></div>{lt}<div class="row sm" style="border-top:1px solid var(--line);padding-top:8px;font-size:11.500px">{ic("spark")}<span>14 risposte automatiche ai clienti oggi</span></div></div>
<div class="card"><div class="ct">Inventario a rotazione<span>corridoio F</span></div><div class="iv" style="grid-template-columns:1fr auto"><span>Ubicazioni contate</span><b>{ub}</b><span>Differenze</span><b style="color:var(--bad)">{dif}</b><span>Accuratezza</span><b>{_a_pc((ub-dif)/ub*100)}%</b></div><hr><div class="iv" style="grid-template-columns:auto 1fr auto"><span class="mono">F-14-2</span><span>atteso 48, contato 46</span><b style="color:var(--bad)">-2</b><span class="mono">F-21-1</span><span>atteso 12, contato 14</span><b style="color:var(--warn)">+2</b></div></div></div></div>'''
    theme = "--bg:#0f1417;--card:#171e22;--ink:#e6ecef;--mut:#8b9aa3;--line:#263138;--acc:#f2b434;--acc-soft:#2d2716;--ok:#5fd08e;--ok-bg:#15291f;--warn:#f2b434;--warn-bg:#2d2716;--bad:#ff7b6b;--bad-bg:#33201e;--info:#6cb8ff;--info-bg:#172838;--strong:#f3f7f9"
    return _a_head(theme, css) + f'''<body><div class="lapp"><aside class="rail"><div class="lg">{_A_BR_SVG}</div>{rail}<a>{ic("cog")}</a><span class="av">DZ</span></aside>
<div><header class="ltop"><div class="wm">{LOGO["a_br"].replace(_A_BR_SVG,"")}</div><div class="lt">{tb}</div><span class="sp"></span><span class="pill">Magazzino Quinto di Treviso</span><span class="pill"><i class="dot"></i>Gestionale allineato alle 14:35</span><span class="ck">mer 25 nov, {hm(ora)}</span></header>
<div class="lbody">{body}</div></div></div></body></html>'''

# ── Retail: rete di negozi, scorta unica, riassortimenti, trasferimenti ──────
_A_TL_SVG = '<svg viewBox="0 0 36 32"><path d="M9 5 15 17H3z" fill="#9fd3b4"/><path d="M18 2l7.500 15h-15z" fill="#f4efe2"/><path d="M27 7l6 10H21z" fill="#e58a4e"/><path d="M9 17v8M18 17v10M27 17v8" stroke="#f4efe2" stroke-width="2" stroke-linecap="round"/><path d="M3 29.500h30" stroke="#9fd3b4" stroke-width="1.600" stroke-linecap="round"/></svg>'
LOGO.update({"a_tl": _logo(_A_TL_SVG, '<b style="font-family:\'DM Serif Display\',serif;font-weight:400;font-size:21px;letter-spacing:.01em;color:#f4efe2">Tre Larici<span style="font-family:Poppins;font-size:9.500px;font-weight:500;letter-spacing:.24em;color:#9fd3b4;margin-left:9px">OUTDOOR</span></b>')})

@reg("retail-distribuzione")
def _a_retail():
    # punto vendita, vendite lun-mer, obiettivo, scontrini, variazione % sull'anno prima
    neg = [("Cortina", "corso Italia", 21_730, 19_000, 203, 14.8),
           ("Treviso", "Calmaggiore", 18_420, 17_500, 214, 6.2),
           ("Padova", "via Altinate", 16_980, 18_000, 197, -2.1),
           ("Verona", "via Mazzini", 15_110, 16_200, 168, -5.6),
           ("Belluno", "piazza dei Martiri", 14_260, 12_800, 171, 11.4),
           ("Sito", "ordini online", 12_870, 11_500, 148, 18.5),
           ("Udine", "via Mercatovecchio", 11_350, 11_000, 139, 3.3),
           ("Bassano", "via Roma", 9_840, 10_500, 126, -4.0),
           ("Vicenza", "corso Palladio", 8_690, 9_000, 109, 0.9)]
    V = sum(n[2] for n in neg); O = sum(n[3] for n in neg); S = sum(n[4] for n in neg)
    AP = sum(n[2]/(1+n[5]/100) for n in neg); var = (V/AP-1)*100
    mx = max(max(n[2], n[3]) for n in neg)
    def vv(p): return f'<span style="color:{"var(--ok)" if p >= 0 else "var(--bad)"}">{"+" if p >= 0 else "-"}{_a_pc(abs(p))}%</span>'
    rn = ""
    for nome, via, v, o, sc, p in neg:
        po = v/o*100
        rn += f'<div class="ng"><div><b>{nome}</b> <small>{via}</small></div><div class="vb"><i style="width:{v/mx*100:.1f}%;background:{"var(--acc)" if po >= 100 else "#c9b28a"}"></i><u style="left:{o/mx*100:.1f}%"></u></div><b class="r">{_a_n(v)}</b><span class="r" style="font-weight:600;color:{"var(--ok)" if po >= 100 else "var(--warn)"}">{_a_pc(po)}%</span><span class="r">{sc}</span><span class="r">{vv(p)}</span></div>'
    rn += f'<div class="ng tt"><div><b>Rete</b> <small>8 negozi e sito</small></div><div class="sm">scontrino medio {_a_pc(V/S,2)} €</div><b class="r">{_a_n(V)}</b><span class="r" style="font-weight:600;color:var(--ok)">{_a_pc(V/O*100)}%</span><span class="r">{_a_n(S)}</span><span class="r">{vv(var)}</span></div>'
    # scorta unica di un articolo: taglie per punto, venduto negli ultimi 7 giorni
    tg = [40, 41, 42, 43, 44, 45, 46]
    sc = [("Magazzino centrale", [6,10,4,3,9,7,4], 12),
          ("Cortina", [1,1,0,0,2,1,0], 9), ("Treviso", [1,2,3,2,2,1,0], 6), ("Padova", [1,2,2,3,2,1,1], 5),
          ("Verona", [1,2,1,2,2,1,0], 4), ("Belluno", [0,1,2,1,2,1,0], 4), ("Udine", [0,2,2,2,1,1,1], 3),
          ("Bassano", [1,1,2,2,1,0,0], 2), ("Vicenza", [1,2,3,3,2,0,0], 1)]
    def cl(q, nome): return "z" if q == 0 else "u" if q == 1 else ""
    rm = ""
    for nome, qs, vd in sc:
        t = sum(qs)
        fermo = nome != "Magazzino centrale" and vd <= 1
        rm += f'<tr class="{"mg" if nome.startswith("Mag") else ""}"><td><b>{nome}</b>{"<small>serve anche il sito</small>" if nome.startswith("Mag") else ""}</td>{"".join(f"<td class={chr(34)}q {cl(q,nome)}{chr(34)}><i>{q}</i></td>" for q in qs)}<td class="r"><b>{t}</b></td><td class="r">{vd}</td><td class="r">{chip("Fermo","warn") if fermo else chip("Taglie rotte","bad") if qs[2]==0 and qs[3]==0 else ""}</td></tr>'
    ct = [sum(s[1][i] for s in sc) for i in range(len(tg))]
    rm += f'<tr class="tt"><td><b>Scorta unica</b></td>{"".join(f"<td class=q><i>{c}</i></td>" for c in ct)}<td class="r"><b>{sum(ct)}</b></td><td class="r">{sum(s[2] for s in sc)}</td><td></td></tr>'
    zeri = sum(1 for s in sc[1:] for q in s[1] if q == 0)
    # proposte di riassortimento: articolo, negozio, giacenza, venduto 7 gg, proposta, origine
    pr = [("Scarpone Lagazuoi GTX, 42", "Cortina", 0, 3, 3, "Vicenza"),
          ("Scarpone Lagazuoi GTX, 43", "Cortina", 0, 2, 2, "Vicenza"),
          ("Piumino Civetta donna, M", "Treviso", 1, 5, 6, ""),
          ("Guanti softshell, L", "Belluno", 2, 7, 8, ""),
          ("Zaino Forcella 28 l", "Padova", 0, 4, 4, "Verona"),
          ("Calze merino, 39-42", "Udine", 3, 11, 12, ""),
          ("Berretto Cadini", "Cortina", 4, 14, 12, ""),
          ("Bastoncini Tofana carbonio", "Bassano", 1, 2, 2, "Treviso")]
    scelte = 6
    rp = ""
    for i, (a, n, g, vd, q, da) in enumerate(pr):
        cop = g/(vd/7)
        rp += f'<tr><td><i class="cb{" on" if i < scelte else ""}"></i></td><td><b>{a}</b></td><td>{n}</td><td class="r">{g}</td><td class="r">{vd}</td><td class="r" style="color:{"var(--bad)" if cop < 2 else "var(--warn)"};font-weight:600">{_a_pc(cop)+" gg" if g else "esaurito"}</td><td class="r"><b>+{q}</b></td><td>{f"<span class=tr>{ic("arrow")}da {da}</span>" if da else "Magazzino"}</td></tr>'
    pz = sum(p[4] for p in pr); pz_tr = sum(p[4] for p in pr if p[5]); n_tr = len({(p[5], p[1]) for p in pr if p[5]})
    # trasferimenti
    tr = [("TR-1184", "Vicenza", "Cortina", 5, "Proposto", "warn", "da confermare"),
          ("TR-1183", "Magazzino", "Treviso", 62, "In preparazione", "info", "domani"),
          ("TR-1182", "Verona", "Cortina", 14, "In viaggio", "info", "arrivo 26 nov"),
          ("TR-1179", "Padova", "Udine", 9, "Ricevuto", "ok", "oggi alle 10:40")]
    assert tr[0][3] == pr[0][4] + pr[1][4]
    rt = "".join(f'<div class="tf"><div class="row"><b class="mono">{a}</b><span class="sp"></span>{chip(e,k)}</div><div class="row"><span>{b}</span><span class="ar">{ic("arrow")}</span><span>{c}, <b>{d} pezzi</b></span><span class="sp"></span><small>{f}</small></div></div>' for a,b,c,d,e,k,f in tr)
    bw = 31_480
    promo = [("Black Week, abbigliamento -20%", "23 - 30 nov", "8 negozi e sito", "In corso", "ok", f"{_a_n(bw)} € venduti, {_a_pc(bw/V*100)}% della rete"),
             ("Calze merino 3x2", "16 - 29 nov", "8 negozi", "In corso", "ok", "418 paia vendute"),
             ("Spedizione gratuita sopra 79 €", "fino al 24 dic", "solo sito", "In corso", "ok", "61 ordini su 148"),
             ("Sci alpinismo -15%", "1 - 14 dic", "8 negozi e sito", "Programmata", "mu", "listini pronti su 9 canali")]
    rpm = "".join(f'<div class="tf"><div class="row"><b>{a}</b><span class="sp"></span>{chip(d,k)}</div><div class="row sm2"><span>{b}</span><span>{c}</span></div><small>{e}</small></div>' for a,b,c,d,k,e in promo)
    voci = [("Rete",""),("Scorte",""),("Riassortimenti",str(len(pr))),("Trasferimenti",str(len(tr))),("Promozioni",str(sum(1 for p in promo if p[3]=="In corso"))),("Ordini",""),("Listini",""),("Assortimenti","")]
    nv = "".join(f'<a class="{"on" if n == "Rete" else ""}">{n}{f"<b>{b}</b>" if b else ""}</a>' for n, b in voci)
    css = '''.rtop{height:56px;background:#173f31;display:flex;align-items:center;gap:8px;padding:0 28px;color:#cfe3d7}.rtop .bd{display:flex;align-items:center;gap:10px;margin-right:22px}.rtop .bd svg{height:30px}
.rn{display:flex;gap:2px;height:56px}.rn a{display:flex;align-items:center;gap:7px;padding:0 13px;font-weight:500;color:#b9d2c5;border-bottom:3px solid transparent;border-top:3px solid transparent}.rn a.on{color:#fff;border-bottom-color:#e58a4e;font-weight:600}.rn b{font-size:10.500px;background:#2a5a48;color:#dcefe4;border-radius:9px;padding:0 6px;font-weight:600}
.rtop .sr{margin-left:auto;width:230px;height:32px;border-radius:8px;background:#21503f;display:flex;align-items:center;gap:8px;padding:0 11px;color:#a9c7b8}.rtop .sr svg{width:14px;height:14px}.rtop .av{background:#e58a4e;color:#fff;margin-left:6px}
.rsub{height:62px;background:var(--card);border-bottom:1px solid var(--line);display:flex;align-items:center;gap:14px;padding:0 28px}.rsub h1{font-family:"DM Serif Display",serif;font-weight:400;font-size:23px;color:var(--strong)}
.rsub .st{margin-left:auto;display:flex}.rsub .st div{padding:0 18px;border-left:1px solid var(--line)}.rsub .st div:last-child{padding-right:0}.rsub small{display:block;font-size:11px;color:var(--mut)}.rsub .st b{font-size:16px;font-weight:600;color:var(--strong)}.rsub .st b span{font-size:11.500px;font-weight:500;color:var(--mut)}
.rbody{padding:16px 28px 18px;display:grid;grid-template-rows:auto 1fr;gap:14px;height:782px}
.card{padding:13px 16px}.ct{margin-bottom:8px}
.ng{display:grid;grid-template-columns:200px 1fr 62px 76px 60px 58px;align-items:center;gap:0 10px;padding:5px 0;border-bottom:1px solid var(--line)}.ng b{font-weight:600}.ng small{font-size:11px;color:var(--mut);margin-left:4px}.ng>div{white-space:nowrap}.ng .r{text-align:right}
.ng.hd{font-size:11.500px;color:var(--mut);background:var(--bg);border:0;border-radius:8px;padding:7px 10px;margin:0 -10px 2px}.ng.tt{border:0;background:var(--bg);border-radius:8px;padding:6px 10px;margin:4px -10px 0}
.vb{position:relative;height:12px;background:#efece4;border-radius:3px}.vb i{display:block;height:100%;border-radius:3px}.vb u{position:absolute;top:-4px;bottom:-4px;width:2px;background:var(--strong)}
.mx td:first-child,.mx th:first-child{padding-left:12px!important}.mx td{padding:2px 8px 2px 0}.mx th{padding:7px 8px 7px 0}.mx th.c{text-align:center}.mx td small{display:block;font-size:10.500px;color:var(--mut);line-height:1.1}.mx td b{font-weight:600}
.mx .q{text-align:center;padding:2px 2px}.mx .q i{display:block;font-style:normal;border-radius:6px;padding:2px 0;background:var(--acc-soft);font-weight:500;min-width:30px}.mx .q.z i{background:var(--bad-bg);color:var(--bad);font-weight:700}.mx .q.u i{background:var(--warn-bg);color:var(--warn)}
.mx .mg td{background:#fbfaf6}.mx .tt td{background:var(--bg);border:0}.mx .tt .q i{background:transparent;font-weight:600}.mx td.r,.mx th.r{padding-right:10px}
.ra td:first-child,.ra th:first-child{padding-left:12px!important}.ra td{padding:4px 10px 4px 0}.ra td b{font-weight:600}.ra td.r,.ra th.r{padding-right:10px}.cb{display:block;width:15px;height:15px;border-radius:4px;border:1.500px solid #c5c0b3}.cb{position:relative}.cb.on{background:var(--acc);border-color:var(--acc)}.cb.on::after{content:'';position:absolute;left:3.500px;top:.500px;width:3.500px;height:7px;border:solid #fff;border-width:0 1.800px 1.800px 0;transform:rotate(45deg)}
.tr{display:inline-flex;align-items:center;gap:5px;color:var(--promo);font-weight:600}.tr svg,.ar svg{width:13px;height:13px}.ar{color:var(--mut);display:flex}
.tf span,.tf small{white-space:nowrap}.ra td{padding-top:5px;padding-bottom:5px}.tf{padding:6px 0;border-bottom:1px solid var(--line);display:flex;flex-direction:column;gap:1px}.tf:last-child{border:0}.tf b{font-weight:600}.tf small{color:var(--mut);font-size:11.500px}.tf .mono{font-weight:500}.sm2{color:var(--mut);font-size:11.500px;gap:14px}
.seg{display:flex;border:1px solid var(--line);border-radius:8px;overflow:hidden}.seg span{padding:5px 11px;color:var(--mut);font-size:12px}.seg span.on{background:var(--acc-soft);color:var(--acc);font-weight:600}'''
    body = f'''<div class="g" style="grid-template-columns:1fr 1fr">
<div class="card"><div class="ct">Vendite per punto vendita<span>da lun 23 a mer 25 nov, in euro</span></div>
<div class="ng hd"><span>Punto vendita</span><span>Vendite e obiettivo <b style="font-weight:700;color:var(--strong)">|</b></span><span class="r">Vendite</span><span class="r">Su obiettivo</span><span class="r">Scontrini</span><span class="r">Su 2025</span></div>{rn}</div>
<div class="card"><div class="ct">Scorta unica: Scarpone Lagazuoi GTX uomo<span class="mono">SC-4417</span></div>
<table class="mx"><tr><th>Punto</th>{"".join(f"<th class=c>{t}</th>" for t in tg)}<th class="r">Totale</th><th class="r">Venduto 7 gg</th><th></th></tr>{rm}</table>
<div class="row sm" style="margin-top:8px"><span style="color:var(--bad);font-weight:600">{zeri} taglie esaurite nei negozi</span><span class="sp"></span>Aggiornata dalle casse alle 15:12</div></div></div>
<div class="g" style="grid-template-columns:1fr 316px 340px;min-height:0">
<div class="card"><div class="ct">Riassortimenti proposti<span>{len(pr)} proposte, {pz} pezzi: {pz-pz_tr} dal magazzino, {pz_tr} da altri negozi</span></div>
<table class="ra"><tr><th style="width:26px"></th><th>Articolo</th><th>Negozio</th><th class="r">Giacenza</th><th class="r">Venduto 7 gg</th><th class="r">Copertura</th><th class="r">Proposta</th><th>Origine</th></tr>{rp}</table></div>
<div class="card"><div class="ct">Trasferimenti<span>{len(tr)} aperti</span></div>{rt}</div>
<div class="card"><div class="ct">Promozioni<span>una regola, tutti i canali</span></div>{rpm}</div></div>'''
    theme = "--strong:#173f31;--ink:#26302b;--acc:#1f6b4d;--acc-soft:#e6f1ea;--bg:#f6f4ee;--line:#e6e2d6;--promo:#c2571d;--info:#1f6b4d;--info-bg:#e6f1ea;--warn:#a8650d;--warn-bg:#fbefd8"
    return _a_head(theme, css, "&family=DM+Serif+Display") + f'''<body><header class="rtop"><div class="bd">{LOGO["a_tl"]}</div><nav class="rn">{nv}</nav><div class="sr">{ic("search")}Cerca articolo o negozio</div><span class="av">SB</span></header>
<div class="rsub"><div><h1>Rete negozi</h1></div><div class="seg"><span>Oggi</span><span class="on">Settimana 48</span><span>Novembre</span></div><span class="pill">Tutti i canali</span><button class="btn p" style="margin-left:4px">Conferma {scelte} proposte</button>
<div class="st"><div><small>Vendite della settimana</small><b>{_a_n(V)} € <span>{_a_pc(V/O*100)}% dell'obiettivo</span></b></div><div><small>Scontrini</small><b>{_a_n(S)} <span>medio {_a_pc(V/S,2)} €</span></b></div><div><small>Sull'anno scorso</small><b>{vv(var)}</b></div></div></div>
<div class="rbody">{body}</div></body></html>'''

# ── E-commerce: ordini da tutti i canali, coda di evasione, dettaglio ordine ─
_A_FB_SVG = '<svg viewBox="0 0 32 32"><path d="M13 30 14.500 13h3L19 30z" fill="#fff"/><rect x="12.500" y="8" width="7" height="5" rx="1.200" fill="#ffd66b"/><path d="M14 8l2-4 2 4z" fill="#fff"/><path d="M11 10 2 6.500M11 12.500 2 15M21 10l9-3.500M21 12.500 30 15" stroke="#ffd66b" stroke-width="1.800" stroke-linecap="round"/><path d="M9 30h14" stroke="#8f8ad6" stroke-width="2" stroke-linecap="round"/></svg>'
LOGO.update({"a_fb": _logo(_A_FB_SVG, '<b style="font-family:Outfit,Poppins;font-weight:700;font-size:19px;letter-spacing:-.01em;color:#fff">faro<span style="font-weight:500;color:#ffd66b">bianco</span></b>')})

@reg("e-commerce-marketplace")
def _a_ecom():
    def eu(v): return f"{v:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
    CAN = {"S": ("Sito", "#5b4bd6", "farobianco.example"), "E": ("Emporia", "#0e9384", "marketplace"), "P": ("Piazza Nova", "#d9662b", "marketplace")}
    # canale: ordini di oggi, da evadere, incasso, commissione %, ora di allineamento
    can = [("S", 52, 15, 6914.20, 0, "15:41"), ("E", 41, 14, 4387.50, 12, "15:41"), ("P", 25, 8, 2561.30, 9, "15:40")]
    N = sum(c[1] for c in can); DE = sum(c[2] for c in can); INC = sum(c[3] for c in can)
    fasi = [("Nuovi", 14), ("In prelievo", 12), ("Imballati", 7), ("Etichettati", 4), ("Ritirati", N - DE)]
    assert sum(f[1] for f in fasi[:4]) == DE
    def tag(k): return f'<span class="cn" style="--c:{CAN[k][1]}"><i></i>{CAN[k][0]}</span>'
    tiles = "".join(f'<div class="card tile" style="--c:{CAN[k][1]}"><div class="row"><b>{CAN[k][0]}</b><span class="sp"></span><span class="sy"><i class="dot"></i>allineato alle {h}</span></div><div class="row tv"><div><strong>{n}</strong><small>ordini oggi</small></div><div><strong>{de}</strong><small>da evadere</small></div><div><strong>{eu(inc)} €</strong><small>incasso</small></div></div><div class="sy" style="margin-top:5px">{"Nessuna commissione" if not cm else f"Commissioni {cm}%, {eu(inc*cm/100)} € trattenuti"}</div></div>' for k,n,de,inc,cm,h in can)
    pipe = "".join(f'<div class="{"dn" if i == 4 else ""}"><b>{n}</b><span>{t}</span></div>' for i,(t,n) in enumerate(fasi))
    # ordine, canale, cliente, pezzi, totale, corriere, stato, ritiro
    od = [("FB-20931","S","G. Trevisan, Padova",2,148.90,"Espresso Blu","Etichettato","ok","16:30"),
          ("EM-48127","E","L. Marangon, Mestre",4,214.00,"Espresso Blu","Imballato","info","16:30"),
          ("PN-7741","P","S. Carraro, Vicenza",1,59.90,"Corriere Delta","In prelievo","warn","16:30"),
          ("FB-20934","S","A. Furlan, Udine",4,326.40,"Espresso Blu","In prelievo","warn","17:30"),
          ("EM-48131","E","M. Bettin, Rovigo",1,89.00,"Corriere Delta","In prelievo","warn","17:30"),
          ("EM-48133","E","C. De Marchi, Trento",12,1068.00,"da assegnare","Da controllare","bad","17:30"),
          ("FB-20937","S","R. Pasqualin, Verona",2,124.50,"Espresso Blu","Nuovo","mu","17:30"),
          ("PN-7745","P","E. Zorzetto, Belluno",1,42.00,"Corriere Delta","Nuovo","mu","17:30"),
          ("FB-20938","S","D. Michielin, Treviso",3,187.30,"Espresso Blu","Nuovo","mu","17:30")]
    ro = "".join(f'<tr class="{"sel" if a == "EM-48127" else ""}"><td class="mono">{a}</td><td>{tag(k)}</td><td>{c}</td><td class="r">{pz}</td><td class="r"><b>{eu(t)} €</b></td><td{" class=mu" if cr.startswith("da") else ""}>{cr}</td><td>{chip(st,ks)}</td><td class="r mono">{h}</td></tr>' for a,k,c,pz,t,cr,st,ks,h in od)
    # disponibilità: sku, nome, a magazzino, impegnati, scorta di sicurezza sui marketplace
    disp = [("LT-BRE-OT","Lampada Brera, ottone",17,3,0), ("LD-E27-F2","LED E27 filamento, 2 pz",240,22,0),
            ("PL-LIN-30","Paralume lino 30 cm",6,2,2), ("SP-ARC-NE","Sospensione Arco, nera",0,0,0)]
    rd = ""
    for sku, nome, mag, imp, sic in disp:
        v = mag - imp; m = max(v - sic, 0)
        rd += f'<tr><td><b>{nome}</b><small>{mag} a magazzino, {imp} impegnati</small></td><td class="r"><b>{v}</b></td><td class="r">{v}</td><td class="r">{m}</td><td class="r">{m}</td><td class="r">{chip("In pausa","bad") if v == 0 else chip("Scorta min. 2","warn") if sic else chip("Allineato","ok")}</td></tr>'
    resi = [("R-2291","E","Applique Navigli","In rientro","info"), ("R-2290","S","Lampada Brera, ottone","Da rimborsare","warn"), ("R-2288","P","Paralume lino 30 cm","Da controllare","mu")]
    n_resi = 5
    rr = "".join(f'<div class="rs"><div class="row"><span class="mono">{a}</span><span class="sp"></span>{chip(d,ks)}</div><div class="row">{tag(k)}<span class="nm">{c}</span></div></div>' for a,k,c,d,ks in resi)
    # dettaglio dell'ordine scelto
    rg = [("Lampada da tavolo Brera, ottone","LT-BRE-OT",1,129.00), ("LED E27 filamento, 2 pz","LD-E27-F2",2,19.50), ("Paralume lino 30 cm","PL-LIN-30",1,39.00)]
    merce = sum(q*p for _,_,q,p in rg); sped = 7.00; tot = merce + sped
    sel = next(o for o in od if o[0] == "EM-48127")
    assert abs(tot - sel[4]) < .001 and sum(r[2] for r in rg) == sel[3]
    comm = tot*can[1][4]/100
    lr = "".join(f'<div class="rg"><i class="th"></i><div><b>{a}</b><small class="mono">{b}</small></div><span>{q} x {eu(pz)}</span><b class="r">{eu(q*pz)}</b></div>' for a,b,q,pz in rg)
    passi = [("14:48","Ordine ricevuto da Emporia",1), ("14:48","Disponibilità scalata su 3 canali",1), ("15:05","Prelievo, M. Sartori",1), ("15:20","Imballato, 1 collo da 3,4 kg",1), ("15:22","Etichetta creata",1), ("16:30","Ritiro Espresso Blu",0)]
    lp = "".join(f'<div class="ps{" d" if d else ""}"><i></i><span class="mono">{h}</span><span>{t}</span></div>' for h,t,d in passi)
    det = f'''<aside class="det"><div class="row"><span class="sm">Ordine</span><span class="sp"></span>{tag("E")}</div>
<div class="row" style="margin-top:2px"><h2 class="mono">EM-48127</h2><span class="sp"></span>{chip("Imballato","info")}</div>
<div class="sm" style="margin-top:2px">L. Marangon, Mestre (VE). Ricevuto oggi alle 14:48</div>
<h3>Articoli<span>{sel[3]} pezzi</span></h3>{lr}
<dl class="kv tt"><dt>Merce</dt><dd>{eu(merce)} €</dd><dt>Spedizione</dt><dd>{eu(sped)} €</dd><dt class="b">Totale ordine</dt><dd class="b">{eu(tot)} €</dd><dt>Commissione Emporia {can[1][4]}%</dt><dd>-{eu(comm)} €</dd><dt class="b">Netto atteso</dt><dd class="b">{eu(tot-comm)} €</dd></dl>
<div class="row nt">{ic("euro")}<span>Accredito previsto il 2 dic, riconciliato in automatico</span></div>
<h3>Evasione e spedizione<span class="mono">EB 7204 1183 55</span></h3><div class="pl">{lp}</div>
<h3>Assistenza<span>1 risposta automatica</span></h3><div class="ms"><small>L. Marangon, 15:02</small>Arriva entro venerdì?</div><div class="ms a"><small>Risposta inviata alle 15:02</small>Sì, il ritiro è oggi alle 16:30 e la consegna è prevista giovedì 26 novembre.</div>
<div class="row" style="margin-top:auto;gap:8px"><button class="btn" style="flex:1;justify-content:center">Ristampa etichetta</button><button class="btn p" style="flex:1;justify-content:center">Segna ritirato</button></div></aside>'''
    navs = [("Ordini","cart",str(DE)),("Catalogo","tag",""),("Disponibilità","sync",""),("Spedizioni","truck",""),("Resi","back",str(n_resi)),("Incassi","euro",""),("Canali","layers","3"),("Clienti","users","")]
    nv = "".join(f'<a class="{"on" if n == "Ordini" else ""}">{ic(i)}{n}{f"<b>{b}</b>" if b else ""}</a>' for n,i,b in navs)
    css = '''.eapp{display:grid;grid-template-columns:212px 1fr 356px;grid-template-rows:900px;height:900px}.eapp>*{min-height:0;overflow:hidden}.btn{white-space:nowrap}
.es{background:#171537;color:#b9b6de;padding:20px 12px;display:flex;flex-direction:column}.es .bd{display:flex;align-items:center;gap:9px;padding:0 8px 22px}.es .bd svg{height:30px}
.es nav a{display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:9px;font-weight:500}.es nav svg{width:16px;height:16px}.es nav a.on{background:#2b2769;color:#fff;font-weight:600}.es nav b{margin-left:auto;font-size:11px;background:#2b2769;border-radius:9px;padding:0 7px;color:#d9d6ff}.es nav a.on b{background:#ffd66b;color:#171537}
.es .bw{margin-top:auto;background:#211e4d;border-radius:11px;padding:11px 12px;font-size:11.500px;line-height:1.45}.es .bw b{display:block;color:#ffd66b;font-weight:600;font-size:12px}.es .me{border-top:0;color:#fff;padding:12px 4px 0}.es .me small{color:#9d99cc}.es .av{background:#2b2769;color:#fff}
.em{padding:16px 22px;display:flex;flex-direction:column;gap:12px;min-width:0}
.eh{display:flex;align-items:center;gap:12px}.eh h1{font-family:Outfit,Poppins;font-size:22px;font-weight:600;letter-spacing:-.02em;color:var(--strong)}.eh p{color:var(--mut)}
.eh .sr{margin-left:auto;width:230px;height:32px;border:1px solid var(--line);border-radius:8px;background:var(--card);display:flex;align-items:center;gap:8px;padding:0 10px;color:var(--mut)}.eh .sr svg{width:14px;height:14px}
.tile{padding:10px 14px;border-top:3px solid var(--c)}.tile b{font-weight:600;font-size:13px}.sy{font-size:11px;color:var(--mut);display:flex;align-items:center;gap:5px}.tv{gap:18px;margin-top:6px;align-items:flex-start}.tv strong{display:block;font-size:17px;font-weight:600;color:var(--strong);letter-spacing:-.01em;white-space:nowrap}.tv small{font-size:11px;color:var(--mut);white-space:nowrap}
.pp{display:grid;grid-template-columns:repeat(5,1fr);gap:3px}.pp div{background:var(--acc-soft);padding:5px 14px;display:flex;align-items:baseline;gap:8px;clip-path:polygon(0 0,calc(100% - 10px) 0,100% 50%,calc(100% - 10px) 100%,0 100%,10px 50%)}.pp div:first-child{clip-path:polygon(0 0,calc(100% - 10px) 0,100% 50%,calc(100% - 10px) 100%,0 100%);border-radius:8px 0 0 8px}.pp div{padding-left:22px}.pp b{font-size:16px;font-weight:600;color:var(--acc)}.pp span{font-size:12px;color:var(--ink)}.pp .dn{background:var(--ok-bg)}.pp .dn b{color:var(--ok)}
.cn{display:inline-flex;align-items:center;gap:6px;font-weight:500;font-size:12px;white-space:nowrap}.cn i{width:8px;height:8px;border-radius:2px;background:var(--c)}
.card{padding:12px 14px}.oq td:first-child,.oq th:first-child{padding-left:12px!important}.oq td{padding:4px 10px 4px 0}.oq td b{font-weight:600}.oq td.r,.oq th.r{padding-right:10px}.oq tr.sel td{background:var(--acc-soft)}.oq tr.sel td:first-child{box-shadow:inset 3px 0 0 var(--acc)}.filters{margin-bottom:8px}.foot{padding-top:6px}
.dp td:first-child,.dp th:first-child{padding-left:12px!important}.dp td{padding:3px 8px 3px 0;font-size:12px}.dp th{padding:6px 8px 6px 0;font-size:11px}.dp td.r,.dp th.r{padding-right:8px}.dp td b{font-weight:600}.dp td small{display:block;font-size:10.500px;color:var(--mut);line-height:1.2}.dp .chip{height:19px;font-size:10.500px}
.rs{padding:5px 0;border-bottom:1px solid var(--line);font-size:12px}.rs .row{gap:7px}.rs:last-of-type{border:0}.rs .nm{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.rs .cn{color:var(--mut)}.rs .chip{height:19px;font-size:10.500px}
.det{background:var(--card);border-left:1px solid var(--line);padding:20px 18px 18px;display:flex;flex-direction:column}.det h2{font-size:20px;font-weight:500;color:var(--strong);letter-spacing:-.02em}
.det h3{font-size:12.500px;font-weight:600;color:var(--strong);margin:14px 0 6px;display:flex;border-top:1px solid var(--line);padding-top:12px}.det h3 span{margin-left:auto;font-weight:450;color:var(--mut);font-size:11.500px}
.rg{display:grid;grid-template-columns:34px 1fr auto 54px;gap:8px;align-items:center;padding:5px 0;font-size:12px}.rg b{font-weight:550}.rg small{display:block;color:var(--mut);font-size:10.500px}.rg span{color:var(--mut);white-space:nowrap}.rg .r{text-align:right}.th{width:34px;height:34px;border-radius:7px;background:linear-gradient(140deg,#f3e9d2,#d9c7a0)}.rg:nth-of-type(2) .th{background:linear-gradient(140deg,#fff4c9,#f2d77a)}.rg:nth-of-type(3) .th{background:linear-gradient(140deg,#efece6,#cfc8ba)}
.tt{margin-top:8px;gap:3px 14px;font-size:12px}.tt dd{font-weight:500}.tt .b{font-weight:650;color:var(--strong);padding-top:3px}
.nt{margin-top:9px;background:var(--ok-bg);color:var(--ok);border-radius:8px;padding:7px 10px;font-size:11.500px;font-weight:500;gap:8px}.nt svg{width:14px;height:14px;flex:none}
.ms{background:var(--bg);border-radius:9px 9px 9px 2px;padding:6px 10px;font-size:12px;margin:0 40px 6px 0}.ms small{display:block;font-size:10.500px;color:var(--mut)}.ms.a{background:var(--acc-soft);border-radius:9px 9px 2px 9px;margin:0 0 0 40px}.pl{position:relative;padding-left:16px}.pl::before{content:'';position:absolute;left:3px;top:8px;bottom:8px;width:1px;background:var(--line)}.ps{position:relative;display:flex;gap:10px;padding:3.500px 0;font-size:12px;color:var(--mut)}.ps i{position:absolute;left:-16px;top:8px;width:7px;height:7px;border-radius:50%;background:var(--card);border:1.500px solid #c3c1d6}.ps.d{color:var(--ink)}.ps.d i{background:var(--acc);border-color:var(--acc)}.ps .mono{font-size:11px;color:var(--mut);padding-top:1px}'''
    body = f'''<div class="eh"><div><h1>Ordini</h1></div><p style="white-space:nowrap">mer 25 nov, {N} ordini, {eu(INC)} € incassati</p><div class="sr">{ic("search")}Cerca ordine, cliente, SKU</div><button class="btn p">Stampa {fasi[2][1]} etichette</button></div>
<div class="g" style="grid-template-columns:repeat(3,1fr);gap:12px">{tiles}</div>
<div class="pp">{pipe}</div>
<div class="card"><div class="filters"><span class="on">Da evadere {DE}</span><span>Sito {can[0][2]}</span><span>Emporia {can[1][2]}</span><span>Piazza Nova {can[2][2]}</span><span>Da controllare 1</span><em>{ic("search")}Filtra la coda</em></div>
<table class="oq"><tr><th>Ordine</th><th>Canale</th><th>Cliente</th><th class="r">Pezzi</th><th class="r">Totale</th><th>Corriere</th><th>Stato</th><th class="r">Ritiro</th></tr>{ro}</table>{foot(f"{len(od)} di {DE} ordini da evadere, in ordine di ritiro. EM-48133 segnalato: quantità insolita per questo cliente")}</div>
<div class="g" style="grid-template-columns:1fr 252px;gap:12px;flex:1;min-height:0">
<div class="card"><div class="ct">Disponibilità sui canali<span>ultimo allineamento alle 15:41</span></div><table class="dp"><tr><th>Articolo</th><th class="r">Vendibili</th><th class="r">Sito</th><th class="r">Emporia</th><th class="r">Piazza Nova</th><th class="r"></th></tr>{rd}</table></div>
<div class="card"><div class="ct">Resi aperti<span>{len(resi)} di {n_resi}</span></div>{rr}</div></div>'''
    theme = "--strong:#171537;--ink:#23223a;--acc:#5b4bd6;--acc-soft:#eeecfc;--bg:#f5f5fa;--line:#e5e4ef;--info:#5b4bd6;--info-bg:#eeecfc"
    return _a_head(theme, css, "&family=Outfit:wght@500;600;700") + f'''<body><div class="eapp"><aside class="es"><div class="bd">{LOGO["a_fb"]}</div><nav>{nv}</nav>
<div class="bw"><b>Black Week, giorno 3</b>Coda ordini attiva: {N} ricevuti oggi, nessuno perso</div><div class="me"><span class="av">IB</span><div><b style="font-weight:600">Irene Bozzato</b><small>Responsabile ordini</small></div></div></aside>
<div class="em">{body}</div>{det}</div></body></html>'''

# ── Servizi alle imprese: pianificazione della settimana, ore e fatturazione ─
LOGO.update({"a_ts": _logo('<svg viewBox="0 0 32 32"><rect x="2" y="2" width="12.500" height="12.500" rx="2.500" fill="#0f6f7c"/><rect x="17.500" y="2" width="12.500" height="12.500" rx="2.500" fill="#7fc4c9"/><rect x="2" y="17.500" width="12.500" height="12.500" rx="2.500" fill="#e9a23b"/><path d="M17.500 23.800 23.800 17.500l6.200 6.300-6.200 6.200z" fill="#0f6f7c"/></svg>',
   '<b style="font-family:Manrope,Poppins;font-weight:800;font-size:18px;letter-spacing:-.02em;color:#0d3a41">tessera<br><span style="font-size:9px;font-weight:600;letter-spacing:.24em;color:#6b8589">CONSULENZA</span></b>')})

@reg("servizi-alle-imprese")
def _a_serv():
    # sigla: nome, cliente, colore, contratto, budget ore, consuntivo al 22 nov, valore, fatturato
    CM = {"DPZ": ("Avvio nuovo gestionale", "Maglificio Dal Pozzo", "#0f6f7c", "A corpo", 640, 512, 57_600, 34_560),
          "RIV": ("Portale clienti", "Cantine Rive Alte", "#7b5bd6", "A corpo", 320, 148, 28_800, 11_520),
          "FSU": ("Analisi dei processi", "Fonderia Sant'Urbano", "#d9662b", "A consumo", 160, 104, 15_200, 3_990),
          "LOR": ("Assistenza annuale", "Ottica Lorenzon", "#2f8f5b", "Canone mensile", 40, 20, 2_400, 2_400),
          "SOR": ("Formazione responsabili", "Cooperativa La Sorgente", "#c2428a", "A corpo", 80, 74, 7_200, 3_600)}
    COL = {k: v[2] for k, v in CM.items()}; COL["INT"] = "#98a2b3"
    F, N, L = "ferie", "no", ""
    # persona, ruolo, ore di contratto al giorno, piano da lunedì a venerdì
    team = [("Elisa Barbieri", "Capo progetto", ["DPZ4 RIV4", "DPZ8", "DPZ4 INT4", "RIV8", "DPZ4 RIV4"]),
            ("Marco Callegari", "Analista", ["FSU8", "FSU8", "FSU4 DPZ4", "DPZ8", "DPZ8"]),
            ("Sara Dalla Rosa", "Sviluppo", ["RIV8", "RIV8", "RIV8", "RIV8", "RIV8 LOR2"]),
            ("Tommaso Favaro", "Sviluppo", ["DPZ8", "DPZ8", "DPZ8", "DPZ8 LOR2", "DPZ8"]),
            ("Giulia Lazzarin", "Assistenza", ["LOR4 INT4", "LOR4 SOR4", "LOR3 INT5", "LOR4 FSU4", F]),
            ("Andrea Moretto", "Formazione", ["SOR8", "SOR6 INT2", F, F, "SOR4"]),
            ("Chiara Pellizzari", "Analista", ["DPZ4 FSU4", "FSU8", "FSU8", L, "RIV4"]),
            ("Rita Visentin", "Design, part time", ["RIV8", "RIV8", "RIV4 DPZ4", "DPZ8", N])]
    giorni = ["Lun 23", "Mar 24", "Mer 25", "Gio 26", "Ven 27"]
    sett = {k: 0 for k in COL}
    cap_t = pia_t = 0; sopra = 0
    rg = ""
    for nome, ruolo, piano in team:
        cap = sum(8 for g in piano if g not in (F, N)); pia = 0
        celle = ""
        for i, g in enumerate(piano):
            og = " og" if i == 2 else ""
            if g == F: celle += f'<div class="c fe{og}"><span>Ferie</span></div>'
            elif g == N: celle += f'<div class="c nl{og}"><span>non lavora</span></div>'
            elif g == L: celle += f'<div class="c li{og}"><span>8 h libere</span></div>'
            else:
                bl = ""; tg = 0
                for b in g.split():
                    k, h = b[:3], int(b[3:]); sett[k] += h; pia += h; tg += h
                    bl += f'<b style="flex:{h};background:{COL[k]}">{k} {h}</b>'
                celle += f'<div class="c{og}{" ov" if tg > 8 else ""}">{bl}{f"<em>{8-tg} h</em>" if tg < 8 else ""}</div>'
        cap_t += cap; pia_t += pia; sopra += pia > cap
        col = "var(--bad)" if pia > cap else "var(--ok)" if pia >= cap*.9 else "var(--warn)"
        ini = "".join(w[0] for w in nome.split()[:2])
        rg += f'<div class="pr"><div class="pn"><span class="av">{ini}</span><div><b>{nome}</b><small>{ruolo}</small></div></div>{celle}<div class="ld"><div class="row"><b style="color:{col}">{pia}</b><span>di {cap} h</span><span class="sp"></span><span style="color:{col};font-weight:600">{round(pia/cap*100)}%</span></div>{bar(min(round(pia/cap*100),100), col)}</div></div>'
    assert sum(sett.values()) == pia_t
    hd = '<div class="pr hd"><div>Persona</div>' + "".join(f'<div class="{"og" if i == 2 else ""}">{g}{" oggi" if i == 2 else ""}</div>' for i, g in enumerate(giorni)) + '<div>Carico della settimana</div></div>'
    leg = "".join(f'<span><i style="background:{COL[k]}"></i>{k}</span>' for k in COL)
    # commesse
    rc = ""; avvisi_c = 0
    for k, (nome, cli, col, ctr, bud, cons, val, fat) in CM.items():
        prev = cons + sett[k]
        if cons > bud: st = chip("Fuori budget", "bad")
        elif prev > bud: st = chip(f"Supera di {prev-bud} h", "warn"); avvisi_c += 1
        else: st = chip("In linea", "ok")
        pc = round(cons/bud*100); pp = min(round(prev/bud*100), 100)
        rc += f'<tr><td><div class="row"><i class="sq" style="background:{col}"></i><div><b>{nome}</b><small>{k}, {cli}, {ctr.lower()}</small></div></div></td><td><div class="row"><div class="b2"><i style="width:{pp}%;background:{col};opacity:.35"></i><i style="width:{pc}%;background:{col}"></i></div><span class="hh"><b>{cons}</b> di {bud} h</span></div></td><td class="r">+{sett[k]} h</td><td class="r"><b>{bud-prev if prev <= bud else 0} h</b></td><td class="r">{_a_n(fat)} di {_a_n(val)} €</td><td class="r">{st}</td></tr>'
    # prossime fatture: commessa, voce, importo, quando, stato
    tar = 95; ore_nov = 62
    fa = [("DPZ", "SAL 3, collaudo magazzino, 20%", CM["DPZ"][6]*20//100, "approvato sul portale il 24 nov", "Pronta", "ok"),
          ("FSU", f"Ore di novembre, {ore_nov} h a {tar} €", ore_nov*tar, "a consumo, chiusura il 30 nov", "In maturazione", "info"),
          ("LOR", "Canone di dicembre", CM["LOR"][6], "ricorrente, automatica il 1 dic", "Programmata", "mu"),
          ("RIV", "SAL 2, rilascio di prova, 30%", CM["RIV"][6]*30//100, "previsto il 4 dic", "In attesa", "mu")]
    rf = "".join(f'<div class="fa"><div class="row"><i class="sq" style="background:{COL[k]}"></i><b>{v}</b><span class="sp"></span><b class="am">{_a_n(imp)} €</b></div><div class="row"><small>{q}</small><span class="sp"></span>{chip(st,ks)}</div></div>' for k,v,imp,q,st,ks in fa)
    tf = sum(f[2] for f in fa)
    fatt = sum(v for k, v in sett.items() if k != "INT")
    body = f'''<div class="h"><div><div class="eyebrow">Settimana 48, 23 - 27 novembre</div><h1>Pianificazione delle persone</h1></div>
<div class="sx"><div><small>Ore pianificate</small><b>{pia_t} <span>di {cap_t} disponibili, {round(pia_t/cap_t*100)}%</span></b></div><div><small>Fatturabili</small><b>{fatt} h <span>{round(fatt/pia_t*100)}%, interne {sett["INT"]} h</span></b></div><div><small>Sopra il contratto</small><b style="color:var(--bad)">{sopra} persone</b></div></div>
<div class="act"><button class="btn">Copia dalla sett. 47</button><button class="btn p">Pubblica il piano</button></div></div>
<div class="card pl"><div class="lg">{leg}<span class="sp"></span><span class="mu">ore per commessa, 8 h al giorno</span></div>{hd}{rg}</div>
<div class="g" style="grid-template-columns:1fr 352px;flex:1;min-height:0">
<div class="card"><div class="ct">Commesse: budget ore e consuntivo<span>dai timesheet al 22 nov, in chiaro le ore pianificate questa settimana</span></div>
<table class="cm"><tr><th>Commessa</th><th>Ore consumate</th><th class="r">Sett. 48</th><th class="r">Residuo</th><th class="r">Fatturato</th><th class="r">Previsione</th></tr>{rc}</table></div>
<div class="card"><div class="ct">Prossime fatture<span>{_a_n(tf)} € entro il 4 dic</span></div>{rf}</div></div>'''
    n = nav([("Pianificazione","cal",""),("Commesse","brief",str(len(CM))),("Timesheet","clock","3"),("Fatturazione","euro","1"),("Contratti e canoni","file",""),("Portale clienti","users","2"),("Report","chart","")],"Pianificazione")
    css = '''.h{align-items:center}.h .eyebrow{letter-spacing:.1em}.h h1{font-family:Manrope,Poppins;font-weight:700;letter-spacing:-.02em}
.btn{white-space:nowrap}.sx{display:flex;margin-left:14px}.sx small{white-space:nowrap}.sx div{padding:0 16px;border-left:1px solid var(--line)}.sx small{display:block;font-size:11px;color:var(--mut)}.sx b{font-size:17px;font-weight:600;color:var(--strong);white-space:nowrap}.sx b span{font-size:11.500px;font-weight:450;color:var(--mut)}
.pl{padding:10px 14px 8px}.lg{display:flex;gap:14px;align-items:center;font-size:11.500px;font-weight:600;margin-bottom:8px;font-family:"JetBrains Mono"}.lg i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:5px}.lg .mu{font-family:Poppins;font-weight:450}
.pr{display:grid;grid-template-columns:178px repeat(5,1fr) 168px;gap:0;align-items:stretch;border-top:1px solid var(--line)}.pr>div{padding:3px 6px}
.pr.hd{border:0;background:var(--bg);border-radius:8px;font-size:11.500px;color:var(--mut)}.pr.hd>div{padding:7px 8px}.pr.hd .og{color:var(--acc);font-weight:600}
.pn{display:flex;align-items:center;gap:9px}.pn b{font-weight:600;display:block;line-height:1.25}.pn small{font-size:11px;color:var(--mut)}.pn .av{width:28px;height:28px;font-size:10.500px}
.c{display:flex;gap:3px;align-items:center}.c.og{background:#f0f7f7}.c b{height:28px;border-radius:6px;color:#fff;font:600 10.500px "JetBrains Mono";display:flex;align-items:center;justify-content:center;min-width:42px;white-space:nowrap}
.c.ov{box-shadow:inset 0 0 0 1.500px var(--bad);border-radius:8px}.c em{font-style:normal;font-size:10.500px;color:var(--mut)}
.c.fe span,.c.nl span,.c.li span{flex:1;height:28px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--mut)}.c.fe span{background:repeating-linear-gradient(135deg,#eef1f3 0 6px,#f8f9fa 6px 12px)}.c.li span{border:1.500px dashed #e9a23b;color:var(--warn);font-weight:600}.c.nl span{color:#b0b8c2}
.ld{display:flex;flex-direction:column;justify-content:center;gap:4px;padding-left:12px!important}.ld .row{gap:5px;font-size:12px}.ld b{font-size:14px;font-weight:600}.ld span{color:var(--mut)}
.cm td:first-child,.cm th:first-child{padding-left:12px}.cm td{padding:5px 10px 5px 0}.cm td.r,.cm th.r{padding-right:12px}.cm td b{font-weight:600}.cm td small{display:block;font-size:11px;color:var(--mut);line-height:1.25}
.sq{width:10px;height:10px;border-radius:3px;flex:none}.b2{position:relative;width:84px;height:7px;border-radius:9px;background:#eceff1;overflow:hidden;flex:none}.b2 i{position:absolute;left:0;top:0;bottom:0;border-radius:9px}.hh{font-size:12px;color:var(--mut)}.hh b{color:var(--ink)}
.fa{padding:7px 0;border-bottom:1px solid var(--line)}.fa:last-child{border:0}.fa .row{gap:8px}.fa b{font-weight:600;font-size:12.500px}.fa .am{white-space:nowrap}.fa small{font-size:11px;color:var(--mut);padding-left:18px}.fa .chip{height:19px;font-size:10.500px}'''
    return page("serv","--strong:#0d3a41;--ink:#1d2f33;--acc:#0f6f7c;--acc-soft:#e3f1f2;--bg:#f4f7f7;--line:#e2e8e9;--info:#0f6f7c;--info-bg:#e3f1f2","",LOGO["a_ts"],n,"Pianificazione","Elisa Barbieri","Capo progetto","",
        tabs(["Settimana","Mese","Per commessa","Disponibilità"],"Settimana")+'<span class="pill">Settimana 48</span><span class="pill">Team consulenza, 8 persone</span><span class="pill"><i class="dot"></i>Timesheet della settimana 47 approvati</span>',body,css,ws="Commesse e ore",avvisi=2,fonts="&family=Manrope:wght@600;700;800")
