// Componente para renderizar estrellas de rating
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating, size = 'md', className = '' }) => {
    const sizes = {
        sm: 'text-sm',
        md: 'text-lg',
        lg: 'text-xl',
    };

    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        // Estrellas llenas
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <FaStar key={`full-${i}`} className="text-accent" />
            );
        }

        // Media estrella
        if (hasHalfStar) {
            stars.push(
                <FaStarHalfAlt key="half" className="text-accent" />
            );
        }

        // Estrellas vacías
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <FaRegStar key={`empty-${i}`} className="text-text-muted" />
            );
        }

        return stars;
    };

    return (
        <div className={`flex gap-1 ${sizes[size]} ${className}`}>
            {renderStars()}
        </div>
    );
};

export default StarRating;
