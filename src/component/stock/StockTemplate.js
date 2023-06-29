import React, { useContext, useEffect, useState } from 'react'
import { KI_APP_KEY, KI_BASE_DOMAIN, KI_DOMESTIC_STOCK_URL,
 KI_SECRET_KEY, KI_TOKEN_URL } from '../../config/host-config';
import ECharts, { EChartsReactProps } from 'echarts-for-react';


const StockTemplate = () => {


    const [options, setOptions] = useState({
        xAxis: {
            type: 'category', // 고정
            data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
        },
        yAxis: {},
        series: [{
            type: 'candlestick', //고정
            data: [
                [20, 34, 10, 38],
                [40, 35, 30, 50],
                [31, 38, 33, 44],
                [38, 15, 5, 42]]
        }]
    });

    const requestHeader = {
        'content-type':'application/json; charset=utf-8',
        'authorization' : localStorage.getItem('ACCESS_TOKEN'),
        'appkey' : KI_APP_KEY,
        'appsecret' : KI_SECRET_KEY
    };

    const getKIAccessToken = async() =>{
        const res = await fetch(KI_BASE_DOMAIN+KI_TOKEN_URL,{
            method: 'POST',
            body: JSON.stringify({
                'grant_type':'client_credentials',
                'appkey':KI_APP_KEY,
                'appsecret':KI_SECRET_KEY
            })
        });
        if(res.status === 200){
            const data = await res.json();
            localStorage.setItem('ACCESS_TOKEN','Bearer '+data.access_token);
            console.log(data.access_token);
        }
    }

    const currentPrice = async() =>{
        const params = '?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=000660';
        const res = await fetch(KI_BASE_DOMAIN+KI_DOMESTIC_STOCK_URL+'price'+params,{
            headers : {
                ...requestHeader,
                'tr_id':'FHKST01010100'
            }
        });
        if(res.status === 200){
            const data = res.json();
            console.log(data);
        }
    }

    useEffect(()=>{
        getKIAccessToken();
    },[]);
  return (
    <div>
        <div onClick={currentPrice}>
            click
        </div>
        <ECharts option={options} opts={{ renderer: 'svg', width: 'auto', height: '100%' }}/>
    </div>
  )
}

export default StockTemplate;