import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const FormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 500px;
  margin: 0 auto;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;
const RadioContainer = styled.div`
  display: flex;
  gap: 10px;
  
`;
const FormInput = styled.input`
  width: 95%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  margin-top: 8px;
  cursor: pointer;
`;
const Order = ({ pizzas }) => {
    const [formData, setFormData] = useState ({
        fname: '',
        lname: '',
        address: '',
        email: '',
        pizza: null,
        price: null, 
});
    // const [pizzas, setPizzas] = useState([]);
    const [order, setOrder] =useState(null);
    const [selectedPizza, setSelectedPizza] = useState(null)
    useEffect(() => {
        console.log("Pizzas", pizzas);
   
        fetch('/menu')
        .then((res) => res.json())
        .then((parsed) => {
            console.log("fetched-data", parsed.data);
            setPizzas(parsed.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        });
    };
    const handlePizzaSelection = (e) => {
        const selectedPizzaId = e.target.value;
        const selectedPizza = pizzas.find((pizza) => pizza.id === selectedPizzaId);
        console.log("selected pizza", selectedPizza);
        setSelectedPizza(selectedPizza);
        setFormData({
            ...formData,
            pizza: selectedPizza.id,
            price: null,
        });
      
    };
    const handleClick = (e) => {
        const selectedPrice = e.target.value;
        setFormData({
            ...formData,
            price: selectedPrice,
        });
    };
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("test handleSubmit")
        console.log("Form Data:", JSON.stringify({order: formData}));
        fetch("/orders", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({order: formData })
        })
            .then(response => response.json())
            .then((parsed) => {
                console.log("Response from server:", parsed.data.id);
                if (parsed.status === 200) {
                    const orderId = parsed.data.id;
                    navigate(`/confirm/${orderId}`);
                } else {
                    console.log("Order Creation Failed:", parsed.error)
                    window.alert("error:", parsed.error);
                }
            })
            .catch((error) => {
                window.alert(error);
            })
    }


    console.log("Rendering Order component");
    return (
    <FormContainer>
        <form onSubmit={handleSubmit}>
        <LabelContainer>
            <FormLabel htmlFor="fname">First Name: </FormLabel>
            <FormInput type="text" id="fname" onChange={(e) => handleChange(e.target.id, e.target.value)} />
            </LabelContainer>
            <LabelContainer>
            <FormLabel htmlFor="lname">Last Name: </FormLabel>
            <FormInput type="text" id="lname" onChange={(e) => handleChange(e.target.id, e.target.value)} />
            </LabelContainer>
            <LabelContainer>
            <FormLabel htmlFor="phone">Phone:</FormLabel>
            <FormInput type="text" id="phone" onChange={(e) => handleChange(e.target.id, e.target.value)} />
            </LabelContainer>
            <LabelContainer>
            <FormLabel htmlFor="address">Address: </FormLabel>
            <FormInput type="text" id="address" onChange={(e) => handleChange(e.target.id, e.target.value)} />
            </LabelContainer>
            <LabelContainer>
            <FormLabel htmlFor="email">Email: </FormLabel>
            <FormInput type="text" id="email" onChange={(e) => handleChange(e.target.id, e.target.value)} />
            </LabelContainer>
            <LabelContainer>
            <FormLabel htmlFor="select">Choose a pizza: </FormLabel>
            <FormSelect id="pizza" onChange={handlePizzaSelection}>
            {pizzas.map((pizza) => (
            <option key={pizza.id} value={pizza.id}>{pizza.name}</option>
            ))}
            </FormSelect>
            </LabelContainer>
            <div>
    <FormLabel>Price: </FormLabel>
    {selectedPizza && (
        <>
        <RadioContainer>
            {Object.keys(selectedPizza.price).map((key) => (
                <RadioOption  key={key}>
                    <input 
                        type="radio" 
                        name="price" 
                        id={key} 
                        value={selectedPizza.price[key]} 
                        onClick={handleClick} 
                    />
                    <label htmlFor={key}>{key}</label>
                    <label htmlFor={key}>{selectedPizza.price[key]}</label>
                </RadioOption >
            ))}
            </RadioContainer>
        </>
    )}
</div>

            <FormButton type="submit">Gimme my pizza!</FormButton>
            </form>
        </FormContainer>
    );
};
export default Order;