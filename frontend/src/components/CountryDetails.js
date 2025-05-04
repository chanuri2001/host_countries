import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { clearSelectedCountry, toggleFavorite } from '../features/countries/countries';
import Spinner from './Spinner';

function CountryDetails() {
  const dispatch = useDispatch();
  const { selectedCountry, isLoading, favorites } = useSelector((state) => state.countries);
  
  const isFavorite = favorites.some(
    (fav) => selectedCountry && fav.name.common === selectedCountry.name.common
  );

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const handleClose = () => {
    dispatch(clearSelectedCountry());
  };

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(selectedCountry));
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
        <Spinner />
      </div>
    );
  }

  if (!selectedCountry) {
    return null;
  }

  // Format currencies
  const currencies = selectedCountry.currencies
    ? Object.values(selectedCountry.currencies)
        .map((currency) => currency.name)
        .join(', ')
    : 'N/A';

  // Format languages
  const languages = selectedCountry.languages
    ? Object.values(selectedCountry.languages).join(', ')
    : 'N/A';

  // Format border countries
  const borders = selectedCountry.borders
    ? selectedCountry.borders.join(', ')
    : 'None';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-800">
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <button 
            onClick={handleClose}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="relative">
                <img
                  src={selectedCountry.flags.svg || selectedCountry.flags.png}
                  alt={`Flag of ${selectedCountry.name.common}`}
                  className="w-full h-auto rounded-md shadow-lg border border-gray-800"
                />
                <button
                  className="absolute top-2 right-2 p-2 bg-gray-800 bg-opacity-90 rounded-full hover:bg-gray-700 transition-colors"
                  onClick={handleFavoriteClick}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFavorite ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-gray-400 text-xl hover:text-red-500 transition-colors" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 text-white">{selectedCountry.name.common}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-6">
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Official Name:</span>{' '}
                  {selectedCountry.name.official}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Population:</span>{' '}
                  {selectedCountry.population.toLocaleString()}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Region:</span>{' '}
                  {selectedCountry.region}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Sub Region:</span>{' '}
                  {selectedCountry.subregion || 'N/A'}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Capital:</span>{' '}
                  {selectedCountry.capital ? selectedCountry.capital[0] : 'N/A'}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Top Level Domain:</span>{' '}
                  {selectedCountry.tld ? selectedCountry.tld[0] : 'N/A'}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Currencies:</span>{' '}
                  {currencies}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Languages:</span>{' '}
                  {languages}
                </p>
              </div>
              
              <div className="text-gray-300">
                <p className="font-semibold text-white mb-2">Border Countries:</p>
                <p>{borders}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;