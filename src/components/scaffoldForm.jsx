import { useState } from 'react';

function ScaffoldForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        category: 'general',
        message: '',
        newsletter: false,
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('idle');

    const validateForm = () => {
        const newErrors = {};

        // Validar nombre
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        } else if (formData.name.length < 3) {
            newErrors.name = 'El nombre debe tener al menos 3 caracteres';
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        // Validar teléfono (opcional pero si se llena debe ser válido)
        if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Teléfono debe tener 10 dígitos';
        }

        // Validar mensaje
        if (!formData.message.trim()) {
            newErrors.message = 'El mensaje es requerido';
        } else if (formData.message.length < 10) {
            newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Simula envío a API
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log('Datos del formulario:', formData);
            setSubmitStatus('success');

            // Resetea el formulario después de 2 segundos
            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    category: 'general',
                    message: '',
                    newsletter: false,
                });
                setSubmitStatus('idle');
            }, 2000);

        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Limpia el error del campo al escribir
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-text-primary mb-2">
                        Contáctanos
                    </h1>
                    <p className="text-text-secondary">
                        Completa el formulario y nos pondremos en contacto contigo
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-background-card rounded-2xl shadow-lg border border-border p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nombre completo */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                                Nombre completo *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.name
                                    ? 'border-error focus:ring-error'
                                    : 'border-border focus:ring-primary'
                                    } focus:outline-none focus:ring-2 focus:border-transparent bg-white text-text-primary transition-all`}
                                placeholder="Juan Pérez"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-error flex items-center gap-1">
                                    <span>⚠</span> {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email y Teléfono en grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.email
                                        ? 'border-error focus:ring-error'
                                        : 'border-border focus:ring-primary'
                                        } focus:outline-none focus:ring-2 focus:border-transparent bg-white text-text-primary transition-all`}
                                    placeholder="juan@ejemplo.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-error flex items-center gap-1">
                                        <span>⚠</span> {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Teléfono */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.phone
                                        ? 'border-error focus:ring-error'
                                        : 'border-border focus:ring-primary'
                                        } focus:outline-none focus:ring-2 focus:border-transparent bg-white text-text-primary transition-all`}
                                    placeholder="1234567890"
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-error flex items-center gap-1">
                                        <span>⚠</span> {errors.phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Categoría */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-text-primary mb-2">
                                Categoría
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-text-primary transition-all"
                            >
                                <option value="general">Consulta general</option>
                                <option value="support">Soporte técnico</option>
                                <option value="sales">Ventas</option>
                                <option value="feedback">Comentarios</option>
                            </select>
                        </div>

                        {/* Mensaje */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                                Mensaje *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.message
                                    ? 'border-error focus:ring-error'
                                    : 'border-border focus:ring-primary'
                                    } focus:outline-none focus:ring-2 focus:border-transparent bg-white text-text-primary resize-none transition-all`}
                                placeholder="Escribe tu mensaje aquí..."
                            />
                            {errors.message && (
                                <p className="mt-1 text-sm text-error flex items-center gap-1">
                                    <span>⚠</span> {errors.message}
                                </p>
                            )}
                            <p className="mt-1 text-xs text-text-muted">
                                {formData.message.length} caracteres
                            </p>
                        </div>

                        {/* Newsletter checkbox */}
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="newsletter"
                                name="newsletter"
                                checked={formData.newsletter}
                                onChange={handleChange}
                                className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                            />
                            <label htmlFor="newsletter" className="text-sm text-text-secondary">
                                Quiero recibir actualizaciones y novedades por email
                            </label>
                        </div>

                        {/* Botón submit */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200 ${isSubmitting
                                    ? 'bg-text-muted cursor-not-allowed'
                                    : submitStatus === 'success'
                                        ? 'bg-success'
                                        : submitStatus === 'error'
                                            ? 'bg-error'
                                            : 'bg-primary hover:bg-primary-700 active:scale-95'
                                    } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Enviando...
                                    </span>
                                ) : submitStatus === 'success' ? (
                                    <span className="flex items-center justify-center gap-2">
                                        ✓ Enviado correctamente
                                    </span>
                                ) : submitStatus === 'error' ? (
                                    <span className="flex items-center justify-center gap-2">
                                        ✗ Error al enviar
                                    </span>
                                ) : (
                                    'Enviar mensaje'
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer info */}
                <p className="text-center text-sm text-text-muted mt-6">
                    * Campos obligatorios
                </p>
            </div>
        </div>
    );
}


export default ScaffoldForm;