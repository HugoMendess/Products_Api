import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Head from "./Head";
import '../App.css';
import styles from './Produto.module.css'

const Produto = () =>{
  const [produto, setProduto] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const {id} = useParams();

  React.useEffect(() =>{
    async function fetchData(url){
     try{
      setLoading(true);
      const response = await fetch(url);
      const responseJson = await response.json();
      console.log(responseJson);
      setProduto(responseJson);
     } catch(error){
       setError('Um erro ocorreu');
     } finally{
       setLoading(false);
     }
    };

    fetchData(`https://ranekapi.origamid.dev/json/api/produto/${id}`);
  }, [id]);

  if(loading) return <div className="loading"></div>;
  if(error) return <p>{error}</p>;
  if(produto === null) return null;

  return (
    <section className={`${styles.produto} animeLeft`}>
      <Head title={`Ranek | ${produto.nome}`} description={`Esse é um produto: ${produto.nome }`}/>
      <div>
      {produto.fotos.map((foto) => <img key={foto.src} src={foto.src} alt={foto.titulo}/>)}
      </div>
      <div>
        <h1>{produto.nome}</h1>
        <span className={styles.preco}>R$ {produto.preco}</span>
        <p className={styles.descricao}>{produto.descricao}</p>
      </div>
    </section>
  );
};

export default Produto;