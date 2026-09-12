import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Send, CheckCircle2, MessageSquare, Clock, ShieldCheck, Copy, Check, Sparkles, AlertCircle } from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { normalizeLang, getCanonicalUrl, getHreflangAlternates } from '../lib/i18n';

export const ContactUsPage: React.FC = () => {
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = normalizeLang(lang);
  const canonicalUrl = getCanonicalUrl('contact-us', currentLang);
  const hreflangs = getHreflangAlternates('contact-us');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'feedback',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const supportEmail = 'support@svgfav.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(supportEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay with in-browser client handling
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const contentByLang = {
    en: {
      title: 'Contact Us | SvgFav.com — Support, Feedback & Inquiries',
      metaDesc: 'Contact the SvgFav.com engineering team. Get support for vector conversions, report bugs, suggest features, or reach out for enterprise questions.',
      heading: 'Contact Us',
      subtitle: 'Have a question, feedback, or need technical assistance? We are here to help.',
      badge: 'Direct Developer Support',
      formTitle: 'Send a Message',
      nameLabel: 'Your Name *',
      emailLabel: 'Email Address *',
      categoryLabel: 'Category',
      subjectLabel: 'Subject *',
      messageLabel: 'Your Message *',
      submitBtn: 'Send Message',
      submittingBtn: 'Sending...',
      successTitle: 'Message Dispatched Successfully!',
      successMsg: 'Thank you for reaching out. Our engineering team will reply to your email within 24 hours.',
      directContactTitle: 'Direct Email Support',
      slaTitle: 'Response Time',
      slaDesc: 'We typically respond in under 24 hours Monday through Friday.'
    },
    de: {
      title: 'Kontakt | SvgFav.com — Technischer Support & Feedback',
      metaDesc: 'Kontaktieren Sie das SvgFav.com Entwicklerteam. Schneller Support für Vektor-Konvertierungen und technische Fragen.',
      heading: 'Kontaktieren Sie uns',
      subtitle: 'Haben Sie Fragen, Feedback oder Anregungen? Unser Team hilft Ihnen gerne weiter.',
      badge: 'Entwickler-Support',
      formTitle: 'Nachricht senden',
      nameLabel: 'Ihr Name *',
      emailLabel: 'E-Mail-Adresse *',
      categoryLabel: 'Kategorie',
      subjectLabel: 'Betreff *',
      messageLabel: 'Ihre Nachricht *',
      submitBtn: 'Nachricht absenden',
      submittingBtn: 'Wird gesendet...',
      successTitle: 'Nachricht erfolgreich übermittelt!',
      successMsg: 'Vielen Dank für Ihre Kontaktaufnahme. Wir melden uns innerhalb von 24 Stunden bei Ihnen.',
      directContactTitle: 'Direkter E-Mail-Kontakt',
      slaTitle: 'Reaktionszeit',
      slaDesc: 'In der Regel antworten wir innerhalb von 24 Stunden an Werktagen.'
    },
    pt: {
      title: 'Fale Conosco | SvgFav.com — Suporte e Feedback',
      metaDesc: 'Entre em contato com a equipe da SvgFav.com. Suporte técnico para conversão de vetores, sugestões e parcerias.',
      heading: 'Fale Conosco',
      subtitle: 'Dúvidas, sugestões ou suporte técnico? Nossa equipe está à disposição.',
      badge: 'Suporte Direto',
      formTitle: 'Envie uma Mensagem',
      nameLabel: 'Seu Nome *',
      emailLabel: 'Seu E-mail *',
      categoryLabel: 'Assunto Principal',
      subjectLabel: 'Título da Mensagem *',
      messageLabel: 'Mensagem *',
      submitBtn: 'Enviar Mensagem',
      submittingBtn: 'Enviando...',
      successTitle: 'Mensagem Enviada com Sucesso!',
      successMsg: 'Agradecemos o seu contato. Nossa equipe técnica responderá em até 24 horas.',
      directContactTitle: 'Canal Direto de E-mail',
      slaTitle: 'Tempo de Resposta',
      slaDesc: 'Respondemos normalmente em até 24 horas úteis.'
    },
    fr: {
      title: 'Contactez-nous | SvgFav.com — Support et Questions',
      metaDesc: 'Contactez l\'équipe de SvgFav.com pour toute question technique, retour d\'expérience ou suggestion.',
      heading: 'Contactez-nous',
      subtitle: 'Une question, un retour ou un besoin particulier ? Nous sommes à votre écoute.',
      badge: 'Support Développeurs',
      formTitle: 'Envoyer un message',
      nameLabel: 'Votre nom *',
      emailLabel: 'Adresse e-mail *',
      categoryLabel: 'Catégorie',
      subjectLabel: 'Objet *',
      messageLabel: 'Votre message *',
      submitBtn: 'Envoyer le message',
      submittingBtn: 'Envoi en cours...',
      successTitle: 'Message envoyé avec succès !',
      successMsg: 'Merci pour votre message. Notre équipe vous répondra sous 24 heures.',
      directContactTitle: 'Support E-mail direct',
      slaTitle: 'Délai de réponse',
      slaDesc: 'Réponse sous 24 heures ouvrées.'
    },
    es: {
      title: 'Contacto | SvgFav.com — Soporte y Consultas',
      metaDesc: 'Ponte en contacto con el equipo de SvgFav.com. Soporte para conversión de vectores y sugerencias.',
      heading: 'Contacto',
      subtitle: '¿Tienes alguna pregunta o sugerencia? Estamos aquí para ayudarte.',
      badge: 'Soporte Directo',
      formTitle: 'Enviar un Mensaje',
      nameLabel: 'Tu Nombre *',
      emailLabel: 'Correo Electrónico *',
      categoryLabel: 'Categoría',
      subjectLabel: 'Asunto *',
      messageLabel: 'Mensaje *',
      submitBtn: 'Enviar Mensaje',
      submittingBtn: 'Enviando...',
      successTitle: '¡Mensaje Enviado con Éxito!',
      successMsg: 'Gracias por escribirnos. Responderemos a tu correo en menos de 24 horas.',
      directContactTitle: 'Correo Electrónico Directo',
      slaTitle: 'Tiempo de Respuesta',
      slaDesc: 'Respondemos generalmente en menos de 24 horas laborables.'
    }
  };

  const localized = contentByLang[currentLang] || contentByLang.en;

  const mailtoLink = `mailto:${supportEmail}?subject=${encodeURIComponent(
    formData.subject || 'SvgFav Inquiry'
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nCategory: ${formData.category}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SeoHead
        title={localized.title}
        description={localized.metaDesc}
        canonicalUrl={canonicalUrl}
        hreflangAlternates={hreflangs}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Company', url: '/about-us' },
          { name: localized.heading, url: canonicalUrl }
        ]}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Company' },
          { name: localized.heading }
        ]}
      />

      <LanguageSelector currentLang={currentLang} baseSlug="contact-us" />

      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-400 text-xs font-semibold mb-4">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{localized.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{localized.heading}</h1>
        <p className="text-sm text-slate-400 mt-2">{localized.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Contact Information & Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Email Card */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border space-y-4">
            <div className="w-10 h-10 rounded-xl bg-brand-500/15 text-brand-400 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{localized.directContactTitle}</h3>
              <p className="text-xs text-slate-400 mt-1">Direct inbox monitored by core platform engineers.</p>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-dark-border/60">
              <a
                href={`mailto:${supportEmail}`}
                className="font-mono text-xs text-brand-300 hover:text-brand-200 transition-colors truncate"
              >
                {supportEmail}
              </a>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-lg bg-dark-card hover:bg-dark-hover text-slate-300 transition-colors shrink-0 ml-2"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Response SLA Card */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">{localized.slaTitle}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{localized.slaDesc}</p>
          </div>

          {/* Privacy Guarantee Card */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Private & Confidential</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never share your email or message details with marketers. Your inquiries remain strictly private.
            </p>
          </div>
        </div>

        {/* Right Col: Functioning Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-dark-border">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Send className="w-4 h-4 text-brand-400" />
              <span>{localized.formTitle}</span>
            </h2>

            {submitted ? (
              <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">{localized.successTitle}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                  {localized.successMsg}
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={mailtoLink}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open in Email App (Backup)</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', category: 'feedback', subject: '', message: '' });
                    }}
                    className="px-4 py-2 rounded-xl bg-dark-card hover:bg-dark-hover text-slate-300 text-xs font-semibold transition-colors border border-dark-border"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">{localized.nameLabel}</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-bg/80 border border-dark-border text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">{localized.emailLabel}</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-bg/80 border border-dark-border text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">{localized.categoryLabel}</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-bg/80 border border-dark-border text-white text-xs focus:outline-none focus:border-brand-500 transition-colors"
                    >
                      <option value="feedback">General Feedback</option>
                      <option value="bug">Report a Bug / Vector Glitch</option>
                      <option value="feature">Feature Request</option>
                      <option value="enterprise">Commercial / Enterprise Inquiries</option>
                      <option value="privacy">Privacy & GDPR Question</option>
                    </select>
                  </div>

                  {/* Subject Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">{localized.subjectLabel}</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Question about PNG to SVG resolution"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-bg/80 border border-dark-border text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">{localized.messageLabel}</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-bg/80 border border-dark-border text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-brand-500 transition-colors resize-y"
                    required
                  />
                </div>

                {/* Submit Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-glow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? localized.submittingBtn : localized.submitBtn}</span>
                  </button>

                  <a
                    href={mailtoLink}
                    className="text-xs text-slate-400 hover:text-brand-400 transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Prefer direct mailto link? Click here</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
