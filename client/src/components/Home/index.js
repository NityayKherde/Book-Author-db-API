// import {Component} from 'react'
// import {TailSpin} from "react-loader-spinner";

// import WeatherCard from '../WeatherCard'
// import NavBar from '../Navbar'
// import Footer from '../Footer'

// import './index.css'

// class Home extends Component{

//     state = {userInput:"nagpur",weatherList:[],isLoading: false}

//     getWeatherReport = async()=>{
//         const {userInput} = this.state
//         this.setState({isLoading:true})
//         console.log(userInput)
//         const url = `https://api.tomorrow.io/v4/weather/forecast?location=india/${userInput}&apikey=KtLOuz5dI3XtUdaYYcqGQNr17E2Bf1Ek`
//         const response = await fetch(url)
//         const data = await response.json()
//         if(response.ok===true){
//             this.setState({weatherList:data.timelines.daily,isLoading: false})
//         }
//     }
//     onChangeCity = (event)=>{
//         this.setState({userInput:event.target.value})
//     }

//     render(){
//         const {userInput,weatherList,isLoading} = this.state
//     return (
//         <>
//         <NavBar/>
//             <div className='home-bg-container'>
//                 <div className='input-btn-container'>
//                 <input id='userInput' className='input-user' type="search" value={userInput} onChange={this.onChangeCity}/>
//             <button className='search-btn' type="button" onClick={this.getWeatherReport}>
//                 Search
//             </button>
//             </div>
//             {isLoading?(
//                 <TailSpin/>
//             ):(
//                 <div className='weather-card-container'>
//                 <ul className='unorder-list-container'>
//                     {weatherList.map(each=> 
//                         <WeatherCard key={each.time} weatherItems={each}/>
//                     )}
//                 </ul>
//             </div>
//             )}
//         </div>
//         <Footer/>
//         </>
//     )
//     }
// }
import React, { Component } from 'react';
import { TailSpin } from 'react-loader-spinner';
import NavBar from '../Navbar';
import Footer from '../Footer';
import './index.css';
import BookCard from '../BookCard'; // Import the updated BookCard component

class Home extends Component {
  state = {
    userInput: '',
    bookList: [],
    filteredBookList: [], // Add a filtered book list state
    isLoadingBooks: false,
  };

  getBookDetails = async () => {
    const { userInput, bookList } = this.state;
    this.setState({ isLoadingBooks: true });

    const url ='http://localhost:3005/book'; // Update with your backend endpoint for books
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        this.setState({ bookList: data, filteredBookList: data, isLoadingBooks: false });
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
      this.setState({ isLoadingBooks: false });
    }
  };

  onChangeCity = (event) => {
    this.setState({ userInput: event.target.value });
  };

  searchBooks = () => {
    const { userInput, bookList } = this.state;
    const filteredBooks = bookList.filter(
      (book) => book.title.toLowerCase().includes(userInput.toLowerCase())
    );
    this.setState({ filteredBookList: filteredBooks });
  };

  componentDidMount() {
    // Fetch book details when the component mounts
    this.getBookDetails();
  }

  render() {
    const { userInput, filteredBookList, isLoadingBooks } = this.state;
    return (
      <>
        <NavBar />
        <div className="home-bg-container">
          <div className="input-btn-container">
            <input
              id="userInput"
              className="input-user"
              type="search"
              value={userInput}
              onChange={this.onChangeCity}
            />
            <button className="search-btn" type="button" onClick={this.searchBooks}>
              Search Books
            </button>
          </div>
          {isLoadingBooks ? (
            <TailSpin />
          ) : (
            <div className="book-card-container">
              <h2>Book Details</h2>
              <ul className="unorder-list-container">
                {filteredBookList.map((book) => (
                  <BookCard key={book.book_id} book={book} />
                ))}
              </ul>
            </div>
          )}
        </div>
        <Footer />
      </>
    );
  }
}

export default Home;
