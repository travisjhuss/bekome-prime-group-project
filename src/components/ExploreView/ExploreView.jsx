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
import UserCard from '../cards/UserCard/UserCard';

function ExploreView() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  // gets from reducer all of the providers
  const providers = useSelector((store) => store.exploreReducer);

  // Runs only on page load
  useEffect(() => {
    dispatch({ type: 'GET_PROVIDERS' });
    dispatch({ type: 'FETCH_PROVIDER_QUESTIONS' });
    dispatch({ type: 'FETCH_PREFERENCES' });
  }, []);

  // install Swiper modules
  SwiperCore.use([Navigation, Pagination, A11y]);

  // breakpoints controls how many userCards are visible based on the screen size ratio
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

  // adds filters to url in form of a query
  const query = queryString.parse(location.search, {
    arrayFormat: 'bracket',
    parseNumbers: true,
    parseBooleans: true,
  });
  const { filterIds, states, booleans } = query;

  // filters through the providers array based on the filters the user has selected
  const filteredProvidersList = providers
    .filter((item) => {
      // filters based on the filterID of a given preference
      if (filterIds) {
        const matches = item.preferences_array.filter((element) =>
          filterIds.includes(element)
        );
        return matches.length === filterIds.length;
      } else {
        return true;
      }
    })
    .filter((item) => {
      // filters based on state selected
      if (states) {
        if (!states.includes(item.state)) {
          return false;
        }
      }
      return true;
    })
    .filter((item) => {
      // filters based on boolean value of accepting clients or sliding scale
      if (booleans) {
        if (booleans.includes('Accepting Clients') && !item.accepting_clients) {
          return false;
        } else if (booleans.includes('Sliding Scale') && !item.sliding_scale) {
          return false;
        }
      }
      return true;
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
