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
.cp td{padding:4px 8px 4px 0}.cp th{padding-right:8px}.cp td.r,.cp th.r{padding-right:8px}.cp td b{font-weight:550}.cp .gc{width:262px;padding:0 12px 0 6px}.gh,.gt{position:relative;width:240px;height:16px}.gh span{position:absolute;top:0;font-size:10.5px;color:var(--mut)}
.gl,.og{position:absolute;top:-8px;bottom:-8px;width:1px;background:var(--line)}.og{background:var(--bad);width:1.500px;z-index:2}
.gb{position:absolute;top:2px;height:12px;border-radius:4px;background:#e9e2d8;overflow:hidden;z-index:1}.gb i{display:block;height:100%;background:var(--acc)}.gb.fatto i{background:#7d8f6b}.gb.poi{background:#ece8e2;border:1px dashed #cfc7bb}
.gt em{position:absolute;top:0;font-style:normal;font-size:10.5px;color:var(--mut);z-index:3;background:var(--card);padding:0 2px}
.tot td{background:var(--bg);font-weight:600}.tot td:first-child{border-radius:8px 0 0 8px}.tot td:last-child{border-radius:0 8px 8px 0}.tot .sm{font-weight:450}
.sl td{padding:4px 8px 4px 0}.sl td.r,.sl th.r{padding-right:8px}.sl td:last-child,.sl th:last-child{padding-right:12px}.sl td b{font-weight:600}
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
           ("W-2511-06","Urgenti, tutte le zone",0,29,8,"")]
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
                celle += f'<rect x="{x}" y="{y}" width="{CW-2}" height="{CH}" rx="3" fill="{occ[v]}"{" class=df" if (fl,c) in diff else ""}/>'
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
           ("13:20","SP-48165","Vivai Da Ros, Susegana","Consegnata","ok","firma G. Da Ros, 2 foto")]
    lt = "".join(f'<div class="tk"><span class="mono">{a}</span><div><div class="row"><b class="mono">{b}</b><span class="sp"></span>{chip(d,k)}</div><div>{c}</div><small>{e}</small></div></div>' for a,b,c,d,k,e in trk)
    cons, sped = 96, 118
    ub, dif = 312, 2
    railI = [("grid",0),("scan",0),("truck",1),("layers",0),("route",0),("check",0),("chart",0)]
    rail = "".join(f'<a class="{"on" if on else ""}">{ic(i)}</a>' for i, on in railI)
    tb = "".join(f'<span class="{"on" if x == "Uscite" else ""}">{x}</span>' for x in ["Uscite","Ricevimento","Giacenze","Inventario","Spedizioni","Resi"])
    css = '''.lapp{display:grid;grid-template-columns:60px 1fr;height:900px}
.rail{background:#0b0f12;border-right:1px solid var(--line);display:flex;flex-direction:column;align-items:center;padding:14px 0;gap:6px}.rail .lg svg{width:32px;height:30px;margin-bottom:14px}
.rail a{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;color:var(--mut)}.rail a svg{width:18px;height:18px}.rail a.on{background:var(--acc-soft);color:var(--acc);box-shadow:inset 2px 0 0 var(--acc)}
.rail .av{margin-top:auto;background:#1d272d;color:var(--ink)}
.ltop{height:54px;display:flex;align-items:center;gap:12px;padding:0 20px;border-bottom:1px solid var(--line);background:#11171b}.ltop .wm{display:flex;margin-right:10px}
.lt{display:flex;gap:2px;height:54px}.lt span{display:flex;align-items:center;padding:0 12px;color:var(--mut);font-weight:500;border-bottom:2px solid transparent}.lt span.on{color:var(--ink);border-color:var(--acc);font-weight:600}
.pill{background:#171e22;border-color:var(--line)}.ck{font-family:"JetBrains Mono";font-size:12px;color:var(--mut)}
.lbody{padding:16px 20px;display:flex;flex-direction:column;gap:12px;height:846px}
.lh{display:flex;align-items:center;gap:26px}.lh h1{font-family:"Space Grotesk";font-size:21px;font-weight:600;letter-spacing:-.02em;white-space:nowrap}.lh p{color:var(--mut);font-size:12px}
.stt{display:flex;gap:0;margin-left:auto}.stt div{padding:0 20px;border-left:1px solid var(--line)}.stt small{display:block;color:var(--mut);font-size:11px}.stt b{font-family:"Space Grotesk";font-size:19px;font-weight:600;letter-spacing:-.01em}.stt b span{font-size:12px;color:var(--mut);font-weight:500;font-family:Poppins}
.cols{display:grid;grid-template-columns:292px 1fr 318px;gap:12px;flex:1;min-height:0}.col{display:flex;flex-direction:column;gap:12px;min-height:0}
.card{box-shadow:none;border-radius:11px;padding:12px 14px}.ct{margin-bottom:8px}
.chip{height:20px;font-size:11px}.c-mu{background:#222c32;color:#9fb0b9}.bar{background:#243037}
.wv{padding:8px 10px;border:1px solid var(--line);border-radius:9px;margin-bottom:7px;display:flex;flex-direction:column;gap:4px}.wv:last-child{margin:0}.wv.sel{border-color:var(--acc);background:#1d2118}.wv .q{font-size:11px;width:52px;text-align:right;color:var(--mut)}.wv b{font-size:12px;font-weight:500}
.mp{display:block}.mp .fl{fill:#8b9aa3;font:600 11px Poppins;text-anchor:middle}.mp .cl{fill:#6b7a83;font:10px "JetBrains Mono";text-anchor:middle}
.mp .f1{fill:#f2b434}.mp .f2{fill:#fff3d1;stroke:#f2b434;stroke-width:2}.mp .f3{fill:#2d2716;stroke:#f2b434;stroke-width:1.200}.mp .fn{font:700 10.500px Poppins;text-anchor:middle}.mp .f1t,.mp .f2t{fill:#1b1503}.mp .f3t{fill:#f2b434}
.mp .df{stroke:#ff7b6b;stroke-width:1.600}.mp .pd{stroke:#f2b434;stroke-width:2;fill:none}.mp .pp{stroke:#f2b434;stroke-width:1.600;fill:none;stroke-dasharray:4 4;opacity:.75}.mp .pc{fill:#fff3d1;stroke:#f2b434;stroke-width:2}
.lg2{display:flex;align-items:center;gap:14px;color:var(--mut);font-size:11.500px;margin-top:8px}.lg2 i{display:inline-block;width:11px;height:11px;border-radius:3px;margin-right:5px;vertical-align:-1px}
.ax{position:relative;height:16px;margin:0 118px 4px 150px;font:10.500px "JetBrains Mono";color:var(--mut)}.ax span{position:absolute;transform:translateX(-50%)}
.cr{display:grid;grid-template-columns:150px 1fr 118px;align-items:center;padding:7px 0;border-top:1px solid var(--line)}.cn b{font-weight:600;display:block}.cr small{color:var(--mut);font-size:11px;display:block}
.tl{position:relative;height:26px;background:repeating-linear-gradient(90deg,transparent 0,transparent calc(100%/7 - 1px),#222c32 calc(100%/7 - 1px),#222c32 calc(100%/7))}
.tb{position:absolute;top:7px;height:12px;border-radius:4px;background:#26333a;overflow:hidden}.tb i{display:block;height:100%;background:#3d8f8b}.tb.urg i{background:var(--acc)}
.tl u{position:absolute;top:1px;bottom:1px;border-left:2px solid var(--ink);padding-left:5px;font:500 10.500px "JetBrains Mono";text-decoration:none;color:var(--ink);line-height:24px}
.now{position:absolute;top:22px;bottom:0;width:1.500px;background:var(--bad);z-index:3}.now em{position:absolute;top:-17px;left:-22px;width:44px;text-align:center;font:500 10.500px "JetBrains Mono";font-style:normal;color:#11171b;background:var(--bad);border-radius:4px}
.cq{text-align:right}.cq b{font-size:12.500px}
.tk{display:grid;grid-template-columns:38px 1fr;gap:8px;padding:7px 0;border-top:1px solid var(--line);font-size:12px}.tk:first-of-type{border:0;padding-top:0}.tk>span{color:var(--mut);font-size:11px;padding-top:2px}.tk b{font-weight:500;font-size:12px}.tk small{color:var(--mut);font-size:11px}
.iv{display:grid;grid-template-columns:1fr auto auto;gap:5px 14px;font-size:12px}.iv span{color:var(--mut)}.iv b{font-weight:500;text-align:right}'''
    nowp = tx(ora)
    body = f'''<div class="lh"><div><h1>Uscite di oggi</h1><p>mercoledì 25 novembre, turno 2</p></div>
<div class="stt"><div><small>Ordini da spedire</small><b>{ordini}</b></div><div><small>Righe prelevate</small><b>{r_fatte} <span>di {r_tot}, {_a_pc(r_fatte/r_tot*100)}%</span></b></div><div><small>Colli pronti in banchina</small><b>{c_pr} <span>di {c_tot}</span></b></div><div><small>Prossimo cut-off</small><b style="color:var(--acc)">{hm(prossimo)} <span>tra {prossimo-ora} min</span></b></div></div></div>
<div class="cols">
<div class="col"><div class="card" style="flex:1"><div class="ct">Ondate di prelievo<span>{sum(1 for o in ond if o[2]==o[3])} chiuse su {len(ond)}</span></div>{lo}</div>
<div class="card"><div class="ct">Ricevimento<span>3 arrivi oggi</span></div><div class="iv"><span>Ferriera Valbelluna</span><b>18 bancali</b>{chip("Stoccato","ok")}<span>Minuterie Rossetto</span><b>6 bancali</b>{chip("In controllo","warn")}<span>Utensili Pedemonte</span><b>11 bancali</b>{chip("Atteso 16:00","mu")}</div><div class="sm" style="margin-top:8px;font-size:11.500px">2 documenti di trasporto letti in automatico</div></div></div>
<div class="col"><div class="card"><div class="ct">Mappa dei corridoi, percorso di <span class="mono" style="margin:0;color:var(--acc);font-size:12.500px">W-2511-04</span><span>fermata {fatte+1} di {nf}, D. Zanatta</span></div>{mappa}
<div class="lg2"><span><i style="background:{occ[0]}"></i>vuota</span><span><i style="background:{occ[2]}"></i>occupata</span><span><i style="background:{occ[3]}"></i>piena</span><span><i style="background:#f2b434"></i>prelievo</span><span><i style="background:{occ[1]};outline:1.500px solid #ff7b6b"></i>differenza inventario</span><span class="sp"></span><span style="color:var(--ink)">Percorso {m_ott} m contro {m_arr} m in ordine d'arrivo, <b style="color:var(--ok);font-weight:600">-{round((1-m_ott/m_arr)*100)}%</b></span></div></div>
<div class="card" style="flex:1;position:relative"><div class="ct">Partenze per corriere<span>{c_pr} colli pronti su {c_tot}, {ordini} ordini</span></div>
<div style="position:relative"><div class="ax">{assi}</div><div style="position:absolute;left:150px;right:118px;top:0;bottom:0;pointer-events:none"><div class="now" style="left:{nowp}%;top:17px"><em>{hm(ora)}</em></div></div>{lc}</div></div></div>
<div class="col"><div class="card" style="flex:1"><div class="ct">Tracking e prove di consegna<span>{cons} su {sped}</span></div>{bar(round(cons/sped*100),"var(--ok)")}<div style="height:10px"></div>{lt}<div class="row sm" style="border-top:1px solid var(--line);padding-top:8px;font-size:11.500px">{ic("spark")}<span>14 risposte automatiche ai clienti oggi</span></div></div>
<div class="card"><div class="ct">Inventario a rotazione<span>corridoio F</span></div><div class="iv" style="grid-template-columns:1fr auto"><span>Ubicazioni contate</span><b>{ub}</b><span>Differenze</span><b style="color:var(--bad)">{dif}</b><span>Accuratezza</span><b>{_a_pc((ub-dif)/ub*100)}%</b></div><hr><div class="iv" style="grid-template-columns:auto 1fr auto"><span class="mono">F-14-2</span><span>atteso 48, contato 46</span><b style="color:var(--bad)">-2</b><span class="mono">F-21-1</span><span>atteso 12, contato 14</span><b style="color:var(--warn)">+2</b></div></div></div></div>'''
    theme = "--bg:#0f1417;--card:#171e22;--ink:#e6ecef;--mut:#8b9aa3;--line:#263138;--acc:#f2b434;--acc-soft:#2d2716;--ok:#5fd08e;--ok-bg:#15291f;--warn:#f2b434;--warn-bg:#2d2716;--bad:#ff7b6b;--bad-bg:#33201e;--info:#6cb8ff;--info-bg:#172838;--strong:#f3f7f9"
    return _a_head(theme, css) + f'''<body><div class="lapp"><aside class="rail"><div class="lg">{_A_BR_SVG}</div>{rail}<a>{ic("cog")}</a><span class="av">DZ</span></aside>
<div><header class="ltop"><div class="wm">{LOGO["a_br"].replace(_A_BR_SVG,"")}</div><div class="lt">{tb}</div><span class="sp"></span><span class="pill">Magazzino Quinto di Treviso</span><span class="pill"><i class="dot"></i>Gestionale allineato alle 14:35</span><span class="ck">mer 25 nov, {hm(ora)}</span></header>
<div class="lbody">{body}</div></div></div></body></html>'''
