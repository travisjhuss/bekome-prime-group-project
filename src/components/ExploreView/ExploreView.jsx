import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
// Component imports
import FilterMenu from '../FilterMenu/FilterMenu';
import UserCard from '../UserCard/UserCard';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
// Import Swiper styles
import 'swiper/swiper-bundle.css';

function ExploreView() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const providers = useSelector((store) => store.exploreReducer);

  // Runs only on page load
  useEffect(() => {
    dispatch({ type: 'GET_PROVIDERS' });
    dispatch({ type: 'FETCH_PROVIDER_QUESTIONS' });
    dispatch({ type: 'FETCH_PREFERENCES' });
  }, []);

  // install Swiper modules
  SwiperCore.use([Navigation, Pagination, A11y]);

  const breakpoints = {
    '@0.85': {
      slidesPerView: 1,
      spaceBetween: 0,
      slidesPerGroup: 1,
    },
    '@1.00': {
      slidesPerView: 2,
      spaceBetween: 0,
      slidesPerGroup: 2,
    },
    '@1.50': {
      slidesPerView: 3,
      spaceBetween: 0,
      slidesPerGroup: 3,
    },
  };

  const filterArray = queryString.parse(location.search, {
    arrayFormat: 'bracket',
    parseNumbers: true,
  }).filters;

  const handleFilterURL = (id) => {
    let newFilterString = '';
    if (filterArray && filterArray.includes(id)) {
      const newArray = filterArray.filter((item) => item !== id);
      newFilterString = queryString.stringify(
        { filters: newArray },
        { arrayFormat: 'bracket' }
      );
    } else {
      newFilterString = queryString.stringify(
        { filters: filterArray ? [...filterArray, id] : [id] },
        { arrayFormat: 'bracket' }
      );
    }
    history.push(`/explore/?${newFilterString}`);
  };

  const filteredProvidersList = providers.filter((item) => {
    if (filterArray) {
      console.log(item.preferences_array);
      const matches = item.preferences_array.filter((element) =>
        filterArray.includes(element)
      );
      console.log('matches:', matches);
      return matches.length === filterArray.length ? true : false;
    } else {
      return true;
    }
  });

  return (
    <div>
      <FilterMenu handleFilterURL={handleFilterURL} filterArray={filterArray} />
      <Swiper
        spaceBetween={0}
        navigation
        breakpoints={breakpoints}
        pagination={{ clickable: true }}
      >
        {filteredProvidersList.map((provider) => {
          return (
            <SwiperSlide key={provider.providers_users_id}>
              <center>
                <UserCard provider={provider} />
              </center>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default ExploreView;
