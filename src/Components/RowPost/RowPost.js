import React,{useEffect,useState} from 'react'
import YouTube from 'react-youtube'
import './RowPost.css'
import {imageUrl,API_KEY} from '../../constants/constants'
import axios from '../../axios' 

function RowPost(props) {
  const [movies, setmovies] = useState([])
  const [urlId,setUrlId] = useState('')
  useEffect(()=> {
    axios.get(props.url).then(response=>{
      console.log(response.data)
      setmovies(response.data.results)
    }).catch(err=>{
      alert('NetWork Error')
    })

  }, [])
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovie=(id)=>{
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
      if(response.data.results.lenght!==0){
        setUrlId(response.data.results[0])
      }else{
        console.log('array empty')
      }
    })
  }
  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className='posters'>
          {movies.map((obj)=>
              <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster':'poster'} src={`${imageUrl+obj.backdrop_path}`} />
          )}

        
        </div>
        { urlId && <YouTube videoId={urlId.key} opts={opts}/>}
    </div>
  )
}

export default RowPost