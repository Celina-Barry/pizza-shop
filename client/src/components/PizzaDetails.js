import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const PizzaDetailsContainer = styled.div`
display: flex;
border: 1px solid #ccc;
border-radius: 4px;
padding: 16px;
margin: 8px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

img {
  max-width: 550px;
  margin-right: 16px;
  border-radius: 4px;
}
`;
const PizzaDetailsContent = styled.div `
flex: 1;
`;

const PizzaName = styled.h2`
font-size: 28px;
margin-bottom: 8px;
`;

const PizzaDescription = styled.p`
font-size: 18px;
margin-bottom: 8px;

`;
const ToppingsList = styled.ul`
  font-size: 18px;
  margin-bottom: 8px;

  li {
    list-style: disc;
    margin-left: 16px;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  p {
    font-size: 20px;
    margin-right: 16px;
  }

  .price-box {
    display: inline-block;
    background-color: #f0f0f0;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 18px;
    margin: 8px;
  }
`;

const OrderButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  cursor: pointer;
`;


const PizzaDetails = ({ pizzas }) => {
    const { pizzaId } = useParams();
    const pizza = pizzas.find((pizza) => pizza.id === pizzaId);
    if (!pizza) {
        return <p>Pizza not found!</p>;
    }
    const { name, description, toppings, price } = pizza;
    return (
    <PizzaDetailsContainer>
        <img src={pizza.src} alt={name} />
        <PizzaDetailsContent>
            <PizzaName>{name}</PizzaName>
            <PizzaDescription>{description}</PizzaDescription>
            <ToppingsList>
                <p>Toppings:</p>
                {toppings.split(',').map((topping, index) => (
                    <li key={index}>{topping}</li>
                ))}
            </ToppingsList>
            <PriceContainer>
                <p>Price:</p>
                <div className='price-box'>Small: {price.Small}</div>
                <div className='price-box'>Medium: {price.Medium}</div>
                <div className='price-box'>Large: {price.Large}</div>
                <div className='price-box'>XLarge: {price.XLarge}</div>
            </PriceContainer>
        </PizzaDetailsContent>
        </PizzaDetailsContainer>
    );
}
export default PizzaDetails;