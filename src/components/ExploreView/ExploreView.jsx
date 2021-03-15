import UserCard from '../UserCard/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
// Import Swiper styles
import 'swiper/swiper-bundle.css';

function ExploreView() {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const providersReducer = useSelector((store) => store.exploreReducer);
  const questionsReducer = useSelector((store) => store.providerQuestions);

  // Runs only on page load
  useEffect(() => {
    dispatch({ type: 'GET_PROVIDERS' });
    dispatch({ type: 'FETCH_PROVIDER_QUESTIONS' });
  }, []);

  // install Swiper modules
  SwiperCore.use([Navigation, Pagination, A11y]);

  //   const scroll = (scrollOffset) => {
  //     ref.current.scrollLeft += scrollOffset;
  //   };

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={3}
      slidesPerGroup={3}
      navigation
      centeredSlidesBounds={true}
      pagination={{ clickable: true }}
    >
      {providersReducer.map((provider) => {
        return (
          <SwiperSlide>
              <center>
            <UserCard
              key={provider.providers_users_id}
              provider={provider}
              questions={questionsReducer}
              favorited={false}
            />
            </center>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default ExploreView;
