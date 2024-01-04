import React, { useState, useCallback, useEffect, useRef } from 'react'

function Form() {

    const [length, setLength] = useState('5');
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charactersAllowed, setCharatersAllowed] = useState(false);
    const [passwordText, setPasswordText] = useState("");

    //useCallback hook used here to optimize the callback function
    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabscdefghijklmnopqrstuvwxyz";
        if (numberAllowed) str += '0123456789'
        if (charactersAllowed) str += '!@#$%^&*(){}?><';
        let i = 0;
        for (i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1)
            pass = pass + str.charAt(char);
        }

        setPasswordText(pass);
    }, [length, numberAllowed, charactersAllowed, setPasswordText])


    // useRef is used to create id dynamically for a component 
    const passwordRef = useRef(null)

    // Callback function for a copy button
    function copyPassword(e) {
        e.preventDefault()
        e.target.innerText = 'Copied'
        setTimeout(() => { e.target.innerText = 'Copy'}, 3000);
        passwordRef.current.select();
        // copy to clipboard
        window.navigator.clipboard.writeText(passwordText);
    }

    // here we used useEffect to generate passowrd on change of given dependencies
    useEffect(() => { passwordGenerator() }, [length, numberAllowed, charactersAllowed, passwordGenerator])

    return (
        // Main 
        <div className=" bg-pink-950 flex items-center justify-center flex-col w-screen h-screen ">
            {/* ############################ Container ################################ */}
            <div className=" bg-stone-50 flex items-center justify-center flex-col p-10 w-6/12  border-2 border-solid border-gray-500 rounded-lg">
            {/* ############################ Password Creator Heading ################################ */}
                <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-pink-800 md:text-4xl dark:text-white">
                    Password Creator
                </h2>
            {/* ############################ Form Element ################################ */}
                <form className=" w-full">
                    <div className="relative">
            {/* ############################ Password Feild ################################ */} 
                       <input type="text" value={passwordText}
                            ref={passwordRef}
                            placeholder='Password'
                            id="search"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            disabled
                            required />
            {/* ############################ Copy Button ################################ */}
                        <button
                            type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-orange-500 hover:bg-orange-600 outline-none focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={(e) => copyPassword(e)}>
                            Copy
                        </button>
                    </div>
                </form>


            {/* ############################ Lenght Slider Element ################################ */}
                <div className="w-full flex justify-center items-center mt-5  flex-col">
                    <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Length : {length}</h3>
                    <input id="disabled-range" type="range"
                        min='5' max='20'
                        value={length}
                        onChange={(e) => {
                            setLength(e.target.value)
                        }} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                </div>



            {/* ############################ Options Section  ################################ */}                    
                <h3 className="mb-4 mt-10 font-semibold text-gray-900 dark:text-white">Select Options</h3>
                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="vue-checkbox-list"
                                type="checkbox" value=""
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"

                                defaultChecked={numberAllowed}

                                onChange={() => {
                                    setNumberAllowed((prev) => !prev)
                                }}
                            />
                            <label 
                                for="vue-checkbox-list" 
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Numbers
                            </label>
                        </div>
                    </li>

                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="react-checkbox-list"
                                value=""
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                type="checkbox"
                                defaultChecked={charactersAllowed}

                                onChange={() => {
                                    setCharatersAllowed((prev) => !prev)
                                }}
                            />
                            <label for="react-checkbox-list"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"

                            >Special Characters
                            </label>
                        </div>
                    </li>
                </ul>


            </div>

        </div>
    )
}

export default Form