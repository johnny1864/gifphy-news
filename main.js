"use strict";

// API KEYS AND BASE URLs
const API_KEY = 'b8dfeca82fc345c4a9c29bfa70176a8a';
const giphy_key = 'SkNbmoGTSoszOKoRZYer7zO1PI2VUXRA';
const newsURL = 'https://newsapi.org/v2/';
const giphyURL = 'http://api.giphy.com/v1/gifs/'

window.addEventListener('load', showHeadlines);

function showHeadlines() {
    const spinner = document.getElementById('ajax-wait')
    const headlinesUrl = `${newsURL}top-headlines?country=us&apiKey=${API_KEY}`;
    
    // XHR REQUEST
    const xhr = new XMLHttpRequest(); 
    xhr.open("GET", headlinesUrl, true);
    
    // GET HEADLINE ON SUCCESSFUL CONNECTION
    xhr.onload = function() {
        document.getElementById('ajax-wait').style.display = 'none';
        const headlines = [];
        if(xhr.status === 200 ){
            var newsData = JSON.parse(xhr.responseText);
            
            for(let i = 0; i<newsData.articles.length; i++){
                headlines.push(`<div class="headline"> <a href="#article" class="headline-link" onclick="showGifs('${newsData.articles[i].title}')">`);
                headlines.push(newsData.articles[i].title);
                headlines.push('</a></div>');
            }
            
            headlines.forEach(headline => {
                document.getElementById('headlines').innerHTML = headlines.join('\r');
            });
        } 
    };
    
    xhr.onerror = function() {
        spinner.style.display = 'none';
        const errorText = document.getElementById('error');
        
        errorText.innerHTML = "Unable to get headlines, Please try again later."
    }
    
    xhr.send();
    
    spinner.style.display = 'block';
}

function showGifs(title) {
    if(!title) title = 'batman';
    console.log('headline is ',title);
    const xhr = new XMLHttpRequest();
    
    xhr.open("GET", `${giphyURL}search?q=${title}&api_key=${giphy_key}&limit=5`);
    
    xhr.onload = function() {
        if(xhr.status === 200){
            const gif_data = JSON.parse(xhr.responseText);
            console.log(gif_data['data']);
            //document.getElementById('gifs').innerHTML = ''
        }
    }
    
    xhr.onerror = function() {
        const errorText = document.getElementById('error');
        
        errorText.innerHTML = "Unable to get your GIF, Please try again later."
    }
    
    xhr.send();
    
}







