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
import { useMemo, useState } from 'react'

const App = () => {
  const [formData, setFormData] = useState({ name: '', email: '', note: '' })
  const [method, setMethod] = useState('email')
  const [isSent, setIsSent] = useState(false)

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
      const res = await emailjs.send(
        'service_unb8fip',
        'template_9pz9l58',
        {
          name: formData.name,
          email: formData.email,
          note: formData.note,
        },
        'Pt2JzzzZZgCBGyELh'
      )
      console.log('SUCCESS:', res)
      setIsSent(true)
      setTimeout(() => setIsSent(false), 2000)
    } catch (error) {
      console.error('EmailJS ERROR:', error)
      alert('Échec envoi email — vérifiez la console')
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

      <main className="relative flex items-center justify-center w-full h-full p-4 sm:p-6 lg:p-4 xl:p-8">
        <div className="grid w-full max-w-[1440px] max-h-full gap-4 xl:gap-6 lg:grid-cols-[0.9fr_1.1fr] items-stretch overflow-y-auto lg:overflow-visible lg:py-2">
          {/* COLONNE GAUCHE */}
          <div className="flex flex-col gap-4 xl:gap-6">
            {/* Card Profil */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative shrink-0 overflow-hidden rounded-[2rem] bg-white/60 p-5 xl:p-6 shadow-xl backdrop-blur-xl ring-1 ring-white/80"
            >
              <div className="flex items-center gap-5">
                <div className="relative shrink-0">
                  <img
                    src="sonia.jpg"
                    alt="Sonia Mattos"
                    className="object-cover w-16 h-16 rounded-full shadow-sm sm:w-20 sm:h-20 ring-4 ring-emerald-100"
                  />
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
                    Thérapeute en biodécodage
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Card Features */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              /* On utilise flex-1 pour qu'elle prenne la place restante sans dépasser */
              className="flex-1 flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white/60 p-6 xl:p-8 shadow-xl backdrop-blur-xl ring-1 ring-white/80"
            >
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                  <Sparkles size={13} /> Biodécodage thérapeutique
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl xl:text-5xl leading-[1.1]">
                  Un espace doux, <br />
                  <span className="font-serif italic text-emerald-700">
                    propre et serein.
                  </span>
                </h1>
                <p className="max-w-xl mt-4 leading-relaxed text-md text-slate-700 xl:text-base">
                  Votre corps vous parle, écoutons ensempble ce qu'il a à vous
                  dire
                </p>
              </div>

              <div className="grid gap-3 mt-6 sm:grid-cols-3">
                <FeatureCard
                  icon={<Flower2 size={18} />}
                  title="Écoute de soi"
                  desc="Décodez vos émotions pour trouver votre bien être"
                />
                <FeatureCard
                  icon={<Haze size={18} />}
                  title="Transformation"
                  desc="Transformer le sens caché de vos symptômes."
                />
                <FeatureCard
                  icon={<MapPin size={18} />}
                  title="Retrouver sa clarté"
                  desc="Prendre du recul pour mieux comprendre ce que vous traversez."
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
            className="relative flex flex-col overflow-hidden rounded-[2.25rem] bg-white/80 p-6 xl:p-10 shadow-2xl ring-1 ring-slate-200/60"
          >
            <div className="mb-6 xl:mb-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                Contact direct
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl xl:text-5xl leading-[1.1]">
                Réservez, en toute&nbsp;
                <span className="font-serif italic text-emerald-700">
                  tranquilité.
                </span>
              </h2>
            </div>

            <form
              onSubmit={handleSendMessage}
              className="flex flex-col flex-1 gap-4 xl:gap-5"
            >
              <div className="grid gap-4 xl:gap-5 sm:grid-cols-2">
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
                  label="Email (Recommandé sur ordinateur)"
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

              <div className="pt-4 mt-auto space-y-4">
                <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-2xl ring-1 ring-slate-200">
                  <ToggleButton
                    active={method === 'email'}
                    onClick={() => setMethod('email')}
                  >
                    Email
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
                  className="flex items-center justify-center w-full gap-3 py-3.5 xl:py-4 text-base xl:text-lg font-bold text-white transition-colors shadow-lg cursor-pointer bg-emerald-900 hover:bg-teal-900 rounded-2xl"
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

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-4 transition-shadow shadow-sm xl:p-5 rounded-2xl bg-white/80 ring-1 ring-slate-200/50 hover:shadow-md">
    <div className="inline-flex p-2 mb-3 xl:p-3 rounded-xl bg-emerald-50 text-emerald-600">
      {icon}
    </div>
    <p className="text-sm font-bold xl:text-base text-slate-900">{title}</p>
    <p className="mt-1 text-[11px] xl:text-sm leading-snug text-slate-500">
      {desc}
    </p>
  </div>
)

const Field = ({
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
    <div className="relative group">
      <div className="absolute top-3.5 left-4 text-slate-400 opacity-50 group-focus-within:opacity-100 group-focus-within:text-emerald-600 transition-all pointer-events-none">
        {icon}
      </div>
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={2}
          className="w-full py-3 pl-12 pr-5 text-sm transition-all border outline-none resize-none xl:text-base rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-emerald-100/50"
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
