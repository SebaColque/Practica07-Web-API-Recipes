import React, { useContext, useRef, useState } from 'react'
import LanguageContext from '../context/languageContext';
import './searchForm.css'

const initialForm = {
    name: '',
    time: '',
    price: ''
}

const SearchForm = ({setSearch}) => {
    const [form, setForm] = useState(initialForm);

    const { texts } = useContext(LanguageContext)
    
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
                <label htmlFor="name">{texts.labelRecipeName}</label>
                <input type="text" name='name' id='name' placeholder={texts.inputRecipeName} value={form.name} onChange={handleChange}/>
            </div>
            
            <div>
                <label htmlFor="time">{texts.labelRecipeTime}</label>
                <select name="time" id="time" onChange={handleChange} ref={selectTime}>
                    <option value="">---</option>
                    <option value="lowToHigh">{texts.selectLowToHigh}</option>
                    <option value="highToLow">{texts.selectHighToLow}</option>
                </select>
            </div>

            <div>
                <label htmlFor="price">{texts.labelRecipePrice}</label>
                <select name="price" id="price" onChange={handleChange} ref={selectPrice}>
                    <option value="">---</option>
                    <option value="lowToHigh">{texts.selectLowToHigh}</option>
                    <option value="highToLow">{texts.selectHighToLow}</option>
                </select>
            </div>
            
            <div>
                <button type="submit">{texts.searchButton}</button>
                <button type='reset' onClick={handleReset}>{texts.resetButton}</button>
            </div>
        </form>
    </div>
  )
}

export default SearchForm