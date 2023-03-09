import React, { useContext, useEffect, useState } from 'react'
import NavMenu from '../components/NavMenu'
import { helpHtpp } from '../helpers/helpHttp';
import UserContext from '../context/userContext';
import Recipe from '../components/Recipe';
import './myRecipes.css'
import Loader from '../components/Loader';
import SearchForm from '../components/SearchForm';
import LanguageContext from '../context/languageContext';

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [fullRecipes, setFullRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState(null);
    const [edited, setEdited] = useState(false)

    const { texts } = useContext(LanguageContext)
    const { user } = useContext(UserContext);
    const TOKEN = user.token;

    const getRecipes = async (url, set, add=false) => {
        setLoading(true);

        const options = {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            }
        }
        helpHtpp().get(url, options)
            .then(res => {
                if(add) set(prev => [...prev, res])
                else set(res);
                setLoading(false);
            })
    }
    
    useEffect(() => {
        getRecipes('http://ec2-3-82-93-203.compute-1.amazonaws.com/api/recipe/recipes/', setRecipes)
    }, [])

    useEffect(() => {
        if(recipes.length>=0){
            recipes.forEach(recipe => {
                const url = `http://ec2-3-82-93-203.compute-1.amazonaws.com/api/recipe/recipes/${recipe.id}/`;
                getRecipes(url, setFullRecipes, true)
            })
        }
        
    }, [recipes])


    useEffect(() => {
        if(fullRecipes.length>0){

            if(search) {
                const { name, time, price } = search;
                const filteredRecipes = fullRecipes.filter(recipe => {
                    if(name) return recipe.title.toLowerCase().includes(name.toLowerCase())
                    else return recipe
                })
                if(time){
                    if(time === 'lowToHigh') filteredRecipes.sort((a, b) => a.time_minutes - b.time_minutes);
                    else filteredRecipes.sort((a, b) => b.time_minutes - a.time_minutes);
                }
                if(price){
                    if(price === 'lowToHigh') filteredRecipes.sort((a, b) => a.price - b.price);
                    else filteredRecipes.sort((a, b) => b.price - a.price);
                }
                
                setFullRecipes(filteredRecipes);
            } else{
                setFullRecipes(recipes);
            }

        }
    }, [search])

    useEffect(() => {
        if(edited) {
            setRecipes([])
            setFullRecipes([])
            getRecipes('http://ec2-3-82-93-203.compute-1.amazonaws.com/api/recipe/recipes/', setRecipes)
            setEdited(false)
        }
    }, [edited])


  return (
    <>
        < NavMenu />
        < SearchForm setSearch={setSearch} />
        <div className='recipes-list'>
            {loading && fullRecipes.length === 0 && < Loader />}
            {!loading && fullRecipes.length>0 && fullRecipes.map(recipe => <Recipe key={recipe.id} ingredients={recipe.ingredients} price={recipe.price} time={recipe.time_minutes}
                                        title={recipe.title} description={recipe.description} image={recipe.image} id={recipe.id} setEdited={setEdited}/>)}

            {!loading && fullRecipes.length === 0 && <div className='no-recipes'><h2>{texts.noRecipes}</h2></div>}
        </div>
    </>
  )
}

export default MyRecipes