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
.ap{z-index:2}.now{position:absolute;left:50px;right:0;height:0;border-top:1.500px solid #d92d20;z-index:1}.now span{position:absolute;left:-44px;top:-8px;background:#d92d20;color:#fff;font-family:"JetBrains Mono",monospace;font-size:10px;border-radius:4px;padding:0 4px;line-height:15px}
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

# ── B2. Turismo e hospitality: planning delle camere (ossatura con navigazione in alto) ──
@reg("turismo-hospitality")
def _hotel():
    GG = 14; OGGI = 2     # 0 = lunedì 23 novembre 2026
    sett = ["lun","mar","mer","gio","ven","sab","dom"]
    giorni = [(sett[i%7], 23+i if i < 8 else i-7, "nov" if i < 8 else "dic") for i in range(GG)]
    CAN = {"D":("Sito diretto","#b5532c"),"P":("Portali","#3d6f8e"),"A":("Agenzie","#74853a"),"T":("Telefono ed email","#8f7a63")}
    # camera: [(arrivo, notti, ospite, canale, nota)]  nota: opz = opzione, fs = fuori servizio
    tipi = [
     ("Classic", 118, [
      ("101",[(-1,3,"Bianchi L.","P",""),(2,2,"Keller T.","P",""),(4,3,"Marchiori S.","D",""),(7,3,"Carraro B.","T",""),(11,3,"Visentin A.","D","")]),
      ("102",[(0,3,"Ferraro G.","D",""),(4,2,"Okafor N.","P",""),(8,2,"Lazzari P.","A",""),(12,2,"Rinaldi C.","D","")]),
      ("103",[(1,2,"Hoffmann K.","P",""),(3,4,"Zanella R.","D",""),(8,2,"Brandt O.","P",""),(11,3,"Petit A.","P","")]),
      ("104",[(2,3,"Colombo E.","A",""),(5,2,"Sartori M.","D",""),(7,2,"Pozzi A.","D",""),(12,2,"Bruni F.","P","")]),
      ("105",[(-2,4,"Gr. Alpiview","A",""),(4,3,"Moretti D.","D",""),(9,1,"Testa V.","T",""),(11,3,"Lindqvist E.","P","")]),
      ("106",[(2,1,"Pavan G.","T",""),(5,2,"De Marchi I.","D",""),(8,3,"Edilnova Srl","T",""),(11,3,"Fabbri N.","D","")]),
      ("107",[(0,4,"Fuori servizio, bagno","","fs"),(5,2,"Russo A.","P",""),(12,2,"Wagner J.","P","")])]),
     ("Superior", 148, [
      ("201",[(0,4,"Dubois C.","D",""),(4,3,"Galli B.","P",""),(7,3,"Galvani R.","A",""),(10,4,"Conti R.","D","")]),
      ("202",[(1,1,"Mancini O.","T",""),(2,4,"Schneider U.","P",""),(7,3,"Tanaka H.","P",""),(11,2,"Barbieri L.","A","")]),
      ("203",[(-1,3,"Tosi F.","D",""),(3,3,"Novak P.","P",""),(6,2,"Greco S.","D",""),(11,3,"Martini G.","D","")]),
      ("204",[(2,2,"Ricci T.","D",""),(4,3,"Jensen M.","P",""),(8,3,"Orlandi M.","D",""),(12,2,"Vitale C.","A","")]),
      ("205",[(0,5,"Benetti A.","A",""),(5,2,"Leone P.","D",""),(10,4,"Fischer D.","P","")]),
      ("206",[(3,2,"Caruso E.","P",""),(5,2,"Ag. Dolomia","A","opz"),(11,3,"Villa M.","D","")]),
      ("207",[(1,3,"Romano S.","D",""),(4,2,"Costa I.","T",""),(7,4,"Bellini C.","T",""),(12,2,"Meyer L.","P","")])]),
     ("Junior Suite", 196, [
      ("301",[(2,3,"Donati V.","D",""),(5,2,"Bernard J.","P",""),(8,2,"Parisi L.","D",""),(11,3,"Sala R.","D","")]),
      ("302",[(-1,3,"Kowalski A.","P",""),(4,3,"Pellegrini F.","D",""),(11,2,"Monti E.","A","")]),
      ("303",[(1,4,"Rizzo C.","D",""),(5,2,"Amato G.","P",""),(7,2,"Weber S.","P",""),(12,2,"Ferri D.","D","")]),
      ("304",[(4,2,"Bassi O.","D",""),(11,3,"Smith R.","P","")])]),
     ("Suite", 264, [
      ("401",[(2,2,"Serra L.","D",""),(4,3,"Marini A.","D",""),(9,2,"Negri F.","D",""),(11,3,"Lombardi P.","D","")]),
      ("402",[(0,3,"Fontana M.","T",""),(5,2,"De Luca B.","P",""),(11,3,"Girard N.","P","")])]),
    ]
    NCAM = sum(len(c) for _,_,c in tipi)
    occ = [0]*GG; notti_can = {k:0 for k in CAN}; arrivi = []; partenze = []; opz = 0
    righe = ""
    celle = "".join(f'<i class="{"we" if giorni[d][0] in("sab","dom") else ""}{" og" if d==OGGI else ""}"></i>' for d in range(GG))
    for tipo, tar, cam in tipi:
        righe += f'<div class="tg"><b>{tipo}</b><span>{len(cam)} camere, da {tar} € a notte</span></div>'
        for num, pren in cam:
            barre = ""; part_oggi = False; fs_oggi = False
            for arr, nn, osp, can, nota in pren:
                dep = arr+nn
                if nota == "fs":
                    if arr <= OGGI < dep: fs_oggi = True
                    l = max(arr, 0)/GG*100; r = min(dep, GG)/GG*100
                    barre += f'<div class="bk fs" style="left:{l:.3f}%;width:calc({r-l:.3f}% - 2px)"><span>{osp}</span></div>'
                    continue
                for d in range(max(arr,0), min(dep,GG)):
                    occ[d] += 1; notti_can[can] += 1
                if nota == "opz": opz += 1
                if arr == OGGI: arrivi.append((num, osp, nn, can, tipo))
                if dep == OGGI: partenze.append((num, osp, nn, can, tipo)); part_oggi = True
                l = max(arr+.5, 0)/GG*100; r = min(dep+.5, GG)/GG*100
                cls = "bk"+(" opz" if nota=="opz" else "")+(" cl" if arr < 0 else "")+(" cr" if dep+.5 > GG else "")+(" in" if arr <= OGGI < dep and arr != OGGI else "")
                barre += f'<div class="{cls}" style="left:calc({l:.3f}% + 1px);width:calc({r-l:.3f}% - 3px);--c:{CAN[can][1]}"><span>{osp}</span>{f"<em>{nn}n</em>" if nn > 1 else ""}</div>'
            st = "fs" if fs_oggi else ("rf" if part_oggi else "ok")
            righe += f'<div class="tr"><div class="rm"><i class="hk {st}"></i><b class="mono">{num}</b></div><div class="tk">{celle}{barre}</div></div>'
    testa = "".join(f'<div class="dh{" we" if g in("sab","dom") else ""}{" og" if d==OGGI else ""}"><small>{g}</small><b>{n}</b><span>{m}</span></div>' for d,(g,n,m) in enumerate(giorni))
    def tono(o):
        p = o/NCAM
        return "o4" if p >= .9 else "o3" if p >= .75 else "o2" if p >= .55 else "o1"
    occr = "".join(f'<div class="oc {tono(o)}{" og" if d==OGGI else ""}"><b>{round(o/NCAM*100)}%</b><span>{o}/{NCAM}</span></div>' for d,o in enumerate(occ))
    def tariffa(d):
        g = giorni[d][0]; t = 138 if g in ("ven","sab") else 118
        if d >= 11: t += 20            # ponte dell'Immacolata
        return t
    tarr = "".join(f'<div class="oc ta{" og" if d==OGGI else ""}"><b>{tariffa(d)} €</b>{f"<span class=up>+{10 if occ[d] < 19 else 15} €</span>" if occ[d]/NCAM >= .85 else "<span>invariata</span>"}</div>' for d in range(GG))
    n_sugg = sum(1 for o in occ if o/NCAM >= .85)
    tot_n = sum(notti_can.values()); assert tot_n == sum(occ)
    occ_med = round(tot_n/(NCAM*GG)*100)
    # arrivi e partenze di oggi
    sa = ["Check-in fatto","Check-in fatto","Pre check-in","Atteso alle 15:00","Atteso alle 16:30","Pre check-in","Atteso alle 18:00"]
    ka = {"Check-in fatto":"ok","Pre check-in":"info"}
    ar = "".join(f'<div class="ad"><b class="mono">{num}</b><i style="background:{CAN[can][1]}"></i><div class="l"><b>{osp}</b><small>{tipo}, {nn} {"notte" if nn==1 else "notti"}</small></div>{chip(sa[i], ka.get(sa[i],"mu"))}</div>' for i,(num,osp,nn,can,tipo) in enumerate(arrivi))
    sp_ = ["Uscito alle 08:40","Uscito alle 09:15","Conto 64,00 €","Uscito alle 10:05","Esce alle 12:00"]
    kp = {"Conto 64,00 €":"warn","Esce alle 12:00":"info"}
    pa = "".join(f'<div class="ad"><b class="mono">{num}</b><i style="background:{CAN[can][1]}"></i><div class="l"><b>{osp}</b><small>{tipo}, {nn} {"notte" if nn==1 else "notti"}</small></div>{chip(sp_[i], kp.get(sp_[i],"mu"))}</div>' for i,(num,osp,nn,can,tipo) in enumerate(partenze))
    fatti = sum(1 for x in sa[:len(arrivi)] if x == "Check-in fatto"); usciti = sum(1 for x in sp_[:len(partenze)] if x.startswith("Uscito"))
    stack = "".join(f'<i style="width:{v/tot_n*100:.2f}%;background:{CAN[k][1]}"></i>' for k,v in notti_can.items())
    leg = "".join(f'<div class="cn"><i style="background:{CAN[k][1]}"></i>{CAN[k][0]}<span class="sp"></span><b>{v}</b><em>{round(v/tot_n*100)}%</em></div>' for k,v in notti_can.items())
    legc = "".join(f'<span><i style="background:{c}"></i>{n}</span>' for n,c in CAN.values())
    marchio = '<svg viewBox="0 0 34 34"><path d="M5 30V15a12 12 0 0 1 24 0v15" fill="none" stroke="#e9c9a4" stroke-width="1.600"/><path d="M10.500 30V16a6.500 6.500 0 0 1 13 0v14" fill="#b5532c"/><path d="M2 30h30" stroke="#e9c9a4" stroke-width="1.600" stroke-linecap="round"/><circle cx="17" cy="7.500" r="1.500" fill="#e9c9a4"/></svg>'
    menu = "".join(f'<a class="{"on" if on else ""}">{l}{f"<b>{b}</b>" if b else ""}</a>' for l,b,on in [("Planning","",1),("Prenotazioni","",0),("Tariffe e canali","",0),("Ospiti","",0),("Conti","1",0),("Governante","5",0),("Report","",0)])
    inner = f'''<div class="hx"><header class="hn"><div class="hb">{marchio}<div><b>Corte Lavinia</b><span>HOTEL IN ASOLO</span></div></div><nav>{menu}</nav><span class="sp"></span>
<div class="hs">{ic("search")}Cerca ospite, camera o prenotazione</div><div class="hbell">{ic("bell")}<i>2</i></div><div class="hu"><span class="av">MT</span><div><b>Marta Toniolo</b><small>Ricevimento</small></div></div></header>
<div class="sb"><div class="dnav2">{ic("left")}<b>23 novembre - 6 dicembre 2026</b>{ic("right")}</div><span class="pill">Oggi</span>{tabs(["14 giorni","Mese","Per tipologia"],"14 giorni")}<div class="lg2">{legc}<span><i class="opzl"></i>Opzione</span><span><i class="hk ok"></i>Pulita</span><span><i class="hk rf"></i>Da rifare</span></div><span class="sp"></span><button class="btn p">{ic("plus")}Nuova prenotazione</button></div>
<div class="hc"><div class="card tp"><div class="th"><div class="rm0">Camera</div><div class="dhs">{testa}</div></div><div class="tb">{righe}</div>
<div class="tf"><div class="rm0"><b>Occupazione</b><span>media {occ_med}%</span></div><div class="dhs">{occr}</div></div>
<div class="tf"><div class="rm0"><b>Tariffa Classic</b><span>{n_sugg} suggerimenti</span></div><div class="dhs">{tarr}</div></div></div>
<div class="hr2"><div class="card"><div class="ct">Oggi, mercoledì 25 novembre<span>ore 11:20</span></div><div class="o3"><div><small>Arrivi</small><strong>{len(arrivi)}</strong><em>{fatti} già in camera</em></div><div><small>Partenze</small><strong>{len(partenze)}</strong><em>{usciti} già uscite</em></div><div><small>In casa stanotte</small><strong>{occ[OGGI]}<u>/{NCAM}</u></strong><em>occupazione {round(occ[OGGI]/NCAM*100)}%</em></div></div></div>
<div class="card"><div class="ct">Arrivi<span>{len(arrivi)} camere</span></div>{ar}</div>
<div class="card"><div class="ct">Partenze<span>{len(partenze)} camere</span></div>{pa}</div>
<div class="card" style="flex:1"><div class="ct">Notti vendute per canale<span>{tot_n} notti nei 14 giorni</span></div><div class="stk">{stack}</div>{leg}<hr><dl class="kv"><dt>Opzioni da confermare</dt><dd>{opz}, camera 206 entro gio 26</dd><dt>Richieste particolari di oggi</dt><dd>3, riepilogo pronto</dd></dl></div></div></div></div>'''
    css = '''
.hx{display:flex;flex-direction:column;height:900px;overflow:hidden}
.hn{height:54px;flex:none;background:#2b2019;color:#e8dccd;display:flex;align-items:center;gap:8px;padding:0 18px}
.hb{display:flex;align-items:center;gap:10px;margin-right:18px}.hb svg{height:32px;width:32px}.hb b{display:block;font-family:"Cormorant Garamond",serif;font-weight:600;font-size:22px;letter-spacing:.01em;color:#f6ecdf;line-height:1;white-space:nowrap}.hb span{font-size:8px;letter-spacing:.3em;color:#c9a57f;font-weight:500;white-space:nowrap}
.hn nav{display:flex;gap:2px;align-self:stretch}.hn nav a{display:flex;align-items:center;gap:6px;padding:0 13px;font-weight:500;color:#c8b9a7;border-bottom:2px solid transparent;border-top:2px solid transparent;white-space:nowrap}
.hn nav a.on{color:#fff;border-bottom-color:#e08a5b;background:#3a2c23}.hn nav b{font-size:10.5px;background:#b5532c;color:#fff;border-radius:9px;padding:0 6px;font-weight:600}
.hs{width:270px;height:32px;border-radius:8px;background:#3a2c23;color:#b3a391;display:flex;align-items:center;gap:8px;padding:0 10px;font-size:12px;white-space:nowrap}.hs svg{width:14px;height:14px}
.hbell{position:relative;width:34px;height:34px;display:grid;place-items:center;color:#d9cab8}.hbell svg{width:17px;height:17px}.hbell i{position:absolute;top:2px;right:1px;min-width:15px;height:15px;border-radius:8px;background:#e0683a;color:#fff;font-size:9.5px;font-style:normal;font-weight:700;display:grid;place-items:center}
.hu{display:flex;align-items:center;gap:9px;line-height:1.25;white-space:nowrap}.hu .av{background:#4a392d;color:#f0dcc5}.hu b{font-weight:600;color:#f6ecdf;display:block}.hu small{color:#b3a391;font-size:11px}
.sb{height:52px;flex:none;background:var(--card);border-bottom:1px solid var(--line);display:flex;align-items:center;gap:10px;padding:0 18px}
.sb .btn{white-space:nowrap}.sb .btn svg{width:14px;height:14px}
.dnav2{display:flex;align-items:center;gap:6px}.dnav2 svg{width:26px;height:26px;padding:5px;border:1px solid var(--line);border-radius:8px;color:var(--mut)}.dnav2 b{font-weight:600;font-size:13px;padding:0 4px;color:var(--strong);white-space:nowrap}
.lg2{display:flex;gap:12px;font-size:11.5px;color:var(--mut);margin-left:8px}.lg2 span{display:flex;align-items:center;gap:5px;white-space:nowrap}.lg2 i{width:10px;height:10px;border-radius:3px;display:block}
.lg2 i.opzl{background:repeating-linear-gradient(135deg,#fff 0 3px,#cdbfae 3px 4px);border:1px solid #a89987}
i.hk{width:7px;height:7px;border-radius:50%;display:block;flex:none}.hk.ok{background:#4d9a6a}.hk.rf{background:#e2a23b}.hk.fs{background:#a9a29a}
.hc{flex:1;min-height:0;display:grid;grid-template-columns:1fr 352px;gap:14px;padding:14px 18px 16px}
.tp{padding:0;display:flex;flex-direction:column;overflow:hidden}
.th,.tr,.tf{display:grid;grid-template-columns:112px 1fr}
.th{border-bottom:1px solid var(--line);background:#fcfaf7}.rm0{padding:0 0 0 14px;display:flex;flex-direction:column;justify-content:center;font-size:11.5px;color:var(--mut);line-height:1.25}.rm0 b{color:var(--strong);font-weight:600;font-size:11.5px;white-space:nowrap}.rm0 span{font-size:10.5px;white-space:nowrap}
.dhs{display:grid;grid-template-columns:repeat(14,1fr)}
.dh{padding:6px 0 5px;text-align:center;border-left:1px solid var(--line);line-height:1.15}.dh small{display:block;font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--mut)}.dh b{font-size:14px;font-weight:600;color:var(--strong)}.dh span{font-size:10px;color:var(--mut);margin-left:3px}
.dh.we{background:#f6f0e8}.dh.og{background:var(--acc);}.dh.og small,.dh.og b,.dh.og span{color:#fff}
.tb{flex:1;display:flex;flex-direction:column}
.tg{height:22px;flex:none;display:flex;align-items:center;gap:10px;padding:0 14px;background:#f4eee6;border-bottom:1px solid var(--line);font-size:11px}.tg b{font-weight:600;color:var(--strong);text-transform:uppercase;letter-spacing:.08em;font-size:10.5px}.tg span{color:var(--mut)}
.tr{flex:1;border-bottom:1px solid var(--line);min-height:0}
.rm{display:flex;align-items:center;gap:8px;padding-left:14px}.rm b{font-weight:500;font-size:12px;color:var(--strong)}
.tk{position:relative;display:grid;grid-template-columns:repeat(14,1fr)}.tk>i{border-left:1px solid var(--line);display:block}.tk>i.we{background:#faf6f0}.tk>i.og{background:#fbeee6}
.bk{position:absolute;top:3px;bottom:3px;border-radius:5px;background:var(--c);color:#fff;display:flex;align-items:center;gap:5px;padding:0 7px;font-size:11px;font-weight:500;overflow:hidden;white-space:nowrap}
.bk span{overflow:hidden;text-overflow:ellipsis}.bk em{margin-left:auto;font-style:normal;font-size:9.5px;opacity:.8;font-family:"JetBrains Mono",monospace}
.bk.cl{border-radius:0 5px 5px 0}.bk.cr{border-radius:5px 0 0 5px}
.bk.in{box-shadow:inset 3px 0 0 #0005}
.bk.opz{background:repeating-linear-gradient(135deg,#fff 0 5px,#ece3d6 5px 6px);color:#6b5a48;border:1px dashed #a89987}
.bk.fs{background:repeating-linear-gradient(135deg,#eeeae4 0 5px,#e0dad2 5px 6px);color:#756b60;border-radius:0;top:0;bottom:0;font-size:10.5px}
.tf{height:34px;flex:none;border-top:1px solid var(--line);background:#fcfaf7}.tb+.tf{border-top:0}
.oc{border-left:1px solid var(--line);text-align:center;display:flex;flex-direction:column;justify-content:center;line-height:1.2}.oc b{font-size:11.5px;font-weight:600}.oc span{font-size:9.5px;color:var(--mut)}
.o1{background:#fbf6ef}.o2{background:#f6e4d3}.o3.oc{background:#edc4a4}.o4{background:#d98f66}.o4 b,.o4 span{color:#fff}
.ta b{font-weight:500;font-family:"JetBrains Mono",monospace;font-size:11px}.ta span.up{color:var(--ok);font-weight:600}
.hr2{display:flex;flex-direction:column;gap:11px;min-height:0}.hr2 .card{padding:11px 14px}.hr2 .ct{margin-bottom:6px}
.t3{display:grid;grid-template-columns:1fr 1fr 1.25fr;gap:8px}.t3>div{border:1px solid var(--line);border-radius:9px;padding:6px 9px}.t3 small{display:block;color:var(--mut);font-size:11px}.t3 strong{font-size:21px;font-weight:600;color:var(--strong);letter-spacing:-.02em;line-height:1.2;display:block}.t3 u{text-decoration:none;font-size:13px;color:var(--mut);font-weight:500}.t3 em{font-style:normal;font-size:10.5px;color:var(--mut);white-space:nowrap}
.ad{display:grid;grid-template-columns:28px 7px 1fr auto;gap:7px;align-items:center;padding:3.500px 0;border-bottom:1px solid var(--line);line-height:1.25}.ad:last-child{border:0;padding-bottom:0}
.ad>b{font-weight:500;font-size:11.5px}.ad>i{width:7px;height:18px;border-radius:3px;display:block}.ad .l{display:flex;align-items:baseline;gap:7px;white-space:nowrap;overflow:hidden}.ad div b{font-weight:600;font-size:12px}.ad small{color:var(--mut);font-size:10.5px}.ad .chip{height:19px;font-size:10.5px;padding:0 7px}
.stk{display:flex;height:10px;border-radius:6px;overflow:hidden;gap:2px;margin:2px 0 7px}.stk i{display:block}
.cn{display:flex;align-items:center;gap:8px;padding:2.500px 0;font-size:12px}.cn i{width:9px;height:9px;border-radius:3px}.cn b{font-weight:600;width:34px;text-align:right}.cn em{font-style:normal;color:var(--mut);width:34px;text-align:right}'''
    inner = inner.replace('<div class="o3"><div><small>Arrivi', '<div class="t3"><div><small>Arrivi')
    return _doc("--acc:#b5532c;--acc-soft:#f8e9df;--bg:#f6f2ec;--strong:#2b2019;--ink:#33281f;--mut:#84776a;--line:#e8e0d5;--info:#3d6f8e;--info-bg:#e4eef4", css, inner)

# ── B3. Energia e utilities: impianti in tempo reale (tema scuro) ────────────
LOGO.update({
 "nl": _logo('<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="6.500" fill="#f2b632"/><path d="M16 2.500v4M16 25.500v4M2.500 16h4M25.500 16h4M6.500 6.500l2.800 2.800M22.700 22.700l2.800 2.800M6.500 25.500l2.800-2.800M22.700 9.300l2.800-2.800" stroke="#f2b632" stroke-width="2.200" stroke-linecap="round"/><path d="M17.500 11.500 13 17h3l-1.500 4.500L19 16h-3z" fill="#0e1418"/></svg>',
   '<b style="font-family:Space Grotesk;font-weight:700;font-size:17px;letter-spacing:-.02em;color:#f3f6f7">noviluce<br><span style="font-size:9px;font-weight:500;letter-spacing:.24em;color:#8a9aa5">ENERGIA</span></b>'),
})
def _num(x, d=0):
    return f"{x:,.{d}f}".replace(",", "X").replace(".", ",").replace("X", ".")
@reg("energia-utilities")
def _energia():
    import math
    ADESSO = 13+40/60; SR, SS = 7.42, 16.55; DT = 5/60
    GUASTO = 10+52/60
    def forma(t):
        if t <= SR or t >= SS: return 0.0
        return 0.43*math.sin(math.pi*(t-SR)/(SS-SR))**1.3
    def nuvole(t): return 1-0.11*math.exp(-((t-11.6)/0.22)**2)-0.05*math.exp(-((t-9.3)/0.18)**2)
    sig = lambda x: 1/(1+math.exp(-x))
    def consumo(t): return 380+640*sig((t-6.8)/0.45)*(1-sig((t-17.8)/0.6))-95*math.exp(-((t-12.7)/0.45)**2)+12*math.sin(t*5.1)+7*math.sin(t*13.7)
    # impianto, comune, kWp, rendimento relativo, stato
    imp = [("Cantina Colli Asolani","Maser",198.0,0.99,"ok"),("Meccanica Sile","Quinto di Treviso",496.8,1.00,"ok"),("Caseificio Pedemontano","Cavaso",120.4,0.98,"ok"),
           ("Logistica Postumia","Oderzo",850.0,1.01,"ok"),("Scuola media Marconi","Montebelluna",64.8,0.97,"rit"),("Mobilificio Livenza","Motta di Livenza",312.5,1.00,"guasto"),
           ("Az. agr. Ca' Roncade","Roncade",99.6,0.845,"calo"),("Piscine di Spresiano","Spresiano",145.2,1.00,"ok")]
    def eff(nome, e, t): return e*(2/3 if nome.startswith("Mobilificio") and t >= GUASTO else 1)
    tt = [i*DT for i in range(289)]
    n_ora = round(ADESSO/DT)
    kwp_tot = sum(x[2] for x in imp)
    righe = ""; p_ora_tot = 0; e_tot = 0; persa = 0
    H = sum(forma(t)*nuvole(t) for t in tt[:n_ora])*DT/0.84          # resa di riferimento finora, kWh/kWp
    stato = {"ok":("In produzione","ok"),"rit":("Dati in ritardo","info"),"guasto":("Guasto inverter","bad"),"calo":("Calo di resa","warn")}
    serie = [0.0]*289
    for nome, com, kwp, e, st in imp:
        for i, t in enumerate(tt): serie[i] += kwp*forma(t)*nuvole(t)*eff(nome, e, t)
        p_ora = round(kwp*forma(ADESSO)*nuvole(ADESSO)*eff(nome, e, ADESSO), 1)
        en = round(sum(kwp*forma(t)*nuvole(t)*eff(nome, e, t) for t in tt[:n_ora])*DT)
        if st == "guasto": persa = round(sum(kwp*forma(t)*nuvole(t)*e/3 for t in tt[:n_ora] if t >= GUASTO)*DT)
        p_ora_tot += p_ora; e_tot += en
        resa = en/kwp; pr = resa/H*100
        col = {"guasto":"var(--bad)","calo":"var(--warn)"}.get(st, "var(--acc)")
        righe += f'<tr><td><b class="nm">{nome}</b><span class="cm">{com}</span></td><td class="r mono">{_num(kwp,1)}</td><td style="width:128px;padding-left:16px"><div class="row" style="gap:8px"><span class="mono" style="width:44px;text-align:right">{_num(p_ora,1)}</span>{bar(round(p_ora/kwp/0.45*100), col)}</div></td><td class="r mono">{_num(en)}</td><td class="r mono">{_num(resa,2)}</td><td class="r mono" style="color:{col if st in("guasto","calo") else "inherit"}">{_num(pr,1)}%</td><td class="r">{chip(*stato[st])}</td></tr>'
    prev = [kwp_tot*forma(t)*0.985 for t in tt]
    prev_giorno = round(sum(prev)*DT)
    cons = [consumo(t) for t in tt]
    e_cons = sum(cons[:n_ora])*DT
    copertura = e_tot/e_cons*100
    pr_tot = e_tot/kwp_tot/H*100
    # grafico
    W, Hh, L, R, T, B = 860, 220, 44, 22, 10, 22; YM = 1200
    X = lambda t: L+(W-L-R)*t/24; Y = lambda v: T+(Hh-T-B)*(1-v/YM)
    linea = lambda vals, n: "M"+" L".join(f"{X(tt[i]):.1f},{Y(vals[i]):.1f}" for i in range(n))
    gr = "".join(f'<line x1="{L}" x2="{W-R}" y1="{Y(v):.1f}" y2="{Y(v):.1f}" stroke="#232e36"/><text x="{L-8}" y="{Y(v)+3.5:.1f}" text-anchor="end">{_num(v)}</text>' for v in range(0, YM+1, 300))
    gx = "".join(f'<text x="{X(h):.1f}" y="{Hh-5}" text-anchor="middle">{h:02d}:00</text>' for h in range(0, 25, 2))
    area = linea(serie, n_ora+1)+f' L{X(ADESSO):.1f},{Y(0):.1f} L{X(0):.1f},{Y(0):.1f}Z'
    svg = f'''<svg viewBox="0 0 {W} {Hh}" width="100%" height="{Hh}" class="gr"><defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2b632" stop-opacity=".42"/><stop offset="1" stop-color="#f2b632" stop-opacity=".03"/></linearGradient></defs>{gr}{gx}
<rect x="{X(ADESSO):.1f}" y="{T}" width="{X(24)-X(ADESSO):.1f}" height="{Hh-T-B}" fill="#0b1014" opacity=".45"/>
<path d="{linea(prev, 289)}" fill="none" stroke="#8a9aa5" stroke-width="1.300" stroke-dasharray="4 4"/>
<path d="{area}" fill="url(#ga)"/><path d="{linea(serie, n_ora+1)}" fill="none" stroke="#f2b632" stroke-width="2"/>
<path d="{linea(cons, n_ora+1)}" fill="none" stroke="#5ab8e6" stroke-width="1.600"/>
<line x1="{X(GUASTO):.1f}" x2="{X(GUASTO):.1f}" y1="{Y(serie[round(GUASTO/DT)])-34:.1f}" y2="{Y(serie[round(GUASTO/DT)])-5:.1f}" stroke="#ff6b5e" stroke-width="1.200"/><circle cx="{X(GUASTO):.1f}" cy="{Y(serie[round(GUASTO/DT)]):.1f}" r="3.500" fill="#0e1418" stroke="#ff6b5e" stroke-width="1.600"/>
<text x="{X(GUASTO)-6:.1f}" y="{Y(serie[round(GUASTO/DT)])-38:.1f}" text-anchor="end" fill="#ff6b5e" style="fill:#ff8a7f">10:52 guasto inverter, Motta di Livenza</text>
<line x1="{X(ADESSO):.1f}" x2="{X(ADESSO):.1f}" y1="{T}" y2="{Hh-B}" stroke="#e6edf0" stroke-width="1" opacity=".7"/><circle cx="{X(ADESSO):.1f}" cy="{Y(serie[n_ora]):.1f}" r="4" fill="#f2b632" stroke="#0e1418" stroke-width="2"/>
<text x="{X(ADESSO)+7:.1f}" y="{T+10}" style="fill:#e6edf0">adesso, 13:40</text></svg>'''
    mis = "".join(f'<div><small>{l}</small><strong>{v}<u>{u}</u></strong><em>{d}</em></div>' for l,v,u,d in [
        ("Potenza in questo momento", _num(p_ora_tot,1), " kW", f"{_num(p_ora_tot/kwp_tot*100)}% dell'installato"),
        ("Energia prodotta oggi", _num(e_tot), " kWh", f"{_num(e_tot/prev_giorno*100)}% della previsione"),
        ("Previsione a fine giornata", _num(prev_giorno), " kWh", "tramonto alle 16:33"),
        ("Performance ratio", _num(pr_tot,1), "%", "obiettivo 80%"),
        ("Consumi coperti dal sole", _num(copertura,1), "%", f"su {_num(e_cons)} kWh consumati")])
    allarmi = [("bad","Guasto inverter 2, isolamento","Mobilificio Livenza","10:52",f"Produzione a due terzi, {persa} kWh persi. Assegnato INT-1184."),
               ("warn","Calo di resa da 3 giorni","Az. agr. Ca' Roncade","08:10","PR al 71% contro 84% atteso, probabili moduli sporchi."),
               ("warn","Consumo notturno anomalo","Caseificio Pedemontano","06:00","Dalle 00:00 alle 05:00 148 kWh, +38% sulla media di 107."),
               ("info","Dati in ritardo","Scuola media Marconi","13:31","Ultima lettura 9 minuti fa, valori stimati dal contatore.")]
    al = "".join(f'<div class="al a-{k}"><i>{ic("alert" if k!="info" else "clock")}</i><div><div class="row"><b>{t}</b><span class="sp"></span><span class="mono">{o}</span></div><p><span class="pl">{pl}.</span> {d}</p></div></div>' for k,t,pl,o,d in allarmi)
    interventi = [("INT-1184","Sostituzione scheda inverter 2","Mobilificio Livenza","A. Bottega","oggi 15:30","In viaggio","warn"),
                  ("INT-1183","Lavaggio moduli","Az. agr. Ca' Roncade","Squadra Dal Pos","gio 26 nov","Pianificato","info"),
                  ("INT-1179","Verifica protezione di interfaccia","Piscine di Spresiano","M. Carniel","ven 27 nov","Pianificato","info"),
                  ("INT-1181","Manutenzione semestrale","Logistica Postumia","M. Carniel","oggi 09:00","Chiuso alle 12:30","mu")]
    aperti = sum(1 for x in interventi if x[6] != "mu")
    it = "".join(f'<div class="iv"><div class="row"><span class="mono">{c}</span><span class="sp"></span>{chip(s,k)}</div><b>{t}</b><div class="row sm"><span>{pl}</span><span class="sp"></span><span>{te}, {q}</span></div></div>' for c,t,pl,te,q,s,k in interventi)
    n_ok = sum(1 for x in imp if x[4] == "ok")
    body = f'''<div class="h"><div><h1>Impianti in tempo reale</h1><p>{len(imp)} impianti fotovoltaici, {_num(kwp_tot,1)} kWp installati. Mercoledì 25 novembre 2026, ore 13:40</p></div><div class="act">{chip(f"{n_ok} in produzione regolare","ok")}{chip(f"{len(allarmi)} segnalazioni aperte","warn")}<button class="btn">Report per il cliente</button><button class="btn p">Nuovo intervento</button></div></div>
<div class="g" style="grid-template-columns:1fr 348px">
<div class="card"><div class="ms">{mis}</div>{svg}<div class="lg"><span><i style="background:#f2b632"></i>Produzione, kW</span><span><i class="ds"></i>Previsione</span><span><i style="background:#5ab8e6"></i>Consumi dei clienti, kW</span><span class="sp"></span><span>Letture ogni 5 minuti da 8 impianti e 23 contatori</span></div></div>
<div class="card"><div class="ct">Allarmi e anomalie<span>{len(allarmi)} aperti</span></div>{al}</div></div>
<div class="g" style="grid-template-columns:1fr 348px;flex:1;min-height:0">
<div class="card"><div class="ct">Stato degli impianti<span>resa di riferimento finora {_num(H,2)} kWh/kWp</span></div><table class="ti"><tr><th>Impianto</th><th class="r">kWp</th><th style="padding-left:18px">Potenza ora, kW</th><th class="r">Oggi, kWh</th><th class="r">kWh/kWp</th><th class="r">PR</th><th class="r">Stato</th></tr>{righe}
<tr class="tt"><td><b class="nm">Totale</b></td><td class="r mono">{_num(kwp_tot,1)}</td><td style="padding-left:16px"><span class="mono" style="display:inline-block;width:44px;text-align:right">{_num(p_ora_tot,1)}</span></td><td class="r mono">{_num(e_tot)}</td><td class="r mono">{_num(e_tot/kwp_tot,2)}</td><td class="r mono">{_num(pr_tot,1)}%</td><td></td></tr></table></div>
<div class="card"><div class="ct">Interventi dei tecnici<span>{aperti} aperti</span></div>{it}</div></div>'''
    n = nav([("Panoramica","grid",""),("Impianti","sun",str(len(imp))),("Contatori","pulse","23"),("Allarmi","alert",str(len(allarmi))),("Interventi","wrench",str(aperti)),("Clienti e contratti","users",""),("Report","file","")],"Panoramica")
    return page("energia","--bg:#0e1418;--card:#151d23;--ink:#e6edf0;--strong:#f5f8f9;--mut:#8a9aa5;--line:#232e36;--acc:#f2b632;--acc-soft:#2a2414;--side:#0b1014;--side-ink:#b9c6cd;--ok:#4ccf8e;--ok-bg:#12301f;--warn:#f0a23a;--warn-bg:#33240f;--bad:#ff7a6e;--bad-bg:#3a1b19;--info:#5ab8e6;--info-bg:#12303f","",LOGO["nl"],n,"Panoramica","Luca Bortolin","Sala controllo","",
        tabs(["Tempo reale","Produzione","Consumi","Previsioni"],"Tempo reale")+'<span class="pill">Tutti i clienti</span><span class="pill"><i class="dot"></i>Dati aggiornati alle 13:40</span>',body,
        '''.top{background:#11181d}.btn{background:#1b252c;color:var(--ink);white-space:nowrap}.btn.p{color:#0e1418}.nav a.on b{color:#0e1418}.nav b{background:#232e36}.pill{background:#1b252c}.bell{background:#1b252c}.c-mu{background:#232e36;color:#a5b3bc}.bar{background:#232e36}.tabs span.on{background:#232e36}.card{box-shadow:none}
.body{padding:16px 22px;gap:12px}.h .act{align-items:center}
.ms{display:grid;grid-template-columns:repeat(5,auto);justify-content:space-between;gap:10px;margin-bottom:8px}.ms small,.ms em{white-space:nowrap}.ms small{display:block;color:var(--mut);font-size:11.5px}.ms strong{font-family:"Space Grotesk";font-size:23px;font-weight:600;letter-spacing:-.02em;color:var(--strong);line-height:1.25;display:block}.ms u{text-decoration:none;font-size:13px;color:var(--mut);font-weight:500}.ms em{font-style:normal;font-size:11px;color:var(--mut)}
.ms div:first-child strong{color:var(--acc)}
.gr text{font-family:"JetBrains Mono",monospace;font-size:10px;fill:#6f808b}
.lg{display:flex;gap:16px;font-size:11.5px;color:var(--mut);margin-top:4px}.lg span{display:flex;align-items:center;gap:6px}.lg i{width:14px;height:3px;border-radius:2px;display:block}.lg i.ds{background:repeating-linear-gradient(90deg,#8a9aa5 0 4px,transparent 4px 7px)}
.al{display:grid;grid-template-columns:26px 1fr;gap:10px;padding:7px 0;border-bottom:1px solid var(--line)}.al:last-child{border:0;padding-bottom:0}.al i{width:26px;height:26px;border-radius:8px;display:grid;place-items:center}.al i svg{width:14px;height:14px}
.a-bad i{background:var(--bad-bg);color:var(--bad)}.a-warn i{background:var(--warn-bg);color:var(--warn)}.a-info i{background:var(--info-bg);color:var(--info)}
.al b{font-weight:600;color:var(--strong)}.al .mono{font-size:11px;color:var(--mut)}.al .pl{color:var(--acc);font-size:11px;font-weight:500}.al p{color:var(--mut);font-size:11.5px;line-height:1.4;margin-top:1px}
.ti td{padding:5.500px 10px 5.500px 0}.ti td.r,.ti th.r{padding-left:2px}.ti td:last-child,.ti th:last-child{padding-right:10px}.ti .nm{font-weight:600;color:var(--strong)}.ti .cm{color:var(--mut);font-size:11.5px;margin-left:8px}.ti .mono{font-size:11.5px}.ti .chip{height:20px;font-size:11px}
.tt td{border-top:1px solid #33414b;background:#11181d}.tt .mono{font-weight:500;color:var(--strong)}
.iv{padding:6px 0;border-bottom:1px solid var(--line)}.iv:last-child{border:0;padding-bottom:0}.iv .mono{font-size:11px;color:var(--mut)}.iv b{display:block;font-weight:600;color:var(--strong);margin:1px 0}.iv .chip{height:19px;font-size:10.5px}.iv .sm{font-size:11px}''',ws="Monitoraggio impianti",avvisi=len(allarmi))

# ── B4. Agricoltura e agroindustria: appezzamenti, quaderno di campagna, lotti ──
LOGO.update({
 "ts": _logo('<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#4f5d1c"/><circle cx="16" cy="10" r="3.600" fill="#e9c46a"/><path d="M4.500 19c5-3.500 18-3.500 23 0M5.500 23.500c4.500-3 16.500-3 21 0M9 27.500c3.500-2 10.500-2 14 0" fill="none" stroke="#f1eed9" stroke-width="1.800" stroke-linecap="round"/></svg>',
   '<b style="font-family:Fraunces,serif;font-weight:600;font-size:17px;letter-spacing:-.01em;color:#2f3312">Tenute Sorgiva<br><span style="font-family:Poppins;font-size:8.500px;font-weight:600;letter-spacing:.22em;color:#7c8544">SOCIETÀ AGRICOLA</span></b>'),
})
@reg("agricoltura-agroindustria")
def _agri():
    COL = {"Glera":"#7d5a96","Pinot grigio":"#b79ac8","Kiwi":"#6f9f45","Radicchio tardivo":"#a8324a","Frumento tenero":"#d8b24a","Stoppie di mais":"#c3b89d"}
    # codice, nome, coltura, ettari, poligono, centro etichetta
    app = [("V1","Vigna Alta","Glera",6.40,"10,10 150,10 160,133 10,140",(82,74)),
           ("V2","Vigna del Pozzo","Pinot grigio",4.10,"157,10 262,10 276,128 167,133",(215,72)),
           ("F1","Campo Grande","Frumento tenero",12.50,"269,10 510,10 510,118 283,128",(392,68)),
           ("K1","Actinidieto Nord","Kiwi",3.80,"10,160 121,155 126,240 10,244",(66,202)),
           ("F2","Braida","Frumento tenero",7.30,"10,251 126,247 131,320 10,320",(68,283)),
           ("R1","Campo Lungo","Radicchio tardivo",5.20,"128,155 262,149 273,320 138,320",(200,236)),
           ("R2","Le Basse","Radicchio tardivo",3.60,"269,149 371,144 385,320 280,320",(326,236)),
           ("M1","Prà dei Salici","Stoppie di mais",9.80,"378,144 510,138 510,320 392,320",(448,232))]
    ha_tot = sum(a[3] for a in app)
    ha_col = {c: sum(a[3] for a in app if a[2] == c) for c in COL}
    chiaro = {"Pinot grigio","Frumento tenero","Stoppie di mais"}
    pol = "".join(f'<polygon points="{pts}" fill="{COL[c]}" class="{"sel" if cod=="R1" else ""}"/><text x="{cx}" y="{cy}" class="cd" style="fill:{"#2f3312" if c in chiaro else "#fff"}">{cod}</text><text x="{cx}" y="{cy+17}" class="ha" style="fill:{"#2f3312" if c in chiaro else "#fff"}">{_num(h,2)} ha</text>' for cod,n,c,h,pts,(cx,cy) in app)
    sonde = "".join(f'<circle cx="{x}" cy="{y}" r="6" fill="#fff" stroke="{"#c0362c" if k else "#2f3312"}" stroke-width="2.400"/><circle cx="{x}" cy="{y}" r="2" fill="{"#c0362c" if k else "#2f3312"}"/>' for x,y,k in [(120,40,0),(98,180,0),(236,186,0),(352,286,1),(470,40,0)])
    mappa = f'''<svg viewBox="0 0 520 330" width="100%" class="mp"><rect width="520" height="330" rx="10" fill="#eceadb"/>
<path d="M0,147 C140,142 300,140 520,129" fill="none" stroke="#fff" stroke-width="9"/><path d="M0,147 C140,142 300,140 520,129" fill="none" stroke="#cfcbb4" stroke-width="1" stroke-dasharray="7 6"/>
{pol}<path d="M516,0 C512,90 518,200 514,330" fill="none" stroke="#6fa8c9" stroke-width="5" stroke-linecap="round"/>
<g transform="translate(288,131)"><rect x="-9" y="-2" width="24" height="15" rx="2" fill="#fff" stroke="#2f3312" stroke-width="1.600"/><path d="M-12,0 3,-11 18,0" fill="#fff" stroke="#2f3312" stroke-width="1.600" stroke-linejoin="round"/></g>
{sonde}<g transform="translate(486,182)"><path d="M0,-18 6,0 0,-4 -6,0z" fill="#2f3312"/><text x="0" y="13" text-anchor="middle" style="font-size:11px;font-weight:600;fill:#2f3312">N</text></g>
<g transform="translate(410,306)"><path d="M0,0h78M0,-4v8M78,-4v8" stroke="#2f3312" stroke-width="1.500"/><text x="39" y="-7" text-anchor="middle" style="font-size:11px;fill:#2f3312">200 m</text></g></svg>'''
    legm = "".join(f'<div class="lc"><i style="background:{COL[c]}"></i><span>{c}</span><b>{_num(h,2)} ha</b></div>' for c,h in ha_col.items())
    # lotti di raccolta: lotto, data, appezzamento, prodotto, kg, destinazione, documento, stato
    lotti = [("L-RD-2611","mer 25 nov","R1","Radicchio tardivo",4180,"Vasche 1-4","in attesa","In lavorazione","info"),
             ("L-RD-2610","lun 23 nov","R2","Radicchio tardivo",3240,"OP della Marca, DDT 318","DDT 318","Conferito","ok"),
             ("L-RD-2609","ven 20 nov","R1","Radicchio tardivo",3960,"OP della Marca, DDT 311","DDT 311","Conferito","ok"),
             ("L-KW-2604","gio 12 nov","K1","Kiwi",28600,"Cella 2","Bolla int. 44","In cella","mu"),
             ("L-KW-2603","lun 9 nov","K1","Kiwi",31400,"Cella 1","Bolla int. 43","In cella","mu")]
    kg_tot = sum(l[4] for l in lotti)
    kg_rad = sum(l[4] for l in lotti if l[3].startswith("Radicchio")); kg_kw = kg_tot-kg_rad
    lr = "".join(f'<tr><td class="mono">{a}</td><td>{b[4:]}</td><td><i class="pt" style="background:{COL[d]}"></i>{d}, <b class="mono">{c}</b></td><td class="r mono">{_num(e)}</td><td>{f}</td><td class="r">{chip(h,k)}</td></tr>' for a,b,c,d,e,f,g,h,k in lotti)
    kgl = {l[0]: l[4] for l in lotti}
    # quaderno di campagna
    quad = [("mer 25 nov","R1","Raccolta manuale","Lotto L-RD-2611",f"{_num(kgl['L-RD-2611'])} kg","Squadra Zanin","In corso","info"),
            ("mer 25 nov","V1","Potatura secca","","1,20 ha","G. Tonon","Dettata a voce","warn"),
            ("mar 24 nov","K1","Trattamento, batteriosi","Rame idrossido, 2,5 kg/ha","3,80 ha","L. Brun","Registrato","ok"),
            ("lun 23 nov","R2","Raccolta manuale","Lotto L-RD-2610",f"{_num(kgl['L-RD-2610'])} kg","Squadra Zanin","Registrato","ok"),
            ("sab 21 nov","F1","Diserbo post-emergenza","Diflufenican, 0,25 l/ha","12,50 ha","L. Brun","Registrato","ok"),
            ("ven 20 nov","R1","Raccolta manuale","Lotto L-RD-2609",f"{_num(kgl['L-RD-2609'])} kg","Squadra Zanin","Registrato","ok"),
            ("gio 19 nov","V2","Concimazione organica","Letame maturo, 20 t/ha","4,10 ha","G. Tonon","Registrato","ok"),
            ("mer 18 nov","M1","Trinciatura stocchi","","9,80 ha","M. Favaro","Registrato","ok")]
    col_app = {a[0]: COL[a[2]] for a in app}
    qr = "".join(f'<tr><td>{a}</td><td><i class="pt" style="background:{col_app[b]}"></i><b class="mono">{b}</b></td><td><b class="op">{c}</b></td><td class="{"" if d else "mu"}">{d or "nessun prodotto"}</td><td class="r mono">{e}</td><td>{f}</td><td class="r">{chip(g,k)}</td></tr>' for a,b,c,d,e,f,g,k in quad)
    da_conf = sum(1 for q in quad if q[7] == "warn")
    scad = [("27","nov","ven","Rientro in K1","Dopo il rame del 24 nov","mu"),
            ("30","nov","lun","Controllo irroratrice","Certificato in scadenza","warn"),
            ("4","dic","ven","Patentino di L. Brun","Corso da 12 ore","warn"),
            ("15","dic","mar","Registro alla OP","41 trattamenti registrati","mu"),
            ("31","dic","gio","Chiusura quaderno 2026","Firma del titolare","mu")]
    sc = "".join(f'<div class="sc"><div class="dt {k}"><small>{g}</small><b>{d}</b> <span>{m}</span></div><div><b>{t}</b><small>{s}</small></div></div>' for d,m,g,t,s,k in scad)
    sonde_l = [("V1","Vigna Alta",28,0),("K1","Actinidieto Nord",31,0),("R1","Campo Lungo",34,0),("R2","Le Basse",41,1),("F1","Campo Grande",29,0)]
    sl = "".join(f'<div class="row sd"><b class="mono">{c}</b><span>{n}</span>{bar(round(v/50*100), "var(--bad)" if k else "#6fa8c9")}<b class="{"dn" if k else ""}">{v}%</b></div>' for c,n,v,k in sonde_l)
    n_anom = sum(1 for x in sonde_l if x[3])
    body = f'''<div class="h"><div><h1>Campagna 2026, podere di Zero Branco</h1><p>{len(app)} appezzamenti, {_num(ha_tot,2)} ettari. Oggi si raccoglie il radicchio in R1, Campo Lungo</p></div><div class="act">{chip(f"{da_conf} lavorazione da confermare","warn")}<button class="btn">Esporta registro trattamenti</button><button class="btn p">Registra lavorazione</button></div></div>
<div class="g" style="grid-template-columns:408px 1fr">
<div class="card"><div class="ct">Appezzamenti<span>colore per coltura, {len(sonde_l)} sonde nel suolo</span></div>{mappa}<div class="lcs">{legm}</div><div class="selx"><b>R1 Campo Lungo</b><span>trapianto 12 ago, raccolti {_num(kgl["L-RD-2611"]+kgl["L-RD-2609"])} kg in 2 lotti</span></div></div>
<div class="card"><div class="ct">Quaderno di campagna<span>ultimi 8 giorni</span></div>{filters(["Tutte","Trattamenti","Raccolta","Lavorazioni del terreno","Concimazioni"],"Tutte","Cerca")}<table class="tq"><tr><th>Data</th><th>App.</th><th>Operazione</th><th>Prodotto e dose</th><th class="r">Quantità</th><th>Operatore</th><th class="r">Stato</th></tr>{qr}</table>{foot("8 di 126 registrazioni della campagna, 41 trattamenti")}</div></div>
<div class="g" style="grid-template-columns:1fr 238px 250px;flex:1;min-height:0">
<div class="card"><div class="ct">Raccolta e lotti<span>ogni lotto è legato ad appezzamento e trattamenti</span></div><table class="tq"><tr><th>Lotto</th><th>Raccolta</th><th>Prodotto, app.</th><th class="r">Peso, kg</th><th>Destinazione</th><th class="r">Stato</th></tr>{lr}
<tr class="tt"><td colspan="3"><b>Totale</b><span class="mu" style="margin-left:10px">radicchio {_num(kg_rad)} kg, kiwi {_num(kg_kw)} kg</span></td><td class="r mono">{_num(kg_tot)}</td><td colspan="2" class="mu">resa kiwi {_num(kg_kw/1000/3.80,1)} t/ha su 3,80 ha</td></tr></table></div>
<div class="card"><div class="ct">Scadenze<span>{len(scad)} entro 40 giorni</span></div>{sc}</div>
<div class="card"><div class="ct">Sensori<span>ore 11:05</span></div><div class="mt"><div><small>Aria</small><b>7,4 °C</b></div><div><small>Umidità</small><b>88%</b></div><div><small>Pioggia 24 h</small><b>3,2 mm</b></div></div><div class="sm" style="margin:9px 0 3px">Umidità del suolo a 30 cm</div>{sl}<hr><div class="row">{chip(f"{n_anom} anomalia","bad")}<span class="sm">R2 sopra soglia</span></div></div></div>'''
    n = nav([("Appezzamenti","map",str(len(app))),("Quaderno","file",str(da_conf)),("Raccolta e lotti","layers",str(len(lotti))),("Sensori e meteo","drop",str(n_anom)),("Magazzino","box",""),("Ordini e spedizioni","truck",""),("Scadenze","cal",str(len(scad)))],"Appezzamenti")
    return page("agri","--strong:#2f3312;--acc:#5a6a1c;--acc-soft:#edf0d8;--bg:#f5f4ec;--line:#e5e2d2;--side:#fbfaf3;--mut:#6f705c;--info:#5a6a1c;--info-bg:#edf0d8","",LOGO["ts"],n,"Appezzamenti","Elisa Zanin","Titolare","",
        tabs(["Mappa e registro","Colture","Trattamenti","Raccolta"],"Mappa e registro")+'<span class="pill">Campagna 2026</span><span class="pill"><i class="dot"></i>App di campo allineata alle 11:02</span>',body,
        '''.body{padding:16px 22px;gap:12px}.btn{white-space:nowrap}.h .act{align-items:center}
.mp{display:block;border-radius:10px}.mp polygon{stroke:#f5f4ec;stroke-width:2.500;stroke-linejoin:round}.mp polygon.sel{stroke:#2f3312;stroke-width:3;stroke-dasharray:7 4}
.mp text{font-family:Poppins,sans-serif;text-anchor:middle}.mp .cd{font-size:17px;font-weight:700}.mp .ha{font-size:12.5px;font-weight:500;opacity:.9}
.lcs{display:grid;grid-template-columns:1fr 1fr;gap:3px 18px;margin-top:9px}.lc{display:flex;align-items:center;gap:6px;font-size:11.5px;white-space:nowrap}.lc i{width:10px;height:10px;border-radius:3px;flex:none}.lc em{font-style:normal;color:var(--mut);font-family:"JetBrains Mono",monospace;font-size:10.5px}.lc b{margin-left:auto;font-weight:600}
.tq td,.tq th{padding-right:8px}.tq td{padding-top:5px;padding-bottom:5px;font-size:12px}.tq td.r+td,.tq th.r+th{padding-left:8px}.selx{margin-top:9px;border-top:1px solid var(--line);padding-top:8px;display:flex;gap:10px;align-items:baseline;font-size:11.5px;white-space:nowrap}.selx b{font-weight:600;color:var(--strong)}.selx span{color:var(--mut)}.sc small,.sc b{white-space:nowrap}.tq .mono{font-size:11.5px}.tq .op{font-weight:600;color:var(--strong)}.tq .chip{height:20px;font-size:11px}
.pt{display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:7px}
.filters{margin-bottom:8px}.filters em{width:150px}
.tt td{border-top:1px solid #d6d2bd;background:#faf9f2}.tt b{font-weight:600}
.sc{display:grid;grid-template-columns:50px 1fr;gap:10px;align-items:center;padding:4.500px 0;border-bottom:1px solid var(--line)}.sc:last-child{border:0;padding-bottom:0}
.dt{border:1px solid var(--line);border-radius:8px;text-align:center;line-height:1.1;padding:3px 0 4px;background:var(--bg)}.dt small{display:block;font-size:9px;text-transform:uppercase;letter-spacing:.08em;color:var(--mut)}.dt b{font-size:14px;font-weight:600;color:var(--strong)}.dt span{font-size:9.5px;color:var(--mut)}
.dt.warn{background:var(--warn-bg);border-color:#f0d6a8}.dt.warn b{color:var(--warn)}
.sc>div:last-child b{font-weight:600;display:block;color:var(--strong);font-size:12px;line-height:1.3}.sc>div:last-child small{color:var(--mut);font-size:11px;line-height:1.3;display:block}
.mt{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.mt div{border:1px solid var(--line);border-radius:8px;padding:5px 8px}.mt small{display:block;color:var(--mut);font-size:10.5px;white-space:nowrap}.mt b{font-weight:600;font-size:14px;color:var(--strong);white-space:nowrap}
.sd{gap:8px;padding:3px 0;font-size:11.5px}.sd .mono{width:20px;font-weight:500}.sd span{width:92px;white-space:nowrap;color:var(--mut)}.sd>b:last-child{width:30px;text-align:right;font-weight:600}.sd .bar{min-width:30px}''',ws="Gestione dei campi",avvisi=2,fonts="&family=Fraunces:wght@600")
