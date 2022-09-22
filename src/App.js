import React, { useState, useEffect } from 'react';
import DigimonList from './components/DigimonList';
import './custom.scss';
import logo from './assets/logo.png';
import Pagination from './components/Pagination';
import Searchbar from './components/UI/Searchbar';
import Dropdown from './components/UI/Dropdown';

function App() {
  const [digimons, setDigimons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingData, setLoadingData] = useState(false);
  const [digimonsPerPage] = useState(12);
  const [activePage, setActivePage] = useState(1);
  const [digimonInfo, setDigimonInfo] = useState(null);
  const [allDigimons, setAllDigimons] = useState([]);
  const [levels, setLevels] = useState(null);

  const lastIndexInPage = currentPage * digimonsPerPage;
  const firstIndexInPage = lastIndexInPage - digimonsPerPage;
  const digimonsInCurrentPage = digimons.slice(
    firstIndexInPage,
    lastIndexInPage
  );

  useEffect(() => {
    fetchDigimons();
  }, []);

  // Fetch initial data from Digimon API
  const fetchDigimons = async () => {
    setLoadingData(true);
    const dataDigimons = await fetch(
      'https://digimon-api.vercel.app/api/digimon'
    );
    const parsedDigimonData = await dataDigimons.json();
    const uniqueLevels = getUniqueMonsterLevels(parsedDigimonData);

    setDigimons(parsedDigimonData);
    setAllDigimons(parsedDigimonData);
    setLoadingData(false);
    setLevels(uniqueLevels);
  };

  const getUniqueMonsterLevels = (arrayDigimons) => {
    const levels = arrayDigimons?.map((digimon) => digimon.level);
    const uniqueLevels = levels?.filter(
      (level, index, array) => array.indexOf(level) === index
    );
    return uniqueLevels;
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

  const searchDigimonsHandler = (searchText) => {
    const searchResults = allDigimons.filter((digimon) =>
      digimon.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setDigimons(searchResults);
  };

  return (
    <div className="container mt-3 text-center">
      <img src={logo} alt="digimon logo" className="my-3" />
      <Searchbar onSearchDigimons={searchDigimonsHandler} />
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

      {/* <Dropdown levels={levels} /> */}
    </div>
  );
}

export default App;
