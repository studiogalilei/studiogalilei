# Le schermate, una funzione per settore. Eseguito da gen.py (usa page, nav, chip, bar, kpi, spark, ic).

# ── 1. Manifatturiero meccanico: MES, reparto in tempo reale ──────────────────
@reg("manifatturiero-meccanico")
def _mes():
    macchine = [
        ("Tornio CNC 01", "In produzione", "ok", "OP-24817", "Albero 40×220", 312, 480, 91, "M. Ferrari"),
        ("Centro di lavoro 02", "Attrezzaggio", "warn", "OP-24821", "Flangia DN80", 0, 260, 74, "L. Colombo"),
        ("Rettifica 03", "In produzione", "ok", "OP-24809", "Boccola Ø32", 1140, 1200, 93, "S. Riva"),
        ("Tornio CNC 04", "Fermo 00:18", "bad", "OP-24818", "Perno filettato M24", 96, 640, 61, "G. Brambilla"),
        ("Centro di lavoro 05", "In produzione", "ok", "OP-24812", "Corpo valvola 2\"", 58, 120, 88, "A. Locatelli"),
        ("Fresatrice 06", "In produzione", "ok", "OP-24815", "Piastra base 300", 41, 90, 90, "P. Mazzoleni"),
    ]
    cards = "".join(f'''<div class="card mc"><div class="row"><b>{n}</b><span class="sp"></span>{chip(st,k)}</div>
<div class="sm" style="margin-top:6px"><span class="mono">{op}</span> · {art}</div>
<div class="row" style="margin-top:9px">{bar(round(f/t*100), None)}<span class="mono" style="font-size:11.5px">{f}/{t}</span></div>
<div class="row sm" style="margin-top:9px"><span>OEE <b style="color:var(--ink)">{oee}%</b></span><span class="sp"></span>{opr}</div></div>''' for n,st,k,op,art,f,t,oee,opr in macchine)
    ordini = [
        ("OP-24809","Boccola Ø32","L-2611-03","S. Riva",95,"0,8%"),
        ("OP-24812","Corpo valvola 2\"","L-2611-07","A. Locatelli",48,"1,7%"),
        ("OP-24815","Piastra base 300","L-2611-09","P. Mazzoleni",46,"0,0%"),
        ("OP-24817","Albero 40×220","L-2611-11","M. Ferrari",65,"1,3%"),
        ("OP-24818","Perno filettato M24","L-2611-12","G. Brambilla",15,"4,2%"),
    ]
    righe = "".join(f'<tr><td class="mono">{a}</td><td>{b}</td><td class="mono">{c}</td><td>{d}</td><td style="width:150px"><div class="row">{bar(e)}<span class="sm" style="width:30px;text-align:right">{e}%</span></div></td><td class="r" style="color:{"var(--bad)" if f>"3" else "inherit"};font-weight:550">{f}</td></tr>' for a,b,c,d,e,f in ordini)
    fermi = [("Attrezzaggio",96,"var(--warn)"),("Attesa materiale",68,"var(--bad)"),("Cambio utensile",38,"var(--acc)"),("Microfermate",26,"#98a2b3")]
    fb = "".join(f'<div style="margin-bottom:9px"><div class="row sm"><span style="color:var(--ink)">{n}</span><span class="sp"></span>{m} min</div>{bar(round(m/96*100),c)}</div>' for n,m,c in fermi)
    body = f'''<div class="h"><div><h1>Reparto in tempo reale</h1><p>6 macchine, 5 in lavorazione. Aggiornato alle 15:42</p></div><div class="act"><button class="btn">Esporta turno</button><button class="btn p">Nuovo ordine</button></div></div>
<div class="g" style="grid-template-columns:repeat(4,1fr)">{kpi("OEE reparto","87,2%","▲ 2,1 punti sul turno 1","up")}{kpi("Disponibilità","92,1%","228 min di fermo su 6 macchine","mu")}{kpi("Prestazione","96,3%","Ciclo medio 41,6 s","mu")}{kpi("Qualità","98,3%","28 scarti su 1.647 pezzi","mu")}</div>
<div class="g" style="grid-template-columns:repeat(3,1fr)">{cards}</div>
<div class="g" style="grid-template-columns:1fr 300px;flex:1;min-height:0">
<div class="card"><div class="ct">Ordini di produzione di oggi<span>5 di 11</span></div><table><tr><th>Ordine</th><th>Articolo</th><th>Lotto</th><th>Operatore</th><th>Avanzamento</th><th class="r">Scarto</th></tr>{righe}</table></div>
<div class="card"><div class="ct">Fermi del turno<span>228 min</span></div>{fb}<hr><div class="row sm">{chip("2 non conformità aperte","warn")}<span class="sp"></span><span class="mono">L-2611-12</span></div></div></div>'''
    n = nav([("Produzione","grid",""),("Ordini","list","11"),("Macchine","cog",""),("Qualità","check","2"),("Magazzino","box",""),("OEE","chart","")],"Produzione")
    return page("mes","--acc:#2f5bd0;--acc-soft:#e9effc;--bg:#f4f6f9","Officine Orobiche","OO",n,"Produzione","Marta Ferrari","Capoturno","Produzione / <b>Reparto in tempo reale</b>",
        '<span class="pill">Stabilimento Bergamo</span><span class="pill"><i class="dot"></i>Turno 2, 14:00-22:00</span>',body,".mc{padding:12px 14px}")

# ── 2. Moda: collezione, matrice colore-taglia ───────────────────────────────
@reg("moda-abbigliamento")
def _moda():
    colori = [("Sabbia","#d8c3a0",[(24,30),(96,110),(180,172),(150,160),(60,48)]),("Nero","#1d1d1f",[(18,24),(88,90),(210,236),(170,168),(72,80)]),("Avorio","#f1ece0",[(12,20),(54,70),(120,96),(96,104),(36,40)])]
    taglie=["XS","S","M","L","XL"]
    def cella(o,d):
        corto = d<o
        return f'<td class="mx"><b>{o}</b><span style="color:{"var(--bad)" if corto else "var(--mut)"}">{d} disp.{" ▾" if corto else ""}</span></td>'
    righe="".join(f'<tr><td><div class="row"><i class="sw" style="background:{c}"></i><b style="font-weight:600">{n}</b></div></td>{"".join(cella(o,d) for o,d in v)}<td class="r mx"><b>{sum(o for o,_ in v)}</b><span class="mu">{sum(d for _,d in v)} disp.</span></td></tr>' for n,c,v in colori)
    tot=[sum(v[i][0] for _,_,v in colori) for i in range(5)]
    totale=format(sum(tot),',').replace(',','.')
    body=f'''<div class="h"><div><p class="sm" style="letter-spacing:.08em;text-transform:uppercase">Collezione SS27 · Capospalla donna</p><h1 style="font-size:22px;margin-top:2px">Giacca lino oversize</h1><p>Cod. GL-2714 · Prezzo wholesale 148,00 € · Retail 345,00 €</p></div><div class="act">{chip("In produzione","info")}<button class="btn">Scheda tecnica</button><button class="btn p">Riassortimento</button></div></div>
<div class="g" style="grid-template-columns:1fr 330px;flex:1;min-height:0">
<div class="g" style="align-content:start">
<div class="card"><div class="ct">Ordinato e disponibile per colore e taglia<span>Pezzi · aggiornato oggi 11:20</span></div>
<table class="matrix"><tr><th>Colore</th>{"".join(f"<th class=c>{t}</th>" for t in taglie)}<th class="r">Totale</th></tr>{righe}
<tr class="tot"><td>Totale ordinato</td>{"".join(f"<td class=mx><b>{t}</b></td>" for t in tot)}<td class="r mx"><b>{totale}</b></td></tr></table>
<div class="row sm" style="margin-top:10px"><span style="color:var(--bad)">▾ 4 varianti sotto l'ordinato</span><span class="sp"></span>Taglio previsto il 2 dicembre copre 3 su 4</div></div>
<div class="g" style="grid-template-columns:repeat(3,1fr)">{kpi("Ordinato","1.386","pezzi su 15 varianti","mu")}{kpi("Sell-in wholesale","74%","1.026 pezzi, 41 clienti","mu")}{kpi("Margine industriale","58,4%","▲ 1,9 punti su SS26","up")}</div>
<div class="card"><div class="ct">Canali<span>pezzi allocati</span></div>
<div class="row" style="gap:14px"><span style="width:120px">Wholesale</span>{bar(74)}<b style="width:44px;text-align:right">1.026</b></div>
<div class="row" style="gap:14px;margin-top:9px"><span style="width:120px">Boutique dirette</span>{bar(16,"#b08d57")}<b style="width:44px;text-align:right">222</b></div>
<div class="row" style="gap:14px;margin-top:9px"><span style="width:120px">E-commerce</span>{bar(10,"#98a2b3")}<b style="width:44px;text-align:right">138</b></div></div></div>
<div class="g" style="align-content:start">
<div class="card"><div class="ct">Distinta base<span>taglia M</span></div><dl class="kv"><dt>Lino 100% 210 g</dt><dd>2,10 m</dd><dt>Fodera cupro</dt><dd>1,45 m</dd><dt>Bottoni corozo 20 mm</dt><dd>4 pz</dd><dt>Spalline</dt><dd>1 paio</dd><dt>Etichette e cartellino</dt><dd>1 set</dd></dl><hr><div class="row"><span class="mu">Costo materiali</span><span class="sp"></span><b>38,60 €</b></div><div class="row sm" style="margin-top:4px">XL consuma 2,35 m di lino (+12%)</div></div>
<div class="card"><div class="ct">Conto lavoro<span>Confezione Prato</span></div><div class="row sm"><span style="color:var(--ink)">Taglio</span><span class="sp"></span>completato</div>{bar(100,"var(--ok)")}<div class="row sm" style="margin-top:9px"><span style="color:var(--ink)">Confezione</span><span class="sp"></span>693 di 1.386</div>{bar(50)}<div class="row sm" style="margin-top:9px"><span style="color:var(--ink)">Stiro e controllo</span><span class="sp"></span>222 di 1.386</div>{bar(16,"#98a2b3")}<hr><dl class="kv"><dt>Rientro previsto</dt><dd>12 dic</dd><dt>Finestra di spedizione</dt><dd>15 gen – 15 feb</dd></dl></div></div></div>'''
    n=nav([("Collezioni","layers",""),("Stili","tag","86"),("Taglie e colori","grid",""),("Produzione","cog",""),("Magazzino","box",""),("Ordini wholesale","list","41")],"Stili")
    return page("moda","--acc:#3d3a36;--acc-soft:#efece7;--bg:#f7f5f2;--line:#e7e2da;--info:#6b5a3e;--info-bg:#f1eadc","Atelier Nord","AN",n,"Stili","Giulia Bassi","Product manager","Collezioni / SS27 / <b>Giacca lino oversize</b>",
        '<span class="pill">Stagione SS27</span>',body,
        ".sw{width:16px;height:16px;border-radius:50%;border:1px solid #0002;flex:none}.matrix td{padding:10px 10px 10px 0}.matrix th.c{text-align:center}.mx{text-align:center}.mx b{display:block;font-size:15px;font-weight:600}.mx span{font-size:11px}.r.mx{text-align:right}.tot td{border-top:1px solid var(--line);color:var(--mut)}.tot b{color:var(--ink)}body{font-feature-settings:'tnum'}h1{font-family:Inter}")

# ── 3. Lusso: CRM clienti privati ────────────────────────────────────────────
@reg("lusso-accessori")
def _lusso():
    storia=[("14 nov 2026","Borsa a mano «Aurelia» media, vitello nero","Boutique Milano Montenapoleone","4.850 €","SN AU-26-004417"),
            ("02 ott 2026","Riparazione: sostituzione chiusura","Atelier Firenze","in garanzia","Ticket R-1182"),
            ("21 giu 2026","Cintura reversibile 35 mm, fibbia palladio","Boutique Milano Montenapoleone","690 €","SN CI-26-019204"),
            ("09 dic 2025","Portafoglio continental, vitello cognac","Boutique Roma Condotti","780 €","SN PF-25-033870"),
            ("18 mag 2025","Borsa a spalla «Livia» piccola, avorio","Boutique Milano Montenapoleone","3.900 €","SN LV-25-002961")]
    tl="".join(f'<div class="ev"><i></i><div class="row"><b>{b}</b><span class="sp"></span><b>{d}</b></div><div class="row sm"><span>{a} · {c}</span><span class="sp"></span><span class="mono">{e}</span></div></div>' for a,b,c,d,e in storia)
    body=f'''<div class="h"><div class="row" style="gap:16px"><span class="av" style="width:54px;height:54px;font-size:18px">EM</span><div><p class="sm" style="letter-spacing:.1em;text-transform:uppercase">Cliente privato · Milano</p><h1 style="font-size:23px;font-weight:550;letter-spacing:-.01em">Elena M.</h1><p>Cliente dal 2019 · seguita da Chiara Valli, Boutique Montenapoleone</p></div></div><div class="act"><span class="chip c-warn" style="height:26px">Esclusiva non in vetrina</span><button class="btn">Nuovo appuntamento</button><button class="btn p">Scrivi nota</button></div></div>
<div class="g" style="grid-template-columns:repeat(4,1fr)">{kpi("Acquisti negli ultimi 24 mesi","10.220 €","4 pezzi, 2 boutique","mu")}{kpi("Scontrino medio","2.555 €","fascia Privé","mu")}{kpi("Ultimo contatto","6 giorni fa","telefonata di Chiara Valli","mu")}{kpi("Prossima ricorrenza","18 dicembre","anniversario, 22 giorni","mu")}</div>
<div class="g" style="grid-template-columns:1fr 340px;flex:1;min-height:0">
<div class="card"><div class="ct">Storia del cliente<span>acquisti, riparazioni, appuntamenti</span></div><div class="tl">{tl}</div>
<hr><div class="ct" style="margin-bottom:6px">Note di boutique</div><p class="sm" style="color:var(--ink);line-height:1.6">Preferisce pellami lisci e metalleria palladio. Evitare loghi in vista. Riceve volentieri su appuntamento il giovedì pomeriggio. Ha chiesto di essere avvisata dell'arrivo della «Aurelia» grande in cognac, edizione numerata.</p></div>
<div class="g" style="align-content:start">
<div class="card"><div class="ct">Tracciabilità del pezzo<span class="mono">AU-26-004417</span></div><dl class="kv"><dt>Modello</dt><dd>Aurelia media</dd><dt>Atelier</dt><dd>Scandicci, banco 12</dd><dt>Pelle</dt><dd>Vitello, lotto P-2291</dd><dt>Finitura</dt><dd>31 ott 2026</dd></dl><hr><div class="row">{chip("Certificato di autenticità emesso","ok")}</div><div class="sm" style="margin-top:6px">Registrato il 14 nov 2026, intestato alla cliente</div></div>
<div class="card"><div class="ct">Post-vendita<span>Ticket R-1182</span></div><div class="row"><b style="font-weight:550">Sostituzione chiusura</b><span class="sp"></span>{chip("Pronto al ritiro","ok")}</div><div class="sm" style="margin-top:6px">Rientrato da Atelier Firenze il 19 nov. In garanzia, nessun costo.</div></div>
<div class="card"><div class="ct">Prossimo appuntamento</div><div class="row"><div style="text-align:center;border:1px solid var(--line);border-radius:8px;padding:5px 11px"><span class="sm">GIO</span><b style="display:block;font-size:18px;font-weight:550">3</b></div><div><b style="font-weight:550">Presentazione privata, 16:30</b><div class="sm">Salotto primo piano · Chiara Valli</div></div></div></div></div></div>'''
    n=nav([("Clienti","users",""),("Boutique","tag",""),("Seriali","shield",""),("Riparazioni","wrench","7"),("Appuntamenti","cal","4")],"Clienti")
    return page("lusso","--bg:#17140f;--card:#1f1b15;--ink:#f1eadc;--mut:#a39a88;--line:#332d23;--acc:#c9a86a;--acc-soft:#2b2519;--side:#13100c;--side-ink:#cfc6b4;--ok:#9ccf9f;--ok-bg:#1f2b20;--warn:#e2c27a;--warn-bg:#33291a","Maison Verri","MV",n,"Clienti","Chiara Valli","Client advisor","Clienti / Privati / <b>Elena M.</b>",
        '<span class="pill">Boutique Milano</span>',body,
        ".top{background:#1a1611}.search{background:#17140f}.search kbd{background:#1f1b15}.btn{background:#1f1b15;color:var(--ink)}.btn.p{color:#17140f}.brand i{color:#17140f}.tl{position:relative;padding-left:18px}.tl::before{content:'';position:absolute;left:4px;top:6px;bottom:6px;width:1px;background:var(--line)}.ev{position:relative;padding:8px 0}.ev i{position:absolute;left:-17px;top:14px;width:7px;height:7px;border-radius:50%;background:var(--acc)}.ev b{font-weight:550}.av{background:#2b2519}")

# ── 4. Packaging: monitoraggio remoto di una linea ───────────────────────────
@reg("packaging-macchine-automatiche")
def _pack():
    staz=[("Alimentazione","ok","118 bpm"),("Formatura film","ok","Tensione 42 N"),("Saldatura longitudinale","warn","Temp. 164 °C, soglia 160"),("Saldatura trasversale","ok","Temp. 148 °C"),("Controllo visione","ok","Scarto 0,6%"),("Uscita e incartonamento","ok","19 cartoni/min")]
    col={"ok":"var(--ok)","warn":"var(--warn)","bad":"var(--bad)"}
    schema="".join(f'<div class="st"><i style="background:{col[k]}"></i><b>{n}</b><span>{d}</span></div>'+('<em>›</em>' if i<5 else '') for i,(n,k,d) in enumerate(staz))
    cause=[("Rottura film",14,3),("Inceppamento alimentazione",11,2),("Allarme temperatura saldatura",9,1),("Cambio bobina",8,1)]
    eventi=[("14:52","Allarme A-217, temperatura saldatura longitudinale","warn"),("11:07","Cambio bobina, 8 min","mu"),("06:31","Rottura film, ripartenza in 5 min","bad"),("02:14","Inceppamento alimentazione, 6 min","bad"),("23:40","Rottura film, ripartenza in 4 min","bad")]
    ev="".join(f'<div class="row sm" style="padding:6px 0;border-bottom:1px solid var(--line)"><span class="mono">{a}</span><span style="color:var(--ink)">{b}</span><span class="sp"></span>{chip({"warn":"aperto","mu":"pianificato","bad":"chiuso"}[k],k if k!="bad" else "mu")}</div>' for a,b,k in eventi)
    cb="".join(f'<div style="margin-bottom:9px"><div class="row sm"><span style="color:var(--ink)">{n}</span><span class="sp"></span>{m} min · {q} {"volta" if q==1 else "volte"}</div>{bar(round(m/14*100))}</div>' for n,m,q in cause)
    vel=[112,115,118,117,119,118,0,0,104,116,118,119,118,117,119,120,118,116,118,119,0,110,117,118]
    body=f'''<div class="h"><div><h1>Linea Flowpack L4</h1><p>Matricola FP-4-2231 · installata presso Dolciaria Sant'Anna, Verona · firmware 3.8.2</p></div><div class="act">{chip("Connessa","ok")}{chip("1 allarme aperto","warn")}<button class="btn p">Apri assistenza remota</button></div></div>
<div class="g" style="grid-template-columns:repeat(4,1fr)">{kpi("Velocità","118 bpm","Nominale 120","mu")}{kpi("OEE ultime 24 ore","81,4%","▼ 1,8 punti su ieri","dn")}{kpi("Fermi ultime 24 ore","7","42 minuti in totale","mu")}{kpi("Confezioni prodotte","158.940","Scarto visione 0,6%","mu")}</div>
<div class="card"><div class="ct">Stato delle stazioni<span>aggiornato 4 secondi fa</span></div><div class="schema">{schema}</div></div>
<div class="g" style="grid-template-columns:1.25fr 1fr 1fr;flex:1;min-height:0">
<div class="card"><div class="ct">Velocità, ultime 24 ore<span>bpm</span></div>{spark(vel,400,150)}<div class="row sm" style="margin-top:6px"><span>ieri 16:00</span><span class="sp"></span><span>00:00</span><span class="sp"></span><span>08:00</span><span class="sp"></span><span>adesso</span></div><hr><div class="ct" style="margin-bottom:2px">Ultimi eventi</div>{ev}</div>
<div class="card"><div class="ct">Cause di fermo<span>24 ore</span></div>{cb}<hr><dl class="kv"><dt>Tempo medio di ripartenza</dt><dd>6 min</dd><dt>Fermo più lungo</dt><dd>9 min, 14:52</dd><dt>Disponibilità</dt><dd>97,1%</dd></dl></div>
<div class="card"><div class="ct">Assistenza</div><dl class="kv"><dt>Prossima manutenzione</dt><dd>tra 126 ore di marcia</dd><dt>Ultimo intervento</dt><dd>4 nov, da remoto</dd><dt>Contratto</dt><dd>Service Plus</dd><dt>Scadenza</dt><dd>giugno 2027</dd></dl><hr><div class="ct" style="margin-bottom:6px">Ricambi consigliati</div><div class="row sm"><span style="color:var(--ink)">Barra saldante longitudinale</span><span class="sp"></span><span class="mono">RS-L4-018</span></div><div class="row sm" style="margin-top:5px"><span style="color:var(--ink)">Cinghia traino film</span><span class="sp"></span><span class="mono">CT-L4-204</span></div><hr><div class="row">{chip("Allarme A-217 temperatura saldatura","warn")}</div></div></div>'''
    n=nav([("Parco macchine","grid","38"),("Linee","pulse",""),("Allarmi","alert","3"),("Assistenza","wrench",""),("Ricambi","box",""),("Report","chart","")],"Linee")
    return page("pack","--acc:#1463c9;--acc-soft:#e6f0fc;--bg:#f6f8fb","Tecnopack Service","TP",n,"Linee","Davide Zanetti","Tecnico service","Parco macchine / Dolciaria Sant'Anna / <b>Linea Flowpack L4</b>",
        '<span class="pill">Cliente: Dolciaria Sant\'Anna</span>',body,
        ".schema{display:flex;align-items:stretch;gap:6px}.st{flex:1;border:1px solid var(--line);border-radius:10px;padding:10px 12px;position:relative}.st i{display:block;width:100%;height:4px;border-radius:9px;margin-bottom:9px}.st b{display:block;font-weight:600;font-size:12.5px}.st span{font-size:11.5px;color:var(--mut)}.schema em{align-self:center;color:#b6bdc9;font-style:normal;font-size:18px}")

# ── 5. Alimentare: genealogia del lotto ──────────────────────────────────────
@reg("alimentare-beverage")
def _food():
    ingr=[("Pomodoro fresco","MP-88213","Az. Agr. Cascina Rossi, Parma","12.400 kg"),("Pomodoro fresco","MP-88219","OP Terre del Po, Piacenza","6.150 kg"),("Sale marino","MP-87044","Saline di Cervia","92 kg"),("Vasetti vetro 700 g","IM-5512","Vetreria Altare","25.920 pz"),("Capsule twist-off","IM-5530","Metalcap, Lecco","25.920 pz")]
    sped=[("DDT 4471","Coop Alleanza, CeDi Anzola","9.360 pz","18 nov"),("DDT 4476","Esselunga, Pioltello","7.200 pz","19 nov"),("DDT 4490","Conad Nord Ovest, Modena","5.040 pz","21 nov"),("Ubic. C-14","Magazzino prodotti finiti","4.068 pz","in giacenza, disponibile")]
    li="".join(f'<div class="nd"><b>{a}</b><span class="mono">{b}</span><small>{c}</small><em>{d}</em></div>' for a,b,c,d in ingr)
    ls="".join(f'<div class="nd"><b>{b}</b><span class="mono">{a}</span><small>{d}</small><em>{c}</em></div>' for a,b,c,d in sped)
    body=f'''<div class="h"><div><h1>Lotto B-10482 · Passata di pomodoro 700 g</h1><p>Prodotto il 14 nov 2026, linea 2, turno 1 · Scadenza 14 nov 2028</p></div><div class="act">{chip("Rilasciato","ok")}<button class="btn">Scheda di lotto</button><button class="btn p">Simula richiamo</button></div></div>
<div class="card" style="background:var(--ok-bg);border-color:#bfe6d4;display:flex;align-items:center;gap:12px;padding:11px 16px"><b style="color:var(--ok)">Tracciabilità completa in 12 secondi</b><span style="color:#285c49">5 lotti a monte, 3 clienti a valle, 25.668 pezzi rintracciati su 25.668</span><span class="sp"></span><span class="sm" style="color:#285c49">ultima verifica oggi 09:14</span></div>
<div class="g" style="grid-template-columns:repeat(5,1fr)">{kpi("Resa","96,4%","Attesa 95,0%","up")}{kpi("Pezzi prodotti","25.668","su 25.920 vasetti","mu")}{kpi("Brix","8,6°","Specifica 8,0–9,0","mu")}{kpi("pH","4,21","Limite 4,40","mu")}{kpi("Allergeni","Nessuno","Linea dedicata","mu")}</div>
<div class="card" style="flex:1;min-height:0"><div class="ct">Genealogia del lotto<span>da dove viene e dove è andato</span></div>
<div class="gen"><div><p class="gt">A monte · materie prime e imballi</p>{li}</div>
<div class="mid"><svg viewBox="0 0 60 300" preserveAspectRatio="none"><path d="M0,30 C40,30 20,150 60,150 M0,90 C40,90 20,150 60,150 M0,150 L60,150 M0,210 C40,210 20,150 60,150 M0,270 C40,270 20,150 60,150" fill="none" stroke="#c5ccd8" stroke-width="1.500"/></svg></div>
<div class="core"><span class="sm">LOTTO</span><b class="mono">B-10482</b><span>Passata di pomodoro</span><span class="sm">18.550 kg lavorati</span>{chip("Rilasciato da CQ","ok")}<span class="sm">F. Marchetti, 15 nov 08:40</span></div>
<div class="mid"><svg viewBox="0 0 60 300" preserveAspectRatio="none"><path d="M0,150 C40,150 20,38 60,38 M0,150 C40,150 20,112 60,112 M0,150 C40,150 20,188 60,188 M0,150 C40,150 20,262 60,262" fill="none" stroke="#c5ccd8" stroke-width="1.500"/></svg></div>
<div><p class="gt">A valle · spedizioni e giacenza</p>{ls}</div></div></div>'''
    n=nav([("Lotti","layers",""),("Produzione","cog",""),("Qualità","check","1"),("Allergeni","alert",""),("Spedizioni","truck",""),("Richiami","shield","")],"Lotti")
    return page("food","--acc:#1c7c54;--acc-soft:#e3f4ec;--bg:#f6f8f6","Orto Valle","OV",n,"Lotti","Francesca Marchetti","Responsabile qualità","Lotti / Conserve / <b>B-10482</b>",
        '<span class="pill">Stabilimento Parma</span>',body,
        ".gen{display:grid;grid-template-columns:1fr 60px 210px 60px 1fr;align-items:center;height:calc(100% - 30px)}.gt{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--mut);margin-bottom:6px}.nd{display:grid;grid-template-columns:1fr auto;gap:1px 10px;border:1px solid var(--line);border-radius:9px;padding:11px 13px;margin-bottom:9px}.nd b{font-weight:600}.nd span{color:var(--mut)}.nd small{color:var(--mut);font-size:11.5px}.nd em{font-style:normal;font-weight:550;text-align:right}.mid{height:372px;margin-top:22px}.mid svg{width:100%;height:100%}.core{border:1.500px solid var(--acc);background:var(--acc-soft);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:5px;align-items:center;text-align:center}.core b{font-size:19px;font-weight:600}")

# ── 6. Farmaceutico: batch record elettronico ────────────────────────────────
@reg("farmaceutico-medicale")
def _pharma():
    passi=[("1","Verifica pulizia e line clearance","A. Conti","24 nov 06:12","ok","Firmato"),("2","Pesata materie prime","A. Conti · verifica L. Greco","24 nov 06:48","ok","Firmato, doppia firma"),("3","Miscelazione, 30 min a 18 rpm","M. De Luca","24 nov 07:55","ok","Firmato"),("4","Granulazione a umido","M. De Luca","24 nov 09:40","warn","Firmato, deviazione DEV-0931"),("5","Essiccazione, LOD ≤ 2,0%","S. Fontana","24 nov 13:20","ok","Firmato · LOD 1,6%"),("6","Compressione","S. Fontana","in corso","info","In esecuzione"),("7","Controlli in processo e campionamento","","","mu","Da eseguire"),("8","Revisione QA e rilascio","","","mu","Da eseguire")]
    righe="".join(f'<tr><td><span class="n {"d" if k in("ok","warn") else ""}">{a}</span></td><td><b style="font-weight:{600 if k!="mu" else 450};color:{"var(--mut)" if k=="mu" else "inherit"}">{b}</b></td><td>{c}</td><td class="mono">{d}</td><td class="r">{chip(f,k)}</td></tr>' for a,b,c,d,k,f in passi)
    audit=[("13:20:41","S. Fontana","Firma passo 5","Esito conforme"),("13:18:07","S. Fontana","Inserito LOD","1,6%"),("10:02:15","L. Greco (QA)","Aperta DEV-0931","Tempo di granulazione +4 min"),("09:40:33","M. De Luca","Firma passo 4","Con deviazione"),("09:38:50","M. De Luca","Modificato valore","Tempo 18 → 22 min · motivo: endpoint non raggiunto"),]
    au="".join(f'<div class="au"><span class="mono">{a}</span><div><b>{c}</b><small>{b} · {d}</small></div></div>' for a,b,c,d in audit)
    body=f'''<div class="h"><div><h1>Batch record · Lotto F-22091</h1><p>Compresse rivestite 500 mg · Dimensione lotto 300.000 unità · Master record MBR-114 rev. 07</p></div><div class="act">{chip("In attesa QA","warn")}<button class="btn">Stampa controllata</button><button class="btn p">Firma passo 6</button></div></div>
<div class="g" style="grid-template-columns:repeat(4,1fr)">{kpi("Avanzamento","5 di 8 passi","Passo 6 in esecuzione","mu")}{kpi("Deviazioni","1 aperta","DEV-0931, minore","dn")}{kpi("Resa parziale","98,7%","Limiti 97,0–101,0%","mu")}{kpi("Firme elettroniche","6","tutte con doppia autenticazione","mu")}</div>
<div class="g" style="grid-template-columns:1fr 350px;flex:1;min-height:0">
<div class="card"><div class="ct">Passi di lavorazione<span>ogni firma richiede utente, password e motivo</span></div><table><tr><th style="width:36px"></th><th>Passo</th><th>Eseguito da</th><th>Data e ora</th><th class="r">Stato</th></tr>{righe}</table></div>
<div class="g" style="align-content:start;grid-template-rows:auto 1fr">
<div class="card"><div class="ct">Deviazione DEV-0931<span>minore</span></div><p style="line-height:1.55">Tempo di granulazione 22 min contro 18 previsti. Endpoint raggiunto, parametri di prodotto in specifica.</p><hr><dl class="kv"><dt>Valutazione QA</dt><dd>in corso</dd><dt>Impatto sul rilascio</dt><dd>blocca il rilascio</dd></dl></div>
<div class="card"><div class="ct">Audit trail<span>24 nov 2026 · non modificabile</span></div>{au}</div></div></div>'''
    n=nav([("Batch record","file","4"),("Deviazioni","alert","1"),("Qualità","check",""),("Lotti","layers",""),("Audit trail","shield","")],"Batch record")
    return page("pharma","--acc:#12408f;--acc-soft:#e7edf8;--bg:#f5f7fa","Farmaceutici Lariani","FL",n,"Batch record","Sara Fontana","Operatore di produzione","Batch record / In lavorazione / <b>F-22091</b>",
        '<span class="pill">Reparto Solidi orali</span><span class="pill"><i class="dot"></i>Sessione firmata</span>',body,
        ".n{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;border:1.500px solid var(--line);font-size:11px;font-weight:600;color:var(--mut)}.n.d{background:var(--acc);border-color:var(--acc);color:#fff}.au{display:grid;grid-template-columns:62px 1fr;gap:10px;padding:6px 0;border-bottom:1px solid var(--line)}.au:last-child{border:0}.au span{color:var(--mut);font-size:11.5px;padding-top:1px}.au b{font-weight:600;display:block}.au small{color:var(--mut);font-size:11.5px}td{padding:8px 10px 8px 0}")
