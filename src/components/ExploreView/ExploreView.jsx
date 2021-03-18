import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
// Import Swiper styles
import 'swiper/swiper-bundle.css';
// Components
import FilterMenu from '../FilterMenu/FilterMenu';
import UserCard from '../UserCard/UserCard';

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

  const query = queryString.parse(location.search, {
    arrayFormat: 'bracket',
    parseNumbers: true,
  });

  const filterArray = query.filterIds;

  const filteredProvidersList = providers.filter((item) => {
    if (filterArray) {
      const matches = item.preferences_array.filter((element) =>
        filterArray.includes(element)
      );
      return matches.length === filterArray.length;
    } else {
      return true;
    }
  });

  return (
    <div>
      <FilterMenu query={query} />
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
