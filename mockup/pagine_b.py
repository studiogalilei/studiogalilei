# Schermate del gruppo B: sanità privata, turismo, energia, agricoltura, automotive.
# Eseguito da gen.py nello stesso namespace di pagine.py (reg, page, nav, chip, bar, kpi, spark, tabs, filters, foot, ic, IC, LOGO, _logo).

IC.update({
 "card":'<rect x="2.500" y="5" width="19" height="14" rx="2"/><path d="M2.500 10h19M6 15h4"/>',
 "clock":'<circle cx="12" cy="12" r="9"/><path d="M12 7v5.500l3.500 2"/>',
 "bed":'<path d="M2.500 18.500V6M2.500 15h19v3.500M21.500 15v-3a3 3 0 0 0-3-3H11v6"/><circle cx="6.800" cy="11" r="1.800"/>',
 "door":'<path d="M5 21V3.500h10V21M15 6.500h4V21M2.500 21h19M11.500 12.500h.01"/>',
 "bolt":'<path d="M13 2.500 4.500 13.500H11l-1 8 8.500-11H12z"/>',
 "sun":'<circle cx="12" cy="12" r="4"/><path d="M12 2.500v2.500M12 19v2.500M2.500 12H5M19 12h2.500M5.300 5.300l1.800 1.800M16.900 16.900l1.800 1.800M5.300 18.700l1.800-1.800M16.900 7.100l1.800-1.800"/>',
 "leaf":'<path d="M5 19C4 10 9 4.500 20 4.500 20 15 14.500 20 5 19z"/><path d="M5 19c3-5 6-8 10-10"/>',
 "map":'<path d="m3 6 6-2.500 6 2.500 6-2.500v14.500l-6 2.500-6-2.500-6 2.500z"/><path d="M9 3.500V18M15 6v14.500"/>',
 "drop":'<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>',
 "euro":'<path d="M17.500 6.500a6.500 6.500 0 1 0 0 11M4.500 10.500h9M4.500 13.500h8"/>',
 "home":'<path d="M3.500 11 12 4l8.500 7v9.500h-6v-6h-5v6h-6z"/>',
 "msg":'<path d="M4 5h16v11H9.500L5 20v-4H4z"/>',
 "route":'<circle cx="6" cy="18" r="2.500"/><circle cx="18" cy="6" r="2.500"/><path d="M8.500 18H15a3.500 3.500 0 0 0 0-7H9a3.500 3.500 0 0 1 0-7h6.500"/>',
 "plus":'<path d="M12 5v14M5 12h14"/>',
 "left":'<path d="m14.500 6-6 6 6 6"/>',
 "right":'<path d="m9.500 6 6 6-6 6"/>',
 "globe":'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
})

def _doc(theme, css, inner, fonts=""):
    """Pagina completa senza l'ossatura di page(): stesso head, corpo libero."""
    return f'''<!doctype html><html lang="it"><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Cormorant+Garamond:wght@500;600&family=Space+Grotesk:wght@500;600;700{fonts}&display=swap" rel="stylesheet"><link rel="stylesheet" href="../base.css"><style>:root{{{theme}}}{css}</style></head><body>{inner}</body></html>'''
def _eur(n, dec=False):
    s = f"{n:,.2f}" if dec else f"{n:,.0f}"
    return s.replace(",", "X").replace(".", ",").replace("X", ".")
def _mm(hhmm): h, m = hhmm.split(":"); return int(h)*60+int(m)
def _hh(m): return f"{m//60:02d}:{m%60:02d}"

# ── B1. Sanità privata: agenda del giorno per ambulatorio ────────────────────
@reg("sanita-privata-cliniche")
def _clinica():
    ADESSO = _mm("10:40"); H0 = _mm("08:00"); H1 = _mm("18:00"); PXH = 66
    y = lambda m: (m-H0)*PXH/60
    # (inizio, durata, paziente, prestazione, nota)  nota: web, ns, dc, arr:HH:MM
    col = [
     ("Amb. 1", "Cardiologia", "Dott.ssa E. Marin", [
        ("08:30",30,"G. Ros.","Visita cardiologica",""),("09:00",30,"A. Bert.","ECG e visita",""),("09:30",30,"M. Zan.","Controllo",""),
        ("10:00",30,"L. Fav.","Visita cardiologica","web"),("10:30",30,"P. Dal C.","Ecocardiogramma",""),("11:00",30,"R. Sart.","Visita cardiologica","arr:10:28"),
        ("11:30",30,"C. Bort.","Controllo",""),("12:00",45,"F. Mion","ECG da sforzo",""),
        ("14:30",30,"S. Gall.","Visita cardiologica",""),("15:00",30,"T. Pol.","Controllo","dc"),("16:00",30,"E. Vian.","Consegna Holter","web"),("16:30",30,"N. Carr.","Visita cardiologica","")],
        [("12:45","14:30","Pausa")]),
     ("Amb. 2", "Ortopedia", "Dott. P. Furlan", [
        ("09:00",20,"D. Mar.","Visita",""),("09:20",20,"V. Tess.","Controllo",""),("09:40",20,"I. Cal.","Visita","ns"),("10:00",20,"O. Bas.","Controllo",""),
        ("10:20",20,"G. Piov.","Visita","web"),("10:40",20,"B. Rig.","Visita",""),("11:00",20,"A. Sca.","Controllo","arr:10:31"),("11:20",20,"M. Lore.","Visita","arr:10:36"),
        ("11:40",20,"U. Fab.","Controllo",""),("12:00",20,"L. Gia.","Visita","web"),("12:20",20,"K. Mene.","Visita",""),
        ("15:00",20,"S. Tom.","Visita",""),("15:20",20,"P. Ber.","Controllo",""),("15:40",20,"R. Cec.","Visita","dc"),("16:00",40,"E. Zor.","Infiltrazione",""),
        ("16:40",20,"C. Nard.","Controllo",""),("17:00",20,"F. Dal B.","Visita","web")],
        [("12:40","15:00","In sala operatoria fino alle 15:00")]),
     ("Amb. 3", "Dermatologia", "Dott.ssa L. Zanon", [
        ("08:00",20,"A. Stef.","Visita",""),("08:20",20,"M. Gob.","Controllo",""),("08:40",40,"T. Bia.","Mappatura nei",""),("09:20",20,"L. Per.","Visita","web"),
        ("09:40",20,"G. Mart.","Crioterapia",""),("10:00",40,"S. Ven.","Mappatura nei",""),("10:40",20,"D. Cos.","Visita",""),("11:00",20,"E. Bor.","Visita","arr:10:22"),
        ("11:20",20,"V. Sim.","Controllo",""),("11:40",40,"P. Tre.","Mappatura nei","web"),
        ("14:30",40,"N. Fur.","Mappatura nei",""),("15:10",20,"A. Vol.","Visita","dc"),("15:30",20,"R. Mic.","Controllo",""),("16:10",20,"G. Bat.","Visita","web")],
        [("12:20","14:30","Pausa")]),
     ("Amb. 4", "Ecografia", "Dott. M. Pavan", [
        ("09:00",30,"F. Ton.","Eco addome",""),("09:30",30,"C. Lun.","Eco tiroide","web"),("10:00",30,"M. Bal.","Eco muscolo-tendinea",""),("10:30",30,"A. Riz.","Eco addome",""),
        ("11:00",30,"P. Guer.","Ecocolordoppler","arr:10:34"),("11:30",30,"S. Mor.","Eco tiroide",""),("12:00",30,"L. Bru.","Eco addome","dc"),("12:30",30,"I. Fer.","Eco mammaria",""),
        ("14:00",30,"G. Sal.","Eco addome",""),("14:30",30,"E. Pas.","Ecocolordoppler","web"),("15:30",30,"D. Zam.","Eco tiroide",""),("16:00",30,"R. Bon.","Eco muscolo-tendinea",""),("16:30",30,"T. Ava.","Eco addome","dc")],
        [("13:00","14:00","Pausa")]),
     ("Palestra", "Fisioterapia", "Ft. B. Rosso", [
        ("08:00",45,"B. Con.","Rieducazione motoria",""),("08:45",45,"M. Fra.","Tecarterapia",""),("09:30",45,"A. Pia.","Rieducazione motoria",""),("10:15",45,"G. Tur.","Terapia manuale",""),
        ("11:00",45,"L. Sor.","Tecarterapia","arr:10:37"),("11:45",45,"C. Dal M.","Rieducazione motoria",""),
        ("14:00",45,"S. Ber.","Terapia manuale",""),("14:45",45,"F. Mas.","Tecarterapia",""),("15:30",45,"P. Car.","Rieducazione motoria","web"),("16:15",45,"V. Lon.","Terapia manuale",""),("17:00",45,"E. Gri.","Rieducazione motoria","dc")],
        [("12:30","14:00","Pausa")]),
    ]
    prezzo = {"Visita cardiologica":130,"ECG e visita":150,"Ecocardiogramma":140,"ECG da sforzo":160,"Consegna Holter":90,"Infiltrazione":120,"Mappatura nei":120,"Crioterapia":70,
              "Eco addome":95,"Eco tiroide":85,"Eco muscolo-tendinea":90,"Ecocolordoppler":120,"Eco mammaria":100,"Rieducazione motoria":50,"Tecarterapia":45,"Terapia manuale":55}
    base = {"Cardiologia":(130,80),"Ortopedia":(120,70),"Dermatologia":(110,65)}   # visita, controllo
    def costo(spec, pr):
        if pr in prezzo: return prezzo[pr]
        return base[spec][0 if pr=="Visita" else 1]
    cont = {"concluso":0,"visita":0,"attesa":0,"conf":0,"dc":0,"ns":0}
    attesa = []; conclusi = []; web = 0; tot = 0
    colonne = ""; testa = ""
    for amb, spec, med, apps, pause in col:
        n_col = len(apps)
        testa += f'<div class="ah"><b>{spec}</b><span>{med}</span><em>{amb}</em></div>'
        bl = ""
        for a, b, lab in pause:
            bl += f'<div class="pz" style="top:{y(_mm(a)):.1f}px;height:{(_mm(b)-_mm(a))*PXH/60:.1f}px"><span>{lab}</span></div>'
        for ini, dur, paz, pr, nota in apps:
            s = _mm(ini); e = s+dur; tot += 1
            if nota == "web": web += 1
            if nota == "ns": st = "ns"
            elif e <= ADESSO: st = "concluso"
            elif s <= ADESSO: st = "visita"
            elif nota.startswith("arr"): st = "attesa"
            elif nota == "dc": st = "dc"
            else: st = "conf"
            cont[st] += 1
            if st == "attesa": attesa.append((nota[4:], paz, ini, spec, med, amb))
            if st == "concluso": conclusi.append((e, paz, spec, pr, costo(spec, pr)))
            hpx = dur*PXH/60-2
            w = '<i class="w">web</i>' if nota == "web" else ""
            if dur <= 20:
                inner = f'<div class="l1"><span class="mono">{ini}</span><b>{paz}</b><small>{pr}</small>{w}</div>'
            else:
                inner = f'<div class="l1"><span class="mono">{ini}</span><b>{paz}</b>{w}</div><div class="l2">{pr}</div>'
            bl += f'<div class="ap s-{st}" style="top:{y(s)+1:.1f}px;height:{hpx:.1f}px">{inner}</div>'
        colonne += f'<div class="ac">{bl}</div>'
    ore = "".join(f'<span style="top:{y(h*60):.1f}px">{h:02d}:00</span>' for h in range(8, 18))
    # incassi: i conclusi in ordine di uscita, con metodo di pagamento
    conclusi.sort()
    metodi = ["POS","POS","Contanti","POS","Bonifico","POS","Contanti","POS","POS","Assicurazione"]
    mov = []; perm = {"POS":0,"Contanti":0,"Bonifico":0,"Assicurazione":0}
    N0 = 4806
    for i, (e, paz, spec, pr, eur) in enumerate(conclusi):
        m = metodi[i % len(metodi)]
        aperto = i >= len(conclusi)-2          # gli ultimi due sono ancora in accettazione
        if not aperto: perm[m] += eur
        mov.append((e, paz, spec, eur, m, aperto, N0+i))
    incassato = sum(perm.values()); da_inc = sum(x[3] for x in mov if x[5]); fatt = sum(1 for x in mov if not x[5])
    mrow = "".join(f'<div class="mv"><span class="mono">{_hh(e)}</span><b>{paz}</b>{chip("Da incassare","warn") if ap else f"<u>{m}, FT {n}</u>"}<em>{eur},00 €</em></div>' for e,paz,spec,eur,m,ap,n in reversed(mov[-5:]))
    mx = max(perm.values())
    mbar = "".join(f'<div class="row" style="gap:10px;margin-top:6px"><span style="width:92px">{k}</span>{bar(round(v/mx*100), c)}<b style="width:64px;text-align:right;font-weight:600">{_eur(v)} €</b></div>' for (k,v),c in zip(perm.items(), ["var(--acc)","#5aa9a3","#8fb8c9","#c4b89a"]))
    # sala d'attesa
    attesa.sort()
    acc = ["Accettato","Accettato","Manca consenso","Accettato","Accettato","Da accettare"]
    acck = {"Accettato":"ok","Manca consenso":"warn","Da accettare":"info"}
    arow = "".join(f'<div class="wt"><span class="tk">{chr(65+i)}{12+i*3}</span><div><b>{paz}</b><small>{spec}, ore {ini}</small></div><div class="wr"><b>{ADESSO-_mm(arr)} min</b>{chip(acc[i], acck[acc[i]])}</div></div>' for i,(arr,paz,ini,spec,med,amb) in enumerate(attesa))
    att_media = round(sum(ADESSO-_mm(a[0]) for a in attesa)/len(attesa))
    da_arr = cont["conf"]+cont["dc"]
    stat = "".join(f'<span class="stt"><i class="s-{k}"></i>{l}<b>{v}</b></span>' for k,l,v in [("concluso","Conclusi",cont["concluso"]),("visita","In visita",cont["visita"]),("attesa","In sala d'attesa",cont["attesa"]),("conf","Confermati",cont["conf"]),("dc","Da confermare",cont["dc"]),("ns","Non presentati",cont["ns"])])
    assert sum(cont.values()) == tot
    rail = "".join(f'<a class="{"on" if on else ""}">{ic(i)}<span>{l}</span></a>' for i,l,on in [("cal","Agenda",1),("users","Pazienti",0),("file","Cartelle",0),("euro","Cassa",0),("msg","Portale",0),("chart","Report",0)])
    marchio = '<svg viewBox="0 0 40 40"><path d="M20 3c5 0 7 3.500 7 7 3.500 0 10 2 10 10s-6.500 10-10 10c0 3.500-2 7-7 7s-7-3.500-7-7C9.500 30 3 28 3 20s6.500-10 10-10c0-3.500 2-7 7-7z" fill="#e6f4f1"/><path d="M20 31V16M20 22c0-4 2.500-6.500 6.500-6.500 0 4-2.500 6.500-6.500 6.500zM20 26c0-3.500-2.200-5.500-5.800-5.500 0 3.500 2.200 5.500 5.800 5.500z" fill="none" stroke="#0e7c7b" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    inner = f'''<div class="sx"><aside class="rail"><div class="lg">{marchio}</div><nav>{rail}</nav><div class="sp"></div><a>{ic("cog")}<span>Impost.</span></a><span class="av">SD</span></aside>
<div class="main"><header class="top"><div class="wm"><b>Villa Albore</b><span>POLIAMBULATORIO</span></div>{tabs(["Giorno","Settimana","Per medico","Liste d'attesa"],"Giorno")}
<div class="dnav">{ic("left")}<b>Mercoledì 25 novembre 2026</b>{ic("right")}</div><span class="pill">Oggi</span><span class="pill">Sede di Conegliano</span>
<div class="search" style="width:230px">{ic("search")}Cerca paziente o codice<kbd>/</kbd></div><div class="bell" style="margin-left:0">{ic("bell")}<i>3</i></div></header>
<div class="cx"><div class="lf"><div class="hd"><div><h1>Agenda del giorno</h1><p>{tot} appuntamenti in 5 agende, {web} prenotati dal portale. Sono le {_hh(ADESSO)}</p></div><span class="sp"></span><button class="btn">Stampa agenda</button><button class="btn p">{ic("plus")}Nuovo appuntamento</button></div>
<div class="card ag"><div class="sts">{stat}<span class="sp"></span><span>Visite da 20, 30 e 45 minuti</span></div><div class="agh"><div class="ah0">{ic("clock")}</div>{testa}</div>
<div class="agb"><div class="hr">{ore}</div>{colonne}<div class="now" style="top:{y(ADESSO):.1f}px"><span>{_hh(ADESSO)}</span></div></div></div></div>
<div class="rt"><div class="card"><div class="ct">Sala d'attesa<span>{len(attesa)} presenti, attesa media {att_media} min</span></div>{arow}</div>
<div class="card"><div class="ct">Incassi di oggi<span>{fatt} fatture emesse</span></div><div class="inc"><div><small>Incassato</small><strong>{_eur(incassato)} €</strong></div><div><small>Da incassare</small><strong class="w2">{_eur(da_inc)} €</strong></div></div>{mbar}<hr>{mrow}</div>
<div class="card pm"><div class="row"><b>Promemoria per domani</b><span class="sp"></span>{chip("Inviati alle 09:00","ok")}</div><div class="sm" style="margin-top:5px">38 confermati su 41, 3 da richiamare. 2 pazienti hanno chiesto di spostare: proposte pronte da approvare.</div></div></div></div></div></div>'''
    css = '''
.sx{display:grid;grid-template-columns:68px 1fr;height:900px}
.rail{background:#0c3b3c;display:flex;flex-direction:column;align-items:center;padding:12px 0 14px;gap:4px}
.rail .lg svg{width:40px;height:40px;display:block;margin-bottom:12px}
.rail nav{display:flex;flex-direction:column;gap:4px}
.rail a{width:56px;padding:8px 0 6px;border-radius:10px;display:flex;flex-direction:column;align-items:center;gap:3px;color:#9cc5c1;font-size:9.5px;font-weight:500}
.rail a svg{width:18px;height:18px}.rail a.on{background:#14595a;color:#fff}
.rail .av{background:#14595a;color:#d7efec;margin-top:8px}
.top{padding:0 18px 0 16px}
.wm{font-family:Manrope,Poppins,sans-serif;line-height:1.05;margin-right:10px}.wm b{display:block;font-weight:800;font-size:17px;letter-spacing:-.02em;color:#0c3b3c}.wm span{font-size:8.5px;letter-spacing:.24em;color:#0e7c7b;font-weight:700}
.dnav{display:flex;align-items:center;gap:6px;margin-left:6px}.dnav svg{width:26px;height:26px;padding:5px;border:1px solid var(--line);border-radius:8px;color:var(--mut)}.dnav b{font-weight:600;font-size:13px;padding:0 4px}
.search{margin-left:auto}.search svg{width:14px;height:14px}
.cx{display:grid;grid-template-columns:1fr 344px;gap:14px;padding:14px 18px 16px;flex:1;min-height:0}
.lf{display:flex;flex-direction:column;gap:11px;min-width:0}.rt{display:flex;flex-direction:column;gap:11px}
.hd{display:flex;align-items:center;gap:14px}.hd h1{white-space:nowrap;font-size:19px;font-weight:600;color:var(--strong);letter-spacing:-.02em;line-height:1.2}.hd p{white-space:nowrap;color:var(--mut);font-size:12px}
.sts{display:flex;gap:16px;font-size:11.5px;color:var(--mut);padding:7px 14px;border-bottom:1px solid var(--line)}.stt{display:flex;align-items:center;gap:5px;white-space:nowrap}.stt b{color:var(--ink);font-weight:600}
.stt i{width:10px;height:10px;border-radius:3px;display:block}
.btn{white-space:nowrap}.main{height:900px;overflow:hidden}.btn svg{width:14px;height:14px}
i.s-concluso{background:#d9dfe2}i.s-visita{background:var(--acc)}i.s-attesa{background:#f0b54a}i.s-conf{background:#bfe3df;border:1px solid #7fc4bd}i.s-dc{background:#fff;border:1px dashed #8a99a6}i.s-ns{background:#f3c1bb}
.ag{padding:0;flex:1;display:flex;flex-direction:column;overflow:hidden}
.agh{display:grid;grid-template-columns:50px repeat(5,1fr);border-bottom:1px solid var(--line);background:#fbfcfc}
.ah0{display:grid;place-items:center;color:var(--mut)}.ah0 svg{width:15px;height:15px}
.ah{padding:7px 10px 7px;border-left:1px solid var(--line);display:grid;grid-template-columns:1fr auto;line-height:1.3}.ah span,.ah em{white-space:nowrap}.ah b{font-weight:600;color:var(--strong)}.ah span{grid-column:1;color:var(--mut);font-size:11.5px}.ah em{grid-column:2;grid-row:1/3;align-self:center;font-style:normal;font-size:10.5px;color:var(--acc);background:var(--acc-soft);border-radius:6px;padding:2px 7px;font-weight:600}
.agb{display:grid;grid-template-columns:50px repeat(5,1fr);position:relative;height:660px;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(#f1f4f4 1px,transparent 1px);background-size:100% 66px,100% 33px}
.hr{position:relative}.hr span{position:absolute;right:8px;font-family:"JetBrains Mono",monospace;font-size:10.5px;color:var(--mut);transform:translateY(3px)}
.ac{position:relative;border-left:1px solid var(--line)}
.ap{position:absolute;left:3px;right:3px;border-radius:5px;padding:1px 6px 0 7px;overflow:hidden;font-size:11px;line-height:1.35;border-left:3px solid transparent}
.ap .l1{display:flex;gap:6px;align-items:baseline;white-space:nowrap}.ap .mono{font-size:10px;opacity:.75}.ap b{font-weight:600}.ap small{font-size:10.5px;opacity:.8;overflow:hidden;text-overflow:ellipsis}
.ap .l2{font-size:10.5px;opacity:.82;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ap .w{margin-left:auto;font-style:normal;font-size:8.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;border:1px solid currentColor;border-radius:4px;padding:0 3px;opacity:.7;line-height:1.35}
.s-concluso.ap{background:#eef1f2;color:#6b7a84;border-left-color:#c3ccd1}
.s-visita.ap{background:var(--acc);color:#fff;border-left-color:#075453}
.s-attesa.ap{background:#fdf1d8;color:#7a4b06;border-left-color:#f0b54a}
.s-conf.ap{background:#e2f3f1;color:#0b4a49;border-left-color:#5fb5ad}
.s-dc.ap{background:#fff;color:#4a5965;border:1px dashed #9aa8b3;border-left:3px solid #9aa8b3}
.s-ns.ap{background:#fde8e6;color:#a8322a;border-left-color:#e08a82}.s-ns.ap b{text-decoration:line-through}
.pz{position:absolute;left:0;right:0;background:repeating-linear-gradient(135deg,#f4f6f6 0 6px,#eaeeee 6px 7px);display:grid;place-items:center}.pz span{font-size:10.5px;color:#7d8a92;background:#f4f6f6;padding:1px 8px;border-radius:5px}
.now{position:absolute;left:50px;right:0;height:0;border-top:1.500px solid #d92d20;z-index:3}.now span{position:absolute;left:-44px;top:-8px;background:#d92d20;color:#fff;font-family:"JetBrains Mono",monospace;font-size:10px;border-radius:4px;padding:0 4px;line-height:15px}
.rt .card{padding:12px 14px}.rt .ct{margin-bottom:6px}
.wt{display:grid;grid-template-columns:34px 1fr auto;gap:9px;align-items:center;padding:5px 0;border-bottom:1px solid var(--line)}.wt:last-child{border:0;padding-bottom:0}
.wt .tk{font-family:"JetBrains Mono",monospace;font-size:11px;font-weight:500;background:var(--bg);border:1px solid var(--line);border-radius:6px;text-align:center;padding:4px 0}
.wt b{font-weight:600;display:block}.wt small{white-space:nowrap;color:var(--mut);font-size:11px}.wr{text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:2px}.wr b{font-size:11.5px}.wr .chip{height:18px;font-size:10.5px;padding:0 6px}
.inc{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:4px}.inc small{color:var(--mut);font-size:11.5px;display:block}.inc strong{font-size:21px;font-weight:600;letter-spacing:-.02em;color:var(--strong)}.inc .w2{color:var(--warn)}
.rt hr{margin:9px 0 3px}
.mv{display:grid;grid-template-columns:38px 62px 1fr auto;gap:0 6px;align-items:center;padding:4px 0;border-bottom:1px solid var(--line);font-size:11.5px}.mv:last-child{border:0;padding-bottom:0}
.mv span{color:var(--mut);font-size:10.5px}.mv b{font-weight:600}.mv small{color:var(--mut);font-size:11px}.mv em{font-style:normal;font-weight:600;text-align:right}
.mv u,.mv .chip{text-decoration:none;color:var(--mut);font-size:11px;justify-self:start}.mv .chip{height:17px;font-size:10px;padding:0 6px}
.pm{flex:1}.pm b{font-weight:600;color:var(--strong)}'''
    return _doc("--acc:#0e7c7b;--acc-soft:#e1f2f0;--bg:#f2f5f5;--strong:#0c3b3c;--line:#e2e8e8;--info:#0e7c7b;--info-bg:#e1f2f0", css, inner, "&family=Manrope:wght@600;700;800")
