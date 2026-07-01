'use client'
import emailjs from '@emailjs/browser'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CheckCircle2,
  Flower2,
  Haze,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Sparkles,
  Star,
  User,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
emailjs.init({ publicKey: 'Pt2JzzzZZgCBGyELh' })

const App = () => {
  const [formData, setFormData] = useState({ name: '', email: '', note: '' })
  const [method, setMethod] = useState('email')
  const [isSent, setIsSent] = useState(false)

  // --- Easter egg Konami code : ↑ ↑ ↓ ↓ ← → ← → B A ---
  // Change la photo de la carte "Admin du site" par une image aléatoire de la liste.
  // Pour ajouter/retirer des photos, modifie simplement ADMIN_IMAGES ci-dessous
  // (place les fichiers dans le dossier /public à côté de sonia.jpg).
  // --- Easter egg Konami code : ↑ ↑ ↓ ↓ ← → ← → B A ---
  const ADMIN_IMAGES = ['sonia.jpg', 'admin-2.jpg']
  const KONAMI_CODE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ]
  const [adminImage, setAdminImage] = useState('sonia.jpg')
  const konamiProgress = useRef(0)
  const imageQueue = useRef([]) // pioche d'images mélangées, à consommer avant de reboucler

  const shuffle = (arr) => {
    const copy = [...arr]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
  }

  const getNextImage = (current) => {
    if (imageQueue.current.length === 0) {
      const next = shuffle(ADMIN_IMAGES)
      // évite qu'une nouvelle pioche commence par l'image déjà affichée
      if (next[0] === current && next.length > 1) {
        ;[next[0], next[1]] = [next[1], next[0]]
      }
      imageQueue.current = next
    }
    return imageQueue.current.shift()
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Certaines touches (touches mortes, raccourcis système, IME) déclenchent
      // un keydown sans e.key défini : on les ignore pour éviter le crash.
      if (!e.key) return

      const expected = KONAMI_CODE[konamiProgress.current]
      const pressed = e.key.length === 1 ? e.key.toLowerCase() : e.key

      if (pressed === expected) {
        konamiProgress.current += 1
        if (konamiProgress.current === KONAMI_CODE.length) {
          konamiProgress.current = 0
          setAdminImage((current) => getNextImage(current))
        }
      } else {
        konamiProgress.current = pressed === KONAMI_CODE[0] ? 1 : 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const myEmail = 'sonia.mattos.biodecodage@gmail.com'
  const myPhone = '330783880162'
  const titreEmail = 'Réservation de ' + formData.name

  const message = useMemo(() => {
    return `DEMANDE DE SÉANCE - BIODÉCODAGE\n-------------------------------\nBonjour, je suis ${formData.name}.\nJe souhaite réserver une séance.\n\nEmail : ${formData.email}\nNote : ${formData.note?.trim() || 'Aucune précision.'}`
  }, [formData])

  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (method === 'whatsapp') {
      const encoded = encodeURIComponent(message)
      window.open(`https://wa.me/${myPhone}?text=${encoded}`, '_blank')
      setIsSent(true)
      setTimeout(() => setIsSent(false), 2000)
      return
    }

    // Email via EmailJS
    try {
      const res = await emailjs.send('service_kkerzv8', 'template_9pz9l58', {
        name: formData.name,
        email: formData.email,
        note: formData.note,
      })
      console.log('SUCCESS:', res)
      setIsSent(true)
      setTimeout(() => setIsSent(false), 2000)
    } catch (error) {
      console.error('EmailJS ERROR status:', error?.status)
      console.error('EmailJS ERROR text:', error?.text)
      alert(`Échec envoi email : ${error?.text || 'vérifiez la console'}`)
    }
  }

  return (
    /* 1. PARENT : On verrouille la hauteur sur desktop pour supprimer le scroll général */
    <div className="relative w-full h-auto font-sans min-h-dvh lg:h-dvh lg:overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-emerald-100 text-slate-900">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-emerald-200/30 blur-[120px]" />
        <div className="absolute right-[-5%] bottom-[-5%] h-[40%] w-[40%] rounded-full bg-teal-200/20 blur-[120px]" />
      </div>

      <main className="relative flex items-center justify-center w-full h-full p-4 sm:p-6 lg:p-5 xl:p-8">
        {/*
          Zéro scroll : plus aucun overflow-y-auto nulle part. On tient uniquement
          en redimensionnant (paddings/gaps/texte resserrés sur le palier "lg", qui
          sautait avant directement de la taille mobile à "xl" et faisait déborder
          le contenu). Marge extérieure augmentée par rapport au bord de l'écran.
        */}
        <div className="grid w-full max-w-[1400px] max-h-full gap-3 lg:gap-2 xl:gap-5 lg:grid-cols-[0.9fr_1.1fr] items-stretch">
          {/* COLONNE GAUCHE */}
          <div className="flex flex-col gap-3 lg:gap-2 xl:gap-5">
            {/* Card Profil */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative shrink-0 overflow-hidden rounded-[2rem] bg-white/60 p-3 lg:p-3 xl:p-5 shadow-xl backdrop-blur-xl ring-1 ring-white/80"
            >
              <div className="flex items-center gap-5">
                <div className="relative shrink-0">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={adminImage}
                      initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.35 }}
                      src={adminImage}
                      alt="Sonia Mattos"
                      className="object-cover w-16 h-16 rounded-full shadow-sm sm:w-20 sm:h-20 ring-4 ring-emerald-100"
                    />
                  </AnimatePresence>
                  <div className="absolute -bottom-1 -right-1 rounded-full bg-emerald-600 p-1.5 text-white shadow-sm">
                    <Star size={12} fill="currentColor" />
                  </div>
                </div>
                <div>
                  <div className="mb-1.5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                    <Sparkles size={12} /> Admin du site
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    Sonia Mattos
                  </h2>
                  <p className="text-sm italic font-medium text-emerald-700">
                    Praticienne en biodécodage
                  </p>
                </div>

                {/* Langues des séances — deux drapeaux (icônes SVG) + un mini texte, à droite de la carte */}
                <div className="ml-auto hidden sm:flex flex-col items-end gap-1.5 shrink-0 pl-3 max-w-[110px]">
                  <div className="flex items-center gap-1.5">
                    <FlagFR className="h-4 w-6 rounded-[3px] shadow-sm ring-1 ring-black/10" />
                    <FlagES className="h-4 w-6 rounded-[3px] shadow-sm ring-1 ring-black/10" />
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700/80 text-right leading-tight">
                    Séances en français et en espagnol
                  </span>
                </div>
              </div>
            </motion.section>

            {/* Card Features */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              /* On utilise flex-1 pour qu'elle prenne la place restante sans dépasser */
              className="flex-1 flex flex-col overflow-hidden rounded-[2rem] bg-white/60 p-4 lg:p-4 xl:p-7 shadow-xl backdrop-blur-xl ring-1 ring-white/80"
            >
              <div>
                <div className="relative min-[1200px]:flex min-[1200px]:items-start min-[1200px]:gap-4">
                  <div
                    className="
    inline-flex items-center gap-2 rounded-full
    bg-emerald-50 px-4 py-2 text-[10px] font-bold
    uppercase tracking-widest text-emerald-700

    static mb-3

    min-[1024px]:absolute min-[1024px]:-top-3 min-[1024px]:-right-3 min-[1024px]:mb-0

    min-[1200px]:static min-[1200px]:mb-0 min-[1200px]:shrink-0 min-[1200px]:order-2
  "
                  >
                    <Sparkles size={13} />
                    Biodécodage thérapeutique
                  </div>

                  <div className="min-[1200px]:flex min-[1200px]:items-start min-[1200px]:gap-4 min-[1200px]:order-1">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-2xl lg:text-2xl xl:text-3xl leading-[1.1]">
                      Un espace doux, <br />
                      <span className="font-serif italic text-emerald-700">
                        sécurisé et serein.
                      </span>
                    </h1>
                  </div>
                </div>
                {/* FIX : <p> parent remplacé par <div> pour éviter <p> imbriqué dans <p> */}
                <div className="max-w-xl mt-3 lg:mt-3 xl:mt-4 text-xl text-slate-900 xl:text-base">
                  <p className="text-xl lg:text-lg block mb-3 lg:mb-3 xl:mb-5">
                    Comment se passe une séance ?
                  </p>
                  <p className="text-base leading-[1.5] font-serif italic text-slate-700 sm:text-2xs lg:text-sm xl:text-base 2xl:text-lg">
                    Mes séances sont basées sur l'échange et l'écoute. J'utilise
                    des protocoles, en décodage biologique vous permettant
                    d'être complètement partie prenante à la séance. Nous
                    cheminerons ensemble, écoutant vos ressentis, émotions. En
                    travaillant sur le ressenti il devient possible le processus
                    d'apaisement vers un nouvel équilibre
                  </p>
                </div>
              </div>

              <div className="grid gap-3 mt-3 sm:grid-cols-3">
                <FeatureCard
                  icon={<Flower2 size={18} />}
                  title="Écoute de soi"
                  desc="Décodez vos émotions pour trouver votre bien être"
                />
                <FeatureCard
                  icon={<Haze size={18} />}
                  title="Transformation"
                  desc="Transformez le sens caché de vos symptômes."
                />
                <FeatureCard
                  icon={<MapPin size={18} />}
                  title="Retrouver sa clarté"
                  desc="Prenez du recul pour mieux comprendre ce que vous traversez."
                />
              </div>
            </motion.section>
          </div>

          {/* COLONNE DROITE */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            /* p-6 sur petit desktop, p-10 sur grand écran */
            className="relative flex flex-col overflow-hidden rounded-[2.25rem] bg-white/80 p-4 lg:p-4 xl:p-9 shadow-2xl ring-1 ring-slate-200/60"
          >
            <div className="mb-4 lg:mb-4 xl:mb-8">
              <div className="mb-2 lg:mb-2 xl:mb-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                Contact direct
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-3xl xl:text-5xl leading-[1.1]">
                Réservez, en toute&nbsp;
                <span className="font-serif italic text-emerald-700">
                  tranquilité.
                </span>
              </h2>
            </div>

            <form
              onSubmit={handleSendMessage}
              className="flex flex-col flex-1 gap-3 lg:gap-3 xl:gap-5"
            >
              <div className="grid gap-3 lg:gap-3 xl:gap-5 sm:grid-cols-2">
                <Field
                  label="Nom"
                  id="n"
                  icon={<User size={18} />}
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <Field
                  label="Email"
                  id="e"
                  type="email"
                  icon={<Mail size={18} />}
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <Field
                className="flex-1"
                label="Votre message"
                id="m"
                type="textarea"
                icon={<MessageSquare size={18} />}
                placeholder="Comment puis-je vous accompagner ?"
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
              />

              <div className="pt-3 lg:pt-3 xl:pt-4 mt-auto space-y-3 lg:space-y-3 xl:space-y-4">
                <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-2xl ring-1 ring-slate-200">
                  <ToggleButton
                    active={method === 'email'}
                    onClick={() => setMethod('email')}
                  >
                    Email (Recommandé sur ordinateur)
                  </ToggleButton>
                  <ToggleButton
                    active={method === 'whatsapp'}
                    onClick={() => setMethod('whatsapp')}
                  >
                    WhatsApp
                  </ToggleButton>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex items-center justify-center w-full gap-3 py-3 lg:py-3 xl:py-4 text-base xl:text-lg font-bold text-white transition-colors shadow-lg cursor-pointer bg-emerald-900 hover:bg-teal-900 rounded-2xl"
                >
                  {isSent ? (
                    <>
                      <CheckCircle2 size={22} /> Envoyé !
                    </>
                  ) : (
                    <>
                      <Send size={20} /> Envoyer la demande
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.section>
        </div>
      </main>
      {/* Toast Notification */}
      <AnimatePresence>
        {isSent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed z-50 px-8 py-4 font-medium text-white -translate-x-1/2 rounded-full shadow-2xl bottom-8 left-1/2 bg-slate-900"
          >
            🎉 Envoi vers {method === 'email' ? 'votre boîte mail' : 'WhatsApp'}
            ...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* COMPOSANTS INTERNES */

const FlagFR = ({ className }) => (
  <svg viewBox="0 0 30 20" className={className} aria-label="Français">
    <rect width="30" height="20" fill="#ED2939" />
    <rect width="20" height="20" fill="#fff" />
    <rect width="10" height="20" fill="#002395" />
  </svg>
)

const FlagES = ({ className }) => (
  <svg viewBox="0 0 30 20" className={className} aria-label="Español">
    <rect width="30" height="20" fill="#AA151B" />
    <rect y="5" width="30" height="10" fill="#F1BF00" />
  </svg>
)

const FeatureCard = ({ icon, title, desc }) => (
  <div className="h-full flex flex-col p-4 transition-shadow shadow-sm rounded-2xl bg-white/80 ring-1 ring-slate-200/50 hover:shadow-md">
    <div className="inline-flex p-2 mb-3 xl:p-3 rounded-xl bg-emerald-50 text-emerald-600 w-fit">
      {icon}
    </div>

    <p className="text-sm font-bold text-slate-900">{title}</p>

    <p className="mt-1 text-[11px] leading-snug text-slate-500 flex-1">
      {desc}
    </p>
  </div>
)

const Field = ({
  className = '',
  label,
  id,
  icon,
  type,
  placeholder,
  value,
  onChange,
  required,
}) => (
  <div className="flex flex-col gap-1">
    <label
      htmlFor={id}
      className="ml-1 text-[11px] xl:text-xs italic font-bold text-emerald-700/90 uppercase tracking-wider"
    >
      {label}
    </label>
    <div className="relative group flex-1">
      <div className="absolute top-3.5 left-4 text-slate-400 opacity-50 group-focus-within:opacity-100 group-focus-within:text-emerald-600 transition-all pointer-events-none">
        {icon}
      </div>
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
  w-full flex-1
  min-h-[150px]
  min-[1024px]:min-h-[90px]
  min-[1280px]:min-h-[110px]
  min-[1469px]:min-h-[150px]
  py-3 pl-12 pr-5 text-sm
  transition-all border outline-none resize-none
  xl:text-base rounded-xl border-slate-200 bg-slate-50/50
  focus:bg-white focus:ring-4 focus:ring-emerald-100/50
"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full pl-12 pr-5 text-sm transition-all border outline-none h-11 xl:h-12 xl:text-base rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-emerald-100/50"
        />
      )}
    </div>
  </div>
)

const ToggleButton = ({ children, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`cursor-pointer py-2.5 xl:py-3 rounded-xl font-bold text-xs xl:text-sm transition-all flex-1 ${active ? 'bg-white text-emerald-700 shadow-md ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-800'}`}
  >
    {children}
  </button>
)

export default App
