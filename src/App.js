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
  const [digimonLevels, setDigimonLevels] = useState([]);

  const lastIndexInPage = currentPage * digimonsPerPage;
  const firstIndexInPage = lastIndexInPage - digimonsPerPage;
  const digimonsInCurrentPage = digimons.slice(
    firstIndexInPage,
    lastIndexInPage
  );

  useEffect(() => {
    fetchDigimons();
    setDigimonLevels(getUniqueMonsterLevels(digimons));
  }, []);

  // Fetch initial data from Digimon API
  const fetchDigimons = async () => {
    setLoadingData(true);
    const dataDigimons = await fetch(
      'https://digimon-api.vercel.app/api/digimon'
    );
    const parsedDigimonData = await dataDigimons.json();
    setDigimons(parsedDigimonData);
    setLoadingData(false);
  };

  const getUniqueMonsterLevels = (arrayDigimons) => {
    const levels = arrayDigimons?.map((digimon) => digimon.level);
    const uniqueLevels = levels?.filter(
      (level, index, array) => array.indexOf(level) === index
    );

    return uniqueLevels || [];
  };

  // App support functions
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
      <ul>
        {digimonLevels.map((level, index) => (
          <li key={index}>{level}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
