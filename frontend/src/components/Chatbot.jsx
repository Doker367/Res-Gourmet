// Chatbot flotante con animaciones
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';
import { sendChatMessage } from '../services/api';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: '¡Hola! 👋 Bienvenido a LARCAD. ¿En qué puedo ayudarte hoy?',
            time: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Scroll automático al nuevo mensaje
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Enviar mensaje
    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            type: 'user',
            text: inputValue,
            time: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            const response = await sendChatMessage(inputValue);

            // Simular delay natural
            setTimeout(() => {
                const botMessage = {
                    id: messages.length + 2,
                    type: 'bot',
                    text: response.data.message,
                    time: new Date()
                };
                setMessages(prev => [...prev, botMessage]);
                setIsTyping(false);
            }, 500);
        } catch (error) {
            // Fallback si el backend no responde
            setTimeout(() => {
                const botMessage = {
                    id: messages.length + 2,
                    type: 'bot',
                    text: 'Disculpa, estoy teniendo problemas técnicos. Por favor contacta directamente al (555) 123-4567.',
                    time: new Date()
                };
                setMessages(prev => [...prev, botMessage]);
                setIsTyping(false);
            }, 1000);
        }
    };

    // Sugerencias rápidas
    const quickReplies = [
        'Horarios',
        'Reservar',
        'Ver menú',
        'Ubicación'
    ];

    const handleQuickReply = (reply) => {
        setInputValue(reply);
        setTimeout(() => handleSend(), 100);
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`
          fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full
          flex items-center justify-center text-2xl
          shadow-glow transition-colors duration-300
          ${isOpen ? 'bg-primary-light text-accent' : 'bg-accent text-primary-dark'}
        `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={isOpen ? {} : { boxShadow: ['0 0 20px rgba(199,211,0,0.4)', '0 0 40px rgba(199,211,0,0.8)', '0 0 20px rgba(199,211,0,0.4)'] }}
                transition={isOpen ? {} : { duration: 2, repeat: Infinity }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.span
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <FaTimes />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="open"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            <FaComments />
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="fixed bottom-24 right-6 z-50 w-[350px] max-w-[calc(100vw-48px)] bg-primary-dark rounded-2xl shadow-2xl overflow-hidden border border-white/10"
                    >
                        {/* Header */}
                        <div className="bg-accent text-primary-dark p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-dark/20 rounded-full flex items-center justify-center">
                                <FaRobot className="text-lg" />
                            </div>
                            <div>
                                <h4 className="font-bold">Asistente LARCAD</h4>
                                <span className="text-xs opacity-80">Responde al instante</span>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="h-[300px] overflow-y-auto p-4 space-y-4 bg-primary">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-2 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    {/* Avatar */}
                                    <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                    ${msg.type === 'user' ? 'bg-accent text-primary-dark' : 'bg-primary-light text-accent'}
                  `}>
                                        {msg.type === 'user' ? <FaUser className="text-sm" /> : <FaRobot className="text-sm" />}
                                    </div>

                                    {/* Message */}
                                    <div className={`
                    max-w-[70%] p-3 rounded-2xl text-sm
                    ${msg.type === 'user'
                                            ? 'bg-accent text-primary-dark rounded-br-none'
                                            : 'bg-primary-dark text-white rounded-bl-none'}
                  `}>
                                        <p className="whitespace-pre-line">{msg.text}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-2"
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary-light text-accent flex items-center justify-center">
                                        <FaRobot className="text-sm" />
                                    </div>
                                    <div className="bg-primary-dark p-3 rounded-2xl rounded-bl-none">
                                        <div className="flex gap-1 loading-dots">
                                            <span className="w-2 h-2 bg-accent rounded-full"></span>
                                            <span className="w-2 h-2 bg-accent rounded-full"></span>
                                            <span className="w-2 h-2 bg-accent rounded-full"></span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies */}
                        {messages.length <= 2 && (
                            <div className="px-4 pb-2 flex flex-wrap gap-2 bg-primary">
                                {quickReplies.map((reply) => (
                                    <button
                                        key={reply}
                                        onClick={() => handleQuickReply(reply)}
                                        className="px-3 py-1 bg-primary-light text-text-secondary text-xs rounded-full hover:bg-accent hover:text-primary-dark transition-colors"
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-4 bg-primary-dark border-t border-white/10 flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Escribe un mensaje..."
                                className="flex-1 bg-primary border border-primary-light rounded-full px-4 py-2 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent"
                            />
                            <motion.button
                                onClick={handleSend}
                                className="w-10 h-10 bg-accent text-primary-dark rounded-full flex items-center justify-center"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                disabled={!inputValue.trim()}
                            >
                                <FaPaperPlane className="text-sm" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
