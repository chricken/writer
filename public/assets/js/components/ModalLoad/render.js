'use strict';

import ajax from './ajax.js';

const render = {
    list(data, parent, onClick, onNew) {
        parent.innerHTML = ''; //

        // Button für eine neue Story
        const elStory = document.createElement('div');
        elStory.className = 'itemStory itemNew';
        parent.append(elStory);

        const elHeader = document.createElement('h4');
        elHeader.innerHTML = 'New Story';
        elStory.append(elHeader);

        // console.log(elHeader);

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

            // Button, um die Story zu löschen
            const btnDelete = document.createElement('button');
            btnDelete.innerHTML = 'Remove Story';
            elStory.append(btnDelete);

            btnDelete.addEventListener('click', evt => {
                evt.stopPropagation();
                if (confirm(`Soll diese Geschichte "${story.title}" unwiederbringlich gelöscht werden?`)) {
                    ajax.deleteStory(story).then(
                        ajax.loadList
                    ).then(
                        res => {
                            const elContent = this.root.querySelector('.frame');
                            render.list.bind(this)(res, elContent, this.onClick.bind(this), this.onNew.bind(this))
                        }
                    ).catch(
                        console.warn
                    );
                }
            })
        })
    }
}

export default render;