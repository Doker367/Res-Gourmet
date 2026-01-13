/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Paleta principal del restaurante
                primary: {
                    dark: '#1f1f1f',
                    DEFAULT: '#2a2a2a',
                    light: '#3a3a3a',
                },
                accent: {
                    DEFAULT: '#c7d300',
                    hover: '#b6c900',
                    light: '#d4e000',
                    dark: '#a8b500',
                },
                text: {
                    primary: '#ffffff',
                    secondary: '#a0a0a0',
                    muted: '#6a6a6a',
                }
            },
            fontFamily: {
                heading: ['Playfair Display', 'serif'],
                body: ['Inter', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
                'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
                'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
                'slide-in-right': 'slideInRight 0.6s ease-out forwards',
                'scale-in': 'scaleIn 0.4s ease-out forwards',
                'pulse-glow': 'pulseGlow 2s infinite',
                'float': 'float 3s ease-in-out infinite',
                'typing': 'typing 1.5s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-50px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(50px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(199, 211, 0, 0.4)' },
                    '50%': { boxShadow: '0 0 40px rgba(199, 211, 0, 0.8)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                typing: {
                    '0%': { opacity: '0.2' },
                    '50%': { opacity: '1' },
                    '100%': { opacity: '0.2' },
                },
            },
            boxShadow: {
                'glow': '0 0 30px rgba(199, 211, 0, 0.3)',
                'glow-lg': '0 0 50px rgba(199, 211, 0, 0.5)',
                'card': '0 10px 40px rgba(0, 0, 0, 0.3)',
                'card-hover': '0 20px 60px rgba(0, 0, 0, 0.4)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-accent': 'linear-gradient(135deg, #c7d300 0%, #b6c900 100%)',
                'gradient-dark': 'linear-gradient(180deg, #1f1f1f 0%, #2a2a2a 100%)',
            },
        },
    },
    plugins: [],
}
