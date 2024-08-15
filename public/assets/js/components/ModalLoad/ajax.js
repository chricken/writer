'use strict';

const ajax = {
    loadList(){
        return fetch('/allStories').then(
            res => res.json()
        )
    }
}

export default ajax;