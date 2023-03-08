import React, { useContext, useEffect, useRef, useState } from 'react';
import './dragAndDrop.css';

const JuegoPersonalizadoDragAndDrop = ({setImage, titleDragDrop, setTitleDragDrop}) => {

    const [titleDropZone, setTitleDropZone] = useState('Arrastra y suelta tus imagenes');

    const dropZone = useRef();

    useEffect(() => {
        const $dropZone = dropZone.current;

        $dropZone.addEventListener('dragover', e => {
            e.preventDefault();
            e.stopPropagation();
            e.target.classList.add('is-active')
        })
        
        $dropZone.addEventListener('dragleave', e => {
            e.preventDefault();
            e.stopPropagation();
            e.target.classList.remove('is-active')
        })
        
        $dropZone.addEventListener('drop', e => {
            e.preventDefault();
            e.stopPropagation();
            let files = Array.from(e.dataTransfer.files);
            setImage(files);

            e.target.classList.remove('is-active')
        })
    }, [])
    
    useEffect(() => {
        const $dropZone = dropZone.current;
        if(titleDragDrop){
            $dropZone.classList.add('is-error');
            setTitleDropZone(titleDragDrop)

            setTimeout(() => {
                $dropZone.classList.remove('is-error');
                setTitleDropZone('Arrastra y suelta tu imagen');
                setTitleDragDrop('')
            }, 2000)
        }
    }, [titleDragDrop])

  return (
    <div>
        <main>
            <div className={`drop-zone`} ref={dropZone}>
                {<p>{titleDropZone}</p>}
            </div>
        </main>
    </div>
  )
}

export default JuegoPersonalizadoDragAndDrop