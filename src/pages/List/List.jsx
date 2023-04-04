import React, { useContext } from 'react';
import s from './List.module.scss'
import Card from '../../components/Card/Card';
import { AddContext } from '../AddContext/AddContext';

const List = () => {
    const {cardData, removeCard} = useContext(AddContext)    
    return (
         <div className={s.cards}>
          
            {  cardData.length
            ?   cardData.map((item) => {
                    return <Card onClick={() => removeCard(item)} key={item.id} item={item}/>
                })
            : <h1>Ничего не найдено!</h1>}  
            
        </div>
    );
};

export default List;