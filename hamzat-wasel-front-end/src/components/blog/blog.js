import React from 'react';
import './blog.css';
export default class Blog extends React.Component
{
    render()
    {
        return(
            <div class="container">
                    <div class="grid_12">
                    <article class="post post-blog">
                        <a href="#" class="post-image">
                        <img src="http://placehold.it/960x250/efefef" />
                        </a>
                        <div class="details">
                        <h2><a href="#">iOS Game / Slots</a></h2>
                        <div class="meta">
                            <p>Written by <strong>Mike | Creative Mints</strong> <span class="verified"></span></p>
                        </div>
                        <p>Get your coins ready, it's slots time! Check out the attachment for instant jackpot! :) <br />_<br /><br />P.S The game concept is for sale, please contact me if you're interested.</p>        
                        </div>
                    </article> 
                    </div>          
            </div>
        );
        
    }
}
