import React, { useState, useCallback, useRef, useEffect } from 'react';
import { API_HOST } from '@config';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { useUserData } from '@/context/userData';

import { useChooseLocation } from '@routes/Address/context/ChooseLocation';
import useDebounce from '@hooks/useDebounce';
import fetcher from '@/helpers/fetcher';

import Flex from '@components/Flex';
import TopNav from '@components/TopNav';

import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import ItemLocation from './ItemLocation';
import Loader from './Loader';
import {
  LocationFullResponseInterface,
  LocationResponseInterface,
  defaultPropsLocationFull,
} from '@routes/Address/interface';
import { styCustomText } from './styles';

type Params = {
  keyword: string;
  limit: string;
  page: string;
};

export interface ClickLocation {
  dataCity: LocationResponseInterface['adm_level_3'];
  dataSubUrb: LocationResponseInterface['adm_level_4'];
  dataArea: LocationResponseInterface['adm_level_5'];
  addrText: LocationResponseInterface['display_txt'];
  dataRoad: string;
}

const API_LOCATION = `${API_HOST}ext-services/logistic/?ep=v3/location?`;

function Container() {
  const pagination = useRef(1);
  const observer = useRef<null | IntersectionObserver>(null);
  const history = useHistory();
  const {
    userInfo: { token },
  } = useUserData();
  const { setDataCity, setDataArea, setDataSubUrb, setDataText, setDataRoad } = useChooseLocation();

  const [keyword, setKeyword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isNextPage, setIsNextPage] = useState<boolean>(false);
  const [dataLocation, setDataLocation] =
    useState<LocationFullResponseInterface>(defaultPropsLocationFull);

  const debounceKeyword = useDebounce(keyword, 500);

  const {
    location: { search },
  } = history;

  const qs = queryString.parse(search);
  const isFromCheckout = queryString.parse(search)?.ld || '';

  const getLocationByKeyword = useCallback(async () => {
    const params: Params = {
      keyword: String(debounceKeyword),
      limit: '10',
      page: String(pagination.current),
    };

    setLoading(true);
    await fetcher(
      `${API_LOCATION}keyword=${params.keyword}&limit=${params.limit}&page=${params.page}`,
      {
        method: 'GET',
        token,
      },
    ).then((result: LocationFullResponseInterface) => {
      setLoading(false);
      const paging = result?.pagination || {};
      const isSuccess = result?.metadata?.http_status_code || 0;

      if (isSuccess === 200) {
        if (paging?.current_page < paging?.total_pages) {
          setIsNextPage(true);
        } else {
          setIsNextPage(false);
        }

        setDataLocation(prevResult => {
          if (pagination.current === 1) {
            const storeData: LocationFullResponseInterface = result;
            return storeData;
          }

          return {
            metadata: result.metadata,
            data: prevResult.data.concat(result.data),
            pagination: result.pagination,
          };
        });
      }
    });
  }, [debounceKeyword, token]);

  useEffect(() => {
    getLocationByKeyword();
  }, [getLocationByKeyword]);

  const handleLoadMore = useCallback(async () => {
    if (isNextPage) {
      pagination.current += 1;
      await getLocationByKeyword();
    }
  }, [getLocationByKeyword, isNextPage]);

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    pagination.current = 1;
  };

  const handleClickLocation = useCallback(
    ({ dataSubUrb, dataArea, addrText, dataRoad, dataCity }: ClickLocation) => {
      setDataSubUrb(dataSubUrb);
      setDataArea(dataArea);
      setDataText(addrText);
      setDataRoad(dataRoad);
      setDataCity(dataCity);

      if (isFromCheckout) {
        history.push({
          pathname: '/address/add',
          search: queryString.stringify({
            ld: String(isFromCheckout),
            ...qs,
          }),
        });
      } else {
        history.push('/address/add');
      }
    },
    [
      history,
      isFromCheckout,
      qs,
      setDataArea,
      setDataCity,
      setDataRoad,
      setDataSubUrb,
      setDataText,
    ],
  );

  const handleClickBack = () => {
    if (isFromCheckout) {
      history.push({
        pathname: '/address/list',
        search: queryString.stringify({
          ld: String(isFromCheckout),
          ...qs,
        }),
      });
    } else {
      history.push('/address/list');
    }
  };

  const lastElementRef = useCallback(
    node => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0]?.isIntersecting && isNextPage) {
          handleLoadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [handleLoadMore, isNextPage, loading],
  );

  const renderItemLocation = () => {
    if (loading && pagination.current === 1) {
      return <Loader />;
    }

    if (dataLocation.data.length || 0 > 0) {
      return dataLocation?.data.map((item, id) => {
        let refProps = {};
        if (id + 1 === dataLocation?.data.length) {
          refProps = {
            ref: lastElementRef,
          };
        }

        return (
          <div key={id} {...refProps}>
            <ItemLocation {...item} onClickLocation={handleClickLocation} />
          </div>
        );
      });
    }

    return null;
  };

  return (
    <>
      <TopNav title="Pilih Lokasi" onBack={handleClickBack} />
      <Flex
        flexDirection="column"
        margin="16px"
        padding="0 0 16px"
        style={{
          borderBottom: 'thin solid #EDEDED',
        }}
      >
        <TextField
          size="small"
          placeholder="Cari Lokasi"
          className={styCustomText}
          onChange={handleChangeKeyword}
          value={keyword}
          InputProps={{
            startAdornment: (
              <SearchIcon style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            ),
            style: {
              backgroundColor: '#EFEFEF',
            },
          }}
        />
      </Flex>

      <Flex flexDirection="column" margin="0 16px">
        {renderItemLocation()}
        {loading && <Loader />}
      </Flex>
    </>
  );
}

export default Container;
