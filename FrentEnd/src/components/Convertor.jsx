import countries from '../asserts/supportedContries.json'
import { useState, useEffect,useCallback } from 'react';




const Convertor = () => {
    //API URL
    const baseUrl = `https://v6.exchangerate-api.com/v6/`;

    //API Key
    const API_KEY = '37a65436f9161afc41455093';

    // state for control select tags
    const [ countryCodeFrom, setCountryCodeFrom ] = useState( "USD" ); 
    const [ countryCodeTo, setCountryCodeTo ] = useState( "USD" );

    //state for handling error
    const [ error, setError ] = useState("");

    //state for country to show
    const [ countryToShow, setCountryToShow ] = useState("USD")
    const [ country2ToShow, setCountry2ToShow ] = useState("UAE")

    //state for storing country code
    const [countryCodes, setCountryCodes] = useState([]);

    //state for tracking Amount feild
    const [ amount, setAmount ] = useState(1);

    //state for handling result from convertionfunction
    const [result, setResult] = useState("start");

    //state for display Amounts
    const [Amount1, setAmount1] = useState(1);
    const [Amount2, setAmount2] = useState(1);
    const [DisplayAmount, setDisplayAmount] = useState(1);

    //state for handling conversionRates;
    const [conversionRate, setConversionRate] = useState(1)
    


    //only execute the function while countries change
    const supportedCountriesList = useCallback( countryCodes.map((country, i) =>{
        return(
        <option key={i} value={country[0]}>{country[0]} - {country[1]}
        </option>)
    }), [countryCodes])

   //convertion fuction
       const convertion = (conversion_rates) => {
         let currencyRate = conversion_rates[countryCodeTo];
         setAmount1(amount);
         setAmount2(Amount1*currencyRate);
   }
   
    //switch fuction
    const swapcountries = () => {
     setCountryCodeFrom(countryCodeTo);
     setCountryCodeTo(countryCodeFrom);  
    }

    //connecting Exchange Rate Api to get conversion ratio
    const getConvertionRatio = async (baseCode) => {
        try{
            const response = await fetch(`${baseUrl}${API_KEY}/latest/${baseCode}`);
            if(!response.ok){
                throw new Error(`${response.status}${response.statusText}`)
            }
            const data = await response.json()
            setConversionRate(data.conversion_rates)
        }catch(err){
            setError(err);
            console.log(error);
            setError('')
        }
    }
    
    //connecting Api to get supported codes
    const getCountryCodes = async () => {
        try{
            const response = await fetch(`${baseUrl}${API_KEY}/codes`);
            if(!response.ok){
                throw new Error(`${response.status}${response.statusText}`)
            }
            const data = await response.json()
            setCountryCodes(data.supported_codes)
        }catch(err){
            setError(err);
            console.log(error);
            setError('')
        }
    }

    // connecting Api to get pair conversion 
    const getPairConversion = async () => {
        try{
            const response = await fetch(`${baseUrl}${API_KEY}/pair/${countryCodeFrom}/${countryCodeTo}/${amount}`);
            if(!response.ok){
                throw new Error(`${response.status}${response.statusText}`)
            }
            const data = await response.json()
            console.log(data);
            setResult(data);
            console.log(result);
        }catch(err){
            setError(err);
            console.log(error);
            setError('')
        }
        
    }
    



    //handle convert
    const handleConvert = () =>{
        getConvertionRatio(countryCodeFrom);
        convertion(conversionRate);
        let temp = countryCodes.filter((code) => code.includes(countryCodeFrom));
        setCountryToShow(temp[0][1]);
        let temp2 = countryCodes.filter((code) => code.includes(countryCodeTo));
        setCountry2ToShow(temp2[0][1]);
        getPairConversion();
        setDisplayAmount(amount);
        
    }

    //useEffect call
     useEffect(() => {
        getCountryCodes()
     },[])
     
     
     
     

  return (
   <div className="container-fluid">
    <div className="container wrapper">
        <div className="card" style={{width:"80vw", position:"absolute", top:"20vh", zIndex:1 }}>
            <div className="card-header">
                <div className="container-fluid btn-group justify-content-center" role='group'>
                    <button className="btn w-25 btn-light active"><i class="fa-solid p-1 fa-comments-dollar"></i> convert</button>
                    <button className="btn w-25 btn-light"><i class="fa-regular fa-paper-plane"></i> &nbsp; &nbsp;Send</button>
                    <button className="btn w-25 btn-light"><i class="fa-solid fa-chart-line"></i> &nbsp; &nbsp; chart</button>
                    <button className="btn w-25 btn-light"><i class="fa-regular fa-bell"></i> &nbsp; &nbsp; Alert</button>
                </div>
            </div>
            <div className="card-body">
                <div className="container-fluid pt-2">
                    <div className="container d-flex justify-content-center">
                        <div className="container ">
                            <h6 className='text-start'>
                                <div className="container pb-2">
                                Amount
                                </div>
                            </h6>
                            <div className="container-fluid text-start">
                            <div class="input-group mb-3">
                                <input type="number" onKeyDown={(evt) =>{ 
                                    console.log(evt);
                                    ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
                                }
                                    } class="form-control" value={amount} onChange={(e) => {setAmount(e.target.value)}} aria-label="Amount (to the nearest dollar)"/>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                                <div className="h6  text-start">
                                    <div className="container pb-2">
                                    From
                                    </div>
                                </div>
                                <div className="container-fluid  d-flex   text-start">
                                    
                                    <select className="custom-select d-block" value = {countryCodeFrom} onChange = {(e) => {setCountryCodeFrom( e.target.value );}}>
                                        {
                                        supportedCountriesList
                                        }
                                    </select>
                                </div>
                        </div>
                        <div className="container pb-2  text-center">
                            <button type="button" onClick={swapcountries} style = {{borderRadius:"50%"}} class=" mt-3 p-4  btn btn-light btn-round btn-icon">
                            <i class="fa-solid fa-arrow-right-arrow-left"></i>
                            </button>
                        </div>
                        <div className="container text-start ">
                                <div className="h6 ps-2 textStart">
                                    <div className="container pb-2">
                                    to
                                    </div>
                                </div>
                                <div className="container-fluid d-flex text-start ">
                                    
                                    <select class="custom-select" value = {countryCodeTo} onChange = {(e) => {setCountryCodeTo( e.target.value );}} >
                                        {
                                           supportedCountriesList
                                        }
                                    </select>
                                </div>
                        </div>
                    </div>
                    {
                     (result === "start") ? <div className="container d-none" ></div> :
                     <div className="container display" >
                        <div className="container">
                                <div className="h4 text-start">{DisplayAmount}&nbsp;{(countryToShow) ? countryToShow : "USD"} &nbsp;=&nbsp;
                                </div>
                                <div className="display-3 text-start pb-3">{result.conversion_result}&nbsp; {(country2ToShow) ? country2ToShow : 1} 
                                </div>
                                <div className="container text-start pt-0">
                                    <p className='display-6 pb-0'>1&nbsp;{result.base_code} = {result.conversion_rate}&nbsp;{result.target_code} </p> 
                                    <p className='display-6 pt-0'>1&nbsp;{result.target_code} = {1 / (result.conversion_rate)}&nbsp;{result.base_code}</p> 
                                 </div>
                        </div>
                    </div>
                    }
                    
                    <div className="container-fluid ">
                        <div className="row d-flex justify-content-between">
                            <div className="conatiner col-8">
                                <div class=" row alert alert-light " role="alert">
                                    <div className="col-1 justify-content-center align-item-center">
                                    <i class="fa-solid fa-circle-exclamation pt-3"></i>
                                    </div>
                                    <div className='col-11 text-start'>
                                    We use mid-market role for our convertor. <br /> This is informational purpose only
                                    </div>
                                </div>
                            </div>
                            <div className="container-fluid d-flex  p-2 col-4">
                                <div className="container-fluid">
                                    <div className="btn btn-primary w-100" role="button" onClick={handleConvert}>
                                        Convert
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   </div>
  )
}

export default Convertor
