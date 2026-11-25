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
