import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useModal = (initialValue = false) => {
    const [isOpen, setIsOpen] = useState(initialValue);

    const navigate = useNavigate()

    const openModal = () => setIsOpen(true);

    const closeModal = (e) => {
        setIsOpen(false);
        // navigate('/my-recipes/')
        // window.location.reload();
    }

    return [isOpen, openModal, closeModal];
}
