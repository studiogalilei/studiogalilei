# Secondo giro di ritocchi su index.html (già generato da costruisci.py e ritoccato a mano):
# logo ufficiale, Area Privata, menu mobile con icone, home con più immagini, presentazione
# scaricabile, "coming soon" della Platform, notifica email delle candidature Member Club.
# Si può rilanciare: le sostituzioni già applicate vengono saltate, i blocchi CSS/JS rigenerati.
import base64, json, pathlib, re

base = pathlib.Path(__file__).resolve().parent.parent
s = (base / "index.html").read_text(encoding="utf-8")


def sostituisci(vecchio, nuovo, segno=None):
    """Sostituisce un testo che deve comparire una sola volta; salta se il nuovo è già presente."""
    global s
    if (segno or nuovo) in s:
        return
    n = s.count(vecchio)
    assert n == 1, f"{vecchio[:90]!r} trovato {n} volte"
    s = s.replace(vecchio, nuovo)


# ---------------------------------------------------------------------------
# Marchio ufficiale: albero e scritta presi dal logo vettoriale ufficiale (lo stesso del modulo
# Member Club). L'albero e la scritta del bundle erano ricalcati da un'immagine tagliata in basso.
m = re.search(r'\$\("#marchio"\)\.innerHTML = \'<img src="data:image/svg\+xml;base64,([A-Za-z0-9+/=]+)"', s)
ufficiale = base64.b64decode(m.group(1)).decode("utf-8")
gruppi = re.match(r'<svg[^>]*><g transform="translate\(94\.81,103\.95313\)" fill="#ffffff">\s*'
                  r'(<g transform="translate\(-171\.49,-201\.64\)">(.*?)</g>)\s*'
                  r'(<g transform="matrix\(0\.20406,0,0,0\.20406,292\.32,1191\.76\)">(.*)</g>)\s*'
                  r'<g transform="matrix\(0\.15304', ufficiale, re.S)
albero_g, albero, scritta_g, scritta = (re.sub(r">\s+<", "><", g.strip()) for g in gruppi.groups())

SG_ALBERO = albero                        # spazio del gruppo: x 643-1596, y 202-1310
SG_SCRITTA = scritta                      # contiene già il ribaltamento dei glifi; x 51-6375, y -34-759
SG_UFFICIALE = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="239 -26 1607 1607" fill="currentColor" aria-hidden="true">'
                f'<g transform="translate(94.81,103.95313)">{albero_g}{scritta_g}</g></svg>')
SG_UFFICIALE = re.sub(r">\s+<", "><", SG_UFFICIALE)

sostituisci(
    'function jA({className:t="",title:r}){return A.jsxs("svg",{viewBox:"0 0 974 1132",className:t,fill:"currentColor",role:r?"img":void 0,"aria-hidden":r?void 0:!0,children:[r&&A.jsx("title",{children:r}),A.jsx("path",{fillRule:"evenodd",d:f4})]})}'
    'function g1({className:t="",title:r}){return A.jsxs("svg",{viewBox:"0 0 1227 159",className:t,fill:"currentColor",role:r?"img":void 0,"aria-hidden":r?void 0:!0,children:[r&&A.jsx("title",{children:r}),A.jsx("path",{fillRule:"evenodd",d:U4})]})}'
    'function F4({tone:t="dark"}){return A.jsxs("span",{className:`inline-flex items-center gap-2 min-[360px]:gap-3 ${t==="dark"?"text-sg":"text-white"}`,children:[A.jsx(jA,{className:"h-[28px] w-auto min-[360px]:h-[34px]"}),A.jsx(g1,{className:"h-[16px] w-auto min-[360px]:h-[19px]",title:"StudioGalilei"})]})}',
    f'const SG_ALBERO={json.dumps(SG_ALBERO)},SG_SCRITTA={json.dumps(SG_SCRITTA)},SG_UFFICIALE={json.dumps(SG_UFFICIALE)};'
    'function jA({className:t="",title:r}){return A.jsx("svg",{viewBox:"632 192 974 1128",className:t,fill:"currentColor",role:r?"img":void 0,"aria-label":r||void 0,"aria-hidden":r?void 0:!0,dangerouslySetInnerHTML:{__html:SG_ALBERO}})}'
    'function g1({className:t="",title:r}){return A.jsx("svg",{viewBox:"41 -44 6344 813",className:t,fill:"currentColor",role:r?"img":void 0,"aria-label":r||void 0,"aria-hidden":r?void 0:!0,dangerouslySetInnerHTML:{__html:SG_SCRITTA}})}'
    # in testata: il logo ufficiale in un quadratino blu con bordi tondi
    'function F4({className:t=""}={}){return A.jsx("span",{className:`sg-logo-tile ${t}`,dangerouslySetInnerHTML:{__html:SG_UFFICIALE}})}',
    segno="const SG_ALBERO=")

# ---------------------------------------------------------------------------
# Icone in più (stesso formato lucide del bundle)
sostituisci(
    'function m4(){const[t,r]=I.useState(null)',
    'const sgIco=(n,p)=>Ke(n,p.map((d,i)=>typeof d=="string"?["path",{d,key:"p"+i}]:[d[0],{...d[1],key:"p"+i}])),'
    'sgHouse=sgIco("sg-house",["M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8","M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"]),'
    'sgBriefcase=sgIco("sg-briefcase",["M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2"}]]),'
    'sgPlane=sgIco("sg-plane",["M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"]),'
    'sgUserPlus=sgIco("sg-user-plus",["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",["circle",{cx:"9",cy:"7",r:"4"}],"M19 8v6","M22 11h-6"]),'
    'sgSparkles=sgIco("sg-sparkles",["M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z","M20 3v4","M22 5h-4"]),'
    'sgCode=sgIco("sg-code",["m18 16 4-4-4-4","m6 8-4 4 4 4","m14.5 4-5 16"]),'
    'sgMegafono=sgIco("sg-megaphone",["m3 11 18-5v12L3 14v-3z","M11.6 16.8a3 3 0 1 1-5.8-1.6"]);'
    'function m4(){const[t,r]=I.useState(null)',
    segno="const sgIco=")

# ---------------------------------------------------------------------------
# Area Privata: niente cerchio con etichetta, un lucchetto con testo piccolo (desktop)
# e un'icona discreta (smartphone). Porta alla pagina "coming soon" della Platform.
sostituisci(
    'A.jsxs(wl,{label:g("Area Privata","Private Area"),className:"group -ml-2 flex flex-col items-center gap-0.5 text-sg",children:[A.jsx("span",{className:"grid size-10 place-items-center rounded-full border border-sg/20 transition-colors group-hover:border-sg group-hover:bg-sg group-hover:text-white",children:A.jsx(Pl,{size:19,strokeWidth:2,"aria-hidden":"true"})}),A.jsx("span",{className:"whitespace-nowrap text-[11.5px] font-medium leading-none text-sg/75",children:g("Area Privata","Private Area")})]})',
    'A.jsxs(wl,{label:g("Area Privata","Private Area"),className:"sg-priv",children:[A.jsx(Vf,{size:14,strokeWidth:2.2,"aria-hidden":"true"}),g("Area Privata","Private Area")]})')
sostituisci(
    'A.jsxs(wl,{label:g("Area Privata","Private Area"),className:"flex flex-col items-center gap-0.5 px-1 text-sg",children:[A.jsx("span",{className:"grid size-8 place-items-center rounded-full border border-sg/20",children:A.jsx(Pl,{size:17,strokeWidth:2,"aria-hidden":"true"})}),A.jsx("span",{className:"whitespace-nowrap text-[11.5px] font-medium leading-none text-sg/80",children:g("Area Privata","Private Area")})]})',
    'A.jsx(wl,{label:g("Area Privata","Private Area"),className:"sg-priv-m",children:A.jsx(Vf,{size:19,strokeWidth:2,"aria-hidden":"true"})})')

# ---------------------------------------------------------------------------
# Menu mobile: ogni voce con la sua icona, contatti rapidi, lingua e "Contattaci" in fondo
i = s.find('a&&A.jsx("div",{className:"max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-sg/10 bg-white lg:hidden"')
if i != -1:
    j = s.find('const C4=', i)
    vecchio = s[i:j]
    assert vecchio.endswith('children:g("Contattaci","Contact us")})]})})]})}'), vecchio[-120:]
    nuovo = (
        'a&&A.jsx("div",{className:"sg-mmenu lg:hidden",children:A.jsxs(le,{className:"sg-mmenu-in",children:['
        'A.jsx("nav",{"aria-label":g("Menu principale","Main menu"),children:A.jsx("ul",{className:"sg-mlist",children:['
        '{label:"Home",en:"Home",to:"/",icon:sgHouse},'
        '{label:"Chi siamo",en:"About us",to:"/chi-siamo",icon:u4},'
        '{label:"Servizi",en:"Services",to:"/servizi",icon:yf},'
        '{label:"Casi studio",en:"Case studies",to:"/casi-studio",icon:sgBriefcase},'
        '{label:"Tour operator",en:"Tour operator",href:"tour-operator-v2.html",icon:sgPlane},'
        '{label:"Lavora con noi",en:"Work with us",to:"/lavora-con-noi",icon:sgUserPlus},'
        '{label:"Area Privata",en:"Private Area",to:"/area-partner",icon:Vf}'
        '].map(F=>{const K=[A.jsx("span",{className:"sg-mico",children:A.jsx(F.icon,{size:19,strokeWidth:2,"aria-hidden":"true"})},"i"),'
        'A.jsx("span",{className:"sg-mtxt",children:g(F.label,F.en)},"t"),A.jsx(Kf,{size:18,className:"sg-mfreccia","aria-hidden":"true"},"f")],'
        'Q="sg-mlink"+(F.to&&(F.to==="/"?c==="/":U(F.to))?" sg-attivo":"");'
        'return A.jsx("li",{children:F.href?A.jsx("a",{href:F.href,className:Q,children:K}):A.jsx(je,{to:F.to,className:Q,children:K})},F.label)})})}),'
        'A.jsx("div",{className:"sg-mcontatti",children:['
        '{href:`tel:${U1.phoneHref}`,label:g("Chiama","Call"),icon:Zf},'
        '{href:`https://wa.me/${U1.phoneHref.replace("+","")}`,label:"WhatsApp",icon:d1,ext:!0},'
        '{href:`mailto:${U1.email}`,label:"Email",icon:kf}'
        '].map(F=>A.jsxs("a",{href:F.href,...F.ext?{target:"_blank",rel:"noopener noreferrer"}:{},className:"sg-mcontatto",children:[A.jsx(F.icon,{size:19,strokeWidth:2,"aria-hidden":"true"}),F.label]},F.label))}),'
        'A.jsxs("div",{className:"sg-mlingua",children:[A.jsxs("span",{children:[A.jsx(Mf,{size:18,strokeWidth:2,"aria-hidden":"true"}),g("Lingua","Language")]}),A.jsx(Su,{})]}),'
        'A.jsx(je,{to:"/contatti",className:"sg-mcta",children:g("Contattaci","Contact us")})'
        ']})})]})}')
    s = s[:i] + nuovo + s[j:]

# ---------------------------------------------------------------------------
# Area Privata -> pagina "coming soon" della Platform (al posto della presentazione dei vantaggi)
i = s.find('function s5(){const t=He(),{PARTNER_BENEFITS:r}=Qt();')
if i != -1:
    j = s.find('function u5(', i)
    s = s[:i] + (
        'function s5(){const t=He();return pi("Studio Galilei Platform",t("L\'area riservata ai partner Studio Galilei è in arrivo.","The Studio Galilei partner area is coming soon.")),'
        'A.jsx("section",{className:"sg-platform",children:A.jsxs("div",{className:"sg-platform-in",children:['
        'A.jsx(F4,{className:"sg-logo-tile-xl"}),'
        'A.jsx("p",{className:"sg-platform-kicker",children:"Studio Galilei Platform"}),'
        'A.jsx("h1",{className:"sg-platform-title",children:"Coming soon"}),'
        'A.jsx("p",{className:"sg-platform-text",children:t("Stiamo preparando l\'area riservata ai partner: progetti, report e documenti in un unico posto. Sarà disponibile a breve.","We are building the partner area: projects, reports and documents in one place. It will be available soon.")}),'
        'A.jsxs("div",{className:"sg-platform-azioni",children:[A.jsx(Bt,{to:"/contatti",variant:"light",children:t("Contattaci","Contact us")}),A.jsx(Bt,{to:"/",variant:"ghost-light",children:t("Torna alla home","Back to home")})]})'
        ']})})}') + s[j:]

# ---------------------------------------------------------------------------
# Presentazione: il PDF è un data: URL, che Safari iOS e molti browser in-app non scaricano.
# Al clic diventa un Blob con il suo nome file.
sostituisci(
    'function v4({href:t,filename:r,children:a,variant:s="primary",className:c=""}){return A.jsx("a",{href:t,download:r,className:',
    'function sgScarica(e){const l=e.currentTarget,h=l.getAttribute("href")||"";if(!h.startsWith("data:"))return;e.preventDefault();'
    'try{const k=h.indexOf(","),tipo=h.slice(5,k).split(";")[0]||"application/octet-stream",b=atob(h.slice(k+1)),u=new Uint8Array(b.length);'
    'for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);const url=URL.createObjectURL(new Blob([u],{type:tipo})),a=document.createElement("a");'
    'a.href=url;a.download=l.getAttribute("download")||"Studio-Galilei.pdf";a.rel="noopener";document.body.appendChild(a);a.click();a.remove();'
    'setTimeout(()=>URL.revokeObjectURL(url),6e4)}catch(x){window.open(h,"_blank")}}'
    'function v4({href:t,filename:r,children:a,variant:s="primary",className:c=""}){return A.jsx("a",{href:t,download:r,onClick:sgScarica,className:',
    segno="function sgScarica(")

# ---------------------------------------------------------------------------
# Home: pulsanti dell'hero a tutta larghezza su smartphone
sostituisci('A.jsxs("div",{className:"mt-10 flex flex-wrap gap-3",children:[A.jsxs(v4,{href:N8',
            'A.jsxs("div",{className:"sg-hero-azioni mt-10 flex flex-wrap gap-3",children:[A.jsxs(v4,{href:N8')

# Home: nuove sezioni con immagini e icone (servizi dopo i loghi, casi studio dopo "Cosa ricevi")
sostituisci(
    'function vU(){',
    'function sgServizi(){const t=He(),{SERVICES:r}=Qt(),a={marketing:sgMegafono,"intelligenza-artificiale":sgSparkles,"sviluppo-software":sgCode};'
    'return A.jsx("section",{className:"sg-servizi",children:A.jsxs(le,{children:['
    'A.jsx(IA,{kicker:t("Cosa facciamo","What we do"),title:t("Tre competenze, un solo partner","Three skills, one partner")}),'
    'A.jsx("div",{className:"sg-servizi-griglia",children:r.map(c=>{const d=a[c.slug]||Bu;return A.jsxs(je,{to:c.path,className:"sg-servizio",style:{"--sg-c":c.color},children:['
    'A.jsx("span",{className:"sg-servizio-ico",children:A.jsx(d,{size:24,strokeWidth:2,"aria-hidden":"true"})}),'
    'A.jsxs("span",{className:"sg-servizio-txt",children:[A.jsx("span",{className:"sg-servizio-nome",children:c.name}),A.jsx("span",{className:"sg-servizio-desc",children:c.short})]}),'
    'A.jsx(yl,{size:20,className:"sg-servizio-freccia","aria-hidden":"true"})]},c.slug)})})]})})}'
    'function sgCasi(){const t=He(),r=XU(t),a={"dan-ink":fc,onlysolutions:zU};'
    'return A.jsx("section",{className:"sg-casi",children:A.jsxs(le,{children:['
    'A.jsxs("div",{className:"sg-casi-banner",children:[A.jsx("img",{src:NU,alt:"",loading:"lazy","aria-hidden":"true"}),'
    'A.jsxs("div",{className:"sg-casi-banner-txt",children:[A.jsx("p",{children:t("Casi studio","Case studies")}),A.jsx("h2",{children:t("Dietro le quinte dei nostri risultati","Behind the scenes of our results")})]})]}),'
    'A.jsx("div",{className:"sg-casi-lista",children:r.map(c=>A.jsxs(je,{to:c.to,className:"sg-caso",children:['
    'A.jsx("div",{className:"sg-caso-img","aria-hidden":"true",children:a[c.key]?A.jsx("img",{src:a[c.key],alt:"",loading:"lazy"}):A.jsx(Kc,{screen:"overview"})}),'
    'A.jsxs("div",{className:"sg-caso-corpo",children:[A.jsx("img",{src:c.logo,alt:c.logoAlt,className:"sg-caso-logo",loading:"lazy"}),'
    'A.jsx("p",{className:"sg-caso-riga",children:c.line}),'
    'A.jsxs("span",{className:"sg-caso-link",children:[t("Leggi il caso","Read the case"),A.jsx(Kf,{size:16,"aria-hidden":"true"})]})]})]},c.key))}),'
    'A.jsx("div",{className:"sg-casi-tutti",children:A.jsx(Bt,{to:"/casi-studio",variant:"outline",children:t("Tutti i casi studio","All case studies")})})]})})}'
    'function vU(){',
    segno="function sgServizi(")
sostituisci('A.jsx("div",{className:"mt-6",children:A.jsx(Y8,{})})]})}),',
            'A.jsx("div",{className:"mt-6",children:A.jsx(Y8,{})})]})}),A.jsx(sgServizi,{}),')
sostituisci('A.jsx(hA,{it:"Scopri come possiamo applicarlo alla tua realtà",en:"Find out how we can apply it to your business"})})]})}),',
            'A.jsx(hA,{it:"Scopri come possiamo applicarlo alla tua realtà",en:"Find out how we can apply it to your business"})})]})}),A.jsx(sgCasi,{}),')

# Home: un'icona per ogni voce delle card "Nel portale", "Lavorando insieme", "In più"
sostituisci('children:a.map(c=>A.jsxs("div",{className:`rounded-[20px] px-7 py-8 md:px-8',
            'children:a.map((c,ci)=>A.jsxs("div",{className:`rounded-[20px] px-7 py-8 md:px-8')
sostituisci(
    'children:c.items.map(d=>A.jsxs("li",{className:"py-6 last:pb-0",children:[A.jsx("h3",{className:`text-[18px] font-semibold ${c.dark?"text-white":"text-sg"}`,children:d.title}),A.jsx("p",{className:`mt-2 text-[15px] leading-[1.75] ${c.dark?"text-white/75":"text-ink/60"}`,children:d.desc})]},d.title))})',
    'children:c.items.map((d,di)=>{const Ic=([[yf,o4,Cf],[u4,gf,A4],[V2,Of]][ci]||[])[di];return A.jsxs("li",{className:"py-6 last:pb-0",children:[A.jsxs("h3",{className:`sg-voce text-[18px] font-semibold ${c.dark?"text-white":"text-sg"}`,children:[Ic&&A.jsx("span",{className:`sg-voce-ico${c.dark?" sg-scura":""}`,children:A.jsx(Ic,{size:18,strokeWidth:2,"aria-hidden":"true"})}),d.title]}),A.jsx("p",{className:`mt-2 text-[15px] leading-[1.75] ${c.dark?"text-white/75":"text-ink/60"}`,children:d.desc})]},d.title)})})')

# ---------------------------------------------------------------------------
# Email dei moduli: Resend, tramite la Vercel Function api/invia-email.js (chiave segreta su Vercel,
# destinatario fisso dramane@studiogalilei.com). Se l'invio non riesce il modulo contatti offre
# l'invio con l'app di posta. Prima c'era FormSubmit, che a fine ottobre 2026 non rispondeva (521).
sostituisci(
    'const CONTACT_ENDPOINT="https://formsubmit.co/ajax/dramane@studiogalilei.com";',
    'const CONTACT_ENDPOINT="/api/invia-email";'
    'async function sgInviaEmail(p){const c={};for(const n of Object.keys(p))n[0]!=="_"&&(c[n]=p[n]);'
    'try{const r=await fetch((window.SG_EMAIL||{}).endpoint||CONTACT_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},'
    'body:JSON.stringify({tipo:"contatto",replyto:p._replyto||c.email||"",campi:c})}),d=await r.json().catch(()=>null);return!!(r.ok&&d&&d.ok)}catch(e){return!1}}'
    'function sgMailto(p){const c=Object.keys(p).filter(n=>n[0]!=="_"&&p[n]).map(n=>n+": "+p[n]).join("\\n");'
    'return"mailto:dramane@studiogalilei.com?subject="+encodeURIComponent(p._subject||"Contatto dal sito")+"&body="+encodeURIComponent(c)}',
    segno="async function sgInviaEmail(")
sostituisci('[errMsg,setErrMsg]=I.useState("")', '[errMsg,setErrMsg]=I.useState(""),[sgMail,setSgMail]=I.useState("")')
i = s.find('try{const res=await fetch(CONTACT_ENDPOINT')
if i != -1:
    j = s.find('finally{setSending(!1)}', i)
    s = (s[:i] + 'setSgMail("");try{const ok=await sgInviaEmail(payload);ok?r(!0):(console.error("Contact form submit failed"),setSgMail(sgMailto(payload)),'
         'setErrMsg(a("Invio non riuscito. Puoi mandarci lo stesso messaggio via email con il pulsante qui sotto.","Could not send. You can send us the same message by email with the button below.")))}' + s[j:])
sostituisci(
    'errMsg?A.jsx("p",{role:"alert",className:"text-[14px] leading-relaxed text-red-600",children:errMsg}):null]',
    'errMsg?A.jsx("p",{role:"alert",className:"text-[14px] leading-relaxed text-red-600",children:errMsg}):null,'
    'errMsg&&sgMail?A.jsxs("a",{href:sgMail,className:"sg-mail-riserva",children:[A.jsx(kf,{size:17,strokeWidth:2,"aria-hidden":"true"}),a("Invia via email","Send by email")]}):null]')

# Member Club: oltre a Supabase, ogni candidatura arriva anche per email.
# Il modulo vive in un template literal del bundle: niente backtick, "${" o backslash qui dentro.
NOTIFICA = """
// copia della candidatura per email (Resend, tramite /api/invia-email del sito)
function notificaEmail(riga){
  try{
    let ep = "/api/invia-email";
    try{ ep = new URL((window.parent.SG_EMAIL || {}).endpoint || ep, window.parent.location.href).href; }catch(e){}
    const testo = v => Array.isArray(v) ? v.map(testo).join(", ")
      : (v && typeof v === "object") ? Object.keys(v).map(k => k + ": " + testo(v[k])).join(" | ")
      : String(v);
    const campi = {};
    for (const k of Object.keys(riga)) campi[k] = testo(riga[k]);
    fetch(ep, {method: "POST", keepalive: true,
      headers: {"Content-Type": "application/json", "Accept": "application/json"},
      body: JSON.stringify({tipo: "candidatura", replyto: riga.email || "", campi: campi})}).catch(() => {});
  }catch(e){}
}
"""
sostituisci('async function invia(){', NOTIFICA.lstrip("\n") + '\nasync function invia(){', segno="function notificaEmail(riga)")
sostituisci(
    '  const riga = {...d, dettaglio, settori, origine: new URLSearchParams(location.search).get("da") || "diretto"};\n',
    '  const riga = {...d, dettaglio, settori, origine: new URLSearchParams(location.search).get("da") || "diretto"};\n  notificaEmail(riga);\n',
    segno="  notificaEmail(riga);\n")

# Configurazione email, modificabile senza toccare il bundle
CONFIG = ('<script id="sg-config">\n'
          '/* Email dei moduli: la Vercel Function api/invia-email.js le manda con Resend a dramane@studiogalilei.com */\n'
          'window.SG_EMAIL = { endpoint: "/api/invia-email" };\n'
          '</script>\n')
s = re.sub(r'<script id="sg-config">.*?</script>\n', "", s, flags=re.S)
k = s.rfind("</head>")   # il primo </head> è dentro il modulo Member Club
s = s[:k] + CONFIG + s[k:]

# ---------------------------------------------------------------------------
# CSS e JS nuovi, prima dell'ultimo </body> (rigenerati a ogni lancio)
css = (base / "modifiche/sg-mobile.css").read_text(encoding="utf-8")
js = (base / "modifiche/sg-mobile.js").read_text(encoding="utf-8")
s = re.sub(r'<style id="sg-mobile-css">.*?</style>\n<script id="sg-mobile-js">.*?</script>\n', "", s, flags=re.S)
blocco = f'<style id="sg-mobile-css">\n{css}</style>\n<script id="sg-mobile-js">\n{js}</script>\n'
i = s.rfind("</body>")
s = s[:i] + blocco + s[i:]
(base / "index.html").write_text(s, encoding="utf-8")

# ---------------------------------------------------------------------------
# Pagina tour operator: stessa testata (logo nel quadratino, Area Privata discreta)
p = base / "tour-operator-v2.html"
t = p.read_text(encoding="utf-8")
i = t.find('<a class="sglogo" href="index.html#/" aria-label="Studio Galilei">')
if i != -1 and 'class="sg-logo-tile"' not in t[i:i + 400]:
    j = t.find("</a>", i) + 4
    t = t[:i] + '<a class="sglogo" href="index.html#/" aria-label="Studio Galilei"><span class="sg-logo-tile">' + SG_UFFICIALE + "</span></a>" + t[j:]
LUCCHETTO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
t = t.replace(
    '<a class="priv" href="index.html#/area-partner"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg></span><span class="lb"><span class="it">Area Privata</span><span class="en">Private Area</span></span></a>',
    '<a class="priv" href="index.html#/area-partner">' + LUCCHETTO + '<span class="it">Area Privata</span><span class="en">Private Area</span></a>')
CSS_TO = ('<style id="sg-testata">'
          '.sglogo .sg-logo-tile{display:grid;place-items:center;width:50px;height:50px;border-radius:12px;background:#061773;color:#fff;box-shadow:0 6px 16px -8px rgba(6,23,115,.55)}'
          '.sglogo .sg-logo-tile svg{display:block;width:86%;height:86%}'
          '@media (min-width:768px){.sglogo .sg-logo-tile{width:56px;height:56px;border-radius:13px}}'
          '.priv{flex-direction:row;gap:6px;margin-left:0;font-size:14px;font-weight:500;line-height:1;color:rgba(10,10,26,.62);white-space:nowrap}'
          '.priv:hover{color:var(--sg)}.priv svg{width:14px;height:14px;flex:none}'
          '</style>')
if 'id="sg-testata"' not in t:
    t = t.replace("</head>", CSS_TO + "\n</head>", 1)
p.write_text(t, encoding="utf-8")
print("ok", len(s))
