import mobileScrollImage from '../assets/MobileImage.png';
import esticNew from '../assets/Estic_Update.png';
import sherwood from '../assets/Sherwood_Update.png';
import accel1LogoV2 from '../assets/accel1-logo-v2.png';
import logo1 from '../assets/logo_1.svg';
import logo2 from '../assets/logo_2.svg';

export const portfolioImages = [mobileScrollImage, esticNew, sherwood];
export const portfolioLogos = [accel1LogoV2, logo1, logo2];

export const getTestimonialData = (index) => {
    if (index === 1) {
        return {
            content: "Our collaboration with eparivartan has been nothing short of remarkable. Over the past six months, we have witnessed",
            title: "ESTIC"
        };
    } else if (index === 2) {
        return {
            content: "Over the past six months, we have witnessed",
            title: "Mr. Yogendra K Gurwara"
        };
    }
    // Default fallback is handled inside the component if undefined is returned
    return { content: undefined, title: undefined };
};
