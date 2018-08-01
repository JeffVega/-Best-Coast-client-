import React, {Component} from 'react';
import {connect} from 'react-redux';
import { openTripPlaceMoreDetails, closeTripPlaceMoreDetails, fetchTripPlaceDetailsError, fetchTripPlaceDetailsSuccess, addCommentToPlace, deleteComment } from '../actions/results';
import { setMarkerLocation, removePlace, openMarker, closeMarker } from '../actions/protected-data';

class TripResults extends Component {

    clicked(inc) {
        if (inc === this.props.clicked) {
            this.props.dispatch(closeTripPlaceMoreDetails());
            this.props.dispatch(closeMarker());
        }
        else {
            this.props.dispatch(openTripPlaceMoreDetails(inc));
            this.props.dispatch(openMarker());
            try {
                this.props.dispatch(fetchTripPlaceDetailsSuccess(this.props.results[inc]));
                this.props.dispatch(setMarkerLocation(this.props.results[inc].location))
                console.log(this.props.results[inc])
            }
            catch(err) {
                this.props.dispatch(fetchTripPlaceDetailsError('Sorry something went wrong with grabbing that place!'));
            }
        }
    }

    tripResultsImage(photo) {
        if(photo) {
           return  (
            <div>
                <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=2000&photoreference=${this.props.details.photos[0].photo_reference}&key=AIzaSyDcXgfc08bFKvh2HkOilaX112ghHvyRBkU`} alt={`${this.props.details.name}`} className="place-photo"/>
                <span className={`${this.props.details.photos[0].html_attributions[0]}`}></span>
            </div> 
           )
        } else {
            return (
                <div>
                    <img src='https://cdn4.iconfinder.com/data/icons/small-n-flat/24/star-48.png'/>
                </div>
            )
        }
    }

    render() {
        let dynamicHeight;
        let list;
        let details;
        if (this.props.results.length >= 1) {
        list = this.props.results.map((result, inc) => { 
            // make sure the 0 index isn't expanded
            if (this.props.clicked === false) {
                dynamicHeight = '100px'
            }
            // expand the clicked box, include details
            if (this.props.details !== null && inc === Number(this.props.clicked) && this.props.clicked !== false 
            // &&this.props.photo !== null
            ) {
                console.log(this.props.details)
                dynamicHeight = '300px'
                details = 
                <div className={'trips-class'}>
                    {!this.props.details.rating ? '':
                    (<div>
                        Rating: {this.props.details.rating}
                    </div>)}
                    {!this.props.details.price_level ? '' :
                        (<div>
                        Price Level: {this.props.details.price_level}
                        </div>)}
                    <div>
                        {this.props.details.formatted_address}    
                    </div>
                    <div>
                        {this.props.details.phone_number}
                    </div>
                    <a href={this.props.details.website} target="_blank">
                        {`${this.props.details.name} official website`}
                    </a>
                    {this.tripResultsImage(this.props.details.photos[0])}
                   {/* <div>
                        <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=2000&photoreference=${this.props.details.photos[0].photo_reference}&key=AIzaSyDcXgfc08bFKvh2HkOilaX112ghHvyRBkU`} alt={`${this.props.details.name}`} className="place-photo"/>
                        <span className={`${this.props.details.photos[0].html_attributions[0]}`}></span>
                    </div>  */}
                    {/* render comments */}
                    {!this.props.details.comments[0] ? 'No comments' :
                        (<div className="comment-container">
                        <h2> Comments </h2>
                        <ul>
                        {this.props.details.comments.map((comment, index) => {
                            return <li 
                            key={comment.id}>
                        <p>{comment.comment}</p>
                        <div className="button-placement">
                            <button className={'delete-button'} name={comment.id} onClick={(e) => { 
                                e.stopPropagation();
                                console.log(comment.id, this.props.details, this.props.details.id)
                                if (window.confirm(`Are you sure you want to delete this comment?`)) this.props.dispatch(deleteComment(this.props.details.id, comment.id))
                            }}>delete comment</button>
                        </div>
                        <div>{comment.created}</div>
                        </li>
                        })
                        }
                        </ul>
                        </div>)}
                    <form
                    onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        if(!this.commentInput.value) {
                            alert('Comment cannot be empty')
                        } else {
                        console.log(this.props.details.id, this.commentInput.value)
                        this.props.dispatch(addCommentToPlace(this.props.details.id, this.commentInput.value));
                        //need to clear input value on submit  
                        this.commentInput.value = ''  }}} >
                        <label className="add-comment-header" htmlFor="comment">Add comment</label>
                        <br/>
                        <textarea
                            className="comment-text-area"
                            id="comment"
                            ref={input => (this.commentInput = input)}
                            onClick={e => {
                                e.stopPropagation();  
                            }}
                        />
                        <button className="comment-submit">Submit</button>
                    </form>
                    <div className="button-placement">
                        <button className={'delete-button'} onClick={(e) => { 
                            e.stopPropagation();
                            // console.log('clicked')
                            if (window.confirm(`Are you sure you want to delete ${this.props.results[inc].name}?`)) this.props.dispatch(removePlace(this.props.results[inc].id))
                        }}>delete place</button>
                    </div>
                </div>
            }
            // keep box regular size
            else {
                dynamicHeight = '100px'
                details = null;
            }
            return (
                <div 
                className="listed-trips"
                key={inc} 
                id={inc} 
                // style={{width: '40%', innerWidth: '300px', height: dynamicHeight, border: 'solid 1px black'}} 
                onClick={(e) => {
                    e.stopPropagation();
                    this.clicked(inc)
                }}
                >
                    <div className="trip-card-name">{result.name}</div>
                    <div>{result.types[0]}</div>
                    {details}
                </div>
                )
            });
        }
        return (
            <div
            className='trips-item'>
                {list}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        results: state.protectedData.tripResults,
        details: state.result.tripPlaceDetails,
        clicked: state.result.tripPlaceOpen,
        // details: state.protectedData.tripPlaceDetails
    }
}

export default connect(mapStateToProps)(TripResults)