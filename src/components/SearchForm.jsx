import React, { useRef, useState } from 'react'
import './searchForm.css'

const initialForm = {
    name: '',
    time: '',
    price: ''
}

const SearchForm = ({setSearch}) => {
    const [form, setForm] = useState(initialForm);

    const selectTime = useRef();
    const selectPrice = useRef();

    const handleChange = (e) => {
        if(e.target.id==='time' && e.target.value!==''){
            selectPrice.current.value = '';
            form.price = '';
        }
        if(e.target.id==='price' && e.target.value!==''){
            selectTime.current.value = '';
            form.time = '';
        }

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(form);
    }

    const handleReset = () => {
        setForm(initialForm);
        selectTime.current.value = '';
        selectPrice.current.value = '';
        setSearch(null);
    }
    
  return (
    <div className='form-container'>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Receta:</label>
                <input type="text" name='name' id='name' placeholder="Nombre... " value={form.name} onChange={handleChange}/>
            </div>
            
            <div>
                <label htmlFor="time">Tiempo:</label>
                <select name="time" id="time" onChange={handleChange} ref={selectTime}>
                    <option value="">---</option>
                    <option value="lowToHigh">Menor a mayor</option>
                    <option value="highToLow">Mayor a menor</option>
                </select>
            </div>

            <div>
                <label htmlFor="price">Precio:</label>
                <select name="price" id="price" onChange={handleChange} ref={selectPrice}>
                    <option value="">---</option>
                    <option value="lowToHigh">Menor a mayor</option>
                    <option value="highToLow">Mayor a menor</option>
                </select>
            </div>
            
            <div>
                <button type="submit">Buscar</button>
                <button type='reset' onClick={handleReset}>Limpiar</button>
            </div>
        </form>
    </div>
  )
}

export default SearchForm