import React, { useState, useEffect } from 'react';
import DigimonList from './components/DigimonList';
import './custom.scss';
import logo from './assets/logo.png';
import Pagination from './components/Pagination';

function App() {
  const [digimons, setDigimons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingData, setLoadingData] = useState(false);
  const [digimonsPerPage] = useState(12);
  const [activePage, setActivePage] = useState(1);
  const [digimonInfo, setDigimonInfo] = useState(null);

  const lastIndexInPage = currentPage * digimonsPerPage;
  const firstIndexInPage = lastIndexInPage - digimonsPerPage;
  const digimonsInCurrentPage = digimons.slice(
    firstIndexInPage,
    lastIndexInPage
  );

  useEffect(() => {
    const fetchDigimons = async () => {
      setLoadingData(true);
      const dataDigimons = await fetch(
        'https://digimon-api.vercel.app/api/digimon'
      );
      const parsedData = await dataDigimons.json();

      setDigimons(parsedData);
      setLoadingData(false);
    };

    fetchDigimons();
  }, []);

  const onSelectPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    setActivePage(pageNumber);
  };

  const showDigimonInfo = (digimon) => {
    setDigimonInfo((monster) => digimon);
  };

  const onCloseInfoCard = () => {
    setDigimonInfo(null);
  };

  return (
    <div className="container mt-5 text-center">
      <img src={logo} alt="digimon logo" className="my-3" />
      <DigimonList
        digimons={digimonsInCurrentPage}
        loading={loadingData}
        onDigimonSelect={showDigimonInfo}
        digimonInfo={digimonInfo}
        closeInfoCard={onCloseInfoCard}
      />
      <Pagination
        totalDigimonCount={digimons.length}
        digimonsPerPage={digimonsPerPage}
        selectPage={onSelectPage}
        activePage={activePage}
      />
    </div>
  );
}

export default App;
