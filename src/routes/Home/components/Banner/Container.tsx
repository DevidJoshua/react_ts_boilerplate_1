import React, { useEffect } from 'react';
import Slider from 'react-slick';
import Typography from '@mui/material/Typography';
import useBanner from '@routes/Home/hooks/useBanner';
import Skeleton from '@mui/material/Skeleton';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styContainer } from './styles';

function Banner() {
  const { getBanner, dataBanner, loading } = useBanner();

  useEffect(() => {
    getBanner();
  }, [getBanner]);

  const settings = {
    centerMode: true,
    arrows: false,
    dots: true,
    autoplay: true,
    infinite: true,
  };

  if (loading) {
    return (
      <div style={{ margin: '12px 16px 0' }}>
        <Skeleton variant="rectangular" width="100%" height={123} />
      </div>
    );
  }

  if (!dataBanner.length) return null;

  return (
    <div className={styContainer}>
      <Typography fontWeight="bold" color="primary" fontSize="16px" margin="0 16px 12px">
        Dapatkan Gratis
      </Typography>

      {!loading && dataBanner.length > 0 && (
        <Slider {...settings}>
          {dataBanner
            .filter(val => val.isActive === true)
            .map(val => {
              return (
                <div
                  key={val.id}
                  onClick={() => {
                    window.location.href = val.landingEndPoint;
                  }}
                >
                  <img src={val.image.url} width="318px" />
                </div>
              );
            })}
        </Slider>
      )}
    </div>
  );
}

export default Banner;
