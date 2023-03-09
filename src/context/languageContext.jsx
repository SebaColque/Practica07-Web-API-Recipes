import { createContext, useEffect, useState } from "react";


const LanguageContext = createContext();

const initialLanguage = 'es';

const translations = {
    es: {
        // LOGIN/REGISTER
        loginPassword: 'Contraseña',
        loginUserName: 'Nombre de Usuario',
        loginButton: 'Iniciar Sesión',
        registerButton: 'Registrarse',
        unsuccesLogin: 'Usuario no válido',
        invalidEmail: 'Ingrese un correo válido',
        emailAlreadyExists: 'El correo ya está registrado',
        passwordMinLength: 'La contraseña debe tener al menos 5 caracteres',
        successfullyRegistered: 'Registrado con éxito',

        // NAV-MENU
        navHome: 'Inicio',
        navMyRecipes: 'Mis Recetas',
        navCreateRecipe: 'Crear Receta',

        // HOME
        headerSubtitle: 'Página donde podés gestionar tus',
        headerKeyWord1: 'recetas',
        headerKeyWord2: 'ingredientes',
        headerKeyWord3: 'cocina',
        mainMyRecipesDescription: 'Lugar donde podes ver todas tus recetas guardadas, hacer búsqueda por filtros y más',
        mainCreateRecipeDescription: 'Agregar una nueva receta a tu lista, indicando ingredientes, tiempo, precio, descripcion...',
        mainEditRecipeDescription: 'Edita la receta que eligas para poder cambiar cualquier item de la mísma',
        mainFamouseRecipes: 'Algunas recetas populares...',
        footerDescription1: 'Página hecha por Sebastián Colque utilizando la ',
        footerDescription2: ' creada por Valentín Minolli',

        // MY-RECIPES
        labelRecipeName: 'Receta:',
        inputRecipeName: 'Nombre...',
        labelRecipeTime: 'Tiempo:',
        labelRecipePrice: 'Precio:',
        selectLowToHigh: 'Menor a mayor',
        selectHighToLow: 'Mayor a menor',
        searchButton: 'Buscar',
        resetButton: 'Limpiar',
        noRecipes: 'No exiten recetas...',


        // CREATE-RECIPE
        createRecipeName: 'Nombre:',
        createRecipeNamePlaceholder: 'Nombre de la receta...',
        createRecipeDescription: 'Descripción:',
        createRecipeDescriptionPlaceholder: 'Descripción de la receta...',
        createRecipeIngredients: 'Ingredientes:',
        createRecipeTime: 'Tiempo de preparación (minutos):',
        createRecipeTimePlaceholder: 'Tiempo',
        createRecipePrice: 'Precio (USD):',
        createRecipeButton: 'Crear Receta',
        createRecipeSuccess: 'Receta creada!',
        createEditRecipeButton: 'Editar Receta',
        editRecipeSuccess: 'Receta editada!',

        // RECIPE
        recipeIngredients: 'Ingredientes:',
        editRecipeButton: 'Editar',
        deleteRecipeButton: 'Eliminar',
    },

    en: {
        // LOGIN/REGISTER
        loginPassword: 'Password',
        loginUserName: 'Username',
        loginButton: 'Login',
        registerButton: 'Register',
        unsuccesLogin: 'Invalid user',
        invalidEmail: 'Enter a valid email',
        emailAlreadyExists: 'The mail is already registered',
        passwordMinLength: 'Password must be at least 5 characters',
        successfullyRegistered: 'Successfully registered',

        // HOME
        navHome: 'Home',
        navMyRecipes: 'My Recipes',
        navCreateRecipe: 'Create Recipe',
        headerSubtitle: 'Website where you can manage your',
        headerKeyWord1: 'recipes',
        headerKeyWord2: 'ingredients',
        headerKeyWord3: 'cooking',
        mainMyRecipesDescription: 'Place where you can see all your saved recipes, search by filters and more',
        mainCreateRecipeDescription: 'Add a new recipe to your list, indicating ingredients, time, price, description...',
        mainEditRecipeDescription: 'Edit the recipe you choose to be able to change any item in it',
        mainFamouseRecipes: 'Some popular recipes...',
        footerDescription1: 'Website made by Sebastián Colque using the ',
        footerDescription2: ' created by Valentín Minolli',

        // MY-RECIPES
        labelRecipeName: 'Recipe:',
        inputRecipeName: 'Name...',
        labelRecipeTime: 'Time:',
        labelRecipePrice: 'Price:',
        selectLowToHigh: 'Low to High',
        selectHighToLow: 'High to Low',
        searchButton: 'Search',
        resetButton: 'Reset',
        noRecipes: 'There are no recipes...',


        // CREATE-RECIPE
        createRecipeName: 'Name:',
        createRecipeNamePlaceholder: 'Recipe name...',
        createRecipeTime: 'Preparation time (minutes):',
        createRecipeTimePlaceholder: 'Time',
        createRecipePrice: 'Price (USD):',
        createRecipeDescription: 'Description:',
        createRecipeDescriptionPlaceholder: 'Description of the recipe...',
        createRecipeIngredients: 'Ingredients:',
        createRecipeButton: 'Create Recipe',
        createRecipeSuccess: 'Recipe Created!',
        createEditRecipeButton: 'Edit Recipe',
        editRecipeSuccess: 'Edited Recipe!',

        // RECIPE
        recipeIngredients: 'Ingredients:',
        editRecipeButton: 'Edit',
        deleteRecipeButton: 'Remove',
    }
}

const LanguageProvider = ({children}) => {
    const [langauge, setLangauge] = useState(initialLanguage);
    const [texts, setTexts] = useState(translations[langauge]);

    const handleLanguage = (e) => {
        setLangauge(e.target.dataset.language);
        setTexts(translations[e.target.dataset.language]);
        window.localStorage.setItem('recipeLanguage', e.target.dataset.language);
    }

    useEffect(() => {
        const language = window.localStorage.getItem('recipeLanguage');
        if (language) {
            setLangauge(language);
        }
        setTexts(translations[langauge]);
    }, [langauge]);

    const data = {texts, handleLanguage};

    return (
        <LanguageContext.Provider value={data}>
            {children}
        </LanguageContext.Provider>
    );
}

export { LanguageProvider }
export default LanguageContext;