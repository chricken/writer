'use strict';

const render = {
    list(data, parent, onClick, onNew) {

        // console.log(parent);        
        console.log(data);

        parent.innerHTML = ''; //

        // Button für eine neue Story
        const elStory = document.createElement('div');
        elStory.className = 'itemStory itemNew';
        parent.append(elStory);

        const elHeader = document.createElement('h4');
        elHeader.innerHTML = 'New Story';
        elStory.append(elHeader);

        elStory.addEventListener('click', onNew);

        data.forEach(story => {
            const elStory = document.createElement('div');
            elStory.className = 'itemStory';
            parent.append(elStory);

            const elHeader = document.createElement('h4');
            elHeader.innerHTML = story.title;
            elStory.append(elHeader);

            const elID = document.createElement('p');
            elID.innerHTML = story.id;
            elID.className = 'id'
            elStory.append(elID);

            const elSize = document.createElement('p');
            elSize.innerHTML = `${story.size} Abschnitt${(story.size == 1) ? '' : 'e'}`;
            elStory.append(elSize);

            elStory.addEventListener(
                'click',
                () => onClick(story.id)
            )
        })

    }
}

export default render;