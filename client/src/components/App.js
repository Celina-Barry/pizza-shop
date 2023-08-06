import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import GlobalStyle from "../GlobalStyles";
import Header from "./Header";
import Homepage from "./Homepage";
import PizzaDetails from './PizzaDetails';
import Order from "./Order";
import Confirmation from "./Confirmation";

const App = () => {
    const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch('/menu')
      .then((res) => res.json())
      .then((parsed) => {
        setPizzas(parsed.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
    
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Header />

            <Routes>

                <Route path="/" element={<Homepage pizzas={pizzas}/>} />
                <Route path="/pizza/:pizzaId" element={<PizzaDetails pizzas={pizzas} />} />
                <Route path="/order" element={<Order pizzas={pizzas} />} />
                <Route path="/confirm/:orderId" element={<Confirmation />} />

            </Routes>
            
        </BrowserRouter>
    );
};

export default App;
