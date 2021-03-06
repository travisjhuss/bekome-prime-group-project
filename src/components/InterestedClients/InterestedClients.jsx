import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
// Import Swiper styles
import 'swiper/swiper-bundle.css';
// Components
import ClientCard from '../cards/ClientCard/ClientCard';

function InterestedClients() {
  // write a dispatch that calls saga to
  // execute a GET route that gets clients that match provider in
  // table named clients_providers_favs
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const interestedClientsReducer = useSelector(
    (store) => store.interestedClientsReducer
  );

  // Runs on page load
  useEffect(() => {
    dispatch({ type: 'FETCH_INTERESTED_CLIENTS', payload: { user: user.id } });
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

  return (
    <div style={{ marginTop: '25px' }}>
      <Swiper
        spaceBetween={0}
        navigation
        breakpoints={breakpoints}
        pagination={{ clickable: true }}
      >
        {interestedClientsReducer.map((client) => {
          return (
            <SwiperSlide key={client.clients_users_id}>
              <center>
                <ClientCard client={client} />
              </center>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default InterestedClients;
