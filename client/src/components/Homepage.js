//import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PizzaBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
  margin: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-style: none;
  text-decoration: none;
  cursor: pointer;
  a {
    text-decoration: none;
    color: inherit; 
  }
  img {
    max-width: 150px;
    margin-right: 16px;
    border-radius: 4px;
  }

  div {
    flex: 1;
  }
`;

const Homepage = () => {
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

    // const handleChange = (key, value) => {
    //     setFormData({
    //         ...formData,
    //         [key]: value
    //     })
    // }

;
    return (
        <div>
            {!pizzas ? <p>Loading...</p> : (
            <div>
                {pizzas.map((pizza) => (
                    <Link key={pizza.id} to={`/pizza/${pizza.id}`}style={{ textDecoration: 'none', color: 'inherit' }}>
                    <PizzaBox>
                        <img src={pizza.src} alt={pizza.name} />
                        <div>
                        <h2>{pizza.name}</h2>
                        <p>{pizza.description}</p>
                        <p>{pizza.toppings}</p>
                        <p>Starting at: {pizza.price.Small}</p>
                        </div>
                        </PizzaBox>
                        </Link>
                ))}
            
            </div>
            )}
            
            </div>
    );
};

export default Homepage;